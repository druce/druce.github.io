---
id: 2593
title: Retirement plans that maximize certainty-equivalent spending, part 2
date: 2014-01-19T11:43:36+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=2593
permalink: /2014/01/optimal-certainty-equivalent-retirement-plans-part-2/
post-views:
  - "4703"
dsq_thread_id:
  - "2144771133"
categories:
  - investing
tags:
  - investing
---
> *[Last time](/2014/01/2534/) we solved the problem of the perfect retirement spending plan, assuming a fixed known real return, and a CRRA utility function*.
<!--more-->
This time, we’ll try to look at the problem from the other angle:

  * Let’s assume a **fixed spending schedule** 
      * Then, let’s solve the problem of the perfect **portfolio allocation schedule** between US stocks and bonds (of course, the approach could be generalized to other/more assets) </ul> 
        First, a brief digression to make the case that a CRRA utility function is a good thing to use.
        
        **CRRA utility**
        
        Here is a visualization of what a CRRA utility function looks like for different levels of gamma (use the slider to see how it changes as you adjust risk aversion parameter gamma. 
        
        
        
        Think of 1 as the ideal income or base case, where utility=0. With risk neutrality or gamma=0, gains and losses generate the same change in utility. As risk aversion increases and gamma goes up, small losses generate bigger and bigger drops in utility, while big gains generate smaller and smaller increases in utility. A ‘no-loss’ utility function with gamma=&infin; would be utility=0 for consumption >=1 and a straight line down to -&infin; for consumption<1. One possible objection is, OMG, _CRRA utility is such a strange complicated abstraction!_ No one actually thinks that way. 
        
        But we’re all used to thinking about mean-variance (or some of us, anyway). Clearly there is a tradeoff between the volatility of a portfolio, the distribution of potential outcomes, and the return we are willing to accept. So at some level a lot of our thinking about finance involves something very similar to applying a discount to future income streams based on how risky and volatile they are. That’s what the CRRA utility function does _ apply a discount based on distribution of outcomes or volatility.
        
        Another possible objection is, _‘utility’ is unobservable in the real world_. 
        
        But if the utility function correctly ranks the outcomes consistently with the way a human would, at some level that’s all that matters<small><sup>1</sup></small>. The actual value is arbitrary. And as far as I know, any consistent ordinal ranking can be mapped to a cardinal utility function. And we can ask people which outcomes they prefer, either a priori asking them to rank risky outcomes to estimate their risk aversion, or simply generating CRRA-consistent retirement profiles with varying levels of risk aversion, and asking them to choose one.
        
        _Finally, why CRRA utility?_ The important property of CRRA utility is that it’s scale-invariant. A distribution of cashflows between 10 and 15 gets the same discount as a similar distribution between 100 and 150. So if you use a non-CRRA function, you’re going to get different answers depending on the size of the income streams that get generated. 
        
        So, if we think that, to reasonable approximations, humans are risk averse, they make consistent choices about risky outcomes, and their risk aversion is scale invariant over the range of outcomes we are studying, a CRRA utility function seems like a reasonable thing to use, as an approximation that leads to a problem we can solve. 
        
        **Optimal allocation schedules**
        
        Last time we looked at the problem of finding the _optimal spending schedule_, given a known future return.
        
        How do we find an _optimal portfolio allocation schedule_, given a known e.g. 25-year spending plan?
        
        What we want: the expected CE spending for a given spending schedule and equity allocation schedule.
        
        We write a function that for a given cohort, eg people who retired in 1987:
        
          * Takes as input the equity % in each year (a 1&#215;25 vector _ the bond% is implied as 1-equity%)
          * Uses the known returns for the 25 years 1987-2012, and the known spending schedule, to compute the retirement cash flows
          * Returns the certainty-equivalent cash flow for the 25-year period.
        
        Now that we can calculate the CE spending over 25 years, we can write a second function that
        
          * Takes as input the cash flows for a period
          * Uses our life table with how many people survived in each year, and computes the expected value of the CE spending that 1987 retiree would have expected across all survival scenarios. (Since some people died in each year, it’s the CE cash flow through each year _i_ of retirement, weighted by the percentage of retirees who lived to year _i_)
        
        We can further write a third function that calls the second function on each cohort from 1926-1987, and computes the CE spending that each cohort retiring from 1926-1990 would have expected. That gives a distribution of outcomes which we also discount using the CRRA utility function, giving us what we want: the expected CE spending for someone who retired in a random year 1926-1990.
        
        So the sequence is:
        
        2&#215;25 vector of portfolio allocations and spending %  
        -> cash flows  
        -> CE spending  
        -> expected CE spending for a cohort based on life table  
        -> expected CE spending across all cohorts and across all survival scenarios, e.g, for a random 25-year retiree at any year 1926-1987.
        
        Finally, we can systematically try a universe of allocation schedules and spending schemes and find the one that maximized the expected CE spending for someone who retired in a random year in our history.
        
        The optimal retirement plan is the one that would have maximized expected utility over all historical cohorts and survival timelines.
        
        This does not seem completely computationally intractable in this day and age, so let’s try to compute it.
        
        We add to our code from last time to 
        
          1. 1) find an optimal spending schedule for a fixed return (what we did last time)
          2. 2) find an optimal spending schedule for a 50% equity portfolio that would have maximized CE spending using historical returns 1926-2012)
          3. 3) Use gamma=4, and the fixed spending schedule we found in 2), we find the equity allocation schedule that would have maximized CE spending using historical returns 1926-2012
        
        In other words, to make the problem a little more tractable, first we find an optimum spending schedule for a 50% equity portfolio. Then, using that spending schedule, we find the optimal equity allocation schedule.
        
        We end up with this schedule:  
        <small></p> 
        
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
          
          <tr style="text-align: right;">
            <td>
              65
            </td>
            
            <td>
              61.5%
            </td>
            
            <td>
              5.9%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              66
            </td>
            
            <td>
              61.9%
            </td>
            
            <td>
              6.1%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              67
            </td>
            
            <td>
              70.7%
            </td>
            
            <td>
              6.3%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              68
            </td>
            
            <td>
              72.4%
            </td>
            
            <td>
              6.6%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              69
            </td>
            
            <td>
              73.2%
            </td>
            
            <td>
              6.8%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              70
            </td>
            
            <td>
              73.6%
            </td>
            
            <td>
              7.1%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              71
            </td>
            
            <td>
              83.7%
            </td>
            
            <td>
              7.4%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              72
            </td>
            
            <td>
              84.9%
            </td>
            
            <td>
              7.8%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              73
            </td>
            
            <td>
              75.1%
            </td>
            
            <td>
              8.2%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              74
            </td>
            
            <td>
              76.3%
            </td>
            
            <td>
              8.6%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              75
            </td>
            
            <td>
              80.2%
            </td>
            
            <td>
              9.1%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              76
            </td>
            
            <td>
              85.6%
            </td>
            
            <td>
              9.6%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              77
            </td>
            
            <td>
              89.7%
            </td>
            
            <td>
              10.2%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              78
            </td>
            
            <td>
              99.8%
            </td>
            
            <td>
              10.9%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              79
            </td>
            
            <td>
              96.4%
            </td>
            
            <td>
              11.7%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              80
            </td>
            
            <td>
              100.0%
            </td>
            
            <td>
              12.7%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              81
            </td>
            
            <td>
              100.0%
            </td>
            
            <td>
              13.8%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              82
            </td>
            
            <td>
              100.0%
            </td>
            
            <td>
              15.3%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              83
            </td>
            
            <td>
              100.0%
            </td>
            
            <td>
              17.1%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              84
            </td>
            
            <td>
              100.0%
            </td>
            
            <td>
              19.4%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              85
            </td>
            
            <td>
              100.0%
            </td>
            
            <td>
              22.7%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              86
            </td>
            
            <td>
              100.0%
            </td>
            
            <td>
              27.6%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              87
            </td>
            
            <td>
              100.0%
            </td>
            
            <td>
              35.7%
            </td>
          </tr>
          
          <tr style="text-align: right;">
            <td>
              88
            </td>
            
            <td>
              100.0%
            </td>
            
            <td>
              51.8%
            </td>
          </tr>
          
          <tr style="text-align: right;">
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
        
        <p>
          </small>
        </p>
        
        <p>
          This is somewhat counterintuitive insofar as conventional wisdom would be to reduce equity as your time horizon shrinks.
        </p>
        
        <p>
          Let’s look at what that expected spending profile would have looked like.
        </p>
        
        <p>
          <strong>Actual Spending using computed schedule, 25-year retirement cohorts 1926-1987</strong>
        </p>
        
        <p>
          <a href="/assets/wp-content/uploads/2014/01/Capture6.png"><img src="/assets/wp-content/uploads/2014/01/Capture6.png" alt="Actual Spending using computed schedule w/gamma=4, 25-year retirement cohorts 1926-1987" width="506" height="278" class="aligncenter size-full wp-image-2623" srcset="/assets/wp-content/uploads/2014/01/Capture6.png 506w, /assets/wp-content/uploads/2014/01/Capture6-300x164.png 300w" sizes="(max-width: 506px) 100vw, 506px" /></a>
        </p>
        
        <p>
          This schedule does in fact seem to perform pretty well. Pretty high initial spending, pretty smooth outcomes, pretty good median case, not very catastrophic worst case. Assuming I had a way to annuitize my longevity risk after 90 (which only about 20% of 65-year-olds will outlive), I would be pretty OK with this range of outcomes.
        </p>
        
        <p>
          This seems like a sound approach, and the outcome looks like the kind of solution I would be hoping to find.
        </p>
        
        <p>
          In a future post, we’ll see if we can determine both simultaneously _ an optimal spending plan and portfolio allocation for a given level of risk aversion.
        </p>
        
        <p>
          <small><sup>1</sup></small>If, on the other hand, humans care about things like the order in which income streams are experienced, ie you prefer an income of 10 followed by an income of 15 to the other way around, then CRRA utility is not going to capture that. Then maybe we need to move to a Kahneman-Tversky prospect theory utility function. And if people’s risk aversion changes over time, for instance at market peaks at troughs, then that’s also a problem.
        </p>
