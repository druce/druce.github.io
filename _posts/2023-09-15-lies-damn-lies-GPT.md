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

First let's talk about what ChatGPT really knows today, and how it might evolve. Then let's talk about the nature of human bullshit and what humans know vs. what we think we know. Finally, let's discuss some takeaways and possible policies.

### ChatGPT and bullshit

>*There are three kinds of lies: lies, damned lies, and statistics. - Mark Twain*

ChatGPT is an excellent bullshitter. For example, let's ask it to summarize the story of the movie "Titanic" in various styles, like a literary reviewer, or a Gen Z slacker, or Snoop Dogg.

![/assets/2023/titanic-critic.png](/assets/2023/titanic-critic.png)

![/assets/2023/titanic-genz.png](/assets/2023/titanic-genz.png)

![/assets/2023/titanic-snoop.png](/assets/2023/titanic-snoop.png)

ChatGPT is a pattern matcher and mimic par excellence, scoring in the [top 0.1% in verbal IQ](https://www.scientificamerican.com/article/i-gave-chatgpt-an-iq-test-heres-what-i-discovered/) by some measures. You can ask ChatGPT to write like a Harvard history professor, an FT or WSJ journalist, a Goldman Sachs research analyst with deep knowledge of economics, finance, and portfolio analysis, or a McKinsey management consultant with expertise in corporate strategy and operations, or take on a fictional persona, and it will do a good job. It can even write acceptable [Harvard papers](https://www.slowboring.com/p/chatgpt-goes-to-harvard), which is of course the bullshit Olympics.

It seems pretty clear that in a few years most professional writing and creative work will be done with the help of generative AI. More generally, all complex tech will have ChatGPT assistants, that might largely supplant existing UIs, APIs, DSLs. (Let's use 'ChatGPT' as a shortcut for generative AI in general). You can give ChatGPT your corporate style guide and examples of tone, voice and branding, and it will [speed up and improve](https://www.science.org/doi/10.1126/science.adh2586) writing and [knowledge work tasks](https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged), and its fluidity is [essentially indistinguishable from human writing](https://www.science.org/doi/10.1126/sciadv.adh1850). Fine artists are going to have to take a page from mountain climbers who claim ascents as 'without oxygen' or 'free solo' and specify what assistive AI tech was used. Everybody can now be a [James Michener](https://www.erroluys.com/covenantassignment1.html) or [Edward Stratemeyer](https://daily.jstor.org/the-secret-syndicate-behind-nancy-drew/), prolific authors who operated more like content mills.

You can use the logic inherent in language understanding and generation to create remarkable workflows: ask an agent to find the best coffee machine according to some criteria, fetch information from Google, check it, summarize it, make a decision based on it, summarize and explain the decision.

But it's easy to fall into the trap of thinking ChatGPT is smarter than it is, because it's so fluent. Smart people ask it to tackle higher-order questions like, make a psychological profile of this person based on this writing, rate this resume against this job description. It will happily generate wrong, highly confident answers. It's good at first-order language understanding and generation, information extraction, summarization. You can give it a second-order question like, what is the difference between a Les Paul Standard and a Les Paul Custom, or, here are a bunch of annual reports, think step by step and give me compound annual growth rate in revenues for last 5 years. But asking it to answer deeper questions at the level of a thoughtful, experienced MBA/CFA analyst is a stretch. Yet if you ask it, it will sound highly credible. And therein lies a trap. We are going to get a ton of terrible, directed thinking, that sounds really persuasive and is supported by lovely dataviz from the [Advanced Data Analysis / Code Interpreter](https://www.coursera.org/learn/chatgpt-advanced-data-analysis) plugin.

Some people fall into the opposite trap of being skeptics, saying ChatGPT doesn't really have deep knowledge, and it's all bullshit, which has a kernel of validity. ChatGPT doesn't actually know how to program in the sense a computer science student does, which is to make a mental model of a novel problem and write code to solve it. What ChatGPT is able to do is read all the code in existence, which a computer science student cannot do. And then, if there is code out there pretty similar to what you are asking it to code, if will write something possibly amazing, or possibly pretty good but badly flawed. But if you give it a [Leetcode](https://www.techinterviewhandbook.org/grind75) hard problem that it has never seen before, it [cannot solve it](https://twitter.com/cHHillee/status/1635790330854526981). ChatGPT has extensive knowledge but not deep understanding. It gives you ['infinite interns'](https://www.ben-evans.com/benedictevans/2023/7/2/working-with-ai), but you have to give them really detailed instruction, and they sometimes go off the rails regardless. Just waiting for the first major IT disaster fueled by generative AI, like when the Mars probe [blew up due to a metric/Imperial error.](http://www.cnn.com/TECH/space/9909/30/mars.metric.02/)

But ChatGPT knows a hell of a lot. Go to a [random Wikipedia page](https://wikiroulette.co/) and quiz Wikipedia on a fact, like who won the 1995 world women's handball championship, and it will probably know the answer. And the [GPT-4 paper](https://arxiv.org/abs/2303.08774) shows it passed all these tests (note the poor math scores, we will come back to that):

![https://druce.ai/assets/2023/gpt/TestScores.png](https://druce.ai/assets/2023/gpt/TestScores.png)

Carl Sagan said, "If you wish to make an apple pie from scratch, you must first invent the universe." Similarly, if you wish to predict Shakespeare's next token from scratch you must first fully model Shakespeare and know everything he knew, or at least everything he wrote.

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

ChatGPT is a monumental step forward. Unlike humans, computers are fungible and once you create one intelligence, you can immediately create millions. And they can communicate with each other at much higher rates than humans can communicate with each other. Effectively self-improving at a higher rate than humans can. The [singularity](https://en.wikipedia.org/wiki/The_Singularity_Is_Near) starts to come into focus. We're maybe only a couple of ChatGPT-size leaps away, and the leaps might get easier because we can use the machine learning tools we built before to make the next leap. We're not there, but maybe we can start to see it from here.

### The Dari&eacute;n gap between poets and quants, wordcels and shape rotators

ChatGPT often fails at [obvious riddles](https://www.scientificamerican.com/article/i-gave-chatgpt-an-iq-test-heres-what-i-discovered/), like “What is the first name of the father of Sebastian’s children?”.

![/assets/2023/titanic-critic.png](/assets/2023/John.png)
![/assets/2023/titanic-critic.png](/assets/2023/Sebastian.png)
![/assets/2023/titanic-critic.png](/assets/2023/Milarus.png)

Why is this?

If you want to travel from North America to South America, you can't actually travel the entire way by motor transport. There's a stretch that is impassable to vehicles, for reasons of geography, economy, and politics. That’s the [Dari&eacute;n gap](https://en.wikipedia.org/wiki/Dari%C3%A9n_Gap).

We're in this weird liminal state, where computers are incredible good at computation, and incredibly good at language, but there is something missing to bridge the gap. The latest iPhones have up to 15 trillion floating point operations per second. Wolfram Mathematica or WolframAlpha can do a pretty amazing job with symbolic integration, or solving systems of differential equations. But ChatGPT isn't reliable at simple math problems.

![/assets/2023/gptmathfail.png](/assets/2023/gptmathfail.png)

In the first question, the answer is correct but the first paragraph is wrong and superfluous. In the second question, the correct calculation is  41x67x83=228001.

[It helps](https://arxiv.org/pdf/2302.13814.pdf) many problems if you ask it to 'show your work and think step by step'. Also, in my experience it seems to have gotten better over time, the original examples I used now seem to be answered correctly, and maybe it will get even more problems correct by the time you read this.

If you want to navigate a road network from point A to point B, there are many strategies to do it. One way is to know your GPS coordinates and the GPS coordinates of where you want to go, and look around you which way the roads are going, and keep going toward your destination, continuously updating your position based on the direction and velocity of travel. This is, I suppose, the way people with a 'sense of direction' navigate. Unfortunately, I am not one of them. More like [Captain Sobel](https://www.youtube.com/watch?v=W0scF0yxpNU) in Band of Brothers. Another way is to know the graph of all the main arteries and intersections and use something like [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm). I have the graph of NYC, including public transport, pretty committed to memory at this stage. A third way is to memorize the text directions of where you are going that you got from Google Maps, or a a human, like the ['rutters'](https://en.wikipedia.org/wiki/Rutter_(nautical)) or pilot books of the early explorers.

ChatGPT is very much text-oriented. It's a poet, or a [wordcel](https://roonscape.ai/p/a-song-of-shapes-and-words).

To solve systems of differential equations, you want to be a quant, or a coder, or a shape rotator who models stuff visually and numerically.

[Richard Feynman](https://chem.fsu.edu/chemlab/isc3523c/feyn_surely.pdf) explained these multiple modes of thinking:

*I had a scheme, which I still use today when somebody is explaining something that I’m trying to understand: I keep making up examples. For instance, the mathematicians would come in with a terrific theorem, and they’re all excited. As they’re telling me the conditions of the theorem, I construct something which fits all the conditions. You know, you have a set (one ball) – disjoint (two balls). Then the balls turn colors, grow hairs, or whatever, in my head as they put more conditions on. Finally they state the theorem, which is some dumb thing about the ball which isn’t true for my hairy green ball thing, so I say, ‘False!’*

...

*I can’t understand anything in general unless I’m carrying along in my mind a specific example and watching it go. Some people think in the beginning that I’m kind of slow and I don’t understand the problem, because I ask a lot of these “dumb” questions: “Is a cathode plus or minus? Is an an-ion this way, or that way?” But later, when the guy’s in the middle of a bunch of equations, he’ll say something and I’ll say, “Wait a minute! There’s an error! That can’t be right!” The guy looks at his equations, and sure enough, after a while, he finds the mistake and wonders, “How the hell did this guy, who hardly understood at the beginning, find that mistake in the mess of all these equations?” He thinks I’m following the steps mathematically, but that’s not what I’m doing. I have the specific, physical example of what he’s trying to analyze, and I know from instinct and experience the properties of the thing. So when the equation says it should behave so-and-so, and I know that’s the wrong way around, I jump up and say, “Wait! There’s a mistake!*

Humans seem to use these multiple modes simultaneously and cross-check between them as part of 'common sense'. There is more than one path to enlightenment, and the more you use, the better. ChatGPT is more of a one-trick approximate pattern matching pony. So sometimes in generative AI you get more fingers and teeth than anatomically correct. It feels like, if you combine Stable Diffusion with another AI and tell it, make sure your humans have five fingers and their teeth look like this anatomy lesson, you could do better. For instance [ideogram.ai](https://ideogram.ai/) will let you specify text to appear in a picture, where other AIs struggle and write nonsense.

A few improvements we might see in the not-too-distant future.

ChatGPT is apparently, a [mixture of experts model](https://pub.towardsai.net/gpt-4-8-models-in-one-the-secret-is-out-e3d16fd1eee0). It looks at a question and routes it to the best model to answer it. So if you add an expert model that will answer math word problems, it will inherently do a lot better. You can consider this a horizontal scaling approach, add many more models and use the best one.

Another approach is breaking down questions into components, and doing things sequentially, using an 'agent' workflow  with [function calling, code interpreter, data analytics](https://www.oneusefulthing.org/p/what-ai-can-do-with-a-toolbox-getting). You could ask a question, it would get translated into a problem that could be answered using Wolfram Mathematica or SQL or whatever, ChatGPT translates it into their language, gets the answer back, and interprets the results. One way to make ChatGPT better at math problems is to [reward it for each successful step](https://openai.com/research/improving-mathematical-reasoning-with-process-supervision).

You could combine these approaches and send to multiple expert models that try solve things in differnt ways, cross reference and cross-check each other and fix answers, and then return the explanation back to the user.

We can see that the LLM is evolving into something different. It becomes sort of glue code, it resolves impedence mismatches between different systems. You can take a natural language, translate part of it into SQL, part of it into a search engine query, a REST API, whatever, and then combine the results into a natural-language answer. 

It seems possible to build some of these capabilities into the LLM natively. You can train on the SQL grammar, and on [API specs](https://gorilla.cs.berkeley.edu/). 

It's quite hard to get an LLM to use new information. You have to retrain it from scratch on a new corpus, [or use fine-tuning, or use retrieval-augmented generation](https://towardsdatascience.com/rag-vs-finetuning-which-is-the-best-tool-to-boost-your-llm-application-94654b1eaba7). There is a transfer learning problem that feels solvable. With a little bit more understanding of how LLMs represent a knowledge graph, you could abstract the knowledge graph from the language understanding, and train the LLM against multiple knowledge graphs with orthogonal entities and relationships and facts, in a way that generalizes to other knowledge graphs. Then you could potential swap knowledge in and out. I might be talking out of my ass, and it might turn out that everthing is so intermingled, it's like installing a knowledge cartridge into a human brain. It just feels like retraining a whole model from scratch is pretty inefficient, and we might be able to get to where you could create a knowledge base in a transformer network form where it could be transfered into a pretrained LLM, and vastly reduce the amount of training needed, and maybe update ChatGPT every day with new information from news and Wikipedia, instead of having data through e.g. January 2022 in late 2023.

I see ChatGPT getting a lot smarter, with transfer learning, wider mixture of expert models, deeper models that chain multiple heterogenous expoerts, smart bagging and boosting where they cross-check each other and fix each others' errors. ChatGPT has mastered language. It turns out that to master language you have to master a great deal of knowledge and reasoning. There is a long way to go on the capabilities  above, to master human-like ability to use reason, intelligence, creativity to solve problems in novel, complex, constantly-changing environments. But machines are pretty good at most of the activities involved in AGI. The challenge is to build something that can bridge the Dari&eacute;n gap(s), and integrate all the different aspects of human intelligence.

Then we can get close to AGI and the Steve Wozniak [coffee test](https://www.fastcompany.com/1568187/wozniak-could-computer-make-cup-coffee). Can it go into a random house, find what it needs, and make a good cup of coffee?

### Humans and bullshit

>*Bullshit is the glue that binds us as a nation. - George Carlin*

The fine line between fraud, bullshit, cargo cult science and hard science

### A Tax on Bullshit

Somehow we have to do a better job of penalizing fraud, flim-flam and bullshit and rewarding good science.

