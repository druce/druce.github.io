---
id: 7158
title: 'Agent Reliability Engineering: Field Notes on Building Predictable, Steerable Agents'
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
description: Field Notes on Building Predictable, Steerable Agents
---
<figure>
<picture>
  <source srcset="/assets/2026/factory.png" type="image/png">
  <img src="/assets/2026/factory.png" alt="illustration: agent factory" fetchpriority="high" style="width: 100%; height: auto;">
</picture>
</figure>
> Claude Code, Codex, and similar assistants help you run your daily tasks. You feed them the inputs and they work through a series of steps: pull data, scrub it, draft, check, format — and out comes a report. It works. You do it every day.
>
> The obvious next move: schedule it. Run it every day, unattended at 6 AM, and read the output over coffee.
>
> That's when the trouble starts.

<!--more-->

Running an AI workflow once, interactively, is a good start. Running unattended, every day, is a *system*. And the math is unforgiving. If your workflow has 10 steps and each succeeds 95% of the time, the whole chain succeeds 0.95^10 ≈ 60% of the time: two mornings out of five, you're reading a broken report. At 90% per step, you're at 35%. Or worse, a plausible one that's silently wrong, which you won't catch over coffee.

Traditional software typically fails *hard and deterministically*: same input, same crash. Agents fail *softly and stochastically*: same input, different output. The worst failure is the confident paragraph citing a source that doesn't say that, or doesn't even exist.

