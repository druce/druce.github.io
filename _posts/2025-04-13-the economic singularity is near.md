---
id: 7140
title: 'The Economic Singularity is Near'
date: 2025-04-12T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7140
permalink: /2024/11/economic_singularity
categories: AI
tags: AI

---

> I want to discuss the impact of AI on our economy, and why it's different from past revolutions using some intermediate economics.

(work in progress)
## The Cobb-Douglas Production Function

Economists use the Cobb-Douglas production function as a simple paradigm for how capital and labor interact.

<figure>
  <img
  src="/assets/2025/cobbdouglas.png"
  alt="Cobb-Douglas production function isocurves.">
</figure>

The curves are isoquants showing combinations of capital and labor producing the same output level. 

The isoquants are convex to the origin. Isoquant slopes diminish as you move along them to the right. Adding more of one input alone becomes increasingly less effective. This reflects the complementarity of capital and labor and convexity reflects these diminishing returns. 

If we imagine this like a topological map, the Cobb-Douglas function describes a ridge rising along the red line, and falling off toward the edges.

<figure>
  <img
  src="/assets/2025/cobbdouglas3d.png"
  alt="Cobb-Douglas production function isocurves in 3D.">
</figure>

If we assume this complementarity between capital and labor, and also constant returns to scale so that doubling both capital and labor doubles output (a constant slope up the red line on the z-axis), then the production  function can take the form

$$Y = A \cdot L^{\alpha} \cdot K^{\beta}$$

Broadly, these assumptions makes sense. Macro output is a function of how much capital, labor and tech you have, and diminishing returns to capital and labor alone make sense, and constant returns to scale make sense.

Consider building houses:

- Without power tools (capital), using tons of labor is inefficient in the US, where capital is less expensive, but more efficient in developing countries with low-cost labor and limited capital.
  
- A giant automated 3D printing machine to make a house would probably also be inefficient.
  
- An optimal mix of workers equipped with power tools results in the most house for the money.

There are critiques of the Cobb-Douglas function. At the level of an individual firm, there are myriad decisions that go into optimizing output, there are learning curves, individuals are not lumps of labor, neither are capital investments like an ASML machine vs. Intel's in-house lithography. 

Importantly, the degree of convexity is fixed in the Cobb-Douglas function. The elasticity of substitution between capital and labor is always 1. To tune the degree of convexity, we need a more general function like the [CES function](https://en.wikipedia.org/wiki/Constant_elasticity_of_substitution), which I am not going to go into but looks like this:

$$Y = A \cdot \left[ \alpha K^{\rho} + (1 - \alpha) L^{\rho} \right]^{\frac{1}{\rho}}$$

## Some Economic History

We've been through a few industrial revolutions: 

- The first industrial revolution of steam and rail and telegraphs starting in the late 1700s.

- The second industrial revolution of oil, cars, electric power, starting in the late 1800s.

- A third industrial revolution of analog electronics, TV and radio, and then digital electronics, computers, the web, mobile/cloud, starting in the 1950s.

- Now maybe we can consider AI the fourth.

When we transitioned from horses and buggies to automobiles, we no longer needed buggy drivers and stable hands, but we needed (much more productive) truck drivers and auto mechanics. 

When we went to factories on assembly lines with power tools, we needed electricians and workers who could handle power tools.

Every buggy drivers could probably get retrained as a truck driver and certainly a lot of them could get trained as mechanics and even engineers.

## The Death of the Cobb-Douglas Production Function

OK maybe it was an approximation to begin with. 

But if you have robots that are perfect substitutes for humans, then the form of the production function is (set $\rho$ to 1 in the CES function): $$Y=A \cdot (\alpha L + \beta K)$$

isoquants are flat:

[chart tk]

Think of this as the case if we could build a humanoid robot that anywhere and everywhere could act exactly like a human.

If the isoquants are flat, then in practice you really only have one factor of production. Labor can only demand a wage equal to the cost of renting the capital which is a perfect substitute. 

I would argue that technology that is labor-enhancing sharpens the curves of the isoquants. A power tool increases the productivity of the individual who wields it, or an AI assistant may improve the productivity of a radiologist analyzing images.

A technology that is labor-replacing flattens the curves of the isoquants. Tap-to-pay completely eliminates the jobs of subway token clerks.

More than most technologies in the past, AI is labor-replacing across a wide range of occupations.

With AI, there are tasks like radiology where a good AI today is better than the average human doctor at reading an image in say 30 seconds. A 90th-percentile radiologist is better than the AI in 30 seconds, and maybe the average doctor is better if you give them 2 minutes. 

But AI improves, and next year the 90 percentile becomes 95, and the average doctor needs 15 minutes to match the AI or can't beat the AI no matter how long you give them.

Every year AI becomes better than a larger percentage of humans, at a larger  percentage of tasks.

There is some potential to get to a factory where the robots can maintain and repair each other. You still need humans to design factories and robots, update software, etc., for now anyway.

But the amount of ability and investment in education that a human needs, in order to be able to do something better than AI, can increase beyond what the vast majority of humans can do, in the vast majority of the daily tasks needed to maintain civilization.

If you quite significant assumptions about the form of the production function, perfect competition in markets, leading to workers being paid their marginal product, then wages will rise as technology improves productivity. This has generally been the case in the past (contra Marx), although possibly with the help of unions and policy choices to help thwart the threat of communism. Math doesn't force it to happen. You need to parameterize the equations so that it happens.  I would argue that there is a good chance that AI re-parameterizes them, and upends a lot of the economic assumptions that underlie our policies and past progress. Maybe we aren't fully there for a while, and everybody will just get better at their jobs and even less educated people can do software dev and analytical jobs with AI and we can shorten workweeks etc.

But potentially we can end up with robots building robots, and an economic singularity where capital grows exponentially and concentrates completely, while humans are immiserated. 

That is what the robot singularity looks like in economic terms, and that is the economic challenge we will eventually face as a civilization, along with questions of universal income, which citizens get the benefits of AI, economic growth, freedom, fariness human values and human purpose which we are ill equipped to confront.

These might be along similar lines:

[https://a.co/d/65Ql7CO](https://a.co/d/65Ql7CO)

[https://a.co/d/8EaMGeu](https://a.co/d/8EaMGeu)

[https://www.hbs.edu/ris/Publication%20Files/25-039_05fbec84-1f23-459b-8410-e3cd7ab6c88a.pdf](https://www.hbs.edu/ris/Publication%20Files/25-039_05fbec84-1f23-459b-8410-e3cd7ab6c88a.pdf)
