---
id: 843
title: Portfolio Optimization and Efficient Frontiers in R
date: 2012-01-18T19:06:39+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=843
permalink: /2012/01/portfolio-optimization-and-efficient-frontiers-in-r/
post-views:
  - "41396"
dsq_thread_id:
  - "544604923"
categories:
  - investing
  - datascience
tags:
  - investing
  - datascience
---
> *If you want to frustrate someone for a day, give them a program. If you want to frustrate them for a lifetime, teach them how to program.*

<!--more-->
A brief overview of how to use R to generate the analysis and plots in the most recent post, [Gold as Part of a Long-Run Asset Allocation](/2012/01/gold-as-part-of-long-run-asset-allocation/), using R, and code shared at [Systematic Investor](http://systematicinvestor.wordpress.com/ "Systematic Investor").  
<!--more-->

  
R is a powerful open-source statistical analysis package, a free version of products like SPSS, SAS, S-plus, to some extent MatLab (MatLab may target mathematical modeling more generally, not just statistics). R doesn’t do symbolic math, ie algebraic formulas, integration, differentiation etc., for that you can use Mathematica, Maple, Sage, Maxima. 

R is basically Excel on steroids. R is very powerful, and beating your head against the wall using R will open many doors to… more powerful ways to beat your head against the wall using R.

**Step 1. Install R.** Get it [here](http://lib.stat.cmu.edu/R/CRAN/bin/windows/base/). Also recommended _ [install RStudio](http://rstudio.org/). This gives you an integrated development environment, lets you browse history, data objects, help, etc.

**Step 2. Let’s get some data and plot a quick chart.** 

_ Launch RStudio (or R)

_ install ‘quantmod’ package ([Quantitative Financial Modelling & Trading Framework for R](http://www.quantmod.com/examples/intro/)). This provides the ability to download financial data, do backtesting, other modeling functionality. One of R’s biggest strengths is that whatever you want to do, someone has probably already developed a module to do it, and it’s already in the CRAN archive, one command away from being installed. (The downside is that often there is more than one way to do it, and it’s hard to figure out the best way, for instance multiple timeseries and graphics modules)

<div class="wp_codebox_msgheader">
  <span class="right"><sup><a href="http://www.ericbess.com/ericblog/2008/03/03/wp-codebox/#examples" target="_blank" title="WP-CodeBox HowTo?"><span style="color: #99cc00">?</span></a></sup></span><span class="left"><a href="javascript:;" onclick="javascript:showCodeTxt('p843code3'); return false;">View Code</a> RSPLUS</span>
  
  <div class="codebox_clear">
  </div>
</div>

<div class="wp_codebox">
  <table>
    <tr id="p8433">
      <td class="line_numbers">
        <pre>1
2
3
4
5
6
7
8
9
10
11
12
13
14
</pre>
      </td>
      
      <td class="code" id="p843code3">
        <pre class="rsplus" style="font-family:monospace;"><span style="color: #080;">&gt;</span> <span style="color: #0000FF; font-weight: bold;">install.<span style="">packages</span></span><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"quantmod"</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># load library</span>
<span style="color: #080;">&gt;</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/require.html"><span style="color: #0000FF; font-weight: bold;">require</span></a><span style="color: #080;">&#40;</span>quantmod<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># some ETFs we might choose for a portfolio:</span>
<span style="color: #080;">&gt;</span> <a href="http://astrostatistics.psu.edu/su07/R/html/stats/html/symbols.html"><span style="color: #0000FF; font-weight: bold;">symbols</span></a> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'SPY'</span>,<span style="color: #ff0000;">'IWM'</span>,<span style="color: #ff0000;">'EFA'</span>,<span style="color: #ff0000;">'EEM'</span>,<span style="color: #ff0000;">'AGG'</span>,<span style="color: #ff0000;">'IYR'</span>,<span style="color: #ff0000;">'GLD'</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># these are, respectiviely</span>
<span style="color: #080;">&gt;</span> symbol.<span style="">names</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'S&P 500'</span>,<span style="color: #ff0000;">'Russell 2000'</span>,<span style="color: #ff0000;">'Europe, Australasia, Far East developed'</span>, <span style="color: #ff0000;">'Emerging Markets'</span>,<span style="color: #ff0000;">'Agg bond'</span>,<span style="color: #ff0000;">'REIT'</span>,<span style="color: #ff0000;">'Gold'</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># download data using quantmod</span>
<span style="color: #080;">&gt;</span> getSymbols<span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/stats/html/symbols.html"><span style="color: #0000FF; font-weight: bold;">symbols</span></a>, from <span style="color: #080;">=</span> <span style="color: #ff0000;">'2003-01-01'</span>, auto.<span style="">assign</span> <span style="color: #080;">=</span> TRUE<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># run a chart</span>
<span style="color: #080;">&gt;</span> candleChart<span style="color: #080;">&#40;</span>SPY,theme<span style="color: #080;">=</span><span style="color: #ff0000;">'white'</span>, type<span style="color: #080;">=</span><span style="color: #ff0000;">'candles'</span><span style="color: #080;">&#41;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># run a chart with shorter history so we can see better</span>
<span style="color: #080;">&gt;</span> SPY_6MO<span style="color: #080;">&lt;-</span>SPY<span style="color: #080;">&#91;</span><span style="color: #ff0000;">'2011-06-01::'</span><span style="color: #080;">&#93;</span>
<span style="color: #080;">&gt;</span> candleChart<span style="color: #080;">&#40;</span>SPY_6MO,theme<span style="color: #080;">=</span><span style="color: #ff0000;">'white'</span>, type<span style="color: #080;">=</span><span style="color: #ff0000;">'candles'</span><span style="color: #080;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

You should see something like the below. More on quantmod charts [here](http://www.quantmod.com/examples/charting/).

[<img src="/assets/wp-content/uploads/2012/01/SPY_6MO.png" alt="" title="SPY_6MO" width="480" height="360" class="size-full wp-image-939" srcset="/assets/wp-content/uploads/2012/01/SPY_6MO.png 480w, /assets/wp-content/uploads/2012/01/SPY_6MO-300x225.png 300w" sizes="(max-width: 480px) 100vw, 480px" />](/assets/wp-content/uploads/2012/01/SPY_6MO.png)

For documentation on quantmod and other functions, you can get help with

<div class="wp_codebox_msgheader">
  <span class="right"><sup><a href="http://www.ericbess.com/ericblog/2008/03/03/wp-codebox/#examples" target="_blank" title="WP-CodeBox HowTo?"><span style="color: #99cc00">?</span></a></sup></span><span class="left"><a href="javascript:;" onclick="javascript:showCodeTxt('p843code4'); return false;">View Code</a> RSPLUS</span>
  
  <div class="codebox_clear">
  </div>
</div>

<div class="wp_codebox">
  <table>
    <tr id="p8434">
      <td class="line_numbers">
        <pre>1
2
3
</pre>
      </td>
      
      <td class="code" id="p843code4">
        <pre class="rsplus" style="font-family:monospace;"><span style="color: #080;">&gt;</span> <span style="color: #080;">?</span>getSymbols 
<span style="color: #080;">&gt;</span> <span style="color: #080;">?</span>candleChart
<span style="color: #080;">&gt;</span> <span style="color: #080;">?</span>quantmod</pre>
      </td>
    </tr>
  </table>
</div>

…etc. (remember, R is case-sensitive). 

**3. Data setup**

Parts 3 and onward use the code in this [longtermgold.r file](/assets/wp-content/uploads/2012/01/longtermgold.r).

Here, we create a data frame (matrix) of real returns, and report basic data on it.

<div class="wp_codebox_msgheader">
  <span class="right"><sup><a href="http://www.ericbess.com/ericblog/2008/03/03/wp-codebox/#examples" target="_blank" title="WP-CodeBox HowTo?"><span style="color: #99cc00">?</span></a></sup></span><span class="left"><a href="javascript:;" onclick="javascript:showCodeTxt('p843code5'); return false;">View Code</a> RSPLUS</span>
  
  <div class="codebox_clear">
  </div>
</div>

<div class="wp_codebox">
  <table>
    <tr id="p8435">
      <td class="line_numbers">
        <pre>1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
</pre>
      </td>
      
      <td class="code" id="p843code5">
        <pre class="rsplus" style="font-family:monospace;"><span style="color: #080;">&gt;</span> <span style="color: #228B22;"># nominal returns</span>
<span style="color: #080;">&gt;</span> SP500 <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">0.4381</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.083</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.2512</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.4384</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0864</span>,<span style="color: #ff0000;">0.4998</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0119</span>,<span style="color: #ff0000;">0.4674</span>,<span style="color: #ff0000;">0.3194</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.3534</span>,<span style="color: #ff0000;">0.2928</span>,
 <span style="color: #080;">-</span><span style="color: #ff0000;">0.011</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1067</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1277</span>,<span style="color: #ff0000;">0.1917</span>,<span style="color: #ff0000;">0.2506</span>,<span style="color: #ff0000;">0.1903</span>,<span style="color: #ff0000;">0.3582</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0843</span>,<span style="color: #ff0000;">0.052</span>,<span style="color: #ff0000;">0.057</span>,<span style="color: #ff0000;">0.183</span>,<span style="color: #ff0000;">0.3081</span>,<span style="color: #ff0000;">0.2368</span>,
 <span style="color: #ff0000;">0.1815</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0121</span>,<span style="color: #ff0000;">0.5256</span>,<span style="color: #ff0000;">0.326</span>,<span style="color: #ff0000;">0.0744</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1046</span>,<span style="color: #ff0000;">0.4372</span>,<span style="color: #ff0000;">0.1206</span>,<span style="color: #ff0000;">0.0034</span>,<span style="color: #ff0000;">0.2664</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0881</span>,<span style="color: #ff0000;">0.2261</span>,<span style="color: #ff0000;">0.1642</span>,
 <span style="color: #ff0000;">0.124</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0997</span>,<span style="color: #ff0000;">0.238</span>,<span style="color: #ff0000;">0.1081</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0824</span>,<span style="color: #ff0000;">0.0356</span>,<span style="color: #ff0000;">0.1422</span>,<span style="color: #ff0000;">0.1876</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1431</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.259</span>,<span style="color: #ff0000;">0.370</span>,<span style="color: #ff0000;">0.2383</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0698</span>,
 <span style="color: #ff0000;">0.0651</span>,<span style="color: #ff0000;">0.1852</span>,<span style="color: #ff0000;">0.3174</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.047</span>,<span style="color: #ff0000;">0.2042</span>,<span style="color: #ff0000;">0.2234</span>,<span style="color: #ff0000;">0.0615</span>,<span style="color: #ff0000;">0.3124</span>,<span style="color: #ff0000;">0.1849</span>,<span style="color: #ff0000;">0.0581</span>,<span style="color: #ff0000;">0.1654</span>,<span style="color: #ff0000;">0.3148</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0306</span>,
 <span style="color: #ff0000;">0.3023</span>,<span style="color: #ff0000;">0.0749</span>,<span style="color: #ff0000;">0.0997</span>,<span style="color: #ff0000;">0.0133</span>,<span style="color: #ff0000;">0.372</span>,<span style="color: #ff0000;">0.2382</span>,<span style="color: #ff0000;">0.3186</span>,<span style="color: #ff0000;">0.2834</span>,<span style="color: #ff0000;">0.2089</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0903</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1185</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.2197</span>,<span style="color: #ff0000;">0.2836</span>,
 <span style="color: #ff0000;">0.1074</span>,<span style="color: #ff0000;">0.0483</span>,<span style="color: #ff0000;">0.1561</span>,<span style="color: #ff0000;">0.0548</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.3658</span>,<span style="color: #ff0000;">0.2592</span>,<span style="color: #ff0000;">0.148600</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> BILLS <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">0.0308</span>,<span style="color: #ff0000;">0.0316</span>,<span style="color: #ff0000;">0.0455</span>,<span style="color: #ff0000;">0.0231</span>,<span style="color: #ff0000;">0.0107</span>,<span style="color: #ff0000;">0.0096</span>,<span style="color: #ff0000;">0.0032</span>,<span style="color: #ff0000;">0.0018</span>,<span style="color: #ff0000;">0.0017</span>,<span style="color: #ff0000;">0.003</span>,<span style="color: #ff0000;">0.0008</span>,<span style="color: #ff0000;">0.0004</span>,
 <span style="color: #ff0000;">0.0003</span>,<span style="color: #ff0000;">0.0008</span>,<span style="color: #ff0000;">0.0034</span>,<span style="color: #ff0000;">0.0038</span>,<span style="color: #ff0000;">0.0038</span>,<span style="color: #ff0000;">0.0038</span>,<span style="color: #ff0000;">0.0038</span>,<span style="color: #ff0000;">0.0057</span>,<span style="color: #ff0000;">0.0102</span>,<span style="color: #ff0000;">0.011</span>,<span style="color: #ff0000;">0.0117</span>,<span style="color: #ff0000;">0.0148</span>,<span style="color: #ff0000;">0.0167</span>,
 <span style="color: #ff0000;">0.0189</span>,<span style="color: #ff0000;">0.0096</span>,<span style="color: #ff0000;">0.0166</span>,<span style="color: #ff0000;">0.0256</span>,<span style="color: #ff0000;">0.0323</span>,<span style="color: #ff0000;">0.0178</span>,<span style="color: #ff0000;">0.0326</span>,<span style="color: #ff0000;">0.0305</span>,<span style="color: #ff0000;">0.0227</span>,<span style="color: #ff0000;">0.0278</span>,<span style="color: #ff0000;">0.0311</span>,<span style="color: #ff0000;">0.0351</span>,<span style="color: #ff0000;">0.039</span>,
 <span style="color: #ff0000;">0.0484</span>,<span style="color: #ff0000;">0.0433</span>,<span style="color: #ff0000;">0.0526</span>,<span style="color: #ff0000;">0.0656</span>,<span style="color: #ff0000;">0.0669</span>,<span style="color: #ff0000;">0.0454</span>,<span style="color: #ff0000;">0.0395</span>,<span style="color: #ff0000;">0.0673</span>,<span style="color: #ff0000;">0.0778</span>,<span style="color: #ff0000;">0.0599</span>,<span style="color: #ff0000;">0.0497</span>,<span style="color: #ff0000;">0.0513</span>,<span style="color: #ff0000;">0.0693</span>,
 <span style="color: #ff0000;">0.0994</span>,<span style="color: #ff0000;">0.1122</span>,<span style="color: #ff0000;">0.143</span>,<span style="color: #ff0000;">0.1101</span>,<span style="color: #ff0000;">0.0845</span>,<span style="color: #ff0000;">0.0961</span>,<span style="color: #ff0000;">0.0749</span>,<span style="color: #ff0000;">0.0604</span>,<span style="color: #ff0000;">0.0572</span>,<span style="color: #ff0000;">0.0645</span>,<span style="color: #ff0000;">0.0811</span>,<span style="color: #ff0000;">0.0755</span>,<span style="color: #ff0000;">0.0561</span>,
 <span style="color: #ff0000;">0.0341</span>,<span style="color: #ff0000;">0.0298</span>,<span style="color: #ff0000;">0.0399</span>,<span style="color: #ff0000;">0.0552</span>,<span style="color: #ff0000;">0.0502</span>,<span style="color: #ff0000;">0.0505</span>,<span style="color: #ff0000;">0.0473</span>,<span style="color: #ff0000;">0.0451</span>,<span style="color: #ff0000;">0.0576</span>,<span style="color: #ff0000;">0.0367</span>,<span style="color: #ff0000;">0.0166</span>,<span style="color: #ff0000;">0.0103</span>,<span style="color: #ff0000;">0.0123</span>,
 <span style="color: #ff0000;">0.0301</span>,<span style="color: #ff0000;">0.0468</span>,<span style="color: #ff0000;">0.0464</span>,<span style="color: #ff0000;">0.0159</span>,<span style="color: #ff0000;">0.0014</span>,<span style="color: #ff0000;">0.001300</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> BONDS<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">0.0084</span>,<span style="color: #ff0000;">0.042</span>,<span style="color: #ff0000;">0.0454</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0256</span>,<span style="color: #ff0000;">0.0879</span>,<span style="color: #ff0000;">0.0186</span>,<span style="color: #ff0000;">0.0796</span>,<span style="color: #ff0000;">0.0447</span>,<span style="color: #ff0000;">0.0502</span>,<span style="color: #ff0000;">0.0138</span>,<span style="color: #ff0000;">0.0421</span>,<span style="color: #ff0000;">0.0441</span>,
 <span style="color: #ff0000;">0.054</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0202</span>,<span style="color: #ff0000;">0.0229</span>,<span style="color: #ff0000;">0.0249</span>,<span style="color: #ff0000;">0.0258</span>,<span style="color: #ff0000;">0.038</span>,<span style="color: #ff0000;">0.0313</span>,<span style="color: #ff0000;">0.0092</span>,<span style="color: #ff0000;">0.0195</span>,<span style="color: #ff0000;">0.0466</span>,<span style="color: #ff0000;">0.0043</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.003</span>,<span style="color: #ff0000;">0.0227</span>,
 <span style="color: #ff0000;">0.0414</span>,<span style="color: #ff0000;">0.0329</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0134</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0226</span>,<span style="color: #ff0000;">0.068</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.021</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0265</span>,<span style="color: #ff0000;">0.1164</span>,<span style="color: #ff0000;">0.0206</span>,<span style="color: #ff0000;">0.0569</span>,<span style="color: #ff0000;">0.0168</span>,<span style="color: #ff0000;">0.0373</span>,<span style="color: #ff0000;">0.0072</span>,
 <span style="color: #ff0000;">0.0291</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0158</span>,<span style="color: #ff0000;">0.0327</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0501</span>,<span style="color: #ff0000;">0.1675</span>,<span style="color: #ff0000;">0.0979</span>,<span style="color: #ff0000;">0.0282</span>,<span style="color: #ff0000;">0.0366</span>,<span style="color: #ff0000;">0.0199</span>,<span style="color: #ff0000;">0.0361</span>,<span style="color: #ff0000;">0.1598</span>,<span style="color: #ff0000;">0.0129</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0078</span>,
 <span style="color: #ff0000;">0.0067</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0299</span>,<span style="color: #ff0000;">0.082</span>,<span style="color: #ff0000;">0.3281</span>,<span style="color: #ff0000;">0.032</span>,<span style="color: #ff0000;">0.1373</span>,<span style="color: #ff0000;">0.2571</span>,<span style="color: #ff0000;">0.2428</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0496</span>,<span style="color: #ff0000;">0.0822</span>,<span style="color: #ff0000;">0.1769</span>,<span style="color: #ff0000;">0.0624</span>,<span style="color: #ff0000;">0.150</span>,
 <span style="color: #ff0000;">0.0936</span>,<span style="color: #ff0000;">0.1421</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0804</span>,<span style="color: #ff0000;">0.2348</span>,<span style="color: #ff0000;">0.0143</span>,<span style="color: #ff0000;">0.0994</span>,<span style="color: #ff0000;">0.1492</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0825</span>,<span style="color: #ff0000;">0.1666</span>,<span style="color: #ff0000;">0.0557</span>,<span style="color: #ff0000;">0.1512</span>,<span style="color: #ff0000;">0.0038</span>,<span style="color: #ff0000;">0.0449</span>,
 <span style="color: #ff0000;">0.0287</span>,<span style="color: #ff0000;">0.0196</span>,<span style="color: #ff0000;">0.1021</span>,<span style="color: #ff0000;">0.201</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1112</span>,<span style="color: #ff0000;">0.084600</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> CPI<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #080;">-</span><span style="color: #ff0000;">0.0115607</span>,<span style="color: #ff0000;">0.005848</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0639535</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0931677</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1027397</span>,<span style="color: #ff0000;">0.0076336</span>,<span style="color: #ff0000;">0.0151515</span>,<span style="color: #ff0000;">0.0298507</span>,
 <span style="color: #ff0000;">0.0144928</span>,<span style="color: #ff0000;">0.0285714</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0277778</span>,<span style="color: #ff0000;">0.0000</span>,<span style="color: #ff0000;">0.0071429</span>,<span style="color: #ff0000;">0.0992908</span>,<span style="color: #ff0000;">0.0903226</span>,<span style="color: #ff0000;">0.0295858</span>,<span style="color: #ff0000;">0.0229885</span>,
 <span style="color: #ff0000;">0.0224719</span>,<span style="color: #ff0000;">0.1813187</span>,<span style="color: #ff0000;">0.0883721</span>,<span style="color: #ff0000;">0.0299145</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0207469</span>,<span style="color: #ff0000;">0.059322</span>,<span style="color: #ff0000;">0.0600</span>,<span style="color: #ff0000;">0.0075472</span>,<span style="color: #ff0000;">0.0074906</span>,
 <span style="color: #080;">-</span><span style="color: #ff0000;">0.0074349</span>,<span style="color: #ff0000;">0.0037453</span>,<span style="color: #ff0000;">0.0298507</span>,<span style="color: #ff0000;">0.0289855</span>,<span style="color: #ff0000;">0.0176056</span>,<span style="color: #ff0000;">0.017301</span>,<span style="color: #ff0000;">0.0136054</span>,<span style="color: #ff0000;">0.0067114</span>,<span style="color: #ff0000;">0.0133333</span>,
 <span style="color: #ff0000;">0.0164474</span>,<span style="color: #ff0000;">0.0097087</span>,<span style="color: #ff0000;">0.0192308</span>,<span style="color: #ff0000;">0.0345912</span>,<span style="color: #ff0000;">0.0303951</span>,<span style="color: #ff0000;">0.0471976</span>,<span style="color: #ff0000;">0.0619718</span>,<span style="color: #ff0000;">0.0557029</span>,<span style="color: #ff0000;">0.0326633</span>,
 <span style="color: #ff0000;">0.0340633</span>,<span style="color: #ff0000;">0.0870588</span>,<span style="color: #ff0000;">0.1233766</span>,<span style="color: #ff0000;">0.0693642</span>,<span style="color: #ff0000;">0.0486486</span>,<span style="color: #ff0000;">0.0670103</span>,<span style="color: #ff0000;">0.0901771</span>,<span style="color: #ff0000;">0.1329394</span>,<span style="color: #ff0000;">0.125163</span>,
 <span style="color: #ff0000;">0.0892236</span>,<span style="color: #ff0000;">0.0382979</span>,<span style="color: #ff0000;">0.0379098</span>,<span style="color: #ff0000;">0.0394867</span>,<span style="color: #ff0000;">0.0379867</span>,<span style="color: #ff0000;">0.010979</span>,<span style="color: #ff0000;">0.0443439</span>,<span style="color: #ff0000;">0.0441941</span>,<span style="color: #ff0000;">0.046473</span>,
 <span style="color: #ff0000;">0.0610626</span>,<span style="color: #ff0000;">0.0306428</span>,<span style="color: #ff0000;">0.0290065</span>,<span style="color: #ff0000;">0.0274841</span>,<span style="color: #ff0000;">0.026749</span>,<span style="color: #ff0000;">0.0253841</span>,<span style="color: #ff0000;">0.0332248</span>,<span style="color: #ff0000;">0.017024</span>,<span style="color: #ff0000;">0.016119</span>,
 <span style="color: #ff0000;">0.0268456</span>,<span style="color: #ff0000;">0.0338681</span>,<span style="color: #ff0000;">0.0155172</span>,<span style="color: #ff0000;">0.0237691</span>,<span style="color: #ff0000;">0.0187949</span>,<span style="color: #ff0000;">0.0325556</span>,<span style="color: #ff0000;">0.0341566</span>,<span style="color: #ff0000;">0.0254065</span>,<span style="color: #ff0000;">0.0408127</span>,
 <span style="color: #ff0000;">0.0009141</span>,<span style="color: #ff0000;">0.0272133</span>,<span style="color: #ff0000;">0.0149572</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> GOLD <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">0.000000000</span>,<span style="color: #ff0000;">0.000000000</span>,<span style="color: #ff0000;">0.000000000</span>,<span style="color: #ff0000;">0.000000000</span>,<span style="color: #ff0000;">0.000000000</span>,<span style="color: #ff0000;">0.447002860</span>,<span style="color: #ff0000;">0.079661828</span>,
 <span style="color: #ff0000;">0.000000000</span>,<span style="color: #ff0000;">0.000000000</span>,<span style="color: #ff0000;">0.000000000</span>,<span style="color: #ff0000;">0.000000000</span>,<span style="color: #ff0000;">0.000000000</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.014388737</span>,<span style="color: #ff0000;">0.028573372</span>,<span style="color: #ff0000;">0.000000000</span>,
 <span style="color: #ff0000;">0.027779564</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.006872879</span>,<span style="color: #ff0000;">0.027212564</span>,<span style="color: #ff0000;">0.026491615</span>,<span style="color: #ff0000;">0.117056555</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.023530497</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.036367644</span>,
 <span style="color: #080;">-</span><span style="color: #ff0000;">0.006191970</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.006230550</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.033039854</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.086306904</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.007067167</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.002840911</span>,<span style="color: #ff0000;">0.001421464</span>,
 <span style="color: #ff0000;">0.001419447</span>,<span style="color: #ff0000;">0.000000000</span>,<span style="color: #ff0000;">0.000000000</span>,<span style="color: #ff0000;">0.034846731</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.027779564</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.004234304</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.002832863</span>,
 <span style="color: #ff0000;">0.002832863</span>,<span style="color: #ff0000;">0.004234304</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.002820876</span>,<span style="color: #ff0000;">0.002820876</span>,<span style="color: #ff0000;">0.203228242</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.059188871</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.052577816</span>,
 <span style="color: #ff0000;">0.136739608</span>,<span style="color: #ff0000;">0.358646094</span>,<span style="color: #ff0000;">0.511577221</span>,<span style="color: #ff0000;">0.545727802</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.132280611</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.253090628</span>,<span style="color: #ff0000;">0.168898536</span>,
 <span style="color: #ff0000;">0.265477915</span>,<span style="color: #ff0000;">0.464157559</span>,<span style="color: #ff0000;">0.689884535</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.285505793</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.201637346</span>,<span style="color: #ff0000;">0.120144312</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.163629424</span>,
 <span style="color: #080;">-</span><span style="color: #ff0000;">0.127202258</span>,<span style="color: #ff0000;">0.149181164</span>,<span style="color: #ff0000;">0.192236014</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.020385757</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.134512586</span>,<span style="color: #ff0000;">0.005221944</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.058998341</span>,
 <span style="color: #080;">-</span><span style="color: #ff0000;">0.051002554</span>,<span style="color: #ff0000;">0.045462374</span>,<span style="color: #ff0000;">0.064538521</span>,<span style="color: #ff0000;">0.002600782</span>,<span style="color: #ff0000;">0.010336009</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.155436854</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.121167134</span>,
 <span style="color: #080;">-</span><span style="color: #ff0000;">0.052185753</span>,<span style="color: #ff0000;">0.000000000</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.028987537</span>,<span style="color: #ff0000;">0.133990846</span>,<span style="color: #ff0000;">0.157360955</span>,<span style="color: #ff0000;">0.119003292</span>,<span style="color: #ff0000;">0.084161792</span>,
 <span style="color: #ff0000;">0.308209839</span>,<span style="color: #ff0000;">0.142551544</span>,<span style="color: #ff0000;">0.220855221</span>,<span style="color: #ff0000;">0.110501915</span>,<span style="color: #ff0000;">0.228258652</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># put into a data frame (matrix)</span>
<span style="color: #080;">&gt;</span> fnominal<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span>stocks<span style="color: #080;">=</span>SP500, bills<span style="color: #080;">=</span>BILLS, bonds<span style="color: #080;">=</span>BONDS, gold<span style="color: #080;">=</span>GOLD, CPI<span style="color: #080;">=</span>CPI<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> freal<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span>stocks<span style="color: #080;">=</span>SP500<span style="color: #080;">-</span>CPI, bills<span style="color: #080;">=</span>BILLS<span style="color: #080;">-</span>CPI, bonds<span style="color: #080;">=</span>BONDS<span style="color: #080;">-</span>CPI, gold<span style="color: #080;">=</span>GOLD<span style="color: #080;">-</span>CPI<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># compute real returns</span>
<span style="color: #080;">&gt;</span> realreturns <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>freal, <span style="color: #ff0000;">2</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/mean.html"><span style="color: #0000FF; font-weight: bold;">mean</span></a><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> realreturnspct <span style="color: #080;">=</span> realreturns<span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># print them</span>
<span style="color: #080;">&gt;</span> realreturnspct
   stocks     bills     bonds      gold 
<span style="color: #ff0000;">8.1255600</span> <span style="color: #ff0000;">0.5107407</span> <span style="color: #ff0000;">2.0921865</span> <span style="color: #ff0000;">1.7287079</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># compute real volatility (standard deviation of real returns)</span>
<span style="color: #080;">&gt;</span> realsds <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>freal, <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">sd</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> realsdspct <span style="color: #080;">=</span> realsds<span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># print them</span>
<span style="color: #080;">&gt;</span> realsdspct
   stocks     bills     bonds      gold 
<span style="color: #ff0000;">20.556871</span>  <span style="color: #ff0000;">4.116415</span>  <span style="color: #ff0000;">9.095301</span> <span style="color: #ff0000;">15.834720</span></pre>
      </td>
    </tr>
  </table>
</div>

**4. The Easy Way**

There’s an easy way and a hard way. For the easy way, we will use the code generously shared by [Systematic Investor](http://systematicinvestor.wordpress.com/). For the hard way, we’ll go through the same steps, but writing our own code (inspired by the [Systematic Investor Toolbox](http://systematicinvestor.wordpress.com/systematic-investor-toolbox/)).

<div class="wp_codebox_msgheader">
  <span class="right"><sup><a href="http://www.ericbess.com/ericblog/2008/03/03/wp-codebox/#examples" target="_blank" title="WP-CodeBox HowTo?"><span style="color: #99cc00">?</span></a></sup></span><span class="left"><a href="javascript:;" onclick="javascript:showCodeTxt('p843code6'); return false;">View Code</a> RSPLUS</span>
  
  <div class="codebox_clear">
  </div>
</div>

<div class="wp_codebox">
  <table>
    <tr id="p8436">
      <td class="line_numbers">
        <pre>1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
</pre>
      </td>
      
      <td class="code" id="p843code6">
        <pre class="rsplus" style="font-family:monospace;"><span style="color: #080;">&gt;</span> <span style="color: #228B22;"># put input assumption in suitable format for Systematic Investor Toolbox</span>
<span style="color: #080;">&gt;</span> ia <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/list.html"><span style="color: #0000FF; font-weight: bold;">list</span></a><span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> ia$n <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/length.html"><span style="color: #0000FF; font-weight: bold;">length</span></a><span style="color: #080;">&#40;</span>freal<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> ia$annual.<span style="">factor</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">1</span>
<span style="color: #080;">&gt;</span> ia$symbols <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/names.html"><span style="color: #0000FF; font-weight: bold;">names</span></a><span style="color: #080;">&#40;</span>freal<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> ia$symbol.<span style="">names</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/names.html"><span style="color: #0000FF; font-weight: bold;">names</span></a><span style="color: #080;">&#40;</span>freal<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> ia$hist.<span style="">returns</span> <span style="color: #080;">=</span> freal
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> ia$arithmetic.<span style="">return</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>ia$hist.<span style="">returns</span>, <span style="color: #ff0000;">2</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/mean.html"><span style="color: #0000FF; font-weight: bold;">mean</span></a>, na.<span style="">rm</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/T.html"><span style="color: #0000FF; font-weight: bold;">T</span></a><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> ia$arithmetic.<span style="">return</span> <span style="color: #080;">=</span> <span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span> <span style="color: #080;">+</span> ia$arithmetic.<span style="">return</span><span style="color: #080;">&#41;</span><span style="color: #080;">^</span>ia$annual.<span style="">factor</span> <span style="color: #080;">-</span> <span style="color: #ff0000;">1</span>
<span style="color: #080;">&gt;</span> ia$geometric.<span style="">return</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>ia$hist.<span style="">returns</span>, <span style="color: #ff0000;">2</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a><span style="color: #080;">&#40;</span>x<span style="color: #080;">&#41;</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/prod.html"><span style="color: #0000FF; font-weight: bold;">prod</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span><span style="color: #080;">+</span>x<span style="color: #080;">&#41;</span><span style="color: #080;">^</span><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span><span style="color: #080;">/</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/length.html"><span style="color: #0000FF; font-weight: bold;">length</span></a><span style="color: #080;">&#40;</span>x<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span><span style="color: #080;">-</span><span style="color: #ff0000;">1</span> <span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> ia$geometric.<span style="">return</span> <span style="color: #080;">=</span> <span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span> <span style="color: #080;">+</span> ia$geometric.<span style="">return</span><span style="color: #080;">&#41;</span><span style="color: #080;">^</span>ia$annual.<span style="">factor</span> <span style="color: #080;">-</span> <span style="color: #ff0000;">1</span>
<span style="color: #080;">&gt;</span> ia$risk <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>ia$hist.<span style="">returns</span>, <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">sd</span>, na.<span style="">rm</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/T.html"><span style="color: #0000FF; font-weight: bold;">T</span></a><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> ia$risk <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sqrt.html"><span style="color: #0000FF; font-weight: bold;">sqrt</span></a><span style="color: #080;">&#40;</span>ia$annual.<span style="">factor</span><span style="color: #080;">&#41;</span> <span style="color: #080;">*</span> ia$risk
<span style="color: #080;">&gt;</span> ia$correlation <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">cor</span><span style="color: #080;">&#40;</span>ia$hist.<span style="">returns</span>, use <span style="color: #080;">=</span> <span style="color: #ff0000;">'complete.obs'</span>, method <span style="color: #080;">=</span> <span style="color: #ff0000;">'pearson'</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> ia$cov <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">cov</span><span style="color: #080;">&#40;</span>ia$hist.<span style="">returns</span>, use <span style="color: #080;">=</span> <span style="color: #ff0000;">'complete.obs'</span>, method <span style="color: #080;">=</span> <span style="color: #ff0000;">'pearson'</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> ia$expected.<span style="">return</span> <span style="color: #080;">=</span> ia$arithmetic.<span style="">return</span>
<span style="color: #080;">&gt;</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;">###############################################################################</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># Load Systematic Investor Toolbox (SIT)</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># http://systematicinvestor.wordpress.com/systematic-investor-toolbox/</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;">###############################################################################</span>
<span style="color: #080;">&gt;</span> setInternet2<span style="color: #080;">&#40;</span>TRUE<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> con <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/gzcon.html"><span style="color: #0000FF; font-weight: bold;">gzcon</span></a><span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/url.html"><span style="color: #0000FF; font-weight: bold;">url</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'http://www.systematicportfolio.com/sit.gz'</span>, <span style="color: #ff0000;">'rb'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/source.html"><span style="color: #0000FF; font-weight: bold;">source</span></a><span style="color: #080;">&#40;</span>con<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/close.html"><span style="color: #0000FF; font-weight: bold;">close</span></a><span style="color: #080;">&#40;</span>con<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># if the above doesn't work, download and unpack the URL above in a local dir and try</span>
<span style="color: #080;">&gt;</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/source.html"><span style="color: #0000FF; font-weight: bold;">source</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'C:<span style="color: #000099; font-weight: bold;">\\</span>Temp<span style="color: #000099; font-weight: bold;">\\</span>sit.r'</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># do optimizations</span>
<span style="color: #080;">&gt;</span> n <span style="color: #080;">=</span> ia$n
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># -1 &lt;= x.i &lt;= 1</span>
<span style="color: #080;">&gt;</span> constraints <span style="color: #080;">=</span> new.<span style="">constraints</span><span style="color: #080;">&#40;</span>n, lb <span style="color: #080;">=</span> <span style="color: #ff0000;"></span>, ub <span style="color: #080;">=</span> <span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># SUM x.i = 1</span>
<span style="color: #080;">&gt;</span> constraints <span style="color: #080;">=</span> add.<span style="">constraints</span><span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/rep.html"><span style="color: #0000FF; font-weight: bold;">rep</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span>, n<span style="color: #080;">&#41;</span>, <span style="color: #ff0000;">1</span>, type <span style="color: #080;">=</span> <span style="color: #ff0000;">'='</span>, constraints<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> ef.<span style="">risk</span> <span style="color: #080;">=</span> portopt<span style="color: #080;">&#40;</span>ia, constraints, <span style="color: #ff0000;">50</span>, <span style="color: #ff0000;">'Historical'</span>, equally.<span style="">spaced</span>.<span style="">risk</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/T.html"><span style="color: #0000FF; font-weight: bold;">T</span></a><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># chart</span>
<span style="color: #080;">&gt;</span> <a href="http://astrostatistics.psu.edu/su07/R/html/stats/html/layout.html"><span style="color: #0000FF; font-weight: bold;">layout</span></a><span style="color: #080;">&#40;</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/matrix.html"><span style="color: #0000FF; font-weight: bold;">matrix</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span><span style="color: #080;">:</span><span style="color: #ff0000;">2</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a> <span style="color: #080;">=</span> <span style="color: #ff0000;">2</span><span style="color: #080;">&#41;</span> <span style="color: #080;">&#41;</span> <span style="color: #228B22;"># can skip this in RStudio, use back button</span>
<span style="color: #080;">&gt;</span> plot.<span style="">ef</span><span style="color: #080;">&#40;</span>ia, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/list.html"><span style="color: #0000FF; font-weight: bold;">list</span></a><span style="color: #080;">&#40;</span>ef.<span style="">risk</span><span style="color: #080;">&#41;</span>, portfolio.<span style="">risk</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/T.html"><span style="color: #0000FF; font-weight: bold;">T</span></a>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/T.html"><span style="color: #0000FF; font-weight: bold;">T</span></a><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># you should see 2 plots</span></pre>
      </td>
    </tr>
  </table>
</div>

**5. The Hard Way**

**Find max return portfolio using linear programming**. This will be all stocks, the rightmost point of efficient frontier.

<div class="wp_codebox_msgheader">
  <span class="right"><sup><a href="http://www.ericbess.com/ericblog/2008/03/03/wp-codebox/#examples" target="_blank" title="WP-CodeBox HowTo?"><span style="color: #99cc00">?</span></a></sup></span><span class="left"><a href="javascript:;" onclick="javascript:showCodeTxt('p843code7'); return false;">View Code</a> RSPLUS</span>
  
  <div class="codebox_clear">
  </div>
</div>

<div class="wp_codebox">
  <table>
    <tr id="p8437">
      <td class="line_numbers">
        <pre>1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
</pre>
      </td>
      
      <td class="code" id="p843code7">
        <pre class="rsplus" style="font-family:monospace;">&nbsp;
<span style="color: #080;">&gt;</span> <span style="color: #0000FF; font-weight: bold;">install.<span style="">packages</span></span><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'lpSolve'</span><span style="color: #080;">&#41;</span>
Installing package<span style="color: #080;">&#40;</span>s<span style="color: #080;">&#41;</span> into ‘<span style="color: #0000FF; font-weight: bold;">C</span><span style="color: #080;">:/</span>Users<span style="color: #080;">/</span>druce<span style="color: #080;">/</span>R<span style="color: #080;">/</span>win<span style="color: #080;">-</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/library.html"><span style="color: #0000FF; font-weight: bold;">library</span></a><span style="color: #080;">/</span><span style="color: #ff0000;">2.14</span>’
<span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/base/html/Log.html"><span style="color: #0000FF; font-weight: bold;">as</span></a> ‘lib’ <a href="http://astrostatistics.psu.edu/su07/R/html/base/html/Log.html"><span style="color: #0000FF; font-weight: bold;">is</span></a> unspecified<span style="color: #080;">&#41;</span>
trying URL <span style="color: #ff0000;">'http://cran.cnr.Berkeley.edu/bin/windows/contrib/2.14/lpSolve_5.6.6.zip'</span>
Content type <span style="color: #ff0000;">'application/zip'</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/length.html"><span style="color: #0000FF; font-weight: bold;">length</span></a> <span style="color: #ff0000;">641137</span> bytes <span style="color: #080;">&#40;</span><span style="color: #ff0000;">626</span> Kb<span style="color: #080;">&#41;</span>
opened URL
downloaded <span style="color: #ff0000;">626</span> Kb
&nbsp;
package ‘lpSolve’ successfully unpacked and MD5 sums checked
&nbsp;
The downloaded packages are <span style="color: #0000FF; font-weight: bold;">in</span>
        <span style="color: #0000FF; font-weight: bold;">C</span><span style="color: #080;">:</span>\Users\druce\AppData\Local\Temp\RtmpQtZRHw\downloaded_packages
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/require.html"><span style="color: #0000FF; font-weight: bold;">require</span></a><span style="color: #080;">&#40;</span>lpSolve<span style="color: #080;">&#41;</span>
Loading required package<span style="color: #080;">:</span> lpSolve
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># find maximum return portfolio (rightmost point of efficient frontier)</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># will be 100% of highest return asset</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># maximize</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># w1 * stocks +w2 *bills +w3*bonds + w4 * gold</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># subject to 0 &lt;= w &lt;= 1  for each w</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># will pick highest return asset with w=1</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># skipping &gt;0 constraint, no negative return assets, so not binding</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> opt.<span style="">objective</span> <span style="color: #080;">&lt;-</span> realreturns
<span style="color: #080;">&gt;</span> opt.<span style="">constraints</span> <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/matrix.html"><span style="color: #0000FF; font-weight: bold;">matrix</span></a> <span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">1</span>,  <span style="color: #228B22;"># constrain sum of weights to 1</span>
<span style="color: #080;">+</span>                              <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;"></span>, <span style="color: #ff0000;"></span>, <span style="color: #ff0000;"></span>,  <span style="color: #228B22;"># constrain w1 &lt;= 1</span>
<span style="color: #080;">+</span>                              <span style="color: #ff0000;"></span>, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;"></span>, <span style="color: #ff0000;"></span>,  <span style="color: #228B22;"># constrain w2 &lt;= 1</span>
<span style="color: #080;">+</span>                              <span style="color: #ff0000;"></span>, <span style="color: #ff0000;"></span>, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;"></span>,  <span style="color: #228B22;"># constrain w3 &lt;= 1</span>
<span style="color: #080;">+</span>                              <span style="color: #ff0000;"></span>, <span style="color: #ff0000;"></span>, <span style="color: #ff0000;"></span>, <span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span>  <span style="color: #228B22;"># constrain w4 &lt;= 1</span>
<span style="color: #080;">+</span>                            , <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">=</span><span style="color: #ff0000;">5</span>, byrow<span style="color: #080;">=</span>TRUE<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> opt.<span style="">operator</span> <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"="</span>, <span style="color: #ff0000;">"&lt;="</span>, <span style="color: #ff0000;">"&lt;="</span>, <span style="color: #ff0000;">"&lt;="</span>, <span style="color: #ff0000;">"&lt;="</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> opt.<span style="">rhs</span> <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> opt.<span style="">dir</span><span style="color: #080;">=</span><span style="color: #ff0000;">"max"</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> solution.<span style="">maxret</span> <span style="color: #080;">=</span> lp <span style="color: #080;">&#40;</span>direction <span style="color: #080;">=</span> opt.<span style="">dir</span>,
<span style="color: #080;">+</span>   opt.<span style="">objective</span>,
<span style="color: #080;">+</span>   opt.<span style="">constraints</span>,
<span style="color: #080;">+</span>   opt.<span style="">operator</span>,
<span style="color: #080;">+</span>   opt.<span style="">rhs</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># portfolio weights for max return portfolio </span>
<span style="color: #080;">&gt;</span> wts.<span style="">maxret</span><span style="color: #080;">=</span>solution.<span style="">maxret</span>$solution
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># return for max return portfolio</span>
<span style="color: #080;">&gt;</span> ret.<span style="">maxret</span><span style="color: #080;">=</span>solution.<span style="">maxret</span>$objval
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># compute return covariance matrix to determine volatility of this portfolio</span>
<span style="color: #080;">&gt;</span> covmatrix <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">cov</span><span style="color: #080;">&#40;</span>freal, use <span style="color: #080;">=</span> <span style="color: #ff0000;">'complete.obs'</span>, method <span style="color: #080;">=</span> <span style="color: #ff0000;">'pearson'</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># multiply weights x covariances x weights, gives variance</span>
<span style="color: #080;">&gt;</span> var.<span style="">maxret</span> <span style="color: #080;">=</span> wts.<span style="">maxret</span> <span style="color: #080;">%*%</span> covmatrix <span style="color: #080;">%*%</span> wts.<span style="">maxret</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># square root gives standard deviation (volatility)</span>
<span style="color: #080;">&gt;</span> vol.<span style="">maxret</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sqrt.html"><span style="color: #0000FF; font-weight: bold;">sqrt</span></a><span style="color: #080;">&#40;</span>var.<span style="">maxret</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> wts.<span style="">maxret</span>
<span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span> <span style="color: #ff0000;">1</span> <span style="color: #ff0000;"></span> <span style="color: #ff0000;"></span> <span style="color: #ff0000;"></span>
<span style="color: #080;">&gt;</span> ret.<span style="">maxret</span>
<span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span> <span style="color: #ff0000;">0.0812556</span>
<span style="color: #080;">&gt;</span> vol.<span style="">maxret</span>
          <span style="color: #080;">&#91;</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span>
<span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span>,<span style="color: #080;">&#93;</span> <span style="color: #ff0000;">0.2055687</span>
<span style="color: #080;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

**Find minimum-volatility portfolio using quadratic programming**. This will be the left-most point of the efficient frontier.

<div class="wp_codebox_msgheader">
  <span class="right"><sup><a href="http://www.ericbess.com/ericblog/2008/03/03/wp-codebox/#examples" target="_blank" title="WP-CodeBox HowTo?"><span style="color: #99cc00">?</span></a></sup></span><span class="left"><a href="javascript:;" onclick="javascript:showCodeTxt('p843code8'); return false;">View Code</a> RSPLUS</span>
  
  <div class="codebox_clear">
  </div>
</div>

<div class="wp_codebox">
  <table>
    <tr id="p8438">
      <td class="line_numbers">
        <pre>1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
</pre>
      </td>
      
      <td class="code" id="p843code8">
        <pre class="rsplus" style="font-family:monospace;"><span style="color: #080;">&gt;</span> <span style="color: #0000FF; font-weight: bold;">install.<span style="">packages</span></span><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'quadprog'</span><span style="color: #080;">&#41;</span>
Installing package<span style="color: #080;">&#40;</span>s<span style="color: #080;">&#41;</span> into ‘<span style="color: #0000FF; font-weight: bold;">C</span><span style="color: #080;">:/</span>Users<span style="color: #080;">/</span>druce<span style="color: #080;">/</span>R<span style="color: #080;">/</span>win<span style="color: #080;">-</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/library.html"><span style="color: #0000FF; font-weight: bold;">library</span></a><span style="color: #080;">/</span><span style="color: #ff0000;">2.14</span>’
<span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/base/html/Log.html"><span style="color: #0000FF; font-weight: bold;">as</span></a> ‘lib’ <a href="http://astrostatistics.psu.edu/su07/R/html/base/html/Log.html"><span style="color: #0000FF; font-weight: bold;">is</span></a> unspecified<span style="color: #080;">&#41;</span>
trying URL <span style="color: #ff0000;">'http://cran.cnr.Berkeley.edu/bin/windows/contrib/2.14/quadprog_1.5-4.zip'</span>
Content type <span style="color: #ff0000;">'application/zip'</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/length.html"><span style="color: #0000FF; font-weight: bold;">length</span></a> <span style="color: #ff0000;">45730</span> bytes <span style="color: #080;">&#40;</span><span style="color: #ff0000;">44</span> Kb<span style="color: #080;">&#41;</span>
opened URL
downloaded <span style="color: #ff0000;">44</span> Kb
&nbsp;
package ‘quadprog’ successfully unpacked and MD5 sums checked
&nbsp;
The downloaded packages are <span style="color: #0000FF; font-weight: bold;">in</span>
        <span style="color: #0000FF; font-weight: bold;">C</span><span style="color: #080;">:</span>\Users\druce\AppData\Local\Temp\RtmpQtZRHw\downloaded_packages
<span style="color: #080;">&gt;</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/require.html"><span style="color: #0000FF; font-weight: bold;">require</span></a><span style="color: #080;">&#40;</span>quadprog<span style="color: #080;">&#41;</span>
Loading required package<span style="color: #080;">:</span> quadprog
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># minimize variance:  w %*% covmatrix %*% t(w)</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># subject to sum of ws = 1</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># subject to each ws &gt; 0</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># solution.minvol &lt;- solve.QP(covmatrix, zeros, t(opt.constraints), opt.rhs, meq = opt.meq)</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># first 2 parameters covmatrix, zeros define function to be minimized</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># if zeros is all 0s, the function minimized ends up equal to port variance / 2</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># opt.constraints is the left hand side of the constraints, ie the cs in</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># c1 w1 + c2 w2 ... + cn wn = K</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># opt.rhs is the Ks in the above equation</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># meq means the first meq rows are 'equals' constraints, remainder are &gt;= constraints</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># if you want to do a &lt;= constraint, multply by -1 to make it a &gt;= constraint</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># does not appear to accept 0 RHS, so we make it a tiny number&gt; 0</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># compute covariance matrix</span>
<span style="color: #080;">&gt;</span> covmatrix <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">cov</span><span style="color: #080;">&#40;</span>freal, use <span style="color: #080;">=</span> <span style="color: #ff0000;">'complete.obs'</span>, method <span style="color: #080;">=</span> <span style="color: #ff0000;">'pearson'</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> nObs <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/length.html"><span style="color: #0000FF; font-weight: bold;">length</span></a><span style="color: #080;">&#40;</span>freal$stocks<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> nAssets <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/length.html"><span style="color: #0000FF; font-weight: bold;">length</span></a><span style="color: #080;">&#40;</span>freal<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># 1 x numassets array of 1s</span>
<span style="color: #080;">&gt;</span> opt.<span style="">constraints</span> <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/matrix.html"><span style="color: #0000FF; font-weight: bold;">matrix</span></a> <span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">1</span>,   <span style="color: #228B22;"># sum of weights =1</span>
<span style="color: #080;">+</span>                              <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;"></span>, <span style="color: #ff0000;"></span>, <span style="color: #ff0000;"></span>,   <span style="color: #228B22;"># w1 &gt;= 0</span>
<span style="color: #080;">+</span>                              <span style="color: #ff0000;"></span>, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;"></span>, <span style="color: #ff0000;"></span>,   <span style="color: #228B22;"># w1 &gt;= 0</span>
<span style="color: #080;">+</span>                              <span style="color: #ff0000;"></span>, <span style="color: #ff0000;"></span>, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;"></span>,   <span style="color: #228B22;"># w1 &gt;= 0</span>
<span style="color: #080;">+</span>                              <span style="color: #ff0000;"></span>, <span style="color: #ff0000;"></span>, <span style="color: #ff0000;"></span>, <span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span>   <span style="color: #228B22;"># w2 &gt;= 0</span>
<span style="color: #080;">+</span>                            , <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">=</span><span style="color: #ff0000;">5</span>, byrow<span style="color: #080;">=</span>TRUE<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> opt.<span style="">rhs</span> <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/matrix.html"><span style="color: #0000FF; font-weight: bold;">matrix</span></a><span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">0.000001</span>, <span style="color: #ff0000;">0.000001</span>, <span style="color: #ff0000;">0.000001</span>, <span style="color: #ff0000;">0.000001</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> opt.<span style="">meq</span> <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">1</span>  <span style="color: #228B22;"># first constraint is '=', rest are '&gt;='</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># numassets x 1 array of 0s</span>
<span style="color: #080;">&gt;</span> zeros <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/array.html"><span style="color: #0000FF; font-weight: bold;">array</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;"></span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/dim.html"><span style="color: #0000FF; font-weight: bold;">dim</span></a> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>nAssets,<span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> solution.<span style="">minvol</span> <span style="color: #080;">&lt;-</span> solve.<span style="">QP</span><span style="color: #080;">&#40;</span>covmatrix, zeros, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/t.html"><span style="color: #0000FF; font-weight: bold;">t</span></a><span style="color: #080;">&#40;</span>opt.<span style="">constraints</span><span style="color: #080;">&#41;</span>, opt.<span style="">rhs</span>, meq <span style="color: #080;">=</span> opt.<span style="">meq</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> wts.<span style="">minvol</span> <span style="color: #080;">=</span> solution.<span style="">minvol</span>$solution
<span style="color: #080;">&gt;</span> var.<span style="">minvol</span> <span style="color: #080;">=</span> solution.<span style="">minvol</span>$value <span style="color: #080;">*</span><span style="color: #ff0000;">2</span>
<span style="color: #080;">&gt;</span> ret.<span style="">minvol</span> <span style="color: #080;">=</span> realreturns <span style="color: #080;">%*%</span> wts.<span style="">minvol</span>
<span style="color: #080;">&gt;</span> vol.<span style="">minvol</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sqrt.html"><span style="color: #0000FF; font-weight: bold;">sqrt</span></a><span style="color: #080;">&#40;</span>var.<span style="">minvol</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

**Fill in all the points on the efficient frontier**. Run a volatility optimization on a series of points between the two portfolios.

<div class="wp_codebox_msgheader">
  <span class="right"><sup><a href="http://www.ericbess.com/ericblog/2008/03/03/wp-codebox/#examples" target="_blank" title="WP-CodeBox HowTo?"><span style="color: #99cc00">?</span></a></sup></span><span class="left"><a href="javascript:;" onclick="javascript:showCodeTxt('p843code9'); return false;">View Code</a> RSPLUS</span>
  
  <div class="codebox_clear">
  </div>
</div>

<div class="wp_codebox">
  <table>
    <tr id="p8439">
      <td class="line_numbers">
        <pre>1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
</pre>
      </td>
      
      <td class="code" id="p843code9">
        <pre class="rsplus" style="font-family:monospace;"><span style="color: #080;">&gt;</span> <span style="color: #228B22;"># generate a sequence of 50 evenly spaced returns between min var return and max return</span>
<span style="color: #080;">&gt;</span> lowreturn<span style="color: #080;">=</span>ret.<span style="">minvol</span>
<span style="color: #080;">&gt;</span> highreturn<span style="color: #080;">=</span>ret.<span style="">maxret</span>
<span style="color: #080;">&gt;</span> minreturns<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/seq.html"><span style="color: #0000FF; font-weight: bold;">seq</span></a><span style="color: #080;">&#40;</span>lowreturn, highreturn, length.<span style="">out</span><span style="color: #080;">=</span><span style="color: #ff0000;">50</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># add a return constraint: sum of weight * return &gt;= x</span>
<span style="color: #080;">&gt;</span> retconst<span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/rbind.html"><span style="color: #0000FF; font-weight: bold;">rbind</span></a><span style="color: #080;">&#40;</span>opt.<span style="">constraints</span>, realreturns<span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> retrhs<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/rbind.html"><span style="color: #0000FF; font-weight: bold;">rbind</span></a><span style="color: #080;">&#40;</span>opt.<span style="">rhs</span>, ret.<span style="">minvol</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># create vectors for the returns, vols, and weights along the frontier,</span>
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># starting with the minvol portfolio</span>
<span style="color: #080;">&gt;</span> out.<span style="">ret</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>ret.<span style="">minvol</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> out.<span style="">vol</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>vol.<span style="">minvol</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> out.<span style="">stocks</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>wts.<span style="">minvol</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> out.<span style="">bills</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>wts.<span style="">minvol</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> out.<span style="">bonds</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>wts.<span style="">minvol</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">3</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> out.<span style="">gold</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>wts.<span style="">minvol</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">4</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># loop and run a minimum volatility optimization for each return level from 2-49</span>
<span style="color: #080;">&gt;</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/for.html"><span style="color: #0000FF; font-weight: bold;">for</span></a><span style="color: #080;">&#40;</span>i <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">2</span><span style="color: #080;">:</span><span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/length.html"><span style="color: #0000FF; font-weight: bold;">length</span></a><span style="color: #080;">&#40;</span>minreturns<span style="color: #080;">&#41;</span> <span style="color: #080;">-</span> <span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
<span style="color: #080;">+</span>     <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/print.html"><span style="color: #0000FF; font-weight: bold;">print</span></a><span style="color: #080;">&#40;</span>i<span style="color: #080;">&#41;</span>
<span style="color: #080;">+</span>     <span style="color: #228B22;"># start with existing constraints, no return constraint</span>
<span style="color: #080;">+</span>     tmp.<span style="">constraints</span> <span style="color: #080;">=</span> retconst
<span style="color: #080;">+</span>     tmp.<span style="">rhs</span><span style="color: #080;">=</span>retrhs
<span style="color: #080;">+</span>     <span style="color: #228B22;"># set return constraint</span>
<span style="color: #080;">+</span>     tmp.<span style="">rhs</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">6</span><span style="color: #080;">&#93;</span> <span style="color: #080;">=</span> minreturns<span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span>
<span style="color: #080;">+</span> 
<span style="color: #080;">+</span>     tmpsol <span style="color: #080;">&lt;-</span> solve.<span style="">QP</span><span style="color: #080;">&#40;</span>covmatrix, zeros, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/t.html"><span style="color: #0000FF; font-weight: bold;">t</span></a><span style="color: #080;">&#40;</span>tmp.<span style="">constraints</span><span style="color: #080;">&#41;</span>, tmp.<span style="">rhs</span>, meq <span style="color: #080;">=</span> opt.<span style="">meq</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">+</span> 
<span style="color: #080;">+</span>     tmp.<span style="">wts</span> <span style="color: #080;">=</span> tmpsol$solution
<span style="color: #080;">+</span>     tmp.<span style="">var</span> <span style="color: #080;">=</span> tmpsol$value <span style="color: #080;">*</span><span style="color: #ff0000;">2</span>
<span style="color: #080;">+</span>     out.<span style="">ret</span><span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span> <span style="color: #080;">=</span> realreturns <span style="color: #080;">%*%</span> tmp.<span style="">wts</span>
<span style="color: #080;">+</span>     out.<span style="">vol</span><span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sqrt.html"><span style="color: #0000FF; font-weight: bold;">sqrt</span></a><span style="color: #080;">&#40;</span>tmp.<span style="">var</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">+</span>     out.<span style="">stocks</span><span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>tmp.<span style="">wts</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span>
<span style="color: #080;">+</span>     out.<span style="">bills</span><span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>tmp.<span style="">wts</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span>
<span style="color: #080;">+</span>     out.<span style="">bonds</span><span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>tmp.<span style="">wts</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">3</span><span style="color: #080;">&#93;</span>
<span style="color: #080;">+</span>     out.<span style="">gold</span><span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>tmp.<span style="">wts</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">4</span><span style="color: #080;">&#93;</span>
<span style="color: #080;">+</span> <span style="color: #080;">&#125;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># put maxreturn portfolio in return series for max return, index =50</span>
<span style="color: #080;">&gt;</span> out.<span style="">ret</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">50</span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>ret.<span style="">maxret</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> out.<span style="">vol</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">50</span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>vol.<span style="">maxret</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> out.<span style="">stocks</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">50</span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>wts.<span style="">maxret</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> out.<span style="">bills</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">50</span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>wts.<span style="">maxret</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> out.<span style="">bonds</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">50</span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>wts.<span style="">maxret</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">3</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> out.<span style="">gold</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">50</span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>wts.<span style="">maxret</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">4</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> <span style="color: #228B22;"># organize in a data frame</span>
<span style="color: #080;">&gt;</span> efrontier<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span>out.<span style="">ret</span><span style="color: #080;">*</span><span style="color: #ff0000;">100</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> efrontier$vol<span style="color: #080;">=</span>out.<span style="">vol</span><span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
<span style="color: #080;">&gt;</span> efrontier$stocks<span style="color: #080;">=</span>out.<span style="">stocks</span><span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
<span style="color: #080;">&gt;</span> efrontier$bills<span style="color: #080;">=</span>out.<span style="">bills</span><span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
<span style="color: #080;">&gt;</span> efrontier$bonds<span style="color: #080;">=</span>out.<span style="">bonds</span><span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
<span style="color: #080;">&gt;</span> efrontier$gold<span style="color: #080;">=</span>out.<span style="">gold</span><span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
<span style="color: #080;">&gt;</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/names.html"><span style="color: #0000FF; font-weight: bold;">names</span></a><span style="color: #080;">&#40;</span>efrontier<span style="color: #080;">&#41;</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Return"</span>, <span style="color: #ff0000;">"Risk"</span>, <span style="color: #ff0000;">"%Stocks"</span>, <span style="color: #ff0000;">"%Bills"</span>, <span style="color: #ff0000;">"%Bonds"</span>, <span style="color: #ff0000;">"%Gold"</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> efrontier
      Return      Risk    <span style="color: #080;">%</span>Stocks     <span style="color: #080;">%</span>Bills     <span style="color: #080;">%</span>Bonds     <span style="color: #080;">%</span>Gold
<span style="color: #ff0000;">1</span>  <span style="color: #ff0000;">0.7775434</span>  <span style="color: #ff0000;">3.864621</span>   <span style="color: #ff0000;">2.186681</span> <span style="color: #ff0000;">89.5790672</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">8.234152</span>
<span style="color: #ff0000;">2</span>  <span style="color: #ff0000;">0.9275029</span>  <span style="color: #ff0000;">3.884299</span>   <span style="color: #ff0000;">4.060710</span> <span style="color: #ff0000;">87.1093280</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">8.829862</span>
<span style="color: #ff0000;">3</span>  <span style="color: #ff0000;">1.0774624</span>  <span style="color: #ff0000;">3.941030</span>   <span style="color: #ff0000;">5.632804</span> <span style="color: #ff0000;">83.4673729</span>  <span style="color: #ff0000;">1.3859316</span>  <span style="color: #ff0000;">9.513891</span>
<span style="color: #ff0000;">4</span>  <span style="color: #ff0000;">1.2274219</span>  <span style="color: #ff0000;">4.025019</span>   <span style="color: #ff0000;">6.959171</span> <span style="color: #ff0000;">78.8714253</span>  <span style="color: #ff0000;">3.8996041</span> <span style="color: #ff0000;">10.269800</span>
<span style="color: #ff0000;">5</span>  <span style="color: #ff0000;">1.3773814</span>  <span style="color: #ff0000;">4.133524</span>   <span style="color: #ff0000;">8.285538</span> <span style="color: #ff0000;">74.2754777</span>  <span style="color: #ff0000;">6.4132765</span> <span style="color: #ff0000;">11.025708</span>
<span style="color: #ff0000;">6</span>  <span style="color: #ff0000;">1.5273410</span>  <span style="color: #ff0000;">4.264673</span>   <span style="color: #ff0000;">9.611905</span> <span style="color: #ff0000;">69.6795301</span>  <span style="color: #ff0000;">8.9269490</span> <span style="color: #ff0000;">11.781616</span>
<span style="color: #ff0000;">7</span>  <span style="color: #ff0000;">1.6773005</span>  <span style="color: #ff0000;">4.416451</span>  <span style="color: #ff0000;">10.938272</span> <span style="color: #ff0000;">65.0835824</span> <span style="color: #ff0000;">11.4406215</span> <span style="color: #ff0000;">12.537525</span>
<span style="color: #ff0000;">8</span>  <span style="color: #ff0000;">1.8272600</span>  <span style="color: #ff0000;">4.586809</span>  <span style="color: #ff0000;">12.264638</span> <span style="color: #ff0000;">60.4876348</span> <span style="color: #ff0000;">13.9542939</span> <span style="color: #ff0000;">13.293433</span>
<span style="color: #ff0000;">9</span>  <span style="color: #ff0000;">1.9772195</span>  <span style="color: #ff0000;">4.773759</span>  <span style="color: #ff0000;">13.591005</span> <span style="color: #ff0000;">55.8916872</span> <span style="color: #ff0000;">16.4679664</span> <span style="color: #ff0000;">14.049341</span>
<span style="color: #ff0000;">10</span> <span style="color: #ff0000;">2.1271791</span>  <span style="color: #ff0000;">4.975431</span>  <span style="color: #ff0000;">14.917372</span> <span style="color: #ff0000;">51.2957396</span> <span style="color: #ff0000;">18.9816388</span> <span style="color: #ff0000;">14.805249</span>
<span style="color: #ff0000;">11</span> <span style="color: #ff0000;">2.2771386</span>  <span style="color: #ff0000;">5.190110</span>  <span style="color: #ff0000;">16.243739</span> <span style="color: #ff0000;">46.6997919</span> <span style="color: #ff0000;">21.4953113</span> <span style="color: #ff0000;">15.561158</span>
<span style="color: #ff0000;">12</span> <span style="color: #ff0000;">2.4270981</span>  <span style="color: #ff0000;">5.416248</span>  <span style="color: #ff0000;">17.570106</span> <span style="color: #ff0000;">42.1038443</span> <span style="color: #ff0000;">24.0089838</span> <span style="color: #ff0000;">16.317066</span>
<span style="color: #ff0000;">13</span> <span style="color: #ff0000;">2.5770576</span>  <span style="color: #ff0000;">5.652470</span>  <span style="color: #ff0000;">18.896473</span> <span style="color: #ff0000;">37.5078967</span> <span style="color: #ff0000;">26.5226562</span> <span style="color: #ff0000;">17.072974</span>
<span style="color: #ff0000;">14</span> <span style="color: #ff0000;">2.7270172</span>  <span style="color: #ff0000;">5.897565</span>  <span style="color: #ff0000;">20.222840</span> <span style="color: #ff0000;">32.9119490</span> <span style="color: #ff0000;">29.0363287</span> <span style="color: #ff0000;">17.828882</span>
<span style="color: #ff0000;">15</span> <span style="color: #ff0000;">2.8769767</span>  <span style="color: #ff0000;">6.150473</span>  <span style="color: #ff0000;">21.549207</span> <span style="color: #ff0000;">28.3160014</span> <span style="color: #ff0000;">31.5500011</span> <span style="color: #ff0000;">18.584791</span>
<span style="color: #ff0000;">16</span> <span style="color: #ff0000;">3.0269362</span>  <span style="color: #ff0000;">6.410268</span>  <span style="color: #ff0000;">22.875574</span> <span style="color: #ff0000;">23.7200538</span> <span style="color: #ff0000;">34.0636736</span> <span style="color: #ff0000;">19.340699</span>
<span style="color: #ff0000;">17</span> <span style="color: #ff0000;">3.1768957</span>  <span style="color: #ff0000;">6.676147</span>  <span style="color: #ff0000;">24.201940</span> <span style="color: #ff0000;">19.1241062</span> <span style="color: #ff0000;">36.5773461</span> <span style="color: #ff0000;">20.096607</span>
<span style="color: #ff0000;">18</span> <span style="color: #ff0000;">3.3268553</span>  <span style="color: #ff0000;">6.947411</span>  <span style="color: #ff0000;">25.528307</span> <span style="color: #ff0000;">14.5281585</span> <span style="color: #ff0000;">39.0910185</span> <span style="color: #ff0000;">20.852516</span>
<span style="color: #ff0000;">19</span> <span style="color: #ff0000;">3.4768148</span>  <span style="color: #ff0000;">7.223454</span>  <span style="color: #ff0000;">26.854674</span>  <span style="color: #ff0000;">9.9322109</span> <span style="color: #ff0000;">41.6046910</span> <span style="color: #ff0000;">21.608424</span>
<span style="color: #ff0000;">20</span> <span style="color: #ff0000;">3.6267743</span>  <span style="color: #ff0000;">7.503747</span>  <span style="color: #ff0000;">28.181041</span>  <span style="color: #ff0000;">5.3362633</span> <span style="color: #ff0000;">44.1183634</span> <span style="color: #ff0000;">22.364332</span>
<span style="color: #ff0000;">21</span> <span style="color: #ff0000;">3.7767338</span>  <span style="color: #ff0000;">7.787833</span>  <span style="color: #ff0000;">29.507408</span>  <span style="color: #ff0000;">0.7403156</span> <span style="color: #ff0000;">46.6320359</span> <span style="color: #ff0000;">23.120240</span>
<span style="color: #ff0000;">22</span> <span style="color: #ff0000;">3.9266933</span>  <span style="color: #ff0000;">8.082634</span>  <span style="color: #ff0000;">31.777881</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">45.4504291</span> <span style="color: #ff0000;">22.771589</span>
<span style="color: #ff0000;">23</span> <span style="color: #ff0000;">4.0766529</span>  <span style="color: #ff0000;">8.399744</span>  <span style="color: #ff0000;">34.229603</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">43.5594100</span> <span style="color: #ff0000;">22.210887</span>
<span style="color: #ff0000;">24</span> <span style="color: #ff0000;">4.2266124</span>  <span style="color: #ff0000;">8.736981</span>  <span style="color: #ff0000;">36.681324</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">41.6683909</span> <span style="color: #ff0000;">21.650185</span>
<span style="color: #ff0000;">25</span> <span style="color: #ff0000;">4.3765719</span>  <span style="color: #ff0000;">9.092109</span>  <span style="color: #ff0000;">39.133045</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">39.7773718</span> <span style="color: #ff0000;">21.089483</span>
<span style="color: #ff0000;">26</span> <span style="color: #ff0000;">4.5265314</span>  <span style="color: #ff0000;">9.463111</span>  <span style="color: #ff0000;">41.584766</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">37.8863527</span> <span style="color: #ff0000;">20.528781</span>
<span style="color: #ff0000;">27</span> <span style="color: #ff0000;">4.6764910</span>  <span style="color: #ff0000;">9.848195</span>  <span style="color: #ff0000;">44.036487</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">35.9953336</span> <span style="color: #ff0000;">19.968079</span>
<span style="color: #ff0000;">28</span> <span style="color: #ff0000;">4.8264505</span> <span style="color: #ff0000;">10.245773</span>  <span style="color: #ff0000;">46.488208</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">34.1043145</span> <span style="color: #ff0000;">19.407377</span>
<span style="color: #ff0000;">29</span> <span style="color: #ff0000;">4.9764100</span> <span style="color: #ff0000;">10.654446</span>  <span style="color: #ff0000;">48.939929</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">32.2132954</span> <span style="color: #ff0000;">18.846675</span>
<span style="color: #ff0000;">30</span> <span style="color: #ff0000;">5.1263695</span> <span style="color: #ff0000;">11.072985</span>  <span style="color: #ff0000;">51.391650</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">30.3222763</span> <span style="color: #ff0000;">18.285973</span>
<span style="color: #ff0000;">31</span> <span style="color: #ff0000;">5.2763291</span> <span style="color: #ff0000;">11.500315</span>  <span style="color: #ff0000;">53.843371</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">28.4312572</span> <span style="color: #ff0000;">17.725271</span>
<span style="color: #ff0000;">32</span> <span style="color: #ff0000;">5.4262886</span> <span style="color: #ff0000;">11.935489</span>  <span style="color: #ff0000;">56.295093</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">26.5402381</span> <span style="color: #ff0000;">17.164569</span>
<span style="color: #ff0000;">33</span> <span style="color: #ff0000;">5.5762481</span> <span style="color: #ff0000;">12.377682</span>  <span style="color: #ff0000;">58.746814</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">24.6492190</span> <span style="color: #ff0000;">16.603867</span>
<span style="color: #ff0000;">34</span> <span style="color: #ff0000;">5.7262076</span> <span style="color: #ff0000;">12.826167</span>  <span style="color: #ff0000;">61.198535</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">22.7581999</span> <span style="color: #ff0000;">16.043165</span>
<span style="color: #ff0000;">35</span> <span style="color: #ff0000;">5.8761671</span> <span style="color: #ff0000;">13.280307</span>  <span style="color: #ff0000;">63.650256</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">20.8671808</span> <span style="color: #ff0000;">15.482463</span>
<span style="color: #ff0000;">36</span> <span style="color: #ff0000;">6.0261267</span> <span style="color: #ff0000;">13.739541</span>  <span style="color: #ff0000;">66.101977</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">18.9761617</span> <span style="color: #ff0000;">14.921761</span>
<span style="color: #ff0000;">37</span> <span style="color: #ff0000;">6.1760862</span> <span style="color: #ff0000;">14.203375</span>  <span style="color: #ff0000;">68.553698</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">17.0851426</span> <span style="color: #ff0000;">14.361059</span>
<span style="color: #ff0000;">38</span> <span style="color: #ff0000;">6.3260457</span> <span style="color: #ff0000;">14.671373</span>  <span style="color: #ff0000;">71.005419</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">15.1941235</span> <span style="color: #ff0000;">13.800357</span>
<span style="color: #ff0000;">39</span> <span style="color: #ff0000;">6.4760052</span> <span style="color: #ff0000;">15.143148</span>  <span style="color: #ff0000;">73.457140</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">13.3031044</span> <span style="color: #ff0000;">13.239655</span>
<span style="color: #ff0000;">40</span> <span style="color: #ff0000;">6.6259648</span> <span style="color: #ff0000;">15.618358</span>  <span style="color: #ff0000;">75.908861</span>  <span style="color: #ff0000;">0.0001000</span> <span style="color: #ff0000;">11.4120853</span> <span style="color: #ff0000;">12.678953</span>
<span style="color: #ff0000;">41</span> <span style="color: #ff0000;">6.7759243</span> <span style="color: #ff0000;">16.096700</span>  <span style="color: #ff0000;">78.360583</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">9.5210662</span> <span style="color: #ff0000;">12.118251</span>
<span style="color: #ff0000;">42</span> <span style="color: #ff0000;">6.9258838</span> <span style="color: #ff0000;">16.577902</span>  <span style="color: #ff0000;">80.812304</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">7.6300471</span> <span style="color: #ff0000;">11.557549</span>
<span style="color: #ff0000;">43</span> <span style="color: #ff0000;">7.0758433</span> <span style="color: #ff0000;">17.061721</span>  <span style="color: #ff0000;">83.264025</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">5.7390280</span> <span style="color: #ff0000;">10.996847</span>
<span style="color: #ff0000;">44</span> <span style="color: #ff0000;">7.2258029</span> <span style="color: #ff0000;">17.547942</span>  <span style="color: #ff0000;">85.715746</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">3.8480089</span> <span style="color: #ff0000;">10.436145</span>
<span style="color: #ff0000;">45</span> <span style="color: #ff0000;">7.3757624</span> <span style="color: #ff0000;">18.036371</span>  <span style="color: #ff0000;">88.167467</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">1.9569898</span>  <span style="color: #ff0000;">9.875443</span>
<span style="color: #ff0000;">46</span> <span style="color: #ff0000;">7.5257219</span> <span style="color: #ff0000;">18.526832</span>  <span style="color: #ff0000;">90.619188</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">0.0659707</span>  <span style="color: #ff0000;">9.314741</span>
<span style="color: #ff0000;">47</span> <span style="color: #ff0000;">7.6756814</span> <span style="color: #ff0000;">19.022418</span>  <span style="color: #ff0000;">92.967202</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">7.032598</span>
<span style="color: #ff0000;">48</span> <span style="color: #ff0000;">7.8256410</span> <span style="color: #ff0000;">19.526363</span>  <span style="color: #ff0000;">95.311472</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">4.688328</span>
<span style="color: #ff0000;">49</span> <span style="color: #ff0000;">7.9756005</span> <span style="color: #ff0000;">20.038043</span>  <span style="color: #ff0000;">97.655743</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">0.0001000</span>  <span style="color: #ff0000;">2.344057</span>
<span style="color: #ff0000;">50</span> <span style="color: #ff0000;">8.1255600</span> <span style="color: #ff0000;">20.556871</span> <span style="color: #ff0000;">100.000000</span>  <span style="color: #ff0000;">0.0000000</span>  <span style="color: #ff0000;">0.0000000</span>  <span style="color: #ff0000;">0.000000</span>
<span style="color: #080;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

**Finally, let’s run the plots**.

Efficient frontier plot:

<div class="wp_codebox_msgheader">
  <span class="right"><sup><a href="http://www.ericbess.com/ericblog/2008/03/03/wp-codebox/#examples" target="_blank" title="WP-CodeBox HowTo?"><span style="color: #99cc00">?</span></a></sup></span><span class="left"><a href="javascript:;" onclick="javascript:showCodeTxt('p843code10'); return false;">View Code</a> RSPLUS</span>
  
  <div class="codebox_clear">
  </div>
</div>

<div class="wp_codebox">
  <table>
    <tr id="p84310">
      <td class="line_numbers">
        <pre>1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
</pre>
      </td>
      
      <td class="code" id="p843code10">
        <pre class="rsplus" style="font-family:monospace;"><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/require.html"><span style="color: #0000FF; font-weight: bold;">require</span></a><span style="color: #080;">&#40;</span>ggplot2<span style="color: #080;">&#41;</span>
&nbsp;
<span style="color: #228B22;"># define colors</span>
dvblue <span style="color: #080;">=</span> <span style="color: #ff0000;">"#000099"</span>
dvred <span style="color: #080;">=</span> <span style="color: #ff0000;">"#e41a1c"</span>
dvgreen <span style="color: #080;">=</span> <span style="color: #ff0000;">"#4daf4a"</span>
dvpurple <span style="color: #080;">=</span> <span style="color: #ff0000;">"#984ea3"</span>
dvorange <span style="color: #080;">=</span> <span style="color: #ff0000;">"#ff7f00"</span>
dvyellow <span style="color: #080;">=</span> <span style="color: #ff0000;">"#ffff33"</span>
dvgray<span style="color: #080;">=</span><span style="color: #ff0000;">"#666666"</span>
&nbsp;
apoints<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span>realsdspct<span style="color: #080;">&#41;</span>
apoints$realreturns <span style="color: #080;">=</span> realreturnspct
ggplot<span style="color: #080;">&#40;</span><span style="color: #0000FF; font-weight: bold;">data</span><span style="color: #080;">=</span>efrontier, aes<span style="color: #080;">&#40;</span>x<span style="color: #080;">=</span>Risk, y<span style="color: #080;">=</span>Return<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    opts<span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/stats/html/title.html"><span style="color: #0000FF; font-weight: bold;">title</span></a><span style="color: #080;">=</span><span style="color: #ff0000;">"Efficient Frontier"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    theme_bw<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    geom_line<span style="color: #080;">&#40;</span>size<span style="color: #080;">=</span><span style="color: #ff0000;">1.4</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    geom_point<span style="color: #080;">&#40;</span>aes<span style="color: #080;">&#40;</span>x<span style="color: #080;">=</span>apoints$realsdspct, y<span style="color: #080;">=</span>apoints$realreturns<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    scale_x_continuous<span style="color: #080;">&#40;</span>limits<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span>,<span style="color: #ff0000;">24</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    annotate<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"text"</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span>,label<span style="color: #080;">=</span><span style="color: #ff0000;">" stocks"</span>, hjust<span style="color: #080;">=</span><span style="color: #ff0000;"></span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    annotate<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"text"</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">2</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">2</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span>,label<span style="color: #080;">=</span><span style="color: #ff0000;">" bills"</span>, hjust<span style="color: #080;">=</span><span style="color: #ff0000;"></span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    annotate<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"text"</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">3</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">3</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span>,label<span style="color: #080;">=</span><span style="color: #ff0000;">" bonds"</span>, hjust<span style="color: #080;">=</span><span style="color: #ff0000;"></span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    annotate<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"text"</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">4</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">4</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span>,label<span style="color: #080;">=</span><span style="color: #ff0000;">" gold"</span>, hjust<span style="color: #080;">=</span><span style="color: #ff0000;"></span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    annotate<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"text"</span>, <span style="color: #ff0000;">19</span>,<span style="color: #ff0000;">0.3</span>,label<span style="color: #080;">=</span><span style="color: #ff0000;">"streeteye.com"</span>, hjust<span style="color: #080;">=</span><span style="color: #ff0000;"></span>, alpha<span style="color: #080;">=</span><span style="color: #ff0000;">0.5</span><span style="color: #080;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>

You should see something like this:

<img class="size-full wp-image-875" title="Efficient Frontier" src="/assets/wp-content/uploads/2012/01/efrontier.png" alt="Efficient Frontier" width="480" height="360" srcset="/assets/wp-content/uploads/2012/01/efrontier.png 480w, /assets/wp-content/uploads/2012/01/efrontier-300x225.png 300w" sizes="(max-width: 480px) 100vw, 480px" /> 

Transition map plot:

<div class="wp_codebox_msgheader">
  <span class="right"><sup><a href="http://www.ericbess.com/ericblog/2008/03/03/wp-codebox/#examples" target="_blank" title="WP-CodeBox HowTo?"><span style="color: #99cc00">?</span></a></sup></span><span class="left"><a href="javascript:;" onclick="javascript:showCodeTxt('p843code11'); return false;">View Code</a> RSPLUS</span>
  
  <div class="codebox_clear">
  </div>
</div>

<div class="wp_codebox">
  <table>
    <tr id="p84311">
      <td class="line_numbers">
        <pre>1
2
3
4
5
6
7
8
9
10
11
12
13
14
</pre>
      </td>
      
      <td class="code" id="p843code11">
        <pre class="rsplus" style="font-family:monospace;"><span style="color: #080;">&gt;</span> keep<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Risk"</span>, <span style="color: #ff0000;">"%Stocks"</span>,<span style="color: #ff0000;">"%Bills"</span>,<span style="color: #ff0000;">"%Bonds"</span>,<span style="color: #ff0000;">"%Gold"</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> efrontier.<span style="">tmp</span> <span style="color: #080;">=</span> efrontier<span style="color: #080;">&#91;</span>keep<span style="color: #080;">&#93;</span>
<span style="color: #080;">&gt;</span> efrontier.<span style="">m</span> <span style="color: #080;">=</span> melt<span style="color: #080;">&#40;</span>efrontier.<span style="">tmp</span>, id <span style="color: #080;">=</span><span style="color: #ff0000;">'Risk'</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span> ggplot<span style="color: #080;">&#40;</span><span style="color: #0000FF; font-weight: bold;">data</span><span style="color: #080;">=</span>efrontier.<span style="">m</span>, aes<span style="color: #080;">&#40;</span>x<span style="color: #080;">=</span>Risk, y<span style="color: #080;">=</span>value, colour<span style="color: #080;">=</span>variable, fill<span style="color: #080;">=</span>variable<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
<span style="color: #080;">+</span>     theme_bw<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
<span style="color: #080;">+</span>     opts<span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/stats/html/title.html"><span style="color: #0000FF; font-weight: bold;">title</span></a><span style="color: #080;">=</span><span style="color: #ff0000;">"Transition Map"</span>, legend.<span style="">position</span><span style="color: #080;">=</span><span style="color: #ff0000;">"top"</span>, legend.<span style="">direction</span><span style="color: #080;">=</span><span style="color: #ff0000;">"horizontal"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
<span style="color: #080;">+</span>     ylab<span style="color: #080;">&#40;</span><span style="color: #ff0000;">'% Portfolio'</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
<span style="color: #080;">+</span>     geom_area<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
<span style="color: #080;">+</span>     scale_colour_manual<span style="color: #080;">&#40;</span><span style="color: #ff0000;">""</span>, breaks<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"%Stocks"</span>, <span style="color: #ff0000;">"%Bills"</span>, <span style="color: #ff0000;">"%Bonds"</span>,<span style="color: #ff0000;">"%Gold"</span><span style="color: #080;">&#41;</span>, values <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>dvblue,dvgreen,dvred,dvyellow<span style="color: #080;">&#41;</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/labels.html"><span style="color: #0000FF; font-weight: bold;">labels</span></a><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'%Stocks'</span>, <span style="color: #ff0000;">'%Bills'</span>,<span style="color: #ff0000;">'%Bonds'</span>,<span style="color: #ff0000;">'%Gold'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
<span style="color: #080;">+</span>     scale_fill_manual<span style="color: #080;">&#40;</span><span style="color: #ff0000;">""</span>, breaks<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"%Stocks"</span>, <span style="color: #ff0000;">"%Bills"</span>, <span style="color: #ff0000;">"%Bonds"</span>,<span style="color: #ff0000;">"%Gold"</span><span style="color: #080;">&#41;</span>, values <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>dvblue,dvgreen,dvred,dvyellow<span style="color: #080;">&#41;</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/labels.html"><span style="color: #0000FF; font-weight: bold;">labels</span></a><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'%Stocks'</span>, <span style="color: #ff0000;">'%Bills'</span>,<span style="color: #ff0000;">'%Bonds'</span>,<span style="color: #ff0000;">'%Gold'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
<span style="color: #080;">+</span>     annotate<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"text"</span>, <span style="color: #ff0000;">16</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">2.5</span>,label<span style="color: #080;">=</span><span style="color: #ff0000;">"streeteye.com"</span>, hjust<span style="color: #080;">=</span><span style="color: #ff0000;"></span>, alpha<span style="color: #080;">=</span><span style="color: #ff0000;">0.5</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&gt;</span> 
<span style="color: #080;">&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

<img class="size-full wp-image-876" title="Transition Map" src="/assets/wp-content/uploads/2012/01/transition.png" alt="Transition Map" width="480" height="360" srcset="/assets/wp-content/uploads/2012/01/transition.png 480w, /assets/wp-content/uploads/2012/01/transition-300x225.png 300w" sizes="(max-width: 480px) 100vw, 480px" /> 

That’s it…If you made it this far, congratulations! A few more R links to frustrate you are below. Now go forth, and enjoy beating your head against the wall!

  * [An Introduction to R](http://cran.r-project.org/doc/manuals/R-intro.html "An Introduction to R")
  * [R Intro for Programmers](http://heather.cs.ucdavis.edu/~matloff/r.old.html#different "R Intro For Programmers")
  * [R for Beginners e-book](http://cran.r-project.org/doc/contrib/Paradis-rdebuts_en.pdf "R for Beginners")
  * [Quick-R](http://www.statmethods.net/index.html "Quick-R")
  * [Survive R](http://www.win-vector.com/blog/2009/09/survive-r/ "Survive R")
  * [R-bloggers](http://www.r-bloggers.com/cpu-and-gpu-trends-over-time/ "R-bloggers")
  * [R Graphical Manual](http://rgm3.lab.nig.ac.jp/RGM/R_image_list?page=417&init=true "R Graphical Manual")
  * [Quantmod](http://www.quantmod.com/examples/intro/ "quantmod")
  * [StackOverflow R tagged questions](http://stackoverflow.com/questions/tagged/r?sort=votes&pagesize=15 "StackOverflow")
  * [The R Journal](http://journal.r-project.org/ "The R Journal") ([Older issues](http://cran.r-project.org/doc/Rnews/ "R News Older issues"))
  * [RSeek R-related search engine](http://rseek.org/ "RSeek")