Engineers are trained to build [reliable systems from unreliable components](https://ieeexplore.ieee.org/document/1335465), using patterns like redundancy and auto-failover. We decompose problems, write contracts, deploy validation gates, run audits. Stochastic LLMs add a few new wrinkles.

What is reliability from the business perspective? It means consistently delivering the intended result within defined limits for correctness, completeness, timeliness, cost, and authorized behavior, in a transparent and auditable manner. For a daily report, that means accurate, sufficiently complete analysis delivered on time, within budget, to the right recipients. When those requirements cannot be met, the system must detect the problem and follow a defined recovery or escalation path. Measure both incorrect outputs delivered and missing correct outputs: an agent that confidently ships errors is unreliable, but so is one that never ships anything.

What follows are field notes from building agent pipelines that run unattended and produce output you can trust enough to act on, even in a high-stakes, regulated context.

1. **Observability: tracing and run manifests.** Every run logs a comprehensive persistent trace with a manifest of exactly what it ran on: the starting state (input files, hashes, as-of dates), prompt versions (ideally tied to an immutable prompt registry like Langfuse), model string, tool and skill calls with versions, token counts, latency, and exit status per step. This lets you do error analysis, reproduce a final output exactly, and satisfy an auditor. The logged manifest and trace ship with the final output as first-class deliverables. A report you can't reconstruct is a report you can't defend.

2. **[Context management](https://agentic-ai.readthedocs.io/en/latest/ContextEngineering/anthropic/): Keep It Simple, Stupid.** A series of small prompts is more predictable, verifiable, and steerable than one mega-prompt. Small prompts reduce and control what's in context, avoiding [context rot](https://www.trychroma.com/research/context-rot), and each prompt is easier to reason about, test, and evaluate in isolation. Stay under 50% of the context window during runs; degradation sets in well before the advertised window fills. High context usage is a signal to decompose.

   [Decomposing large prompts into multiple small prompts takes several forms](https://www.anthropic.com/engineering/multi-agent-research-system), in increasing order of isolation:

   - **Skills:** an orchestrator skill that invokes other skills in sequence, potentially with a deep hierarchy.
   - **Subagents:** tasks that can run in their own isolated context and return a summary to the caller without polluting the parent's context. They add complexity, but provide isolation, scoped tools, model selection, and parallelism.  Claude Code's [dynamic workflows](https://code.claude.com/docs/en/workflows) let you define fan-out, pipelines, and other deterministic topologies in a script.
   - **An external orchestrator:** each prompt runs in a fully independent session — e.g., a Python script where each step processes artifacts from the previous step and writes new ones, invoking `claude -p` per step.

3. **Idempotent, resumable steps.** Each step must be *idempotent*: running it three times in succession produces the same output as running it once. Each step reads the previous step's artifacts and writes its own. Retries do not duplicate records, send the same message twice, or create any additional effects. A completed step is skipped on rerun, which makes the pipeline resumable from the last successful step after a failure. With artifacts checkpointed in a data store, retries are per step — much cheaper than rerunning the pipeline.

4. **Contracts: every step has clearly defined [structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).** Each step gets a fixed deliverables list with explicit cardinality: "deliver exactly three artifacts," and "deliver only the specified outputs; do not create extra documents." Allow `unknown`/`unavailable` as legal values: a schema that forces a value into every field rewards the LLM for guessing.

   - **JSON Schema output contracts:** `additionalProperties: false`, required fields, length caps, character-class patterns, and closed enums for classifications — enforced by a deterministic harness-side validator, never by trusting the model to police itself.
   - **Standardized templates:** fixed file structures, fixed workbook tab layouts, fixed report page schemas, fixed QC-report formats, and quantified minimums (≥30 pages, ≥25 charts) paired with an actual-count verification block, so "did it deliver?" is a mechanical check rather than a judgment call.

5. **Grounding: bronze, silver, gold.** Borrow the [medallion architecture](https://www.databricks.com/blog/what-is-medallion-architecture) from data engineering and apply it to agent grounding:

   1. **Bronze: immutable raw sources.** Stamp everything with a create date and an as-of date so freshness is decidable. Set max-age thresholds per source class, and state the policy up front: does a stale source fail the gate, or flag the output with a warning?
   2. **Silver: cleaned and merged intermediates.** Where multiple bronze sources cover the same fact, rank them and take the best available. Use consistent, greppable nomenclature for `unavailable` and `estimated` values so gaps are searchable, not silent.
   3. **Gold: the final output.** Every claim traces back to a named bronze source reference that can be re-fetched, or at minimum cited, e.g., "Wikipedia, retrieved 2026-08-30." A factual claim with no bronze ancestor is a problem, and the audit pass should treat it as a possible hallucination to be verified or removed.

6. **Karpathy wiki methodology.** A simple approach to agent memory is to use a wiki with a specified structure as the silver store, with links back to the bronze canonical sources. Andrej Karpathy published an [LLM Wiki repo](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) with a methodology for auto-maintaining a structured wiki. Read sources, extract the relevant facts into the wiki, then build the final product from the wiki.

   There are several agent memory modules and SaaS services. They can be convenient but don't relieve you of the need to think carefully about how you structure the data for your workflows. A wiki is a simple place to start and will work well when the whole wiki fits easily within the LLM's context window. As the amount of data grows, you will need to think harder about structuring agent memory to always give the right context to the LLM, [which may involve different types of memory and database engines](https://www.memoryplugin.com/wiki/index.html), and simple tools and skills to let the LLM extract exactly what it needs when it needs it.

7. **Deterministic code over LLM-as-computer.** Whenever possible, use a tool, a Python or JS script, a shell script, or a spreadsheet artifact instead of a stochastic LLM-as-computer prompt. Sorting, counting, arithmetic, date math, joins, format conversion — anything with one right answer belongs in code that produces it every time. Reserve the model for work that actually needs semantic understanding and judgment. Agents should not do their own bookkeeping. An extraction agent judges what is relevant; a script stores it with a consistent schema, naming convention and ID scheme."

8. **Hard gates, enforced by contracts and deterministic code.** Sanity-check before each step (are prerequisites in place?) and after (does the output look clean?). Before a writing step, for instance: is silver data present, recent, and clean? Render and inspect final artifacts — open the PDF, count the pages, check that the charts rendered. Enforce hard budgets (output length, tokens, wall clock) and cap retries, e.g., at three attempts, so no gate becomes an infinite loop. In more complex topologies, add loop detection for orchestrator/subagent ping-pong, where agents bounce work back and forth without making progress.

9. **Soft gates: LLM-as-judge and critic-optimizer loops.** Hard gates catch what code can check — schemas parse, counts match, budgets hold. Soft gates catch qualitative issues only an inspection with semantic understanding can catch. Does the output follow the expected style? Is it free of internal contradictions? Does it leave an obvious question unanswered? Does every statement of fact link to a bronze source? Would a skilled reader find it trustworthy?

   - **Rubric, not vibes.** The judge scores against an explicit rubric with named criteria: groundedness, coverage, coherence, style conformance. 20 questions, not "rate this". Make the "soft" gate as hard as possible. [Prefer binary pass/fail](https://hamelhusain.substack.com/p/llm-judge) per criterion over scalar scores; binary judgments are consistent across runs and easier to calibrate against human labels.

   - **Reward the agent for correctly saying "I don't know"** — label fields `unknown`/`unavailable` when the source data isn't there. Never reward guessing. An eval that penalizes honest abstention trains your pipeline to make stuff up.

   - **Structured verdicts.** The judge emits a parseable data structure: JSON with issues found, severity, location, and a recommended action for each. That structure can then feed into an optimizer step, which fixes the flagged issues and re-evaluates.

   - **[Critic-optimizer loop](https://www.anthropic.com/engineering/building-effective-agents) with a floor and a ceiling.** Iterate judge → fix → rejudge until hard checks pass and soft checks clear a minimum rubric score — but with a bounded iteration count (e.g., three passes), after which remaining issues go into the exception report rather than another lap. An unbounded quality loop is a potential infinite loop and an infinite bill.

   - **Judges are cheap; use many narrow parallel ones.** A groundedness judge, a style judge, and a contradiction judge — each with a small focused prompt on a smaller model — beat one omnibus judge, for the same context-rot reasons that small steps beat big prompts. Claim-by-claim verification against bronze sources deserves its own pass.

   - **Separate the judge's context.** The judge runs in its own session with the rubric, the output, and the sources — not the full generation history. A judge that saw the drafting process inherits its assumptions; a fresh-context judge reads the artifact more like your reader will. A different model is even better, as [models tend to favor their own handiwork](https://arxiv.org/abs/2404.13076).

   - **[Evaluate the judge itself](https://arxiv.org/abs/2404.12272).** A judge is a model component like any other: validate it against a labeled set of known-good and known-bad outputs, track its agreement rate with human reviewers, and rerun that calibration when the underlying model version changes. [Evaluating the judge can be hard](https://arxiv.org/abs/2306.05685), but an uncalibrated judge that passes everything is worse than no judge — it's false assurance with a paper trail.

   - **Gaps and exceptions are a first-class deliverable** at every complex step: what couldn't be sourced, what was estimated, what conflicts were found. A pipeline that reports its own holes is reliable; one that silently papers over them is not.

10. **[Evals](https://hamel.dev/blog/posts/evals-faq/): unit tests for every step.** Every hard and soft gate maps naturally to an eval you can run as a suite in a tool like [promptfoo](https://www.promptfoo.dev/) or [Langfuse](https://langfuse.com/). An eval suite lets you pick the cheapest model that consistently gets the job done. When the model version, or anything else, changes, rerun the suite and see what regressed.

    - **Score each step against its contract.** Hard checks validate the output schema; soft checks apply the rubric from the soft-gates section above, emitting structured verdicts.

    - **Measure reliability as pass^k, not pass@k.** Pass@k asks "did it succeed at least once in k tries?" — the demo metric. [Pass^k](https://arxiv.org/pdf/2406.12045) asks "did it succeed all k times?" — the production metric. Ten steps that each pass 90% of trials give a pipeline that passes 35% of the time. Run each eval N ≥ 5 times and report the worst case; set per-step thresholds based on the pipeline length you need. A 10-step pipeline targeting 95% end-to-end needs each step at roughly 99.5%.

    - **Generate evals from observed failures and edge cases.** Follow [Hamel Husain and Shreya Shankar's error-analysis loop](https://www.oreilly.com/library/view/evals-for-ai/9798341660717/): sample production traces, label the failures, cluster them, write an eval per cluster using the hardest cases. Your eval suite should be a fossil record of everything that has actually gone wrong.

    - **Feedback discipline (Mitchell Hashimoto).** [Every incident and every edge case produces a permanent artifact](https://mitchellh.com/writing/my-ai-adoption-journey): a new eval, a new gate, a validator rule, a line in the agent's instruction file — engineered so the agent never makes that mistake again. Gates accrete, so they need a governance process: who adds them, where they live, how they're versioned, and, periodically, which ones a stronger model has made obsolete.

11. **Good evals are the gateway to auto-improvement.** As a general principle, the best tasks to give an AI are the ones that are easiest to verify. When the agent can check its own work via an unambiguous and immediate signal — run tests, validate the schema, count the pages — it can self-correct. Verification asymmetry is key: when generation is hard and checking and correcting are easy, put the checking in the loop and let the model iterate against it.

    We can extend this paradigm from runtime course correction to prompt optimization. In March 2026, Karpathy released an [autoresearch](https://github.com/karpathy/autoresearch) repo that hands the ML research loop itself to an agent. Applied to prompts, the loop is:

      1. **Examine a prompt** or task and consider ways to improve it.

      2. **Modify the prompt** and run it against test inputs and evals, scoring the result with a rubric.

      3. **If the result improved, keep it**; if it got worse, discard it.

      4. **Go to step 1** and iterate. Look at the highest-performing prompts found so far and consider ways to improve them with new ideas and combinations of existing ideas.

    This optimization pattern transfers to any pipeline with three ingredients:

      1. **A scalar, trusted metric**: your eval suite's pass^k score, a rubric score, a latency number. It must be cheap to compute and hard to game.
      2. **A bounded search space**: the agent edits one prompt, one skill, one validator; everything else is frozen.
      3. **A keep-or-revert loop**: each change is scored against the metric; improvements are committed, regressions are discarded, and every experiment is logged to avoid repeating it.

    **The runtime and dev-time evals become the objective function** for automated task optimization — the same artifact serving defense and offense.

    **Use train/validate/test set discipline and do not [overoptimize](https://en.wikipedia.org/wiki/Goodhart%27s_law)**, or results may not generalize outside the test set. Look at the top-performing prompts and use them to help write prompts that make obvious sense and cover all the bases, then retest. The optimizer will optimize exactly what you measure, which is generally too specific and gameable. Easy verification makes the loop possible; common sense makes it safe.

12. **Orchestration: fixed-shape workflows.** At the orchestration level, use numbered, fixed-order workflows with named phases and typed input contracts — entity + `YYYY-MM`, batch ID + NAV pack — so every run is repeatable in shape. The agent gets freedom within a step, not over the sequence of steps. When run 47 and run 48 follow the same numbered phases with the same typed inputs, diffs between them are meaningful, failures are attributable, and "where did it break?" has a one-word answer.

13. **Dedicated audit pass at the end.** Before anything ships, run a final audit: layered QC combining the unit gates already passed per step with comprehensive integration checks across the whole deliverable. All components present, all counts met, all failure modes checked — missing source links, orphaned claims, stale data, unresolved exceptions. This is the last line of defense, and it's binary: if any item fails, do not deliver. A pipeline that ships a known-broken report to hit a schedule has optimized for the wrong thing — no report beats a wrong report.

14. **Human in the loop.** Three maturity stages:

    - **Assistant:** the human drives, the model executes one step at a time, everything is reviewed and corrected in place.

    - **Supervised agent:** the pipeline runs end-to-end but pauses at approval gates after key steps, presenting a summary of what was done and what needs elevated review — primary sources that conflict, low-confidence claims, exceptions the critic couldn't resolve.

    - **Hands-free with escalation:** the pipeline runs unattended and inverts the interaction — instead of the human checking in on the agent, the agent reaches out to the human when a gate trips.

    The human's role naturally diminishes as the agent matures. But there must always be a boundary where the agent detects it has encountered something outside the design envelope and brings in a human for the edge case. Promotion between maturity stages must be earned, not assumed: as pass^k history accumulates per step, dial human involvement down.

    Design for the reviewer at every stage. Surface the exception list and the diff against the prior run, not a long trace to read from scratch. A reviewer who must find the problems themselves is a bottleneck; a reviewer handed exactly the five items needing judgment is a control.

    Escalation should arrive where the human already works: a Slack or Teams message with the exception summary, the relevant diff, and approve/reject/correct actions inline — not a log entry waiting to be discovered, and not an email to a folder nobody checks. Route by severity: soft-check warnings post to a channel for async review; hard-gate failures stop and notify someone for immediate intervention; anything high-stakes blocks until a named human approves. The right workflow tools must match SLAs and escalation paths and support the desired resolution latency.

    When a human intervenes, the correction should be as cheap as possible: fix the input or override the judgment, then rerun from that step — which the checkpointed, resumable architecture gives you for free. And capture every reviewer verdict — approved, rejected, corrected, and why — as labeled data. Human corrections are the highest-quality eval inputs you can get, and they justify the next promotion toward hands-free.

## Further considerations

1. **Parallelize everything.** Use async/await, skills and workflows to run tasks in parallel whenever dependencies allow.

2. **Beware of [prompt injection](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/).** Initial searches should run in an agent with limited capabilities. Downloaded data should be treated as hostile and subject to a scan and sanitization process before going downstream.

3. **Least privilege and sandboxing.** Scoped credentials per step, read-only by default, write actions gated, execution in a container with egress allowlists. A correctly behaving agent with excessive permissions is an insider threat when it gets a bad input.

4. **[Software supply-chain security](https://pnpm.io/supply-chain-security).** Pull from a curated internal mirror (Artifactory, Nexus, GitHub Packages) or verified sources (Chainguard or Docker Official images, PyPI/npm Trusted Publishers with provenance attestations) rather than raw public registries; use minimum-age flags at a minimum (pnpm `minimumReleaseAge`, uv `--exclude-newer`, Renovate cooldowns) so a freshly hijacked release never reaches your build; pin dependencies to hashes in a lockfile and GitHub Actions to commit SHAs.

5. **Treat prompts as code.** For higher-maturity deployments, prompts should be in CI and/or a prompt repo like Langfuse, which makes it easy for non-devs to iterate on prompts. When a model updates, you can eval current and previous prompt versions to catch new problems and regressions.

6. **[Tool design](https://www.anthropic.com/engineering/writing-tools-for-agents).** There is a tradeoff between fewer, wider tools, which allow more efficiency and creativity, and least privilege. Write tool errors for the model to recover from (what went wrong and what to try next), and truncate and structure tool outputs before they enter context.

7. **Four sources of metrics on how well the agent is working.**
   1. Runtime evals and gate trips, tracked over time.
   2. Usage and growth: if people use it, it's probably useful.
   3. Vibes: what people tell you about how it works in the field. Provide easy inline human evals via thumbs-up/down and surveys.
   4. Controlled experiments and benchmarks: run the agent end-to-end on real-world out-of-sample tasks and score the results by human or automated means. A good harness for A/B testing, letting humans evaluate and label alternative outputs and traces, can be worth its weight in gold.

## Concluding remarks

**The need for good engineering doesn't go away.** Engineering moves to:

1. **Evals appropriate to the task.** These are the most important part of the process, covering runtime gating, critic-optimizer loops, and development-time optimization.

2. **Problem abstraction and decomposition.** Breaking down the problem into tractable chunks of deterministic tools and prompts.

3. **Context engineering.** LLM-friendly memory structures appropriate to the task to give the LLM the info it needs when it needs it.

You will never get determinism from an LLM, but you can make agents sufficiently trustworthy and reliable within any defined operational envelope. Set the floor, then raise it. Go forth and make reliable agents!

## Further reading

### Reliability from unreliable components

- von Neumann, J. (1956). [Probabilistic Logics and the Synthesis of Reliable Organisms from Unreliable Components](https://static.ias.edu/pitp/archive/2012files/Probabilistic_Logics.pdf).
- Avizienis, A., Laprie, J.-C., Randell, B., Landwehr, C. (2004). [Basic Concepts and Taxonomy of Dependable and Secure Computing](https://ieeexplore.ieee.org/document/1335465). *IEEE Transactions on Dependable and Secure Computing* 1(1).
- Beyer, B. et al. (2016). [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents/). Google.
- Kwa, T. et al. (2025). [Measuring AI Ability to Complete Long Tasks](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/). METR.
- Sinha, A. et al. (2025). [The Illusion of Diminishing Returns: Measuring Long Horizon Execution in LLMs](https://arxiv.org/abs/2509.09677). arXiv:2509.09677.
- Anthropic (2024). [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents).
- Anthropic (2025). [Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents).
- OpenAI (2025). [A Practical Guide to Building Agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf).

### Observability and prompt registries

- OpenTelemetry. [Semantic Conventions for Generative AI](https://github.com/open-telemetry/semantic-conventions-genai).
- Langfuse. [Prompt Management](https://langfuse.com/docs/prompt-management/get-started).
- Anthropic. [Claude Code: Monitoring with OpenTelemetry](https://docs.claude.com/en/docs/claude-code/monitoring-usage).

### Context engineering and decomposition

- Anthropic (2025). [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).
- Hong, K. et al. (2025). [Context Rot: How Increasing Input Tokens Impacts LLM Performance](https://www.trychroma.com/research/context-rot). Chroma.
- Liu, N. et al. (2023). [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172). arXiv:2307.03172.
- Anthropic (2025). [How We Built Our Multi-Agent Research System](https://www.anthropic.com/engineering/multi-agent-research-system).
- Cognition (2025). [Don't Build Multi-Agents](https://cognition.ai/blog/dont-build-multi-agents).
- Cemri, M. et al. (2025). [Why Do Multi-Agent LLM Systems Fail?](https://arxiv.org/abs/2503.13657). arXiv:2503.13657.
- Anthropic (2025). [Equipping Agents for the Real World with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).
- Anthropic. [Claude Code: Subagents](https://docs.claude.com/en/docs/claude-code/sub-agents).
- Anthropic (2025). [Building Agents with the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk).

### Contracts and structured output

- [JSON Schema](https://json-schema.org/).
- Anthropic. [Structured Outputs](https://docs.claude.com/en/docs/build-with-claude/structured-outputs).
- OpenAI. [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).
- [Instructor](https://python.useinstructor.com/) and [Pydantic](https://docs.pydantic.dev/) — schema-validated LLM output in Python.

### Idempotency, checkpointing, durable execution

- Stripe. [Idempotent Requests](https://docs.stripe.com/api/idempotent_requests).
- Apache Airflow. [Best Practices: Idempotent Tasks](https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html).
- Temporal. [Understanding Durable Execution](https://docs.temporal.io/evaluate/understanding-temporal).
- LangGraph. [Persistence and Checkpointing](https://docs.langchain.com/oss/python/langgraph/persistence).

### Grounding, provenance, hallucination

- Databricks. [What Is a Medallion Architecture?](https://www.databricks.com/blog/what-is-medallion-architecture).
- Anthropic. [Citations](https://docs.claude.com/en/docs/build-with-claude/citations).
- Min, S. et al. (2023). [FActScore: Fine-Grained Atomic Evaluation of Factual Precision](https://arxiv.org/abs/2305.14251). arXiv:2305.14251.
- Ragas. [Faithfulness Metric](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/).
- Kalai, A. T., Nachum, O., Vempala, S., Zhang, E. (2025). [Why Language Models Hallucinate](https://arxiv.org/abs/2509.04664). arXiv:2509.04664. Argues evals that penalize abstention train models to guess.
- Kirichenko, P. et al. (2025). [AbstentionBench: Reasoning LLMs Fail on Unanswerable Questions](https://arxiv.org/abs/2506.09038). arXiv:2506.09038.

### Deterministic code and verification asymmetry

- Wei, J. (2025). [Asymmetry of Verification and Verifier's Law](https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law).
- Gao, L. et al. (2022). [PAL: Program-Aided Language Models](https://arxiv.org/abs/2211.10435). arXiv:2211.10435.

### LLM-as-judge and critic-optimizer loops

- Husain, H. (2024). [Using LLM-as-a-Judge for Evaluation: A Complete Guide](https://hamel.dev/blog/posts/llm-judge/).
- Zheng, L. et al. (2023). [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685). arXiv:2306.05685.
- Shankar, S. et al. (2024). [Who Validates the Validators? Aligning LLM-Assisted Evaluation of LLM Outputs with Human Preferences](https://arxiv.org/abs/2404.12272). arXiv:2404.12272.
- Liu, Y. et al. (2023). [G-Eval: NLG Evaluation Using GPT-4 with Better Human Alignment](https://arxiv.org/abs/2303.16634). arXiv:2303.16634.
- Wang, P. et al. (2023). [Large Language Models Are Not Fair Evaluators](https://arxiv.org/abs/2305.17926). arXiv:2305.17926.
- Panickssery, A., Bowman, S. R., Feng, S. (2024). [LLM Evaluators Recognize and Favor Their Own Generations](https://arxiv.org/abs/2404.13076). arXiv:2404.13076. Self-preference bias: a reason to keep the judge model separate from the generator.
- Gu, J. et al. (2024). [A Survey on LLM-as-a-Judge](https://arxiv.org/abs/2411.15594). arXiv:2411.15594.
- Madaan, A. et al. (2023). [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651). arXiv:2303.17651.
- Shinn, N. et al. (2023). [Reflexion: Language Agents with Verbal Reinforcement Learning](https://arxiv.org/abs/2303.11366). arXiv:2303.11366.

### Evals

- Husain, H. [AI Evals: Everything You Need to Know](https://hamel.dev/blog/posts/evals-faq/).
- Husain, H. (2024). [Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/).
- Shankar, S. and Husain, H. (2026). [Evals for AI Engineers: Systematically Measuring and Improving AI Applications](https://www.oreilly.com/library/view/evals-for-ai/9798341660717/). O'Reilly.
- Anthropic (2026). [Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).
- Yan, E. (2024). [Task-Specific LLM Evals That Do and Don't Work](https://eugeneyan.com/writing/evals/).
- Chen, M. et al. (2021). [Evaluating Large Language Models Trained on Code](https://arxiv.org/abs/2107.03374). arXiv:2107.03374. Origin of pass@k.
- Yao, S. et al. (2024). [τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains](https://arxiv.org/abs/2406.12045). arXiv:2406.12045. Introduces pass^k.
- Barres, V. et al. (2025). [τ²-bench: Evaluating Conversational Agents in a Dual-Control Environment](https://arxiv.org/abs/2506.07982). arXiv:2506.07982.
- Hashimoto, M. (2026). [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey).
- Anthropic (2025). [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices).
- Tooling: [promptfoo](https://www.promptfoo.dev/docs/intro/), [Inspect AI](https://inspect.aisi.org.uk/) (UK AISI).

### Automated prompt optimization and Goodhart

- Karpathy, A. (2026). [autoresearch](https://github.com/karpathy/autoresearch).
- Khattab, O. et al. (2023). [DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines](https://arxiv.org/abs/2310.03714). arXiv:2310.03714. [dspy.ai](https://dspy.ai/).
- Opsahl-Ong, K. et al. (2024). [Optimizing Instructions and Demonstrations for Multi-Stage Language Model Programs](https://arxiv.org/abs/2406.11695). arXiv:2406.11695. MIPROv2.
- Agrawal, L. A. et al. (2025). [GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning](https://arxiv.org/abs/2507.19457). arXiv:2507.19457.
- Google DeepMind (2025). [AlphaEvolve: A Gemini-Powered Coding Agent for Designing Advanced Algorithms](https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/).
- Gao, L., Schulman, J., Hilton, J. (2022). [Scaling Laws for Reward Model Overoptimization](https://arxiv.org/abs/2210.10760). arXiv:2210.10760.
- Skalse, J. et al. (2022). [Defining and Characterizing Reward Hacking](https://arxiv.org/abs/2209.13085). arXiv:2209.13085.
- Anthropic (2025). [Natural Emergent Misalignment from Reward Hacking](https://www.anthropic.com/research/emergent-misalignment-reward-hacking).
- Wikipedia. [Goodhart's Law](https://en.wikipedia.org/wiki/Goodhart%27s_law).

### Human in the loop and model governance

- Bainbridge, L. (1983). [Ironies of Automation](https://doi.org/10.1016/0005-1098(83)90046-8). *Automatica* 19(6).
- Federal Reserve (2026). [SR 26-2: Supervisory Guidance on Model Risk Management](https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf).
- NIST (2023). [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework).
- Anthropic. [Claude Code: Hooks](https://docs.claude.com/en/docs/claude-code/hooks) — deterministic pre/post-step gates and approval points.

### Security: prompt injection, least privilege, supply chain

- Willison, S. (2025). [The Lethal Trifecta for AI Agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/).
- OWASP (2025). [Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/).
- Debenedetti, E. et al. (2025). [Defeating Prompt Injections by Design (CaMeL)](https://arxiv.org/abs/2503.18813). arXiv:2503.18813.
- Anthropic (2025). [Beyond Permission Prompts: Making Claude Code More Secure and Autonomous with Sandboxing](https://www.anthropic.com/engineering/claude-code-sandboxing).
- pnpm. [Supply Chain Security](https://pnpm.io/supply-chain-security).
- GitHub (2025). [Our Plan for a More Secure npm Supply Chain](https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/).

### Tool design

- Anthropic (2025). [Writing Effective Tools for Agents — with Agents](https://www.anthropic.com/engineering/writing-tools-for-agents).
- Anthropic (2025). [Advanced Tool Use](https://www.anthropic.com/engineering/advanced-tool-use).
- [Model Context Protocol](https://modelcontextprotocol.io/).

### Books

- Iusztin, P. and Labonne, M. (2024). [LLM Engineer's Handbook: Master the Art of Engineering Large Language Models from Concept to Production](https://www.amazon.com/LLM-Engineers-Handbook-engineering-production/dp/1836200072). Packt.
- Caldwell, T. R. (2025). [The AI Engineering Bible: The Complete and Up-to-Date Guide to Build, Deploy and Scale Production Ready AI Systems](https://www.amazon.com/Engineering-Bible-Up-Date-Production/dp/B0FX986YHD).
- Caldwell, T. R. (2025). [The Agentic AI Bible: The Complete and Up-to-Date Guide to Design, Develop, and Scale Goal-Driven, LLM-Powered Agents that Think, Execute and Evolve](https://www.amazon.com/Agentic-Bible-Up-Date-Goal-Driven/dp/B0FX6PW4T8).
