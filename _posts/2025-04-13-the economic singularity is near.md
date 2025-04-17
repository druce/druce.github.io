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

<!--more-->
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

(work in progress)

## The Cobb-Douglas Production Function

Economists use the Cobb-Douglas production function as a simple paradigm for how capital and labor interact.

<!-- 2D Isoquant Chart -->
<div class="slider-container-2d">
  <label for="alpha-slider-2d">α: </label>
  <input
    type="range"
    id="alpha-slider-2d"
    min="0.01"
    max="0.99"
    step="0.01"
    value="0.50"
  />
  <span id="alpha-value-2d">0.50</span>
</div>

<div id="isoquant-plot-2d"></div>

<script>
  // 2D variables
  const Y_levels2d    = [1,2,3,4,5,6,7];
  const BUDGET2d      = 8;     // K + L = 8
  const N2d           = 500;
  const XMAX2d        = 10;
  const Lgrid2d       = Array.from({length: N2d}, (_, i) => XMAX2d * (i+1)/N2d);

  function makeTraces2d(alpha2d) {
    const beta2d = 1 - alpha2d;

    // 1) Isoquants for Y=1…7
    const isoTraces2d = Y_levels2d.map(Y => ({
      x: Lgrid2d,
      y: Lgrid2d.map(l => Math.pow(Y / Math.pow(l, beta2d), 1/alpha2d)),
      mode: 'lines',
      name: `Y = ${Y}`
    }));

    // 2) Compute max Y* under K+L = BUDGET2d:
    const Yopt2d = BUDGET2d * Math.pow(alpha2d, alpha2d) * Math.pow(beta2d, beta2d);

    // 3) Isoquant at Y*
    const optTrace2d = {
      x: Lgrid2d,
      y: Lgrid2d.map(l => Math.pow(Yopt2d / Math.pow(l, beta2d), 1/alpha2d)),
      mode: 'lines',
      name: `Optimal Y* = ${Yopt2d.toFixed(2)}`,
      line: { width: 3 }
    };

    // 4) Budget line K+L = BUDGET2d
    const budgetTrace2d = {
      x: [0, BUDGET2d],
      y: [BUDGET2d, 0],
      mode: 'lines',
      name: `Budget (K+L = ${BUDGET2d})`,
      line: { dash: 'dash', width: 2, color: 'lightgrey' },
      hoverinfo: 'none'
    };

    return [...isoTraces2d, optTrace2d, budgetTrace2d];
  }

  const layout2d = {
    width: 600,
    height: 600,
    xaxis: { title: 'Labor (L)', range: [0, XMAX2d] },
    yaxis: {
      title: 'Capital (K)',
      range: [0, XMAX2d],
      scaleanchor: 'x',
      scaleratio: 1
    },
    margin: { t: 50, l: 50, r: 20, b: 50 }
  };

  const slider2d = document.getElementById('alpha-slider-2d');
  const alphaValueSpan2d = document.getElementById('alpha-value-2d');
  let alpha2d = parseFloat(slider2d.value);

  function updateTitle2d(a) {
    const b    = 1 - a;
    const Yopt = BUDGET2d * Math.pow(a, a) * Math.pow(b, b);
    return `Isoquants (Y=1…7), Optimal Y*=${Yopt.toFixed(2)} at budget K+L=${BUDGET2d} (α=${a.toFixed(2)}, β=${b.toFixed(2)})`;
  }

  // Initial draw
  layout2d.title = updateTitle2d(alpha2d);
  Plotly.newPlot('isoquant-plot-2d', makeTraces2d(alpha2d), layout2d, {responsive: true});

  // On slider move
  slider2d.addEventListener('input', () => {
    alpha2d = parseFloat(slider2d.value);
    alphaValueSpan2d.textContent = alpha2d.toFixed(2);

    const newLayout = { title: updateTitle2d(alpha2d) };
    Plotly.react(
      'isoquant-plot-2d',
      makeTraces2d(alpha2d),
      Object.assign({}, layout2d, newLayout)
    );
  });
</script>

The curves are isoquants showing combinations of capital and labor producing the same output level Y. 

Isoquant slopes diminish as you move along them from left to right. This convexity with respect to the origin reflects the complementarity of capital and labor. Adding more of one input alone becomes increasingly less effective.  Convexity reflects these diminishing returns. 

If we believe in complementarity between capital and labor, and also constant returns to scale so that doubling both capital and labor doubles output (a constant slope up the red line on the z-axis), then these assumptions lead to a production function of the Cobb-Douglas form:

$$Y = A \cdot L^{\alpha} \cdot K^{1-\alpha}$$

The function exhibits constant returns to scale: doubling K and L doubles Y.

If we visualize this 2d topographical map in 3d, the Cobb-Douglas function describes a rolling hill rising up the red line, and falling off toward the edges.

<!-- 3D Cobb–Douglas Surface -->
<div class="slider-container-3d">
  <label for="alpha-slider-3d">α: </label>
  <input
    type="range"
    id="alpha-slider-3d"
    min="0.01"
    max="0.99"
    step="0.01"
    value="0.50"
  />
  <span id="alpha-value-3d">0.50</span>
</div>

<div id="isoquant-plot-3d"></div>

<script>
  // 3D variables
  const N3d     = 50;
  const XMAX3d  = 10;
  const Lgrid3d = Array.from({ length: N3d }, (_, i) => XMAX3d * (i + 1) / N3d);
  const Kgrid3d = Array.from({ length: N3d }, (_, i) => XMAX3d * (i + 1) / N3d);

  function makeSurface3d(alpha3d) {
    const beta3d = 1 - alpha3d;
    const z = Kgrid3d.map(k =>
      Lgrid3d.map(l => Math.pow(l, beta3d) * Math.pow(k, alpha3d))
    );
    return [{
      type: 'surface',
      x: Lgrid3d,
      y: Kgrid3d,
      z: z,
      contours: {
        z: {
          show: true,
          usecolormap: true,
          highlightcolor: "#42f462",
          project: { z: true }
        }
      }
    }];
  }

  const layout3d = {
    title: 'Cobb–Douglas Surface (α=0.50, β=0.50)',
    scene: {
      xaxis: { title: 'Labor (L)', range: [0, XMAX3d] },
      yaxis: { title: 'Capital (K)', range: [0, XMAX3d] },
      zaxis: { title: 'Output Y', rangemode: 'tozero' },
      camera: {
        eye: { x: -1.5, y: -1.5, z: 1.2 }
      }
    },
    margin: { l: 0, r: 0, b: 0, t: 50 }
  };

  const slider3d = document.getElementById('alpha-slider-3d');
  const alphaValueSpan3d = document.getElementById('alpha-value-3d');
  let alpha3d = parseFloat(slider3d.value);

  Plotly.newPlot('isoquant-plot-3d', makeSurface3d(alpha3d), layout3d, { responsive: true });

  slider3d.addEventListener('input', () => {
    alpha3d = parseFloat(slider3d.value);
    alphaValueSpan3d.textContent = alpha3d.toFixed(2);
    const beta3d = 1 - alpha3d;
    const newTitle = `Cobb–Douglas Surface (α=${alpha3d.toFixed(2)}, β=${beta3d.toFixed(2)})`;

    Plotly.react(
      'isoquant-plot-3d',
      makeSurface3d(alpha3d),
      Object.assign({}, layout3d, { title: newTitle })
    );
  });
</script>

Broadly, these assumptions make sense. Macro output is a function of how much capital, labor and tech you have, and diminishing returns to capital and labor individually make sense, and constant returns to scale make sense.

Consider building houses:

- Without power tools (capital), using tons of labor with manual tools is inefficient in the US, where capital is fairly abundant and cheap, with low real interest rates. But capital intensity is lower in developing countries with abundant low-cost labor and also scarcer capital.
  
- A giant automated 3D printing machine or robot to make a house would probably also be inefficient.
  
- An optimal mix of workers equipped with power tools results in the most house for the money.

There are critiques of the Cobb-Douglas function. At the level of an individual firm, there are myriad decisions that go into optimizing output, unit costs of capital depends on capacity utilization, there are learning curves, individuals are not lumps of labor, neither are capital investments like an ASML machine vs. Intel's in-house lithography, which might lead to breakpoints and variability in the isoquants over time. 

