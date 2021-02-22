---
id: 7114
title: 'Optimal Safe Withdrawal for Retirement Using Certainty-Equivalent Spending, Revisited'
date: 2021-02-19T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7114
permalink: /2021/02/optimal-safe-withdrawal-for-retirement-using-certainty-equivalent-spending-revisited
categories: 
tags: 

---
> *Revisiting Bengen's "4% Rule" at various levels of risk aversion, generalizing beyond a simple fixed-withdrawal, no-shortfall rule.*
<!--more-->

*Disclaimer: not investment advice! For educational purposes only. Past performance may not be representative of future results.*

A few years ago I was researching withdrawal rates for a relative, and I came across the [wonderful paper by Bill Bengen](https://www.retailinvestor.org/pdf/Bengen1.pdf) on the '4% rule.' The original 4% rule, subsequently [updated](https://www.amazon.com/Conserving-Client-Portfolios-During-Retirement/dp/0975344838) by Bengen, says that you can spend 4% of your portfolio in the first year of retirement, adjust that number for inflation each year, and, in a 30-year retirement, empirically you would never have run out of money.

Bengen's approach optimizes by finding the highest withdrawal rate subject to a hard no-shortfall constraint.

Then I started thinking, what would happen if, instead of a hard no-shortfall constraint and a fixed withdrawal rate, we asked what flexible rule would maximize spending for different levels of risk aversion?

So I [maximized 'certainty-equivalent' spending](https://druce.ai/2016/08/safe-retirement-spending-using-certainty-equivalent-cash-flow-and-tensorflow/), i.e. actual spending discounted by volatility, at different levels of risk aversion. But I might have overcomplicated it.[^1]  So here I reran it with simpler rules, newer optimization modules, and a more flexible Python framework.

This leads to a generalized Bengen rule where the 4% rule is the 'infinite-risk-aversion' solution that requires a fixed constant withdrawal level and never experiences any reduction. A 'risk-neutral' rule would find the withdrawal amount that would have maximized spending irrespective of any reductions (probably not recommended). In between, different levels of risk aversion lead to different rules.

Let me give a result first and then explain in more detail what it means, and how it was computed:

**'Safe' rule:**

- Allocate 73.3% to stocks. Each year, withdraw 3.516% of starting portfolio + 1.114% of current portfolio. 
- Average spending over 30-year retirement: 5.309% of starting portfolio
- Worst spending: 3.555% of starting portfolio

Chart of 30-year spending outcomes of 64 retirement cohorts 1928-1991, risk aversion=16 (Shaded area is middle 50% of outcomes.)
	![Chart of 30-year spending outcomes of 64 retirement cohorts 1928-1991](/assets/2021/gamma16.png)


**'Risky' rule:**
- Allocate 88.6% to stocks. Each year, withdraw 2.700% of starting portfolio + 2.985% of current portfolio.
- Average spending over 30-year retirement: 6.914% of starting portfolio
- Worst spending: 2.784% of starting portfolio

Chart of 30-year spending outcomes of 64 retirement cohorts 1928-1991, risk aversion=4 (Shaded area is middle 50% of outcomes.)
![Chart of 30-year spending outcomes of 64 retirement cohorts 1928-1991](/assets/2021/gamma4.png)

The rule I evaluated works like this:

*Asset allocation:* Invest a fixed percentage in stocks and bonds, i.e. 60/40. One parameter determines the allocation: `stock_alloc`, with `bond_alloc` = 1 - `stock_alloc`.

*Withdrawal:* Each year of retirement, withdraw a *linear function* of the current portfolio, subject to a *floor*. 3 parameters determine the withdrawal: `fixed_pct`, `variable_pct`, `floor_pct`. Withdraw `fixed_pct` (intercept), plus `portfolio value` * `variable_pct` (slope); or `floor_pct`, whichever is greater: `max(floor_pct, fixed_pct + variable_pct * portval / 100)`. 

**Example:**

| Portfolio value      | fixed_pct=2.0 | variable_pct=3.0 | floor_pct=4.0 | Withdrawal |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| 100         | 2.0         |   3.0       |  4.0        | 5.0         |
| 110         | 2.0         |   3.3       |  4.0        | 5.3         |
| 90          | 2.0         |   2.7       |  4.0        | 4.7         |
| 60          | 2.0         |   1.8       |  4.0        | 4.0         |


Given these 4 parameters: `stock_alloc`, `fixed_pct`, `variable_pct`, `floor_pct`, a stream of stock and bond returns, and a starting portfolio, we can calculate how much you would have spent in each year of a 30-year retirement.

And given 64 historical retirement cohorts, we can calculate all the cohort retirement outcomes for a set of parameters, assign a metric to each one, and apply an optimization algorithm to find the parameters that yield the best metric.

The metric we choose to maximize here is *certainty-equivalent spending (CE spending)* under *constant relative risk aversion (CRRA).*

CRRA means that you prefer a certain or constant cash stream to a variable or risky one drawn from a distribution; and your preference is scale-invariant, i.e. if I give you a coin-flip for a given edge, say lose $1/win $2, you will bet the same percentage of your wealth, whether you have $100 or $100,000. And your risk aversion parameter *gamma* determines how much you choose to bet. If you are risk-neutral you bet more, if you are highly risk-averse, you bet less. The Kelly-optimal bet corresponds to gamma=1, or log utility.

To calculate CE spending at a level of risk aversion gamma, we convert dollar income streams to CRRA utility using gamma. We take the average utility, and convert that utility back to dollar spending. This gives us the constant-stream cash flow that would have the same utility as the original variable cash flow.

In essence, we are discounting the cash flows based on their volatility, in the manner implied by CRRA utility. And we find the retirement strategies that maximize CE spending.

I don't claim that CE spending is the perfect metric to maximize according to any economic theory. But I assert that:

- CE spending is intuitive, it's real spending discounted based on volatility and a risk aversion parameter. Units are real dollars. CE spending is the variable income stream converted to an equivalently desirable constant income stream.
- In practice we *can* find strategies that maximimize CE spending. Maximizing expected utility directly is more abstract, less intuitive and leads to computational, calibration problems.
- Directionally, CE spending is a metric that you *could* plausibly *want* to maximize.
- CE spending is a quantity that is derived from CRRA utility and *consistent* with it (even though maximizing CE spending over a distribution of returns is not at all the same as maximizing expected utility).
- Maximizing CE spending is *informative*. It allows us to tweak a single gamma dial to identify plausibly optimal parameters for complex strategies at different levels of risk aversion.

This is a simple model but it may useful. Here is a complete table of results at different levels of risk aversion gamma.

![optcetable.png](/assets/2021/optcetable.png)

Using some of these rules, a retiree could often achieve a higher expected withdrawal rate, at the cost of a modest worsening of the worst-case withdrawal rate.

In creating this analysis, the goals were:

1) *A simple model* where we can create understandable strategies that may improve on a fixed withdrawal, at varying levels of risk aversion.

2) Try out leading gradient-free optimizing frameworks, including scipy.optimize [L-BFGS-B](https://docs.scipy.org/doc/scipy/reference/optimize.minimize-lbfgsb.html#optimize-minimize-lbfgsb), [Optuna](https://optuna.org/), [Hyperopt](http://hyperopt.github.io/hyperopt/), [Platypus](https://github.com/Project-Platypus/Platypus), [Nevergrad](https://facebookresearch.github.io/nevergrad/optimization.html), [Ax](https://ax.dev/). (L-BFGS-B and Optuna worked best, with Dlib, Platypus, and Nevergrad yielding useful results.)

3) *Build a Python framework* for safe withdrawal retirement problems that accomodates:

