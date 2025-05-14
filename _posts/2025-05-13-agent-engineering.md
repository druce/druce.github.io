---
id: 7141
title: 'An Agent Engineering Roadmap'
date: 2025-05-12T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7141
permalink: /2025/05/agent_engineering
categories: AI
tags: AI

---

> What are AI agents? [Simon Willison](https://x.com/simonw/status/1843290729260703801) crowdsourced a lot of definitions that focus on 
> 
> 1) Taking action on the user's behalf in the real world (ie what the agent does) <br />
> 2) Using the LLM in a loop, or some complex control flow (ie how it does it).
>
>We could say that an AI agent takes actions based on a control flow determined by the LLM.
>
>In essence we turn the LLM into the CPU of a Turing machine that can manage state, short- and long-term memory, I/O, and control flow. Connected to your computer and the Internet, the agent can access APIs and computer tools to search for info and perform actions.
>
> Here is a roadmap of agent concepts and patterns to learn, and resources to learn them (work in progress)
<br />
&nbsp;
<br />
  <img src="/assets/2025/agents.jpg">


<!--more-->

## Components of agents:

- **Prompting** – 'Prompt engineering' may be overstating it, but you need to be able to author concise system‑, role‑ and user‑level instructions so the LLM answers properly and in the right format. This is the entry‑level skill that underpins every other pattern.
	- C-L-E-A-R
		- _Contextualize_ - Specify a role or persona: _“You are a copy editor with years of experience polishing articles and blog posts for web publication.”_
		- _Limits_ - Length; format like three bullet points; tone or style like concisely, or like a tech journalist, or only use facts from this text.
		- _Elaborate and give Examples_ - Explain and provide as much detail and specifics as possible. Use [chain of thought](https://www.promptingguide.ai/techniques/cot) and [other advanced prompting methods](https://arxiv.org/abs/2407.12994).
		- _Audience_ - Identify the audience the response is addressed to, such as ‘explain like I’m 5’.
		- _Reflect or Review_ - Ask ChatGPT to ask clarifying questions before answering, give itself space, such as “think step by step”, “make sure of x before answering”.
	- [P-R-E-P-A-R-E-D](https://www.forbes.com/sites/danfitzpatrick/2024/08/10/the-perfect-chatgpt-prompt-doesnt-exi-/) is another. 
	- Or [T-C-E-P-F-T](https://medium.com/@BK.HAN/6-essential-elements-of-ai-prompt-engineering-tcepft-as-bk-hans-mnemonic-43e689f22ad8). Use what resonates with you. <br />
    - These days, you don't need to spend hundreds of hours learning prompt engineering, think about your intention, take a first crack using one of the above frameworks, and then ask your favorite LLM to improve it.
    - Side quest - [proper evals](https://www.promptfoo.dev/docs/intro/), and prompt optimization with tools like [DSPy](https://dspy.ai/).
    - Good prompting and evals are a foundational skill. If you have good evals, you will eventually have good prompts and outputs through iteration. If you don't have good evals, changes in underlying LLMs and assumptions will break your prompts and agents.<br />
    - See previous post: [Practical ChatGPT Prompting: 15 Patterns to Improve Your Prompts](https://druce.ai/2024/01/prompting)<br /> &nbsp; <br />

- **Tool Use** – Expose a catalog of external APIs to the agent and let the LLM decide which tool to call at each turn (search, SQL, REST, control a browser or a Python interpeter through computer use, etc.). See [Microsoft: Tool Use Design Pattern](https://microsoft.github.io/ai-agents-for-beginners/04-tool-use/)

- **Basic RAG** – Give the agent documents and a tool (such as a vector database) to find relevant parts of the documents and respond using them via in-context learning: stuffing the prompt with data to ground the answer, examples etc.

- **Chain‑of‑Thought Prompting** – Elicit step‑by‑step reasoning traces that make the model’s logic explicit and usually boost accuracy on math, logic and multi‑hop tasks. Kind of like ['rubber duck debugging'](https://rubberduckdebugging.com/), telling the model to show its work, explain what it's doing as it does it, forcing it to think and improve performance. This is important for agents, to remember what tye did  and why they did it. [Paper: Wei et al.](https://arxiv.org/abs/2201.11903)
    

With these components you can build highly capable single-turn OpenAI [Assistants](https://platform.openai.com/docs/api-reference/assistants) or [Custom GPTs](https://help.openai.com/en/articles/8554397-creating-a-gpt). However, these frameworks (and equivalents on other platforms) have limitations in terms of multi-turn workflows, tools, sometimes which models are available. To level up to true agents, we want more customizable multi-turn workflows that may use many different models, tools and sub-agents.

- **ReAct (Reason + Act) Loops** – Interleave “Thought → Action → Observation” so the agent both reasons and calls tools (search, code, DB) in the same dialog, allowing complex chains of thoughts and actions. This was the breakthrough behind [AutoGPT](https://agpt.co/), which you can run online [here](https://agentgpt.reworkd.ai/). As a question like 'Find the best coffee grinder for espresso under $300', and it will loop through a process of thinking, what are the tasks I need to do based on what I've done so far, what is the highest priority task, do it, observe the output, iterate until the goal is reached.  [Paper: Yao et al.](https://arxiv.org/abs/2210.03629) ; Blog posts: [Matt Webb](https://interconnected.org/home/2023/03/16/singularity); [Simon Willison](https://til.simonwillison.net/llms/python-react-pattern)
  
- **Prompt Chaining & Sequential Workflows** – Break a complex task into ordered sub‑prompts with intermediate validation (“gate checks”) before moving to the next stage.  [LangChain: Build an Agent](https://python.langchain.com/docs/tutorials/agents/)
  
- **Structured Output** – Since any errors compound as you go down the agent's trajectory, structured outputs and validation are critical. Ask the model to return JSON, then validate it, letting downstream code parse or act on the response safely. The GPT-4.1 models are exceptionally good at returning valid JSON, which you can also use [Pydantic](https://docs.pydantic.dev/latest/) to specify and validate. Study the [prompting guide](https://cookbook.openai.com/examples/gpt4-1_prompting_guide) thoroughly. 

- **Human-in-the-loop**  – At the current maturity of AI development, fully autonomous agents are typically unachievable in complex, high-stakes environments. It's much more realistic to try to make agentic assistants and copilots that take humans through a structured process than to try to be fully autonomous. The AI can speed things up dramatically but it can also be hit-or-miss, so human supervision is critical. At key steps the human should evaluate and course-correct as necessary. _Time travel_ to go back to a previous step, adjust, and try again can also be useful. <br /> &nbsp; <br /> Use AI for what it's good at: parsing lots of information quickly and generating a first draft at a near-human level; <br /> &nbsp; <br /> Use tools for what they are good at, for executing simple repeatable processes; <br /> &nbsp; <br /> Use the humans for what they are good at which is critical thinking. <br /> &nbsp; <br /> See e.g. [LangGraph](https://langchain-ai.github.io/langgraph/concepts/time-travel/).
    
- **Reflection** – After an initial answer, the agent critiques its own work and revises.  For instance, a check for factuality may reduce hallucinations, like, is this summary consistent with the text it summarizes. The agent can iterate multiple times until sastisfied, and/or perform multiple separate checks, like for factuality and also a Flesch-Kincaid readability benchmark. See [DeepLearning.ai “Reflection” pattern](https://www.deeplearning.ai/the-batch/agentic-design-patterns-part-2-reflection/). [Paper: Shinn et al.](https://arxiv.org/abs/2303.11366)
  
- **Evaluator‑Optimizer (Generator‑Critic) Loops** – Divides the reflection pattern into 2 steps. One LLM prompt proposes an answer, another scores/criticizes it, providing direction for improvement; iterate until the score crosses a threshold. [Anthropic post “Building Effective AI Agents”](https://www.anthropic.com/engineering/building-effective-agents)
  
- **Task Routing / Mixture‑of‑Experts** – A router runs a classification prompt based on the current state to choose the next action, such as a prompt or sub-agent workflow.  [Anthropic Agentic Systems - #2. Routing](https://www.linkedin.com/in/vekambar/)] 
    
- **Agentic RAG & Specialized Retrieval Teams** – Multiple retrieval agents each query their own knowledge pool; an aggregator agent fuses the evidence before final generation.  [IBM primer “What is Agentic RAG?”](https://www.ibm.com/think/topics/agentic-rag?utm_source=chatgpt.com)
    
- **Memory** – In the basic ReAct workflow, the previous chain of the conversations serves as the record of everything learned so far. But you might want to structure the memory in the agent in a more efficient manner, and inject into the context in a manner the LLM can use it most effectively. See e.g. [IBM: What is AI agent memory?](https://www.ibm.com/think/topics/ai-agent-memory) ; [Mem0](https://mem0.ai/)

- **Short‑Term Memory** – Keep just enough context (conversation buffer, sliding window, or summary) inside the model’s token limit for coherent multi‑turn chats. [Context Windows: The Short‑Term Memory of LLMs](https://medium.com/@crskilpatrick807/context-windows-the-short-term-memory-of-large-language-models-ab878fc6f9b5)
    
- **Long‑Term Memory** – Persist facts or conversation summaries in a vector database or in-memory structure and retrieve them on demand so the agent “remembers” over the course of a long session searching for lots of information, and across sessions. [Pinecone guide to conversational memory with LangChain](https://www.pinecone.io/learn/series/langchain/langchain-conversational-memory/) 
    
- **Plan‑and‑Execute (Hierarchical Planning)** – First draft a high‑level plan, then execute each sub‑task in order. [LangChain: Plan-and-Execute Agents](https://blog.langchain.dev/planning-agents/); [Paper: Wang et al.](https://arxiv.org/abs/2305.04091?utm_source=chatgpt.com)
  
- **Parallelization of Sub‑tasks** – In contrast to sequential tasks, we can fan out independent LLM calls asynchronously (map‑reduce, parallel tools) and aggregate results for speed or consensus. We can perform similar tasks in different ways and pick the best one, or take all the outputs and synthesize a response from them. With 'mini' and 'flash' models, it can be cheap, fast and efficient to send 100s of queries over a data set to process each one individually and simultaneously. [LangChain: How to invoke runnables in parallel](https://python.langchain.com/docs/how_to/parallel/)

- **Tree of Thoughts** – Many agents run variations on search processes. The agent can explore multiple possible paths of thinking, decisions, or hypotheses before settling on an output or an action. Agents can go beyond single-step or linear reasoning by allowing branching and revisiting of different trajectories. See papers: [Tree of Thoughts (ToT)](https://arxiv.org/abs/2305.10601) and [Graph of Thought (GoT)](https://arxiv.org/abs/2308.09687)

- **Guardrails** – Users may try to 'jailbreak' an app to use it in unexpected ways, and agentic processes can go off the rails and do costly or embarrassing or even dangerous actions. [Guardrails.](https://www.guardrailsai.com/) a form of reflection, can allow you to assert that the agent is on track at each step, and correct, or stop, or prompt the human if it is not.

- **Orchestrator‑Worker Architecture** – A central orchestrator maintains state, assigns work to specialized worker agents, and merges their outputs—a pragmatic bridge to full multi‑agent systems.  [The LangGraph state graph framework is one pattern.](https://academy.langchain.com/courses/intro-to-langgraph]) Or we can use the [OpenAI Agents toolkit](https://openai.github.io/openai-agents-python/), make each sub-agent node a tool, and have a top-level reasoning prompt describing a workflow and telling the LLM to run the workflow using the available tools.

- **Multi‑Agent Collaboration** – An orchestration pattern that uses distinct role‑based agents (e.g., Planner, Coder, Tester) that converse to solve problems that exceed a single model’s capacity. Multi-agent systems can be a bit like using Docker/Kubernetes microservices vs. monolithic architectures. They can provide a helpful decomposition, or make the system complex and harder to reason about. In both cases I would generally recommend waiting until you have fully understood and solved the problem and need to scale the solution to the next level. [AutoGen is a leading multi-agent framework.](https://www.microsoft.com/en-us/research/publication/autogen-enabling-next-gen-llm-applications-via-multi-agent-conversation-framework/?utm_source=chatgpt.com) [Wired article](https://www.wired.com/story/chatbot-teamwork-makes-the-ai-dream-work/?utm_source=chatgpt.com).

- **Model Context Protocol and other communications protocols** – When you create a tool, in addition to implementing its functionality there's a semantic layer you have to provide to an LLM so it knows how to use it: the input schema, the output schema, when and why to use it. [MCP](https://diamantai.substack.com/p/model-context-protocol-mcp-explained) is a standard for doing this. There are [other ways for agents to communicate with the outside world and each other](https://arxiv.org/abs/2504.16736). Another evolving standard is [A2A](https://diamantai.substack.com/p/googles-agent2agent-a2a-explained). If one agent calls another agent, it may be a long-running process and a multi-turn chat conversation, unlike the REST call typically described by MCP. So there may be a need for a different standard to monitor long-running processes that come back to ask for more information, or that you want to send a sequence of interactive requests to.

When you see an agent doing something simple, like my daily [AI news bot](https://github.com/druce/AInewsbot), or magical, like OpenAI's [deep research](https://openai.com/index/introducing-deep-research/), it's probably doing something that is a composition of patterns like these, and the right prompt applied to the right context. If you've read this far, you have an initial grasp of the basic concepts of agent engineering, and a place to a learning journey!
    
## Further Reading:

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [DeepLearning.ai](https://www.deeplearning.ai/courses/?courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B0%5D=Agents&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B1%5D=Vector%20Databases&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B2%5D=Task%20Automation&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B3%5D=Search%20and%20Retrieval&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B4%5D=RAG&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B5%5D=Prompt%20Engineering&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B6%5D=GenAI%20Applications&courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B7%5D=Evaluation%20and%20Monitoring)
- [Mastering AI Agents: The 10 Best Free Courses, Tutorials & Learning Tools](https://medium.com/@maximilian.vogel/mastering-ai-agents-the-10-best-free-courses-tutorials-learning-tools-46bc380a19d1)
- [A Survey of Agentic AI, Multi-Agent Systems, and Multimodal Frameworks Architectures, Applications, and Future Directions](https://www.researchgate.net/publication/387577302_A_Survey_of_Agentic_AI_Multi-Agent_Systems_and_Multimodal_Frameworks_Architectures_Applications_and_Future_Directions)
- AI Engineer summit 2025: Agent Engineering: [Day 1](https://www.youtube.com/watch?v=L89GzWEILkM) [Day 2](https://www.youtube.com/watch?v=D7BzTxVVMuw) 

- **Agent Frameworks**
  - [LangGraph](https://www.langchain.com/langgraph)
  - [LlamaIndex](https://docs.llamaindex.ai/en/stable/use_cases/agents/)
  - [AutoGen](https://microsoft.github.io/autogen/stable/) / [AG2](https://github.com/ag2ai/ag2) (confusing fork under way)
  - [crew.ai](https://www.crewai.com/)

- **People to Follow**
  - [Hamel Husein](https://hamel.dev/)
  - [Simon Willison](https://simonwillison.net/)
  - [Nir Diamant](https://diamantai.substack.com/)
  - [Shawn 'swyx'  Wang](https://www.latent.space/)
  - [Ethan Mollick](https://www.oneusefulthing.org/)
  - [Harrison Chase](https://blog.langchain.dev/author/harrison/)
  - [Jerry Liu](https://www.llamaindex.ai/blog/author/jerry-liu)
  - [Logan Kilpatrick](https://logank.ai/)
  - [Chip Huyen](https://huyenchip.com/)
  - [Lilian Weng](https://lilianweng.github.io/) (whose blog template I appropriated a few years ago, many thanks!)
  - [Heiko Hotz](https://heiko-hotz.medium.com/about)
  - [Andriy Burkov](https://aiweekly.substack.com/)

- **Books**
  - Jay Alammar
  - Sebastian Raschka
  - Chip Huen - AI Engineering
  - Maxime Labonne LLM Engineer
  - Andriy Burkov
