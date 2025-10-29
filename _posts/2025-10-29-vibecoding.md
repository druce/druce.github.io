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
</figure>

<!--more-->

AI coding assistants and vibecoding are a sea change in the world of software engineering. They make midwit [code monkeys](https://www.youtube.com/watch?v=qYodWEKCuGg) like me something like 20% faster at creating a given functionality, but they also let me tackle things I never would have tackled, and the output is more robust in the long run, in terms of docs, tests, readability.

Suppose I want to do a traveling-salesman traversal of a bunch of news headlines in topic order. With Cursor or Claude Code, I can ask it to find all the python modules that do traveling salesman and perform my task. And I can look at the code, run them, pick the one that is performant and makes sense. I can try different embeddings and choose the smallest one that works (or do dimensionality reduction).

I've known 10x devs who can just emit complex working C code fluently and it works on the first try, and I can't do that. But using a coding assistant, I feel like one of them. It feels like I've been given superpowers.

And then with Claude Code I can say, add this field to the database schema, update the CRUD code to reflect it, write tests, and update the docstrings. And it will one-shot it.

I could even sketch a UI and say, make this using React and bootstrap, and it will do a passable job. I can integrate it with GitHub, assign it PRs and it will take a crack at them. I can spawn multiple sessions and have multiple agents working on multiple Git branches. I can give it my style hints on how I write code, write my own slash commands, lots of [awesome stuff](https://github.com/hesreallyhim/awesome-claude-code).  [AI-first dev is just different](https://creatoreconomy.so/p/inside-claude-code-how-an-ai-native-actually-works-cat-wu).

If you are a late adopter, update your toolchains! Take the mini courses on [Claude Code](https://learn.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant/lesson/66b35/introduction) and [Cursor](https://cursor.com/en-US/learn) and start to use them effectively.

Now let's talk about [Claude Skills](https://www.anthropic.com/news/skills). Because I think they might also be a bit of a sea change, and let normies build pretty strong agentic workflows, without using a python agentic framework like LangGraph or OpenAI Agents SDK, or even a lightweight agent builder like Zapier or Copilot Studio.

"A skill is a Markdown file telling the model how to do something, optionally accompanied by extra documents and pre-written scripts that the model can run to help it accomplish the tasks described by the skill." (direct quote from Simon Willison)

It's an orchestration layer. It's the world's simplest, most effective agent framework.

Suppose you want the LLM to act like your travel agent, based on some [MCP tools](https://www.anthropic.com/news/model-context-protocol) from airlines and booking.com. With MCP, You could tell the LLM, book me a ticket from New York to Paris. And it will look at the MCP tool, say OK! This lets me search for flights, book them etc.

Now with skills, I can write a markdown file that says: always buy business class, no redeyes, window seat, because that's how I roll. Prefer Delta because I am Diamond Medallion.

On Claude Desktop you make a skill by creating a markdown file explaining that this is a skill for buying airline tickets, and here's a workflow to do that.

When you start a chat it puts a token-efficient directory of available skills in the context.

Then when you say, book me a ticket, the first thing the LLM does is bring the full skill details into the context. It's like the LLM now has a binder full of SOPs and when there is something relevant in the binder, before starting the task it takes out the checklist from the SOPs.

That may not sound like much, but this happens at runtime and you can also say, try booking.com, but if it times out retry 3 times. And then do Expedia and then Travelocity. So you can do a loop and control flow.

And then you could say, if I book a flight to Asia, give me an overnight in London so I can visit my gran, first book NY to London and then London to Singapore or whatever using the same airline ticket skill. So that's recursion.

And then, one required tool in this context is computer use, running in a sandbox. You can give your skill bash scripts and python scripts. So they can run more complex behaviors, without writing full MCP tools.

In the Claude Desktop sandbox, the computer use tool can't access enterprise files, just what you upload to the sandbox. Still, easy way to implement small tools like, extract something from a PDF.

In Claude Code CLI a skill script can access local resources, network and the Web (with permission), so you could write a tool that just runs locally as a script and accesses the network and enterprise files.

So skills are more than hints files, they are an ultra simple agent framework and orchestration layer. For example, have a few skills that perform different tasks on videos with ffmpeg; have another skill that runs an end to end production process using those skills based on a doc explaining the process like a directed acyclic graph.

Or even 3 skills like plan a to-do list, code, test, and then a high level skill that says, take an objective from user and loop through: 1) update to-do list, 2) code the 1st item on list, 3) test and record outcome, until the objective is achieved. You just built a [ReAct agent](https://simonwillison.net/2025/Sep/18/agents/) and a primitive version of Claude Code.

OpenAI and Microsoft have ~9 agent frameworks between them. Anthropic has 0. And yet, Anthropic has the most successful agentic tool for the biggest enterprise use case which is coding. Because Claude Code is really a universal agent. With tools + skills + computer use you can tell it to do anything.

I think Claude Code works because it has
   1) a great to-do list workflow so it doesn't go off task.
   2) great context engineering using skills, putting the right part of the code base in the context
   3) a great LLM well-tuned for this process.
   
Seems like a lot of agentic bang for minimal framework complexity bucks.

If you haven't already done it, try Claude Code, hook up some [MCP servers](https://mcpmarket.com/categories/developer-tools) and try some [skills](https://github.com/anthropics/skills). I have barely scratched the surface and am excited to do more.
