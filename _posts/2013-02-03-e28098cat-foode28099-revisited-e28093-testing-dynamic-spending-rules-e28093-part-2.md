---
id: 1618
title: ‘Cat Food’ revisited – testing dynamic spending rules – Part 2
date: 2013-02-03T16:08:57+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=1618
permalink: '/2013/02/%e2%80%98cat-food%e2%80%99-revisited-%e2%80%93-testing-dynamic-spending-rules-%e2%80%93-part-2/'
post-views:
  - "6775"
dsq_thread_id:
  - "1063373696"
categories:
  - Uncategorized
---
The [last post](/2013/01/cat-food-revisited-testing-dynamic-spending-rules/ "‘Cat Food’ revisited – testing dynamic spending rules – Part 1") discussed a framework for evaluating simple dynamic spending rules. 

  * We defined a spending factor _s_ as spending each year at a rate of _s_/(remaining life expectancy); and _lifetime spending expectancy_ as the total amount you could expect to spend over your lifetime.
  * We showed how, as you increase the spending factor, _lifetime spend expectancy initially increases rapidly_, but the curve _flattens out_ as spending rate increases.
  * We showed how, as you increase the spending factor, _shortfall risk initially increases slowly_, but the curve _steepens_ as spending rate increases.

We found a simple dynamic spending rule could increase lifetime spending vs. a traditional fixed 4% rule, while keeping shortfall risk relatively low (arguably reducing risk by making the worst case more benign, at the cost of increased volatility, lowered starting spending, higher probability of modest shortfalls).

In this post we&#8217;ll look at how smoothing spending can improve outcomes, and how changing the equity/bond mix over time affects outcomes.  
<!--more-->

  
_Second dynamic rule: Smoothing._

One oddity in [Figure 5](/uploads/2013/01/Rplot15.png): even at ultra-low spending rates, you still have a measurable risk of a 25% shortfall from your starting income. At any spending rate, spending is going to vary more or less in line with the market<small><sup>1</sup></small>. So years like 1973 and 1974 might yield big spending drops, even for a 60/40 portfolio at spending rates where you are not at much risk of running out of funds in your lifetime. 

If you&#8217;re already spending at a low rate, based on a safe long run return expectation, it doesn&#8217;t make sense to vary spending exactly in line with a short term change in the markets. And it&#8217;s clearly a significant disadvantage over a 4% rule to have that much variation in spending, even when there&#8217;s no shortfall.

Let&#8217;s introduce smoothing. We&#8217;ll still spend at a rate of _s_/life_expectancy, but instead of multiplying the rate by the latest portfolio value to get spending, we&#8217;ll multiply the rate by [an exponential moving average](http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:moving_averages "Exponential Moving Average (stockcharts.com)")<small><sup>2</sup></small> of the value of previous years&#8217; portfolios.

_Figure 8. Lifetime spending expectancy (% of initial portfolio) v. spending factor (exponential MA, multiplier 1/3)._

[<img src="/uploads/2013/02/Rplot47.png" alt="Lifetime Spend Expectancy v. Spending Factor" title="Lifetime Spend Expectancy v. Spending Factor" width="480" height="320" class="aligncenter size-full wp-image-1835" srcset="/uploads/2013/02/Rplot47.png 480w, /uploads/2013/02/Rplot47-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" />](/uploads/2013/02/Rplot47.png)

_Figure 9. Probability of spending shortfall v. spending factor (exponential MA, multiplier 1/3)_

[<img src="/uploads/2013/02/Rplot48.png" alt="Probability of Spending Shortfall v. Spending factor (smoothed spending)" title="Probability of Spending Shortfall v. Spending factor (smoothed spending)" width="480" height="320" class="aligncenter size-full wp-image-1837" srcset="/uploads/2013/02/Rplot48.png 480w, /uploads/2013/02/Rplot48-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" />](/uploads/2013/02/Rplot48.png)

