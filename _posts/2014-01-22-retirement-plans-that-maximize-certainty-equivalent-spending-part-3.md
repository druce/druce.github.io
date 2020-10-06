---
id: 2653
title: Retirement plans that maximize certainty-equivalent spending (conclusion)
date: 2014-01-22T20:31:27+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=2653
permalink: /2014/01/retirement-plans-that-maximize-certainty-equivalent-spending-part-3/
post-views:
  - "4609"
dsq_thread_id:
  - "2160960124"
categories:
  - investing
tags:
  - investing
---
> *In [part 1](/2014/01/2534/ "Optimal certainty-equivalent spending retirements with DataNitro") and [part 2](/2014/01/optimal-certainty-equivalent-retirement-plans-part-2/ "Retirement plans that maximize certainty-equivalent spending, part 2"), we developed a framework for evaluating and identifying a good plan for retirement spending and asset allocation.*
<!--more-->

  * We discussed how a _CRRA (constant relative risk aversion) utility function_ and the related concept of _certainty-equivalent (CE) spending_ can discount a stream of future cash flows based on their risk and variability, and the retiree’s risk aversion.
  * We solved a toy problem: how the retiree maximizes certainty-equivalent spending if he or she can invest at a guaranteed fixed risk-free real return rate.
  * We generated CE-optimal spending schedules using that fixed risk-free real return rate for retirees with different levels of risk aversion (in this case, no investment risk, just longevity risk, trading off current income for future risk of outliving the portfolio)
  * We moved from a fixed rate assumption to using historical US real returns on stocks and bonds. We generated a spending schedule that maximized CE spending based on historical real returns for a 50% equity portfolio.
  * Using that spending schedule, we solved the other side of the problem, and generated an equity allocation that would have maximized CE spending for that spending schedule.
  * We looked at that solution, and found it seemed pretty good.

So, where we left off, we had independently solved the spending schedule and then the equity allocation schedule. Of course, that does not mean that when you put those two solutions together, they are the best we can do. It just means the equity allocation is the best available given that spending schedule. So today, we’ll try to solve them simultaneously.

The framework in which we try to solve the retirement spending problem is:

_Maximize expected CE spending for a 25-year retirement…  
Which is modeled as a function of a 2&#215;25 matrix  
&bull; 25-years of retirement  
&bull; Spending % each year  
&bull; Equity % each year (the balance to be allocated to bonds)  
_ 

And we find CE spending as:

_Starting with the 2&#215;25 vector of portfolio allocations and spending %  
-> generate cash flows using historical returns for each retirement cohort  
-> compute CE spending using CRRA function and gamma  
-> compute expected CE spending for each cohort based on life table  
-> compute expected CE spending across all cohorts and across all survival scenarios  
_ 

That gives us a value: the CE spending a random retiree at any year 1926-1987, with the given life table, and given risk aversion, could have expected from that 2&#215;25 spending/allocation schedule.

Now, the problem is to maximize that value: find the 2&#215;25 spending/allocation schedule that maximizes the CE spending function.

So we fire up our optimizer, using this function, gamma=4, and the starting solution we previously found solving the two schedules independently. We try a few different optimization methods. Some of them fail, but the Powell method comes up with a pretty good solution after about six hours on our PC. We use that as our starting solution and run the optimization again using several different methods, and with a very slight improvement it holds up as the best we can find.

<table cellspacing="10">
  <tr style="text-align: right;">
    <td>
      <strong>Age</strong>
    </td>
    
    <td>
      <strong>Equity %</strong>
    </td>
    
    <td>
      <strong>Spending %</strong>
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      65
    </td>
    
    <td>
      63.8%
    </td>
    
    <td>
      6.1%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      66
    </td>
    
    <td>
      63.7%
    </td>
    
    <td>
      6.4%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      67
    </td>
    
    <td>
      72.1%
    </td>
    
    <td>
      6.7%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      68
    </td>
    
    <td>
      73.7%
    </td>
    
    <td>
      6.9%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      69
    </td>
    
    <td>
      74.4%
    </td>
    
    <td>
      7.2%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      70
    </td>
    
    <td>
      75.2%
    </td>
    
    <td>
      7.5%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      71
    </td>
    
    <td>
      85.3%
    </td>
    
    <td>
      7.9%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      72
    </td>
    
    <td>
      86.1%
    </td>
    
    <td>
      8.3%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      73
    </td>
    
    <td>
      75.3%
    </td>
    
    <td>
      8.7%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      74
    </td>
    
    <td>
      76.8%
    </td>
    
    <td>
      9.2%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      75
    </td>
    
    <td>
      80.9%
    </td>
    
    <td>
      9.8%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      76
    </td>
    
    <td>
      86.3%
    </td>
    
    <td>
      10.5%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      77
    </td>
    
    <td>
      91.6%
    </td>
    
    <td>
      11.3%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      78
    </td>
    
    <td>
      100.0%
    </td>
    
    <td>
      12.2%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      79
    </td>
    
    <td>
      98.9%
    </td>
    
    <td>
      13.0%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      80
    </td>
    
    <td>
      100.0%
    </td>
    
    <td>
      14.1%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      81
    </td>
    
    <td>
      100.0%
    </td>
    
    <td>
      15.3%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      82
    </td>
    
    <td>
      100.0%
    </td>
    
    <td>
      16.6%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      83
    </td>
    
    <td>
      100.0%
    </td>
    
    <td>
      18.5%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      84
    </td>
    
    <td>
      100.0%
    </td>
    
    <td>
      20.9%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      85
    </td>
    
    <td>
      100.0%
    </td>
    
    <td>
      24.1%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      86
    </td>
    
    <td>
      100.0%
    </td>
    
    <td>
      28.8%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      87
    </td>
    
    <td>
      100.0%
    </td>
    
    <td>
      36.8%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      88
    </td>
    
    <td>
      100.0%
    </td>
    
    <td>
      52.8%
    </td>
  </tr>
  
  <tr style="test-align: right;">
    <td>
      89
    </td>
    
    <td>
      50.0%
    </td>
    
    <td>
      100.0%
    </td>
  </tr>
</table>

We see that our initial spending is higher (6.1% vs. 5.9% when we optimized spending and equity independently). We see that in our median case, spending is flatter. We see that the worst-case outcome is a bit worse. Nevertheless it seems credible that the tradeoff is preferable for a moderately risk averse retiree.

**Actual spending using computed schedule, % of initial portfolio, 25-year retirement cohorts 1926-1987**

[<img src="/assets/wp-content/uploads/2014/01/Capture7.png" alt="Actual Spending using computed schedule, 25-year retirement cohorts 1926-1987 " width="511" height="281" class="aligncenter size-full wp-image-2665" srcset="/assets/wp-content/uploads/2014/01/Capture7.png 511w, /assets/wp-content/uploads/2014/01/Capture7-300x164.png 300w" sizes="(max-width: 511px) 100vw, 511px" />](/assets/wp-content/uploads/2014/01/Capture7.png)

It’s quite interesting that the equity % starts at 63.8% and rises throughout retirement. Conventional wisdom, as implemented in many [target date funds](https://institutional.vanguard.com/VGApp/iip/site/institutional/investments/balancedoverview) would be to reduce the equity allocation as you get older, since you have less time to recover any shortfall from a major market decline. So that result bears investigation to see if there is an error, or if it’s inherent in the unconventional aspects of this approach.

Otherwise, this seems like an analytically sound approach that yields a good practical result.

Comments are invited.
