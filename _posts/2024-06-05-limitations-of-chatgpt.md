---
id: 7135
title: 'Avoiding AI Disasters: How to Use ChatGPT Effectively Without Risking Your Reputation or Career'
date: 2024-06-05T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7135
permalink: /2024/06/limitations-of-chatgpt
categories: datascience
tags: datascience

---
>*The most important chart in applying AI.*

<figure>
  <img
  src="/assets/2024/mollick-curve.png"
  alt="Distribution of output scores on a consulting task, with and without AI.">
  <figcaption>Distribution of output quality across all the tasks. The blue group did not use AI, the green and red groups used AI. The red group got additional training on how to use AI.</figcaption>
</figure>

<!--more-->

Ask ChatGPT a simple question: [How many r's are there in 'cranberry'?](/assets/2024/cranberry.png). It often answers 2 instead of 3.

ChatGPT can generate huge productivity gains, but can also generate huge [reputational and career risks](https://www.npr.org/2023/12/30/1222273745/michael-cohen-ai-fake-legal-cases) when it makes embarrassing mistakes. Professional users should consider when and why it might mess up.  Gather round if you want to dodge a ChatGPT disaster! 

Here are more simple prompts that you might expect to work but do not:

- [How many letters are in this sentence: It was a bright cold day in April, and the clocks were striking thirteen.](/assets/2024/1984.png) I got 60, should be 72.

- [Mary has 3 brothers and she also has 5 sisters. How many sisters does Mary's brother have?](/assets/2024/sisters.png) I got "same number of sisters as Mary, which is 5".

- [Make a list of 50 cities that do not contain the letter 'a', or any diacritical variation thereof](/assets/2024/chicago.png). It returned 'Chicago'. Sometimes, with longer answers, it starts to forget the original question.

- [Give me the list of all the countries with 'v' in their name](/assets/2024/countries.png). It missed El Salvador, Moldova. Sometimes if you ask it for countries starting with 'V' or 'K' it will miss Vietnam or Kenya.

- Ask ChatGPT to play Tic-Tac-Toe. It got better since 3.5 when it would cheat or go nuts, but doesn't play optimally. If you ask it to play chess, it makes illegal moves and plays like a small child. Think about this before you ask it to perform a complex analytical task like picking stocks!

Here are prompts that work well:

- Write a limerick about hedge funds where the first letter of each verse spells 'hedge'. It's incredibly fluent with language understanding and generation, including complex nuances and connotations. There's a reason it's called a 'language model'.

- Ask ChatGPT about a specific fact on a random Wikipedia page from [WikiRoulette](https://wikiroulette.co/). It will probably be correct if asked in a straightforward way, because it trained on Wikipedia. However, it does make stuff up sometimes. You have to be very careful to stick to questions where it has a well-grounded basis to answer from training or in the prompt. Also, if you introduce a small variation it may fail: [if it knows Tom Cruise's mother is Mary Lee Pfeiffer, it might not know who Mary Lee Pfeiffer's son is.](https://arxiv.org/abs/2309.12288)

- "What is this news story about? Classify it as belonging to national, local, business, politics, tech, sports." Very good: classification tasks involving deep text understanding. Not as good: classifying over a very large list of classess, or doing regression to predict a numerical value, or unsupervised learning like clustering. ChatGPT's training has nothing to do with these tasks.

ChatGPT is a poet, not a quant. It's a [wordcel, not a shape rotator](https://www.vice.com/en/article/pkpqzb/ok-wtf-are-wordcels-and-shape-rotators). It understands 'rhetorical logic' but not complex reasoning. Its understanding of the world is skin deep, notwithstanding sophisticated, even beautiful language. It knows what it was told and does not have any ability to answer questions from first principles and data. Some demos of it performing complex tasks may be cherry-picked or overhyped and there may be less there than meets the eye.

And of course, it hallucinates. When it doesn't know, it makes up something that sounds plausible. It is a BS artist. It is trained to make labelers happy with plausible answers, to speak for effect and not underlying truth, which is the [definition of BS](https://druce.ai/2023/09/bullshit).

So:

- Use generative AI when you need [infinite indefatigable interns](https://www.wired.com/story/artificial-intelligence-labor/) (even if they are stoner interns). Use it especially for language tasks, for generating a first draft of anything creative, ideating, editing and proofreading.

- Danger lurks if you ask it to follow a process, or algorithm, or chain of logic that requires more than a couple of steps. If it's a task that would benefit from writing a program, use the [code interpreter](https://www.zdnet.com/article/how-to-use-chatgpt-to-write-code/) or [advanced data analysis](https://www.zdnet.com/article/how-to-use-chatgpt-to-make-charts-and-tables-with-advanced-data-analysis/) functionality.

- Improve ChatGPT's reasoning and reduce hallucinations by using [advanced prompting patterns](https://druce.ai/2024/01/prompting) like reflection (prompt ChatGPT to explain or criticize its own thought process and improve it) and chain-of-thought (give it a thought process to follow). Use prompt helpers from the [GPT Store](https://gptstore.ai/gpts?q=prompt) to create and improve prompts. However, better prompts only go so far. Test your prompts systematically. If small variations change results dramatically during validation, beware. It will only get worse on unseen inputs in production.

- Read [Ethan Mollick](https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged). There is a 'jagged frontier' where ChatGPT performs superbly at some tasks but shockingly poorly at seemingly similar tasks that slightly exceed its grasp.  Lose track of where you stand on the 'jagged frontier' at your peril. 

- Use ChatGPT as a super hard-working, quick, but not-very-bright assistant who needs specific and detailed instructions, and sometimes might still go off the rails. Supervise it closely, and give it foolproof tools like the code interpreter for tasks that fall outside its reach. Trust nothing, and verify everything.

This is the most important chart on applying AI in your daily work:

<figure>
  <img
  src="/assets/2024/mollick-curve.png"
  alt="Distribution of output scores on a consulting task, with and without AI.">
  <figcaption>Distribution of output quality across all the tasks. The blue group did not use AI, the green and red groups used AI. The red group got additional training on how to use AI.</figcaption>
</figure>

This figure is from a [randomized control trial of BCG consultants, who were asked to perform a set of consulting-related tasks](https://www.hbs.edu/ris/Publication%20Files/24-013_d9b45b68-9e74-42d6-a1c6-c72fb70c7282.pdf). Most users obtained significant benefits from AI tools despite their limitations. 

But beware of the left tail of this distribution. Some users who got trained probably became overconfident and put too much stock in bad, possibly hallucinatory responses, and scored much worse. Don't get conned by AI and dumped on the left side of this distribution.

I don't know who needed to hear this, but I have come to realize not everyone understands ChatGPT's limitations. Every day, I see news stories where foolish editors and reporters ask ChatGPT to perform tasks beyond its capabilities, like [predict the price of Bitcoin at the end of this month, or year](https://finbold.com/ai-sets-xrp-price-for-june-30-2024/). They are just using a modern-day version of reading tea leaves, or tarot cards, or the I Ching. Please, just stop! You are not only making fools of yourselves, but also teaching other people to be foolish.

Don't fall victim to the [Eliza Effect](https://en.wikipedia.org/wiki/ELIZA_effect), where people mistake simple algorithms for deep understanding. Don't [become a bad example to others](https://www.npr.org/2023/12/30/1222273745/michael-cohen-ai-fake-legal-cases). But also, don't miss out on massive productivity gains from AI. 

The ability of computers to understand and generate human language is a huge advance. It's also highly orthogonal to everything computers did well until now. It makes many tasks that required coding accessible to ordinary mortals. There is work in progress to [better understand how LLMs work](https://openai.com/index/extracting-concepts-from-gpt-4/) and how their limitations arise, and resolving the impedance mismatch between wooly right-brain poet LLMs and hard-boiled left-brain Dr. Spock [data stores](https://paperswithcode.com/method/associative-lstm#:~:text=An%20Associative%20LSTM%20combines%20an,key%20and%20its%20associated%20content) and [coders](https://atlasiko.com/news/ai/google-alphacode-ai-code-generation/). As Sam Altman says, this is the [dumbest AI you will ever have to use](https://www.tomsguide.com/ai/chatgpt/gpt-4-is-the-dumbest-model-any-of-you-will-ever-have-to-use-declares-openai-ceo-sam-altman-as-he-bets-big-on-a-superingtelligence).

If you're an engineer, part of your role is [to make reliable systems using unreliable components.](https://www.ben-evans.com/benedictevans/2024/6/8/building-ai-products)

Move fast, but follow [common-sense rules](https://www.forbes.com/sites/peterhigh/2024/05/07/ethan-mollick-on-the-four-rules-of-co-intelligence-with-ai/?sh=600ff1a63004), and stay safe, my friends!

### Further reading:

[Alice in Wonderland: Simple Tasks Showing Complete Reasoning Breakdown in State-Of-the-Art Large Language Models](https://arxiv.org/pdf/2406.02061v1). See the References section of this paper for work showing LLMs failing to reason, to understand casuality, to understand that 'a is b' implies 'b is a'. Many good results in problem-solving tests turn out to depend on memorizing training data similar (or even identical) to test data.
