---
id: 7140
title: 'The AI Economic Singularity is Near'
date: 2025-04-12T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7140
permalink: /2025/04/economic_singularity
categories: AI
tags: AI
mathjax: true
---
<figure>
  <picture>
    <source srcset="/assets/2025/robot_barista.webp" type="image/webp">
    <img src="/assets/2025/robot_barista.png" alt="Robot barista declines job application from human" style="width: 100%; height: auto;">
  </picture>
</figure>
> Economics is the painful elaboration of the obvious.
>
> Politicians sometimes say things like “AI is going to make our workers more productive, and they will reap the rewards with higher wages."
>
> It's mostly worked out the way in the past. But the labor share of income has varied. How much labor benefits, and how much capital benefits, depends on how technology complements labor, versus substitutes for it. There is little support in economic theory for the notion that technological progress always raises everyone’s wages and standard of living. It's a pop economics, Panglossian belief based on motivated thinking. 
>
>AI is the most human-like technology ever invented, so it seems likely to be an effective substitute for human labor. It seems likely that we will get growth but also disruption, more income inequality, more concentration of wealth, and more people locked out of decent middle class and working class jobs. The worst case would be an 'economic singularity' of robots making more robots while masses are immiserated. We should think about how to detect the singularity and use policy to head it off.
>
>Let's break it down (painful as it may be).


<!--more-->
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

In my first job out of college, I worked in the economics research department of a big investment bank. I wrote for the economics research reports, was occasionally quoted in the New York Times as 'economist Druce Vertes' if they spelled my name right, which they never did. 

I also applied for economics PhD programs and was told to go back and get As in differential equations and linear algebra, and summarily rejected. All this to say, I've studied this stuff but I'm also kind of a midwit and it's been a while. 

AI might be as disruptive as previous industrial revolutions: steam, electricity, the internal combustion engine. Current AI impacts about 50% of jobs today. When we get really good robots mass-produced at scale in maybe 10 years or so, it will impact close to 100%. 

Surprisingly, compared to previous revolutions, LLMs impact high-skill, high-education creative and analytical jobs like coders, writers, analysts, graphical artists more than low-skill, low-education jobs. And the AI community expects fast progress to continue: incremental improvements, bigger scale, maybe new breakthroughs in rapid training, knowledge representation, bridging the gap between Kahneman Type 1 perception and language and Type 2 algorithmic thinking.

AI can generate more human-like behavior than machines we've had before. It changes the relationship between capital and labor. Let's look at the shape of the basic models economists use to think about how capital and labor interact, and then think about how AI changes those relationships and what it means.

## The Cobb-Douglas Production Function

Economists use the Cobb-Douglas production function as a simple model of how capital and labor interact to produce GDP and national income.

If we assume complementarity between capital and labor, and also constant returns to scale so that doubling both capital and labor doubles output), then we can express the relationship with a production function of the form:

$$Y = A \cdot L^{\alpha} \cdot K^{1-\alpha}$$

