---
id: 7141
title: 'An Agent Engineering Primer and Roadmap'
date: 2025-05-12T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7141
permalink: /2025/05/agent_engineering
categories: AI
tags: AI

---

<img src="/assets/2025/glitch_small.png">
> What are AI agents? [Simon Willison](https://x.com/simonw/status/1843290729260703801) crowdsourced a lot of definitions that focus on:
> 
> 1) Taking action on the user's behalf in the real world (i.e. what the agent does) <br />
> 2) Using the LLM to run a loop or complex control flow (i.e. how it does it).
>
>We could say that an AI agent takes actions based on an AI-determined control flow.
>
>In essence, agents use prompting sorcery as the CPU of a Turing machine that can manage state, short- and long-term memory, I/O, and control flow. The agent can access the Internet and tools to perform compute tasks, retrieve info, take actions via APIs, and use the outputs to determine next steps in a loop or complex control flow. Maybe even control your browser and computer.
>
> In this post, we'll try to develop a roadmap of agent concepts and patterns to learn, and resources to learn them.


<!--more-->

## Prereqs: Agent Foundations

- **Prompting** – 'Prompt engineering' is a bit of puffery, but we need to be able to author clear, specific, instructions so the LLM answers properly and in the right format. It's an entry‑level skill that underpins every other pattern.
	- C-L-E-A-R
		- _Contextualize_ - Specify a role or persona: _“You are a copy editor with years of experience polishing articles and blog posts for web publication.”_
		- _Limits_ - Length; format like three bullet points; tone or style like concisely, or like a tech journalist, or only use facts from this text.
		- _Elaborate and give Examples_ - Explain and provide as much detail and specifics as possible. Use [chain of thought](https://www.promptingguide.ai/techniques/cot) and [other advanced prompting methods](https://arxiv.org/abs/2407.12994).
		- _Audience_ - Identify the audience the response is addressed to, such as ‘explain like I’m 5’.
		- _Reflect or Review_ - Ask ChatGPT to ask clarifying questions before answering, give itself space, such as “think step by step”, “make sure of x before answering”.
	- [P-R-E-P-A-R-E-D](https://www.forbes.com/sites/danfitzpatrick/2024/08/10/the-perfect-chatgpt-prompt-doesnt-exi-/) is another. 
	- Or [T-C-E-P-F-T](https://medium.com/@BK.HAN/6-essential-elements-of-ai-prompt-engineering-tcepft-as-bk-hans-mnemonic-43e689f22ad8). Use what resonates with you. <br />
    - These days, you don't need to spend hundreds of hours learning prompt engineering. Think about your intention, take a first crack using one of the above frameworks, and then ask your favorite LLM to improve it, iterating as necessary.
    - Side quest - [proper evals](https://www.promptfoo.dev/docs/intro/), and prompt optimization with tools like [DSPy](https://dspy.ai/).
    - Good prompting and evals are a foundational skill. You need to know how to talk to the AI and measure the results. If you have good evals, you will eventually have good prompts and outputs through iteration. If you don't have good evals, changes in underlying LLMs and assumptions will break your prompts and agents.<br />
    - See previous post: [Practical ChatGPT Prompting: 15 Patterns to Improve Your Prompts](https://druce.ai/2024/01/prompting)
    - [GPT 4.1 prompting guide](https://cookbook.openai.com/examples/gpt4-1_prompting_guide). These new 4.1 OpenAI models are trained for agentic workflows, they do many things automatically that required complex prompting in previous models.<br /> &nbsp; <br />

- **Tool Use** – Expose a catalog of external APIs to the agent, like search, SQL, REST, a browser or a Python interpeter or a shell terminal, etc. Let the LLM decide whether to call a tool and which tool to call at each turn. (Turn = 1 round of prompting it to provide a new response based on the conversation so far). See [Microsoft: Tool Use Design Pattern](https://microsoft.github.io/ai-agents-for-beginners/04-tool-use/)

- **Basic RAG** – Give the agent documents and a tool (such as a vector database) to find relevant parts of the documents and respond using them via in-context learning, i.e. stuffing the prompt with data to ground the answer, examples etc.

- **Chain‑of‑Thought Prompting** – Elicit step‑by‑step reasoning traces that make the model’s logic explicit and usually boost accuracy on math, logic and multi‑hop tasks. Kind of like ['rubber duck debugging'](https://rubberduckdebugging.com/), telling the model to show its work, explain what it's doing as it does it, forcing it to think and improve performance. This is important for agents, to remember what they did and why they did it. [Paper: Wei et al.](https://arxiv.org/abs/2201.11903)
    

With just these components you can build highly capable single-turn OpenAI [Assistants](https://platform.openai.com/docs/api-reference/assistants) or [Custom GPTs](https://help.openai.com/en/articles/8554397-creating-a-gpt). 

You can have a high level system prompt that describes a high-level workflow to follow in response to user input, docs with detailed processes and reference information, and external tools to use. See for instance this [Tuck AI Matrix custom GPT](https://chatgpt.com/g/g-4tqcPryPK-the-m-a-matrix-by-tuck-advisorstm), which follows a proprietary methodology to do basic evaluations of M&A deals.

However, the custom GPTs and Assistants (and their equivalents on other platforms) have limitations in terms of multi-turn structured workflows, tools, sometimes which models are available. To level up to true agents, we want more customizable workflows that may use many different models, custom tools, sub-agents, and complex flows.

## Agent Patterns

- **ReAct (Reason + Act) Loops** – Interleave “Thought → Action → Observation” so the agent both reasons and calls tools (search, code, DB) in the same dialog, allowing complex chains of thoughts and actions. This was the breakthrough behind [AutoGPT](https://agpt.co/), which you can run online [here](https://agentgpt.reworkd.ai/). Ask a question like 'Find the best coffee grinder for espresso under $300', and it will loop through a process of thinking, what are the tasks I need to do based on what I've done so far, what is the highest priority task, do it, observe the output, iterate until the goal is reached.  [Paper: Yao et al.](https://arxiv.org/abs/2210.03629) ; Blog posts: [Matt Webb](https://interconnected.org/home/2023/03/16/singularity); [Simon Willison](https://til.simonwillison.net/llms/python-react-pattern) <br /> &nbsp; <br />ReAct is fascinating and powerful, but the autonomy can make it unpredictable and hard to reason about, which is a general tradeoff when building agents. The more autonomy you give it, the more room for emergent behavior, but the more risk it goes off the rails. 
  
- **Prompt Chaining & Sequential Workflows** – Break a complex task into ordered sub‑prompts with intermediate validation (“gate checks”) before moving to the next stage.  [LangChain: Build an Agent](https://python.langchain.com/docs/tutorials/agents/). Example: [a news gathering workflow](https://github.com/druce/AInewsbot/blob/main/README.md).
  
- **Structured Output** – Since errors tend to compound as you go down the agent's trajectory, structured outputs and validation are critical. Ask the model to return JSON, then validate it, letting downstream code parse or act on the response safely. The GPT-4.1 models are exceptionally good at returning valid JSON, which you can also use [Pydantic](https://docs.pydantic.dev/latest/) to specify and validate. Study the [prompting guide](https://cookbook.openai.com/examples/gpt4-1_prompting_guide) thoroughly. 

- **Human-in-the-loop**  – At the current maturity of AI development, fully autonomous agents are typically very challenging to achieve in complex, high-stakes environments (where they add the most value). It's much more realistic to try to make agentic assistants and copilots that take humans through a structured process than to try to be fully autonomous. The AI can speed things up dramatically, but it can also be hit-or-miss, so human supervision is critical. At key steps the human should evaluate and course-correct as necessary. _Time travel_ to go back to a previous step, adjust, and try again can also be useful. <br /> &nbsp; <br /> If you remember nothing else from this post: <br /> &nbsp; <br />
   - _Use AI for what it's good at: parsing lots of information quickly and generating a first draft at a near-human level;_
   - _Use tools for what they are good at, faithfully executing algorithmic workflows;_
   - _Use the humans in the loop for what they are good at which is critical thinking and creativity._ <br /> &nbsp; <br /> 
    
- **Reflection** – After an initial answer, the agent critiques its own work and revises.  For instance, a check for factuality may reduce hallucinations, like, is this summary consistent with the text it summarizes. The agent can iterate multiple times until satisfied, and/or perform multiple separate checks, like for factuality and also a Flesch-Kincaid readability benchmark. See [DeepLearning.ai “Reflection” pattern](https://www.deeplearning.ai/the-batch/agentic-design-patterns-part-2-reflection/). [Paper: Shinn et al.](https://arxiv.org/abs/2303.11366)
  
- **Evaluator‑Optimizer (Generator‑Critic) Loops** – Divides the reflection pattern into 2 steps. One LLM prompt proposes an answer, another scores/criticizes it, providing directions for improvement; iterate until the score crosses a threshold. [Anthropic post “Building Effective AI Agents”](https://www.anthropic.com/engineering/building-effective-agents)
  
- **Task Routing / Mixture‑of‑Experts** – A router runs a classification prompt based on the current state to determine the next action, such as a prompt or sub-agent workflow.  [Anthropic Agentic Systems - #2. Routing](https://www.linkedin.com/in/vekambar/)
    
- **Agentic RAG & Specialized Retrieval Teams** – Multiple retrieval agents individually query their own knowledge pool; an aggregator agent fuses the evidence before final generation.  [IBM primer “What is Agentic RAG?”](https://www.ibm.com/think/topics/agentic-rag?utm_source=chatgpt.com)
    
- **Memory** – In the basic ReAct workflow, the previous chain of the conversations serves as the record of everything learned so far. But you might want to structure the memory in the agent in a more efficient manner, and inject knowledge into the context in the manner the LLM can use it most effectively. See e.g. [IBM: What is AI agent memory?](https://www.ibm.com/think/topics/ai-agent-memory) ; [Mem0](https://mem0.ai/)

- **Short‑Term Memory** – Keep just enough context (conversation buffer, sliding window, or summary) inside the model’s token limit for coherent multi‑turn chats. [Context Windows: The Short‑Term Memory of LLMs](https://medium.com/@crskilpatrick807/context-windows-the-short-term-memory-of-large-language-models-ab878fc6f9b5)
    
- **Long‑Term Memory** – Persist facts or conversation summaries in a vector database, SQL or in-memory structure and retrieve them on demand so the agent “remembers” over the course of a long session working with lots of information, and across sessions. (A vector database has one job, fast nearest neighbors so you can look up text by semantic similarity.) [Pinecone guide to conversational memory with LangChain](https://www.pinecone.io/learn/series/langchain/langchain-conversational-memory/) 
    
- **Plan‑and‑Execute (Hierarchical Planning)** – First draft a high‑level plan, then execute each sub‑task in order. [LangChain: Plan-and-Execute Agents](https://blog.langchain.dev/planning-agents/); [Paper: Wang et al.](https://arxiv.org/abs/2305.04091?utm_source=chatgpt.com)
  
- **Parallelization of Sub‑tasks** – In contrast to sequential tasks, we can fan out independent LLM calls asynchronously (map‑reduce, parallel tools) and aggregate results for speed or consensus. We can perform similar tasks in different ways and pick the best one, or take all the outputs and synthesize a response from them. With 'mini' and 'flash' models (or local models), it can be cheap, fast and efficient to send hundreds of queries over a data set to process each one individually and simultaneously. [LangChain: How to invoke runnables in parallel](https://python.langchain.com/docs/how_to/parallel/)

- **Tree of Thoughts** – Many agents run variations on search processes. The agent can explore multiple possible paths of thinking, decisions, or hypotheses before settling on an output or an action. Agents can go beyond single-step or linear reasoning by allowing branching and revisiting of different trajectories. See papers: [Tree of Thoughts (ToT)](https://arxiv.org/abs/2305.10601) and [Graph of Thought (GoT)](https://arxiv.org/abs/2308.09687)

- **Guardrails** – Users may try to 'jailbreak' an app to use it in unexpected ways, and agentic processes can go off the rails and attempt costly or embarrassing or even dangerous actions. [Guardrails.](https://www.guardrailsai.com/) a form of reflection, can allow you to assert that the agent is on track at each step, and correct, or stop, or prompt the human if it is not.

- **Orchestrator‑Worker Architecture** – A central orchestrator maintains state, assigns work to specialized worker agents, and merges their outputs—a pragmatic bridge to complex multi‑agent systems.  [The LangGraph state graph framework is one pattern.](https://academy.langchain.com/courses/intro-to-langgraph]) The state graph paradigm provides transparency, maps well to structured processes with time travel, and potentially in the future to low-code frameworks and cloud deployment. <br /> &nbsp; <br />Alternatively, we can use the [OpenAI Agents toolkit](https://openai.github.io/openai-agents-python/), make each sub-agent node a tool, and have a top-level reasoning prompt describing a workflow and telling the LLM to run the workflow using the available tools.<br /> &nbsp; <br /> You can also use low-code frameworks like [Zapier](https://zapier.com), [Make.com](https://www.make.com/en), [n8n](https://n8n.io), and [Automation Anywhere](https://www.automationanywhere.com/) (and a ton of others), which could then call an AI prompt to make control flow branching decisions, run loops, call OpenAI Assistants or agents deployed in the cloud.

- **Multi‑Agent Collaboration** – An orchestration pattern that uses distinct role‑based agents (e.g., Planner, Coder, Tester) that converse to solve problems that exceed a single model’s capacity, in a peer or hierarchical organizational structure. Multi-agent systems can be a bit like using Docker/Kubernetes microservices vs. monolithic architectures. They can provide a helpful decomposition, or make the system more complex and harder to reason about. For my money, you can get a lot of mileage with AI in a structured workflow running in LangGraph, n8n, Zapier, etc. In general I would recommend starting with simple chained pipelines, over complex  multi-agent solutions. [AutoGen is a leading multi-agent framework.](https://www.microsoft.com/en-us/research/publication/autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation-framework/?utm_source=chatgpt.com) [Wired article](https://www.wired.com/story/chatbot-teamwork-makes-the-ai-dream-work/?utm_source=chatgpt.com).

- **Model Context Protocol and other communications protocols** – When you create a tool, in addition to implementing its functionality there's a semantic layer you have to provide to an LLM so it knows how to use it: the input schema, the output schema, when and why to use it. [MCP](https://diamantai.substack.com/p/model-context-protocol-mcp-explained) is a standard for doing this. There are [other ways for agents to communicate with the outside world and each other](https://arxiv.org/abs/2504.16736). <br /> &nbsp; <br />Another important evolving standard is [A2A](https://diamantai.substack.com/p/googles-agent2agent-a2a-explained). If one agent calls another agent, it may be a long-running process and a multi-turn chat conversation, unlike the REST call typically described by MCP. So there may be a need for a different standard to monitor long-running processes that come back to ask for more information, or that you want to send a sequence of interactive requests to.

## Where to start

If you want to start building an agent to automate your pain points, here are some ways to start:

- Connect [Zapier](https://zapier.com/apps) to your SaaS services and LLM, like write a mail autoresponder that applies a prompt to extract stuff from an email and updates the CRM.
- If you are enterprise as opposed to SMB and putting credentials to all your SaaS in Zapier gives your the heebie-jeebies, use [n8n](https://docs.n8n.io/) on-prem instead.
- Write or grab some MCP wrappers (here is [a list](https://github.com/modelcontextprotocol/servers), or check out [Jeff Emanuel's ultimate MCP server](https://github.com/Dicklesworthstone/ultimate_mcp_server) with connections to tons of services), [connect them in the Claude desktop client](https://www.reddit.com/r/ClaudeAI/comments/1haxkrq/add_image_generation_audio_transcription_and_much/m1c5f33/), and ask Claude to do stuff in your favorite services. 
- For advanced workflows, [LangChain](https://python.langchain.com/docs/concepts/) and [LangGraph](https://langchain-ai.github.io/langgraph) are great to get a POC up and running. If I want to figure out how to build an LLM workflow, typically I'll look up how LangChain does it and try their variations, different LLMs and prompts, and take it from there. LangChain can be a bit complex and beta, sometimes you realize all the magic is in the prompt and you can just write directly to e.g. OpenAI. They try to do all things for all people and have the most comprehensive ecosystem. But they can be architecture astronauts and try to do too much, make a lot of breaking changes, docs are not always great. 
- Don't be afraid to do things that need a lot of sequential prompts or to send a lot of prompts in parallel asynchronously. It's hard to do things well with one prompt, our job is to make a reliable agent from unreliable LLM calls.

## Final thoughts

The era of agents is here. If you can explain a process in plain English, you can probably build MCP servers around the tools it uses, and build an agent to take a crack at it. If it's a simple process, you might be able to fully automate it most of the time; if it's a more complex process, you might be able to build a structured human-in-the-loop process around it that will level up productivity.

When you see an agent doing something simple, like my daily [AI news bot](https://github.com/druce/AInewsbot), or something magical, like OpenAI's [Deep Research](https://openai.com/index/introducing-deep-research/), it's probably doing something that is a composition of patterns like these, and the right prompts applied to the right contexts. If you've read this far, you have an initial grasp of the basic concepts of agent engineering, and a place to start your learning journey!
    
## Further Reading:

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Chip Huyen on Agents](https://huyenchip.com/2025/01/07/agents.html)
- [DeepLearning.ai](https://www.deeplearning.ai/courses/?courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B0%5D=Agents&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B1%5D=Vector%20Databases&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B2%5D=Task%20Automation&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B3%5D=Search%20and%20Retrieval&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B4%5D=RAG&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B5%5D=Prompt%20Engineering&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B6%5D=GenAI%20Applications&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B7%5D=Evaluation%20and%20Monitoring)
- [Mastering AI Agents: The 10 Best Free Courses, Tutorials & Learning Tools](https://medium.com/@maximilian.vogel/mastering-ai-agents-the-10-best-free-courses-tutorials-learning-tools-46bc380a19d1)
- [A Survey of Agentic AI, Multi-Agent Systems, and Multimodal Frameworks Architectures, Applications, and Future Directions](https://www.researchgate.net/publication/387577302_A_Survey_of_Agentic_AI_Multi-Agent_Systems_and_Multimodal_Frameworks_Architectures_Applications_and_Future_Directions)
- AI Engineer summit 2025: Agent Engineering: [Day 1](https://www.youtube.com/watch?v=L89GzWEILkM) [Day 2](https://www.youtube.com/watch?v=D7BzTxVVMuw) 

- **Agent Frameworks**
  - [LangGraph](https://www.langchain.com/langgraph)
  - [LlamaIndex](https://docs.llamaindex.ai/en/stable/use_cases/agents/)
  - [AutoGen](https://microsoft.github.io/autogen/stable/) / [AG2](https://github.com/ag2ai/ag2) (confusing fork under way)
  - [crew.ai](https://www.crewai.com/)

- **Druce's related stuff**
  - [A slide presentation](https://docs.google.com/presentation/d/1vPF2TNj1GoXtMIPXnVoAwkziug-956GwF2uK6UKNWqs/edit#slide=id.p)
  - [I save articles here](https://drive.google.com/drive/folders/1DgX9XaLe6ZhH0IxEyszf930dc7mbgjj8)
  - [Skynet and Chill daily AI reading](skynet and chill.com)
  - [AInewsbot agent to write an automated daily news letter](https://github.com/druce/AInewsbot/tree/main)
  
- **AI Engineering stuff (might break out into a separate post)**
    - [Matt Turck's mega-landscape dataviz](https://mad.firstmark.com/)
    - &nbsp;
<img src="/assets/2025/AIengineering.png">
<img src="/assets/2025/AIengineering2.png">
<img src="/assets/2025/AIlifecycle.png">
<img src="/assets/2025/LLMstack.png">
- **People to Follow**
  - [Simon Willison](https://simonwillison.net/)
  - [Hamel Husein](https://hamel.dev/)
  - [Shawn 'swyx'  Wang](https://www.latent.space/)
  - [Nir Diamant](https://diamantai.substack.com/)
  - [Ethan Mollick](https://www.oneusefulthing.org/)
  - [Harrison Chase](https://blog.langchain.dev/author/harrison/)
  - [Jerry Liu](https://www.llamaindex.ai/blog/author/jerry-liu)
  - [Logan Kilpatrick](https://logank.ai/)
  - [Chip Huyen](https://huyenchip.com/)
  - [Lilian Weng](https://lilianweng.github.io/) (whose blog template I appropriated a few years ago, many thanks!)
  - [Heiko Hotz](https://heiko-hotz.medium.com/about)
  - [Andriy Burkov](https://aiweekly.substack.com/)


- **Books**
 - [Jay Alammar - Hands-On Large Language Models: Language Understanding and Generation](https://www.amazon.com/Hands-Large-Language-Models-Understanding-ebook/dp/B0DGZ46G88)
 - [Sebastian Raschka - Build a Large Language Model (From Scratch)](https://www.amazon.com/Build-Large-Language-Model-Scratch/dp/1633437167/)
 - [Chip Huyen - AI Engineering](https://www.amazon.com/AI-Engineering-Building-Applications-Foundation-ebook/dp/B0DPLNK9GN?ref_=ast_author_cabib_dp)
 - [Maxime Labonne - LLM Engineer's handbook](https://www.amazon.com/LLM-Engineers-Handbook-engineering-production-ebook/dp/B0D1WR77BZ?ref_=ast_author_cabib_dp)
 - [Andriy Burkov - Machine Learning Engineering](https://www.amazon.com/Machine-Learning-Engineering-Andriy-Burkov-ebook/dp/B09Q18725P?ref_=ast_author_cabib_dp_rw&dib=eyJ2IjoiMSJ9.anpJ4PuV9UYa3YK8oW0Od5D-FsuIPTtKkHB2XOWz4PRystFWAHGn1kkoZvVEck-fM0HsTc-BcCYQKJTklJma2f3lO9AEl3gYsOf7_WuUSEbDY1M4lx3i-aYBwikD2aIVoj0g098BAo3M44Cwiws8keShqgdl6emSa8eglfSOWig.NsDE21bOFGxJSZsNsX0eFSdPs4H6y3ym0KBDDaWkZUk&dib_tag=AUTHOR)

