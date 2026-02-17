---
id: 7157
title: 'Speedrunning the Claude Code learning curve'
date: 2026-02-16T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7157
permalink: /2026/02/claude-code
categories: tech, AI
tags: AI
image: /assets/2025/Claude_code.png
mathjax: false
description: A quickstart to Claude Code, Anthropic's agentic coding command-line interface (CLI) tool, and roadmap to being an expert.
---
> Claude Code, Anthropic's agentic coding command-line interface (CLI) tool, has been a growing phenomenon.
> 
> What we will cover:
> 
> - A quick start for those who haven't tried it
> - Best practices and how to climb the ladder to being a Claude Code AI coding expert
<figure>
<picture>
  <source srcset="/assets/2025/Claude_code.png" type="image/png">
  <img src="/assets/2025/Claude_code" alt="Claude Code" fetchpriority="high" style="width: 100%; height: auto;">
</picture>
</figure>

<!--more-->

Claude Code is Anthropic's agentic coding tool — a command-line interface (CLI) that lets you delegate coding tasks directly to Claude. 

## What we will cover:

- Quick start for those who haven't tried it
- Best practices and how to climb the ladder to be an expert

## Why Claude Code

Lots of excitement last few months, why is that?

- **Excellent models**: Sonnet and Opus, multi-model to 'see' output, tool-calling, long 200K context window (Opus 4.6 supports 1M, but Claude Code currently uses 200K; quality degrades when context is ~50% full, so clear context frequently).
- **A simple, effective ReAct control loop**: Plan → code → test → iterate as necessary.
- **Plan-driven long-term memory**: It writes plans in `.md` files and uses them to stay on task. Thinking and planning before acting, and staying on plan, is enables far longer and more complex work compared to vanilla single-turn LLM chat. 
- **Rich internal tooling**: A plethora of internal tools and subagents to understand, find, and edit code — plus MCP tool support. Good tools that look up exact function signatures or retrieve precise documentation outperform generic web searches  or putting full files in context, for large doc pages. (ChatGPT would often give answers from an outdated API due to training data cutoff; if you have a tool that fetches the exact doc or code you need, and patches a specific line of code, everything works better.)
- **Large community ecosystem**: A growing community of skills, MCP servers and plugins, with strong third-party integration support. (OpenAI's codex is good and adopting MCP and skills, but strategy seems to be to push you toward their walled garden.)
- **Multi-tasking subagents**: Spawn isolated agents for parallel work.
- **Continuous improvement**: Anthropic can collect traces and up/down votes from Claude Code usage and integrate them into RLHF training, they have a flywheel going.
- **Real-world reliability**: Claude Code can now solve complex problems and refactors, run for 30+ minutes on a complex plan without getting off track, understand brownfield codebases, produce minimal slop, get things 90%+ right, and fix most remaining issues iteratively.
- **Autonomous operation**: Can even run autonomously for many hours if you have the token quota and the right hooks.
- More mature than OpenAI Codex and Gemini CLI which are closest comparisons. IDEs like Cursor, Windsurf, GitHub Copilot in VS Code are also developing agentic coding assistants. Combining Claude Code with your favorite IDE is most typical best practice.
  reference). People finding this post will want to know why Claude Code over the alternatives.
