---
id: 1620
title: ‘Cat Food’ revisited – testing dynamic spending rules – Part 3
date: 2013-02-18T11:51:58+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=1620
permalink: '/2013/02/%e2%80%98cat-food%e2%80%99-revisited-%e2%80%93-testing-dynamic-spending-rules-%e2%80%93-part-3/'
post-views:
  - "6603"
dsq_thread_id:
  - "1090882291"
categories:
  - investing
tags:
  - investing
---
> *In the [last part](/2013/02/%E2%80%98cat-food%E2%80%99-revisited-%E2%80%93-testing-dynamic-spending-rules-%E2%80%93-part-2/) of our look at dynamic rules for spending in retirement, we discussed how changing the allocation between stocks and bonds affects the maximum sustainable spending rate. We can summarize this relationship by plotting the highest feasible initial spending rate for any acceptable shortfall level.<small><sup><a href="#f1">1</a></sup></small>*
<!--more-->

  


<center>
  <em>Figure 15. Initial spending v. worst shortfall<br /> equity=0-100%, s=0.05-1.2, smoothing=1.0-6.0)</em><br /> <a href="/assets/wp-content/uploads/2013/02/Rplot63.png"><img class="aligncenter size-full wp-image-1911" title="Initial Spending v. Worst Shortfall" src="/assets/wp-content/uploads/2013/02/Rplot63.png" alt="Initial Spending v. Worst Shortfall" width="480" height="320" srcset="/assets/wp-content/uploads/2013/02/Rplot63.png 480w, /assets/wp-content/uploads/2013/02/Rplot63-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a><br /> <small></p> 
  
  <table cellspacing="10">
    <tr style="text-align: right;">
      <td style="text-align: right;">
        Max shortfall
      </td>
      
      <td style="text-align: right;">
        Init spend %
      </td>
      
      <td style="text-align: right;">
        <em>s</em>
      </td>
      
      <td style="text-align: right;">
        Equity %
      </td>
      
      <td style="text-align: right;">
        Smoothing
      </td>
      
      <td style="text-align: right;">
        Lifetime Spend Exp.
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        0.0%
      </td>
      
      <td>
        1.7%
      </td>
      
      <td>
        0.30
      </td>
      
      <td>
        20%
      </td>
      
      <td>
        5
      </td>
      
      <td>
        58.0
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        4.3%
      </td>
      
      <td>
        2.0%
      </td>
      
      <td>
        0.35
      </td>
      
      <td>
        40%
      </td>
      
      <td>
        4
      </td>
      
      <td>
        66.3
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        12.1%
      </td>
      
      <td>
        2.3%
      </td>
      
      <td>
        0.40
      </td>
      
      <td>
        50%
      </td>
      
      <td>
        3
      </td>
      
      <td>
        77.4
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        16.9%
      </td>
      
      <td>
        2.6%
      </td>
      
      <td>
        0.45
      </td>
      
      <td>
        60%
      </td>
      
      <td>
        2.5
      </td>
      
      <td>
        89.1
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        <strong>24.7%</strong>
      </td>
      
      <td>
        <strong>2.9%</strong>
      </td>
      
      <td>
        <strong>0.50</strong>
      </td>
      
      <td>
        <strong>75%</strong>
      </td>
      
      <td>
        <strong>2</strong>
      </td>
      
      <td>
        <strong>105.9</strong>
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        32.2%
      </td>
      
      <td>
        3.2%
      </td>
      
      <td>
        0.55
      </td>
      
      <td>
        80%
      </td>
      
      <td>
        1.5
      </td>
      
      <td>
        113.6
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        43.2%
      </td>
      
      <td>
        3.5%
      </td>
      
      <td>
        0.60
      </td>
      
      <td>
        95%
      </td>
      
      <td>
        1.5
      </td>
      
      <td>
        132.5
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        50.4%
      </td>
      
      <td>
        3.8%
      </td>
      
      <td>
        0.65
      </td>
      
      <td>
        95%
      </td>
      
      <td>
        1
      </td>
      
      <td>
        133.8
      </td>
    </tr>
    
    <tr style="text-align: right;">
      <td>
        63.5%
      </td>
      
      <td>
        4.1%
      </td>
      
      <td>
        0.70
      </td>
      
      <td>
        100%
      </td>
      
      <td>
        1
      </td>
      
      <td>
        141.0
      </td>
    </tr>
  </table>
  
  <p>
    </small></center><br /> In part 3 today, we’re going to discuss 1) adding a parameter to change the way we increase the spending rate as we get older and 2) reducing equity allocation as we get older. Finally, we’re going to do a brute-force search for the highest initial spending and best parameters for each level of shortfall risk (<A href="#conclusion">skip</a> to conclusion).
  </p>
  
  <p>
    <em>Adjusting how fast spending rate increases with age</em>
  </p>
  
  <p>
    Suppose we are willing to accept the portfolio in bold and spending rate, which has never resulted in a decline greater than 24.7% below the initial spending amount. We use spending factor <em>s</em>=0.5, equity = 75%, smoothing factor = 2. We end up with a spending profile that looks like this:<br /> 
    
    <center>
      <em>Figure 16. Spending profile: s=0.5, equity=75%, smooth=2</em>
    </center>
    
    <br /> <a href="/assets/wp-content/uploads/2013/02/Rplot64.png"><img class="aligncenter size-full wp-image-1923" title="Spending profile: s=0.5, equity=75%, smooth=2" src="/assets/wp-content/uploads/2013/02/Rplot64.png" alt="Spending profile: s=0.5, equity=75%, smooth=2" width="480" height="320" srcset="/assets/wp-content/uploads/2013/02/Rplot64.png 480w, /assets/wp-content/uploads/2013/02/Rplot64-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a>
  </p>
  
  <p>
    Notice the ‘hump.’ In the average case, spending rises steadily, then drops. Ideally, we would like a flatter spending profile, preferring less variability in spending. If we could take the hump and spread part of it earlier, without increasing shortfall risk, it would increase the safe spending rate.
  </p>
  
  <p>
    The spending rate at age 99 is <em>s</em>/life_expectancy=0.5/2.19 = 22.8%. Spending rates at advanced ages are too high, decimating the portfolio and causing the decline in spending. If we reduce them, maybe we don’t need to build as big a war chest in middle years to support such a high spending rate in late years.
  </p>
  
  <p>
    There are several ways we could change the model to flatten the spending profile. The one we choose is to add a parameter we’ll call ‘life expectancy buffer’ to life expectancy, so we’ll spend at a rate of <em>s</em>/(life_expectancy+buffer). If the parameter is 2, then when our life expectancy is 3, instead of spending at a rate of <em>s</em>/3, we’ll spend at a rate of <em>s</em>/(3+2). If life expectancy buffer is 0 or low, the spending rate will rise relatively quickly as we age; if life expectancy buffer is large, the spending rate will change slowly as we age.
  </p>
  
  <p>
    With a buffer of 2, we get a flatter spending profile later in life, without changing too much at the start of retirement.
  </p>
  
  <p>
    <center>
      <em>Figure 17. Spending profile: s=0.5, equity=75%, smooth=2, lifespan buffer=2</em>
    </center>
    
    <br /> <a href="/assets/wp-content/uploads/2013/02/Rplot68.png"><img class="aligncenter size-full wp-image-1924" title="Average Spending, All Cohorts (s=0.5, eq=75%, smooth=2, lifespan buffer=2)" src="/assets/wp-content/uploads/2013/02/Rplot68.png" alt="Average Spending, All Cohorts (s=0.5, eq=75%, smooth=2, lifespan buffer=2)" width="480" height="320" srcset="/assets/wp-content/uploads/2013/02/Rplot68.png 480w, /assets/wp-content/uploads/2013/02/Rplot68-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a>
  </p>
  
  <p>
    Let’s compare efficient frontiers, with and without the buffer:
  </p>
  
  <p>
    <center>
      <em>Figure 18. Efficient Frontier: Initial spending v. worst shortfall<br /> Buffer=1 v. Buffer=0</em>
    </center>
    
    <br /> <a href="/assets/wp-content/uploads/2013/02/Rplot70.png"><img class="aligncenter size-full wp-image-1943" title="Spend v. Worst Shortfall" src="/assets/wp-content/uploads/2013/02/Rplot70.png" alt="Spend v. Worst Shortfall" width="480" height="320" srcset="/assets/wp-content/uploads/2013/02/Rplot70.png 480w, /assets/wp-content/uploads/2013/02/Rplot70-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a>
  </p>
  
  <p>
    We find in all cases, the buffer gives us a higher level of <em>initial spending</em> for any level of shortfall risk. However, increasing the buffer does not always increase <em>lifetime spending</em> and sometimes worsens the tradeoff.
  </p>
  
  <p>
    <center>
      <em>Figure 19. Efficient Frontier: Lifetime spending v. worst shortfall<br /> Buffer=1 v. Buffer=0</em>
    </center>
    
    <a href="/assets/wp-content/uploads/2013/02/Rplot75.png"><img class="aligncenter size-full wp-image-1980" title="Efficient Frontier: Lifetime spending v. worst shortfall Buffer=1 v. Buffer=0" src="/assets/wp-content/uploads/2013/02/Rplot75.png" alt="Efficient Frontier: Lifetime spending v. worst shortfall Buffer=1 v. Buffer=0" width="480" height="320" srcset="/assets/wp-content/uploads/2013/02/Rplot75.png 480w, /assets/wp-content/uploads/2013/02/Rplot75-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a>
  </p>
  
  <p>
    It’s a mixed picture. The buffer may in many cases allow us to spend safely at a higher initial rate, but doesn’t always improve lifetime spending. Sometimes it reduces portfolio growth and overall lifetime spending.
  </p>
  
  <p>
    <em>Third dynamic rule: Changing equity allocation over time.</em>
  </p>
  
  <p>
    Does it make sense to reduce the equity allocation as you get older? Let’s introduce a variable to gradually reduce the amount of equity. As long as your life expectancy is > 15 years, use the initial allocation. After that, we’ll reduce the equity percentage by <em>stepdown</em> percentage points per year.
  </p>
  
  <p>
    <center>
      <em>Figure 20. Efficient frontiers: Initial spending v. worst shortfall<br /> Equity stepdowns from 0 to 3% per year when LE<15 years.</em>
    </center>
    
    <br /> <a href="/assets/wp-content/uploads/2013/02/Rplot80.png"><img class="aligncenter size-full wp-image-1986" title="Efficient Frontiers: Initial spending v. worst shortfall" src="/assets/wp-content/uploads/2013/02/Rplot80.png" alt="Efficient Frontiers: Initial spending v. worst shortfall" width="480" height="320" srcset="/assets/wp-content/uploads/2013/02/Rplot80.png 480w, /assets/wp-content/uploads/2013/02/Rplot80-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a>
  </p>
  
  <p>
    <center>
      <em>Figure 21. Efficient frontiers: Lifetime spending v. worst shortfall<br /> Equity stepdowns from 0 to 3% per year.</em>
    </center>
    
    <br /> <a href="/assets/wp-content/uploads/2013/02/Rplot81.png"><img class="aligncenter size-full wp-image-1987" title="Efficient frontiers: Lifetime spending v. worst shortfall" src="/assets/wp-content/uploads/2013/02/Rplot81.png" alt="Efficient frontiers: Lifetime spending v. worst shortfall" width="480" height="320" srcset="/assets/wp-content/uploads/2013/02/Rplot81.png 480w, /assets/wp-content/uploads/2013/02/Rplot81-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a>
  </p>
  
  <p>
    <em>What I thought would happen:</em> stepping down equity over time would let you start with more equity, relying on smoothing to get you over early drawdowns and strong long-run real returns to catch up. Then with lower equity in later years you wouldn’t be exposed to big drawdowns late in life.
  </p>
  
  <p>
    <em>What actually happened:</em> stepping down equities always worsens the risk/reward tradeoff.
  </p>
  
  <p>
    Apparently my preconception was faulty, or this is the wrong model, stepping down too early and killing returns, or there’s a mistake somewhere (although I don’t think so). Watch this space for possible future elaboration or ninja-edit. I’ll consider this a first draft and move on.
  </p>
  
  <p>
    Discarding the stepdown, we now have 4 parameters: spending factor <em>s</em>, starting equity, smoothing factor, and lifetime buffer. We have discussed how each one impacts the spending profile and shortfall risk. Let’s put it all together, try running a full range of reasonable values, and come up with the best efficient frontier over all values.
  </p>
  
  <p>
    <center>
      <em>Figure 22. Efficient frontiers _ all parameter values<br /> (s=.05-1.2; equity=0-100%; smooth=1-6; buffer=0-5)</em>
    </center>
    
    <br /> <a href="/assets/wp-content/uploads/2013/02/Rplot83.png"><img class="aligncenter size-full wp-image-1992" title="Efficient frontiers: Lifetime spending v. worst shortfall - all parameter values" src="/assets/wp-content/uploads/2013/02/Rplot83.png" alt="Efficient frontiers: Lifetime spending v. worst shortfall - all parameter values" width="480" height="320" srcset="/assets/wp-content/uploads/2013/02/Rplot83.png 480w, /assets/wp-content/uploads/2013/02/Rplot83-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a><br /> <small></p> 
    
    <table cellspacing="10">
      <tr style="text-align: right;">
        <td style="text-align: right;">
          Max shortfall
        </td>
        
        <td style="text-align: right;">
          Init spend %
        </td>
        
        <td style="text-align: right;">
          <em>s</em>
        </td>
        
        <td style="text-align: right;">
          Equity %
        </td>
        
        <td style="text-align: right;">
          Smoothing
        </td>
        
        <td style="text-align: right;">
          Buffer
        </td>
        
        <td style="text-align: right;">
          Lifetime Spend Exp.
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          0.0%
        </td>
        
        <td>
          2.1%
        </td>
        
        <td>
          0.40
        </td>
        
        <td>
          20%
        </td>
        
        <td>
          6.0
        </td>
        
        <td>
          2
        </td>
        
        <td>
          55.5
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          1.6%
        </td>
        
        <td>
          2.3%
        </td>
        
        <td>
          0.45
        </td>
        
        <td>
          35%
        </td>
        
        <td>
          6.0
        </td>
        
        <td>
          2
        </td>
        
        <td>
          64.4
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          4.8%
        </td>
        
        <td>
          2.5%
        </td>
        
        <td>
          0.50
        </td>
        
        <td>
          40%
        </td>
        
        <td>
          6.0
        </td>
        
        <td>
          3
        </td>
        
        <td>
          66.9
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          7.2%
        </td>
        
        <td>
          2.6%
        </td>
        
        <td>
          0.55
        </td>
        
        <td>
          40%
        </td>
        
        <td>
          6.0
        </td>
        
        <td>
          4
        </td>
        
        <td>
          67.18
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          7.4%
        </td>
        
        <td>
          2.7%
        </td>
        
        <td>
          0.55
        </td>
        
        <td>
          55%
        </td>
        
        <td>
          6.0
        </td>
        
        <td>
          3
        </td>
        
        <td>
          79.0
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          9.8%
        </td>
        
        <td>
          2.8%
        </td>
        
        <td>
          0.60
        </td>
        
        <td>
          55%
        </td>
        
        <td>
          6.0
        </td>
        
        <td>
          4
        </td>
        
        <td>
          78.7
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          11.8%
        </td>
        
        <td>
          2.9%
        </td>
        
        <td>
          0.65
        </td>
        
        <td>
          55%
        </td>
        
        <td>
          6.0
        </td>
        
        <td>
          5
        </td>
        
        <td>
          78.5
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          13.4%
        </td>
        
        <td>
          3.1%
        </td>
        
        <td>
          0.65
        </td>
        
        <td>
          75%
        </td>
        
        <td>
          6.0
        </td>
        
        <td>
          4
        </td>
        
        <td>
          95.3
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          <strong>15.4%</strong>
        </td>
        
        <td>
          <strong>3.2%</strong>
        </td>
        
        <td>
          <strong>0.70</strong>
        </td>
        
        <td>
          <strong>75%</strong>
        </td>
        
        <td>
          <strong>6.0</strong>
        </td>
        
        <td>
          <strong>5</strong>
        </td>
        
        <td>
          <strong>94.6</strong>
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          20.1%
        </td>
        
        <td>
          3.4%
        </td>
        
        <td>
          0.75
        </td>
        
        <td>
          95%
        </td>
        
        <td>
          6.0
        </td>
        
        <td>
          5
        </td>
        
        <td>
          114.1
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          27.3%
        </td>
        
        <td>
          3.5%
        </td>
        
        <td>
          0.70
        </td>
        
        <td>
          90%
        </td>
        
        <td>
          3.5
        </td>
        
        <td>
          3
        </td>
        
        <td>
          117.6
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          27.8%
        </td>
        
        <td>
          3.5%
        </td>
        
        <td>
          0.75
        </td>
        
        <td>
          80%
        </td>
        
        <td>
          3.5
        </td>
        
        <td>
          4
        </td>
        
        <td>
          106.7
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          28.4%
        </td>
        
        <td>
          3.6%
        </td>
        
        <td>
          0.80
        </td>
        
        <td>
          85%
        </td>
        
        <td>
          4.0
        </td>
        
        <td>
          5
        </td>
        
        <td>
          109.7
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          31.0%
        </td>
        
        <td>
          3.7%
        </td>
        
        <td>
          0.75
        </td>
        
        <td>
          75%
        </td>
        
        <td>
          2.5
        </td>
        
        <td>
          3
        </td>
        
        <td>
          106.2
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          32.3%
        </td>
        
        <td>
          3.8%
        </td>
        
        <td>
          0.80
        </td>
        
        <td>
          85%
        </td>
        
        <td>
          3.0
        </td>
        
        <td>
          4
        </td>
        
        <td>
          113.8
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          34.0%
        </td>
        
        <td>
          3.8%
        </td>
        
        <td>
          0.85
        </td>
        
        <td>
          90%
        </td>
        
        <td>
          3.5
        </td>
        
        <td>
          5
        </td>
        
        <td>
          117.1
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          35.1%
        </td>
        
        <td>
          4.0%
        </td>
        
        <td>
          0.80
        </td>
        
        <td>
          95%
        </td>
        
        <td>
          2.5
        </td>
        
        <td>
          3
        </td>
        
        <td>
          127.8
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          37.0%
        </td>
        
        <td>
          4.0%
        </td>
        
        <td>
          0.85
        </td>
        
        <td>
          90%
        </td>
        
        <td>
          2.5
        </td>
        
        <td>
          4
        </td>
        
        <td>
          120.8
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          38.6%
        </td>
        
        <td>
          4.1%
        </td>
        
        <td>
          0.90
        </td>
        
        <td>
          90%
        </td>
        
        <td>
          3.0
        </td>
        
        <td>
          5
        </td>
        
        <td>
          119.4
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          39.0%
        </td>
        
        <td>
          4.2%
        </td>
        
        <td>
          0.85
        </td>
        
        <td>
          95%
        </td>
        
        <td>
          2.0
        </td>
        
        <td>
          3
        </td>
        
        <td>
          129.3
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          40.7%
        </td>
        
        <td>
          4.2%
        </td>
        
        <td>
          0.90
        </td>
        
        <td>
          95%
        </td>
        
        <td>
          2.0
        </td>
        
        <td>
          4
        </td>
        
        <td>
          127.6
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          42.3%
        </td>
        
        <td>
          4.3%
        </td>
        
        <td>
          0.95
        </td>
        
        <td>
          90%
        </td>
        
        <td>
          2.5
        </td>
        
        <td>
          5
        </td>
        
        <td>
          121.2
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          44.0%
        </td>
        
        <td>
          4.5%
        </td>
        
        <td>
          0.95
        </td>
        
        <td>
          100%
        </td>
        
        <td>
          2.0
        </td>
        
        <td>
          4
        </td>
        
        <td>
          134.5
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          45.5%
        </td>
        
        <td>
          4.5%
        </td>
        
        <td>
          1.00
        </td>
        
        <td>
          100%
        </td>
        
        <td>
          2.0
        </td>
        
        <td>
          5
        </td>
        
        <td>
          132.9
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          48.1%
        </td>
        
        <td>
          4.7%
        </td>
        
        <td>
          1.05
        </td>
        
        <td>
          95%
        </td>
        
        <td>
          1.5
        </td>
        
        <td>
          5
        </td>
        
        <td>
          128.6
        </td>
      </tr>
      
      <tr style="text-align: right;">
        <td>
          50.6%
        </td>
        
        <td>
          5.0%
        </td>
        
        <td>
          1.10
        </td>
        
        <td>
          100%
        </td>
        
        <td>
          1.5
        </td>
        
        <td>
          5
        </td>
        
        <td>
          134.8
        </td>
      </tr>
    </table>
    
    <p>
      </small>
    </p>
    
    <p>
      Let’s look at the rule in bold. (<em>s</em>=0.70, equity=75%, smooth=6.0, buffer=5)
    </p>
    
    <p>
      <center>
        <em>Figure 23. Average Spending, All Cohorts (s=0.7, eq=75%, smooth=6, buffer=5)</em></p> 
        
        <p>
          <a href="/assets/wp-content/uploads/2013/02/Rplot86.png"><img src="/assets/wp-content/uploads/2013/02/Rplot86.png" alt="Average Spending, All Cohorts (s=0.7, eq=75%, smooth=6, buffer=5)" title="Average Spending, All Cohorts (s=0.7, eq=75%, smooth=6, buffer=5)" width="480" height="320" class="aligncenter size-full wp-image-2012" srcset="/assets/wp-content/uploads/2013/02/Rplot86.png 480w, /assets/wp-content/uploads/2013/02/Rplot86-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" /></a><br /> </center><br /> <a name="conclusion"></a><br /> <em>What have we learned?</em>
        </p>
        
        <ul>
          <li>
            When you retire matters. A lot.
          </li>
          <li>
            The 4% rule doesn’t really work with a restrictive large cap/long term bond portfolio. The best solution is 95% equity and you still get a worst case 35% shortfall.
          </li>
          <li>
            < 3.5% has generally had a tolerable worst-case, and on average lets your spending grow over time to > 4% of the initial portfolio.
          </li>
          <li>
            Even at 3.2-3.5%, a dynamic rule gives you higher lifetime spending than a fixed 4% rule, and the failure scenarios are gradual, not sudden and catastrophic.
          </li>
          <li>
            A large equity allocation is desirable for real long-term growth, and stepping down the amount of equity as you get older doesn’t seem to improve risk-reward (at least, not a fixed annual stepdown when life expectancy is < 15 years).
          </li>
          <li>
            Taxes and investment expenses aren’t included and must be taken into account, reducing returns and the level of safe spending.
          </li>
          <li>
            On the other hand, including higher-risk, higher-return investments, like small caps, international equities, higher-yielding bonds should improve risk-reward and allow higher returns and spending.
          </li>
          <li>
            Of course, this analysis assumes the future will not be very different from the past.
          </li>
          <li>
            Finally, I would add that life annuities, in theory, could be a free lunch. In the analysis above, you put aside 100% of the money you may need in the 25% chance you live to be 90; alternatively, you could join an annuity pool which only needs to put aside money for the survivors, which also has tax advantages. However, fixed annuities are subject to inflation and credit risk, and the market for insurance products for the elderly is a jungle teeming with predators.
          </li>
        </ul>
        
        <p>
          These dynamic rules are chosen for analytical simplicity, to be easy to understand and calculate. There’s no reason to believe that they are the best, ie spending a constant/(life expectancy+buffer) is the ideal model to get the highest spending rate at each point in time for the lowest shortfall risk.
        </p>
        
        <p>
          In the last part of this series, we’ll think about what an ideal model would look, and how to maximize spending while keeping shortfall risk at an acceptable level.
        </p>
        
        <p>
          <small><br /> <a name="f1"></a><sup>1</sup>On further review, the table in Part 2 isn’t the best way to look at it. No one thinks about the best spending factor they can achieve, they think about the initial spending %. And people don’t think about ‘lowest probability of 10% shortfall.’ Maximum acceptable shortfall is simpler and more informative.<br /> </small>
        </p>
