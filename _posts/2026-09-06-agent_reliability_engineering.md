---
id: 7158
title: 'Agent Reliability Engineering Playbook'
date: 2026-09-05T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7158
permalink: /2026/09/agent-reliability-engineering
categories: tech, AI
tags: AI
image: /assets/2026/factory.png
mathjax: false
mermaid: false
description: A Field Note on Predictable, Steerable Financial-Services Agent Engineering
---
<figure>
<picture>
  <source srcset="/assets/2026/factory.png" type="image/png">
  <img src="/assets/2026/factory.png" alt="illustration: agent factory" fetchpriority="high" style="width: 100%; height: auto;">
</picture>
</figure>
> A Field Note on Predictable, Steerable Financial-Services Agent Engineering

<!--more-->

Claude Code, Codex, and similar assistants help you run your daily tasks. You feed them the inputs, they work through a series of steps: pull data, scrub it, draft, check, format — and out comes a report. It works. You do it every day.

The obvious next move: schedule it. Run it every day, unattended at 6 AM, and read the output over coffee.

That's when the trouble starts.

Running once, interactively, is a proof of concept. Running unattended, every day, is a system. And the math is unforgiving. If your workflow has 10 steps and each succeeds 95% of the time, the whole chain succeeds 0.95^10 ≈ 60% of the time. At 90% per step, you're at 35%. Two mornings out of five, you're reading a broken report. Or worse, a plausible one that's silently wrong, which you won't catch over coffee.

Traditional software fails loudly and deterministically: same input, same crash. Agents fail softly and stochastically: same input, different output. The worst failure is the confident paragraph citing a source that doesn't say that, or doesn't even exist.

Engineers are trained to build reliable systems from unreliable components, using patterns like redundancy, auto-failover. We decompose problems, write contracts, deploy validation gates, run audits. Stochastic LLMs add a few new wrinkles.

What follows are field notes from building agent pipelines that run unattended and produce output you can trust enough to act on, even in a high-stakes regulated context.

1. **Observability: tracing and run manifests.** Every run emits a comprehensive trace and a manifest of exactly what it ran on: the starting state (input files, hashes, as-of dates), prompt versions (ideally tied to an immutable prompt registry like Langfuse), model string, tool and skill calls with versions, token counts, latency, and exit status per step. This lets you do error analysis, reproduce a gold output exactly, and satisfy an auditor. The trace, manifest, and log ship with the gold output as first-class deliverables. A report you can't reconstruct is a report you can't defend.

2. **Context management: keep it simple, stupid.** A series of small prompts is more predictable, verifiable, and steerable than one mega prompt. Small prompts reduce and control what's in context, avoiding context rot, and each prompt is easier to reason about, test, and evaluate in isolation. Stay under 50% of the context window during runs; degradation sets in well before the advertised window fills. High context usage is a signal to decompose.

   Decomposition takes several forms, in increasing order of isolation:

   - **Skills** — including an orchestrator skill that invokes other skills in sequence, potentially with a deep hierarchy.
   - **Subagents** — tasks that run in their own isolated context and return a summary to the caller without polluting the parent's context. Add complexity, but provide isolation, scoped tools, model selection, and parallelism.
   - **An external orchestrator** running independent prompts in fully independent sessions — e.g., a Python script where each step processes artifacts from the previous step and writes new ones, invoking `claude -p` per step.

3. **Contracts: every step has clearly defined structured outputs.** Each step gets a fixed deliverables list with explicit cardinality: "deliver exactly three artifacts," and an explicit "deliver only the specified outputs; do not create extra documents." Allow `unknown`/`unavailable` as legal values: a schema that forces a value into every field rewards the LLM for guessing.

   - **JSON Schema output contracts:** `additionalProperties: false`, required fields, length caps, character-class patterns, and closed enums for classifications — enforced by a deterministic harness-side validator, never by trusting the model to police itself.
   - **Standardized templates:** fixed file structures, fixed workbook tab layouts, fixed report page schemas, fixed QC-report formats, and quantified minimums (≥30 pages, ≥25 charts) paired with an actual-count verification block, so "did it deliver?" is a mechanical check rather than a judgment call.

