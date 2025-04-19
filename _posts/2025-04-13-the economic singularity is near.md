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
      line: { dash: 'dash', width: 2, color: 'grey' },
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

If we believe in complementarity between capital and labor, and also constant returns to scale so that doubling both capital and labor doubles output (a constant slope up the red line on the z-axis as technology improves), then these assumptions lead to a production function of the Cobb-Douglas form:

$$Y = A \cdot L^{\alpha} \cdot K^{1-\alpha}$$

The curves are isoquants showing combinations of capital and labor producing the same output level Y. 

Isoquant slopes diminish as you move along them from left to right. This convexity with respect to the origin reflects the complementarity of capital and labor. Adding more of one input alone becomes increasingly less effective.  Convexity reflects these diminishing returns. 

The function exhibits constant returns to scale: doubling K and L doubles Y.

Over time, we accumulate capital, factories, equipment, trucks and aircraft, moving up the Y-axis to better isoquants; and the labor force grows, moving right along the X-axis to better isoquants; and technology improves, moving isoquants up and to the right for the same amount of capital and labor. 

If we visualize this 2d topographical map in 3D, the Cobb-Douglas function describes a rolling hill.

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

Consider building houses:

- Without power tools (capital), using tons of labor with manual tools is inefficient in the US, where capital is fairly abundant and cheap, with low real interest rates. But capital intensity is lower in developing countries with abundant low-cost labor and also scarcer capital.
  
- A giant automated 3D printing machine or robot to make a house would probably also be inefficient.
  
- An optimal mix of capital and labor, like workers equipped with power tools, results in the most house for the money.

There are critiques of the Cobb-Douglas function. At the level of an individual firm, there are myriad decisions that go into optimizing output, the unit cost of capital depends on capacity utilization, there are learning curves, individuals are not lumps of labor, neither are capital investments like an ASML machine vs. Intel's in-house lithography, which might lead to breakpoints and variability in the isoquants over time. 

But broadly, these assumptions make sense. Macro output is a function of how much capital, labor and tech you have, and diminishing returns to capital and labor individually make sense, and constant returns to scale make sense.

## The CES Production Function

The degree of convexity is in an important sense fixed in the Cobb-Douglas function. The elasticity of substitution between capital and labor is always 1. This means that the slopes of the isoquants are equal to the ratios of capital and labor.

