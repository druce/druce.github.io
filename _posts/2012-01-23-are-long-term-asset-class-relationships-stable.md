---
id: 960
title: Are long term asset class relationships stable?
date: 2012-01-23T16:37:19+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=960
permalink: /2012/01/are-long-term-asset-class-relationships-stable/
post-views:
  - "7659"
dsq_thread_id:
  - "550160363"
categories:
  - investing
tags:
  - investing
---
> *[Last week](/2012/01/gold-as-part-of-long-run-asset-allocation/), we looked at gold as part of a long-term asset allocation. I was curious about how stable those relationships would be over time, so I ran the same plots, starting from different inflection points.*
<!--more-->
  
**Original analysis: 1928-2010:**  
[<img src="/assets/wp-content/uploads/2012/01/efrontier.png" alt="Efficient frontier, 1928-2010" title="Efficient frontier, 1928-2010" width="480" height="360" class="size-full wp-image-963" />](/assets/wp-content/uploads/2012/01/efrontier.png)[<img src="/assets/wp-content/uploads/2012/01/transition.png" alt="Transition map, 1928-2010" title="Transition map, 1928-2010" width="480" height="360" class="size-full wp-image-964" />](/assets/wp-content/uploads/2012/01/transition.png)

(The transition map shows you the composition of the maximum return portfolio for each level of risk.)

**1946-2010, Post-war, since Bretton Woods:**

[<img src="/assets/wp-content/uploads/2012/01/ltg21.png" alt="Efficient frontier, 1946-2010" title="Efficient frontier, 1946-2010" width="300" height="225" class="size-full wp-image-967" />](/assets/wp-content/uploads/2012/01/ltg21.png)[<img src="/assets/wp-content/uploads/2012/01/ltg22.png" alt="Transition map, 1946-2010" title="Transition map, 1946-2010" width="300" height="225" class="size-full wp-image-968" />](/assets/wp-content/uploads/2012/01/ltg22.png)

**1972-2010, Post-war, post-gold standard:**

[<img src="/assets/wp-content/uploads/2012/01/ltg31.png" alt="Efficient frontier, 1972-2010" title="Efficient frontier, 1972-2010" width="300" height="225" class="alignnone size-full wp-image-972" />](/assets/wp-content/uploads/2012/01/ltg31.png)[<img src="/assets/wp-content/uploads/2012/01/ltg32.png" alt="Transition map, 1972-2010" title="Transition map, 1972-2010" width="300" height="225" class="alignnone size-full wp-image-973" />](/assets/wp-content/uploads/2012/01/ltg32.png)

**1982-2010, Era of disinflation, globalization:**

[<img src="/assets/wp-content/uploads/2012/01/ltg41.png" alt="Efficient frontier, 1982-2010" title="Efficient frontier, 1982-2010" width="300" height="225" class="alignnone size-full wp-image-975" />](/assets/wp-content/uploads/2012/01/ltg41.png)[<img src="/assets/wp-content/uploads/2012/01/ltg42.png" alt="Transition map, 1982-2010" title="Transition map, 1982-2010" width="300" height="225" class="alignnone size-full wp-image-976" />](/assets/wp-content/uploads/2012/01/ltg42.png)

This is interesting, since it shows how poorly gold has performed since 1982, an era of low inflation, the dollar standard, and decreasing holdings of gold by central banks and investors.

Note that this does not include the 37% decline in real gold prices from 1980-1981, as the gold bull market ended amid still-high inflation.

Let’s compare the pre-1982 era. Note the shift down and to the right: a less favorable tradeoff of lower returns and higher risks.

**1928-1981:**

[<img src="/assets/wp-content/uploads/2012/01/ltg51.png" alt="Efficient frontier, 1928-1971" title="Efficient frontier, 1928-1971" width="300" height="225" class="alignnone size-full wp-image-979" />](/assets/wp-content/uploads/2012/01/ltg51.png)[<img src="/assets/wp-content/uploads/2012/01/ltg52.png" alt="Transition map, 1928-1971" title="Transition map, 1928-1971" width="300" height="225" class="alignnone size-full wp-image-980" />](/assets/wp-content/uploads/2012/01/ltg52.png)

**Take-aways:**

  * The shape of the efficient frontier has been mostly fairly stable over the long term, with gold offering high risk, low real return, little correlation with other assets, and adding value to most portfolios.
  * From 1982 until recently, the environment was unusually favorable for financial assets in general, extremely favorable for bonds, and unusually poor for gold.

R code for the masochists:

<div class="wp_codebox_msgheader wp_codebox_hide">
  <span class="right"><sup><a href="http://www.ericbess.com/ericblog/2008/03/03/wp-codebox/#examples" target="_blank" title="WP-CodeBox HowTo?"><span style="color: #99cc00">?</span></a></sup></span><span class="left"><a href="javascript:;" onclick="javascript:showCodeTxt('p960code12'); return false;">View Code</a> RSPLUS</span>
  
  <div class="codebox_clear">
  </div>
</div>

<div class="wp_codebox">
  <table>
    <tr id="p96012">
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
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
</pre>
      </td>
      
      <td class="code" id="p960code12">
        <pre class="rsplus" style="font-family:monospace;"><span style="color: #228B22;"># install.packages('quantmod')</span>
<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/require.html"><span style="color: #0000FF; font-weight: bold;">require</span></a><span style="color: #080;">&#40;</span>quantmod<span style="color: #080;">&#41;</span>
<span style="color: #228B22;"># install.packages('lpSolve')</span>
<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/require.html"><span style="color: #0000FF; font-weight: bold;">require</span></a><span style="color: #080;">&#40;</span>lpSolve<span style="color: #080;">&#41;</span>
<span style="color: #228B22;"># install.packages('quadprog')</span>
<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/require.html"><span style="color: #0000FF; font-weight: bold;">require</span></a><span style="color: #080;">&#40;</span>quadprog<span style="color: #080;">&#41;</span>
<span style="color: #228B22;"># install.packages('ggplot2')</span>
<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/require.html"><span style="color: #0000FF; font-weight: bold;">require</span></a><span style="color: #080;">&#40;</span>ggplot2<span style="color: #080;">&#41;</span>
<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/require.html"><span style="color: #0000FF; font-weight: bold;">require</span></a><span style="color: #080;">&#40;</span><span style="color: #0000FF; font-weight: bold;">reshape</span><span style="color: #080;">&#41;</span>
&nbsp;
<span style="color: #228B22;"># define functions</span>
&nbsp;
<span style="color: #228B22;">#################################################################</span>
<span style="color: #228B22;"># use linear programming to find maximum return portfolio (100% highest return asset)</span>
<span style="color: #228B22;">#################################################################</span>
&nbsp;
runlp <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a> <span style="color: #080;">&#40;</span> returns <span style="color: #080;">&#41;</span>
<span style="color: #080;">&#123;</span>
&nbsp;
	<span style="color: #228B22;"># find maximum return portfolio (rightmost point of efficient frontier)</span>
	<span style="color: #228B22;"># will be 100% of highest return asset</span>
	<span style="color: #228B22;"># maximize</span>
	<span style="color: #228B22;">#   w1 * stocks return +w2 *bills +w3*bonds + w4 * gold</span>
	<span style="color: #228B22;">#   subject to 0 &lt;= w &lt;= 1  for each w</span>
	<span style="color: #228B22;"># will pick highest return asset with w=1</span>
	<span style="color: #228B22;"># skipping &gt;0 constraint, no negative return assets, so not binding</span>
&nbsp;
	opt.<span style="">objective</span> <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>returns, <span style="color: #ff0000;">2</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/mean.html"><span style="color: #0000FF; font-weight: bold;">mean</span></a><span style="color: #080;">&#41;</span>