which is called the [Cobb-Douglas production function](https://en.wikipedia.org/wiki/Cobb%E2%80%93Douglas_production_function) (with constant returns to scale)


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

<br />
&nbsp;
<br />

$$Y$$ is real output (GDP). These are all flows per unit of time, like GDP per year.

$$L$$ is the quantity of labor services—e.g., total hours worked, ideally human capital‑adjusted so that someone with more training delivers more labor services per hour worked.

$$K$$ is the quantity of capital services that flow from factories, equipment, trucks, aircraft etc. 

$$A$$ scales the output. Higher $$A$$ corresponds to better technology. You increase $$A$$, then the same capital and labor produce more real output.

$$\alpha$$ can be viewed as letting us express the shape of the technological relationship between capital and labor and tune the optimal ratio of capital and labor. Given a K+L budget, there is a maximum Y isoquant that can be achieved whose slope matches the slope of the budget line which is the relative price. The optimal ratio is a function of technology (ie shape of the isoquants) and the relative price of capital and labor.

We express everything in constant prices. We model the technological relationship between real factor quantities and output, not payments. But converting them to constant dollars expresses them in the same units. We must use constant prices to remove the influence of general or relative price‑level changes.

The curves are isoquants showing combinations of capital and labor producing the same output level $$Y$$. 

Isoquant slopes diminish as you move along them from left to right. This downward convexity, or convexity with respect to the origin, reflects the complementarity of capital and labor. Convexity expresses diminishing returns. Adding an additional unit of one input alone becomes increasingly less effective. 

Over time, 

- Firms invest and accumulate capital, moving up the Y-axis to better isoquants. 
- The labor force grows, moving right along the X-axis to better isoquants. 
- And technology improves, moving isoquants up and to the right for the same amount of capital and labor. 

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

<div id="isoquant-plot-3d" style="height:300px;"></div>

<script>
  // 3D variables
  const N3d     = 50;
  const XMAX3d  = 10;
  const Lgrid3d = Array.from({ length: N3d }, (_, i) => XMAX3d * (i + 1) / N3d);
  const Kgrid3d = Array.from({ length: N3d }, (_, i) => XMAX3d * (i + 1) / N3d);

  function makeSurface3d(alpha3d) {
    const beta3d = 1 - alpha3d;
    const z = Kgrid3d.map(k =>
      Lgrid3d.map(l => 2 * Math.pow(l, beta3d) * Math.pow(k, alpha3d))
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
<br />
&nbsp;
<br />

Consider building houses:

- Without power tools (capital), using tons of workers with manual tools is labor-inefficient in the US, where capital is fairly abundant and cheap, with low real interest rates. But capital intensity is lower in developing countries with abundant low-cost labor and also scarcer capital.
  
- Some kind of giant automated [3D printing machine](https://www.youtube.com/watch?v=vL2KoMNzGTo) or [gundam robot](AI-powered robots coming for construction workers' jobs) to make a house might be capital-inefficient.
  
- An optimal mix of capital and labor, like workers equipped with power tools, results in the most house for the money.

- There is a natural area of optimal total factor productivity, as you stray from it, total factor productivity diminishes.

Or consider truck drivers. You can have bigger or smaller trucks within reason, you could have teams of 2 drivers in 12-hour daily shifts, but you have one driver at a time. You couldn't have one driver and a single giant truck driving all the day's shipments between two major cities. There's a natural, reasonable ratio between capital and labor.

There are critiques of the Cobb-Douglas function. At the level of an individual firm, there are myriad decisions that go into optimizing output. The unit cost of capital depends on capacity utilization. There are learning curves. Individuals are not lumps of labor. Neither are capital investments like a $100m ASML lithography machine. We may have breakpoints and variability in the isoquants over time. 

But at the level of the macro economy, these assumptions are reasonable simplifications. Macro output is a function of how much capital, labor and tech you have, and diminishing returns to capital and labor individually make sense, and constant returns to scale make sense.

## The CES Production Function

The degree of convexity is fixed in the Cobb-Douglas function. The elasticity of substitution between capital and labor is always 1. This means that the slopes of the isoquants are equal to the ratios of capital and labor.

To tune the degree of convexity, we can use a more general function like the [Constant Elasticity of Substitution (CES) function](https://en.wikipedia.org/wiki/Constant_elasticity_of_substitution).

$$Y = A \cdot \left[ \alpha K^{\rho} + (1 - \alpha) L^{\rho} \right]^{\frac{1}{\rho}}$$

Now we have $$\alpha$$ to tune the optimal ratio of labor and capital, and also $$\rho$$ to tune the degree of convexity or complementarity between labor and capital.


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


Explaining the function of $$\rho$$:

- When $$\rho$$ = 0, we get the Cobb-Douglas function. 
- When $$\rho$$ is between 0 and 1, the isoquants are less convex (flatter) than Cobb-Douglas.
- When $$\rho$$ < 0, the isoquants are more convex than Cobb-Douglas.
- When $$\rho$$ = 1, the isoquants are linear, and labor and capital are perfect substitutes.
- When $$\rho$$ < 1, we have convexity and diminishing returns as we add one unit of labor or capital.
- When $$\rho \rightarrow -\infty$$, the isoquants are right angles, the ratio of capital and labor is fixed, capital and labor are perfect complements, additional capital or labor has 0 marginal product. (But we run into numerical precision problems when we make the slider range bigger)
- We always have constant returns to scale, doubling labor and capital doubles production.


## The Singularity

If you have capital that is a perfect substitute for labor (like a robot), then the form of the production function is:

$$Y=A \cdot [\alpha L + (1 - \alpha) K]$$

Try it, set $$\rho$$ to 1 in the CES function. Isoquants are straight lines.

<figure>
  <img
  src="/assets/2025/ces-flat-small.png"
  alt="CES production function with linear isocurves, ρ=1">
	<figcaption>CES production function with linear isocurves, ρ=1</figcaption>
</figure>


Think of this as the edge case where we can build a humanoid robot that anywhere and everywhere could work exactly like a human.

If the isoquants are flat, then in practice you really only have one factor of production since labor and capital are perfect substitutes. Labor can only demand a wage equal to the cost of renting the functionally identical robot.

If you have the convex unit-elastic Cobb-Douglas production function, and perfect competition in labor markets, leading to workers being paid their marginal product, then the labor share of national income will equal the capital share. In the idealized classical economics world, firms will keep hiring until the next worker they add does not increase production enough to offset their wages. And the slope of the isoquants defines how much additional labor is worth relative to capital, it determines the wage rate. And unit elasticity of substitution between labor and capital under Cobb-Douglas means that as wages go up and the labor demanded goes down, the wage increase offsets lower employment exactly, so labor income remains the same.

Under Cobb-Douglas, wages will always rise as technology improves productivity and the labor share of national income will stay constant. This has very roughly been the case in the past, *contra* thinkers like Marx. But possibly only with the help of unions and policy choices to help counter the threat of Communism. 

The important thing to note is that the Cobb-Douglas function forces income share equality between labor and capital factor incomes. If you move to the CES function, math alone doesn’t force it to happen, you need to parameterize it with e.g. $$\alpha=0.5, \rho=0$$  to achieve unit elasticity of substitution (or match $$\rho$$ to a different $$\alpha \neq 0.5$$). More convexity and complementarity means a higher labor share, less convexity means a lower labor share, all else being equal.

There is no theoretical reason $$\rho$$ must be equal to 0. And in fact the labor share has been [declining since around 1970](https://fred.stlouisfed.org/graph/?id=LABSHPUSA156NRUG), although it's still above 50%. 

As you move $$\rho$$ toward 1, the labor share decreases.

Technology that is labor-assisting and highly complementary to labor sharpens the curves of the isoquants. A power tool increases the productivity of the individual who wields it. Or an AI assistant may increase the productivity of a radiologist analyzing images. 

A technology that is labor-replacing flattens the curves of the isoquants. Tap-to-pay completely eliminates the jobs of subway token clerks. It perfectly substitutes for them.

More than most technologies in the past, AI is more human-like and probably more labor-replacing across a wider range of occupations.

All that is really required for AI to favor capital over labor is for AI to flatten the isoquants, to increase the elasticity of substitution, to be less complementary to human labor than existing technologies.

But it could collapse the tradeoff between labor and capital.

## A little Economic History

<figure>
  <img
  src="/assets/2025/ai111.png"
  alt="Robots v. horses">
</figure>

We've passed through a few industrial revolutions: 

- The first industrial revolution of steam and rail and telegraphs starting in the late 1700s.

- The second industrial revolution of oil, cars, electric power, starting in the late 1800s.

- A third industrial revolution of analog electronics, TV and radio, and then digital electronics, computers, the web, mobile/cloud, starting in the 1950s.

- Now maybe we can consider AI the fourth.

When we transitioned from horses and buggies to automobiles, we no longer needed buggy drivers and whip makers and stable hands, but we needed (much more productive) truck drivers and auto mechanics. 

When we went to factories on assembly lines with power tools, we needed electricians and workers who could handle them.

Every buggy driver could probably get retrained as a truck driver and certainly a lot of them could get trained as mechanics and even engineers.

That being said, labor adjustment takes a long time, there are winners and losers, and some people's livelihoods don't recover in their lifetimes. And that's assuming the best case that there is an eventual adjustment. Potentially the new jobs might totally different and out of reach for retraining.

I'm here to tell you that the pop economics that technology always eventually leads to universal standard of living progress, always raises productivity and therefore wages in tandem, is bunk. Theory deoesn't say that. History kind of said that, but it's been a lot less true the last 50 years or so in the US, as the capital share has risen.

Consider the horse. The horse was a very versatile source of transportation and power. It ran on hay and water and could navigate bad roads and hostile off-road environments. Steam and then internal combustion engines came along, with railroads and better roads everwhere, and ultimately replaced horses by being better and cheaper. This time around, we might be the horse.

Even in ideal competitive markets, the optimistic view depends on a degree of complementarity between labor and capital that may no longer exist in a world full of AI. And in the imperfect real world, the balance of market and political power between labor and capital has a significant impact. If labor and capital were perfect complements, square isoquants, fixed ratio of labor and capital, then the factor in a stronger bargaining position, scarcer, better organized, more politically powerful, would extract the lion's share of national income.

Most jobs don't require all of humans' creativity and knowledge. And your brain is just a slow, biased pattern-matcher trained on questionable data. Just like AI, but worse. In many but not all respects currently, but in 20 years, who knows?


## A robot boot, stamping on a human face, forever?

There are tasks where a good AI today is better than the average human under some time budget. [Take radiology](https://www.medpagetoday.com/radiology/diagnosticradiology/110112). Maybe a 90th-percentile radiologist is better than AI if you give them 30 seconds, and maybe the average doctor is better if you give them 2 minutes. (Made-up numbers, although there is literature on this).

But AI improves. Next year, the 90th percentile becomes the 95th, and the average doctor needs 15 minutes to match the AI or can't beat the AI no matter how long you give them.

Every year AI becomes better than a larger percentage of humans, at a larger  percentage of tasks. AI scientists have learned the [bitter lesson](https://www.cs.utexas.edu/~eunsol/courses/data/bitter_lesson.pdf), which is that general methods and lots of data and compute are all it takes to beat humans at most tasks. GPU go brrr. Clever algorithms designed to mimic how humans solve problems generally just make things worse. Humans currently have an edge in adaptability, in fast learning without as much data and compute, in critical thinking. But we may not be special snowflakes who will always be a step or two ahead of the machines. In 20 years, who knows.

Now, radiology is a high-stakes, high skill use case. Typically in these use cases in 2025:

$$AI < human < human + AI $$

If a radiologist takes 10 minutes to review a case, they might continue to do that with an AI assistant as part of a structured workflow. First the radiologist reviews and highlights areas of concern, then the AI gives a probability of diagnosis on those areas and highlights other areas. AI can even bring up relevant literature and the doctor can ask for detailed comparisons with reference scans. AI writes the first draft of report based on doctor's instructions, and the doctor edits. 

In this way the human input remains similar but the output could be significantly higher quality with the help of AI. (Assuming the market and insurance companies don't demand more automation and less human input.)

Something like medical care is a superior good, people consume more as their income goes up. It might be an income-proportional good, you might even demand the same amount in nominal terms if the price goes down. AI automates the work but there is a lot of demand for better work. 

But in many occupations, we are not going to raise the quality bar. If you can have a long-distance truck convoy of 10 trucks supervised by 1 or 2 humans, or 10 robot hotel housekeepers supervised by one human, you get rid of the extra humans. 

We can imagine a factory where the robots can maintain and repair each other. You still need humans to design factories and robots, write and debug and improve software. For now, anyway.

The level of skill that a human needs, in order to be able to do something better than AI, can increase beyond what the vast majority of humans can do, for the vast majority of the daily tasks needed to maintain civilization. You are only going to hire the human for a task and at a wage where they are cheaper and less trouble than a robot, which might not leave many jobs or much wages at all. There is always going to be some job, but it might be as an influencer (digital tout), or livestreaming yourself as a freak doing a gross-out act on ['Dum Dummies' from Black Mirror](https://en.wikipedia.org/wiki/Common_People_(Black_Mirror)) and it might not pay much. 

Maybe there is a modest demand response, society gets richer, there is more demand for hotels and goods transport. But you don't automatically 10X demand when you 10X productivity, and it's hard for the housekeepers to retrain into jobs AI can't do. 

It is not at all a given that when technology destroys some jobs, it creates other, higher-paying jobs. You need to parameterize the equations to make that happen. I would argue that there is a good chance that AI changes the parameters dramatically in the other direction. 

Potentially we can end up with robots building more robots, and an economic singularity where capital grows exponentially and wealth concentrates completely, while humans are immiserated. 

If you combine AI with globalization, neoliberalism, loss of organized labor power etc., it upends the economic assumptions that underlie past wage growth. 

Maybe we aren’t quite there yet. Maybe everybody will just get better at their jobs, and even midwits and less educated people can do software development and analytical jobs with AI. And we can shorten workweeks. But what would be the incentive to shorten workweeks in the absence of labor laws requiring it?

As a thought experiment, what is the difference between the state owning all the capital and being run by a politburo or junta, and a tiny number of individuals owning it, and writing all the rules of an economy and culture and marketplace of political ideas fully mediated by technology? To the extent capitalism works for most people, it requires competitive markets and not unlimited concentration of capital owned by a few. And maybe serfdom and extraction for the rest.

That is what the robot singularity looks like in economic terms. That is the economic challenge we will eventually face as a civilization, along with questions of universal income, robot taxes, which citizens reap the benefits of AI, what happens to people and countries outside that circle, what happens to economic growth, freedom, fairness, civil liberties, democratic governance, human values and human purpose. 

We are ill-equipped to confront these questions. Even the places people think about them, the press, the universities, are under siege.

There is a risk of the fall of Rome, technofeudalism, barbarism. Maybe not next year, maybe not in 10 years, but it might be where we are headed. 

At least, not knowing exactly how the tech and the equations evolve, we should probably be mindful of that possibility.

In the final analysis, everything is endogenous. AI changes human sytems a lot, and it seems impossible to say how. It would behoove us to be a little humble, and cautious, and not rely purely on historical parallels where maybe there aren't any. And try to put in some guardrails to avoid the worst possible outcomes.


### Further reading:

[Rise of the Robots: Technology and the Threat of a Jobless Future, by Martin Ford](https://a.co/d/65Ql7CO)

[The Economic Singularity: Artificial intelligence and the death of capitalism, by Calum Chace](https://a.co/d/8EaMGeu)

[Displacement or Complementarity? The Labor Market Impact of Generative AI, by Wilbur Xinyuan Chen, Suraj Srinivasan, Saleh Zakerinia](https://www.hbs.edu/ris/Publication%20Files/25-039_05fbec84-1f23-459b-8410-e3cd7ab6c88a.pdf)

[The Simple Macroeconomics of AI, by David Autor](https://economics.mit.edu/sites/default/files/2024-05/The%20Simple%20Macroeconomics%20of%20AI.pdf)

[Automation and New Tasks: How Technology Displaces and Reinstates Labor, by Daron Acemoglu and Pascual Restrepo](https://economics.mit.edu/sites/default/files/publications/Automation%20and%20New%20Tasks%20-%20How%20Technology%20Displace.pdf)

[Fed Governor Michael Barr: Artificial Intelligence and the Labor Market: A Scenario-Based Approach](https://www.federalreserve.gov/newsevents/speech/barr20250509a.htm?utm_source=substack&utm_medium=email)

