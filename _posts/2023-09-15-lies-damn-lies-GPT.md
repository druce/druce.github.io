---
id: 7125
title: 'Truth, Lies, and ChatGPT'
subtitle: 'On the fine line between clever and stupid, between BS, cargo cults, and honest inquiry; the Dari&eacute;n Gap between wordcel AI and shape-rotator AI, what AI might mean for social construction of reality, and what we should do about it.'
date: 2023-09-15T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7125
permalink: /2023/09/chatgpt
categories: datascience
tags: datascience

---

>*That was just bullshit, Joel. - Miles, in [Risky Business (1983)](https://getyarn.io/yarn-clip/60423ed3-f7a6-4807-a43d-bf71c85214d1)*

<!--more-->

![greatimposterposter.jpg](/assets/2023/greatimposterposter.jpg)

What does ChatGPT really know? Where does it falter? Where do we stand on the journey to Artificial General Intelligence? Are we nearing the [singularity](https://en.wikipedia.org/wiki/The_Singularity_Is_Near)? What does generative AI mean for increasingly computer-mediated [human reality](https://en.wikipedia.org/wiki/The_Social_Construction_of_Reality)?

Every new generation of media and tech since TV seems to make us dumber. How do we break the cycle and harness AI that makes us smarter, by helping us sort through the glut of information and misinformation and bullshit? 

ChatGPT can generate infinite 'truthy' bullshit at near-zero cost, including 'deepfake' audio and video. And then it can potentially further train itself of the ones that go viral, concentrating fake 'truth' deep in our information infrastructure and knowledge frameworks. The singularity might be a singularity of bullshit.

How do we engineer our knowledge ecosystem to disrupt bullshit instead of perpetuating and maginifying it, and further intensifying the acid bath our ever-shorter attention spans soak in? How do we deal with deepfakes, misinformation, and other forms of AI-assisted fraud and bullshit? 

First let's talk about what ChatGPT currently knows, and how it might evolve. Then let's explore the nature of human bullshit and its ecosystem, and what humans know vs. what we think we know. Finally, let's discuss some takeaways and possible policies.

### ChatGPT and bullshit

>*There are three kinds of lies: lies, damned lies, and statistics. - Mark Twain*

![liarliar.png](/assets/2023/liarliar.png)

ChatGPT is remarkably good at bullshit. For example, let's ask it to summarize the story of the movie "Titanic" in various styles, like a literary reviewer, or a Gen Z slacker, or Snoop Dogg.

![/assets/2023/titanic-critic.png](/assets/2023/titanic-critic.png)

![/assets/2023/titanic-genz.png](/assets/2023/titanic-genz.png)

![/assets/2023/titanic-snoop.png](/assets/2023/titanic-snoop.png)

ChatGPT excels as a pattern matcher and mimic, ranking in the [top 0.1% in verbal IQ](https://www.scientificamerican.com/article/i-gave-chatgpt-an-iq-test-heres-what-i-discovered/) by some measures. You can ask ChatGPT to respond like a Harvard history professor, an FT or WSJ journalist, a Goldman Sachs research analyst with deep knowledge of economics, finance, and investment management, or a McKinsey management consultant with expertise in corporate strategy and operations, and it will do an impressive job. It can even write decent [Harvard papers](https://www.slowboring.com/p/chatgpt-goes-to-harvard), which is of course the bullshit Olympics. If you want, you could tell ChatGPT you want all replies written in the language of [incel rage bait](https://twitter.com/nivi/status/1683621899254001665), or a fictional persona like Holden Caulfield.

It seems likely that, within a few years, most professional writing and creative work will be done with the assistance of ChatGPT. (For simplicity, let's use 'ChatGPT' as a shortcut for generative AI as a whole). Feed ChatGPT your corporate style guide and examples of tone, voice and branding nuances, and it will [speed up and improve](https://www.science.org/doi/10.1126/science.adh2586) writing and [knowledge work tasks](https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged). Its fluidity is [essentially indistinguishable from human writing](https://www.science.org/doi/10.1126/sciadv.adh1850). Fine artists might have to take a page from mountain climbers who characterize their ascents as 'without oxygen' or 'free solo' and specify what assistive AI tech was used. Everybody can now be a [James Michener](https://www.erroluys.com/covenantassignment1.html) or [Edward Stratemeyer](https://daily.jstor.org/the-secret-syndicate-behind-nancy-drew/), prolific authors, who operated more like content mills with teams of assistants. 

You can use the basic logic and reasoning inherent in language understanding and generation to create remarkable workflows: ask an agent to identify the best coffee machine according to your criteria, fetch information from Google, verify it, condense it, make a recommendation based on data, and then succinctly summarize and explain it. Most complex tech will probably integrate ChatGPT assistants, possibly mostly replacing existing UIs, APIs, and DSLs. An AI assistant like [Microsoft Copilot](https://www.microsoft.com/en-us/microsoft-365/blog/2023/09/21/announcing-microsoft-365-copilot-general-availability-and-microsoft-365-chat/) that knows you and your workflows and content creation style well, might become the UI of first choice to many different applications, abstracting the UI from application layer.

Skeptics might say ChatGPT doesn't have deep knowledge, and it's all surface level bullshit, which has a kernel of validity. ChatGPT doesn't actually 'program' like a computer science student does, which is to make a mental model of a novel problem and write code to solve it based on knowledge of language syntax and semantics and algorithms. What ChatGPT can do is read all the code in existence, which a computer science student cannot. And then, if there is code out there similar to what you are asking it to code, if will write something possibly amazing, or possibly pretty good but badly flawed. It might even make up modules and APIs it thinks it needs to perform a task. If you give it a [Leetcode](https://www.techinterviewhandbook.org/grind75) hard problem that it has never seen before, it [cannot solve it](https://twitter.com/cHHillee/status/1635790330854526981). ChatGPT has extensive knowledge but not deep understanding. It gives you ['infinite interns'](https://www.ben-evans.com/benedictevans/2023/7/2/working-with-ai), but you have to give them really detailed directions, and they sometimes go off the rails regardless. It's just a matter of time for the first major IT disaster fueled by generative AI, like when the Mars probe [blew up due to a metric/Imperial error](http://www.cnn.com/TECH/space/9909/30/mars.metric.02/).

But ChatGPT knows a hell of a lot. Go to a [random Wikipedia page](https://wikiroulette.co/) and quiz ChatGPT on a fact, like who won the 1995 world women's handball championship, and it will probably know the answer. And the [GPT-4 paper](https://arxiv.org/abs/2303.08774) shows it passed all these tests (note the poor math scores, we will come back to that):

![https://druce.ai/assets/2023/gpt/TestScores.png](https://druce.ai/assets/2023/gpt/TestScores.png)

Carl Sagan said, "If you wish to make an apple pie from scratch, you must first invent the universe." Similarly, if you wish to predict Shakespeare's next token from scratch you must first fully model Shakespeare's universe. A sufficiently immense statistical knowledge graph of linguistic relationships inherently encapsulates a great deal of human knowledge.

On the other hand it's also easy to be lured by ChatGPT's linguistic fluency into the trap of thinking ChatGPT is smarter than it is. Smart people ask it to tackle complex questions like, make a psychological profile of this person based on this writing, rate this resume against this job description. It will happily generate wrong, highly confident answers. It's good at first-order language understanding and generation, information extraction, summarization. You can give it a second-order question like, what is the difference between a Les Paul Standard and a Les Paul Custom, and it will be helpful. You can give it chain-of-thought reasoning tasks like, here are a bunch of annual reports, think step by step and give me compound annual growth rate in revenues for last 5 years. But chain-of-thought starts to veer into telling ChatGPT the answer you want. 

Expecting ChatGPT to answer deep analytical questions at the level of a thoughtful, experienced MBA/CFA analyst is unrealistic. Just as constructing fluent language requires implicit factual knowledge, it also requires implicit rhetorical logic. But LLMs [struggle at complex reasoning](https://aiguide.substack.com/p/can-large-language-models-reason). Yet if you ask ChatGPT complex questions, it will sound highly competent and credible. And therein lies the trap. We are going to get a ton of terrible, directed thinking, that sounds really persuasive and is supported by beautiful but misleading dataviz from the [Advanced Data Analysis / Code Interpreter](https://www.coursera.org/learn/chatgpt-advanced-data-analysis) plugin.

ChatGPT is an AI [Ferdinand Waldo Damara](https://www.businessinsider.com/ferdinand-waldo-demara-greatest-con-artist-ever-great-imposter-2016-9#the-brave-and-generous-surgeons-fame-spread--all-the-way-back-to-the-real-dr-joseph-cyr-15). The exploits of Damara, dubbed [The Great Impostor](https://www.imdb.com/title/tt0053879/?ref_=fn_al_tt_1), exceed the [possibly exaggerated frauds of Frank Abagnale](https://nypost.com/2023/03/13/catch-me-if-you-can-conman-frank-abagnale-lied-about-his-lies/).  Damara had a photographic memory and an exceptional IQ, and undoubtedly had the ability to be a legitimate doctor, or civil engineer, if not the character and temperament. Are you a surgeon because you have degrees and appointments, or because you [save lives](https://nowiknow.com/the-doctor-is-in-we-think/)? To bullshit well, you have to know a lot about what you are doing. 

ChatGPT excels at plausible, ['truthy' explanations](https://www.cc.com/video/63ite2/the-colbert-report-the-word-truthiness). It will happily make stuff up if you ask it about fictional characters or APIs. Fortunately, it's such a people-pleaser that, if you merely instruct it to use only a specific source of truth, or to think step by step and be careful not to say anything that isn't true, then it will generally avoid making stuff up. 

Maybe what ChatGPT shows us is that the line between clever and stupid is finer and more fluid than we think. Sometimes the line between fraud, bullshit, cargo cult science and hard science is a bit elusive.

If you can keep ChatGPT grounded in reality and avoid situations where it goes off the rails, it is truly a force multiplier for knowledge work. It's a huge step towards Artificial General Intelligence (AGI). But it's not AGI yet. Things that fully-developed AGI would want to do:

- **Sensory Perception.** Cameras are great but human eyes are better, maybe 500 megapixels, wide dynamic range, heuristics to detect and track objects and integrate over time.

- **Filtering.** Human senses transmit roughly [1GB/s of information to the brain](https://hasanoviz.medium.com/visualization-principles-a8c6e46ddc5f). Most of the data is filtered before we become aware of it. We can only process maybe [120 bits of conscious awareness per second](https://www.fastcompany.com/3051417/why-its-so-hard-to-pay-attention-explained-by-science), on a [half-second lag behind real-time](https://www.tandfonline.com/doi/full/10.1080/14681360500487470). The preprocessing by the optic nerve and subconscious [integration of various senses](https://www.youtube.com/watch?v=YvnOtS4V-Pg) mean that by the time we are aware of something, it already makes sense. To play soccer like Messi, you have to train until your brain [OODA-loops](https://en.wikipedia.org/wiki/OODA_loop) rings around your opponent without conscious thought.

- **Memory and representation**. AGI would fit new facts into existing frameworks, and create new frameworks to fit facts that don't fit old patterns.

- **Abstraction**. Using inductive reasoning, it would extrapolate from concrete examples to general principles.

- **Deductive reasoning.** It would use general models and principles to solve specific problems, identifying the best model and inputs to the model.

- **Autonomy.** It would independently determine high-priority tasks and execute them without external prompts, based on its own values and objectives. 

- **Adaptation.** It would constantly learn and improve its policies to better accomplish its objectives.

- **Self-reflection.**  It would use introspection to reason about itself, evaluate its own progress, determine what it needs to learn and practice to achieve its objectives.

- **Flexibility.** Creative solutions to complex novel problems.

- **Empathy.** The ability to model other intelligent agents.

- **Systems thinking.** The ability to model systems of agents, think strategically, and determine individual policies aligned with shared objectives. Ethical reasoning is basically strategic thinking, on a long timeframe, taking into account multi-agent policy equilibria.

- **Communication.** Ability to explain and communicate its thinking and actions to other intelligent agents, achieving cooperation and collaboration for shared objectives.

- **Physical interaction.** Robotic manipulation of complex novel environments.

- **Sentience.** Even defining consciousness remains elusive. We can experience it directly but there is no test for it. It's a poignant element of the human condition that we are social creatures, language creatures, but our most direct experiences are ones about which we can say and share very little. [Whereof one cannot speak, etc.](https://www.brainyquote.com/authors/ludwig-wittgenstein-quotes)

ChatGPT is a giant leap forward. Unlike humans, computers are fungible and once you create one intelligence, you can create millions. Then they can communicate with each other at much higher rates than humans, self-improving rapidly. The [singularity](https://en.wikipedia.org/wiki/The_Singularity_Is_Near) starts to come into focus. We're maybe only a couple of ChatGPT-size leaps away, and the leaps might get easier because we can use the machine learning tools we built before to make the next leap. We're not there, but maybe we can start to see it from here.