&nbsp;
	<span style="color: #228B22;"># should use length(objective) to populate matrix</span>
	nAssets <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/length.html"><span style="color: #0000FF; font-weight: bold;">length</span></a><span style="color: #080;">&#40;</span>returns<span style="color: #080;">&#41;</span>
	ones <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/rep.html"><span style="color: #0000FF; font-weight: bold;">rep</span></a> <span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span>, nAssets<span style="color: #080;">&#41;</span>
	zeros <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/rep.html"><span style="color: #0000FF; font-weight: bold;">rep</span></a> <span style="color: #080;">&#40;</span><span style="color: #ff0000;"></span>, nAssets<span style="color: #080;">&#41;</span>
&nbsp;
	<span style="color: #228B22;"># constrain sum of weights to 1</span>
	constraintlist <span style="color: #080;">=</span> ones
	operatorlist <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"="</span><span style="color: #080;">&#41;</span>
	rhslist <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span>
&nbsp;
	<span style="color: #228B22;"># constrain each weight &gt;= 0</span>
	<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/for.html"><span style="color: #0000FF; font-weight: bold;">for</span></a><span style="color: #080;">&#40;</span>i <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span>nAssets<span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
		newconstraint <span style="color: #080;">=</span> zeros
		newconstraint<span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span><span style="color: #080;">=</span><span style="color: #ff0000;">1</span>
		constraintlist <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>constraintlist, newconstraint<span style="color: #080;">&#41;</span>
		operatorlist <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>operatorlist, <span style="color: #ff0000;">"&gt;="</span><span style="color: #080;">&#41;</span>
		rhslist <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>rhslist, <span style="color: #ff0000;"></span><span style="color: #080;">&#41;</span>
	<span style="color: #080;">&#125;</span>
&nbsp;
<span style="color: #228B22;">#	Example</span>
<span style="color: #228B22;">#	opt.constraints &lt;- matrix (c(1, 1, 1, 1,  # constrain sum of weights to 1</span>
<span style="color: #228B22;">#							 1, 0, 0, 0,  # constrain w1 &lt;= 1</span>
<span style="color: #228B22;">#							 0, 1, 0, 0,  # constrain w2 &lt;= 1</span>
<span style="color: #228B22;">#							 0, 0, 1, 0,  # constrain w3 &lt;= 1</span>
<span style="color: #228B22;">#							 0, 0, 0, 1)  # constrain w4 &lt;= 1</span>
<span style="color: #228B22;">#						   , nrow=5, byrow=TRUE)</span>
&nbsp;
	opt.<span style="">constraints</span> <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/matrix.html"><span style="color: #0000FF; font-weight: bold;">matrix</span></a> <span style="color: #080;">&#40;</span>constraintlist, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">=</span>nAssets<span style="color: #080;">+</span><span style="color: #ff0000;">1</span>, byrow<span style="color: #080;">=</span>TRUE<span style="color: #080;">&#41;</span>
	opt.<span style="">operator</span> <span style="color: #080;">&lt;-</span> operatorlist
	opt.<span style="">rhs</span> <span style="color: #080;">&lt;-</span> rhslist
	opt.<span style="">dir</span><span style="color: #080;">=</span><span style="color: #ff0000;">"max"</span>
&nbsp;
	tmpsolution <span style="color: #080;">=</span> lp <span style="color: #080;">&#40;</span>direction <span style="color: #080;">=</span> opt.<span style="">dir</span>,
	opt.<span style="">objective</span>,
	opt.<span style="">constraints</span>,
	opt.<span style="">operator</span>,
	opt.<span style="">rhs</span><span style="color: #080;">&#41;</span>
&nbsp;
	sol<span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span>
	<span style="color: #228B22;"># portfolio weights for max return portfolio</span>
	sol$wts<span style="color: #080;">=</span>tmpsolution$solution
	<span style="color: #228B22;"># return for max return portfolio</span>
	sol$ret<span style="color: #080;">=</span>tmpsolution$objval
	<span style="color: #228B22;"># compute return covariance matrix to determine volatility of this portfolio</span>
	sol$covmatrix <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">cov</span><span style="color: #080;">&#40;</span>returns, use <span style="color: #080;">=</span> <span style="color: #ff0000;">'complete.obs'</span>, method <span style="color: #080;">=</span> <span style="color: #ff0000;">'pearson'</span><span style="color: #080;">&#41;</span>
	<span style="color: #228B22;"># multiply weights x covariances x weights, gives variance</span>
	sol$var <span style="color: #080;">=</span> sol$wts <span style="color: #080;">%*%</span> sol$covmatrix <span style="color: #080;">%*%</span> sol$wts
	<span style="color: #228B22;"># square root gives standard deviation (volatility)</span>
	sol$vol <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sqrt.html"><span style="color: #0000FF; font-weight: bold;">sqrt</span></a><span style="color: #080;">&#40;</span>sol$var<span style="color: #080;">&#41;</span>
&nbsp;
	<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/return.html"><span style="color: #0000FF; font-weight: bold;">return</span></a> <span style="color: #080;">&#40;</span>sol<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#125;</span>
&nbsp;
runqp <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a> <span style="color: #080;">&#40;</span> returns, hurdle<span style="color: #080;">=</span><span style="color: #ff0000;"></span> <span style="color: #080;">&#41;</span>
<span style="color: #080;">&#123;</span>
<span style="color: #228B22;">#################################################################</span>
<span style="color: #228B22;"># find minimum volatility portfolio</span>
<span style="color: #228B22;">#################################################################</span>
&nbsp;
<span style="color: #228B22;"># minimize variance:  w %*% covmatrix %*% t(w)</span>
<span style="color: #228B22;"># subject to sum of ws = 1</span>
<span style="color: #228B22;"># subject to each w &gt;= 0</span>
<span style="color: #228B22;"># subject to each return &gt;= hurdle</span>
&nbsp;
<span style="color: #228B22;"># solution.minvol &lt;- solve.QP(covmatrix, zeros, t(opt.constraints), opt.rhs, meq = opt.meq)</span>
<span style="color: #228B22;"># first 2 parameters covmatrix, zeros define function to be minimized</span>
<span style="color: #228B22;"># if zeros is all 0s, the function minimized ends up equal to port variance / 2</span>
<span style="color: #228B22;"># opt.constraints is the left hand side of the constraints, ie the cs in</span>
<span style="color: #228B22;"># c1 w1 + c2 w2 ... + cn wn = K</span>
<span style="color: #228B22;"># opt.rhs is the Ks in the above equation</span>
<span style="color: #228B22;"># meq means the first meq rows are 'equals' constraints, remainder are &gt;= constraints</span>
<span style="color: #228B22;"># if you want to do a &lt;= constraint, multiply by -1 to make it a &gt;= constraint</span>
<span style="color: #228B22;"># does not appear to accept 0 RHS, so we make it a tiny number&gt; 0</span>
&nbsp;
	<span style="color: #228B22;"># compute expected returns</span>
	meanreturns <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>returns, <span style="color: #ff0000;">2</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/mean.html"><span style="color: #0000FF; font-weight: bold;">mean</span></a><span style="color: #080;">&#41;</span>
&nbsp;
	<span style="color: #228B22;"># compute covariance matrix</span>
	covmatrix <span style="color: #080;">=</span> <span style="color: #0000FF; font-weight: bold;">cov</span><span style="color: #080;">&#40;</span>returns, use <span style="color: #080;">=</span> <span style="color: #ff0000;">'complete.obs'</span>, method <span style="color: #080;">=</span> <span style="color: #ff0000;">'pearson'</span><span style="color: #080;">&#41;</span>
