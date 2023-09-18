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

(A work in progress)

What does ChatGPT really know? Where does it go astray? What does generative AI mean for human knowledge and the [social construction of human reality](https://en.wikipedia.org/wiki/The_Social_Construction_of_Reality)? Every new generation of media and tech since TV seems to make us dumber. How do we break the cycle and get AI that makes us smarter by helping us sort through the glut of information and misinformation and bullshit? How do we make it disrupt the bullshit ecosystem vs. sustaining and exploding it, further concentrating the acid bath our ever-shorter attention spans soak in? What do we do about deepfakes, misinformation, and other forms of AI-assisted fraud and bullshit? Where are we on the path to Artificial General Intelligence?

First let's talk about what ChatGPT really knows today, and how it might evolve. Then let's talk about the nature of human bullshit and what humans know vs. that we think we know. Finally, let's discuss some takeaways and possible policies.

### ChatGPT and bullshit

>*There are three kinds of lies: lies, damned lies, and statistics. - Mark Twain*

ChatGPT is an excellent bullshitter. For example, let's ask it to summarize the story of the movie "Titanic" in various styles, like a literary reviewer, or a Gen Z slacker, or Snoop Dogg.

![/assets/2023/titanic-critic.png](/assets/2023/titanic-critic.png)

![/assets/2023/titanic-genz.png](/assets/2023/titanic-genz.png)

![/assets/2023/titanic-snoop.png](/assets/2023/titanic-snoop.png)

ChatGPT is a pattern matcher and mimic par excellence, scoring in the [top 0.1% in verbal IQ](https://www.scientificamerican.com/article/i-gave-chatgpt-an-iq-test-heres-what-i-discovered/) by some measures. You can ask ChatGPT to write like a Harvard history professor, an FT or WSJ journalist, a Goldman Sachs research analyst with deep knowledge of economics, finance, and portfolio analysis, or a McKinsey management consultant with expertise in corporate strategy and operations, or take on a fictional persona, and it will do a good job. It can even write acceptable [Harvard papers](https://www.slowboring.com/p/chatgpt-goes-to-harvard), which is of course the bullshit Olympics.

It seems pretty clear that in a few years most professional writing and creative work will be done with the help of generative AI. More generally, all complex tech will have ChatGPT assistants, that might largely supplant existing UIs, APIs, DSLs. (Let's use 'ChatGPT' as a shortcut for generative AI in general). You can give ChatGPT your corporate style guide and examples of tone, voice and branding, and it will [speed up and improve](https://www.science.org/doi/10.1126/science.adh2586) writing and [knowledge work tasks](https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged), and its fluidity is [essentially indistinguishable from human writing](https://www.science.org/doi/10.1126/sciadv.adh1850). Fine artists are going to have to take a page from mountain climbers who claim ascents as 'without oxygen' or 'free solo' and specify what assistive AI tech was used. Everybody can now be a [James Michener](https://www.erroluys.com/covenantassignment1.html or [Edward Stratemeyer](https://daily.jstor.org/the-secret-syndicate-behind-nancy-drew/), prolific authors who operated more like content mills.

You can use the logic inherent in language understanding and generation to create remarkable workflows: ask an agent to find the best coffee machine according to some criteria, fetch information from Google, check it, summarize it, make a decision based on it, summarize and explain the decision.

But it's easy to fall into the trap of thinking ChatGPT is smarter than it is, because it's so fluent. Smart people ask it tackle higher-order questions like, make a psychological profile of this person based on this writing, rate this resume against this job description. It will happily generate wrong, highly confident answers. It's good at first-order language understanding and generation, information extraction, summarization. Sometimes you can give it a second-order question like, here are a bunch of annual reports, think step by step and give me compound annual growth rate in revenues for last 5 years, and it will extract the annual revenues and calculate the growth rate. But asking it to answer deeper questions at the level of a thoughtful, experienced MBA/CFA analyst is a stretch. Yet if you ask it, it will sound highly credible. And therein lies a trap. We are going to get a ton of terrible, directed thinking, that sounds really persuasive and is supported by lovely dataviz from the [Advanced Data Analysis / Code Interpreter](https://www.coursera.org/learn/chatgpt-advanced-data-analysis) plugin.

Some people fall into the opposite trap of being skeptics, saying ChatGPT doesn't really have deep knowledge, and it's all bullshit, which has a kernel of validity. ChatGPT doesn't actually know how to program in the sense a computer science student does, which is to make a mental model of a novel problem and write code to solve it. What ChatGPT is able to do is read all the code in existence, which a computer science student cannot do. And then, if there is code out there pretty similar to what you are asking it to code, if will write something possibly amazing, or possibly pretty good but severely flawed. But if you give it a [Leetcode](https://www.techinterviewhandbook.org/grind75) hard problem that it has never seen before, it [cannot solve it](https://twitter.com/cHHillee/status/1635790330854526981). ChatGPT has extensive knowledge but not deep understanding. It gives you ['infinite interns'](https://www.ben-evans.com/benedictevans/2023/7/2/working-with-ai), but you have to give them really detailed instruction, and they sometimes go off the rails regardless.

But it knows a lot. Go to a [random Wikipedia page](https://wikiroulette.co/) and quiz Wikipedia on a fact, like who won the 1995 world women's handball championship, and it will probably know the answer. And the GPT-4 paper shows it passed all these tests:

![https://druce.ai/assets/2023/gpt/TestScores.png](https://druce.ai/assets/2023/gpt/TestScores.png)

Carl Sagan said, "If you wish to make an apple pie from scratch, you must first invent the universe." Similarly, if you wish to predict a Shakespeare's next token from scratch you must first fully model Shakespeare and know everything he knew, or at least everything he wrote.

A sufficiently immense statistical knowledge graph of linguistic relationships inherently encapsulates a great deal of human knowledge.

ChatGPT is an AI [Ferdinand Waldo Damara](https://www.businessinsider.com/ferdinand-waldo-demara-greatest-con-artist-ever-great-imposter-2016-9#the-brave-and-generous-surgeons-fame-spread--all-the-way-back-to-the-real-dr-joseph-cyr-15), whose exploits of deception exceed the [possibly exaggerated frauds of Frank Abagnale](https://nypost.com/2023/03/13/catch-me-if-you-can-conman-frank-abagnale-lied-about-his-lies/ .).  Damara, the [Great Impostor](https://www.imdb.com/title/tt0053879/?ref_=fn_al_tt_1), possessed a photographic memory and an exceptional IQ, and undoubtedly could have been a legitimate psychologist, doctor, or civil engineer based on ability, if not based on opportunity and character and disposition. Are you a surgeon because you have degrees and appointments, or because you have the ability to [save lives](https://nowiknow.com/the-doctor-is-in-we-think/)? To bullshit really well, you have to actually know a lot about what you are doing. 

ChatGPT is great at telling you things that sound plausible, 'truthy' things as Stephen Colbert would say. It will happily make stuff up if you ask it about fictional characters or APIs. Fortunately, it's such a people-pleaser that, if you merely instruct it to use only a specific source of truth, or to think step by step and be careful not to say anything that isn't true, then it will generally avoid making stuff up. Maybe what ChatGPT shows us is that the line between clever and stupid is finer and more fluid than we think. Sometimes the line between fraud, bullshit, cargo cult science and hard science is a bit elusive.

If you can keep ChatGPT grounded in reality and avoid situations where it goes off the rails, it is truly a force multiplier for knowledge work. But if it's a huge step towards Artificial General Intelligence, it's not there yet. Things that fully-developed AGI would want to do:

- Perceive and sense the environment at a human level. Cameras are great but human eyes are better, maybe 500 megapixels, huge dynamic range, a lot of heuristics to detect and track objects and integrate over time.
- Filter the enormous bandwidth intelligently. Human senses transmit on the order of [1GB/s of information to the brain](https://hasanoviz.medium.com/visualization-principles-a8c6e46ddc5f), but nearly all of it is filtered before we become aware of it and we can only process maybe [120 bits of conscious awareness per second](https://www.fastcompany.com/3051417/why-its-so-hard-to-pay-attention-explained-by-science), on a [half-second lag behind real-time](https://www.tandfonline.com/doi/full/10.1080/14681360500487470). The optic nerve does a huge amount of preprocessing, we unconsciously [integrate various senses](https://www.youtube.com/watch?v=YvnOtS4V-Pg) over time, and by the time we are aware of it, stuff already makes sense. To play soccer like Messi, you have to train until your brain [OODA-loops](https://en.wikipedia.org/wiki/OODA_loop) rings around your opponent without even consciously thinking about it.
- Memory and representation: fit new facts into existing frameworks, and create new frameworks to fit fact patterns that don't fit old frameworks.
- Abstraction: inductive reasoning to extrapolate from concrete examples to general principles.
- Deductive reasoning: select and apply general models and principles to solve specific problems, determining which model fits the problem and what inputs should go into the model.
- Independent motivation, planning, and executive function, determining the highest value tasks and performing them. 
- Constant self-improvement, adaptation and evolution.
- Meta-reasoning about oneself, using motivation and executive ability to evaluate one's own progress, and determine what one needs to learn and practice to achieve a goal.
- Human-like flexibility; Creative, complex solutions to complex novel situations.
- Empathy and ability to model other intelligent agents.
- Strategic and ethical reasoning, ability to model systems of agents and determine individual policies that are aligned with shared values and objectives. Ethical reasoning is basically strategic thinking, on a long timeframe, taking into account multi-agent policy equilibria.
- Ability to explain and communicate its thinking and actions to other intelligent agents.
- Combining these capabilities to achieve cooperation with other agents.
- Physical manipulation of complex novel environments.
- Consciousness / sentience, but what does that even mean? it's something we seem to experience directly but there is no test for it. It's a poignant element of the human condition that we are social creatures, language creatures, but our most direct experiences are ones about which we can say and share very little. [Whereof one cannot speak, etc.](https://www.brainyquote.com/authors/ludwig-wittgenstein-quotes)

ChatGPT is a monumental step forward. Unlike humans, computers are fungible and once you create one intelligence, you can immediately create millions. And they can communicate with each other at much higher rates than humans can communicate with each other. Effectively self-improving at a higher rate than humans can. The [singularity](https://en.wikipedia.org/wiki/The_Singularity_Is_Near) starts to come into focus. We're maybe only a couple of ChatGPT-size leaps away, and they might get easier because we can use the machine learning tools we built before to make the next leap. We're not there, but maybe we can start to see it from here.

To be continued...