4. **Idempotent, resumable steps.** Each step must be *idempotent*: running it three times in succession produces the same output as running it once. Each step reads the previous step's artifacts and writes its own. A completed step is skippable on rerun, and makes the pipeline resumable from the last successful step after a failure. Retrying one small failed step is much cheaper than rerunning the whole pipeline. And with checkpointed artifacts saved in a data store, retries are always per step, never per run.

5. **Grounding: bronze, silver, gold.** Borrow the medallion architecture from data engineering and apply it to agent grounding:

   1. **Bronze: immutable raw sources.** Stamp everything with a create date and an as-of date so freshness is decidable. Set max-age thresholds per source class, and state the policy up front: does a stale source fail the gate, or flag the output with a warning?
   2. **Silver: cleaned and merged intermediates.** Where multiple bronze sources cover the same fact, rank them and take the best available. Use consistent, grep-able nomenclature for `unavailable` and `estimated` values so gaps are searchable, not silent.
   3. **Gold: the final output.** Every claim traces back to a named bronze source reference that can be re-fetched, or at minimum cited, like "Wikipedia, retrieved 2026-08-30." A factual claim with no bronze ancestor is a problem and the audit pass should treat it as a possible hallucination to be verified or weeded out.

6. **Deterministic code over LLM-as-computer.** Whenever possible, use a Python or JS script, a shell script, a spreadsheet artifact, instead of a stochastic LLM-as-computer prompt. Sorting, counting, arithmetic, date math, joins, format conversion — anything with one right answer belongs in code that produces it every time. Reserve the model for work that actually needs judgment.

7. **Hard gates, enforced by contracts and deterministic code.** Sanity-check before each step (are prerequisites in place?) and after (does the output look clean?). Before a writing step, for instance: is silver data present, recent, and clean? Always render-and-inspect final artifacts — open the PDF, count the pages, check the charts rendered — with bounded retries. Enforce hard budgets (output length, tokens, wall clock) and cap retries, e.g., at three attempts, so no gate becomes an infinite loop. In more complex topologies, add loop detection for orchestrator/subagent ping-pong, where agents bounce work back and forth without making progress.

8. **Soft gates: LLM-as-judge and critic-optimizer loops.** Hard gates catch what code can check — schemas parse, counts match, budgets hold. Soft gates catch qualitative issues only reading can catch: does the output follow the expected style, is it free of internal contradictions, does it leave an obvious question unanswered, does every statement of fact link to a bronze source, would a skilled reader find it trustworthy?

   - **Rubric, not vibes.** The judge scores against an explicit rubric with named criteria — groundedness, coverage, coherence, style conformance — not a single 'rate this 1–10.' Make the 'soft' gate as hard as possible. Prefer binary pass/fail per criterion over scalar scores; binary judgments are consistent across runs and easier to calibrate against human labels.

   - **Reward the judge for correctly saying "I don't know"** — labeling fields `unknown`/`unavailable` when the source data isn't there — and never reward guessing. An eval that penalizes honest abstention trains your pipeline to make stuff up.

   - **Structured verdicts.** The judge emits a parseable data structure: JSON with issues found, severity, location, and a recommended action for each. That structure can then feed into an optimizer step, which fixes the flagged issues and re-evaluates.

   - **Critic–optimizer loop with a floor and a ceiling.** Iterate judge → fix → rejudge until hard checks pass and soft checks clear a minimum rubric score — but with a bounded iteration count (e.g., three passes), after which remaining issues go into the exception report rather than another lap. An unbounded quality loop may be an infinite loop and an infinite bill.

   - **Judges are cheap; use many narrow parallel ones.** A groundedness judge, a style judge, and a contradiction judge — each with a small focused prompt on a smaller model — beat one omnibus judge, for the same context-rot reasons that small steps beat big prompts. A judge that iterates facts claim by claim, verifying against the bronze source, is worth its own dedicated judge pass.

   - **Separate the judge's context.** The judge runs in its own session with the rubric, the output, and the sources — not the full generation history. A judge that saw the drafting process inherits its assumptions; a fresh-context judge reads the artifact more like your reader will.

   - **Evaluate the judge itself.** A judge is a model component like any other: validate it against a labeled set of known-good and known-bad outputs, track its agreement rate with human reviewers, and re-run that calibration when the underlying model version changes. An uncalibrated judge that passes everything is worse than no judge — it's CYA false assurance with a paper trail.

   - **Gaps and exceptions are a first-class deliverable** at every complex step: what couldn't be sourced, what was estimated, what conflicts were found. A pipeline that reports its own holes is reliable; one that silently papers over them is not.