&nbsp;
	nAssets <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/length.html"><span style="color: #0000FF; font-weight: bold;">length</span></a><span style="color: #080;">&#40;</span>returns<span style="color: #080;">&#41;</span>
	nObs <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/length.html"><span style="color: #0000FF; font-weight: bold;">length</span></a><span style="color: #080;">&#40;</span>returns$stocks<span style="color: #080;">&#41;</span>
	ones <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/rep.html"><span style="color: #0000FF; font-weight: bold;">rep</span></a> <span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span>, nAssets<span style="color: #080;">&#41;</span>
	zeros <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/rep.html"><span style="color: #0000FF; font-weight: bold;">rep</span></a> <span style="color: #080;">&#40;</span><span style="color: #ff0000;"></span>, nAssets<span style="color: #080;">&#41;</span>
&nbsp;
	<span style="color: #228B22;"># constrain sum of weights to 1</span>
	constraintlist <span style="color: #080;">=</span> ones
	rhslist <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span>
&nbsp;
	<span style="color: #228B22;"># constrain each weight &gt;= 0</span>
	<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/for.html"><span style="color: #0000FF; font-weight: bold;">for</span></a><span style="color: #080;">&#40;</span>i <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">1</span><span style="color: #080;">:</span>nAssets<span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
		newconstraint <span style="color: #080;">=</span> zeros
		newconstraint<span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span><span style="color: #080;">=</span><span style="color: #ff0000;">1</span>
		constraintlist <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>constraintlist, newconstraint<span style="color: #080;">&#41;</span>
		rhslist <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>rhslist, <span style="color: #ff0000;"></span><span style="color: #080;">&#41;</span>
	<span style="color: #080;">&#125;</span>
&nbsp;
	<span style="color: #228B22;"># constrain return &gt;= hurdle</span>
	constraintlist <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>constraintlist, meanreturns<span style="color: #080;">&#41;</span>
	rhslist <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>rhslist, hurdle<span style="color: #080;">&#41;</span>
&nbsp;
	<span style="color: #228B22;"># example</span>
	<span style="color: #228B22;"># opt.constraints &lt;- matrix (c(1, 1, 1, 1,   # sum of weights =1</span>
	<span style="color: #228B22;">#							 1, 0, 0, 0,   # w1 &gt;= 0</span>
	<span style="color: #228B22;">#							 0, 1, 0, 0,   # w2 &gt;= 0</span>
	<span style="color: #228B22;">#							 0, 0, 1, 0,   # w3 &gt;= 0</span>
	<span style="color: #228B22;">#							 0, 0, 0, 1)   # w4 &gt;= 0</span>
&nbsp;
	<span style="color: #228B22;">#						   , nrow=5, byrow=TRUE)</span>
	<span style="color: #228B22;"># opt.rhs &lt;- matrix(c(1, 0.000001, 0.000001, 0.000001, 0.000001))</span>
	<span style="color: #228B22;"># opt.constraints = rbind(opt.constraints, meanreturns)</span>
	<span style="color: #228B22;"># opt.rhs=rbind(opt.rhs, hurdle)</span>
&nbsp;
	opt.<span style="">constraints</span> <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/matrix.html"><span style="color: #0000FF; font-weight: bold;">matrix</span></a> <span style="color: #080;">&#40;</span>constraintlist, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/nrow.html"><span style="color: #0000FF; font-weight: bold;">nrow</span></a><span style="color: #080;">=</span>nAssets<span style="color: #080;">+</span><span style="color: #ff0000;">2</span>, byrow<span style="color: #080;">=</span>TRUE<span style="color: #080;">&#41;</span>
	opt.<span style="">rhs</span> <span style="color: #080;">&lt;-</span> opt.<span style="">rhs</span> <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/matrix.html"><span style="color: #0000FF; font-weight: bold;">matrix</span></a><span style="color: #080;">&#40;</span>rhslist<span style="color: #080;">&#41;</span>
	opt.<span style="">meq</span> <span style="color: #080;">&lt;-</span> <span style="color: #ff0000;">1</span>  <span style="color: #228B22;"># first constraint is '=', rest are '&gt;='</span>
&nbsp;
	zeros <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/array.html"><span style="color: #0000FF; font-weight: bold;">array</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;"></span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/dim.html"><span style="color: #0000FF; font-weight: bold;">dim</span></a> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>nAssets,<span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
	tmpsolution <span style="color: #080;">&lt;-</span> solve.<span style="">QP</span><span style="color: #080;">&#40;</span>covmatrix, zeros, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/t.html"><span style="color: #0000FF; font-weight: bold;">t</span></a><span style="color: #080;">&#40;</span>opt.<span style="">constraints</span><span style="color: #080;">&#41;</span>, opt.<span style="">rhs</span>, meq <span style="color: #080;">=</span> opt.<span style="">meq</span><span style="color: #080;">&#41;</span>
&nbsp;
	sol<span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span>
	sol$wts <span style="color: #080;">=</span> tmpsolution$solution
	sol$var <span style="color: #080;">=</span> tmpsolution$value <span style="color: #080;">*</span><span style="color: #ff0000;">2</span>
	sol$ret <span style="color: #080;">=</span> meanreturns <span style="color: #080;">%*%</span> sol$wts
	sol$vol <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sqrt.html"><span style="color: #0000FF; font-weight: bold;">sqrt</span></a><span style="color: #080;">&#40;</span>sol$var<span style="color: #080;">&#41;</span>
&nbsp;
	<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/return.html"><span style="color: #0000FF; font-weight: bold;">return</span></a><span style="color: #080;">&#40;</span>sol<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#125;</span>
&nbsp;
loopqp <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a> <span style="color: #080;">&#40;</span>minvol, maxret, numtrials<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#123;</span>
&nbsp;
	<span style="color: #228B22;">#################################################################</span>
	<span style="color: #228B22;"># loop and run a minimum volatility optimization for each return level from 2-49</span>
	<span style="color: #228B22;">#################################################################</span>
&nbsp;
	<span style="color: #228B22;"># put minreturn portfolio in return series for min return, index =1</span>
	out.<span style="">ret</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>minvol$ret<span style="color: #080;">&#41;</span>
	out.<span style="">vol</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>minvol$vol<span style="color: #080;">&#41;</span>
	out.<span style="">stocks</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>minvol$wts<span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
	out.<span style="">bills</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>minvol$wts<span style="color: #080;">&#91;</span><span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
	out.<span style="">bonds</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>minvol$wts<span style="color: #080;">&#91;</span><span style="color: #ff0000;">3</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
	out.<span style="">gold</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>minvol$wts<span style="color: #080;">&#91;</span><span style="color: #ff0000;">4</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
&nbsp;
	lowreturn <span style="color: #080;">&lt;-</span> minvol$ret
	highreturn <span style="color: #080;">&lt;-</span> maxret$ret
	minreturns <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/seq.html"><span style="color: #0000FF; font-weight: bold;">seq</span></a><span style="color: #080;">&#40;</span>lowreturn, highreturn, length.<span style="">out</span><span style="color: #080;">=</span>numtrials<span style="color: #080;">&#41;</span>
&nbsp;
	<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/for.html"><span style="color: #0000FF; font-weight: bold;">for</span></a><span style="color: #080;">&#40;</span>i <span style="color: #0000FF; font-weight: bold;">in</span> <span style="color: #ff0000;">2</span><span style="color: #080;">:</span><span style="color: #080;">&#40;</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/length.html"><span style="color: #0000FF; font-weight: bold;">length</span></a><span style="color: #080;">&#40;</span>minreturns<span style="color: #080;">&#41;</span> <span style="color: #080;">-</span> <span style="color: #ff0000;">1</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
		tmpsol <span style="color: #080;">&lt;-</span> runqp<span style="color: #080;">&#40;</span>freal,minreturns<span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
		tmp.<span style="">wts</span> <span style="color: #080;">=</span> tmpsol$wts
		tmp.<span style="">var</span> <span style="color: #080;">=</span> tmpsol$var
