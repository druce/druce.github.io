---
id: 7129
title: 'Practical ChatGPT Prompting: 15 Patterns to Improve Your Prompts'
subtitle: ''
date: 2024-01-13T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7129
permalink: /2024/01/prompting
categories: datascience
tags: datascience

---

> A logician is hiking through snowy woods and sees a small spaceship, and next to it, two tiny legs, sticking out of a snow drift. He digs the little creature out, and it turns out to be small omniscient space alien. The alien is extremely grateful and, being omniscient, offers to answer any question the logician may have. Naturally the logician asks: "What is the best question to ask and what is the correct answer to that question?" The tiny alien pauses momentarily, and replies, "The best question is the one you just asked; and the correct answer is this one." And just like that...the alien hops in their spaceship and flies away.

<figure>
  <img
  src="/assets/2024/young_lady_chatgpt.png"
  alt="Young lady prompting ChatGPT.">
  <figcaption>Image via Dall-E: An image in the style of an arty Japanese animated film with vibrant colors, side view of a young lady sitting at a desk in front of a laptop in a library, looking dreamy and inquisitive. On her laptop screen, a futuristic robot is depicted sitting at a sleek desk facing the young lady.
</figcaption>
</figure>
<!--more-->

Perhaps you are not getting exactly the desired result from a ChatGPT prompt, and you want to improve it. Maybe there is a ChatGPT prompt you use every day, and you would really like to perfect it. 

Here is a checklist of 15 ways to improve your prompts:

1. **Throw in the kitchen sink.** More is better. Don't shy away from long, detailed prompts, embrace them. The objective of prompting is like programming in the sense of using language to tell the computer to perform a task. But ChatGPT speaks *your* language, and pays attention to everything you write. And the context window is big. So use it, within reason. Think of ChatGPT as a small omniscient alien intern who has read everything on the Internet but needs very specific, detailed instructions. Ask (specifically) and ye shall receive. And it can help a lot if you learn a few quirks of its alien intelligence.
2. **Add a Persona and Context**. Give ChatGPT a clear role: present the answer like an Ivy League professor, like a Goldman Sachs investment banker, like a McKinsey consultant, like a Gartner research analyst.
   > You are a strategy consultant from a leading firm like McKinsey, with a Harvard MBA and deep subject matter knowledge in supply chain management, who has been tasked with outsourcing auto parts production.
2. **Specify the Audience**. Who is the answer for? "Explain this to a business analyst", or "a data scientist", or "a 5 year old". "Assume that I know little about the topic that we are discussing, simplify jargon and technical terms, and define any terms that are not general knowledge". 
3. **Output Style**. Request a detailed or concise response, a professional or an academic tone, a style mimicking a well-known author or media outlet, or a specific text. Specify the emotional tone and cultural background. For coding, follow these variable naming conventions, style paradigms, object-oriented patterns. 
5. **Output Format**. Request formatting like bullets, markdown, links, citations, or a specific outline, structure or template.
6. **Input Format**. Would specific delimiters or placeholders or a 'domain specific language' help ChatGPT understand the input template? "Summarize the input delimited by '", or "classify records I will provide in the following format" (JSON, CSV or python dict are good), use this bulleted list using bullet symbols '-' , '\*', '+', '>' at successive depths of nesting).
7. **Be As Specific As Possible.** Is there anything you can clarify and make more clear, less ambiguous? Tell ChatGPT which elements to focus on in the answer, and which to ignore. Add the constraints, requirements, key qualities of a good answer as you would explain them to your intern. Try to avoid negative prompts like don't do X, or make those super specific if unavoidable.
8. **Add Examples.** Provide as many examples of good input/output pairs as possible.
9. **Chain of Thought.** Can you provide a recipe to follow step by step to arrive at a good answer? 
   
   >Q: Mary has 5 apples. She eats one apple and gives one to Jane. How many apples does she have left?
   >
   A: Mary starts with 5 apples. She eats one apple, leaving 5-1=4 apples. She gives one to Jane, leaving 4-1=3 apples. The answer is 3 apples. 
>   
   Q: Helen has 12 bananas. She uses 4 to bake banana bread and 1 for a banana split. How many bananas does Helen have left?
>   
    A:
   
