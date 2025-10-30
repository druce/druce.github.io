---
id: 7150
title: 'Claude Code, Claude Skills and the Vibe Coding Revolution'
date: 2025-10-29T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7150
permalink: /2025/10/vibecoding
categories: AI
tags: AI

---

> Another [Simon Willison post](https://simonwillison.net/2025/Oct/16/claude-skills/) has motivated me to go down a rabbit hole.

<figure>
  <img src="/assets/2025/karpathy.jpeg"
  alt="Vibecoding, by Andrej Karpathy.">
  <figcaption>Image credit: <a href="https://twitter.com/karpathy">Andrej Karpathy</a></figcaption>
</figure>

<!--more-->

AI coding assistants and vibecoding are a sea change in the world of software engineering. They make midwit [code monkeys](https://www.youtube.com/watch?v=qYodWEKCuGg) like me something like 20% faster (depends on task, others say different, parts [one](https://arxiv.org/abs/2302.06590), [two](https://economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf), [three](https://arxiv.org/abs/2507.09089))at creating a given functionality, but they also let me tackle things I never would have tackled, and the output is more robust in the long run, in terms of docs, tests, readability.

Suppose I want to do a traveling-salesman traversal of a bunch of news headlines in topic order. With Cursor or Claude Code, I can ask it to find all the Python modules that do traveling salesman and perform my task. And I can look at the code, run them, pick the one that is performant and makes sense. I can try different embeddings and choose the smallest one that works (or do dimensionality reduction).

I've known 10x devs who can just emit complex working C code fluently and it works on the first try, and I can't do that. But using a coding assistant, I feel like one of them. It feels like I've been given superpowers.

And then with Claude Code I can say, add this field to the database schema, update the CRUD code to reflect it, write tests, and update the docstrings. And it will one-shot it.

I could even sketch a UI and say, make this using React and Bootstrap, and it will do a passable job. I can integrate it with GitHub, assign it PRs and it will take a crack at them. I can spawn multiple sessions and have multiple agents working on multiple Git branches. I can give it my style hints on how I write code, write my own slash commands, lots of [awesome stuff](https://github.com/hesreallyhim/awesome-claude-code).  [AI-first dev is just different](https://creatoreconomy.so/p/inside-claude-code-how-an-ai-native-actually-works-cat-wu).

If you are a late adopter, update your toolchains! Take the mini courses on [Claude Code](https://learn.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant/lesson/66b35/introduction) and [Cursor](https://cursor.com/en-US/learn) and start to use them effectively.

Now let's talk about [Claude Skills](https://www.anthropic.com/news/skills). Because they might also be a bit of a sea change, and let normies build agent workflows, without using a Python agent framework like LangGraph or OpenAI Agents SDK, or even a lightweight agent builder like Zapier or Copilot Studio.

"A skill is a Markdown file telling the model how to do something, optionally accompanied by extra documents and pre-written scripts that the model can run to help it accomplish the tasks described by the skill." (direct quote from Simon Willison)

It's an orchestration layer. It's the world's simplest, most effective agent framework.

Suppose you want the LLM to act like your travel agent, based on some [MCP tools](https://www.anthropic.com/news/model-context-protocol) from airlines and booking.com. With MCP, you could tell the LLM, book me a ticket from New York to Paris. And the LLM will look up the right MCP tool, say OK! This lets me search for flights, book them etc.

Now with skills, I can write a markdown file that says: "always buy business class, no redeyes, window seat, because that's how I roll. Prefer Delta because I am Diamond Medallion."

On Claude Desktop you make a skill by creating a markdown file explaining that this is a skill for buying airline tickets, and here's a workflow to do that.

When you start a chat it puts a token-efficient directory of available skills in the context.

Then when you say, book me a ticket, the first thing the LLM does is bring the full skill details into the context. It's like the LLM now has a binder full of SOPs and when there is something relevant in the binder, before starting the task it takes out the checklist from the SOPs.

That may not sound like much, but this happens at runtime and you can also say, try booking.com, but if it times out retry 3 times. And then do Expedia and then Travelocity. So you can do a loop and control flow.

And then you could say, if I book a flight to Asia, give me an overnight in London so I can visit my gran, first book NY to London and then London to Singapore or wherever using the same airline ticket skill. So that's recursion.

And then, one required tool in this context is computer use, running in a sandbox. You can give your skill bash scripts and Python scripts. So they can run more complex behaviors, without writing full MCP tools.

You should be able to write [complex agent patterns](https://druce.ai/2025/05/agent_engineering) by writing small skills combining some scripts and plain English descriptions, and an orchestrator skill in plain English.

In the Claude Desktop sandbox, the computer use tool can't access enterprise files, just what you upload to the sandbox. Still, easy way to implement small tools like, extract something from a PDF.

In Claude Code CLI a skill script can access local resources, network and the Web (with permission), so you could write a tool that just runs locally as a script and accesses the network and enterprise files.

So skills are more than hints files, they are an ultra simple agent framework and orchestration layer. For example, have a few skills that perform different tasks on videos with ffmpeg; have another skill that runs an end to end production process using those skills based on a doc explaining the process like a directed acyclic graph.

Or even 3 skills like plan a to-do list, code, test, and then a high level skill that says, take an objective from user and loop through: 1) update to-do list, 2) code the 1st item on list, 3) test and record outcome, until the objective is achieved. You just built a [ReAct agent](https://simonwillison.net/2025/Sep/18/agents/) and a primitive version of Claude Code.

OpenAI and Microsoft have ~9 agent frameworks between them. Anthropic has 0. And yet, Anthropic has the most successful agentic tool for the biggest enterprise use case which is coding. Because Claude Code is really a universal agent. With tools + skills + computer use you can tell it to do anything.

Claude Code works because it has
   - a great to-do list workflow so it doesn't go off task.
   - great context engineering using skills, putting the right part of the code base in the context
   - a great LLM well-tuned for this process.

Skills and MCP can bring Claude Code to a higher level.
  - a skill + computer use can be act an MCP tool but it's simpler to implement
  - the gradual discovery of skills means you can use more of them without confusing the LLM
  - they operate at a higher level in the stack compared to tools and can call each other, so potentially implement more complex agent patterns.

Skills add a lot of agent bang for minimal framework complexity bucks.

The 'agentic browsers' are a bit disappointing to me, I can't really tell it, read this folder full of PDFs and extract relevant parts for this presentation I am doing into 'index cards' I can put into Obsidian or Notion. And I still have some security concerns about prompt injection. But I can do this research task with Claude Code. And over time all browsers will be agentic browsers with skills, probably.

Claude Code and skills punch above their weight. You can use Claude Code and skills as a universal to do anything on your computer implementing complex agent patterns.

If you haven't already done it, try Claude Code, hook up some [MCP servers](https://mcpmarket.com/categories/developer-tools) and try some [skills](https://github.com/anthropics/skills). I have barely scratched the surface and am excited to do more.