The degree of convexity is in an important sense fixed in the Cobb-Douglas function. The elasticity of substitution between capital and labor is always 1. To tune the degree of convexity, we need a more general function like the [CES function](https://en.wikipedia.org/wiki/Constant_elasticity_of_substitution), which I am not going to go into in detail but looks like this:

$$Y = A \cdot \left[ \alpha K^{\rho} + (1 - \alpha) L^{\rho} \right]^{\frac{1}{\rho}}$$

## Some Economic History

We've been through a few industrial revolutions: 

- The first industrial revolution of steam and rail and telegraphs starting in the late 1700s.

- The second industrial revolution of oil, cars, electric power, starting in the late 1800s.

- A third industrial revolution of analog electronics, TV and radio, and then digital electronics, computers, the web, mobile/cloud, starting in the 1950s.

- Now maybe we can consider AI the fourth.

When we transitioned from horses and buggies to automobiles, we no longer needed buggy drivers and stable hands, but we needed (much more productive) truck drivers and auto mechanics. 

When we went to factories on assembly lines with power tools, we needed electricians and workers who could handle power tools.

Every buggy driver could probably get retrained as a truck driver and certainly a lot of them could get trained as mechanics and even engineers.

## The Death of the Cobb-Douglas Production Function

OK maybe it was an approximation to begin with. 

But if you have robots that are perfect substitutes for humans, then the form of the production function is (set $$\rho$$ to 1 in the CES function): 

$$Y=A \cdot (\alpha L + \beta K)$$

Isoquants are flat:

[chart tk]

Think of this as the case if we could build a humanoid robot that anywhere and everywhere could work exactly like a human.

If the isoquants are flat, then in practice you really only have one factor of production. Labor can only demand a wage equal to the cost of renting the robot which is a perfect substitute. 

I would argue that technology that is labor-enhancing sharpens the curves of the isoquants. A power tool increases the productivity of the individual who wields it. Or an AI assistant may increase the productivity of a radiologist analyzing images.

A technology that is labor-replacing flattens the curves of the isoquants. Tap-to-pay completely eliminates the jobs of subway token clerks.

More than most technologies in the past, AI is labor-replacing across a wide range of occupations.

With AI, there are tasks like radiology where a good AI today is better than the average human doctor at reading an image in say 30 seconds. A 90th-percentile radiologist is better than AI if you give them 30 seconds, and maybe the average doctor is better if you give them 2 minutes. 

But AI improves, and next year the 90th percentile becomes the 95th, and the average doctor needs 15 minutes to match the AI or can't beat the AI no matter how long you give them.

Every year AI becomes better than a larger percentage of humans, at a larger  percentage of tasks.

We can imagine a factory where the robots can maintain and repair each other. You still need humans to design factories and robots, update software, etc., for now anyway.

But the level of ability and investment in education that a human needs, in order to be able to do something better than AI, can increase beyond what the vast majority of humans can do, in the vast majority of the daily tasks needed to maintain civilization.

If you make heroic assumptions about the form of the production function, perfect competition in markets, leading to workers being paid their marginal product, then wages will rise as technology improves productivity. This has generally been the case in the past, contra thinkers like Marx. But possibly only with the help of unions and policy choices to help thwart the threat of communism. Math alone doesn't force it to happen. You need to parameterize the equations so that it happens.  I would argue that there is a good chance that AI changes the parameters, if you combine it with globalization, neoliberalism, loss of labor power etc., it upends a lot of the economic assumptions that underlie past progress. Maybe we aren't quite there yet. Maybe everybody will just get better at their jobs, and even less educated people can do software dev and analytical jobs with AI and we can shorten workweeks etc. But what would be the incentive to shorten workweeks in the absence of regulations?

Potentially we can end up with robots building more robots, and an economic singularity where capital grows exponentially and wealth concentrates completely, while humans are immiserated. As a thought experiment, what is the difference between the state owning all the capital and being run by a junta, and a tiny number of individuals owning it? To the extent capitalism works, it requires competitive markets.

That is what the robot singularity looks like in economic terms. That is the economic challenge we will eventually face as a civilization, along with questions of universal income, which citizens reap the benefits of AI, what happens to people outside that circle, in the global South, what happens to economic growth, freedom, fariness human values and human purpose. We are ill-equipped to confront these questions. Even the places people think about them, the press, the universities, are under siege.

There is a risk of the fall of Rome, technofeudalism, barbarism.

These might be along similar lines:

[https://a.co/d/65Ql7CO](https://a.co/d/65Ql7CO)

[https://a.co/d/8EaMGeu](https://a.co/d/8EaMGeu)

[https://www.hbs.edu/ris/Publication%20Files/25-039_05fbec84-1f23-459b-8410-e3cd7ab6c88a.pdf](https://www.hbs.edu/ris/Publication%20Files/25-039_05fbec84-1f23-459b-8410-e3cd7ab6c88a.pdf)