10. **Idioms**. Use phrases that act as 'speed bumps', give ChatGPT 'time to think', and cause it to pause and check: "let's think step by step"; "let's work this out and check carefully to make sure that requirement X is true".
11. **Reflective pattern**. Prompt ChatGPT to explain its reasoning, critique its own answers, and list assumptions and facts. Ask ChatGPT, "explain the steps you used to arrive at this answer like you would to a 5 year-old". Ask ChatGPT to offer counterarguments, propose alternative answers and compare them, list assumptions and facts that the answer depends on. "Create a set of facts that the answer depends on that should be fact-checked and list this set of facts at the end of your output. Only include facts related to X."
12. **Let ChatGPT improve your prompt**. Ask ChatGPT to provide specific criticism of your prompt, and then fix it. Ask ChatGPT to suggest good prompts for your topic. There are many lists of good prompts on the web; see the additional links below, and search for relevant ones.
13. **Iterative Q&A**. Ask ChatGPT to read your question carefully, ask you 3 clarifying questions, and then answer the question.
14. **Progressive refinement**. After you get an answer, ask ChatGPT to iteratively improve it in the direction you find useful. Start generally and then ask more in-depth questions.
15. **Starting text**. Offer the start of the answer like "Here is a checklist of 15 bullet points to improve your prompting."

 This form of 'prompt engineering' may seem a little weird, like hocus-pocus cargo cult and not real engineering, just babbling and cajoling and simping with a hallucinatory opaque stochastic parrot.

If you want to learn a programming language properly, it will take 6 months of practice. If you want to be great at algorithms and best practices in software engineering it will take a lifetime. If you want to write good prompts it will take you an hour and a disciplined checklist. If you are systematically A/B testing prompts from a well-chosen corpus, writing queries to build the best examples for a prompt on the fly, then it gets closer to engineering. 

A good or bad thing about engineering is, it's not just book learning and formal training, it's getting things built. Good engineers hack! So I won't gatekeep and begrudge anyone who builds stuff the term 'engineer' too much. Even if a plumber calls themself a heating engineer.

If you have a task amenable to natural language processing that you perform every day, like looking up data and grabbing some pieces and summarizing, and if you spend 30 minutes on a prompt and it saves you 15 minutes every day, that's a good return on investment. 

If you have a team of 12 analysts or bankers, and you could save each an hour a day, it might even pay to have an FTE 'prompt analyst' (if not 'engineer')  who collects tasks and good outputs and writes good prompts and A/B tests them for the team.

A good ChatGPT prompt creates a zero-shot or few-shot machine learning model. It may get you 80% of the value of a fully trained machine learning model for tasks like classification, data scrubbing etc. Before ChatGPT, that would require a substantial ML effort. For many tasks, the answer to, 'what is the simplest thing that might actually work', is ChatGPT. And of course, for writing tasks, for generating a first cut at Python code, ChatGPT can be nothing short of miraculous.

If you wouldn't sneer at getting productivity gains by writing an Excel macro or Python script to automate your work, there is no reason to object to learning ChatGPT's strange ways to get good results. 

If tech offers me 'infinite interns', I'll take them. You don't have to, but you might get outperformed by the people who have them!

Yeah, the future is weird.

**Additional Reading:**
  - [Short prompt engineering course from OpenAI](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/) (not just for devs because prompts are same in chat UI but this course uses API and Jupyter) 
  - [OpenAI Prompt Engineering documentation](https://platform.openai.com/docs/guides/prompt-engineering)
  - [Prompt engineering for normies in the web or mobile UI](https://www.coursera.org/learn/prompt-engineering)
  - [Prompt engineering patterns paper](https://www.dre.vanderbilt.edu/~schmidt/PDF/prompt-patterns.pdf) 
  - [Principled questions are all you need paper](https://arxiv.org/pdf/2312.16171.pdf)
  - [Lilian Weng (OpenAI) prompt engineering post](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/) 
  - [Awesome Prompt Engineering](https://github.com/promptslab/Awesome-Prompt-Engineering)
  - [Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)
  - [Search the GPT store for prompt assistant GPTs](https://chat.openai.com/gpts)
  - [Prompt assistant extensions for Chrome](https://chromewebstore.google.com/search/prompt)
  - [Prompt generator using a template](https://mitenmit.github.io/gpt/)