&nbsp;
		out.<span style="">ret</span><span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span> <span style="color: #080;">=</span> realreturns <span style="color: #080;">%*%</span> tmp.<span style="">wts</span>
		out.<span style="">vol</span><span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/sqrt.html"><span style="color: #0000FF; font-weight: bold;">sqrt</span></a><span style="color: #080;">&#40;</span>tmp.<span style="">var</span><span style="color: #080;">&#41;</span>
		out.<span style="">stocks</span><span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>tmp.<span style="">wts</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span>
		out.<span style="">bills</span><span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>tmp.<span style="">wts</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span>
		out.<span style="">bonds</span><span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>tmp.<span style="">wts</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">3</span><span style="color: #080;">&#93;</span>
		out.<span style="">gold</span><span style="color: #080;">&#91;</span>i<span style="color: #080;">&#93;</span><span style="color: #080;">=</span>tmp.<span style="">wts</span><span style="color: #080;">&#91;</span><span style="color: #ff0000;">4</span><span style="color: #080;">&#93;</span>
	<span style="color: #080;">&#125;</span>
&nbsp;
<span style="color: #228B22;"># put maxreturn portfolio in return series for max return</span>
	out.<span style="">ret</span><span style="color: #080;">&#91;</span>numtrials<span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>maxret$ret<span style="color: #080;">&#41;</span>
	out.<span style="">vol</span><span style="color: #080;">&#91;</span>numtrials<span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>maxret$vol<span style="color: #080;">&#41;</span>
	out.<span style="">stocks</span><span style="color: #080;">&#91;</span>numtrials<span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>maxret$wts<span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
	out.<span style="">bills</span><span style="color: #080;">&#91;</span>numtrials<span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>maxret$wts<span style="color: #080;">&#91;</span><span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
	out.<span style="">bonds</span><span style="color: #080;">&#91;</span>numtrials<span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>maxret$wts<span style="color: #080;">&#91;</span><span style="color: #ff0000;">3</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
	out.<span style="">gold</span><span style="color: #080;">&#91;</span>numtrials<span style="color: #080;">&#93;</span><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>maxret$wts<span style="color: #080;">&#91;</span><span style="color: #ff0000;">4</span><span style="color: #080;">&#93;</span><span style="color: #080;">&#41;</span>
&nbsp;
	efrontier<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span>out.<span style="">ret</span><span style="color: #080;">*</span><span style="color: #ff0000;">100</span><span style="color: #080;">&#41;</span>
	efrontier$vol<span style="color: #080;">=</span>out.<span style="">vol</span><span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
	efrontier$stocks<span style="color: #080;">=</span>out.<span style="">stocks</span><span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
	efrontier$bills<span style="color: #080;">=</span>out.<span style="">bills</span><span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
	efrontier$bonds<span style="color: #080;">=</span>out.<span style="">bonds</span><span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
	efrontier$gold<span style="color: #080;">=</span>out.<span style="">gold</span><span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
	<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/names.html"><span style="color: #0000FF; font-weight: bold;">names</span></a><span style="color: #080;">&#40;</span>efrontier<span style="color: #080;">&#41;</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Return"</span>, <span style="color: #ff0000;">"Risk"</span>, <span style="color: #ff0000;">"%Stocks"</span>, <span style="color: #ff0000;">"%Bills"</span>, <span style="color: #ff0000;">"%Bonds"</span>, <span style="color: #ff0000;">"%Gold"</span><span style="color: #080;">&#41;</span>
&nbsp;
	<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/return.html"><span style="color: #0000FF; font-weight: bold;">return</span></a><span style="color: #080;">&#40;</span>efrontier<span style="color: #080;">&#41;</span>
<span style="color: #080;">&#125;</span>
&nbsp;
<span style="color: #228B22;">############################################################</span>
<span style="color: #228B22;"># charts</span>
<span style="color: #228B22;">############################################################</span>
&nbsp;
plot_efrontier <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a> <span style="color: #080;">&#40;</span>efrontier, returns, sds, apoints<span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
&nbsp;
	ggplot<span style="color: #080;">&#40;</span><span style="color: #0000FF; font-weight: bold;">data</span><span style="color: #080;">=</span>efrontier, aes<span style="color: #080;">&#40;</span>x<span style="color: #080;">=</span>Risk, y<span style="color: #080;">=</span>Return<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
<span style="color: #228B22;">#		opts(title="Efficient Frontier") +</span>
		theme_bw<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		geom_line<span style="color: #080;">&#40;</span>size<span style="color: #080;">=</span><span style="color: #ff0000;">1.4</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		geom_point<span style="color: #080;">&#40;</span>aes<span style="color: #080;">&#40;</span>x<span style="color: #080;">=</span>apoints$sds, y<span style="color: #080;">=</span>apoints$returns<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		scale_x_continuous<span style="color: #080;">&#40;</span>limits<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">1</span>,<span style="color: #ff0000;">24</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		<span style="color: #228B22;"># could loop through efrontier names</span>
		annotate<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"text"</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">1</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span>,label<span style="color: #080;">=</span><span style="color: #ff0000;">" stocks"</span>, hjust<span style="color: #080;">=</span><span style="color: #ff0000;"></span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		annotate<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"text"</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">2</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">2</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span>,label<span style="color: #080;">=</span><span style="color: #ff0000;">" bills"</span>, hjust<span style="color: #080;">=</span><span style="color: #ff0000;"></span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		annotate<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"text"</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">3</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">3</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span>,label<span style="color: #080;">=</span><span style="color: #ff0000;">" bonds"</span>, hjust<span style="color: #080;">=</span><span style="color: #ff0000;"></span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		annotate<span style="color: #080;">&#40;</span><span style="color: #ff0000;">"text"</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">4</span>,<span style="color: #ff0000;">1</span><span style="color: #080;">&#93;</span>, apoints<span style="color: #080;">&#91;</span><span style="color: #ff0000;">4</span>,<span style="color: #ff0000;">2</span><span style="color: #080;">&#93;</span>,label<span style="color: #080;">=</span><span style="color: #ff0000;">" gold"</span>, hjust<span style="color: #080;">=</span><span style="color: #ff0000;"></span><span style="color: #080;">&#41;</span>
<span style="color: #228B22;">#		annotate("text", 19,0.3,label="streeteye.com", hjust=0, alpha=0.5)</span>
<span style="color: #080;">&#125;</span>
&nbsp;
plot_transitionmap <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/function.html"><span style="color: #0000FF; font-weight: bold;">function</span></a> <span style="color: #080;">&#40;</span>efrontier, returns, sds<span style="color: #080;">&#41;</span> <span style="color: #080;">&#123;</span>
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
	efrontier.<span style="">m</span> <span style="color: #080;">=</span> melt<span style="color: #080;">&#40;</span>efrontier, id <span style="color: #080;">=</span><span style="color: #ff0000;">'Risk'</span><span style="color: #080;">&#41;</span>
