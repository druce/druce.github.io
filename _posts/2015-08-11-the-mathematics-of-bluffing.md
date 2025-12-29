---
id: 3831
title: The Mathematics of Bluffing
date: 2015-08-11T00:08:01+00:00
author: Druce Vertes
layout: post
guid: /?p=3831
permalink: /2015/08/the-mathematics-of-bluffing/
post-views:
  - "3805"
categories: poker
tags: poker
---
> *A quick post about poker! That seemingly simple, deceptively complex game with a number of interesting [parallels to investing](/2013/08/risk-arbitrage-investing-and-poker/). I just watched the [MIT lectures on ‘Poker Theory and Analytics,’](http://ocw.mit.edu/courses/sloan-school-of-management/15-s50-poker-theory-and-analytics-january-iap-2015/index.htm) an ‘Independent Activities Period’ mini-course, and for our mutual amusement, I worked through the math on bluffing, which is an interesting problem I had never done the full deep dive into. Here it is, including a [Mathematica notebook](/assets/wp-content/uploads/2015/08/poker.nb).*
<!--more-->
Here’s how we set up a pure bluffing scenario:

  * There is a $1 pot.
  * There are 2 players. Player 1 flips a coin.
  * Player 1 looks at the coin, which represents his ‘hand.’ Player 2 does not see the coin.
  * If it’s heads, Player 1 has ‘the nuts,’ the winning ‘hand.’
  * If it’s tails, Player 1 has the worst possible ‘hand’, loses to whatever Player 2 has.
  * Player 1 gets the option to bet $1, or check.
  * If Player 1 bets, Player 2 can call the $1 bet, or fold. If Player 2 folds, Player 1 wins the pot without ‘showing down’ the coin. If Player 2 calls, the coin is revealed and best hand wins the pot (heads: Player 1, tails: Player 2).
  * If Player 1 checks, the coin is revealed and best hand wins the pot.

This maps pretty well to a pure bluffing scenario on the river. You either have the nuts 50% of the time, or the worst possible hand the other 50%. This only covers whether Player 1 should bluff and whether Player 2 should then call. Player 2 doesn’t have the option to bet if you check, raise if you bet, and the bluff amount is fixed.

How should Player 1 play?

  * _If Player 1 has the nuts, he (or she) should always bet for value._ Why? Betting is always at least as good or better than checking: 
      * If Player 2 folds, Player 1 wins the $1 pot (same as Player 1 checking first).
      * If Player 2 calls, Player 1 wins $2, the pot plus the called bet, better than checking first. Betting always has an expected value (EV) >= checking.[<sup>1</sup>](#1)
  * _If Player 2 has no hand_, it gets more interesting!_  
    Suppose Player 1 bluffs when coin comes up tails:  
_ </p> 
      * If Player 2 then calls, Player 1 loses the $1 bet. EV: -1.
      * If Player 2 folds, Player 1 wins the $1 pot. EV: +1.
    
    _Suppose Player 1 checks when coin comes up tails:  
_ 
    
      * Player 2 checks and Player 2 wins the pot. EV: 0. (Only 1 outcome since we’re not letting Player 2 bet.)

When Player 1 has nothing, neither strategy dominates.

Here is a ‘pure strategy’ matrix.

<table style="height: 185px;" border="1" width="559">
  <tr>
    <td style="background-color: #eeeeee;">
    </td>
    
    <td style="background-color: #eeeeee;">
      <strong>P2 tight<br /> </strong>Fold to any bet
    </td>
    
    <td style="background-color: #eeeeee;">
      <strong>P2 loose<br /> </strong>Call any bet
    </td>
  </tr>
  
  <tr>
    <td style="background-color: #eeeeee;">
      <strong>P1 passive</strong><br /> Value bet heads, check tails
    </td>
    
    <td style="background-color: #ccffcc;">
      P1 EV: 0.5<br /> P2 EV: 0.5
    </td>
    
    <td style="background-color: #ccffcc;">
      P1 EV: 1<br /> P2 EV: 0
    </td>
  </tr>
  
  <tr>
    <td style="background-color: #eeeeee;">
      <strong>P1 aggressive</strong><br /> Value bet heads, bluff tails
    </td>
    
    <td style="background-color: #ccffcc;">
      P1 EV: 1<br /> P2 EV: 0
    </td>
    
    <td style="background-color: #ccffcc;">
      P1 EV: 0.5<br /> P2 EV: 0.5
    </td>
  </tr>
</table>

There is _no stable outcome to this game if each player sticks to a single strategy_.

If Player 1 is aggressive, it’s better for Player 2 to be loose: he catches all the bluffs for $2, and loses all the value bets for only $1. If Player 2 is loose, it’s better for Player 1 to be passive: he always gets $1 value for betting, and never gets caught bluffing. In each cell, one player is better off moving counterclockwise to the next cell, and they chase each other around the matrix.

In the lingo, there is _no pure strategy Nash equilibrium_.

Now suppose each player can choose a _mixed strategy._ Player 1 randomly picks ‘aggressive’ p<sub><small>bluff</small></sub>% of the time. Player 2 randomly picks ‘loose’ p<sub><small>call</small></sub>% of the time.

Now, if Player 2 calls 50% of the time, Player 1 is indifferent to betting or checking. Calling at random 50% of the time is an _unexploitable_ strategy for Player 2.

Now suppose Player 1 bets 50% of the time he has no hand, and gives up the pot 50% of the time. This strategy presents Player 2 with a ratio of 2 value bets for every bluff.

  * 50% of hands Player 1 has the nuts and bets
  * 25% of hands Player 1 has no hand and bluffs.
  * 25% of hands Player 1 has no hand and folds, giving up the pot.

If Player 2 calls, 1/3 of time he wins $2 ($1 pot + $1 bet), 2/3 of time he loses $1. This has an EV of 0, same as folding. Player 2 is indifferent to calling or folding. Bluffing at random 1/3 of the bets (50% of time the coin is tails) is an _unexploitable_ strategy for Player 1.

If Player 1 always bets for value on heads and bluffs 50% of the time on tails, while Player 2 calls 50% of the time, this is a _mixed-strategy Nash equilibrium_: neither player can improve by changing the mix of of strategies.

Player 2 breaks even on calls, Player 1 breaks even on bluffs, but wins $1.50 on average each value bet ($1 pot plus additional $1 50% of the time the bet is called). Player 1 gets $0.75 of the overall EV vs. $0.25 for Player 2. By bluffing, Player 1 gets 50% more EV per hand vs. only betting for value.  As an exercise, think about what happens to each player’s EV if one of them switches strategies.

So, that’s the picture of the problem and the Nash equilibria. Now let’s solve it more generally and get some more intuition for what the solution and P/L look like for different bet sizes.

Suppose we set up the problem more generally:

_P_: initial pot =1  
_S_: bet size as fraction of pot  
_p<small><sub>bluff</sub></small>_: probability of bluff  
_p<small><sub>call</sub></small>_: probability of call

_Q: How often should Player 1 bluff?_  
_A: Often enough to make Player 2 indifferent to calling or folding._

_<small><span style="font-size: 16px; line-height: 24px;">EV</span><sub>call</sub></small>_: 1+_S_ when Player 2 calls a bluff. _-S_ when Player 2 calls a value bet.  
_<small><span style="font-size: 16px; line-height: 24px;">EV</span><sub>fold</sub></small>_: 0

Setting Player 2’s _<span style="font-size: 16px; line-height: 24px;">EV</span><small><sub>call</sub></small> = <span style="font-size: 16px; line-height: 24px;">EV</span><sub><small>fold</small></sub>_

_p<small><sub>bluff</sub> </small>_(1 +_S_) _ (1 _ _p<small><sub>bluff</sub></small>_) _S_ = 0

Solving for _p<small><sub>bluff</sub></small>:_

<img src="/assets/wp-content/ql-cache/quicklatex.com-7738253aa4c4db2e66749760ea3dc03e_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#112;&#95;&#123;&#98;&#108;&#117;&#102;&#102;&#125;&#61;&#92;&#102;&#114;&#97;&#99;&#123;&#83;&#125;&#123;&#49;&#43;&#50;&#83;&#125;" title="Rendered by QuickLaTeX.com" height="24" width="105" style="vertical-align: -8px;" /> 

There’s a simpler way of expressing this. Define ratio of bluffs to value bets as

<img src="/assets/wp-content/ql-cache/quicklatex.com-12559b16589f3c82d00935ac3d3a12c0_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#111;&#95;&#123;&#98;&#108;&#117;&#102;&#102;&#125;&#32;&#61;&#32;&#92;&#102;&#114;&#97;&#99;&#123;&#112;&#95;&#123;&#98;&#108;&#117;&#102;&#102;&#125;&#125;&#123;&#49;&#45;&#112;&#95;&#123;&#98;&#108;&#117;&#102;&#102;&#125;&#125;" title="Rendered by QuickLaTeX.com" height="26" width="125" style="vertical-align: -10px;" /> .

Then

<img src="/assets/wp-content/ql-cache/quicklatex.com-8184626546e3f72a803bb1500b5762d5_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#111;&#95;&#123;&#98;&#108;&#117;&#102;&#102;&#125;&#32;&#61;&#32;&#92;&#102;&#114;&#97;&#99;&#123;&#83;&#125;&#123;&#49;&#43;&#83;&#125;&#32;" title="Rendered by QuickLaTeX.com" height="24" width="96" style="vertical-align: -8px;" /> 

In our example, S=1, as bet = pot size; our game-theory optimal bluffing ratio is 1/2; We should bluff half as often as we value bet.

_Q: How often should Player 2 call?_  
_A: Often enough to make Player 1 indifferent to checking or bluffing._

_<small><span style="font-size: 16px; line-height: 24px;">EV</span><sub>bluff</sub></small>_: P=1 when Player 2 folds. _-S_ when Player 2 calls a bluff bet of S.  
_<small><span style="font-size: 16px; line-height: 24px;">EV</span><sub>check</sub></small>_: 0

_<small><span style="font-size: 16px; line-height: 24px;">EV</span><sub>bluff</sub></small>_ = (1 _ _p<small><sub>call</sub></small>_) _ _p<small><sub>call</sub></small> S_  
_<small><span style="font-size: 16px; line-height: 24px;">EV</span><sub>check</sub></small>_: 0

Setting Player 1’s _<span style="font-size: 16px; line-height: 24px;">EV</span><sub><small>bluff</small></sub> = <span style="font-size: 16px; line-height: 24px;">EV</span><small><sub>check</sub></small>_

(1 _ _p<small><sub>call</sub></small>_) _ _p<small><sub>call</sub></small> S_ = 0

Solving for _p<small><sub>call</sub></small>_

<img src="/assets/wp-content/ql-cache/quicklatex.com-858b758a7cf2c163645b7be11b35a5a0_l3.png" class="ql-img-inline-formula quicklatex-auto-format" alt="&#112;&#95;&#123;&#99;&#97;&#108;&#108;&#125;&#61;&#92;&#102;&#114;&#97;&#99;&#123;&#49;&#125;&#123;&#49;&#32;&#43;&#32;&#83;&#125;" title="Rendered by QuickLaTeX.com" height="24" width="85" style="vertical-align: -8px;" /> 

Plotting bluff ratio, call probability, and EV as a function of pot size:



&nbsp;

_Interpretation_: When bet size (_S_) is close to 0 as fraction of pot, it is always worth it for Player 2 to call a small bet to get a chance at a big pot and to make sure Player 1 is honest. As _S_ &rarr; 0, calls approach 100%. Best response for player 1 is to never bluff, and they just split the pot. As bet size goes up, it’s more costly for Player 2 to call a big bet to win a small pot and keep Player 1 honest. Therefore bluff frequency goes up as _S_ goes up, and Player 1 gets a higher fraction of the pot. As _S_ &rarr; &infin;, Player 1’s EV &rarr; 1 and Player 2’s EV &rarr; 0.

If we do a 3d plot of EV against each player’s strategy with _S_ = 1, we get this:

[<img class="aligncenter size-full wp-image-3915" src="/assets/wp-content/uploads/2015/08/poker2.png" alt="poker2" width="542" height="368" srcset="/assets/wp-content/uploads/2015/08/poker2.png 542w, /assets/wp-content/uploads/2015/08/poker2-300x204.png 300w" sizes="(max-width: 542px) 100vw, 542px" />](/assets/wp-content/uploads/2015/08/poker2.png)

Here is an [interactive version](https://plot.ly/~drucev/65.embed) you can explore from various angles by clicking and dragging.

It’s a saddle anchored in 2 upper corners and 2 lower corners at EV=0.5. The four corners represent pure strategies of 100% aggressive/passive/tight/loose. At the Nash equilibrium of bluff ratio = 0.5 and call % = 0.5, the 2 axes along which each player can adjust his strategy form a horizontal plane: neither can unilaterally improve by changing strategy. However, if one player moves away from the Nash equilibrium on the axis representing his strategy, he becomes vulnerable to exploitation by the other: movement along the other player’s strategy axis can improve the other player’s EV.

If we change _S_ from 0 to 1, we see something like this (rotated 90&deg; clockwise from above):

[<img class="aligncenter size-full wp-image-3929" src="/assets/wp-content/uploads/2015/08/poker.gif" alt="Animation" width="480" height="360" />](/assets/wp-content/uploads/2015/08/poker.gif)

&nbsp;

Conclusions: 1) Poker is a pretty deep game (this wasn’t as quick a post as I thought!) and 2) This is a way to get some game theory intuition about one part of the game _ bluffing and calling. If you’re into this sort of thing, I recommend the [MIT online poker class](http://ocw.mit.edu/courses/sloan-school-of-management/15-s50-poker-theory-and-analytics-january-iap-2015/index.htm) mentioned above (this is a deeper dive into part of the last lecture by Matt Hawrilenko), and [Mathematics of Poker](http://www.amazon.com/Mathematics-Poker-Bill-Chen/dp/1886070253), by [Bill Chen](https://en.wikipedia.org/wiki/Bill_Chen), a math and finance quant at Susquehanna who has won a couple of WSOP bracelets.

This is just an analysis of a simplifed model of one street! And yet, heads-up limit hold’em was recently [weakly solved](http://www.theverge.com/2015/1/8/7516219/Texas-Hold-Em-poker-solved-computer-program-cepheus). Computers simulated 2 players playing each other as well as possible for 900 CPU years, iteratively improving complex strategies (terabyte databases of all possible moves and responses) until they were provably so good that no one could have an advantage of more than 1 big blind per 1,000 hands. [See if you can beat that near-perfect strategy!](http://poker.srv.ualberta.ca/)

_No-limit_ hold’em with up to 10 players adds giant levels of complexity…No-limit bots are pretty good, but [the pros still beat them](https://en.wikipedia.org/wiki/Claudico).

_Note: the first version of this post had a dumb error and some wonky graphs but I think it’s all good now. If you see any mistakes let me know!  
_  
<small><a name="1"></a><sup>1</sup> We say that the Player 1 strategy of always betting when the coin comes up heads <em>dominates</em> the strategy of checking: it is sometimes a better decision and always at least as good. If it is always strictly better than an alternative strategy, we say it <em>strictly dominates</em>. In our case Player 1’s strategy of always betting heads sometimes leads to the same outcome as checking (if Player 2 never calls), so we say it <em>weakly dominates</em> the strategy of always checking.</small>
