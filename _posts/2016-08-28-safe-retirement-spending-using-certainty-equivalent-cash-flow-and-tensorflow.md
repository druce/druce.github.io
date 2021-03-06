---
id: 4991
title: Safe Retirement Spending Using Certainty Equivalent Values and TensorFlow
date: 2016-08-28T14:51:35+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=4991
permalink: /2016/08/safe-retirement-spending-using-certainty-equivalent-cash-flow-and-tensorflow/
post-views:
  - "49007"
dsq_thread_id:
  - "5391020593"
medium_post:
  - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:68:"https://cdn-images-1.medium.com/fit/c/200/200/0*tLekueVp7unnAXxY.jpg";s:10:"author_url";s:25:"https://medium.com/@druce";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:2:"no";s:2:"id";s:12:"1e334eca8aa2";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:6:"public";s:3:"url";s:115:"https://medium.com/@druce/safe-retirement-spending-using-certainty-equivalent-cash-flow-and-tensorflow-1e334eca8aa2";}'
categories: investing
tags: investing

---
> *[Certainty equivalent](http://www.investopedia.com/terms/c/certaintyequivalent.asp) value is the concept of applying a discount to a stream of cash flows based on how variable or risky the stream is…like the inverse function of the risk premium.*
<!--more-->

_TensorFlow_ is a [machine learning framework that Google released](https://www.tensorflow.org/) last November 2015. TensorFlow is a powerful tool to find optimal solutions to machine learning problems, like neural networks in Google’s search platform.<sup><small><a href="#1">1</a></small></sup>

Building on these concepts previously presented in my article for AAII on [Safe Withdrawal Rates and Certainty-Equivalent Spending](http://www.aaii.com/journal/article/safe-withdrawal-rates-and-certainty-equivalent-spending), in this post we’ll construct optimized asset allocations and withdrawal plan for retirement using TensorFlow. 

It’s an interesting problem; _maybe_ it’s an interesting and/or original solution, and if nothing else it’s a starter code example for how one can use TensorFlow to solve an optimization problem like this.

This is not investment advice! This is a historical study/mad science experiment. It may not be applicable to you, it is a work in progress, and it may contain errors.

_1) The solution._

To cut to the chase, here is an estimate of the asset allocation and spending plan for a 30-year retirement, that would have maximized certainty-equivalent cash flow for a somewhat risk-averse retiree over the last 59 years:

<div id="attachment_5215" style="width: 508px" class="wp-caption aligncenter">
  <a href="/assets/wp-content/uploads/2016/08/download-4.png"><img class="wp-image-5215 size-full" src="/assets/wp-content/uploads/2016/08/download-4.png" alt="Spending paths, 30-year retirements, 1928-1986, γ = 8" width="498" height="383" /></a>
  
  <p class="wp-caption-text">
    Spending paths, 30-year retirements, 1928-1986, γ = 8
  </p>
</div>

The black line is the mean outcome. We also show the best case, worst case, the -1 and +1 standard deviation outcomes that should bracket ~68% of outcomes, and the spending path for each individual 30-year retirement cohort 1928-1986.<table border=0 cellpadding=0 cellspacing=0 style='font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 11px; border-spacing: 5px; border-collapse: separate;'> <col span=2> <col> <col span=2> <col span=3> 

<tr style="font-weight: bold">
  <td >
    Year
  </td><td align=right>const_spend</td> <td align=right>var_spend</td> <td align=right>stocks</td> <td align=right>bonds</td> <td align=right>spend_mean</td> <td align=right>spend_min</td> <td align=right>spend_max</td>
</tr>

</table> 

In this example, you allocate your portfolio between two assets, stocks and 10-year Treasurys. (We picked these 2, but could generalize to any set of assets.)

  * Column 1: A fixed inflation-adjusted amount you withdraw by year. In this example we start with a portfolio of $100, so each year you withdraw $1.803, or 1.803% of the _starting_ portfolio. This amount stays the same in inflation-adjusted terms for all 30 years of retirement. (All dollar numbers in the model are constant dollars after inflation. In a real-world scenario, you would initially withdraw 1.803% of your starting portfolio and increase nominal withdrawal by the change in CPI to keep purchasing power constant.)
  * Column 2: A variable % of your portfolio you withdraw by year, which increases over time. So in year 25 you would spend $1.803 in constant dollars _plus_ 10.92% of the current value of the portfolio. 
  * Column 3: The percentage of your portfolio you allocate to stocks by year, which declines over time.
  * Column 4: The amount allocated to Treasurys, which increases over time (1 _ stocks).
  * Column 5: The mean amount you would have been able to spend by year if you had followed this plan, you retired in years 1928-1985 and you enjoyed a 30-year retirement.
  * Column 6: The worst case spending across all cohorts by year.
  * Column 7: The best case spending by year.

This is a numerical estimate of a plan that would have maximized certainty equivalent cash flow over all 30-year retirement cohorts for a moderately risk-averse retiree, under a model with a few constraints and assumptions.

To view how optimal plan estimates change under various values of &gamma;, [go here](/2016/08/safe-retirement-spending-using-certainty-equivalent-cash-flow-and-tensorflow/#viz). 

_2. How does it work? What is certainty-equivalent cash flow (the value we are maximizing)?_

Certainty-equivalent cash flow takes a variable or uncertain cash flow and applies a discount based on how risk-averse you are, and how volatile or uncertain the cash flow is.

Suppose you have a choice between a certain $12.50, and flipping a coin for either $10 or $15. Which do you choose?

People are risk averse (in most situations). So most people choose a certain cash over a risky coin-flip with the same expected value<sup><small><a href="#1">2</a></small></sup>.

Now suppose the choice is between a certain $12, and flipping the coin. Now which do you choose?

This time, on average, you have a bit more money in the long run by choosing the coin-flip. You might take the coin-flip, which is a slightly better deal, or not, depending on how risk-averse you are.

  * If you’re risk-averse, you may prefer the coin-flip (worth $12.50) at $12 or below. (You get paid on average $0.50 to flip for it.)
  * If you’re even more risk-averse, and you really like certain payoffs, the certain payoff might have to decrease further to $11 before you prefer the coin-flip worth $12.50. (You need to get paid $1.50 to flip for it.)
  * If you’re risk neutral, anything below $12.50 and you’ll take the $12.50 expected-value coin-flip. (You don’t care at $12.50, and flip every time for $0.01.)

We’ll refer to that number, at which you’re indifferent between a certain cash flow on the one hand, and a variable or uncertain cash flow on the other, as the _‘certainty equivalent’_ value of the risky stream.

We will use constant relative risk aversion (CRRA). CRRA means that if you choose $12 on a coin-flip for $10/$15, you will also choose $12,000 on a coin-flip for $10,000/$15,000. It says your risk aversion is scale invariant. You just care about the relative values of the choices.

How do we calculate certainty-equivalent cash flow? For a series of cash flows, we calculate the average CRRA utility of the cash flows as:

<img src="/assets/wp-content/ql-cache/quicklatex.com-0f83ffca03918fadad9b6eb4a9eb516d_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#85;&#61;&#92;&#102;&#114;&#97;&#99;&#123;&#49;&#125;&#123;&#110;&#125;&#92;&#115;&#117;&#109;&#95;&#123;&#105;&#125;&#92;&#102;&#114;&#97;&#99;&#123;&#67;&#95;&#105;&#94;&#123;&#49;&#45;&#92;&#103;&#97;&#109;&#109;&#97;&#125;&#45;&#49;&#125;&#123;&#49;&#45;&#92;&#103;&#97;&#109;&#109;&#97;&#125;" title="Rendered by QuickLaTeX.com" height="32" width="133" style="vertical-align: -9px;" /> 

Using the formula above, we

  * Convert each cash flow to ‘utility’, based on the retiree’s risk aversion γ (gamma)
  * Sum up the utility of all the cash flows
  * And divide by _n_ to get the average utility per year.

Then we can convert the utility back to certainty equivalent cash flow using the inverse of the above formula:

<img src="/assets/wp-content/ql-cache/quicklatex.com-c25c403ab128ed475f81a0254614bb9b_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#67;&#69;&#32;&#61;&#32;&#091;&#85;&#40;&#49;&#45;&#92;&#103;&#97;&#109;&#109;&#97;&#41;&#32;&#43;&#32;&#49;&#093;&#32;&#94;&#32;&#123;&#92;&#102;&#114;&#97;&#99;&#123;&#49;&#125;&#123;&#49;&#45;&#92;&#103;&#97;&#109;&#109;&#97;&#125;&#125;&#32;" title="Rendered by QuickLaTeX.com" height="26" width="186" style="vertical-align: -5px;" /> 

This formula tells us that a variable stream of cash flows _C<sub><small>i</small></sub>_ over _n_ years is worth the same to us as a steady and certain value of _CE_ each year for _n_ years.

No need to sweat the formula too much. Here’s a plot of what CRRA utility looks like for different levels of γ. 

<div id="attachment_5282" style="width: 402px" class="wp-caption aligncenter">
  <a href="/assets/wp-content/uploads/2016/08/Capture-1.png"><img src="/assets/wp-content/uploads/2016/08/Capture-1.png" alt="CRRA utility vs. cash flow for selected values of γ" width="392" height="267" class="size-full wp-image-5282" srcset="/assets/wp-content/uploads/2016/08/Capture-1.png 392w, /assets/wp-content/uploads/2016/08/Capture-1-300x204.png 300w" sizes="(max-width: 392px) 100vw, 392px" /></a>
  
  <p class="wp-caption-text">
    CRRA utility vs. cash flow for selected values of γ
  </p>
</div>

You can look at 1 as a reference cash flow with a utility of 0. As you get more cash flow above 1, your utility goes up less and less. As you get less cash flow below 1, your utility goes down more and more. As γ goes up, this convexity effect increases. (But recall that levels don’t change choices with CRRA and same can be said for any point on the curve. Trust us, or try it in Excel!)

The key points are:

  * We use a CRRA utility function to convert risky or variable cash flows to a _utility_, based on γ the risk aversion parameter.
  * After summing utilities, we convert utility back to cash flows using the inverse function.
  * This gives the certainty equivalent value of the cash flows, which discounts the cash flows based on their distribution.
  * γ = 0 means you’re risk neutral. There is no discount, however variable or uncertain the cash flows. The CE value equals the sum of the cash flows.
  * γ = 8 means you’re fairly risk averse. There is a large discount.
  * The higher the variability of the cash flows, the greater the discount. And the higher the γ parameter, the greater the discount.
  * The discount is the same, if you multiply all the cash flows by 2, or 1000, or 0.01, or _x_. Your risk aversion is the same at all levels of income. That property accounts for the somewhat complex formula, but it describes a risk aversion that behaves in a relatively simple way.

If we think that, to a reasonable approximation, humans are risk averse, they make consistent choices about risky outcomes, and their risk aversion is scale invariant over the range of outcomes we are studying, CE cash flow using a CRRA utility function seems like a reasonable thing to try to maximize.

In our example, we maximize certainty-equivalent cash flow for a retiree over 30 years of retirement, over the historical distribution of outcomes for the 59 30-year retirement cohorts 1928-1986. The retiree’s risk aversion parameter is 8. This is risk-averse (but not extremely so).

Maximizing CE spending means the retiree plans to spend down the entire portfolio after 30 years. Presumably the retiree knows how long he or she will need retirement income. Perhaps the retiree is 75 and 30 seems like a reasonable maximum to plan for, perhaps the retiree has an alternative to hedge longevity risk, like an insurance plan or [tontine](https://www.washingtonpost.com/news/wonk/wp/2015/09/28/this-sleazy-and-totally-illegal-savings-scheme-may-be-the-future-of-retirement/).

_3. How does this work in TensorFlow?_

TensorFlow is like a spreadsheet. You start with a set of constants and variables. You create a calculation that uses operations to build on the constants and variables, just like a spreadsheet. The calculation operations you define are represented by a computation graph which tracks which operations depend on which. You can tell TensorFlow to calculate any value you defined, and it will only recompute the minimum necessary operations to supply the answer. And you can program TensorFlow to optimize a function, i.e. find the variables that result in the best value for an operation.

We want to set the values for these 3 variables, in order to maximize CE cash flow:

1: _Constant spending_ (a single value): A constant inflation-adjusted amount you withdraw each year in retirement. This is like the 4% in [Bengen’s 4% rule](http://www.retailinvestor.org/pdf/Bengen1.pdf). The inflation-adjusted value of this annual withdrawal never changes.

2: _Variable spending_ (30 values, one for each year of retirement, i.e. a list or vector): A variable percentage of your portfolio value you withdraw each year. In contrast to the Bengen 4% rule, we’re, saying, if the portfolio appreciates, you can safely withdraw an additional amount based on the current value of the portfolio. Your total spending is the sum of 1) constant spending and 2) variable spending.

3: _Stock allocation_ (30 values, one for each year): We are going to study a portfolio with 2 assets: S&P 500 stocks and 10-year Treasurys.<sup><small><a href="#3">3</a></small></sup>

Our key constants are:

  * γ = 8. (a constant because we are not optimizing its value, unlike the variables above).
  * A portfolio starting value: 100.
  * Inflation-adjusted stock returns 1928-2015 (all numbers we use are inflation-adjusted, and we maximize inflation-adjusted cash flow).
  * Inflation-adjusted bond returns 1928-2015.

Operations:

  * Calculate 59 30-vectors, each one representing the cash flow of one 30-year retirement cohort 1928-1986, using the given constant spending, variable spending, and stock allocation.
  * Calculate the certainty equivalent cash flow of each cohort using γ.
  * Calculate the certainty equivalent cash flow over all cohorts using γ.
  * Tell TensorFlow to find the variables that result in the highest CE spending over all cohorts.

We initialize the variables to some reasonable first approximation.

TensorFlow calculates the gradient of the objective over all variables, and gradually adjusts each variable to find the best value.

See [TensorFlow / python code on GitHub](https://github.com/druce/safewithdrawal_tensorflow/blob/master/Safe%20Retirement%20Spending%20Using%20Certainty%20Equivalent%20Cash%20Flow%20and%20TensorFlow.ipynb).

<a name="viz"></a>Below, you can click to set the value of &gamma; and see how the solution and outcome evolves.  
  


<div style="text-align: center">
  <div>
    <button id="btn0" class="dvbtn" onclick="update_viz(0);"> &gamma; = 0 </button>&nbsp;&nbsp;<button id="btn1" class="dvbtn" onclick="update_viz(1);"> &gamma; = 1 </button>&nbsp;&nbsp;<button id="btn2" class="dvbtn" onclick="update_viz(2);"> &gamma; = 2 </button>&nbsp;&nbsp;<button id="btn4" class="dvbtn" onclick="update_viz(4);"> &gamma; = 4 </button>&nbsp;&nbsp;<button id="btn6" class="dvbtn" onclick="update_viz(6);"> &gamma; = 6 </button>&nbsp;&nbsp;<button id="btn8" class="dvbtn_active" onclick="update_viz(8);"> &gamma; = 8 </button>
  </div>
</div>

<div id="graphDiv">
</div>



<div style="text-align: center">
  <div>
    <button id="btn10" class="dvbtn" onclick="update_viz(0);"> &gamma; = 0 </button>&nbsp;&nbsp;<button id="btn11" class="dvbtn" onclick="update_viz(1);"> &gamma; = 1 </button>&nbsp;&nbsp;<button id="btn12" class="dvbtn" onclick="update_viz(2);"> &gamma; = 2 </button>&nbsp;&nbsp;<button id="btn14" class="dvbtn" onclick="update_viz(4);"> &gamma; = 4 </button>&nbsp;&nbsp;<button id="btn16" class="dvbtn" onclick="update_viz(6);"> &gamma; = 6 </button>&nbsp;&nbsp;<button id="btn18" class="dvbtn_active" onclick="update_viz(8);"> &gamma; = 8 </button>
  </div>
</div>

<div id="graphDiv_2">
</div>



<div style="text-align: center">
  <div>
    <button id="btn20" class="dvbtn" onclick="update_viz(0);"> &gamma; = 0 </button>&nbsp;&nbsp;<button id="btn21" class="dvbtn" onclick="update_viz(1);"> &gamma; = 1 </button>&nbsp;&nbsp;<button id="btn22" class="dvbtn" onclick="update_viz(2);"> &gamma; = 2 </button>&nbsp;&nbsp;<button id="btn24" class="dvbtn" onclick="update_viz(4);"> &gamma; = 4 </button>&nbsp;&nbsp;<button id="btn26" class="dvbtn" onclick="update_viz(6);"> &gamma; = 6 </button>&nbsp;&nbsp;<button id="btn28" class="dvbtn_active" onclick="update_viz(8);"> &gamma; = 8 </button>
  </div>
</div>

<table class="dvtable" id="dvtable" border="1" >
  <tr style="text-align: right">
    <th>
    </th>
    
    <th>
      const_spend
    </th>
    
    <th>
      var_spend
    </th>
    
    <th>
      stocks
    </th>
    
    <th>
      bonds
    </th>
    
    <th>
      spend_mean
    </th>
    
    <th>
      spend_min
    </th>
    
    <th>
      spend_max
    </th>
  </tr>
  
  <tr>
    <th>
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      2.203127
    </td>
    
    <td>
      81.789336
    </td>
    
    <td>
      18.210664
    </td>
    
    <td>
      4.604840
    </td>
    
    <td>
      3.724279
    </td>
    
    <td>
      5.431478
    </td>
  </tr>
  
  <tr>
    <th>
      1
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      2.287617
    </td>
    
    <td>
      81.584539
    </td>
    
    <td>
      18.415461
    </td>
    
    <td>
      4.731527
    </td>
    
    <td>
      3.418391
    </td>
    
    <td>
      6.254532
    </td>
  </tr>
  
  <tr>
    <th>
      2
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      2.349896
    </td>
    
    <td>
      81.042750
    </td>
    
    <td>
      18.957250
    </td>
    
    <td>
      4.826188
    </td>
    
    <td>
      3.513405
    </td>
    
    <td>
      6.347958
    </td>
  </tr>
  
  <tr>
    <th>
      3
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      2.400992
    </td>
    
    <td>
      80.498949
    </td>
    
    <td>
      19.501051
    </td>
    
    <td>
      4.932219
    </td>
    
    <td>
      3.517121
    </td>
    
    <td>
      7.302567
    </td>
  </tr>
  
  <tr>
    <th>
      4
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      2.457950
    </td>
    
    <td>
      79.886688
    </td>
    
    <td>
      20.113312
    </td>
    
    <td>
      5.049210
    </td>
    
    <td>
      3.505759
    </td>
    
    <td>
      7.408146
    </td>
  </tr>
  
  <tr>
    <th>
      5
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      2.529678
    </td>
    
    <td>
      79.489911
    </td>
    
    <td>
      20.510089
    </td>
    
    <td>
      5.197089
    </td>
    
    <td>
      3.386326
    </td>
    
    <td>
      7.941039
    </td>
  </tr>
  
  <tr>
    <th>
      6
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      2.606445
    </td>
    
    <td>
      79.154073
    </td>
    
    <td>
      20.845927
    </td>
    
    <td>
      5.351562
    </td>
    
    <td>
      3.420979
    </td>
    
    <td>
      8.891322
    </td>
  </tr>
  
  <tr>
    <th>
      7
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      2.713869
    </td>
    
    <td>
      78.390047
    </td>
    
    <td>
      21.609953
    </td>
    
    <td>
      5.557626
    </td>
    
    <td>
      3.522455
    </td>
    
    <td>
      9.081053
    </td>
  </tr>
  
  <tr>
    <th>
      8
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      2.836364
    </td>
    
    <td>
      77.651215
    </td>
    
    <td>
      22.348785
    </td>
    
    <td>
      5.743047
    </td>
    
    <td>
      3.348000
    </td>
    
    <td>
      9.203257
    </td>
  </tr>
  
  <tr>
    <th>
      9
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      2.981631
    </td>
    
    <td>
      77.651215
    </td>
    
    <td>
      22.348785
    </td>
    
    <td>
      5.980422
    </td>
    
    <td>
      3.458124
    </td>
    
    <td>
      10.540080
    </td>
  </tr>
  
  <tr>
    <th>
      10
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      3.137015
    </td>
    
    <td>
      77.086559
    </td>
    
    <td>
      22.913441
    </td>
    
    <td>
      6.282104
    </td>
    
    <td>
      3.425701
    </td>
    
    <td>
      11.225243
    </td>
  </tr>
  
  <tr>
    <th>
      11
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      3.303466
    </td>
    
    <td>
      76.476785
    </td>
    
    <td>
      23.523215
    </td>
    
    <td>
      6.610572
    </td>
    
    <td>
      3.473727
    </td>
    
    <td>
      11.643038
    </td>
  </tr>
  
  <tr>
    <th>
      12
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      3.478377
    </td>
    
    <td>
      76.048041
    </td>
    
    <td>
      23.951959
    </td>
    
    <td>
      6.969665
    </td>
    
    <td>
      3.317807
    </td>
    
    <td>
      13.439483
    </td>
  </tr>
  
  <tr>
    <th>
      13
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      3.625880
    </td>
    
    <td>
      75.627575
    </td>
    
    <td>
      24.372425
    </td>
    
    <td>
      7.310505
    </td>
    
    <td>
      3.343283
    </td>
    
    <td>
      15.059415
    </td>
  </tr>
  
  <tr>
    <th>
      14
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      3.770352
    </td>
    
    <td>
      75.205921
    </td>
    
    <td>
      24.794079
    </td>
    
    <td>
      7.616833
    </td>
    
    <td>
      3.459124
    </td>
    
    <td>
      16.401976
    </td>
  </tr>
  
  <tr>
    <th>
      15
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      3.936515
    </td>
    
    <td>
      74.476987
    </td>
    
    <td>
      25.523013
    </td>
    
    <td>
      7.908735
    </td>
    
    <td>
      3.274292
    </td>
    
    <td>
      17.074267
    </td>
  </tr>
  
  <tr>
    <th>
      16
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      4.134133
    </td>
    
    <td>
      73.971955
    </td>
    
    <td>
      26.028045
    </td>
    
    <td>
      8.230050
    </td>
    
    <td>
      3.366878
    </td>
    
    <td>
      20.061546
    </td>
  </tr>
  
  <tr>
    <th>
      17
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      4.377164
    </td>
    
    <td>
      73.565393
    </td>
    
    <td>
      26.434607
    </td>
    
    <td>
      8.588685
    </td>
    
    <td>
      3.435252
    </td>
    
    <td>
      22.118598
    </td>
  </tr>
  
  <tr>
    <th>
      18
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      4.646451
    </td>
    
    <td>
      72.994245
    </td>
    
    <td>
      27.005755
    </td>
    
    <td>
      8.918598
    </td>
    
    <td>
      3.395044
    </td>
    
    <td>
      21.213925
    </td>
  </tr>
  
  <tr>
    <th>
      19
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      4.954221
    </td>
    
    <td>
      72.523218
    </td>
    
    <td>
      27.476782
    </td>
    
    <td>
      9.251004
    </td>
    
    <td>
      3.521019
    </td>
    
    <td>
      21.152092
    </td>
  </tr>
  
  <tr>
    <th>
      20
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      5.292311
    </td>
    
    <td>
      71.995758
    </td>
    
    <td>
      28.004242
    </td>
    
    <td>
      9.595167
    </td>
    
    <td>
      3.708905
    </td>
    
    <td>
      21.061695
    </td>
  </tr>
  
  <tr>
    <th>
      21
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      5.753135
    </td>
    
    <td>
      71.535585
    </td>
    
    <td>
      28.464415
    </td>
    
    <td>
      10.053624
    </td>
    
    <td>
      3.599248
    </td>
    
    <td>
      20.643662
    </td>
  </tr>
  
  <tr>
    <th>
      22
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      6.370145
    </td>
    
    <td>
      71.022398
    </td>
    
    <td>
      28.977602
    </td>
    
    <td>
      10.585032
    </td>
    
    <td>
      3.637109
    </td>
    
    <td>
      22.381867
    </td>
  </tr>
  
  <tr>
    <th>
      23
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      7.174056
    </td>
    
    <td>
      70.527878
    </td>
    
    <td>
      29.472122
    </td>
    
    <td>
      11.207199
    </td>
    
    <td>
      3.846862
    </td>
    
    <td>
      23.833581
    </td>
  </tr>
  
  <tr>
    <th>
      24
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      8.313613
    </td>
    
    <td>
      69.984383
    </td>
    
    <td>
      30.015617
    </td>
    
    <td>
      11.968715
    </td>
    
    <td>
      3.682980
    </td>
    
    <td>
      27.458563
    </td>
  </tr>
  
  <tr>
    <th>
      25
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      9.946128
    </td>
    
    <td>
      69.518839
    </td>
    
    <td>
      30.481161
    </td>
    
    <td>
      12.956893
    </td>
    
    <td>
      3.900901
    </td>
    
    <td>
      29.879319
    </td>
  </tr>
  
  <tr>
    <th>
      26
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      12.422349
    </td>
    
    <td>
      68.999420
    </td>
    
    <td>
      31.000580
    </td>
    
    <td>
      14.327986
    </td>
    
    <td>
      3.908337
    </td>
    
    <td>
      30.120498
    </td>
  </tr>
  
  <tr>
    <th>
      27
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      16.581733
    </td>
    
    <td>
      68.496478
    </td>
    
    <td>
      31.503522
    </td>
    
    <td>
      16.463549
    </td>
    
    <td>
      3.948743
    </td>
    
    <td>
      35.387707
    </td>
  </tr>
  
  <tr>
    <th>
      28
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      24.927346
    </td>
    
    <td>
      68.006998
    </td>
    
    <td>
      31.993002
    </td>
    
    <td>
      20.297396
    </td>
    
    <td>
      3.750516
    </td>
    
    <td>
      46.393183
    </td>
  </tr>
  
  <tr>
    <th>
      29
    </th>
    
    <td>
      2.25168
    </td>
    
    <td>
      100.000000
    </td>
    
    <td>
      67.503853
    </td>
    
    <td>
      32.496147
    </td>
    
    <td>
      54.071078
    </td>
    
    <td>
      2.945589
    </td>
    
    <td>
      135.483633
    </td>
  </tr>
</table>

&nbsp; 

_4. Comments and caveats._

The results above are just an approximation to an optimal solution, after running the optimizer for a few hours. However, I believe that it’s close enough to be of interest and I believe that in this day and age of practically unlimited computing resources, we can likely calculate this number to an arbitrary level of precision in a tractable amount of time. (Unless I overlooked some particularly ill-behaved property of this calculation.)

Numerical optimization works by hill climbing. Start at some point; for each variable determine its _gradient_, i.e. how much changing the input variable changes the objective; update each variable in the direction that improves the objective; repeat until you can’t improve the objective.

It’s a little like climbing Mount Rainier, by just looking at the very local terrain and always moving uphill. It’s worth noting that if you start too far from your objective, you might climb Mt. Adams.

Similarly, in the case of optimizing CE cash flow, we might have just found a local optimum, not a global optimum. If the shape of the solution surface isn’t convex, if the slopes are flat in more than one place, we might have found one of those and not the global optimum. So this solution is not an exact solution, but finding a very good approximation of the best solution seems tractable with sufficiently smart optimization (momentum, smarter adaptive learning rate, starting from a known pretty good spot via theory or brute force).

We see that in good years, spending rises rapidly in the last few years. The algorithm naturally tries to keep some margin of error to not run out of money, and then also naturally tries to maximize spending by spending everything in the last couple of years.

As &gamma; increases, constant spending increases, stocks decrease, and bonds increase.

It’s worth noting that we added some soft constraints: keep allocations between 0 and 100%, i.e. you can’t go short. Keep spending parameters above zero, you can’t save more now and spend more later. Also, we constrained the stock allocation to decline over time. The reason is that a worst case of running out of money has a huge impact on CE cash flow. The worst year to retire is 1966, and the most impactful year is 1974, when stocks were down > 40%. So an unconstrained solution reduces stocks in year 9 and then brings them back up. While we laud the optimizer for sidestepping this particular worst case scenario, this is probably not a generalizable way to solve the problem. We expect stock allocation to decline over time, so we added that as a constraint, and avoid whipping the stock allocation up and down.

How the optimization handles this historical artifact highlights the contrast between a historical simulation and Monte Carlo. Using a historical simulation raises the possibility that something that worked with past paths of returns may not work in all cases in the future, even if future return relationships are broadly similar. Monte Carlos let us generate an arbitrary amount of data from a model distribution, eliminating artifacts of a particular sample.

However, a Monte Carlo simulation assumes a set of statistical relationships that don’t change over time. In fact, it seems likely that the relationships over the last 59 cohorts did change over time.

  * Policy regimes, i.e. the fiscal and monetary response to growth and inflation changes under constraints like the gold standard, schools of thought that dominate policy. 
  * Expectations regimes, whether investors expect growth and inflation, based on how they may have conditioned by their experience and education. 
  * Environment regimes, changes in the world as there are wars, depressions, economies become more open. 

Pre-war, dividend yields had to be higher than bond yields because stocks were perceived as risky. Then it flipped. Growth was seen as predictable, companies re-invested earnings, taxes made them less inclined to distribute. Today, once again, dividends are often higher than bond yields.

For 3 decades post-war inflation surprised to the upside, for the last 3 decades it surprised to the downside.

The beauty of a historical simulation is it answers a simple question: what parameters would have worked best in the past? Monte Carlo simulations can give you a more detailed picture, if you can only believe their opinionated assumptions about a well-behaved underlying distribution.

One has to be a bit cautious with both historical simulations, which depend on the idiosyncrasies of the past, and Monte Carlos, which assume known, stable covariances. It would be wise to look at both historical simulation and Monte Carlos, do a few Monte Carlos with the range of reasonable covariance matrix estimates, use the worst case, and run historical simulations over all cohorts, and include a margin of error (especially in the current ZIRP environment which might repeat a 1966 cohort of the damned).

Another assumption in our simulation is that a certain dollar in year 30, when you may be 90, is worth the same as a dollar in year 1.

A dollar may be worth spending on different things at 60 vs. at 90, and, in later years the retiree is more likely to be dead. With respect to the mortality issue, in the same way we are computing certainty equivalent cash flow over a distribution of market outcomes, we can also compute it over a distribution of longevity outcomes. This feature is in the code, but I will leave discussion for a future blog post. The current post is more than complex enough.

Of course, this simulation doesn’t include taxes, expenses.

Finally, there are reasons to choose a less volatile portfolio that doesn’t maximize CE cash flow, if the volatility is stomach-churning in and of itself, or if it leads the retiree to re-allocate at inopportune times or otherwise change plans in a suboptimal way.

_5. Conclusion._

Optimizing CE cash flow over historical data might be flawed, it might be simplistic, or it might be useful. It’s just an itch that I’ve wanted to scratch for a while. It may seem complicated, but that’s because the problem is interesting. The one takeaway should be that if you can decide what your utility/cost function is, you can find a way to maximize it using today’s computing tools and resources.

Ultimately, you have to optimize for something. If you don’t know where you want to go, you’re not going to get there. Since we have tools to optimize complex functions, perhaps the discussion should be over what to optimize for. A CRRA framework is a good possibility to start with, although I there are others as well.

_This is not investment advice! This is a historical study/mad science experiment. It may not be applicable to you, it is a work in progress, and it may contain errors._

_Notes_

On 9/25 I updated this post. After running for many additional hours from additional starting points, found a &gamma=8; plan that improved the original by about 1%. The change is small. But it’s important to note that the optimization doesn’t converge on a single solution quickly, and the solution varies a bit depending on the starting point. It appears more work is needed to make this analysis an aide to practical decision-making. Also added the [visualization](/2016/08/safe-retirement-spending-using-certainty-equivalent-cash-flow-and-tensorflow/#viz) allowing you to click to see how spending plans change as &gamma; changes. 

<sup><small><a name="1"></a>1</small></sup> TensorFlow lets you definite a calculation sort of like a spreadsheet does, and then run it on on your Nvidia GPU (Graphical Processing Unit). Modern GPUs have more transistors than CPUs, and are optimized to do many parallel floating point calculations. The way you numerically optimize a function is by calculating a gradient vs. each input, and gradually changing the inputs until you find the ones that produce the best output. 100 inputs = 100 gradients that you calculate each step, and GPUs can calculate all 100 simultaneously, and accelerate these calculations quite dramatically. That being said, this optimization seems to run 4-5x faster on CPU than GPU. ¯\_(ツ)_/¯ Without knowing a lot of TensorFlow internals, a single operation that needs to be done on CPU might mean the overhead of moving data back and forth kills the GPU advantage. Or maybe the Amazon g2 GPU instances have some driver issues with TensorFlow. Them’s the breaks in numerical computing.

<sup><small><a name="2"></a>2</small></sup> This may beg the question of lotteries, why people gamble, whether _homo economicus_ is a realistic assumption. We’re assuming rational people here. In general in financial markets, the more risky an investment is, the higher expected return it needs to offer to find a buyer. So the assumption people prefer less risky and variable retirement cash flows seems well established. It would also be possible in theory to do the same optimization for any utility function, although some would be more troublesome than others. If we have a cost function that measures the result of a spending plan, we measure how it performs and compare spending plans. If we don’t have such a cost function, we can try different ways of constructing plans and compute the results, but we don’t have a systematic way to compare them.

<sup><small><a name="3"></a>3</small></sup> Bengen used intermediate corporates as a bond proxy. They have a higher return than Treasurys. I would use the same data, but it would involve a trip to the library or possibly a Bloomberg. I used this [easily available data](http://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html). At some point I can run an update so it is comparable to Bengen’s result.