&nbsp;
	ggplot<span style="color: #080;">&#40;</span><span style="color: #0000FF; font-weight: bold;">data</span><span style="color: #080;">=</span>efrontier.<span style="">m</span>, aes<span style="color: #080;">&#40;</span>x<span style="color: #080;">=</span>Risk, y<span style="color: #080;">=</span>value, colour<span style="color: #080;">=</span>variable, fill<span style="color: #080;">=</span>variable<span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		theme_bw<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		theme<span style="color: #080;">&#40;</span>legend.<span style="">position</span><span style="color: #080;">=</span><span style="color: #ff0000;">"top"</span>, legend.<span style="">direction</span><span style="color: #080;">=</span><span style="color: #ff0000;">"horizontal"</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		ylab<span style="color: #080;">&#40;</span><span style="color: #ff0000;">'% Portfolio'</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		geom_area<span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		scale_colour_manual<span style="color: #080;">&#40;</span><span style="color: #ff0000;">""</span>, breaks<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"%Stocks"</span>, <span style="color: #ff0000;">"%Bills"</span>, <span style="color: #ff0000;">"%Bonds"</span>,<span style="color: #ff0000;">"%Gold"</span><span style="color: #080;">&#41;</span>, values <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>dvblue,dvgreen,dvred,dvyellow<span style="color: #080;">&#41;</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/labels.html"><span style="color: #0000FF; font-weight: bold;">labels</span></a><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'%Stocks'</span>, <span style="color: #ff0000;">'%Bills'</span>,<span style="color: #ff0000;">'%Bonds'</span>,<span style="color: #ff0000;">'%Gold'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span> <span style="color: #080;">+</span>
		scale_fill_manual<span style="color: #080;">&#40;</span><span style="color: #ff0000;">""</span>, breaks<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"%Stocks"</span>, <span style="color: #ff0000;">"%Bills"</span>, <span style="color: #ff0000;">"%Bonds"</span>,<span style="color: #ff0000;">"%Gold"</span><span style="color: #080;">&#41;</span>, values <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span>dvblue,dvgreen,dvred,dvyellow<span style="color: #080;">&#41;</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/labels.html"><span style="color: #0000FF; font-weight: bold;">labels</span></a><span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">'%Stocks'</span>, <span style="color: #ff0000;">'%Bills'</span>,<span style="color: #ff0000;">'%Bonds'</span>,<span style="color: #ff0000;">'%Gold'</span><span style="color: #080;">&#41;</span><span style="color: #080;">&#41;</span>
