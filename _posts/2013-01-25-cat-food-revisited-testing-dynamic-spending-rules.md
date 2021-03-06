---
id: 1429
title: '‘Cat Food’ revisited: testing dynamic spending rules - Part 1'
date: 2013-01-25T20:08:34+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=1429
permalink: /2013/01/cat-food-revisited-testing-dynamic-spending-rules/
post-views:
  - "6818"
dsq_thread_id:
  - "1047006960"
categories:
  - investing
tags:
  - investing
---
> *How much can you safely spend out of a portfolio in retirement? Spend conservatively and you may be unnecessarily curbing the lifestyle and aspirations of you and your loved ones. Overspend and risk a shortfall and painful adjustment - in the extreme, the (hopefully apocryphal) “cat food” diet.*
<!--more-->
A traditional rule of thumb is [a fixed 4% per year](http://online.wsj.com/article/SB10001424052970203960804577241143142670660.html "WSJ: Testing the 4%-a-Year Retirement Rule") of your starting portfolio, adjusted each year for inflation. [A previous post](/2011/08/cat-food-in-an-age-of-diminished-expectations/) discussed why this rule may not be safe:

  * [Low bond yields](http://www.federalreserve.gov/releases/h15/update/ "Federal Reserve H. 15") _ 1.8% for 10-year Treasurys and negative TIPS out to 10 years _ mean historical bond returns are mathematically unobtainable.<sup>1</sup>
  * 2.2% real returns since 2000 on a 60/40 blended portfolio suggest that long-run return expectations need to be revisited. Low long-term interest rates are a forecast of low future returns, ie low growth and inflation expectations. To the extent equity risk premiums haven’t widened, they forecast lower than normal equity returns.
  * Taxes and investment expenses must be included. Work supporting 4% tends to ignore them.
  * US demographics are not very positive for growth, inflation, tax rates, and hence, real after-tax investment returns (which is reflected in the US fiscal position). [The US dependency ratio](http://www.census.gov/prod/2010pubs/p25-1138.pdf "Census population projections") is forecast to rise by 15 points over the next 20 years.

If the 4% rule hasn’t been decisively breached, forward-looking indicators are a bit worrisome. Could a more flexible rule not only be safer, but in favorable circumstances allow a higher level of spending? In this 3-part post, we test dynamic rules that vary withdrawal rates based on age and the size of the portfolio, and vary the composition of the portfolio over time.  
<!--more-->

  
_Dynamic rule 1: Vary spending by age._

The first rule we’ll test is to spend a percentage of the _actual_ portfolio each year (not a fixed percentage of the _initial_ portfolio) and vary the percentage by age.

Suppose you are a 65 year old male. You have a life expectancy of 17.19 years per [US government actuarial tables](http://www.ssa.gov/oact/STATS/table4c6.html "Social Security life table"). It would make sense to vary spending as a percentage of your assets inversely with your life expectancy. As a base case you could spend 1/17.19=5.82% of your portfolio this year. Next year your life expectancy would be 16.48% You would spend 1/16.48=6.07%. This is higher than 4% for life expectancy < 25 years, but it’s an arbitrary base case _ just a starting point to test a rule based on the size of the portfolio and life expectancy.

Let’s apply this rule to a 60/40 stock/bond portfolio for someone who retired in 1928 to and see what spending it would have supported.

_Figure 1. Inflation-adjusted spending for a 65-year-old single male who retires in 1928, with dynamic spending rule of 1/life_expectancy (spending factor=1) v. survival rate_

[<img src="/assets/wp-content/uploads/2013/01/Rplot08.png" alt="Income v. Survival, 1928 males, 60/40 portfolio, spending factor 1" title="Income v. Survival, 1928 males, 60/40 portfolio, spending factor 1" width="480" height="320" class="aligncenter size-full wp-image-1648" srcset="/assets/wp-content/uploads/2013/01/Rplot08.png 480w, /assets/wp-content/uploads/2013/01/Rplot08-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" />](/assets/wp-content/uploads/2013/01/Rplot08.png)

This retiree would have experienced volatility, but he would really have started to go broke after around 1947, aged 85, shortly after his original life expectancy at retirement. From the blue survival line (from [current life expectancy tables](http://www.ssa.gov/oact/STATS/table4c6.html "SSA.gov Actuarial Life Table")), over 40% would still have been alive for that drop. If he lived to be 100 after 35 years in 1963, he would have been penniless.

Is this rule too spendthrift, or was 1928 a particularly bad year to start retirement? Let’s try the same rule in all available 35-year retirement cohorts 1928-1977, and plot their average spending.

<center>
  <em>Figure 2. Average spending, 60/40 portfolio, spending factor 1, retirement age 65, all cohorts</em>
</center>

[<img src="/assets/wp-content/uploads/2013/01/Rplot09.png" alt="Average spending, 60/40 portfolio, spending factor 1, retirement age 65, all cohorts" title="Average spending, 60/40 portfolio, spending factor 1, retirement age 65, all cohorts" width="480" height="320" class="aligncenter size-full wp-image-1658" srcset="/assets/wp-content/uploads/2013/01/Rplot09.png 480w, /assets/wp-content/uploads/2013/01/Rplot09-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" />](/assets/wp-content/uploads/2013/01/Rplot09.png)

The middle blue line is the average income by retirement year. The green and red are the best and worst cases. The middle 2 lines represent the +/- 1 standard deviation confidence interval.

Even in the best case, you eventually go broke. Your life expectancy is 17.2 years at retirement, and on average your spending goes below the starting amount around year 19. This spending rule may not conservative enough.

Let’s call _s_ spending factor, and try different spending rates _s_/life_expectancy. We can run spending factors between 0.05 and 1.2: _<a title="Average spending, all cohorts, by spending factor" href="/assets/wp-content/uploads/2013/01/Rplot10.png" target="_blank">Figure 3. Big chart panel (opens in new window)</a>_. As we move toward the top of the page, we see safer profiles, and even the worst case scenarios start to seem fairly acceptable.

This exercise demonstrates the tradeoff between spending, and the risk of the average or worst-case income path exhibiting a major shortfall from the starting income.

To better visualize this big panel, we can estimate ‘lifetime spend expectancy’ and shortfall probability for each spending factor.

<center>
  <em>Figure 4. Lifetime spending expectancy (% of initial portfolio) v. spending factor</em>
</center>

[<img src="/assets/wp-content/uploads/2013/01/Rplot13.png" alt="Lifetime spend expectancy v. spending factor" title="Lifetime spend expectancy v. spending factor" width="480" height="320" class="aligncenter size-full wp-image-1667" srcset="/assets/wp-content/uploads/2013/01/Rplot13.png 480w, /assets/wp-content/uploads/2013/01/Rplot13-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" />](/assets/wp-content/uploads/2013/01/Rplot13.png)

In Figure 4, for each year, we multiply the spending outcome by the probability of a cohort retiree surviving to that year, and sum up the years, to get the lifetime spend expectancy for a given spending factor. This summarizes each line in the Figure 3 panel as a single point, the expected lifetime spending as a percentage of starting portfolio.

<center>
  <em>Figure 5. Probability of spending shortfall v. spending factor.</em>
</center>

[<img src="/assets/wp-content/uploads/2013/01/Rplot15.png" alt="Probability of spending shortfall v. spending factor" title="Probability of spending shortfall v. spending factor" width="480" height="320" class="aligncenter size-full wp-image-1727" srcset="/assets/wp-content/uploads/2013/01/Rplot15.png 480w, /assets/wp-content/uploads/2013/01/Rplot15-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" />](/assets/wp-content/uploads/2013/01/Rplot15.png)

In Figure 5, for each _s_, we calculate the percentage of retirees in all cohorts who survived to a year where the spending falls to 25% below the initial spending.

These last 2 charts illustrate that as you increase the spending factor past 0.6, increasing lifetime spend expectancy flattens out, and the probability of 25% shortfall accelerates sharply. 

Finally, how does the fixed 4% rule compare? For a 65-year-old with a 60/40 portfolio, the 4% rule yields 70.4 expected lifetime spending with a 2% lifetime shortfall probability. 

By comparison, a 0.5 spending factor, which starts at about 3% spending, yields expected spending of 91.2 with a 9.7% probability of a 25% drop from the initial spend amount, and a worst case drop of 37% (for 1973 retirees _ they eventually recovered). 

But you do start at a lower rate, and spending is variable.

<center>
  <em>Figure 6. Average spending by retirement year, all cohorts, spending factor 0.5.</em>
</center>

[<img src="/assets/wp-content/uploads/2013/01/Rplot45.png" alt="Average spending, all cohorts, spending factor 0.5" title="Average spending, all cohorts, spending factor 0.5" width="480" height="320" class="aligncenter size-full wp-image-1828" srcset="/assets/wp-content/uploads/2013/01/Rplot45.png 480w, /assets/wp-content/uploads/2013/01/Rplot45-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" />](/assets/wp-content/uploads/2013/01/Rplot45.png)

<center>
  <em>Figure 7. Average spending by retirement year, all cohorts, fixed 4% rule</em>
</center>

[<img src="/assets/wp-content/uploads/2013/01/Rplot50.png" alt="Average spending by retirement year, all cohorts, Fixed 4% rule" title="Average spending by retirement year, all cohorts, Fixed 4% rule" width="480" height="320" class="aligncenter size-full wp-image-1838" srcset="/assets/wp-content/uploads/2013/01/Rplot50.png 480w, /assets/wp-content/uploads/2013/01/Rplot50-300x200.png 300w" sizes="(max-width: 480px) 100vw, 480px" />](/assets/wp-content/uploads/2013/01/Rplot50.png)  
In the next post, we’ll test additional rules, to vary the composition of the portfolio by age, and to try smooth spending.

<small><br /> <sup>1</sup>The objection has been made that today’s rates can go lower and bond returns can be higher in the short run. True, but a 10-year bond bought at a yield of 1.8% will return, best case, 1.8% nominal over its lifetime (less in the event of default). If the yield goes to zero this year, it will return 18% this year, and zero over the rest of its lifetime. It’s called “fixed” income for a reason. When interest rates are below inflation, thinking bonds can be a real total return instrument in the base case is setting up for disappointment. It hasn’t been true historically, and it’s not what the market is pricing in. Bonds still have an important role as a liquidity and deflation hedge.<br /> </small>

<div class="wp_codebox_msgheader wp_codebox_hide">
  <span class="right"><sup><a href="http://www.ericbess.com/ericblog/2008/03/03/wp-codebox/#examples" target="_blank" title="WP-CodeBox HowTo?"><span style="color: #99cc00">?</span></a></sup></span><span class="left"><a href="javascript:;" onclick="javascript:showCodeTxt('p1429code14'); return false;">View Code</a> RSPLUS</span>
  
  <div class="codebox_clear">
  </div>
</div>

<div class="wp_codebox">
  <table>
    <tr id="p142914">
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
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
</pre>
      </td>
      
      <td class="code" id="p1429code14">
        <pre class="rsplus" style="font-family:monospace;">ageframe <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a> <span style="color: #080;">&#40;</span>lifetable, age, maxage<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#123;</span>
    <span style="color: #0000FF; font-weight: bold;">start</span> <span style="color: #080;">=</span> age<span style="color: #080;">+</span><span style="color: #ff0000;">1</span>
    <span style="color: #0000FF; font-weight: bold;">end</span><span style="color: #080;">=</span>maxage<span style="color: #080;">+</span><span style="color: #ff0000;">1</span>
    keep <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Age"</span>,<span style="color: #ff0000;">"Mmort"</span>,<span style="color: #ff0000;">"Mlives"</span>,<span style="color: #ff0000;">"MLE"</span><span style="color: #080;">&#41;</span>
    retframe <span style="color: #080;">=</span> lifetable<span style="color: #080;">&#91;</span><span style="color: #0000FF; font-weight: bold;">start</span><span style="color: #080;">:</span><span style="color: #0000FF; font-weight: bold;">end</span>,keep<span style="color: #080;">&#93;</span>
    retframe$survivepct<span style="color: #080;">=</span>retframe$Mlives<span style="color: #080;">/</span>retframe<span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span>,<span style="color: #ff0000;">"Mlives"</span><span style="color: #080;">&#93;</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/return.html"><span style="color: #0000FF; font-weight: bold;">return</span></a><span style="color: #080;">&#40;</span>retframe<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#125;</span>
&nbsp;
cohortframe <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a> <span style="color: #080;">&#40;</span>ageframe, portframe, startyear<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#123;</span>
    retframe <span style="color: #080;">&lt;-</span>ageframe
    retireyears<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">&#40;</span>ageframe<span style="color: #080;">&#41;</span>
    endyear <span style="color: #080;">=</span> startyear<span style="color: #080;">+</span>retireyears<span style="color: #080;">-</span><span style="color: #ff0000;">1</span>
    retframe$portreturn <span style="color: #080;">=</span> portframe<span style="color: #080;">&#91;</span>startyear<span style="color: #080;">:</span>endyear,<span style="color: #ff0000;">"portreturn"</span><span style="color: #080;">&#93;</span>
    retframe$year <span style="color: #080;">=</span> portframe<span style="color: #080;">&#91;</span>startyear<span style="color: #080;">:</span>endyear,<span style="color: #ff0000;">"Year"</span><span style="color: #080;">&#93;</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/return.html"><span style="color: #0000FF; font-weight: bold;">return</span></a><span style="color: #080;">&#40;</span>retframe<span style="color: #080;">&#41;</span>
&nbsp;
<span style="color: #080;">&#125;</span>
&nbsp;
calcspending <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a><span style="color: #080;">&#40;</span>cohortframe, spendingfactor<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#123;</span>
    retframe <span style="color: #080;">&lt;-</span> cohortframe
    retframe$spend<span style="color: #080;">=</span><span style="color: #ff0000;"></span>
    retframe$startportval<span style="color: #080;">=</span><span style="color: #ff0000;"></span>
    retframe$endportval<span style="color: #080;">=</span><span style="color: #ff0000;"></span>
    portval<span style="color: #080;">=</span><span style="color: #ff0000;">100</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/for.html"><span style="color: #0000FF; font-weight: bold;">for</span></a> <span style="color: #080;">&#40;</span>index <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">&#40;</span>retframe<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
        myrow <span style="color: #080;">=</span> retframe<span style="color: #080;">&#91;</span>index,<span style="color: #080;">&#93;</span>
        myrow<span style="color: #080;">&#91;</span><span style="color: #ff0000;">"startportval"</span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span>portval
        spendrate <span style="color: #080;">=</span> spendingfactor<span style="color: #080;">/</span>myrow<span style="color: #080;">&#91;</span><span style="color: #ff0000;">"MLE"</span><span style="color: #080;">&#93;</span>
        spend <span style="color: #080;">=</span> spendrate <span style="color: #080;">*</span> portval
        myrow<span style="color: #080;">&#91;</span><span style="color: #ff0000;">"spend"</span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span>spend
        portval <span style="color: #080;">=</span> portval <span style="color: #080;">-</span> spend
        portval <span style="color: #080;">=</span> portval <span style="color: #080;">*</span> <span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span> <span style="color: #080;">+</span> myrow<span style="color: #080;">&#91;</span><span style="color: #ff0000;">"portreturn"</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
        myrow<span style="color: #080;">&#91;</span><span style="color: #ff0000;">"endportval"</span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span>portval
        retframe<span style="color: #080;">&#91;</span>index,<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>myrow
    <span style="color: #080;">&#125;</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/return.html"><span style="color: #0000FF; font-weight: bold;">return</span></a><span style="color: #080;">&#40;</span>retframe<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#125;</span>
&nbsp;
calcspendingfixed <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a><span style="color: #080;">&#40;</span>cohortframe, spendingfactor<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#123;</span>
    retframe <span style="color: #080;">&lt;-</span> cohortframe
    retframe$spend<span style="color: #080;">=</span><span style="color: #ff0000;"></span>
    retframe$startportval<span style="color: #080;">=</span><span style="color: #ff0000;"></span>
    retframe$endportval<span style="color: #080;">=</span><span style="color: #ff0000;"></span>
    portval<span style="color: #080;">=</span><span style="color: #ff0000;">100</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/for.html"><span style="color: #0000FF; font-weight: bold;">for</span></a> <span style="color: #080;">&#40;</span>index <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">&#40;</span>retframe<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
        myrow <span style="color: #080;">=</span> retframe<span style="color: #080;">&#91;</span>index,<span style="color: #080;">&#93;</span>
        myrow<span style="color: #080;">&#91;</span><span style="color: #ff0000;">"startportval"</span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span>portval
        <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/if.html"><span style="color: #0000FF; font-weight: bold;">if</span></a> <span style="color: #080;">&#40;</span> portval <span style="color: #080;">&gt;</span> <span style="color: #ff0000;">4</span><span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
            spend <span style="color: #080;">=</span> <span style="color: #ff0000;">4</span>
        <span style="color: #080;">&#125;</span> <span style="color: #0000FF; font-weight: bold;">else</span> <span style="color: #080;">&#123;</span>
            spend <span style="color: #080;">&lt;-</span> portval
        <span style="color: #080;">&#125;</span>
        myrow<span style="color: #080;">&#91;</span><span style="color: #ff0000;">"spend"</span><span style="color: #080;">&#93;</span> <span style="color: #080;">&lt;-</span> spend
&nbsp;
        portval <span style="color: #080;">=</span> portval <span style="color: #080;">-</span> spend
        portval <span style="color: #080;">=</span> portval <span style="color: #080;">*</span> <span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span> <span style="color: #080;">+</span> myrow<span style="color: #080;">&#91;</span><span style="color: #ff0000;">"portreturn"</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
        myrow<span style="color: #080;">&#91;</span><span style="color: #ff0000;">"endportval"</span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span>portval
        retframe<span style="color: #080;">&#91;</span>index,<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>myrow
    <span style="color: #080;">&#125;</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/return.html"><span style="color: #0000FF; font-weight: bold;">return</span></a><span style="color: #080;">&#40;</span>retframe<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#125;</span>
&nbsp;
testspendingfactor <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a><span style="color: #080;">&#40;</span>realreturns, spendingfactor, minage, maxage<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#123;</span>
    tempageframe <span style="color: #080;">&lt;-</span> ageframe<span style="color: #080;">&#40;</span>lifetable, minage, maxage<span style="color: #080;">&#41;</span>
    ntrials <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">&#40;</span>realreturns<span style="color: #080;">&#41;</span><span style="color: #080;">-</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">&#40;</span>tempageframe<span style="color: #080;">&#41;</span> <span style="color: #080;">+</span><span style="color: #ff0000;">1</span>
    nyears <span style="color: #080;">&lt;-</span> maxage<span style="color: #080;">-</span>minage<span style="color: #080;">+</span><span style="color: #ff0000;">1</span>
    trials <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span><span style="color: #080;">:</span>nyears<span style="color: #080;">&#41;</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/colnames.html"><span style="color: #0000FF; font-weight: bold;">colnames</span></a><span style="color: #080;">&#40;</span>trials<span style="color: #080;">&#41;</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"age"</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/for.html"><span style="color: #0000FF; font-weight: bold;">for</span></a> <span style="color: #080;">&#40;</span>index <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span>ntrials<span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
        tempframe1 <span style="color: #080;">=</span> cohortframe<span style="color: #080;">&#40;</span>tempageframe,realreturns,index<span style="color: #080;">&#41;</span>
        tempframe2 <span style="color: #080;">=</span> calcspending<span style="color: #080;">&#40;</span>tempframe1,spendingfactor<span style="color: #080;">&#41;</span>
        colname <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/paste.html"><span style="color: #0000FF; font-weight: bold;">paste</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"trial"</span>,index, sep<span style="color: #080;">=</span><span style="color: #ff0000;">""</span><span style="color: #080;">&#41;</span>
        trials<span style="color: #080;">&#91;</span>colname<span style="color: #080;">&#93;</span> <span style="color: #080;">&lt;-</span> tempframe2$spend
    <span style="color: #080;">&#125;</span>
&nbsp;
    trials <span style="color: #080;">&lt;-</span> trials<span style="color: #080;">&#91;</span><span style="color: #ff0000;">2</span><span style="color: #080;">:</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/ncol.html"><span style="color: #0000FF; font-weight: bold;">ncol</span></a><span style="color: #080;">&#40;</span>trials<span style="color: #080;">&#41;</span><span style="color: #080;">&#93;</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/return.html"><span style="color: #0000FF; font-weight: bold;">return</span></a><span style="color: #080;">&#40;</span>trials<span style="color: #080;">&#41;</span>
&nbsp;
<span style="color: #080;">&#125;</span>
&nbsp;
testspendingfactorfixed <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a><span style="color: #080;">&#40;</span>realreturns, spendingfactor, minage, maxage<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#123;</span>
    tempageframe <span style="color: #080;">&lt;-</span> ageframe<span style="color: #080;">&#40;</span>lifetable, minage, maxage<span style="color: #080;">&#41;</span>
    ntrials <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">&#40;</span>realreturns<span style="color: #080;">&#41;</span><span style="color: #080;">-</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">&#40;</span>tempageframe<span style="color: #080;">&#41;</span> <span style="color: #080;">+</span><span style="color: #ff0000;">1</span>
    nyears <span style="color: #080;">&lt;-</span> maxage<span style="color: #080;">-</span>minage<span style="color: #080;">+</span><span style="color: #ff0000;">1</span>
    trials <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span><span style="color: #080;">:</span>nyears<span style="color: #080;">&#41;</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/colnames.html"><span style="color: #0000FF; font-weight: bold;">colnames</span></a><span style="color: #080;">&#40;</span>trials<span style="color: #080;">&#41;</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"age"</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/for.html"><span style="color: #0000FF; font-weight: bold;">for</span></a> <span style="color: #080;">&#40;</span>index <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span>ntrials<span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
        tempframe1 <span style="color: #080;">=</span> cohortframe<span style="color: #080;">&#40;</span>tempageframe,realreturns,index<span style="color: #080;">&#41;</span>
        tempframe2 <span style="color: #080;">=</span> calcspendingfixed<span style="color: #080;">&#40;</span>tempframe1,spendingfactor<span style="color: #080;">&#41;</span>
        colname <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/paste.html"><span style="color: #0000FF; font-weight: bold;">paste</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"trial"</span>,index, sep<span style="color: #080;">=</span><span style="color: #ff0000;">""</span><span style="color: #080;">&#41;</span>
        trials<span style="color: #080;">&#91;</span>colname<span style="color: #080;">&#93;</span> <span style="color: #080;">&lt;-</span> tempframe2$spend
    <span style="color: #080;">&#125;</span>
&nbsp;
    trials <span style="color: #080;">&lt;-</span> trials<span style="color: #080;">&#91;</span><span style="color: #ff0000;">2</span><span style="color: #080;">:</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/ncol.html"><span style="color: #0000FF; font-weight: bold;">ncol</span></a><span style="color: #080;">&#40;</span>trials<span style="color: #080;">&#41;</span><span style="color: #080;">&#93;</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/return.html"><span style="color: #0000FF; font-weight: bold;">return</span></a><span style="color: #080;">&#40;</span>trials<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#125;</span>
&nbsp;
calctrialssummary <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a><span style="color: #080;">&#40;</span>trials<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#123;</span>
    trialssummary <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span><span style="color: #080;">:</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">&#40;</span>trials<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/colnames.html"><span style="color: #0000FF; font-weight: bold;">colnames</span></a><span style="color: #080;">&#40;</span>trialssummary<span style="color: #080;">&#41;</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"year"</span>
    trialssummary$mean<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>trials,<span style="color: #ff0000;">1</span>,<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/mean.html"><span style="color: #0000FF; font-weight: bold;">mean</span></a><span style="color: #080;">&#41;</span>
&nbsp;
    trialssummary$max<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>trials,<span style="color: #ff0000;">1</span>,<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/max.html"><span style="color: #0000FF; font-weight: bold;">max</span></a><span style="color: #080;">&#41;</span>
    trialssummary$min<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>trials,<span style="color: #ff0000;">1</span>,<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/min.html"><span style="color: #0000FF; font-weight: bold;">min</span></a><span style="color: #080;">&#41;</span>
    trialssummary$sd<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>trials,<span style="color: #ff0000;">1</span>,<span style="color: #0000FF; font-weight: bold;">sd</span><span style="color: #080;">&#41;</span>
    trialssummary$plus1sd<span style="color: #080;">=</span>trialssummary$mean <span style="color: #080;">+</span> trialssummary$sd
    trialssummary$minus1sd<span style="color: #080;">=</span>trialssummary$mean <span style="color: #080;">-</span> trialssummary$sd
    keep <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"year"</span>, <span style="color: #ff0000;">"mean"</span>,<span style="color: #ff0000;">"min"</span>,<span style="color: #ff0000;">"max"</span>,<span style="color: #ff0000;">"minus1sd"</span>,<span style="color: #ff0000;">"plus1sd"</span><span style="color: #080;">&#41;</span>
    trialssummary <span style="color: #080;">&lt;-</span> trialssummary<span style="color: #080;">&#91;</span>,keep<span style="color: #080;">&#93;</span>
&nbsp;
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/return.html"><span style="color: #0000FF; font-weight: bold;">return</span></a><span style="color: #080;">&#40;</span>trialssummary<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#125;</span>
&nbsp;
&nbsp;
calcexpectedspending<span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a><span style="color: #080;">&#40;</span>trials, survival<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#123;</span>
    trialssummary <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span><span style="color: #080;">:</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">&#40;</span>trials<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/colnames.html"><span style="color: #0000FF; font-weight: bold;">colnames</span></a><span style="color: #080;">&#40;</span>trialssummary<span style="color: #080;">&#41;</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"year"</span>
&nbsp;
    trialssummary$survivepct<span style="color: #080;">=</span>survival$survivepct
    trialssummary$mean<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>trials,<span style="color: #ff0000;">1</span>,<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/mean.html"><span style="color: #0000FF; font-weight: bold;">mean</span></a><span style="color: #080;">&#41;</span>
    trialssummary$expmean<span style="color: #080;">=</span> trialssummary$mean <span style="color: #080;">*</span> trialssummary$survivepct
    trialssummary$max<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>trials,<span style="color: #ff0000;">1</span>,<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/max.html"><span style="color: #0000FF; font-weight: bold;">max</span></a><span style="color: #080;">&#41;</span>
    trialssummary$expmax<span style="color: #080;">=</span> trialssummary$max <span style="color: #080;">*</span> trialssummary$survivepct
    trialssummary$min<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>trials,<span style="color: #ff0000;">1</span>,<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/min.html"><span style="color: #0000FF; font-weight: bold;">min</span></a><span style="color: #080;">&#41;</span>
    trialssummary$expmin<span style="color: #080;">=</span> trialssummary$min <span style="color: #080;">*</span> trialssummary$survivepct
    trialssummary$sd<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>trials,<span style="color: #ff0000;">1</span>,<span style="color: #0000FF; font-weight: bold;">sd</span><span style="color: #080;">&#41;</span>
    trialssummary$plus1sd<span style="color: #080;">=</span>trialssummary$mean <span style="color: #080;">+</span> trialssummary$sd
    trialssummary$expplus1sd<span style="color: #080;">=</span> trialssummary$plus1sd <span style="color: #080;">*</span> trialssummary$survivepct
    trialssummary$minus1sd<span style="color: #080;">=</span>trialssummary$mean <span style="color: #080;">-</span> trialssummary$sd
    trialssummary$expminus1sd<span style="color: #080;">=</span> trialssummary$minus1sd <span style="color: #080;">*</span> trialssummary$survivepct
&nbsp;
    keep <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"year"</span>, <span style="color: #ff0000;">"expmean"</span>,<span style="color: #ff0000;">"expmin"</span>,<span style="color: #ff0000;">"expmax"</span>, <span style="color: #ff0000;">"expplus1sd"</span>, <span style="color: #ff0000;">"expminus1sd"</span><span style="color: #080;">&#41;</span>
    trialssummary <span style="color: #080;">&lt;-</span> trialssummary<span style="color: #080;">&#91;</span>,keep<span style="color: #080;">&#93;</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/return.html"><span style="color: #0000FF; font-weight: bold;">return</span></a><span style="color: #080;">&#40;</span>trialssummary<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#125;</span>
&nbsp;
chartsummary <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a><span style="color: #080;">&#40;</span>trialssummary, mytitle<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#123;</span>
    meltframe <span style="color: #080;">&lt;-</span> melt<span style="color: #080;">&#40;</span>trialssummary, id <span style="color: #080;">=</span> <span style="color: #ff0000;">'year'</span><span style="color: #080;">&#41;</span>
    ggplot<span style="color: #080;">&#40;</span><span style="color: #0000FF; font-weight: bold;">data</span><span style="color: #080;">=</span>meltframe, aes<span style="color: #080;">&#40;</span>x<span style="color: #080;">=</span>year, y<span style="color: #080;">=</span>value, colour<span style="color: #080;">=</span>variable<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     scale_x_continuous<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     ylab<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Annual spending (% of initial portfolio)"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     xlab<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Retirement year"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     theme_bw<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     geom_line<span style="color: #080;">&#40;</span>size<span style="color: #080;">=</span><span style="color: #ff0000;">1.4</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     opts<span style="color: #080;">&#40;</span>legend.<span style="">position</span><span style="color: #080;">=</span><span style="color: #ff0000;">"top"</span>,
          legend.<span style="">direction</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">'horizontal'</span>,
          plot.<span style="">background</span> <span style="color: #080;">=</span> theme_rect<span style="color: #080;">&#40;</span>colour <span style="color: #080;">=</span> <span style="color: #ff0000;">'black'</span>, fill <span style="color: #080;">=</span> <span style="color: #ff0000;">'#CCCCEE'</span>, size <span style="color: #080;">=</span> <span style="color: #ff0000;">1</span>, linetype<span style="color: #080;">=</span><span style="color: #ff0000;">'solid'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     scale_colour_manual<span style="color: #080;">&#40;</span>mytitle, breaks <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'mean'</span>, <span style="color: #ff0000;">'min'</span>,<span style="color: #ff0000;">'max'</span>,<span style="color: #ff0000;">'minus1sd'</span>,<span style="color: #ff0000;">'plus1sd'</span><span style="color: #080;">&#41;</span>,
                         values <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"#000099"</span>, <span style="color: #ff0000;">"#CC0000"</span>,<span style="color: #ff0000;">"#009900"</span>,<span style="color: #ff0000;">"#999999"</span>,<span style="color: #ff0000;">"#999999"</span><span style="color: #080;">&#41;</span>,
                        <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/labels.html"><span style="color: #0000FF; font-weight: bold;">labels</span></a> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'Average Spend'</span>, <span style="color: #ff0000;">'Minimum'</span>, <span style="color: #ff0000;">'Maximum'</span>, <span style="color: #ff0000;">'-1 SD'</span>, <span style="color: #ff0000;">'+1SD'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&#125;</span>
&nbsp;
<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/library.html"><span style="color: #0000FF; font-weight: bold;">library</span></a><span style="color: #080;">&#40;</span>ggplot2<span style="color: #080;">&#41;</span>
&nbsp;
returns <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">read.<span style="">csv</span></span><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"~/Documents/returns.csv"</span><span style="color: #080;">&#41;</span>  <span style="color: #228B22;"># /assets/wp-content/uploads/2013/01/returns.csv</span>
lifetable <span style="color: #080;">&lt;-</span> <span style="color: #0000FF; font-weight: bold;">read.<span style="">csv</span></span><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"~/Documents/Lifetable.csv"</span><span style="color: #080;">&#41;</span> <span style="color: #228B22;"># /assets/wp-content/uploads/2013/01/Lifetable.csv</span>
&nbsp;
returns$realstocks<span style="color: #080;">=</span>returns$Stocks<span style="color: #080;">-</span>returns$CPI
returns$realbonds<span style="color: #080;">=</span>returns$Bonds<span style="color: #080;">-</span>returns$CPI
returns$realbills<span style="color: #080;">=</span>returns$Bills<span style="color: #080;">-</span>returns$CPI
&nbsp;
drops <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Stocks"</span>,<span style="color: #ff0000;">"Bonds"</span>,<span style="color: #ff0000;">"Bills"</span>,<span style="color: #ff0000;">"CPI"</span><span style="color: #080;">&#41;</span>
realreturns <span style="color: #080;">&lt;-</span> returns<span style="color: #080;">&#91;</span>,<span style="color: #080;">!</span><span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/names.html"><span style="color: #0000FF; font-weight: bold;">names</span></a><span style="color: #080;">&#40;</span>returns<span style="color: #080;">&#41;</span> <span style="color: #080;">%</span>in<span style="color: #080;">%</span> drops<span style="color: #080;">&#41;</span><span style="color: #080;">&#93;</span>
realreturns$portreturn <span style="color: #080;">=</span> <span style="color: #ff0000;">0.6</span><span style="color: #080;">*</span>realreturns$realstocks <span style="color: #080;">+</span> <span style="color: #ff0000;">0.4</span> <span style="color: #080;">*</span>realreturns$realbonds
&nbsp;
<span style="color: #228B22;">#Figure 1</span>
&nbsp;
tempageframe <span style="color: #080;">&lt;-</span> ageframe<span style="color: #080;">&#40;</span>lifetable, <span style="color: #ff0000;">65</span>, <span style="color: #ff0000;">100</span><span style="color: #080;">&#41;</span>
tempframe1 <span style="color: #080;">=</span> cohortframe<span style="color: #080;">&#40;</span>tempageframe,realreturns,<span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span>
tempframe2 <span style="color: #080;">=</span> calcspending<span style="color: #080;">&#40;</span>tempframe1,<span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span>
tempframe2$survival65 <span style="color: #080;">=</span> tempframe2$survivepct <span style="color: #080;">*</span> <span style="color: #ff0000;">10000</span>
tempframe2$spend <span style="color: #080;">=</span> tempframe2$spend <span style="color: #080;">*</span> <span style="color: #ff0000;">1000</span>
keep <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"year"</span>,<span style="color: #ff0000;">"spend"</span>,<span style="color: #ff0000;">"survival65"</span> <span style="color: #080;">&#41;</span>
tempframe2 <span style="color: #080;">&lt;-</span> tempframe2<span style="color: #080;">&#91;</span>,keep<span style="color: #080;">&#93;</span>
meltframe <span style="color: #080;">&lt;-</span> melt<span style="color: #080;">&#40;</span>tempframe2, id <span style="color: #080;">=</span> <span style="color: #ff0000;">'year'</span><span style="color: #080;">&#41;</span>
&nbsp;
ggplot<span style="color: #080;">&#40;</span><span style="color: #0000FF; font-weight: bold;">data</span><span style="color: #080;">=</span>meltframe, aes<span style="color: #080;">&#40;</span>x<span style="color: #080;">=</span>year, y<span style="color: #080;">=</span>value, colour<span style="color: #080;">=</span>variable<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     scale_x_continuous<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     ylab<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Spend"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     xlab<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Year"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     theme_bw<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     geom_line<span style="color: #080;">&#40;</span>size<span style="color: #080;">=</span><span style="color: #ff0000;">1.4</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     opts<span style="color: #080;">&#40;</span>legend.<span style="">position</span><span style="color: #080;">=</span><span style="color: #ff0000;">"top"</span>,
          legend.<span style="">direction</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">'horizontal'</span>,
          plot.<span style="">background</span> <span style="color: #080;">=</span> theme_rect<span style="color: #080;">&#40;</span>colour <span style="color: #080;">=</span> <span style="color: #ff0000;">'black'</span>, fill <span style="color: #080;">=</span> <span style="color: #ff0000;">'#CCCCEE'</span>, size <span style="color: #080;">=</span> <span style="color: #ff0000;">1</span>, linetype<span style="color: #080;">=</span><span style="color: #ff0000;">'solid'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
     scale_colour_manual<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Annual spending, retirement age 65, 60/40 portfolio, spending factor 1, 1928 cohort"</span>, breaks <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'spend'</span>, <span style="color: #ff0000;">'survival65'</span><span style="color: #080;">&#41;</span>,
                         values <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"#CC0000"</span>, <span style="color: #ff0000;">"#000099"</span><span style="color: #080;">&#41;</span>,
                        <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/labels.html"><span style="color: #0000FF; font-weight: bold;">labels</span></a> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'Annual Spend'</span>, <span style="color: #ff0000;">'Survivors from starting 10,000'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
&nbsp;
&nbsp;
<span style="color: #228B22;">#Figure 2</span>
trials <span style="color: #080;">=</span> testspendingfactor<span style="color: #080;">&#40;</span>realreturns, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">65</span>, <span style="color: #ff0000;">100</span><span style="color: #080;">&#41;</span>
trialssummary <span style="color: #080;">=</span> calctrialssummary<span style="color: #080;">&#40;</span>trials<span style="color: #080;">&#41;</span>
trialssummary$survival <span style="color: #080;">=</span> ageframe65$survivepct<span style="color: #080;">*</span><span style="color: #ff0000;">10000</span>
keep <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"year"</span>, <span style="color: #ff0000;">"mean"</span>,<span style="color: #ff0000;">"min"</span>,<span style="color: #ff0000;">"max"</span>,<span style="color: #ff0000;">"minus1sd"</span>,<span style="color: #ff0000;">"plus1sd"</span><span style="color: #080;">&#41;</span>
trialssummary <span style="color: #080;">&lt;-</span> trialssummary<span style="color: #080;">&#91;</span>,keep<span style="color: #080;">&#93;</span>
chartsummary<span style="color: #080;">&#40;</span>trialssummary, <span style="color: #ff0000;">"Average Spending, All Cohorts"</span><span style="color: #080;">&#41;</span>
&nbsp;
&nbsp;
<span style="color: #228B22;"># Figure 3</span>
facetframe <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a> <span style="color: #080;">&#40;</span>year <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/integer.html"><span style="color: #0000FF; font-weight: bold;">integer</span></a><span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span>, variable<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/character.html"><span style="color: #0000FF; font-weight: bold;">character</span></a><span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span>, value<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/double.html"><span style="color: #0000FF; font-weight: bold;">double</span></a><span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
&nbsp;
<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/for.html"><span style="color: #0000FF; font-weight: bold;">for</span></a> <span style="color: #080;">&#40;</span>index <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span><span style="color: #ff0000;">24</span><span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
    spendingfactor <span style="color: #080;">=</span> index<span style="color: #080;">/</span><span style="color: #ff0000;">20</span>
    trials <span style="color: #080;">=</span> testspendingfactor<span style="color: #080;">&#40;</span>realreturns, spendingfactor, <span style="color: #ff0000;">65</span>, <span style="color: #ff0000;">100</span><span style="color: #080;">&#41;</span>
    trialssummary <span style="color: #080;">=</span> calctrialssummary<span style="color: #080;">&#40;</span>trials<span style="color: #080;">&#41;</span>
    trialssummary$spendingfactor <span style="color: #080;">=</span> spendingfactor
    meltframe <span style="color: #080;">&lt;-</span> melt<span style="color: #080;">&#40;</span>trialssummary, id <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'year'</span>,<span style="color: #ff0000;">'spendingfactor'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
    facetframe <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/merge.html"><span style="color: #0000FF; font-weight: bold;">merge</span></a><span style="color: #080;">&#40;</span>meltframe, facetframe, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/all.html"><span style="color: #0000FF; font-weight: bold;">all</span></a><span style="color: #080;">=</span>TRUE<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#125;</span>
&nbsp;
ggplot<span style="color: #080;">&#40;</span><span style="color: #0000FF; font-weight: bold;">data</span><span style="color: #080;">=</span>facetframe, aes<span style="color: #080;">&#40;</span>x<span style="color: #080;">=</span>year, y<span style="color: #080;">=</span>value, colour<span style="color: #080;">=</span>variable<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    scale_x_continuous<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    ylab<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Annual spending (% of initial portfolio)"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    xlab<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Retirement year"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    theme_bw<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    facet_wrap<span style="color: #080;">&#40;</span>~ spendingfactor, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/ncol.html"><span style="color: #0000FF; font-weight: bold;">ncol</span></a> <span style="color: #080;">=</span> <span style="color: #ff0000;">4</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    geom_line<span style="color: #080;">&#40;</span>size<span style="color: #080;">=</span><span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    opts<span style="color: #080;">&#40;</span>legend.<span style="">position</span><span style="color: #080;">=</span><span style="color: #ff0000;">"top"</span>,
         legend.<span style="">direction</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">'horizontal'</span>,
         plot.<span style="">background</span> <span style="color: #080;">=</span> theme_rect<span style="color: #080;">&#40;</span>colour <span style="color: #080;">=</span> <span style="color: #ff0000;">'black'</span>, fill <span style="color: #080;">=</span> <span style="color: #ff0000;">'#CCCCEE'</span>, size <span style="color: #080;">=</span> <span style="color: #ff0000;">1</span>, linetype<span style="color: #080;">=</span><span style="color: #ff0000;">'solid'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
scale_colour_manual<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Average Spending, All Cohorts, Spending Factors 0.05 to 1.2"</span>, breaks <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'mean'</span>, <span style="color: #ff0000;">'min'</span>,<span style="color: #ff0000;">'max'</span>,<span style="color: #ff0000;">'minus1sd'</span>,<span style="color: #ff0000;">'plus1sd'</span><span style="color: #080;">&#41;</span>,
                    values <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"#000099"</span>, <span style="color: #ff0000;">"#CC0000"</span>,<span style="color: #ff0000;">"#009900"</span>,<span style="color: #ff0000;">"#999999"</span>,<span style="color: #ff0000;">"#999999"</span><span style="color: #080;">&#41;</span>,
                    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/labels.html"><span style="color: #0000FF; font-weight: bold;">labels</span></a> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'Average Spend'</span>, <span style="color: #ff0000;">'Minimum'</span>, <span style="color: #ff0000;">'Maximum'</span>, <span style="color: #ff0000;">'-1 SD'</span>, <span style="color: #ff0000;">'+1SD'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
&nbsp;
<span style="color: #228B22;">############################################################</span>
&nbsp;
&nbsp;
ageframe65 <span style="color: #080;">=</span> ageframe<span style="color: #080;">&#40;</span>lifetable,<span style="color: #ff0000;">65</span>,<span style="color: #ff0000;">100</span><span style="color: #080;">&#41;</span>
nsfactors <span style="color: #080;">=</span> <span style="color: #ff0000;">40</span>
sfactorsummary <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span><span style="color: #080;">:</span>nsfactors<span style="color: #080;">&#41;</span>
<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/colnames.html"><span style="color: #0000FF; font-weight: bold;">colnames</span></a><span style="color: #080;">&#40;</span>sfactorsummary<span style="color: #080;">&#41;</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">"year"</span>
sfactorsummary$sfactor <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;"></span>
sfactorsummary$expspend <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;"></span>
sfactorsummary$minspend <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;"></span>
sfactorsummary$maxspend <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;"></span>
sfactorsummary$plus1sd <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;"></span>
sfactorsummary$minus1sd <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;"></span>
sfactorsummary$sdspend <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;"></span>
sfactorsummary$shortfall <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;"></span>
&nbsp;
<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/for.html"><span style="color: #0000FF; font-weight: bold;">for</span></a> <span style="color: #080;">&#40;</span>index <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span>nsfactors<span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
    spendingfactor <span style="color: #080;">=</span> index<span style="color: #080;">/</span><span style="color: #ff0000;">20</span>
    trials <span style="color: #080;">=</span> testspendingfactor<span style="color: #080;">&#40;</span>realreturns, spendingfactor, <span style="color: #ff0000;">65</span>, <span style="color: #ff0000;">100</span><span style="color: #080;">&#41;</span>
    trialssummary <span style="color: #080;">=</span> calcexpectedspending<span style="color: #080;">&#40;</span>trials, ageframe65<span style="color: #080;">&#41;</span>
&nbsp;
    sfactorsummary$sfactor<span style="color: #080;">&#91;</span>index<span style="color: #080;">&#93;</span> <span style="color: #080;">=</span> spendingfactor
    sfactorsummary$expspend<span style="color: #080;">&#91;</span>index<span style="color: #080;">&#93;</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sum.html"><span style="color: #0000FF; font-weight: bold;">sum</span></a><span style="color: #080;">&#40;</span>trialssummary<span style="color: #080;">&#91;</span>,<span style="color: #ff0000;">"expmean"</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
    sfactorsummary$minspend<span style="color: #080;">&#91;</span>index<span style="color: #080;">&#93;</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sum.html"><span style="color: #0000FF; font-weight: bold;">sum</span></a><span style="color: #080;">&#40;</span>trialssummary<span style="color: #080;">&#91;</span>,<span style="color: #ff0000;">"expmin"</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
    sfactorsummary$maxspend<span style="color: #080;">&#91;</span>index<span style="color: #080;">&#93;</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sum.html"><span style="color: #0000FF; font-weight: bold;">sum</span></a><span style="color: #080;">&#40;</span>trialssummary<span style="color: #080;">&#91;</span>,<span style="color: #ff0000;">"expmax"</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
    sfactorsummary$plus1sd<span style="color: #080;">&#91;</span>index<span style="color: #080;">&#93;</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sum.html"><span style="color: #0000FF; font-weight: bold;">sum</span></a><span style="color: #080;">&#40;</span>trialssummary<span style="color: #080;">&#91;</span>,<span style="color: #ff0000;">"expplus1sd"</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
    sfactorsummary$minus1sd<span style="color: #080;">&#91;</span>index<span style="color: #080;">&#93;</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sum.html"><span style="color: #0000FF; font-weight: bold;">sum</span></a><span style="color: #080;">&#40;</span>trialssummary<span style="color: #080;">&#91;</span>,<span style="color: #ff0000;">"expminus1sd"</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
    sfactorsummary$sdspend<span style="color: #080;">&#91;</span>index<span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/rowMeans.html"><span style="color: #0000FF; font-weight: bold;">rowMeans</span></a><span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>trials, <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">sd</span><span style="color: #080;">&#41;</span><span style="color: #080;">/</span>trials<span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span>,<span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
&nbsp;
    trialstmp<span style="color: #080;">=</span>trials
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/for.html"><span style="color: #0000FF; font-weight: bold;">for</span></a> <span style="color: #080;">&#40;</span>index2 <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/ncol.html"><span style="color: #0000FF; font-weight: bold;">ncol</span></a><span style="color: #080;">&#40;</span>trialstmp<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
        trialstmp<span style="color: #080;">&#91;</span>index2<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>trialstmp<span style="color: #080;">&#91;</span>index2<span style="color: #080;">&#93;</span><span style="color: #080;">/</span>trialstmp<span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span>,index2<span style="color: #080;">&#93;</span>
    trialstmp<span style="color: #080;">&#91;</span>trialstmp<span style="color: #080;">&lt;</span><span style="color: #ff0000;">0.75</span><span style="color: #080;">&#93;</span><span style="color: #080;">=-</span><span style="color: #ff0000;">1</span>
    trialstmp<span style="color: #080;">&#91;</span>trialstmp<span style="color: #080;">&gt;</span><span style="color: #ff0000;"></span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span><span style="color: #ff0000;"></span>
    trialstmp<span style="color: #080;">&#91;</span>trialstmp<span style="color: #080;">&lt;</span><span style="color: #ff0000;"></span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span><span style="color: #ff0000;">1</span>
    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/for.html"><span style="color: #0000FF; font-weight: bold;">for</span></a> <span style="color: #080;">&#40;</span>index2 <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/ncol.html"><span style="color: #0000FF; font-weight: bold;">ncol</span></a><span style="color: #080;">&#40;</span>trialstmp<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
        trialstmp<span style="color: #080;">&#91;</span>index2<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>trialstmp<span style="color: #080;">&#91;</span>index2<span style="color: #080;">&#93;</span> <span style="color: #080;">*</span> ageframe65$survivepct
    sfactorsummary$shortfall<span style="color: #080;">&#91;</span>index<span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/mean.html"><span style="color: #0000FF; font-weight: bold;">mean</span></a><span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>trialstmp,<span style="color: #ff0000;">2</span>,<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/max.html"><span style="color: #0000FF; font-weight: bold;">max</span></a><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
<span style="color: #080;">&#125;</span>
&nbsp;
&nbsp;
chart1<span style="color: #080;">=</span>sfactorsummary
keep <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"sfactor"</span>,<span style="color: #ff0000;">"expspend"</span>,<span style="color: #ff0000;">"minspend"</span>,<span style="color: #ff0000;">"maxspend"</span>,<span style="color: #ff0000;">"plus1sd"</span>,<span style="color: #ff0000;">"minus1sd"</span><span style="color: #080;">&#41;</span>
chart1 <span style="color: #080;">&lt;-</span> chart1<span style="color: #080;">&#91;</span>keep<span style="color: #080;">&#93;</span>
&nbsp;
meltframe <span style="color: #080;">&lt;-</span> melt<span style="color: #080;">&#40;</span>chart1, id <span style="color: #080;">=</span> <span style="color: #ff0000;">'sfactor'</span><span style="color: #080;">&#41;</span>
&nbsp;
ggplot<span style="color: #080;">&#40;</span><span style="color: #0000FF; font-weight: bold;">data</span><span style="color: #080;">=</span>meltframe, aes<span style="color: #080;">&#40;</span>x<span style="color: #080;">=</span>sfactor, y<span style="color: #080;">=</span>value, colour<span style="color: #080;">=</span>variable<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    scale_x_continuous<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    ylab<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Lifetime spend expectancy (% of initial portfolio)"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    xlab<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Spending factor"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    theme_bw<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    geom_line<span style="color: #080;">&#40;</span>size<span style="color: #080;">=</span><span style="color: #ff0000;">1.4</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    opts<span style="color: #080;">&#40;</span>legend.<span style="">position</span><span style="color: #080;">=</span><span style="color: #ff0000;">"top"</span>,
         legend.<span style="">direction</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">'horizontal'</span>,
         plot.<span style="">background</span> <span style="color: #080;">=</span> theme_rect<span style="color: #080;">&#40;</span>colour <span style="color: #080;">=</span> <span style="color: #ff0000;">'black'</span>, fill <span style="color: #080;">=</span> <span style="color: #ff0000;">'#CCCCEE'</span>, size <span style="color: #080;">=</span> <span style="color: #ff0000;">1</span>, linetype<span style="color: #080;">=</span><span style="color: #ff0000;">'solid'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
scale_colour_manual<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Lifetime Spend Expectancy v. Spending Factor"</span>, breaks <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'expspend'</span>, <span style="color: #ff0000;">'minspend'</span>,<span style="color: #ff0000;">'maxspend'</span>,<span style="color: #ff0000;">'plus1sd'</span>,<span style="color: #ff0000;">'minus1sd'</span><span style="color: #080;">&#41;</span>,
                    values <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"#000099"</span>, <span style="color: #ff0000;">"#CC0000"</span>, <span style="color: #ff0000;">"#009900"</span>,<span style="color: #ff0000;">"#999999"</span>,<span style="color: #ff0000;">"#999999"</span><span style="color: #080;">&#41;</span>,
                    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/labels.html"><span style="color: #0000FF; font-weight: bold;">labels</span></a> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'Mean'</span>, <span style="color: #ff0000;">'Worst investment outcome'</span>, <span style="color: #ff0000;">'Best investment outcome'</span>,<span style="color: #ff0000;">'+1SD'</span>,<span style="color: #ff0000;">'-1SD'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
&nbsp;
chart2<span style="color: #080;">=</span>sfactorsummary
keep <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"sfactor"</span>,<span style="color: #ff0000;">"shortfall"</span><span style="color: #080;">&#41;</span>
chart2 <span style="color: #080;">&lt;-</span> chart2<span style="color: #080;">&#91;</span>keep<span style="color: #080;">&#93;</span>
meltframe <span style="color: #080;">&lt;-</span> melt<span style="color: #080;">&#40;</span>chart2, id <span style="color: #080;">=</span> <span style="color: #ff0000;">'sfactor'</span><span style="color: #080;">&#41;</span>
&nbsp;
ggplot<span style="color: #080;">&#40;</span><span style="color: #0000FF; font-weight: bold;">data</span><span style="color: #080;">=</span>meltframe, aes<span style="color: #080;">&#40;</span>x<span style="color: #080;">=</span>sfactor, y<span style="color: #080;">=</span>value, colour<span style="color: #080;">=</span>variable<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    scale_x_continuous<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    ylab<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Shortfall probability"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    xlab<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Spending factor"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    theme_bw<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    geom_line<span style="color: #080;">&#40;</span>size<span style="color: #080;">=</span><span style="color: #ff0000;">1.4</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
    opts<span style="color: #080;">&#40;</span>legend.<span style="">position</span><span style="color: #080;">=</span><span style="color: #ff0000;">"top"</span>,
         legend.<span style="">direction</span> <span style="color: #080;">=</span> <span style="color: #ff0000;">'horizontal'</span>,
         plot.<span style="">background</span> <span style="color: #080;">=</span> theme_rect<span style="color: #080;">&#40;</span>colour <span style="color: #080;">=</span> <span style="color: #ff0000;">'black'</span>, fill <span style="color: #080;">=</span> <span style="color: #ff0000;">'#CCCCEE'</span>, size <span style="color: #080;">=</span> <span style="color: #ff0000;">1</span>, linetype<span style="color: #080;">=</span><span style="color: #ff0000;">'solid'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
scale_colour_manual<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Probability of 25% Spending Shortfall v. Spending Factor"</span>, breaks <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'shortfall'</span><span style="color: #080;">&#41;</span>,
                    values <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"#000099"</span><span style="color: #080;">&#41;</span>,
                    <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/labels.html"><span style="color: #0000FF; font-weight: bold;">labels</span></a> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'Shortfall probability'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
&nbsp;
&nbsp;
<span style="color: #228B22;"># fixed 4% rule</span>
trials <span style="color: #080;">=</span> testspendingfactorfixed<span style="color: #080;">&#40;</span>realreturns, <span style="color: #ff0000;">1</span>, <span style="color: #ff0000;">65</span>, <span style="color: #ff0000;">100</span><span style="color: #080;">&#41;</span>
trialssummary <span style="color: #080;">=</span> calctrialssummary<span style="color: #080;">&#40;</span>trials<span style="color: #080;">&#41;</span>
ageframe65 <span style="color: #080;">=</span> ageframe<span style="color: #080;">&#40;</span>lifetable,<span style="color: #ff0000;">65</span>,<span style="color: #ff0000;">100</span><span style="color: #080;">&#41;</span>
trialssummary$survivepct<span style="color: #080;">=</span>ageframe65$survivepct
trialssummary$expmean <span style="color: #080;">=</span> trialssummary$mean <span style="color: #080;">*</span> trialssummary$survivepct
<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sum.html"><span style="color: #0000FF; font-weight: bold;">sum</span></a><span style="color: #080;">&#40;</span>trialssummary$expmean<span style="color: #080;">&#41;</span>
&nbsp;
trials<span style="color: #080;">&#91;</span>trials<span style="color: #080;">&lt;</span><span style="color: #ff0000;">4</span><span style="color: #080;">&#93;</span><span style="color: #080;">=-</span><span style="color: #ff0000;">1</span>
trials<span style="color: #080;">&#91;</span>trials<span style="color: #080;">&gt;</span><span style="color: #ff0000;"></span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span><span style="color: #ff0000;"></span>
trials<span style="color: #080;">&#91;</span>trials<span style="color: #080;">&lt;</span><span style="color: #ff0000;"></span><span style="color: #080;">&#93;</span><span style="color: #080;">=</span><span style="color: #ff0000;">1</span>
trials<span style="color: #080;">&#91;</span>,<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>trials<span style="color: #080;">&#91;</span>,<span style="color: #080;">&#93;</span> <span style="color: #080;">*</span> ageframe65$survivepct
<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/mean.html"><span style="color: #0000FF; font-weight: bold;">mean</span></a><span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>trials,<span style="color: #ff0000;">2</span>,<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/max.html"><span style="color: #0000FF; font-weight: bold;">max</span></a><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
&nbsp;
<span style="color: #228B22;"># 0.5 spending factor -&gt; look up from sfactorsummary</span></pre>
      </td>
    </tr>
  </table>
</div>

&nbsp;
