---
id: 7141
title: 'An agent engineering roadmap'
date: 2025-05-12T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7141
permalink: /2025/05/agent_engineering
categories: AI
tags: AI

---
> What are AI agents? [Simon Willison](https://x.com/simonw/status/1843290729260703801) crowdsourced a lot of definitions that focus on 1) taking an action on the user's behalf outside the LLM and 2) using the LLM do complex loops and if statements.
>
>In essence we turn the LLM into the engine of a Turing machine that can manage state, memory storage, and control to change state based on memory storage (if statements), and also use external tools like APIs and databases and computer use to get info and perform actions.
>
> Here is a roadmap of agentic patterns to learn and resources to learn them (work in progress)

<!--more-->


- **Role / Instruction Prompting** – Craft concise system‑, role‑ and user‑level instructions so the LLM adopts the right persona and format from the very first turn. This is the entry‑level skill that underpins every other pattern.  [Practical ChatGPT Prompting: 15 Patterns to Improve Your Prompts](https://druce.ai/2024/01/prompting)
	- C-L-E-A-R
		- _Contextualize_ - Specify a role or persona: _“You are a copy editor with years of experience polishing articles and blog posts for web publication.”_
		- _Limits_ - Length; format like three bullet points; tone or style like concisely, or like a tech journalist, or only use facts from this text.
		- _Elaborate and give Examples_ - Explain and provide as much detail and specifics as possible. Use [chain of thought](https://www.promptingguide.ai/techniques/cot) and [other advanced prompting methods](https://arxiv.org/abs/2407.12994).
		- _Audience_ - Identify the audience the response is addressed to, such as ‘explain like I’m 5’.
		- _Reflect or Review_ - Ask ChatGPT to ask clarifying questions before answering, give itself space, such as “think step by step”, “make sure of x before answering”.
	- [P-R-E-P-A-R-E-D](https://www.forbes.com/sites/danfitzpatrick/2024/08/10/the-perfect-chatgpt-prompt-doesnt-exi-/) is another. 
	- Or [T-C-E-P-F-T](https://medium.com/@BK.HAN/6-essential-elements-of-ai-prompt-engineering-tcepft-as-bk-hans-mnemonic-43e689f22ad8). Use what resonates with you. <br />
<br />
- **Basic RAG** – Give the agent some documents and a tool (such as a vector database) to find relevant parts of the documents and respond using them via in-context learning (stuffing the prompt with data to ground the answer, examples etc.).


- **Tool Use** – Expose a catalog of external APIs and let the LLM decide which expert tool to call at each step (search, calculator, SQL, control a browser or a python interpeter through computer use, etc.).  [Microsoft: Tool Use Design Pattern](https://microsoft.github.io/ai-agents-for-beginners/04-tool-use/)

With these 3 components you can build a highly capable single-turn OpenAI assistant or custom GPT (or similar using other LLM platforms). However, these frameworks have limitations in terms of multi-turn workflows, tools, sometimes which models you can use. To get to true agents, we want highly customizable multi-turn workflows that may use many different models, tools and sub-agents.

- **Structured Output & Function Calling** – Ask the model to return JSON (or another schema) and request function calls, letting downstream code parse or act on the response safely. The GPT-4.1 models are exceptionally good at returning valid JSON, which you can also use [Pydantic](https://docs.pydantic.dev/latest/) to specify and validate. Study the [prompting guide](https://cookbook.openai.com/examples/gpt4-1_prompting_guide) thoroughly.
    
- **Chain‑of‑Thought Prompting** – Elicit step‑by‑step reasoning traces that make the model’s logic explicit and usually boost accuracy on math, logic and multi‑hop tasks. Kind of like 'rubber duck debugging', telling the model to explain what it's doing as it does it, forcing it to think and improve performance. [Paper: Wei et al.](https://arxiv.org/abs/2201.11903)
    
- **ReAct (Reason + Act) Loops** – Interleave “Thought → Action → Observation” so the agent both reasons and calls tools (search, code, DB) in the same dialog, allowing complex chains of thoughts and actions.  [Paper: Yao et al.](https://arxiv.org/abs/2210.03629)[Matt Webb](https://interconnected.org/home/2023/03/16/singularity) [Simon Willison](https://til.simonwillison.net/llms/python-react-pattern)
  
- **Prompt Chaining & Sequential Workflows** – Break a complex task into ordered sub‑prompts with intermediate validation (“gate checks”) before moving to the next stage.  [LangChain: Build an Agent](https://python.langchain.com/docs/tutorials/agents/)
  
- **Reflection** – After an initial answer, the agent critiques its own work and revises. Can iterate multiple times. Improves reliability without extra finetuning. [DeepLearning.ai “Reflection” pattern](https://www.deeplearning.ai/the-batch/agentic-design-patterns-part-2-reflection/). [Paper: Shinn et al.](https://arxiv.org/abs/2303.11366)
  
- **Evaluator‑Optimizer (Generator‑Critic) Loops** – Divides reflection pattern into 2 steps. One LLM prompt proposes an answer, another scores/criticizes it, providing direction for improvement; iterate until the score crosses a threshold. [Anthropic post “Building Effective AI Agents”](https://www.anthropic.com/engineering/building-effective-agents)
  
- **Task Routing / Mixture‑of‑Experts** – A router runs a classification prompt based on the current state to choose the next action, such as a prompt or sub-agent workflow.  [Anthropic Agentic Systems - #2. Routing](https://www.linkedin.com/in/vekambar/)] 
    
- **Short‑Term Memory Management** – Keep just enough context (conversation buffer, sliding window, or summary) inside the model’s token limit for coherent multi‑turn chats. [Context Windows: The Short‑Term Memory of LLMs](https://medium.com/@crskilpatrick807/context-windows-the-short-term-memory-of-large-language-models-ab878fc6f9b5)
    
- **Long‑Term Memory** – Persist facts or conversation summaries in a vector database or in-memory structure and retrieve them on demand so the agent “remembers” over the course of a long sesssion searching for lots of information, and across sessions. [Pinecone guide to conversational memory with LangChain](https://www.pinecone.io/learn/series/langchain/langchain-conversational-memory/) 
    
- **Plan‑and‑Execute (Hierarchical Planning)** – First draft a high‑level plan, then execute each sub‑task in order. [LangChain: Plan-and-Execute Agents](https://blog.langchain.dev/planning-agents/); [Paper: Wang et al.](https://arxiv.org/abs/2305.04091?utm_source=chatgpt.com)
  
- **Parallelization of Sub‑tasks** – Fan out independent LLM calls asynchronously (map‑reduce, parallel tools) and aggregate results for speed or consensus.  [LangChain: How to invoke runnables in parallel](https://python.langchain.com/docs/how_to/parallel/)

- **Orchestrator‑Worker Architecture** – A central orchestrator maintains state, assigns work to specialized worker agents, and merges their outputs—a pragmatic bridge to full multi‑agent systems.  [The LangGraph state graph framework is one pattern.](https://academy.langchain.com/courses/intro-to-langgraph]) Another pattern would be to use [OpenAI Agents toolkit](https://openai.github.io/openai-agents-python/), make each node a tool (including tools that call LLMs), and have a top-level reasoning prompt describing a workflow and telling the LLM to run the workflow using the available tools.

- **Multi‑Agent Collaboration** – Yet another orchestration pattern than uses distinct role‑based agents (e.g., Planner, Coder, Tester) that converse to solve problems that exceed a single model’s capacity.  [AutoGen is a leading multi-agent framework.](https://www.microsoft.com/en-us/research/publication/autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation-framework/?utm_source=chatgpt.com) [Wired article](https://www.wired.com/story/chatbot-teamwork-makes-the-ai-dream-work/?utm_source=chatgpt.com).
    
- **Agentic RAG & Specialized Retrieval Teams** – Multiple retrieval agents each query their own knowledge pool; an aggregator agent fuses the evidence before final generation.  [IBM primer “What is Agentic RAG?”](https://www.ibm.com/think/topics/agentic-rag?utm_source=chatgpt.com)
    
## Further Reading:

- [Mastering AI Agents: The 10 Best Free Courses, Tutorials & Learning Tools](https://medium.com/@maximilian.vogel/mastering-ai-agents-the-10-best-free-courses-tutorials-learning-tools-46bc380a19d1)
