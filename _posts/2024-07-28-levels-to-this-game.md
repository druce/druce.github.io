---
id: 7137
title: 'There Are Levels To This Game: The 5 Stages of AI Adoption'
date: 2024-07-28T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7137
permalink: /2024/07/levels-to-this-game
categories: datascience
tags: datascience

---
<figure>
  <img
  src="/assets/2024/5levels-of-ai-small.jpg"
  alt="Expanding Brain Meme of the 5 Levels of AI Adoption.">
  <figcaption style="text-align: center;">
  Expanding Brain Meme of the 5 Levels of AI Adoption.
  </figcaption>
</figure>

<!--more-->

Here is how we climb up the ladder of success in using generative AI:

## Level 1- Basic Prompting

- Ask ChatGPT to write a professional email.
- Create an image for a slideshow or marketing copy.
- Write code, a web page, a Python function, a SQL statement, or CloudFormation YAML.
- Use [Perplexity](https://www.perplexity.ai/), [Consensus](https://consensus.app/), one of the top [custom GPTs](https://gptstore.ai/) for simple tasks like retrieval-augmented generation.
- Find and use [AI SaaS tools](https://hackernoon.com/the-10-best-directories-for-ai-tools)

Soon, you ask ChatGPT for something a bit more complex, and it doesn't work very well. Now you are ready for…

## Level 2 - Advanced Prompting
- I wrote a [blog post](https://druce.ai/2024/01/prompting) here. C-L-E-A-R is a good mnemonic acronym:
	- *Contextualize* - Specify a role or persona: *"You are a copy editor with years of experience polishing articles and blog posts for web publication."*
	- *Limits* - Length; format like three bullet points; tone or style like concisely, or like a tech journalist, or only use facts from this text.
	- *Elaborate and give Examples* - Explain and provide as much detail and specifics as possible. Use [chain of thought](https://www.promptingguide.ai/techniques/cot) and [other advanced prompting methods](https://arxiv.org/abs/2407.12994).
	- *Audience* - Identify the audience the response is addressed to, such as 'explain like I'm 5'.
	- *Reflect or Review* - Ask ChatGPT to ask clarifying questions before answering, give itself space, such as "think step by step", "make sure of x before answering".
- Take a course on [prompt engineering](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/).
- Explore [other people's prompts](https://github.com/f/awesome-chatgpt-prompts) on the Web.
- Make your own prompt repository on your PC, or use an app like [AIPRM](https://www.aiprm.com/).
- Use [ChatGPT custom instructions](https://openai.com/index/custom-instructions-for-chatgpt/).
- Ask a [custom GPT](https://gptstore.ai/gpts?lang=&q=prompt) to write your prompts or improve them.
- Start using integrations like Copilot; I use the [Obsidian](https://github.com/logancyang/obsidian-copilot) integration.

These integrations let you make templates, so you can create a keyboard shortcut to trigger a function like, "copy-edit this blog post". Now you are moving on to Level 3!

## Level 3 - Templates and Single-Prompt Apps

- Develop your own [custom GPT](https://help.openai.com/en/articles/8554397-creating-a-gpt), with a single prompt and some data. Upload a document or knowledge base and set up your own retrieval-augmented generation to make a question-answering chatbot and talk to your knowledge base.
- Develop an app that applies a prompt using a template using Jupyter or a Python script. For instance, here I ask ChatGPT to [copy-edit a blog post](https://github.com/druce/AInewsbot/blob/main/CopyEdit.ipynb) and show markup of the before and after. 
- Use [LangChain](https://python.langchain.com/v0.1/docs/use_cases/) for different workflows. Try different LLM models like Google Gemini and Claude Sonnet through the API.
- Create a one-turn agent that [uses tools](https://python.langchain.com/v0.1/docs/use_cases/tool_use/), picks the right tool and applies it, or have an agent write some SQL or Python code and run it, cautiously.
- If you've been using an app for a while to perform sentiment analysis or other classification, and you have some good data, you can [fine-tune a model](https://platform.openai.com/docs/guides/fine-tuning) on that data for better performance.
- Try local models with [Ollama](https://ollama.com/) or [LM Studio](https://lmstudio.ai/), if you have a recent Nvidia GPU or Apple Silicon, and plenty of VRAM.

## Level 4 - Multi-turn Agents, Pipelines, Chaining Prompts and APIs
- An example pipeline chaining multiple tools:
	- Ask ChatGPT to write a poem about a current news event.
	- Ask [Suno](https://suno.com/) to take that poem and make a sad girl piano song.
	- Ask [RunwayML](https://runwayml.com/) to make some video clips from pictures of that news event.
	- Combine them all to make a music video, like the one at the bottom of this page.
    - If you have multiple APIs that integrate with e.g. [Zapier](https://zapier.com/) or [Workato](https://www.workato.com/), or if you can code with Python or ask Github Copilot to do it for you, you can write a program which takes the initial input description of the current event, and runs the entire pipeline end-to-end.
- Or [here is a notebook](https://github.com/druce/AInewsbot/blob/main/AInewsbot_langgraph.ipynb) ([video walk-through](https://www.youtube.com/watch?v=9Y_uLVaugWM)) that will:
	- Retrieve front pages of tech news.
	- Use ChatGPT to categorize headlines as about AI or not.
	- Use ChatGPT to extract topics from the headlines.
	- Identify the most popular topics today.
	- Use ChatGPT to summarize individual stories in the most popular topics.
	- Use ChatGPT to take the summaries and write a newsletter about today's news in AI.
- More complex multi-turn agents: Make a financial [market question answering](https://www.youtube.com/watch?v=zOOP7DBiwzs) chatbot with a larger set of tools or a [ReAct](https://til.simonwillison.net/llms/python-react-pattern) workflow.

These agentic workflows are like an aircraft autopilot that follows a set course, or a driverless train that follows a route along a track. AI performs a series of tasks, and possibly measures its progress and uses a feedback loop to stay on course toward a longer-term objective. But the decision process is mostly pre-determined and the degrees of freedom fall short of full autonomy.

We can of course, use coding tools like GitHub Copilot to build level 4 tools. Now we are approaching level 5.

## Level 5 - Complex Agents
- Try [AutoGPT](https://news.agpt.co/), a more complex ReAct workflow.
- Try [multi-agent workflows](https://www.microsoft.com/en-us/research/publication/autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation-framework/).
- Create more complex ReAct agents that write and execute code.
- Make an AI that creates a level 4 agent, writes code, and improves itself.
- Make your own [Devin](https://github.com/OpenDevin/OpenDevin), or [Samantha](https://www.youtube.com/watch?v=vgYi3Wr7v_g), or [Astra](https://deepmind.google/technologies/gemini/project-astra/) pie-in-the-sky AI.

OK, level 5 is nascent. You can perform interesting experiments but complex agents don't currently always work consistently at the level you would need in the enterprise. And there are years worth of Level 4 tasks enterprises can automate with 'sober', as opposed to 'pie-in-the-sky' AI.

But low-code tools to create Level 4 agentic workflows using a combination of text-to-app AI, low-code configuration, and AI-assisted coding are well within reach. Once we have low-code tools, we're only a short step away from having AI use that tool to create and improve workflows autonomously under loose human supervision.

[Inspired by this post by Allie K. Miller,](https://www.linkedin.com/posts/alliekmiller_ai-cant-do-anything-it-just-writes-emails-activity-7222229312073027584-49wo?utm_source=share&utm_medium=member_desktop) follow her for a ton of insight! ([Ethan Mollick](https://www.linkedin.com/in/emollick/) is good too.)

<iframe width="560" height="315" src="https://www.youtube.com/embed/oq48gpKhl8g?si=d0kSGngV0Bjzp1mq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