- *Any generator of historical asset returns:* historical, Monte Carlo, roll your own market environment as a Python generator function.
	
- *Any asset allocation strategy:* fixed weights, glidepath schedules, roll your own based on any parameters.
	
- *Any withdrawal strategy:* fixed withdrawal, variable percentage, combinations, glidepaths, any function.
	
- *Any metrics* to evaluate retirement cohort outcomes: total spending, certainty-equivalent spending, roll your own. Support survival tables, i.e. calculate expected metric for living retirees taking into account retirement age and survivorship)
	
- *Any (gradient-free) optimizer* to find best parameters: e.g. asset allocation, withdrawal parameters to maximize a metric in the given market environment.

[^1]: One thing I did in 2016 was attempt to optimize over a full asset allocation and spending glidepath, i.e. a schedule of stock/bond allocation and spending for each year of retirement. A problem with that is that when you optimize over all historical cohorts, it will overfit to the worst year of the worst retirement cohort. If 1966 is the worst year to retire and 1974 is the most damaging equity year, it will reduce equity for the 18th year of retirement everywhere. One approach to mitigate that is to force the glidepath to be strictly descending, so at least it doesn't chop equity and then arbitrarily restore it in the 19th year. Another approach could be to ditch optimizing over historical cohorts and do Monte Carlo only. A second problem was that, on the one hand TensorFlow lets you use the GPU for fast optimization, but it's a gradient-based method, and the gradients seem to turn out to be more messy than one might expect, you may have to restart several times to get a good result. So gradient-free optimizers and simpler parameters may be a better approach.
