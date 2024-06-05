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

Greetings friends, gather round if you want to dodge reputational and career risk using ChatGPT!

Here are simple prompts that you might expect to work but do not:

- How many r's are there in 'cranberry' (often gets 2 instead of 3)

- Make a list of 50 cities that do not contain the letter a, or any diacritical variation thereof (returned Istanbul)

- Ask ChatGPT for all the countries starting with 'v' in their name (sometimes skips e.g. Vietnam)

- Ask ChatGPT to play tic-tac-toe. It got better since 3.5 when it would cheat or go nuts, but doesn't play optimally. It still generates illegal moves in chess and plays like a small child. Remember this if you want to ask it to perform a complex analytical task like picking stocks.

Here are prompts that work well:

- Write a limerick about hedge funds where the first letter of each verse spells 'hedge'. It's incredibly fluent with language understanding and generation, including complex nuances and connotations. There's a reason it's called a 'language model'.

- Ask ChatGPT about a specific fact on a random Wikipedia page from [WikiRoulette](https://wikiroulette.co/). It will probably be correct, because it trained on Wikipedia. It does make stuff up sometimes though. You have to be super careful that it has a well-grounded basis to answer from training or in the prompt.

ChatGPT is a poet, not a quant. It's a [wordcel, not a shape rotator](https://www.vice.com/en/article/pkpqzb/ok-wtf-are-wordcels-and-shape-rotators). It understands 'rhetorical logic' but not complex reasoning. Its understanding of the world is skin deep, beautiful language notwithstanding. Many demos and papers are overhyped and there is often less there than meets the eye. 

And of course it hallucinates. When it doesn't know, it makes up something that sounds plausible. It is a BS artist. 

So:

- Use gen-AI when you need infinite indefatigable interns (even stoner interns). Use it especially for language tasks, generating a first draft of anything creative, ideating, editing and proofreading.

- Danger lurks if you are asking it to follow a process or algorithm or logic that requires more than a couple of steps. If it's something that would benefit from a program, use the [code interpreter](https://www.zdnet.com/article/how-to-use-chatgpt-to-write-code/) or [advanced data analysis](https://www.zdnet.com/article/how-to-use-chatgpt-to-make-charts-and-tables-with-advanced-data-analysis/) functionality.

- Use [advanced prompting patterns](https://druce.ai/2024/01/prompting) like reflection and chain-of-thought to improve reasoning and reduce hallucination. Use prompt helpers from the [GPT Store](https://gptstore.ai/gpts?q=prompt) to create and improve prompts. But they only go so far. Test prompts systematically. If small variations in prompts or data change results dramatically during validation, beware. It will only get worse on unseen inputs in production.

- Read [Ethan Mollick](https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged). There is a 'jagged frontier' where ChatGPT performs superbly at some tasks but shockingly poorly at seemingly similar tasks that barely exceed its grasp.  Lose track of where you stand on the 'jagged frontier' at your peril. 

- Use ChatGPT as a super hard-working but dumb assistant who needs very specific and detailed instructions, and sometimes might still go off the rails. Supervise it closely, and give it foolproof tools like code interpreter for tasks that outside its reach. 

This is the most important chart on applying AI in your daily work:

<figure>
  <img
  src="/assets/2024/mollick-curve.png"
  alt="Distribution of output scores on a consulting task, with and without AI.">
  <figcaption>Distribution of output quality across all the tasks. The blue group did not use AI, the green and red groups used AI. The red group got additional training on how to use AI.</figcaption>
</figure>

Most people get better results with AI, but beware of the left tail of this distribution. Some people who got trained probably put too much stock in bad answers and scored much worse. Don't get conned by AI and dumped on the left side of this distribution.

I don't know who needed to hear this. But I have come to realize not everyone understands these limitations. Every day I see news stories where foolish people ask ChatGPT to do stuff beyond its ken, like [predict the price of Bitcoin at the end of this year](https://finbold.com/ai-sets-xrp-price-for-june-30-2024/). You are just using a postmodern version of reading tea leaves, or tarot cards, or the I Ching. Please, just stop! You are not only making fools of yourselves, you are teaching other people to be foolish.

Don't fall victim to the [Eliza Effect](https://en.wikipedia.org/wiki/ELIZA_effect). Don't [make serving as a bad example to others](https://www.npr.org/2023/12/30/1222273745/michael-cohen-ai-fake-legal-cases) the purpose of your existence. But also, don't miss out on massive productivity gains from AI. 

Move fast, but follow [common-sense rules](https://www.forbes.com/sites/peterhigh/2024/05/07/ethan-mollick-on-the-four-rules-of-co-intelligence-with-ai/?sh=600ff1a63004), and stay safe my friends!