We see a notable improvement &#8211; near 0 shortfall risk out to _s_ of 0.5. As the next chart shows, at _s_ of 0.5, we have slightly higher lifetime spending, smoother overall spending and a better-looking worst case. But, even though overall shortfall probability is much lower, in the worst case you can go broke, if you keep overall spending smooth in the face of a market shortfall very late in life.

_Figure 10. Average Spending, All Cohorts (s=0.5, smoothed w/multiplier=1/3)_

[<img src="/uploads/2013/02/Rplot51.png" alt="Average Spending, All Cohorts (s=0.5, smoothed)" title="Average Spending, All Cohorts (s=0.5, smoothed)" width="480" height="320" class="aligncenter size-full wp-image-1841" srcset="/uploads/2013/02/Rplot51.png 480w, /uploads/2013/02/Rplot51-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" />](/uploads/2013/02/Rplot51.png)

_Efficient frontier<small><sup>3</sup></small>._ To better visualize the tradeoff, we can combine these 2 graphs into one, which shows the best lifetime spend expectancy we can achieve for any level of shortfall risk:

<center>
  <em>Figure 11. Lifetime spend expectancy v. probability of 10% shortfall<br />(&#8216;Efficient frontier&#8217;)</em>
</center>

[<img src="/uploads/2013/02/Rplot52.png" alt="Lifetime spending expectancy v. Shortfall probability" title="Lifetime spending expectancy v. Shortfall probability" width="480" height="320" class="aligncenter size-full wp-image-1845" srcset="/uploads/2013/02/Rplot52.png 480w, /uploads/2013/02/Rplot52-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" />](/uploads/2013/02/Rplot52.png)

For low shortfall rates (the left side), the smoothed spending results in higher lifetime spending expectancy with lower shortfall risk. Smoothing improves the tradeoff, and represents a flexible middle ground between varying spending in line with the market, and setting a fixed spending amount at retirement like the 4% rule.

_Portfolio composition_

So far, we have looked only at a 60/40 portfolio. Let&#8217;s keep the smoothing multiplier at 1/3 and create efficient frontiers for a range of allocations from 0% to 100% stocks. 

<center>
  <em>Figure 12. Lifetime spend expectancy v. probability of 10% shortfall<br />(&#8216;Efficient frontier&#8217;), by % of equities, smoothing multiplier=1/3</em>
</center>

[<img src="/uploads/2013/02/Rplot55.png" alt="Lifetime Spend Expectancy v. Shortfall Probability" title="Lifetime Spend Expectancy v. Shortfall Probability" width="480" height="320" class="aligncenter size-full wp-image-1848" srcset="/uploads/2013/02/Rplot55.png 480w, /uploads/2013/02/Rplot55-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" />](/uploads/2013/02/Rplot55.png)

We can do this as a big panel (easier to read, esp. the legend): [Figure 13](/uploads/2013/02/Rplot56.png "Efficient frontier, by equity %"). What does this tell us? For this particular smoothing multiplier 1/3, the 50/50 portfolio dominates others (the black line), giving greater lifetime spending at low shortfall probabilities.

Let&#8217;s cut to the chase and find for each spending factor, the highest spending expectancy we can achieve with zero shortfall risk, or if zero risk is not feasible, the lowest feasible risk:

<center>
  <small></p> 
  
  <table cellspacing="10">
    <tr style="text-align: right;">
      <td>
        <em>&nbsp;<br />s</em>
      </td>
      
      <td>
        Life spend&nbsp;<br />expect.
      </td>
      
      <td>
        Prob 10%&nbsp;<br />shortfall
      </td>
      
      <td>
        Prob 25%&nbsp;<br />shortfall
      </td>
      
      <td>
        Prob 50%&nbsp;<br />shortfall
      </td>
      
      <td>
        Equity&nbsp;<br />%
      </td>
      
      <td>
        &nbsp;<br />Smoothing
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        0.30
      </td>
      
      <td>
        104.27
      </td>
      
      <td>
        0.0%
      </td>
      
      <td>
        0.0%
      </td>
      
      <td>
        0.0%
      </td>
      
      <td>
        100%
      </td>
      
      <td>
        5.0
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        0.35
      </td>
      
      <td>
        90.71
      </td>
      
      <td>
        0.0%
      </td>
      
      <td>
        0.0%
      </td>
      
      <td>
        0.0%
      </td>
      
      <td>
        75%
      </td>
      
      <td>
        4.0
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        0.40
      </td>
      
      <td>
        77.62
      </td>
      
      <td>
        0.1%
      </td>
      
      <td>
        0.1%
      </td>
      
      <td>
        0.1%
      </td>
      
      <td>
        50%
      </td>
      
      <td>
        3.5
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        0.45
      </td>
      
      <td>
        89.74
      </td>
      
      <td>
        0.9%
      </td>
      
      <td>
        0.9%
      </td>
      
      <td>
        0.9%
      </td>
      
      <td>
        60%
      </td>
      
      <td>
        4.0
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        0.50
      </td>
      
      <td>
        97.99
      </td>
      
      <td>
        2.6%
      </td>
      
      <td>
        2.6%
      </td>
      
      <td>
        2.4%
      </td>
      
      <td>
        65%
      </td>
      
      <td>
        4.5
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        0.55
      </td>
      
      <td>
        110.23
      </td>
      
      <td>
        5.4%
      </td>
      
      <td>
        3.3%
      </td>
      
      <td>
        2.9%
      </td>
      
      <td>
        75%
      </td>
      
      <td>
        4.0
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        0.60
      </td>
      
      <td>
        122.56
      </td>
      
      <td>
        8.8%
      </td>
      
      <td>
        8.4%
      </td>
      
      <td>
        8.1%
      </td>
      
      <td>
        85%
      </td>
      
      <td>
        6.0
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        0.70
      </td>
      
      <td>
        126.98
      </td>
      
      <td>
        19.3%
      </td>
      
      <td>
        13.5%
      </td>
      
      <td>
        11.9%
      </td>
      
      <td>
        85%
      </td>
      
      <td>
        5.0
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        0.80
      </td>
      
      <td>
        124.34
      </td>
      
      <td>
        28.5%
      </td>
      
      <td>
        23.9%
      </td>
      
      <td>
        22.1%
      </td>
      
      <td>
        80%
      </td>
      
      <td>
        6.0
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        0.90
      </td>
      
      <td>
        134.70
      </td>
      
      <td>
        36.9%
      </td>
      
      <td>
        32.6%
      </td>
      
      <td>
        29.0%
      </td>
      
      <td>
        90%
      </td>
      
      <td>
        6.0
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        1.00
      </td>
      
      <td>
        139.22
      </td>
      
      <td>
        43.3%
      </td>
      
      <td>
        39.6%
      </td>
      
      <td>
        36.0%
      </td>
      
      <td>
        95%
      </td>
      
      <td>
        6.0
      </td>
    </tr>
  </table>
  
  <p>
    </small></center>
  </p>
  
  <p>
    That&#8217;s pretty much all we have time for this week. But before we go, let&#8217;s look at the spending profiles for 4 solutions.
  </p>
  
  <p>
    <center>
      <em>Figure 14. Spending profiles for selected spending factors </em>
    </center>
  </p>
  
  <p>
    Spending factor 0.35; Shortfall risk 0%; Lifetime spend expectancy 90.7; Initial spend 2.0%<br /> <a href="/uploads/2013/02/Rplot57_S35_75_4.png"><img src="/uploads/2013/02/Rplot57_S35_75_4.png" alt="Spend factor .35 Equity 75 Smooth 4" title="Spend factor .35 Equity 75 Smooth 4" width="480" height="320" class="aligncenter size-full wp-image-1879" srcset="/uploads/2013/02/Rplot57_S35_75_4.png 480w, /uploads/2013/02/Rplot57_S35_75_4-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a>
  </p>
  
  <p>
    Spending factor 0.45; Shortfall risk 0.9%; Lifetime spend expectancy 89.7; Initial spend 2.6%<br /> <a href="/uploads/2013/02/Rplot57_S45_60_4.png"><img src="/uploads/2013/02/Rplot57_S45_60_4.png" alt="Spend factor .45 Equity 60 Smooth 4" title="Spend factor .45 Equity 60 Smooth 4" width="480" height="320" class="aligncenter size-full wp-image-1880" srcset="/uploads/2013/02/Rplot57_S45_60_4.png 480w, /uploads/2013/02/Rplot57_S45_60_4-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a>
  </p>
  
  <p>
    Spending factor 0.5; Shortfall risk 2.6%; Lifetime spend expectancy 98.0; Initial spend 2.9%<br /> <a href="/uploads/2013/02/Rplot57_S50_65_45.png"><img src="/uploads/2013/02/Rplot57_S50_65_45.png" alt="Spend factor .50 Equity 65 Smooth 4.5" title="Spend factor .50 Equity 65 Smooth 4.5" width="480" height="320" class="aligncenter size-full wp-image-1881" srcset="/uploads/2013/02/Rplot57_S50_65_45.png 480w, /uploads/2013/02/Rplot57_S50_65_45-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a>
  </p>
  
  <p>
    Spending factor 0.55; Shortfall risk 5.4%; Lifetime spend expectancy 110.2; Initial spend 3.2%<br /> <a href="/uploads/2013/02/Rplot57_S55_75_4.png"><img src="/uploads/2013/02/Rplot57_S55_75_4.png" alt="Spend factor .55 Equity 75 Smooth 4" title="Spend factor .55 Equity 75 Smooth 4" width="480" height="320" class="aligncenter size-full wp-image-1882" srcset="/uploads/2013/02/Rplot57_S55_75_4.png 480w, /uploads/2013/02/Rplot57_S55_75_4-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a>
  </p>
  
  <p>
    To be 100% safe, we need an initial spending rate below 4% &ndash; keeping in mind that the portfolio and spending usually rises over time at safe withdrawal rates. With this restrictive investment universe, the 4% rule is not 100% safe either, and the last chart is <a href="/uploads/2013/01/Rplot50.png" title="4% profile">a less undesirable spending profile than the 4% fixed spending profile</a> from the last post. On average, total spending is significantly higher, and the worst case is more desirable since it falls short later.
  </p>
  
  <p>
    Next time, we&#8217;ll look at varying the equity percentage dynamically as you get older, other dynamic rules that might reduce late in life shortfall risk (and the undesirable hump in these curves), and we&#8217;ll talk about what the best possible optimal rule would look like.
  </p>
  
  <p>
    <small><br /> <sup>1</sup>modulo the increase in spending rate as you age, from our <em>s</em>/life_expectancy rule. The <em>s</em> spending rate stays the same, but the denominator decreases. </p> 
    
    <p>
      <sup>2</sup>The exponential moving average has a good combination of sensitivity to the underlying series, and smoothing. A simple n-period moving average, which weights all n periods equally, has undesirable properties. In particular, it&#8217;s possible for a simple moving average to move up, when the underlying series is moving below the moving average. Consider this series: 100, 110, 120, 109. A 3-period moving average is after the 3rd element is 110, after the fourth is 113, because the trailing element which left the series (100) is lower than the new element (109).
    </p>
    
    <p>
      <sup>3</sup>This is not exactly the same as the CAPM efficient frontier. For one thing, instead of return, we plot lifetime spending in inflation-adjusted dollars. For another, instead of volatility, it&#8217;s the probability of a 25% shortfall from the starting spending. It&#8217;s a similar risk v. return plot, but can&#8217;t be interpreted quite the same way (eg adding risk-free cash to find additional feasible/optimal portfolios).
    </p>
    
    <p>
      </small>
    </p>