- [YouTube: How Claude Code Works](https://www.youtube.com/watch?v=RFKCzGlAU6Q)

## Levels of Coding Assistance

| Level | Description |
|-------|-------------|
| 0 | **Spicy autocomplete**: Tab-completion on steroids |
| 1 | **Intern**: Code boilerplate, comments, etc. |
| 2 | **Junior dev / pair programmer**: Review each other's code, delegate boring stuff |
| 3 | **Senior dev**: You are its manager and guide; it does most of the work |
| 4 | **Engineering team**: You work out longer tasks; it can work for hours |
| 5 | **Lights-out software factory**: You give it plain language; it goes and executes |

Source: [The Five Levels from Spicy Autocomplete to the Software Factory](https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/) — Dan Shapiro

This guide should get you to level 2–3 and provide a roadmap to get to 4–5.

## Getting Started

### Install

- [Set up Claude Code])https://code.claude.com/docs/en/setup)
- Pricing: [Pro](https://claude.com/pricing), [$100 and $200 Max plans](https://claude.com/pricing/max) . Start with Pro to learn, once you do real work you will run out of tokens from time to time, Pro gives you limited tokens in a 4-5 hour window. Use `/status` to see where you are with usage and when it resets. Once you start developing big plans that code for 30 minutes, you will run out very fast in Pro, need a $100 Max plan. The $200 plan is if you have multiple sessions at once, or otherwise are running out in the $100 plan.

### Claude.md - super important

- **`/init`** — Sets up `CLAUDE.md` files: project-level, personal project (not committed to git), and personal global.
  - **Project-level** (`CLAUDE.md` in repo root) — Shared team instructions committed to git. Rules, conventions, and context about how the repo works that every contributor (human or AI) should follow.
  - **Personal project** (`.claude/CLAUDE.md` in repo root) — Your personal preferences for this specific repo, gitignored by default. Good for individual workflow preferences you don't want to impose on teammates.
  - **Personal global** (`~/.claude/CLAUDE.md`) — Your preferences that apply across all projects. Style preferences, default behaviors, and personal rules that follow you everywhere.
- **`# "remember this"`** — Shortcut to save a note to the project `CLAUDE.md`. Always make new mistakes — when Claude does something wrong, add a rule. For instance: *"Whenever you make a change, use Playwright to look at the fix and verify it."*
- Keep `CLAUDE.md` short: definitely under 150 lines, ideally ~50. Longer files risk Claude forgetting items within them.
- [claude.md starter kit](https://github.com/abhishekray07/claude-md-templates) — Point Claude at this repo and say: *"Improve CLAUDE.md based on these criteria."*
- You can do multiple passes of *"check my repo changes and update CLAUDE.md"* — and update it regularly. It's a living document describing how your repo works and how you like to develop.

### Essential Commands and Navigation

- **`/` commands** — Type `/` to see all available commands.
- tab - Autocomplete commands and file paths
- `Up` / `Down`Navigate prompt history (works across sessions)
- **`/status`** — Show current session status.
  - **Status line** — Customizable; you can display context usage %, etc. Ask Claude how to customize the status line with a script.

- **`[Shift+Tab]`** — Toggle between Plan mode, Auto-accept mode, and Default mode (prompt before changes).
- **`@` files** — Reference specific files in prompts with `@myfile.txt`.
- **Drag and drop** images, or paste with **Ctrl+V** (not Cmd+V on Mac). Claude Code can read screenshots, images, diagrams. Paste a screenshot of a bug to fix. Or prompt it how to create an image ouptut with Figma or Playwright, then check it, and iterate on it.
- **`/model`** — Switch between Sonnet and Opus.
- **`/ide`** — Claude can see what you selected in IDE, read IDE listing errors etc., put proposed changes inline with diffs
- **`/vim`** — can use emacs (default) or vim keybindings in editor. `/keybindings`Open `~/.claude/keybindings.json` to customize all shortcuts
- `Ctrl+R`Search prompt history
- **`/resume`** or **`claude --resume`** and **`claude --continue`** — Resume work in a previous conversation thread where you left off.
- **`[escape]`** — stop what it's doing if you forget to tell it something or it's going off the rails
- **`[escape] [escape]`** or **`/rewind`** — return to earlier point in conversation, get rid of digressive context
- `Ctrl+D Ctrl+D` Exit Claude Code
- scan through all the commands, If you don't know something, ask Claude — it has built-in tools to look up its own docs for you.

## Dev Loop: Spec-Driven Development

### Recommended Plugins

-  install via `/plugin` , can't recommend these strongly enough

- **context7** — Look up docs for any Python module (or other languages).

- **Superpowers** — Test-driven development workflow. Started as an open-source community project, now in the Anthropic plugin marketplace. Other similar plugins (these not recommended, but give you a flavor of what people are doing):

  - **BMAD/Spec Kit**: Persona-based agents (Business Analyst, Architect, Developer, etc.), full PRD workflows — very heavyweight.

  - **OpenSpec**: Document-driven planning: Requirements → Design → Tasks → Changes (audit trail).

- **Python-oriented**:
  - `pyright-lsp`
  - `code-review`
- **Front-end**:
  - `frontend-design`
  - `playwright` — browser so Claude can visually check its work (or use the Chrome plugin; put your preference in `CLAUDE.md`, e.g., *"Always check changes using Playwright"*).
- [Official plugins](https://github.com/anthropics/claude-code/tree/main/plugins)
- [Plugin marketplaces](https://claudemarketplaces.com/)

### The Development Workflow

1. **Start in Plan mode** — Don't write code yet. Go back and forth with the LLM to critique and improve the plan.
2. **Shift+Tab** to toggle between Plan mode (blocks code writing), Default mode (prompts for changes), and Auto-accept mode (makes all changes).
3. **Pre-approve permissions** — You'll find you have to approve a lot of bash commands (reading the codebase, looking up docs). Use `/permissions` to pre-approve non-destructive commands like `ls`. You can also create an alias:
   ```bash
   alias claudeyolo='claude --dangerously-skip-permissions'
   ```
   But only use this in an environment where it can do no harm, like a throwaway VPC or container. (Consider adding hooks to block destructive commands like `rm` and `git`.)
4. **Brainstorm the plan** — Say: *"I would like to brainstorm and create a plan to build [high-level intention]."* Then provide detailed info about what you want. The Superpowers plugin will ask questions to help write a plan.
5. **Read and edit the plan** — It's your project, not Claude's, especially at the planning stage.
6. **Cross-check with another AI** — Use e.g. OpenAI or Codex to review: *"What details and edge cases might I have missed?"* Iterate a few times. See: [Rule of 5 Passes over Design, Code, etc.](https://steve-yegge.medium.com/six-new-tips-for-better-coding-with-agents-d4e9c86e42a9)
7. **Visual aids welcome** — Give it a sketch, put ASCII art in the plan, or hook up the Figma plugin to mock up a UI.
8. **Ask questions** — e.g., *"What are the tradeoffs between storing data in JSON vs. SQLite vs. Markdown files?"*
9. **When the plan looks good, tell it to write the code.**
10. **Error recovery patterns** — If it goes off the rails, keeps producing broken code, or misunderstands the task (interrupt → clarify → `/rewind` → retry).
11. **Important: Include acceptance tests in the plan** — Give Claude a way to verify output: pytest, npm test, Playwright for UI, or rendering a PNG for graphical artifacts. Testable plans let it iterate, easily double the quality of the output.
12. **Do several passes of code review** — [Example prompt](https://www.reddit.com/r/ClaudeAI/comments/1q5a90l/so_i_stumbled_across_this_prompt_hack_a_couple/): *"Do a git diff and pretend you're a senior dev doing a code review and you HATE this implementation. What would you criticize? What edge cases am I missing?"* Go back and forth with OpenAI for diversity. Use the `code-review` plugin or [Turing Skill](https://github.com/turingmindai/turingmind-code-review). 
13. **Fix what you missed** — You'll probably notice gaps; ask Claude to fix them.
14. **Don't be afraid to start over** — It's cheap. When you realize the architecture is wrong, tell it to write a detailed plan describing everything it did, then build a whole new version in a parallel directory. As [Boris Cherny](https://www.reddit.com/r/ClaudeAI/comments/1q2c0ne/claude_code_creator_boris_shares_his_setup_with/) puts it: *"Knowing everything you know, design a more elegant solution."*

Do what works for you — different people have different workflows. If people can build C compilers and operating systems with these tools, you can probably build most things. The key is good specs and a way to verify.

## Extensions

### Skills

- **Procedural knowledge** about how to do something with tools and subagents.
- Custom slash commands and skills have been merged, same thing.
- Any boilerplate task — setting up a project, plan review, code review, security review — you can set up a skill so Claude does it the way you want.
- A skill is a `.md` file describing how to do something, with metadata (frontmatter), optionally with *scripts* and *context* file data.
- [Anthropic: Complete Guide to Building Skills](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en)
- [Anthropic Docs: Skills](https://code.claude.com/docs/en/skills)
- Very easy to build — there's a built-in skill-builder skill. Just ask Claude to help.

### MCP Servers

- An MCP server is a Web server with tools Claude Code and AI generally can call as necessary. You configure Claude to say it has access to these tools and when to call them. Anytime you ask Claude to do something, if it thinks the tool will help, it calls the tool and uses the output to respond.
- Use the **`/mcp`** command to manage servers.
- A couple of MCP servers is fine; 10+ is probably too many. When MCP tool descriptions exceed 10% of your context, Claude automatically defers them and loads tool details on demand ("MCP Tool Search"). But it's better to start lean.
- A little harder to build than skills, but there's an MCP builder — ask Claude to help you create an MCP server as e.g. a Python script with FastMCP and tool decorators.
- [Connectors](https://claude.com/connectors): Third-party MCP integrations
- [MCP Documentation](https://modelcontextprotocol.io/docs/learn/server-concepts)

### Plugins

- A plugin is a **packaging mechanism** to distribute skills, MCP servers, and related artifacts.
- Bundles skills (including definitions, scripts and data artifacts), hooks, subagents, MCP servers, into a single installable unit.

### Tools vs. Skills: When to Use What

In general, **always prefer skills** if they are available. Skills are currently more context-efficient and performant. They use progressive disclosure: by default, only a small metadata summary is loaded; the full instructions load only when needed. MCP servers consume more context; if there are too many, Claude puts them into a meta-tool search index (search for the tool first, then load its details).

If a third party wants to expose functionality that lives on their server, they might host an MCP server you can connect to. But if they have a CLI that exposes the same functionality, packaging it as a skill will generally work better.

In both cases, if prompts aren't calling the tool/skill when you expect, you may need to improve the descriptive metadata or explicitly tell Claude to use it. If context gets large, Claude forgets things. If an MCP server has many tools, consider making a simpler version.

**CLIs are free context.** Claude already knows how to shell out to `gh`, `aws`, `docker`, `psql`, `stripe`, etc. No tool definitions get loaded. No startup cost. Boris Cherny presents CLI, MCP, and API as roughly equivalent options — the right choice depends on the task.

| Task | CLI (preferred) | MCP (only if needed) |
|------|-----------------|----------------------|
| GitHub operations | `gh pr create`, `gh issue list` | GitHub MCP |
| AWS operations | `aws s3 ls`, `aws ecs describe` | AWS MCP |
| Database queries | `psql -c "SELECT..."` | Postgres MCP |
| Docker management | `docker ps`, `docker logs` | Docker MCP |

**Skill-related tips:**

- Skills use progressive disclosure and can scale to many — only frontmatter/metadata loads by default.
- If a skill isn't triggering correctly, improve the frontmatter or tell Claude explicitly to use it.
- Skills can include context data and accept arguments.
- Use MCP only for external integrations where a skill can't work.
- Useful meta-skills: `writing-skills`, `skill-creator` (Anthropic).

## Context Management Is The Key

Context management is the single most important skill for effective Claude Code usage.

- **Too little context**: Claude may not know APIs and will hallucinate, focus on the wrong things, or write overly defensive code.
- **Too much context**: Claude may forget or fail to retrieve important details.
- **Bad context**: Outdated or incorrect information leads to wrong answers.
- **Context rot**: Quality tends to fall when context reaches ~50% full.

Effective use of Claude.md, skills, is about giving Claude the right context at the right time.

### Essential Context Commands

- **`/clear`** — Do one task, then clear context. The 200K window is large but not all equally usable. Also saves on tokens and your quota budget.
- **`/context`** — Shows what Claude is currently tracking: system prompt, `CLAUDE.md`, MCP servers, skills, and messages. 
- **`/compact`** — Summarizes context, but it's somewhat of a black box. Prefer `/clear` and explicit, mindful context management over implicit `/compact` or auto-compact.
- **`/rewind`** (or **Esc Esc**) — If you had a digression to figure something out, rewind to an earlier point to "forget" useless context.
- **`/export`** — Save your context. Helpful if you want to review why Claude did what it did. Some people save at key checkpoints and even commit them to git.
- **`/resume`** — Scroll previous conversations and pick up where you left off.
- **Escape** — Anytime Claude is going off track, hit Escape to interrupt and redirect.

## Advanced Topics

### Worktrees

A lot of time is spent waiting for Claude — what do you do? Work on multiple things simultaneously without them clobbering each other.

- Git worktrees share the same `.git` subfolder.
- Can be annoying if they conflict on npm ports; you can pre-warm 5 worktrees with dependencies.
- [worktrunk](https://github.com/max-sixty/worktrunk) — A CLI for making worktrees easy.
- [conductor.build](https://www.conductor.build/) — Mac GUI for managing multiple Claude Code sessions; takes away the complexity of working with worktrees and multiple sessions.
- Can also use multiple terminals / tmux

### Subagents

- Isolated context helps with context engineering and management, but it's harder to see what a subagent is doing.
- Good use case: code review, or when you want Claude to do extensive research without polluting the main context — send it off to gather results and just return the findings.

### Agent Teams

You can set up multi-agent teams with different prompts — e.g., scrum master, system architect, front-end dev, back-end dev, tester, code reviewer.

### Permissions

Add permissions in `settings.local.json` under `.claude` so you don't have to approve every `ls`. You could create a personal skill that always sets up new projects with the right permissions.

### Hooks

Hooks let you run something before or after a tool executes.

- Use cases: formatters, linters, testers, guardrails.
- 9+ hook trigger points (and growing).
- Run in YOLO mode (`alias claudeyolo='claude --dangerously-skip-permissions'`) but add a hook for destructive commands (`rm`, `git`, etc.).
- Put guidance in `CLAUDE.md` too, but a hook *guarantees* code will run when something happens.
- **Ralph Wiggum plugin**: A hook that intercepts the "stop" event, lets you test when a prompt completes to ensure it met spec, and resumes if necessary. You create a test/promise; on exit, it runs the test. If the desired result hasn't been achieved, it keeps going — enabling long-running prompts that perpetually find issues and fix them.

### Hook Ideas

1. **PreToolUse — File Protection Guard**
   - Matcher: `Edit|Write`
   - Blocks edits/writes to protected files (`.env`, `.env.local`, `package-lock.json`, `.git/`). Exits with code 2 (block) if the file path matches a protected pattern.

2. **PostToolUse — Edit Logger**
   - Matcher: `Edit|Write`
   - After every file edit or write, appends a timestamped log entry to `~/.claude/edit-log.txt` with the modified file path. Creates an audit trail for all file changes.

3. **SessionStart — Ralph Recovery Context**
   - Script: `scripts/hooks/session-start.sh`
   - Creates transcript directories (`docs/transcripts/raw`, `processed`, `summaries`, `subagents`).
   - Logs session ID and project directory.
   - Tracks active session in `.active-session` file.
   - Outputs recovery context: current branch, uncommitted file count, current phase from `task_plan.md`, in-progress tasks.
   - Prints the "run /systems" reminder.

### CI/CD Integration

- PR review — Analyzes diffs, finds bugs, flags security issues (often catches logic errors humans miss while humans nitpick variable names).
- Code implementation — Comment @claude implement this on an issue, and it creates a PR with working code.
- Bug fixes — @claude fix this bug generates a fix PR.
- PR summaries — Generates human-readable summaries of large PRs for easier review.
- Release notes — Trigger on tag push to summarize all PRs in a release.
- CI debugging — Reads workflow logs and diagnoses failures.
- Resources
  - [Official GitHub Action](https://github.com/anthropics/claude-code-action)
  - [Anthropic docs: GitHub Actions](https://code.claude.com/docs/en/github-actions)
  - [GitHub Marketplace listing](https://github.com/marketplace/actions/claude-code-action-official)


### Frontier stuff

- [Steve Yegge's Gas Town](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04) , multiple instances of agents that share memory, talk to each other
- [Jeff Emanuel's Agent Flywheel](https://agent-flywheel.com/) . Similar, can work across Claude Code, OpenAI Codex, Gemini CLI

## Security

- Claude Code runs with all the permissions of the user and access to bash, which is too much for some environments. (blew away my Docker env one time) To lock it down
  - Deploy with pre-configured permissions and hooks to block destructive commands without approval, `rm`, `git`
  - Deploy in container with only access to container, broaden as necessary for task
  - After writing some agents and skills, package into a web app that runs using Claude Agent SDK which is essentially a Claude Code API

## Other Best Practices

- **Keep asking questions** — Claude Code can tell you how to use itself, how to write prompts, and how to build things. If you want to learn subagents, ask: *"I do this task a lot; I'd like to make a custom subagent that can accomplish it."*
- **Get the right plugins for your task**:
  - `context7` — Pull in all the docs.
  - Front-end: `frontend-design`, Playwright (so Claude can see its output).
  - Python: `pyright-lsp` for parse tree understanding, `code-review` for code review and simplification.
- **Use the Superpowers plugin for brainstorming**, or OpenSpec for document-driven plans.
- **Always start in Plan mode.**
- **`/clear` context often**, saves tokens and works faster and better without confusing Claude
- **Git integration** — Claude Code has native awareness of `git diff`, branch context, and how to leverage it for PR descriptions, commit messages, and changelog generation. There is a github plugin. **Commit often.**
- /doctor for info about config, current v. stable version. Possibly keep people on stable version. Update with `claude update`
- Opus for complex planning and complex tasks, can usually use Sonnet for coding (managing token cost); switch with `\model`.
- **Multiple plan iterations for complex work** — Tell Claude to write the plan to an `.md` file, edit it yourself, ask a different AI (like Codex) to review.
- **The dev loop**: Plan → Code (with tests) → Code review → Iterate.
- **The "god prompt"**: *"You're a cranky senior developer who hates me and my code. Tell me everything that's wrong — all the edge cases I missed."*
- **It's cheap to throw away and start over** — Say: *"Write a new version that does the same thing but structures it like this."* The previous version functions as a spec. You may do this 2–3 times, because the first build reveals what you were missing, then you add the kitchen sink ([Brooks's Second-System Syndrome](https://en.wikipedia.org/wiki/Second-system_effect)), then you realize much of the detailed cases can be generalized.
- **Sandbox as thoroughly as possible** — You might be tempted to develop with access to a production resource like a database or API — don't. All bets are off. YOLO in a sandbox, then PR into a feature branch when something works.
- **Voice input** — Some people swear by Wispr Flow voice keyboard for talking to Claude Code.
- **Give logs and screenshots** of what happened to help troubleshoot.
- **Headless/CI mode** — Running Claude Code in CI pipelines (`claude -p "prompt" --output-format json`) for automated code review, test generation, or migration tasks. Can use **`--max-turns`** — Control how many autonomous steps Claude takes before stopping for human review.
- **SDK/library mode** — Use [Claude Code as a module](https://platform.claude.com/docs/en/agent-sdk/overview) from other scripts or a UI, building custom agentic workflows.

## Concluding remarks.

- [The documentation is excellent](https://code.claude.com/docs/en/overview).
- Anyone can vibe-code now...If you have been waiting to get started, wait no more!