To tune the degree of convexity, we need a more general function like the [Constant Elasticity of Substitution (CES) function](https://en.wikipedia.org/wiki/Constant_elasticity_of_substitution).

$$Y = A \cdot \left[ \alpha K^{\rho} + (1 - \alpha) L^{\rho} \right]^{\frac{1}{\rho}}$$

<!-- CES Isoquant Plot -->
<div style="margin-bottom:1em;">
  <label for="alpha-slider-ces">α: <span id="alpha-value-ces">0.50</span></label>
  <input
    id="alpha-slider-ces"
    type="range"
    min="0.01"
    max="0.99"
    step="0.01"
    value="0.5"
  >
</div>
<div style="margin-bottom:1em;">
  <label for="rho-slider-ces">ρ: <span id="rho-value-ces">0.00</span></label>
  <input
    id="rho-slider-ces"
    type="range"
    min="-1.00"
    max="1.00"
    step="0.01"
    value="0"
  >
</div>
<div id="isoquant-plot-ces" style="width:600px;height:600px;"></div>

<script>
  // === Parameters & Grids ===
  const CES_Y_LEVELS    = [1,2,3,4,5,6,7];
  const CES_N           = 500;
  const CES_XMAX        = 10;
  const CES_LGRID       = Array.from({length: CES_N}, (_, i) => CES_XMAX * (i+1)/CES_N);
  const CES_PLOT_ID     = 'isoquant-plot-ces';

  // === Build Isoquant Traces for CES, with ρ→0 fallback ===
  function makeCesTraces(alpha, rho) {
    const beta = 1 - alpha;
    return CES_Y_LEVELS.map(Y => {
      return {
        x: CES_LGRID,
        y: CES_LGRID.map(L => {
          if (Math.abs(rho) < 1e-6) {
            // ρ≈0 → Cobb‑Douglas: Y = L^β * K^α  ⇒  K = (Y / L^β)^(1/α)
            return Math.pow(Y / Math.pow(L, beta), 1/alpha);
          } else {
            // CES: Y^ρ = α K^ρ + β L^ρ  ⇒  K = [(Y^ρ - β L^ρ)/α]^(1/ρ)
            const inner = Math.pow(Y, rho) - beta * Math.pow(L, rho);
            return inner <= 0
              ? NaN
              : Math.pow(inner / alpha, 1 / rho);
          }
        }),
        mode: 'lines',
        name: `Y = ${Y}`
      };
    });
  }

  // === Layout ===
  const layoutCes = {
    width: 600,
    height: 600,
    title: `CES Isoquants (Y=1…7) (α=0.50, ρ=0.00)`,
    xaxis: { title: 'Labor (L)', range: [0, CES_XMAX] },
    yaxis: {
      title: 'Capital (K)',
      range: [0, CES_XMAX],
      scaleanchor: 'x',
      scaleratio: 1
    },
    margin: { t: 50, l: 50, r: 20, b: 50 }
  };

  // === Initial Draw ===
  let alphaCes = parseFloat(document.getElementById('alpha-slider-ces').value);
  let rhoCes   = parseFloat(document.getElementById('rho-slider-ces').value);

  Plotly.newPlot(
    CES_PLOT_ID,
    makeCesTraces(alphaCes, rhoCes),
    layoutCes,
    { responsive: true }
  );

  // === Update Function ===
  function updateCesPlot() {
    alphaCes = parseFloat(document.getElementById('alpha-slider-ces').value);
    rhoCes   = parseFloat(document.getElementById('rho-slider-ces').value);

    document.getElementById('alpha-value-ces').textContent = alphaCes.toFixed(2);
    document.getElementById('rho-value-ces').textContent   = rhoCes.toFixed(2);

    const newTitle = `CES Isoquants (Y=1…7) (α=${alphaCes.toFixed(2)}, ρ=${rhoCes.toFixed(2)})`;

    Plotly.react(
      CES_PLOT_ID,
      makeCesTraces(alphaCes, rhoCes),
      Object.assign({}, layoutCes, { title: newTitle })
    );
  }

  // === Wire Up Sliders ===
  document.getElementById('alpha-slider-ces')
          .addEventListener('input', updateCesPlot);
  document.getElementById('rho-slider-ces')
          .addEventListener('input', updateCesPlot);
</script>

Importantly:

- When $$\rho$$ is 0, we get the Cobb-Douglas function. 
- When $$\rho$$ is negative, the curves are more convex than Cobb-Douglas.
- When $$\rho$$ is between 0 and 1, the curves are less convex (flatter) than Cobb-Douglas.
- When $$\rho$$ is 1, the isoquants are linear.

## A little Economic History

Personal history: in my first job out of college, I worked in the economics research department of a bank. I wrote for the economics research reports, was occasionally quoted in the New York Times as 'economist Druce Vertes' if they spelled my name right, which they usually did not. 

I also applied for economics PhD and was told to go back and get As in differential equations and linear algebra and summarily rejected. All this to say, I've studied this stuff but I'm also kind of a midwit. So I think this is directionally right but I might not get it exactly right.

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

But if you have robots that are perfect substitutes for humans, then the form of the production function is:

$$Y=A \cdot (\alpha L + \beta K)$$

Try it, set $$\rho$$ to 1 in the CES function. Isoquants are flat.

Think of this as the edge case where we can build a humanoid robot that anywhere and everywhere could work exactly like a human.

If the isoquants are flat, then in practice you really only have one factor of production since labor and capital are perfect substitutes. Labor can only demand a wage equal to the cost of renting the robot which is a perfect substitute. 

If you have a Cobb-Douglas production function, and perfect competition in labor markets, leading to workers being paid their marginal product, then the labor share of national income will equal the capital share. In the idealized classical economics world, firms will keep hiring until the next worker they add does not increase production enough to offset their wages. And the slope of the isoquants defines how much additional labor is worth relative to capital, it determines the wage rate. And unit elasticity of substitution between labor and capital under Cobb-Douglas means that as wages go up and the labor demanded goes down, the wage increase offsets lower employment exactly, so labor income remains the same.

Under Cobb-Douglas, wages will always rise as technology improves productivity and the labor share of national income will stay constant. This has very roughly been the case in the past, contra thinkers like Marx. But possibly only with the help of unions and policy choices to help counter the threat of Communism. Math alone doesn’t force it to happen. There is no theoretical reason $$\rho$$ must be equal to 0. And in fact the labor share has been [declining pretty steadily since around 1970](https://fred.stlouisfed.org/graph/?id=LABSHPUSA156NRUG), although it's still above 50%. 

I would argue that technology that is labor-assisting sharpens the curves of the isoquants. A power tool increases the productivity of the individual who wields it. It is capital that is highly complementary to labor. Or an AI assistant may increase the productivity of a radiologist analyzing images. 

A technology that is labor-replacing flattens the curves of the isoquants. Tap-to-pay completely eliminates the jobs of subway token clerks. It perfectly substitutes for them.

More than most technologies in the past, AI is labor-replacing across a wide range of occupations.

With AI, there are tasks like radiology where a good AI today is better than the average human doctor at reading an image in say 30 seconds. A 90th-percentile radiologist is better than AI if you give them 30 seconds, and maybe the average doctor is better if you give them 2 minutes. 

But AI improves, and next year the 90th percentile becomes the 95th, and the average doctor needs 15 minutes to match the AI or can't beat the AI no matter how long you give them.

Every year AI becomes better than a larger percentage of humans, at a larger  percentage of tasks.

Now, radiology is a high-stakes, high skill use case. Typically in these use cases in 2025:

$$AI < human < human + AI. $$

If a radiologist takes 5 minutes to review a scan, they might continue to do that with an AI assistant as part of a structured workflow. First the radiologist reviews and highlights areas of concern, then the AI gives a probability of diagnosis on those areas and highlights other areas. AI can even bring up relevant literature and the doctor can ask for detailed comparisons with reference scans. AI writes first draft of report based on doctor's instruction, and doctor edits. 

In this way the human input remains similar but the output should be significantly higher quality with the help of AI. 

Something like medical care is a superior good, you consume more as your income goes up. It might be an income-proportional-good, you might demand the same amount in nominal terms if the price goes down. AI automates the work but there is a lot of demand for better work. 

But in many occupations, we are not going to raise the quality bar. If you can have a long-distance truck convoy of 10 trucks supervised by 1 or 2 humans, or 10 robot hotel housekeepers supervised by one human, you get rid of the extra humans. 

We can imagine a factory where the robots can maintain and repair each other. You still need humans to design factories and robots, update software. For now anyway.

But the level of skill that a human needs, in order to be able to do something better than AI, can increase beyond what the vast majority of humans can do, for the vast majority of the daily tasks needed to maintain civilization. You are only going to hire the human for a task and at a wage where they are cheaper and less trouble than a robot, which might not leave much at all.

Maybe there is a modest demand response, society gets richer, there is more demand for hotels and goods transport. But you don't 10X demand, and it's hard for the housekeepers to retrain into jobs AI can't do. 

It is not at all a given that when technology destroys some jobs, it creates other, higher-paying jobs. You need to parameterize the equations so that it happens. I would argue that there is a good chance that AI changes the parameters, if you combine it with globalization, neoliberalism, loss of labor power etc., it upends a lot of the economic assumptions that underlie past wage growth. Maybe we aren’t quite there yet. Maybe everybody will just get better at their jobs, and even midwits and less educated people can do software dev and analytical jobs with AI and we can shorten workweeks etc. But what would be the incentive to shorten workweeks in the absence of regulations?

Potentially we can end up with robots building more robots, and an economic singularity where capital grows exponentially and wealth concentrates completely, while humans are immiserated. As a thought experiment, what is the difference between the state owning all the capital and being run by a junta, and a tiny number of individuals owning it? To the extent capitalism works for everyone, it requires competitive markets and not serfdom and extraction of the middle class by powerful interests.

That is what the robot singularity looks like in economic terms. That is the economic challenge we will eventually face as a civilization, along with questions of universal income, which citizens reap the benefits of AI, what happens to people outside that circle, in the global South, what happens to economic growth, freedom, fariness human values and human purpose. We are ill-equipped to confront these questions. Even the places people think about them, the press, the universities, are under siege.

There is a risk of the fall of Rome, technofeudalism, barbarism.

These might be along similar lines:

[https://a.co/d/65Ql7CO](https://a.co/d/65Ql7CO)

[https://a.co/d/8EaMGeu](https://a.co/d/8EaMGeu)

[https://www.hbs.edu/ris/Publication%20Files/25-039_05fbec84-1f23-459b-8410-e3cd7ab6c88a.pdf](https://www.hbs.edu/ris/Publication%20Files/25-039_05fbec84-1f23-459b-8410-e3cd7ab6c88a.pdf)