<span style="color: #228B22;">#		annotate("text", 16,-2.5,label="streeteye.com", hjust=0, alpha=0.5)</span>
&nbsp;
<span style="color: #080;">&#125;</span>
&nbsp;
<span style="color: #228B22;">#################################################################</span>
<span style="color: #228B22;"># Create some data</span>
<span style="color: #228B22;">#################################################################</span>
&nbsp;
<span style="color: #228B22;"># not used in abbreviated example, but useful for reporting</span>
startYear <span style="color: #080;">=</span> <span style="color: #ff0000;">1928</span>
endYear <span style="color: #080;">=</span> <span style="color: #ff0000;">2010</span>
YEARS <span style="color: #080;">=</span>startYear<span style="color: #080;">:</span>endYear
&nbsp;
<span style="color: #228B22;"># nominal returns</span>
<span style="color: #228B22;"># nominal returns</span>
SP500 <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">0.4381</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.083</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.2512</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.4384</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0864</span>,<span style="color: #ff0000;">0.4998</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0119</span>,<span style="color: #ff0000;">0.4674</span>,<span style="color: #ff0000;">0.3194</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.3534</span>,<span style="color: #ff0000;">0.2928</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.011</span>,
<span style="color: #080;">-</span><span style="color: #ff0000;">0.1067</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1277</span>,<span style="color: #ff0000;">0.1917</span>,<span style="color: #ff0000;">0.2506</span>,<span style="color: #ff0000;">0.1903</span>,<span style="color: #ff0000;">0.3582</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0843</span>,<span style="color: #ff0000;">0.052</span>,<span style="color: #ff0000;">0.057</span>,<span style="color: #ff0000;">0.183</span>,<span style="color: #ff0000;">0.3081</span>,<span style="color: #ff0000;">0.2368</span>,<span style="color: #ff0000;">0.1815</span>,
<span style="color: #080;">-</span><span style="color: #ff0000;">0.0121</span>,<span style="color: #ff0000;">0.5256</span>,<span style="color: #ff0000;">0.326</span>,<span style="color: #ff0000;">0.0744</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1046</span>,<span style="color: #ff0000;">0.4372</span>,<span style="color: #ff0000;">0.1206</span>,<span style="color: #ff0000;">0.0034</span>,<span style="color: #ff0000;">0.2664</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0881</span>,<span style="color: #ff0000;">0.2261</span>,<span style="color: #ff0000;">0.1642</span>,<span style="color: #ff0000;">0.124</span>,
<span style="color: #080;">-</span><span style="color: #ff0000;">0.0997</span>,<span style="color: #ff0000;">0.238</span>,<span style="color: #ff0000;">0.1081</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0824</span>,<span style="color: #ff0000;">0.0356</span>,<span style="color: #ff0000;">0.1422</span>,<span style="color: #ff0000;">0.1876</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1431</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.259</span>,<span style="color: #ff0000;">0.37</span>,<span style="color: #ff0000;">0.2383</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0698</span>,<span style="color: #ff0000;">0.0651</span>,
<span style="color: #ff0000;">0.1852</span>,<span style="color: #ff0000;">0.3174</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.047</span>,<span style="color: #ff0000;">0.2042</span>,<span style="color: #ff0000;">0.2234</span>,<span style="color: #ff0000;">0.0615</span>,<span style="color: #ff0000;">0.3124</span>,<span style="color: #ff0000;">0.1849</span>,<span style="color: #ff0000;">0.0581</span>,<span style="color: #ff0000;">0.1654</span>,<span style="color: #ff0000;">0.3148</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0306</span>,<span style="color: #ff0000;">0.3023</span>,
<span style="color: #ff0000;">0.0749</span>,<span style="color: #ff0000;">0.0997</span>,<span style="color: #ff0000;">0.0133</span>,<span style="color: #ff0000;">0.372</span>,<span style="color: #ff0000;">0.2268</span>,<span style="color: #ff0000;">0.331</span>,<span style="color: #ff0000;">0.2834</span>,<span style="color: #ff0000;">0.2089</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0903</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1185</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.2197</span>,<span style="color: #ff0000;">0.2836</span>,<span style="color: #ff0000;">0.1074</span>,
<span style="color: #ff0000;">0.0483</span>,<span style="color: #ff0000;">0.1561</span>,<span style="color: #ff0000;">0.0548</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.3655</span>,<span style="color: #ff0000;">0.2594</span>,<span style="color: #ff0000;">0.1482</span>,<span style="color: #ff0000;">0.021</span>,<span style="color: #ff0000;">0.1589</span>,<span style="color: #ff0000;">0.3215</span>,<span style="color: #ff0000;">0.1348</span><span style="color: #080;">&#41;</span>
&nbsp;
BILLS <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">0.0308</span>,<span style="color: #ff0000;">0.0316</span>,<span style="color: #ff0000;">0.0455</span>,<span style="color: #ff0000;">0.0231</span>,<span style="color: #ff0000;">0.0107</span>,<span style="color: #ff0000;">0.0096</span>,<span style="color: #ff0000;">0.0032</span>,<span style="color: #ff0000;">0.0018</span>,<span style="color: #ff0000;">0.0017</span>,<span style="color: #ff0000;">0.003</span>,<span style="color: #ff0000;">0.0008</span>,<span style="color: #ff0000;">0.0004</span>,
<span style="color: #ff0000;">0.0003</span>,<span style="color: #ff0000;">0.0008</span>,<span style="color: #ff0000;">0.0034</span>,<span style="color: #ff0000;">0.0038</span>,<span style="color: #ff0000;">0.0038</span>,<span style="color: #ff0000;">0.0038</span>,<span style="color: #ff0000;">0.0038</span>,<span style="color: #ff0000;">0.0057</span>,<span style="color: #ff0000;">0.0102</span>,<span style="color: #ff0000;">0.011</span>,<span style="color: #ff0000;">0.0117</span>,<span style="color: #ff0000;">0.0148</span>,
<span style="color: #ff0000;">0.0167</span>,<span style="color: #ff0000;">0.0189</span>,<span style="color: #ff0000;">0.0096</span>,<span style="color: #ff0000;">0.0166</span>,<span style="color: #ff0000;">0.0256</span>,<span style="color: #ff0000;">0.0323</span>,<span style="color: #ff0000;">0.0178</span>,<span style="color: #ff0000;">0.0326</span>,<span style="color: #ff0000;">0.0305</span>,<span style="color: #ff0000;">0.0227</span>,<span style="color: #ff0000;">0.0278</span>,<span style="color: #ff0000;">0.0311</span>,
<span style="color: #ff0000;">0.0351</span>,<span style="color: #ff0000;">0.039</span>,<span style="color: #ff0000;">0.0484</span>,<span style="color: #ff0000;">0.0433</span>,<span style="color: #ff0000;">0.0526</span>,<span style="color: #ff0000;">0.0656</span>,<span style="color: #ff0000;">0.0669</span>,<span style="color: #ff0000;">0.0454</span>,<span style="color: #ff0000;">0.0395</span>,<span style="color: #ff0000;">0.0673</span>,<span style="color: #ff0000;">0.0778</span>,<span style="color: #ff0000;">0.0599</span>,
<span style="color: #ff0000;">0.0497</span>,<span style="color: #ff0000;">0.0513</span>,<span style="color: #ff0000;">0.0693</span>,<span style="color: #ff0000;">0.0994</span>,<span style="color: #ff0000;">0.1122</span>,<span style="color: #ff0000;">0.143</span>,<span style="color: #ff0000;">0.1101</span>,<span style="color: #ff0000;">0.0845</span>,<span style="color: #ff0000;">0.0961</span>,<span style="color: #ff0000;">0.0749</span>,<span style="color: #ff0000;">0.0604</span>,<span style="color: #ff0000;">0.0572</span>,
<span style="color: #ff0000;">0.0645</span>,<span style="color: #ff0000;">0.0811</span>,<span style="color: #ff0000;">0.0755</span>,<span style="color: #ff0000;">0.0561</span>,<span style="color: #ff0000;">0.0341</span>,<span style="color: #ff0000;">0.0298</span>,<span style="color: #ff0000;">0.0399</span>,<span style="color: #ff0000;">0.0552</span>,<span style="color: #ff0000;">0.0502</span>,<span style="color: #ff0000;">0.0505</span>,<span style="color: #ff0000;">0.0473</span>,<span style="color: #ff0000;">0.0451</span>,
<span style="color: #ff0000;">0.0576</span>,<span style="color: #ff0000;">0.0367</span>,<span style="color: #ff0000;">0.0166</span>,<span style="color: #ff0000;">0.0103</span>,<span style="color: #ff0000;">0.0123</span>,<span style="color: #ff0000;">0.0301</span>,<span style="color: #ff0000;">0.0468</span>,<span style="color: #ff0000;">0.0464</span>,<span style="color: #ff0000;">0.0159</span>,<span style="color: #ff0000;">0.0014</span>,<span style="color: #ff0000;">0.0013</span>,<span style="color: #ff0000;">0.0003</span>,
<span style="color: #ff0000;">0.0005</span>,<span style="color: #ff0000;">0.0007</span>,<span style="color: #ff0000;">0.0005</span><span style="color: #080;">&#41;</span>
&nbsp;
BONDS<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">0.0084</span>,<span style="color: #ff0000;">0.042</span>,<span style="color: #ff0000;">0.0454</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0256</span>,<span style="color: #ff0000;">0.0879</span>,<span style="color: #ff0000;">0.0186</span>,<span style="color: #ff0000;">0.0796</span>,<span style="color: #ff0000;">0.0447</span>,<span style="color: #ff0000;">0.0502</span>,<span style="color: #ff0000;">0.0138</span>,<span style="color: #ff0000;">0.0421</span>,<span style="color: #ff0000;">0.0441</span>,
<span style="color: #ff0000;">0.054</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0202</span>,<span style="color: #ff0000;">0.0229</span>,<span style="color: #ff0000;">0.0249</span>,<span style="color: #ff0000;">0.0258</span>,<span style="color: #ff0000;">0.038</span>,<span style="color: #ff0000;">0.0313</span>,<span style="color: #ff0000;">0.0092</span>,<span style="color: #ff0000;">0.0195</span>,<span style="color: #ff0000;">0.0466</span>,<span style="color: #ff0000;">0.0043</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.003</span>,
<span style="color: #ff0000;">0.0227</span>,<span style="color: #ff0000;">0.0414</span>,<span style="color: #ff0000;">0.0329</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0134</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0226</span>,<span style="color: #ff0000;">0.068</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.021</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0265</span>,<span style="color: #ff0000;">0.1164</span>,<span style="color: #ff0000;">0.0206</span>,<span style="color: #ff0000;">0.0569</span>,<span style="color: #ff0000;">0.0168</span>,
<span style="color: #ff0000;">0.0373</span>,<span style="color: #ff0000;">0.0072</span>,<span style="color: #ff0000;">0.0291</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0158</span>,<span style="color: #ff0000;">0.0327</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0501</span>,<span style="color: #ff0000;">0.1675</span>,<span style="color: #ff0000;">0.0979</span>,<span style="color: #ff0000;">0.0282</span>,<span style="color: #ff0000;">0.0366</span>,<span style="color: #ff0000;">0.0199</span>,<span style="color: #ff0000;">0.0361</span>,
<span style="color: #ff0000;">0.1598</span>,<span style="color: #ff0000;">0.0129</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0078</span>,<span style="color: #ff0000;">0.0067</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0299</span>,<span style="color: #ff0000;">0.082</span>,<span style="color: #ff0000;">0.3281</span>,<span style="color: #ff0000;">0.032</span>,<span style="color: #ff0000;">0.1373</span>,<span style="color: #ff0000;">0.2571</span>,<span style="color: #ff0000;">0.2428</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0496</span>,
<span style="color: #ff0000;">0.0822</span>,<span style="color: #ff0000;">0.1769</span>,<span style="color: #ff0000;">0.0624</span>,<span style="color: #ff0000;">0.15</span>,<span style="color: #ff0000;">0.0936</span>,<span style="color: #ff0000;">0.1421</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0804</span>,<span style="color: #ff0000;">0.2348</span>,<span style="color: #ff0000;">0.0143</span>,<span style="color: #ff0000;">0.0994</span>,<span style="color: #ff0000;">0.1492</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0825</span>,
<span style="color: #ff0000;">0.1666</span>,<span style="color: #ff0000;">0.0557</span>,<span style="color: #ff0000;">0.1512</span>,<span style="color: #ff0000;">0.0038</span>,<span style="color: #ff0000;">0.0449</span>,<span style="color: #ff0000;">0.0287</span>,<span style="color: #ff0000;">0.0196</span>,<span style="color: #ff0000;">0.1021</span>,<span style="color: #ff0000;">0.201</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1112</span>,<span style="color: #ff0000;">0.0846</span>,<span style="color: #ff0000;">0.1604</span>,
<span style="color: #ff0000;">0.0297</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.091</span>,<span style="color: #ff0000;">0.1075</span><span style="color: #080;">&#41;</span>
&nbsp;
CPI<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #080;">-</span><span style="color: #ff0000;">0.0115607</span>,<span style="color: #ff0000;">0.005848</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0639535</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0931677</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.1027397</span>,<span style="color: #ff0000;">0.0076336</span>,<span style="color: #ff0000;">0.0151515</span>,<span style="color: #ff0000;">0.0298507</span>,
<span style="color: #ff0000;">0.0144928</span>,<span style="color: #ff0000;">0.0285714</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0277778</span>,<span style="color: #ff0000;"></span>,<span style="color: #ff0000;">0.0071429</span>,<span style="color: #ff0000;">0.0992908</span>,<span style="color: #ff0000;">0.0903226</span>,<span style="color: #ff0000;">0.0295858</span>,<span style="color: #ff0000;">0.0229885</span>,
<span style="color: #ff0000;">0.0224719</span>,<span style="color: #ff0000;">0.1813187</span>,<span style="color: #ff0000;">0.0883721</span>,<span style="color: #ff0000;">0.0299145</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0207469</span>,<span style="color: #ff0000;">0.059322</span>,<span style="color: #ff0000;">0.06</span>,<span style="color: #ff0000;">0.0075472</span>,<span style="color: #ff0000;">0.0074906</span>,
<span style="color: #080;">-</span><span style="color: #ff0000;">0.0074349</span>,<span style="color: #ff0000;">0.0037453</span>,<span style="color: #ff0000;">0.0298507</span>,<span style="color: #ff0000;">0.0289855</span>,<span style="color: #ff0000;">0.0176056</span>,<span style="color: #ff0000;">0.017301</span>,<span style="color: #ff0000;">0.0136054</span>,<span style="color: #ff0000;">0.0067114</span>,<span style="color: #ff0000;">0.0133333</span>,
<span style="color: #ff0000;">0.0164474</span>,<span style="color: #ff0000;">0.0097087</span>,<span style="color: #ff0000;">0.0192308</span>,<span style="color: #ff0000;">0.0345912</span>,<span style="color: #ff0000;">0.0303951</span>,<span style="color: #ff0000;">0.0471976</span>,<span style="color: #ff0000;">0.0619718</span>,<span style="color: #ff0000;">0.0557029</span>,<span style="color: #ff0000;">0.0326633</span>,
<span style="color: #ff0000;">0.0340633</span>,<span style="color: #ff0000;">0.0870588</span>,<span style="color: #ff0000;">0.1233766</span>,<span style="color: #ff0000;">0.0693642</span>,<span style="color: #ff0000;">0.0486486</span>,<span style="color: #ff0000;">0.0670103</span>,<span style="color: #ff0000;">0.0901771</span>,<span style="color: #ff0000;">0.1329394</span>,<span style="color: #ff0000;">0.125163</span>,
<span style="color: #ff0000;">0.0892236</span>,<span style="color: #ff0000;">0.0382979</span>,<span style="color: #ff0000;">0.0379098</span>,<span style="color: #ff0000;">0.0394867</span>,<span style="color: #ff0000;">0.0379867</span>,<span style="color: #ff0000;">0.010979</span>,<span style="color: #ff0000;">0.0443439</span>,<span style="color: #ff0000;">0.0441941</span>,<span style="color: #ff0000;">0.046473</span>,
<span style="color: #ff0000;">0.0610626</span>,<span style="color: #ff0000;">0.0306428</span>,<span style="color: #ff0000;">0.0290065</span>,<span style="color: #ff0000;">0.0274841</span>,<span style="color: #ff0000;">0.026749</span>,<span style="color: #ff0000;">0.0253841</span>,<span style="color: #ff0000;">0.0332248</span>,<span style="color: #ff0000;">0.017024</span>,<span style="color: #ff0000;">0.016119</span>,
<span style="color: #ff0000;">0.0268456</span>,<span style="color: #ff0000;">0.0338681</span>,<span style="color: #ff0000;">0.0155172</span>,<span style="color: #ff0000;">0.0237691</span>,<span style="color: #ff0000;">0.0187949</span>,<span style="color: #ff0000;">0.0325556</span>,<span style="color: #ff0000;">0.0341566</span>,<span style="color: #ff0000;">0.0254065</span>,<span style="color: #ff0000;">0.0408127</span>,
<span style="color: #ff0000;">0.0009141</span>,<span style="color: #ff0000;">0.0272133</span>,<span style="color: #ff0000;">0.0149572</span>,<span style="color: #ff0000;">0.03</span>,<span style="color: #ff0000;">0.017</span>,<span style="color: #ff0000;">0.015</span>,<span style="color: #ff0000;">0.008</span><span style="color: #080;">&#41;</span>
&nbsp;
GOLD <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;"></span>,<span style="color: #ff0000;"></span>,<span style="color: #ff0000;"></span>,<span style="color: #ff0000;"></span>,<span style="color: #ff0000;"></span>,<span style="color: #ff0000;">0.563618771</span>,<span style="color: #ff0000;">0.082920792</span>,
<span style="color: #ff0000;"></span>,<span style="color: #ff0000;"></span>,<span style="color: #ff0000;"></span>,<span style="color: #ff0000;"></span>,<span style="color: #ff0000;"></span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.014285714</span>,<span style="color: #ff0000;">0.028985507</span>,<span style="color: #ff0000;"></span>,
<span style="color: #ff0000;">0.028169014</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.006849315</span>,<span style="color: #ff0000;">0.027586207</span>,<span style="color: #ff0000;">0.026845638</span>,<span style="color: #ff0000;">0.124183007</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.023255814</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.035714286</span>,
<span style="color: #080;">-</span><span style="color: #ff0000;">0.00617284</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.00621118</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.0325</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.082687339</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.007042254</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.002836879</span>,<span style="color: #ff0000;">0.001422475</span>,
<span style="color: #ff0000;">0.001420455</span>,<span style="color: #ff0000;"></span>,<span style="color: #ff0000;"></span>,<span style="color: #ff0000;">0.035460993</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.02739726</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.004225352</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.002828854</span>,
<span style="color: #ff0000;">0.002836879</span>,<span style="color: #ff0000;">0.004243281</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.002816901</span>,<span style="color: #ff0000;">0.002824859</span>,<span style="color: #ff0000;">0.225352113</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.057471264</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.051219512</span>,
<span style="color: #ff0000;">0.146529563</span>,<span style="color: #ff0000;">0.431390135</span>,<span style="color: #ff0000;">0.667919799</span>,<span style="color: #ff0000;">0.725864012</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.242041683</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.03962955</span>,<span style="color: #ff0000;">0.204305898</span>,
<span style="color: #ff0000;">0.291744258</span>,<span style="color: #ff0000;">1.205670351</span>,<span style="color: #ff0000;">0.296078431</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.327618087</span>,<span style="color: #ff0000;">0.1175</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.149888143</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.189473684</span>,
<span style="color: #ff0000;">0.061688312</span>,<span style="color: #ff0000;">0.195412844</span>,<span style="color: #ff0000;">0.244563827</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.156937307</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.022308911</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.036907731</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.085577421</span>,
<span style="color: #080;">-</span><span style="color: #ff0000;">0.057057907</span>,<span style="color: #ff0000;">0.176426426</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.021697511</span>,<span style="color: #ff0000;">0.009784736</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.046511628</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.222086721</span>,<span style="color: #ff0000;">0.005748128</span>,
<span style="color: #ff0000;">0.005368895</span>,<span style="color: #080;">-</span><span style="color: #ff0000;">0.060637382</span>,<span style="color: #ff0000;">0.014120668</span>,<span style="color: #ff0000;">0.23960217</span>,<span style="color: #ff0000;">0.217359592</span>,<span style="color: #ff0000;">0.04397843</span>,<span style="color: #ff0000;">0.17768595</span>,
<span style="color: #ff0000;">0.231968811</span>,<span style="color: #ff0000;">0.319224684</span>,<span style="color: #ff0000;">0.043178411</span>,<span style="color: #ff0000;">0.250359299</span>,<span style="color: #ff0000;">0.292413793</span>,<span style="color: #ff0000;">0.089292067</span>,<span style="color: #ff0000;">0.082625735</span>,
<span style="color: #080;">-</span><span style="color: #ff0000;">0.273303167</span>,<span style="color: #ff0000;">0.00124533</span>
<span style="color: #080;">&#41;</span>
&nbsp;
<span style="color: #228B22;"># truncate here, e.g.</span>
<span style="color: #228B22;"># 1928 - 2014 - 87 years</span>
<span style="color: #228B22;"># 1946 - 2010 - 65 years</span>
<span style="color: #228B22;"># lop off first 18 years</span>
<span style="color: #228B22;"># SP500=SP500[19:87]</span>
<span style="color: #228B22;"># BILLS=BILLS[19:87]</span>
<span style="color: #228B22;"># BONDS=BONDS[19:87]</span>
<span style="color: #228B22;"># GOLD=GOLD[19:87]</span>
<span style="color: #228B22;"># CPI=CPI[19:87]</span>
&nbsp;
<span style="color: #228B22;"># 1972 - 2014 - 43 years</span>
<span style="color: #228B22;"># 1982 - 2014 - 33 years</span>
&nbsp;
<span style="color: #228B22;"># put into a data frame (matrix)</span>
fnominal<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span>stocks<span style="color: #080;">=</span>SP500, bills<span style="color: #080;">=</span>BILLS, bonds<span style="color: #080;">=</span>BONDS, gold<span style="color: #080;">=</span>GOLD, CPI<span style="color: #080;">=</span>CPI<span style="color: #080;">&#41;</span>
freal<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span>stocks<span style="color: #080;">=</span>SP500<span style="color: #080;">-</span>CPI, bills<span style="color: #080;">=</span>BILLS<span style="color: #080;">-</span>CPI, bonds<span style="color: #080;">=</span>BONDS<span style="color: #080;">-</span>CPI, gold<span style="color: #080;">=</span>GOLD<span style="color: #080;">-</span>CPI<span style="color: #080;">&#41;</span>
&nbsp;
<span style="color: #228B22;"># compute real returns</span>
realreturns <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>freal, <span style="color: #ff0000;">2</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/mean.html"><span style="color: #0000FF; font-weight: bold;">mean</span></a><span style="color: #080;">&#41;</span>
realreturnspct <span style="color: #080;">=</span> realreturns<span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
<span style="color: #228B22;"># print them</span>
realreturnspct
&nbsp;
<span style="color: #228B22;"># compute real volatility (standard deviation of real returns)</span>
realsds <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/apply.html"><span style="color: #0000FF; font-weight: bold;">apply</span></a><span style="color: #080;">&#40;</span>freal, <span style="color: #ff0000;">2</span>, <span style="color: #0000FF; font-weight: bold;">sd</span><span style="color: #080;">&#41;</span>
realsdspct <span style="color: #080;">=</span> realsds<span style="color: #080;">*</span><span style="color: #ff0000;">100</span>
<span style="color: #228B22;"># print them</span>
realsdspct
&nbsp;
maxret <span style="color: #080;">&lt;-</span> runlp<span style="color: #080;">&#40;</span>freal<span style="color: #080;">&#41;</span>
minvol <span style="color: #080;">&lt;-</span> runqp<span style="color: #080;">&#40;</span>freal,<span style="color: #ff0000;"></span><span style="color: #080;">&#41;</span>
&nbsp;
<span style="color: #228B22;"># generate a sequence of 50 evenly spaced returns between min var return and max return</span>
efrontier <span style="color: #080;">=</span> loopqp<span style="color: #080;">&#40;</span>minvol, maxret, <span style="color: #ff0000;">50</span><span style="color: #080;">&#41;</span>
&nbsp;
apoints <span style="color: #080;">&lt;-</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/data.frame.html"><span style="color: #0000FF; font-weight: bold;">data.<span style="">frame</span></span></a><span style="color: #080;">&#40;</span>realsdspct<span style="color: #080;">&#41;</span>
apoints$returns <span style="color: #080;">&lt;-</span> realreturnspct
<a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/names.html"><span style="color: #0000FF; font-weight: bold;">names</span></a><span style="color: #080;">&#40;</span>apoints<span style="color: #080;">&#41;</span> <span style="color: #080;">=</span> <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Risk"</span>, <span style="color: #ff0000;">"Return"</span><span style="color: #080;">&#41;</span>
&nbsp;
<a href="http://astrostatistics.psu.edu/su07/R/html/stats/html/summary.lm.html"><span style="color: #0000FF; font-weight: bold;">png</span></a><span style="color: #080;">&#40;</span>filename<span style="color: #080;">=</span><span style="color: #ff0000;">"/temp/ltg11.png"</span>, width<span style="color: #080;">=</span><span style="color: #ff0000;">300</span>, height<span style="color: #080;">=</span><span style="color: #ff0000;">225</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/units.html"><span style="color: #0000FF; font-weight: bold;">units</span></a><span style="color: #080;">=</span><span style="color: #ff0000;">"px"</span><span style="color: #080;">&#41;</span>
plot_efrontier<span style="color: #080;">&#40;</span>efrontier, realreturnspct, realsdspct, apoints<span style="color: #080;">&#41;</span>
<a href="http://astrostatistics.psu.edu/su07/R/html/stats/html/summary.lm.html"><span style="color: #0000FF; font-weight: bold;">dev.<span style="">off</span></span></a><span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span>
&nbsp;
keep<span style="color: #080;">=</span><a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/c.html"><span style="color: #0000FF; font-weight: bold;">c</span></a><span style="color: #080;">&#40;</span><span style="color: #ff0000;">"Risk"</span>, <span style="color: #ff0000;">"%Stocks"</span>,<span style="color: #ff0000;">"%Bills"</span>,<span style="color: #ff0000;">"%Bonds"</span>,<span style="color: #ff0000;">"%Gold"</span><span style="color: #080;">&#41;</span>
<a href="http://astrostatistics.psu.edu/su07/R/html/stats/html/summary.lm.html"><span style="color: #0000FF; font-weight: bold;">png</span></a><span style="color: #080;">&#40;</span>filename<span style="color: #080;">=</span><span style="color: #ff0000;">"/temp/ltg12.png"</span>, width<span style="color: #080;">=</span><span style="color: #ff0000;">300</span>, height<span style="color: #080;">=</span><span style="color: #ff0000;">225</span>, <a href="http://astrostatistics.psu.edu/su07/R/html/graphics/html/units.html"><span style="color: #0000FF; font-weight: bold;">units</span></a><span style="color: #080;">=</span><span style="color: #ff0000;">"px"</span><span style="color: #080;">&#41;</span>
plot_transitionmap<span style="color: #080;">&#40;</span>efrontier<span style="color: #080;">&#91;</span>keep<span style="color: #080;">&#93;</span>, realreturnspct, realsdspct<span style="color: #080;">&#41;</span>
<a href="http://astrostatistics.psu.edu/su07/R/html/stats/html/summary.lm.html"><span style="color: #0000FF; font-weight: bold;">dev.<span style="">off</span></span></a><span style="color: #080;">&#40;</span><span style="color: #080;">&#41;</span></pre>
      </td>
    </tr>
  </table>
</div>
