---
id: 701
title: Why only millionaires should play Powerball
date: 2011-11-28T18:39:42+00:00
author: Druce Vertes
layout: post
guid: /?p=701
permalink: /2011/11/why-only-millionaires-should-play-powerball/
post-views:
  - "6633"
dsq_thread_id:
  - "486834961"
categories:
  - datascience
tags:
  - datascience
---
> *<a href="http://en.wikipedia.org/wiki/File:Nzlottopowerball.PNG"><img title="The Lotto Powerball logo" src="/assets/2020/powerball.jpg" alt="The Lotto Powerball logo" width="355" height="200" /></a>[ROCKY HILL, Conn](http://newyork.cbslocal.com/2011/11/28/254-million-powerball-jackpot-winner-comes-forward/). &#8212; Three asset managers from Connecticut’s affluent New York suburbs claimed a $254 million Powerball jackpot on Monday off a $1 ticket.*
<!--more-->

Lottery tickets are generally a terrible deal in terms of expected value -- the lottery pays out far less in winnings than it receives in ticket sales. It has to pay expenses and show a profit. Then the winner has to pay a big income tax bill.

But occasionally, after no one wins the big prize several drawings in a row, the jackpot gets so big that the expected value is positive.

[Edit 1/7/2016: This is <strike>rare</strike> unrealistic. For instance the current record jackpot is quoted as $800m. [The lump-sum payout would be only $496m.](https://www.usamega.com/powerball-jackpot.asp) The odds of winning a single bet is 1/292,201,338. So a $2 bet is only worth $1.69. This disregards the possibility of a split pot, which is significant. If you pay the top Federal tax rate of 39.6%, that $1.69 is only worth $1.02. NYC rate maxes out at 12.7%, bringing the top combined income tax rate to 52.3%, leaving $0.81 per $2 bet.]

You might think that when there’s positive expected value, it’s a good time to buy a ticket. Actually, it turns out that’s still a losing strategy. Why? Because unless you’re a millionaire, the correct amount to bet is very small. And if you’re not a millionaire, a single ticket is an overbet. You almost always go broke before you hit the jackpot. Paradoxically, even though each individual bet has positive expected value, your expected long-run profit if you bet every week is less than zero.

What’s the right amount to bet on a risky, but profitable proposition?  
<!--more-->

  
Suppose you had access once a day to a ‘sure thing’ that won 2/3 of the time, and paid $2 when you bet $1.  And suppose you had $100 to start, and you bet 1$ every day.

You would make $1 a day on average. (2 times out of 3 you would win $2, the third time you would lose $1. You made $3, or $1 a day). If you bet 1% of your bankroll every day, you would make 1% per day. Not bad, but not really maximizing your 100% edge.

Suppose you bet your whole bankroll every day. Your expected value every day is now +$100, instead of $1. But eventually you will lose your whole bankroll, and then you won’t be able to play again. As time goes to infinity, your expected growth rate approaches zero.

The [Kelly Criterion](http://home.williampoundstone.net/Kelly/Kelly.html), created by John Kelly in the 50s at Bell Labs, tells you how much you should bet to maximize your return. The amount is _edge / odds. _Here, the edge is 1 _ you win on average, 100% of your bet each day. The odds you are offered are 2:1.  You should bet 1/2 of your stack each time.

If you do, the following should hold

  * Your long run growth rate is maximized
  * Your long run growth rate is _e_<sup>(1/3) ln(1/2) * (2/3) ln(2)</sup>-1 = 26% per day  
    (1/3 of the time the outcome is you end up with 1/2 of your bankroll, 2/3 of the time you double your bankroll)
  * At any time, you have (1-p) probability of going below fraction p of your bankroll at some point in the future. For example, you have  a 1/2 chance of losing 1/2 of your bankroll, a 10% chance of losing 90% of your bankroll.

As you increase your bet size as a percentage of your capital, initially your expected long-run growth rate goes up linearly, in proportion to your bet size. Eventually, it flattens, and then plummets off a Cliff Of Death to [Gambler’s Ruin](http://en.wikipedia.org/wiki/Gambler's_ruin). So an optimal strategy is quite volatile and risky. And even if you have a big edge, if you overbet, you go broke.

Now let’s suppose there is a $200m jackpot (in present value, after all expenses and taxes), and you have 1/100m chance of winning.

What is the appropriate amount to bet? The expected value is about 2x the bet. Your edge is about 100%. The odds posted are 200,000,000:1 . So your optimal bet is approximately 1 / 200,000,000 of your stash. If you have $200,000,000,  you should bet $1, if you have $100,000, you should bet 1/20th of a cent.

What is your expected growth rate if you have $100,000 and you bet $1? Plugging in the formula from 2 above, you are betting .001% of your bankroll, and your expected return is -.000992% (almost the entire bet).

If you make that $1 bet every day for 100,000 days, ie longer than your natural life, more than 999 times out of 1000, you will go broke before you hit that jackpot.

As another illustration _ suppose you bet .001% of your net worth on a single ticket in the lottery at those odds (disregarding that in Powerball you can’t put more or less than the price of a ticket on a combo). You do it 2,000,000 times, and then you hit the jackpot _ pretty lucky since the odds are 100,000,000 to 1, right? But by the time you hit the jackpot, your bankroll has been so depleted that winning 200m x your bet, you only get back to 41% of your original net worth _ because you overbet!

Left as an exercise, at what bankroll your expected return is exactly 0, the Sharpe ratio of the optimal bet.

###### Related articles

  * [$254 Million Powerball Jackpot Winner Comes Forward](http://newyork.cbslocal.com/2011/11/28/254-million-powerball-jackpot-winner-comes-forward/) (newyork.cbslocal.com)
  * [Do Not Play the Lottery Unless You Are a Millionaire](http://r6.ca/blog/20090522T015739Z.html)
  * [Fortune’s Formula](http://www.amazon.com/Fortunes-Formula-Scientific-Betting-Casinos/dp/0809045990), by William Poundstone (a rollicking good read, if you’re into degenerate gamblers, investors and quants)
  * [A New Interpretation of Information Rate](http://www.bjmath.com/bjmath/kelly/kelly.pdf) By J. L. Kelly, Jr.

