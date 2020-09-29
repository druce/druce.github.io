---
id: 89
title: 'ETFs &#8211; Get Off My Lawn!'
date: 2011-06-29T22:47:47+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=89
permalink: /2011/06/etfs-get-off-my-lawn/
post-views:
  - "5899"
dsq_thread_id:
  - "346649210"
categories:
  - Uncategorized
---
_The greater the institution, the greater the chances of abuse. &#8211; Mohandas K. Gandhi_

Two diametrically opposing story lines, both true.

In one corner &#8211; [ETFs are making mutual funds obsolete](http://www.marketwatch.com/story/mutual-funds-lose-their-battle-with-etfs-2011-06-08?siteid=rss&rss=1).

In the other corner &#8211; [ETFs are a potential source of systemic risk](http://www.economist.com/node/18864254). Also &#8211; [ETFs &#8211; Worse Than I Thought](http://www.terrysmithblog.com/straight-talking/2011/05/etfs-worse-than-i-thought.html).<!--more-->

<div>
  I love ETFs. ETFs have several compelling advantages vs. mutual funds:
</div>

<div>
  <ul>
    <li>
      <em>Liquidity</em> &#8211; An ETF can be traded all day, with limits, stops etc. A mutual fund can only be traded once a day at the closing price, and you have to place your order for better or worse well before the market close. (Fallout from the <a href="http://www.newyorker.com/archive/2003/10/20/031020ta_talk_surowiecki">late trading scandals</a> &#8211; a stunning breach of trust by much of the mutual fund industry).
    </li>
    <li>
      <em>Tax efficiency</em>. ETFs are generally taxed just like a stock. When you buy an ETF, you set your own cost basis. When you buy a mutual fund, you buy into the existing cost basis. You could buy a mutual fund in January and lose money all year; then get a 1099 at the end of the year that shows they sold some positions at a profit, and you have a capital gains tax bill. If you&#8217;re a buy and hold investor, you get screwed a bit &#8211; other fund holders trade in and out and generate capital gains distributions and tax bills you have to pay.
    </li>
    <li>
      <em>Diversification</em>. There are interesting ETFs like GLD (gold), SLV (silver), with exposures that you otherwise couldn&#8217;t put in your IRA account. Or, you can short ETFs in your margin account. In addition to giving you diversified exposure, they are potentially more liquid and less exposed to short squeezes than single names.
    </li>
    <li>
      <em>Ultra-low expenses</em>. On $100,000 in SPY, the S&P 500 ETF, you would pay $90 a year, vs. about $150 in VFINX, the already super-cheap Vanguard S&P index fund.
    </li>
  </ul>
</div>

<div>
  But ETFs can be complicated and have pitfalls investors should be aware of.
