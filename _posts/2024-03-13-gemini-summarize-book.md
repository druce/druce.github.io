---
id: 7133
title: 'Building a simple chatbot agent with LangChain to ask OpenBB to get financial market data.'
date: 2024-05-26T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7133
permalink: /2024/05/OpenBB-LangChain-agent
categories: datascience
tags: datascience

---
>*A short (< 10-minute) demo video, with a couple of intro comments about early 2024 LLM developments*
<iframe width="560" height="315" src="https://www.youtube.com/embed/3Izq_9lzVac?si=W_uKJcIiSqK3NIgQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<!--more-->

# Making a Market Data Chatbot with OpenBB and LLM Agents

Today, we're diving into the world of Large Language Model (LLM) agents and building a simple chatbot that can fetch financial market data from the OpenBB platform.  [OpenBB](https://openbb.co/) is a module that lets us access almost 100 financial market providers data services, giving us a unified API to access any kind of market data that is available on the Internet. [LangChain](https://python.langchain.com/v0.1/docs/get_started/introduction) is a framework for building LLM applications which abstracts [many LLM patterns](https://github.com/langchain-ai/langchain/tree/master/cookbook), including RAG and agents, lets you use the same code base interchangeably between e.g. ChatGPT and Claude and Gemini.

# OpenBB: Your One-Stop Shop for Market Data

Before we dive into agents, let's get familiar with OpenBB. This incredible platform offers a unified API to access a wide range of [market data providers](https://docs.openbb.co/terminal/usage/data/api-keys): end-of-day and real-time pricing, fundamental data, economic data, or news. It simplifies the process of gathering market data by abstracting the differences between various services, giving you a consistent way to interact with them.

There are a few ways to access OpenBB: The Terminal Pro, Excel integration, a full AI copilot, and the OpenBB platform, which is what we will use. To get started:
 - clone the repo
 - create a new environment, for instance
 ```
 conda create --name openbb_agent python=3.11
 conda activate openbb_agent
 ```
 - pip install -r requirements.txt
 - jupyter notebook. open `bb_agent.ipynb`
 - create a .env file with credentials to APIs, similar to dot-env.text in the repo. For this demo make a free account with openbb, fmp, other services
 - after importing openbb, you can explore the API with your favorite IDE magic or 'dir(obb)', 'dir(obb.equity)' etc.
 - you can also reun the rest server and explore the docs

OpenBB returns data in a standardized format, making it easy to work with and return python dicts, JSON, Pandas dataframes, and other formats.

# LLM Agents: The Brains of Our Chatbot

Now, let's talk about LLM agents. In simple terms, an LLM agent is any application that uses an LLM (like ChatGPT) to control its flow and make decisions. For our chatbot, the agent will take user questions about financial markets, figure out which OpenBB tool can answer the question, run that tool, and then either provide the answer or run another tool if needed.

# How Our Agent Works

We make a system prompt that looks like this.

Has a process to follow, how to use the tools. typically if I am building this shit from scratch on the OpenAI API I will describe the tools in the system prompt with an example of how to call it, and also include the JSON.

For the tools, I made a YAML file with a list of tool definitions, and a function to turn the YAML definition into a tool using LangChain. The tool wraps the specified OpenBB functionality with a good description for the LLM, the call signature etc. We can also make a custom tool which does not depend on OBB, for instance to access the free Edgar API.

The LangChain tool abstraction knows how to call the tool, and how to describe itself in an LLM prompt, including a structured JSON format that e.g. OpenAI expects, and how to parse a response, call the function it wraps, and return the response back to the LLM.

LangChain can also create an agent from a JSON specification. OpenBB's specification is large and complex. The YAML definitions restrict the bot to about 15 commonly used endpoints and simplify the call signature for instance to just a symbol. OpenAI has a hard limit on the number of tools, and the more complex the tools, the more ways there are to get it wrong.

The top-level chatbot UI is built using Streamlit, a Python library that makes it easy to create web interfaces. You could also connect your agent to Slack or Discord. There are also [more complex chat interfaces](https://github.com/OvidijusParsiunas/deep-chat) ([search GitHub for chatbot-related projects](https://github.com/search?q=chatbot&type=repositories&s=stars&o=desc)

# Putting It to the Test

Let's see our agent in action! We can ask it questions like "What's the ticker for Southwest Airlines?" or "What is the last price for Delta Airlines?".  It will query the OpenBB API, potentially in multiple steps, and provide the answer.

We can even try more complex questions like "What are the total assets for Merck?" or "Which ETF has the highest weight in Merck?". The agent will try its best to find the answer, although it might stumble on questions requiring complex logic. Remember, ChatGPT is a language expert, not a mathematician.

# Room for improvement

LangGraph: Managing Complex Workflows

For more intricate tasks, LangGraph can be a game-changer. Instead of simple decision trees, it allows you to create finite state machines. These can handle scenarios like querying news data, where you might want to filter, summarize, or analyze individual stories.

PhiData: an agent framework. 

# Limitations of LLMs and the Power of Collaboration

It's crucial to understand that LLMs excel at text-based tasks but struggle with logical reasoning. They are great for answering factual questions but might stumble on questions requiring complex calculations or logical deductions.

Think of an LLM like a brilliant intern. They can be incredibly helpful, but they need guidance and supervision. When humans and AI collaborate, combining their strengths, we can achieve amazing results.

# Wrapping Up

what we covered

you don't need to use langchain, but you will have to write to the function calling API and langchain makes this a little bit easier, it also lets you talk to different LLMs using the same API. 

you don't need to use openbb, you could make some custom tools pointing to the APIs of the services you subscribe to, but openbb makes things simpler.



I hope this introduction to LLM agents and OpenBB has been informative. We've covered a lot of ground, from building a simple chatbot to exploring more advanced workflows.

Remember, the key to success with LLMs is understanding their strengths and limitations. By combining human expertise with AI capabilities, we can create powerful tools that can revolutionize how we interact with data and information.

If you have any questions or comments, feel free to leave them below. I'll do my best to answer them.

Thanks for reading, and until next time, happy coding!
