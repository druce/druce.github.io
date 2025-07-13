---
id: 7143
title: 'I See Dumb People'
date: 2025-07-13T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7143
permalink: /2025/07/dumb_people
categories: infosec
tags: infosec

---
><img src="/assets/2025/dumb_people.png">
>This is a rant about cybersecurity and the information space around AI.

<!--more-->

Probably 10 years ago I was out sailing. A gust picked up my red L.L Bean baseball cap and blew it into the harbor.  I went home, and I was scrolling Facebook, and the first thing I see is an ad for a red L.L. Bean baseball cap.

So what are the odds that Facebook really does listen to all your activities and show you ads according to them?

I've seen Mark Zuckerberg talk over the years and say things like,[ "they trust me. dumb fucks."](https://www.theguardian.com/technology/2018/apr/17/facebook-people-first-ever-mark-zuckerberg-harvard)

All too plausible that he would try stuff like that.

But I also know how machine learning works. And the algorithm knows I sometimes shop at LL Bean, and certainly that I looked at the red baseball cap.

And it knows my location. It's also plausible that machine learning would learn that after a day doing outdoor activities, people sometimes buy baseball caps or outdoor wear, and that it would show me something that I had been interested in.

For sure there are some shenanigans that we don't know about. But the known ways they monitor and manipulate us are as bad as the conspiracy theories. Who needs to spy on you when you let them know where you are, who with, and every online interaction?

