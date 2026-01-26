---
id: 7152
title: 'An AI Maturity Framework'
date: 2025-11-02T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7152
permalink: /2025/11/ai-maturity
image: /assets/2025/spiderchart.png
categories: AI
tags: AI

---
> _A 12-dimension assessment of your company's AI maturity and readiness, and a roadmap for developing an AI strategy_
>
<figure>
<picture>
  <source srcset="/assets/2025/spiderchart.webp" type="image/webp">
  <img src="/assets/2025/spiderchart.png" alt="Spider chart" fetchpriority="high" style="width: 100%; height: auto;">
</picture>
  <figcaption>A 12-dimension, >200-question AI maturity model.</a></figcaption>
</figure>
<!--more-->

## How to think about AI now

### Gen AI Is Ability Understand Language

- Search and retrieval with deep semantic understanding
- Create first draft of anything
- Especially coding
- And if you can code you can do anything a computer can do. Advanced agentic processes composing sequences of retrieving or sensing, creating, and acting

### Everything is language (or at least everything a business can do/talk about)

A short digression into epistomology:

[Eddington's ichthyologist](https://www.goodreads.com/quotes/9688420-selective-subjectivism-let-us-suppose-that-an-ichthyologist-is-exploring): If you go fishing with a net with 2 inch holes, you catch stuff more than 2 inches big.

Tired:

- Biology is a subset of chemistry, the application of chemistry to living things.
- Chemistry is a subset of physics, the application of physics to materials.
- Physics is the application of mathematics to the natural world.
- Mathematics is abstraction of everything

Math is our deepest abstraction, and also the formal foundation of computation. Checking proofs, which start from axioms and apply rules of logic, is something a Turing machine can do. It can also do search to find new valid proofs. Gödel's incompleteness theorem is analogous to the halting problem of mathematics. The former says you can't write a program that will tell if any program stops without running it; the latter says there are mathematical conjectures that must be either true or false but are unprovable.

Wired:

- Information theory is everything you can represent with symbols and language
- Computer science is talking about computation and Turing machines and other simpler models of computation
- Mathematics is study of the set of Turing machines that represent proofs

Probably we should say the last 3 are all isomorphic. If you can't prove it, you can't know it.

The point is: everything knowable is expressed in language. If you do language, you can write any program and solve any solvable problem (eventually).

As for anything which is not language:

Wovon man nicht sprechen kann, darüber muß man schweigen. - Ludwig Wittgenstein
(Whereof we cannot speak, we must attend in silence)

### Pillars of an AI strategy

- People - if you have a good AI team, they can implement everything below.

- Data - AI works on data. You want all your processes to generate clean data that AI can use for retrieval, creation, automation. Data engineering should provide data quality, timeliness, reliable availability, process observability, security, compliance, governance, discoverability, interoperability, scalability, lifecycle management, change control, cost control.

- Tech foundations: ability to reliably scale AI processes with security, robustness, business continuity, disaster recovery.

- Process: industrialize automation, software dev etc.

A good metaphor is infinite interns, but possibly stoner interns and occasionally disobedient rogue interns.

### Pitfalls to avoid

- IP and data protection

- Reputational / regulatory risk

- All security concerns amplified - a power multiplier for bad actors, and for cyber defenders.

Also think of AI as an insider threat, those infinite stoner interns need to be limited in the what they can do (least privilege) and subject to multiple layers of checking for correctness and guardrails they aren't going rogue

### AI Maturity

AI maturity measures the degree to which organizations have mastered AI-related capabilities to achieve operational excellence. AI maturity is not defined by tech tools alone, but by how effectively the organization can improve outcomes by orchestrating people, technology, data, and process. Organizations that successfully navigate AI transformation gain competitive advantages, operate with greater efficiency, increase velocity and respond faster to market changes, delivering more value creation.

Here are levels of maturity:

- **Level 1 (Crawl):** Initial unstructured exploration and planning.
- **Level 2 (Walk):** Structured learning, training, planning, foundation-laying, and initial POCs and pilots.
- **Level 3 (Run):** Operational deployment at scale, with robust infrastructure, governance, and security, and business value measured against KPIs.
- **Level 4 (Fly):** An AI-native organization where AI is central and pervasive, deploying advanced use cases like autonomous agents, advanced fine-tuned models, with continuous improvement and adoption of emerging capabilities.

Finally, [here is a link to the model itself.](https://druce.ai/assets/2025/ai_maturity.html) Answer questions to assess your own organization's maturity. For each dimension, 50% completion of a level unlocks the next higher level. Of course, it's sork in progress, opinionated. I definitely thew in the kitchen sink, everything doesn't apply to everyone. But it should inventory most things people should be thinking about doing. (You can also download the HTML and delete/edit questions that don't apply)