</div>

  * _Pricing and liquidity_. Suppose your fund owns positions in Australia, but your mutual fund is traded at the NY closing price. The mutual fund would typically use the Australia end of day price to calculate an NAV. However, if the market in New York has a big move, that&#8217;s a stale price. Not normally a big deal, as long as your fund limits active trading scalpers who might try to take advantage. But for any mutual fund or ETF, pricing can be a little trickier than meets the eye.&nbsp;  
    &nbsp;  
    In the case of an ETF, arbitrage should keep the ETF price reasonably in line with the underlying, _as long as the underlying is liquid_. If there is a rush into SPY, driving the price too high compared to the underlying S&P stocks, market makers can buy the underlying stocks, deliver them to the ETF custodian in exchange for SPY shares, creating more SPY shares and a small arbitrage profit. S&P stocks are highly liquid, so the ETF spread to fair value is unlikely to get large. </p> 
    In the case of ETFs in less liquid markets, drawing the same conclusion may not be appropriate. [IWM](http://etfdb.com/etf/IWM/), the Russell 2000 ETF, has a market cap of $16b and traded 2oom shares or $10b a day during the worst of the financial crisis. Ballpark, those numbers are over 1% of the market cap of the Russell 2000. These are pretty thinly traded stocks. The arb is harder to execute. There can be a liquidity mismatch between the ETF and the underlying, and big moves in and out of ETFs of less liquid stocks could have a significant impact on the underlying prices. In a benign market, the ETF could offer great apparent liquidity, but in a crash, trades in the ETF could exacerbate volatility and could be at much larger spreads vs. fair value.
    
    ETF providers generally provide historical premium/discount analyzers. Even in current relatively benign and liquid markets, and only looking at end of day premium/discount, it can be [as large as 1% from fair value](http://tools.ishares.wallst.com/ishares/qc/old_us/research/tools/premiumDiscount.asp?symbol=MXI). During the financial crisis, _the universe of taxable bond ETFs_ traded as low as [~7% discount to reported NAVs](http://www.indexuniverse.com/sections/news/4802-study-raises-questions-about-creationredemption-process.html?start=1), with individual ETFs at even higher spreads.

  * _Shorting_. There seems at least a theoretical potential for shorts to disrupt ETFs. In the case of a stock, short-sellers can borrow the stock and sell it. If short interest is high, the supply of shares can effectively expand by the number that can be borrowed and sold short. Since shares can be borrowed more than once, there is no hard limit to the supply of shares. There must always be n times the float long, and n-1 times the float sold short, so the market as a whole is always net long the the available float. In practice ordinary shares become hard to borrow before the longs become a multiple of the float, since all shareholders don&#8217;t lend their stock. The twist with ETFs is that the float varies as ETFs are created and redeemed by the custodian. Suppose there are 1m shares of an ETF, and short-sellers borrow 500,000 and sell them. Now there are 1.5m shares held long and 500,000 shares sold short. Now suppose 500,000 long holders show up and exchange their ETF for underlying shares. You can see that it&#8217;s quite easy to get to 100% sold short, and in fact it&#8217;s not unheard of to have say longs of [4x the float and shorts of 3x the float](http://issuu.com/ariweinberg/docs/etfs_successfully_managing_stress?viewMode=presentation)! Suppose an ETF share that&#8217;s been borrowed and shorted 3x gets redeemed by the final buyer. The shorts all have to find a new borrow or cover the short. In practice, the sponsor may be able to help maintain an orderly market. But it&#8217;s quite easy to imagine volatility and short squeezes in an ETF that represents illiquid underlying stocks and attracts a lot of short interest and directional speculation.
  * _Levered ETFs._ Suppose you have a 3x levered ETF. It&#8217;s priced at $100, and owns $300 worth of some underlying (and borrowed $200). The underlying goes down 10% today to 270. The ETF goes down to 70 (270 &#8211; 200 leverage). It rebalances to remain 3x levered, so it sells $60 worth of the underlying and pays down the loan. It starts off day 2 worth $70, owns $210 worth of stock (borrowed $140). Now the stock goes up 11.11%, ie back where it was at the start.  You only made $23.33 back. So the underlying is now unchanged, but you lost $6.67. It&#8217;s quite conceivable that in a volatile market, both the bull (levered long) and bear (levered short) funds will lose money. You had better know exactly what you&#8217;re doing with these inverse and levered ETFs, and rebalance to maintain desired exposure (potentially increasing trading costs and taxes). If you don&#8217;t, you&#8217;re making a complex bet on the future path of the underlying, [not just where it goes but how it gets there](http://symmetricinfo.org/2011/04/are-investors-in-levered-short-treasury-etfs-a-disaster-waiting-to-happen-pt2/).
  * _Counterparty risk._ Many of the ETFs with leverage and oddball exposures simply write a swap with a counterparty to achieve the desired exposure. If your counterparty goes bust (anyone remember Lehman, not to mention [Refco](http://www.thestreet.com/story/10247967/refco-owes-jim-rogers-fund-362-million.html)?), your ETF may not be worth much Hopefully any loss will be limited to profits since the last repricing, but your cash could be locked up for a long time while they sort it out. Read your prospectus carefully.
  * _Active ETFs._ An active ETF is similar to an index ETF, except the active manager determines what is in the index and can make frequent changes. In many cases successful managers are launching ETFs which are supposed to shadow another fund or strategy. The manager has to be buying and selling the underlying on behalf of both the ETF and the traditional mutual or institutional fund, and publishing daily portfolios. It seems far-fetched that this can be done without someone getting front-run, and without limiting the ability of the manager to make changes in the portfolio without tipping his hand or breaking the arb process.

<div>
  ETFs are awesome, and yet I feel on safe ground saying that an ETF is going to blow up quite badly. The great and crazy thing about the free market is that anything worth doing is worth overdoing.
</div>

<div>
  &nbsp;
</div>

<div>
  Unless you really know what you&#8217;re doing, best to stick to&nbsp;<br /> </p> 
  
  <ol>
    <li>
      Safe sponsors, like Vanguard, Barclays (iShares; acquired by BlackRock), State Street (SPDRs)
    </li>
    <li>
      Index ETFs only (not active)
    </li>
    <li>
      Liquid underlying securities
    </li>
    <li>
      No leverage.
    </li>
  </ol>
</div>