Eventually I quit Facebook:
- I had a possibly ADD-related unhealthy relationship with it, would spend too much time there, even though must of the time was not that positive. There was a lot of addictive clickbait-y junk and stupid stuff, and people getting in my business. And politics.
- I felt there was [more upside to leaving in terms of overall mental well-being](https://phys.org/news/2023-12-social-media-happier-efficient.html).
- Overall not trusting the company. Google and Apple know everything about me, I don't need every company to know everything, including ones who have repeatedly showed themselves to be manipulative and untrustworthy.

Now I want to share this tweet.

<img src="/assets/2025/tweet.png">

Okay, not gonna lie, this is stupid.

ChatGPT explicitly provides an opt out to training on your data. Language in contracts for products like ChatGPT Enterprise is also explicit. Here are personal GPT settings:

<img src="/assets/2025/chatgpt_tos.png">

A lot of work goes into making a clean data corpus for pre-training. If you do a multimillion dollar training run, and then realize the data set was contaminated with really bad stuff, there's no way to correct it. You have to start over from scratch, or [blacklist some questions because responses expose you to liability](https://www.techdirt.com/2024/12/03/the-curious-case-of-chatgpts-banned-names-hard-coding-blocks-to-avoid-nuisance-threats/). It's just a [disaster and PR nightmare](https://www.washingtonpost.com/technology/2025/07/11/grok-ai-elon-musk-antisemitism/). 

[LLMs struggle to acquire new knowledge through post-training and fine-tuning.](https://arxiv.org/abs/2405.05904) Reinforcement Learning With Human Feedback, Direct Policy Optimization, Supervised Fine-Tuning are mostly about structuring better responses on the existing knowledge base.

It's beyond unlikely that OpenAI is intentionally, systematically, taking your board conversations and training with them. I think if you have any picture of how the LLM sausage is made, the scenario does not seem remotely plausible.

Nevertheless, I've repeatedly had this conversation with, you know, smart IT people who are supposed to be familiar with the technology and ToS. And sometimes people have got a little bit testy with me for telling me their concerns are over the top. I heard it from X! Trust me, bro.

I'm not saying there might not be reasons to avoid ChatGPT. How should AI engineers and CTOs and CEOs think about the risks of putting private data, proprietary data into LLMs?

There are levels to this game.

Level 0: What, me worry? Let anybody put anything they want into any SaaS products, install any mobile apps, Chrome extensions that can read and change your Web pages. 

This is clearly a very bad idea. [Look at 23andMe](https://www.zdnet.com/article/how-to-delete-your-23andme-data-asap-and-why-you-should/). They had a severe breach, they went broke, they could have been bought by anybody who would then have had all your DNA information, and not been subject to the contracts that were previously signed. 

And frankly this seems like a blind spot in our existing privacy and security landscape. Some rights you shouldn't be able to sign away, or lose in bankruptcy court.

If you are Goldman Sachs, and Google knows everything you search for, Bloomberg has all your chats with your clients, they will know what you are up to. Other providers who know more than you might be comfortable with: NetJets, your ISP, your mobile provider, whoever runs all the networks of video cameras, personal assistants, butlers and system admins, and so on. Goldman basically [started a company](https://symphony.com/) that is Signal with compliance because of discomfort with Bloomberg. And a [huge hedge fund](https://www.twosigma.com/) is basically, what if Google used every bit of online data exhaust for investing. It's the Wild West out there. You have to do better than 'nothing'.

Level 1: understand terms of service and only use trusted SaaS endpoints, and exercise opt-outs, and implement internal policies and controls about what can be pasted into approved AI. 

That seems like the bare minimum. Then, as long as you trust that ChatGPT follows the opt out and the terms of service, and they doen't suffer a breach, you should be okay.

Should you trust OpenAI? They are a startup. Things are a little bit chaotic. Nation-states spy on them. And they have had [breaches where your conversations were shown to other users](https://www.cnbc.com/2023/03/23/openai-ceo-says-a-bug-allowed-some-chatgpt-to-see-others-chat-titles.html) and where [info was stolen](https://www.theregister.com/2024/07/08/infosec_in_brief/).

Also they are currently under a [court order to retain logs indefinitely and let plaintiffs search them](https://arstechnica.com/tech-policy/2025/06/openai-confronts-user-panic-over-court-ordered-retention-of-chatgpt-logs/). Presumably a separate pipeline that doesn't impact e.g. other training and operational pipelines. But again, [breaches happen](https://www.bloomberg.com/news/articles/2025-07-01/columbia-university-applicants-personal-data-stolen-by-hacker).

So you need to exercise your own judgment about which SaaS services you can trust and what the upsides and the downsides are.

Level 2: If you are a Fortune 500 company or a regulated investment company, or you handle medical or other data that's subject to HIPAA and other regs, you need stronger representations about the privacy of the data. You might avoid public API endpoints. You might use a cloud provider like Microsoft's Azure, which is [certified ISO 27001 compliant and SOC-3 and HIPAA compliant and audited](https://learn.microsoft.com/en-us/compliance/regulatory/offering-home). And then you access hosted LLMs via that trusted public cloud.

If you use Microsoft Teams and hosted Microsoft Office 365, then you have chosen to trust Microsoft with your internal communications. There is no reason not to trust them for LLMs.

For most companies, major cloud providers are the best they can reasonably do. But if you are the CIA, or a really secretive investment firm like [Renaissance](https://www.youtube.com/watch?v=hWX8V9KSZM8), you are not even OK with public cloud.

Level 3: on-prem servers and trusted private clouds. You host your own email, and chat, and video-conferencing, and your own LLMs. No Teams, no Zoom, no Gmail. You implement things like biometric access, compartmentalization.

But if you build everything in house, it's expensive. You still have to trust someone: your employees, and the vendors who help you build it. And constantly monitor it and update it. And you have to trust that you're able to do it more securely than Microsoft and AWS and Google, and it's not their first rodeo. If you're not extremely capable, you're just gonna spend a lot more money if you try to beat that and create a lot of hassle and be less secure.

If government-sponsored hackers want to breach you, they still have a good shot, by compromising workers, having their spies work for you, intercepting equipment and tampering with it. With enough effort, they can probably get into anything. If Microsoft [fails to stop them](https://www.axios.com/2024/04/03/microsoft-security-practices-government-review), [again and again](https://www.axios.com/2024/03/08/microsoft-executive-emails-russia-hack), what chance have you got? 

As an IT manager or CTO or CEO, you have to pick a posture based on your own company's sensitivity to a hack and loss of data and based on your resources, and for most companies, keeping everything in a single trusted cloud is the most appropriate solution. 

So choose your own adventure. Pick your poison. How dead are you if you have a breach, and what can you afford to prevent it? Understand your threat models and what will kill you, like ransomware and spearphishers wiring firm or customer funds to a Manila casino. Make sure you are implementing best practices, spending appropriate resources combating appropriate realistic well-grounded threats, and not chasing your tail and making operations more complicated for no reason.

All this to say, there are valid reasons why you might not want to use OpenAI, but them spying on and publishing your board deliberations is not one of them. (unless you somehow leak them onto the web and into the training corpus).

And you should have people who know what they are doing, not making decision on the basis of tweets or panel discussions at your typical industry conference.

So what's my point? Mostly I just wanted to get this off my chest, and the next time it comes up, point to it. 

But also, there's a lot of nonsense out there. There's bad medical information out there, bad AI information, bad cybersecurity information. It's a free country, anybody can be a viral influencer on social media. 

There are a lot of, like, AI haters, like Gary Marcus and Ed Zitron, for whom AI can do no right. Even the so-called experts, what they say does not always do a service to the community.

And of course, there's an insane amount of hype about AI and people who sell it act like it's better than it is, and will be AGI if you just give them [seven trillion dollars, man](https://thenewstack.io/making-sense-of-sam-altmans-7-trillion-ai-chips-gambit/).

AI figured out language. Which is a huge step forward. But it has a long way to go to be anything like AGI. It has to be able to learn on the fly, it has to combine the left brain and right brain, type one and type two thinking. But just with deep understanding of language, we can automate a lot of things, and it will disrupt a lot of professions and industries.

No one is coming to save you. Our leaders don't know what the hell they're doing. There is no other room, where real people in charge with real information real authority work.  It's just us. We are The Room. There's no replacement for serious thinking grounded in reality, and it's in short supply.

So prep for artificial intelligence, and also inconceivable amounts of human stupidity. Be careful out there.

<img src="/assets/2025/careful.png">