9. **Evals: unit tests for every step.** Every hard and soft gate maps naturally to an eval you can run as a suite. So when the model version or anything else changes, you rerun the suite and see what regressed.

   - **Meaure against a contract using a scoring rubric, to a structured schema.** See above on soft gates.

   - **Measure reliability as pass^k, not pass@k.** Pass@k asks "did it succeed at least once in k tries?" — the demo metric. Pass^k asks "did it succeed every time?" — the production metric. A step that passes 90% of single trials passes a 10-step pipeline 35% of the time. Run each eval N≥5 times and report the worst case; set per-step thresholds based on the pipeline length you need. A 10-step pipeline targeting 95% end-to-end needs each step at roughly 99.5%.

   - **Generate evals from observed failures, not imagined test cases.** Follow Hamel Husain and Shreya Shankar's error-analysis loop: sample production traces, label the failures, cluster them, write an eval per cluster. Your eval suite should be a fossil record of everything that has actually gone wrong.

   - **Feedback discipline (Hashimoto).** Every incident and every edge case produces a permanent artifact: a new eval, a new gate, a validator rule, a line in the agent's instruction file — engineered so the agent never makes that mistake again. Gates accrete, so they need a governance process: who adds them, where they live, how they're versioned, and periodically, which ones a stronger model has made obsolete and can be removed.

10. **Good evals are the portal to auto-improvement.** As a general principle, the best tasks to give an AI are the ones that are easiest to verify. When the agent can check its own work via an unambiguous and immediate signal -- run tests, validate the schema, count the pages -- it can self-correct. Verification asymmetry is key: when generation is hard, and checking/correcting is easy, put the checking in the loop and let the model iterate against it.

    We can extend this paradigm from runtime course correction to prompt optimization. In March 2026, Karpathy released an 'autoresearch' repo that hands the ML research loop itself to an agent:

      1. *Examine a prompt* or task and consider ways to improve it

      2. *Modify the prompt* and run it against test inputs and evals, using a rubric to score how they performed.

      3. *If the result improved*, keep it, if it got worse discard it.

      4. *Go to 1*, and iterate. Look at the highest-performing prompts found so far and consider ways to improve them with new ideas and combinations of existing ideas.

    This pattern transfers to any pipeline with three ingredients:

      1. **A scalar, trusted metric**:  your eval suite's pass^k score, a rubric score, a latency number. It must be cheap to compute and hard to game, because the agent will optimize exactly what you measure.
      2. **A bounded search space**: the agent edits one prompt, one skill, one validator; everything else is frozen.
      3. **A keep-or-revert loop**: each change is scored against the metric; improvements are committed, regressions are discarded, and every experiment is logged to avoid repeating it.

    **The runtime and dev-time evals become the objective function** for automated task optimization — the same artifact serving defense and offense.

    **Do not overoptimize**, or results may not generalize outside the test suite. Look at the top performing prompts and use them to help write prompts that make obvious sense and cover all the bases. Easy verification makes the loop possible; common sense makes it safe.

11. **Orchestration: fixed-shape workflows.** At the orchestration level, use numbered, fixed-order workflows with named phases and typed input contracts — entity + `YYYY-MM`, batch ID + NAV pack — so every run is repeatable in shape. The agent gets freedom within a step, not over the sequence of steps. When run 47 and run 48 follow the same numbered phases with the same typed inputs, diffs between them are meaningful, failures are attributable, and "where did it break?" has a one-word answer.

