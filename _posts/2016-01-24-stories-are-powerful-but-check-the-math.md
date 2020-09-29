---
id: 4431
title: Stories Are Powerful, But Check the Math
date: 2016-01-24T11:39:17+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=4431
permalink: /2016/01/stories-are-powerful-but-check-the-math/
post-views:
  - "5786"
categories:
  - Uncategorized
---
_The first principle [of scientific inquiry] is that you must not fool yourself – and you are the easiest person to fool &#8211; Richard Feynman_

_In God we trust; all others must bring data. &#8211; attributed to W. Edwards Deming (ironically without any primary source backing up the attribution)_

This Amy Cuddy TED talk was electrifying.



Video spoiler: If you adopt a &#8220;power pose&#8221; for 2 minutes, Amy Cuddy says it will not only change your posture, image, and attitude, but even your body chemistry, with more production of testosterone and anti-stress hormones.

It&#8217;s a great story, which is probably why it&#8217;s currently [the second most-viewed TED talk](https://www.ted.com/playlists/171/the_most_popular_talks_of_all).

Unfortunately, the published study [study had only 42 participants](http://datacolada.org/uploads/2015/05/Carney-Cuddy-Yap-2010.pdf). And other studies [haven&#8217;t replicated the results on hormone production](http://www.slate.com/articles/health_and_science/science/2016/01/amy_cuddy_s_power_pose_research_is_the_latest_example_of_scientific_overreach.html). Andrew Gelman even uses the opprobrious term _[p-hacking](http://www.nature.com/news/scientific-method-statistical-errors-1.14700)_: data-mining to find a spectacular result.

The curse of dimensionality: the more things you measure, the more things will significantly deviate from the median.

The math can be counterintuitive.

Take a sample of apples. Grade each apple with a single number, like weight. For a contrived example, let&#8217;s say weight is uniformly distributed between 0 and 1.

What percentage of objects lie between 0.25 and 0.75 (the middle 50%?).

[<img class="aligncenter size-full wp-image-4437" src="/uploads/2016/01/Capture.png" alt="50% number line" width="365" height="60" srcset="/uploads/2016/01/Capture.png 365w, /uploads/2016/01/Capture-300x49.png 300w" sizes="(max-width: 365px) 100vw, 365px" />](/uploads/2016/01/Capture.png)

Obviously, the blue line is 50% of the orange line.

Let&#8217;s grade apples along 2 dimensions, e.g. weight and redness.

What percentage of objects lie in the middle along both dimensions? Assuming weight and redness are uncorrelated, the answer is 50% squared, i.e. 25%.

How big a circle do we have to select to get to 50% of objects? We have to solve

<p class="ql-center-displayed-equation" style="line-height: 17px;">
  <span class="ql-right-eqno"> &nbsp; </span><span class="ql-left-eqno"> &nbsp; </span><img src="/wp-content/ql-cache/quicklatex.com-ca6bb157365d495c44813054d379bf2a_l3.png" height="17" width="75" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#91; &#92;&#80;&#105;&#32;&#114;&#94;&#50;&#32;&#61;&#32;&#48;&#46;&#53; &#92;&#93;" title="Rendered by QuickLaTeX.com" />
</p>

which gives r = 0.3989.

We see that we need a circle with almost 80% diameter to capture 50% of the square.

[<img class="aligncenter size-full wp-image-4439" src="/uploads/2016/01/Capture1.png" alt="Number square" width="378" height="365" srcset="/uploads/2016/01/Capture1.png 378w, /uploads/2016/01/Capture1-300x290.png 300w, /uploads/2016/01/Capture1-40x40.png 40w" sizes="(max-width: 378px) 100vw, 378px" />](/uploads/2016/01/Capture1.png)

Let&#8217;s grade apples along 3 dimensions, e.g. weight, redness, and sweetness.

What range do we have to select to get to 50% of objects? We have to solve

<p class="ql-center-displayed-equation" style="line-height: 36px;">
  <span class="ql-right-eqno"> &nbsp; </span><span class="ql-left-eqno"> &nbsp; </span><img src="/wp-content/ql-cache/quicklatex.com-fe335cb539f421c3562de8a20a7973b2_l3.png" height="36" width="85" class="ql-img-displayed-equation quicklatex-auto-format" alt="&#92;&#91; &#92;&#100;&#102;&#114;&#97;&#99;&#123;&#52;&#125;&#123;&#51;&#125;&#32;&#92;&#80;&#105;&#32;&#114;&#94;&#51;&#32;&#61;&#32;&#48;&#46;&#53; &#92;&#93;" title="Rendered by QuickLaTeX.com" />
</p>

which gives r = 0.492373.

We need a sphere with almost 100% diameter to capture 50% of the cube.

[<img src="/uploads/2016/01/Capture5.png" alt="Sphere in cube" width="382" height="379" class="aligncenter size-full wp-image-4489" srcset="/uploads/2016/01/Capture5.png 382w, /uploads/2016/01/Capture5-150x150.png 150w, /uploads/2016/01/Capture5-300x298.png 300w, /uploads/2016/01/Capture5-40x40.png 40w" sizes="(max-width: 382px) 100vw, 382px" />](/uploads/2016/01/Capture5.png)

The point is, as you add more variables, the central 50% (or any x%) contains more and more extreme values. As you add dimensions, the outlying regions get bigger faster.

We can extend to higher dimensions which we can&#8217;t visualize, and chart the width of the 50% hypercube as we increase the dimension:

[<img class="aligncenter size-full wp-image-4458" src="/uploads/2016/01/Capture4.png" alt="Capture" width="375" height="242" srcset="/uploads/2016/01/Capture4.png 375w, /uploads/2016/01/Capture4-300x194.png 300w" sizes="(max-width: 375px) 100vw, 375px" />](/uploads/2016/01/Capture4.png)

If you have 14 dimensions, the 50% hypercube is 95% of the length of the unit hypercube.

With enough features, anything or anybody is an outlier on some dimension.

Suppose you do an experiment measuring the variation of testosterone after assuming a power pose.

Suppose the power pose in fact has no effect on the level of testosterone (the &#8216;null hypothesis&#8217;).

If you observe a change due to chance variation, 95% of the time it will be statistically insignificant at the _p_ > 0.05 level, and significant (_p_ < 0.05) 5% of the time.

If testosterone and corticosteroids both exhibit no effect, the measured change in both will be statistically insignificant 0.95 * 0.95 = 90% of the time (assuming no correlation between them). As you measure more variables, the chance of one of them being significant goes up rapidly.

If you measure 14 insignificant variables, there&#8217;s a 50% chance one will be significant at the _p_ < 0.05 level.

If you measure 50 insignificant variables, there&#8217;s a 92% chance one will be significant. 92% of that 50-dimensional &#8216;hypercube&#8217; is in its outermost 5% region.

That&#8217;s how you get a prank paper to go viral showing [chocolate helps people lose weight](http://io9.gizmodo.com/i-fooled-millions-into-thinking-chocolate-helps-weight-1707251800).

This sort of thing could be avoided if it was standard practice to hold back some test data, and do an out-of-sample test on any scientific finding. The methodology as practiced, to assume errors are unsystematic, and report _p_-values and significance on that basis, even on small samples tested for multiple relationships, seems weak and unscientific.

Returning to Amy Cuddy, you can interpret this a couple of different ways.

One interpretation: Statistics do not back up her story, that power poses raise hormone levels.

Another interpretation: Statistical methods are weak at finding complex stories, and you have to come up with a story to understand the world, and look for statistical confirmation where you can find it.

Acting with confidence and joy is contagious, to your own psyche and how others view you. That&#8217;s a story. Stories let humans understand and remember very complex phenomena.

For instance, attach a story related to their personal experience, and [people solve tricky logic problems easily](https://www.psychologytoday.com/blog/the-imprinted-brain/201205/making-sense-wason). Show them the same version as an abstract math problem, they fail miserably.

Feynman, quoted above about not fooling yourself, also said you must [develop your intuition](http://realphysics.blogspot.com/2011/06/physical-intuition-not-mathematics.html), thinking through [examples](https://books.google.com/books?id=7papZR4oVssC&pg=PA85&lpg=PA85#v=onepage&q&f=false) and understanding the story of how things work as more than mathematical abstractions. 

_Stories are powerful._ The more interesting things in the universe are complex interactions, like stories: evolution, the Big Bang, the French Revolution.

The curse of dimensionality means that as you absorb more features of the world, the possible states and explanations and oddities rise according to factorials and exponents. Things get curiouser and curiouser. There are complex interactions that can&#8217;t easily be explained. _Stories are how humans make sense of a complex world._

[Stories can mislead](http://www.nytimes.com/2016/01/24/upshot/how-stories-drive-the-stock-market.html?_r=0). A great story can be spurious, T. H. Huxley&#8217;s _&#8220;great tragedy of science &#8211; the slaying of a beautiful hypothesis by an ugly fact.&#8221;_ 

Stories are a powerful shortcut ([Kahneman&#8217;s](http://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555) &#8216;thinking fast.&#8217;). But they are a shortcut that can lead you astray, so you also need to stop from time to time and make sure you know where you are going (Kahneman&#8217;s &#8216;thinking slow&#8217;).

So use your evolution-given power to understand complexity through narrative &#8212; _but check the math_.

Even if poses don&#8217;t elevate hormone levels, Superman and Wonder Woman were depicted that way for a reason. Don&#8217;t slouch through life due to lack of statistical evidence you shouldn&#8217;t!

([Mathematica notebook.](/uploads/2016/01/curse_of_dimensionality.nb))