12. **Dedicated audit pass at the end.** Before anything ships, run a final audit: layered QC combining the unit gates already passed per step with comprehensive integration checks across the whole deliverable. All components present, all counts met, all failure modes checked — missing source links, orphaned claims, stale data, unresolved exceptions. This is the last line of defense, and it's binary: if any item fails, do not deliver. A pipeline that ships a known-broken report to hit a schedule has optimized for the wrong thing — no report beats a wrong report.

13. **Human in the loop.** Three maturity stages:

    - **Assistant:** the human drives, the model executes one step at a time, everything is reviewed and edited/corrected in place.

    - **Supervised agent:** the pipeline runs end-to-end but pauses at approval gates after key steps, presenting a summary of what was done and what needs elevated review — primary sources that conflict, low-confidence claims, exceptions the critic couldn't resolve.

    - **Hands-free with escalation:** the pipeline runs unattended and inverts the interaction — instead of the human checking in on the agent, the agent reaches out to the human, and only when a gate trips.

The human's role naturally diminishes as the agent matures. But there must always be a boundary where the agent detects it has encountered something outside the design envelope and brings in the human for the edge case. Promotion between maturity stages must be earned, not assumed: as pass^k history accumulates per step, dial human involvement down.

Design for the reviewer at every stage. Surface the exception list and the diff against the prior run, not a long trace to read from scratch. A reviewer who must find the problems themselves is a bottleneck; a reviewer handed exactly the five items needing judgment is a control.

Escalation should arrive where the human already works: a Slack or Teams message with the exception summary, the relevant diff, and approve/reject/correct actions inline — not a log entry waiting to be discovered, and not an email to a folder nobody checks. Route by severity: soft-check warnings post to a channel for async review; hard-gate failures page someone; anything touching money or external delivery blocks until a named human approves. The workflow tools matter because latency matters — an escalation that takes a day to be noticed converts your daily job back into a weekly one.

When a human intervenes, the correction should be as cheap as possible: fix the input or override the judgment, then rerun from that step — which the checkpointed, resumable architecture gives you for free. And capture every reviewer verdict — approved, rejected, corrected, and why — as labeled data. Human corrections are the highest-quality eval inputs you will ever get, and they're what justify the next promotion toward hands-free.

## Further important considerations

1) **Parallelize everything possible**. Use async/await or tell skills to run these tasks in parallel, where possible

2) **Beware of prompt injection**. Initial searches should be in an agent with limited capability, downloaded data should be treated as hostile and subject to a scan and sanitization process before going downstream.

3) **Least privilege and sandboxing.** Scoped credentials per step, read-only by default, write actions gated, execution in a container with egress allowlists. A correctly-behaving agent with excessive permissions can be an insider threat when it gets a bad input.

4) **Beware of repo poisoning**. Use trusted repos (examples) , use  minimum-age flags at a minimum,

5) **Treat prompts as code**. For higher maturity should be in CI and/or prompt repo like Langfuse , so when a model updates you can eval current and previous prompt versions to catch new problems and regressions

6) **Tool design**. There is a tradeoff between fewer, wider tools, which allow more efficiency and creativity, and least privilege. tool errors written for the model to recover from (what went wrong and what to try); tool outputs truncated and structured before they enter context.

7) **The 4 important sources of metrics about how well the agent is working**: 1. Track runtime evals 2. Usage level/growth. If people use it it's probably useful 3.Vibes: what people tell you about how it works in the field (provide easy inline human evals via thumbs-up/down and surveys) 4. lab experiment / benchmark, run it end-to-end on real-world out-of-sample tasks and do human/automated scoring of how well i towrks. to this end, a good harness for e.g. a/b test,ing, letting humans evaluate alternative outputs/traces, can be worth its weight in gold.

**The need for good engineering doesn't go away**. Engineering moves to:

1) **Evals appropriate to the task**. These are the most important part of the process, touching runtime gating and critic/optimizer loops, as well as development-time optimization.

2) **Problem abstraction and decomposition**. Breaking down the problem into tractable chunks of deterministic tools and prompts.

3) **Context engineering**. LLM-friendly memory structures appropriate to the task to give the llm the info it needs when it needs it
