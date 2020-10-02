---
id: 79
title: The Great Bitcoin Robbery
date: 2011-06-21T19:01:43+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=79
permalink: /2011/06/the-great-bitcoin-robbery/
post-views:
  - "4928"
dsq_thread_id:
  - "338853909"
categories:
  - Uncategorized
---
[Bitcoin](http://www.bitcoin.org/bitcoin.pdf) is a fascinating experiment: digital currency that doesn’t depend on a central authority.  
<!--more-->

  
_How it works:_ Suppose you put money in the bank. You open an account, and the bank has an electronic ledger that keeps track of how much money is in each account. Bitcoin is the same, but without the bank. Everybody who has an account effectively keeps a copy of the public ledger (the whole thing or the relevant parts). They can then share it with everyone else, like BitTorrent or Gnutella. If they want to transfer funds to someone else’s account, they add a transaction to the ledger and sign it digitally using public key cryptography. Then they share the updated ledger with the network. Nearby nodes pick up the changes, pass them on to people they are connected to, and the updated ledger propagates throughout the network.

It’s as if, instead of the bank keeping track of accounts, there was a big book in the public square where people tracked balances in each account.

Without going into the gory details (and I’m not an expert), there are some interesting ways the network maintains integrity and cooperatively determines if there’s a problem like someone tries to spend the same Bitcoin twice (once a transaction is written to the ledger it’s irreversible, whichever version of the ledger propagates to most people first is agreed valid). And it cooperatively grows the quantity of Bitcoin at a hard-coded rate (basically standardizing the denomination of new Bitcoins, which anyone can create _ ‘mine’ _ by cracking a compute-intensive problem whose complexity limits the growth rate). The final quantity of Bitcoin is capped at 21m under the protocol.

Here are a few of the things that could go wrong:

_Storing money._ Remember that digital signature you use to transfer money? It’s like a numbered Swiss bank account _ lose it, and you won’t be able to transfer funds/spend your money. If anyone else gets hold of it, they will be able to authorize transactions out of your account. [This guy supposedly lost about $500,000](http://gawker.com/5811868/a-500000-geek-cyberheist) (at a since-exceeded exchange rate), and there are supposedly [viruses](http://gawker.com/5813119/this-virus-steals-all-your-bitcoins) looking for the key to your Bitcoin account.

_Security, part 1._ The ledger is public, so anyone can see all the transactions. As I understand it, you don’t need the full ledger to transact, you just need enough of it to communicate your transactions unambiguously. But anyone who is listening can construct the entire history. From there, it’s just a matter of associating the account numbers with people. Which of course, a lot of people have an interest in doing, and the ability to do so.

_Legalities._ Clearly the long arm of the law will not stand by if people do work for Bitcoin, spend Bitcoin to live, convert Bitcoin to dollars, and leave the tax man out of the loop. And of course legitimate businesses will not adopt Bitcoin if contracts are not enforceable. So far Bitcoin is no more than a novelty and object for speculation. But to the extent that Bitcoin gains traction for transactions, it seems likely it could initially be used for illicit transactions where legal enforceability is not an insurmountable obstacle. And it seems very possible that the response would be to ban the use of Bitcoin, or conversion to dollars, with the pretext that it’s only used by drug dealers, terrorists, child pornographers, and tax evaders (last but by no means least).

The law enforces legitimate contracts. The threat of violence enforces underworld contracts. Cyberworld blockchains notwithstanding, which will enforce a Bitcoin transaction in the real world?

_Security, part 2._ Today, those digital signatures may be impossible to fake without stealing private keys. But computers get more and more powerful. The time will come when the system is breakable, what then? If you had a central authority, you could say, everyone has to upgrade to a new version on this date, just like they exchange old banknotes for harder-to-forge designs. Without a central authority, it seems quite messy. You could wake up one day and the cryptography might have been broken, the hackers are able to convert some Bitcoin to gold, everyone realizes it, rushes to convert, and the currency very quickly becomes worthless. In anticipation of that, competitors could pitch an alternate version, and try to profit by getting people to convert…which could merely accelerate the collapse. Somehow, the developers would need to come up with a backward compatible algorithm and manage a graceful transition _ a tall order (The struggle to achieve IPv6 adoption seems simple by comparison).

_Organized attacks._ That migration thought experiment shows that you don’t need to break the encryption. Just get enough people to run a client you can control, and you can control the algorithm. Or, more crudely, get enough bogus activity on the peer-to-peer network, for instance using botnets, and you could swamp it with a denial-of-service attack. Even decentralized networks organically build up nexuses that can [be disrupted, like the exchanges that convert them to dollars](http://gizmodo.com/5813622/bitcoin-price-tumbles-after-massive-account-hack-and-sell+off-on-trading-site-mtgox). Governments and competitive systems could have strong incentives to wreak havoc.

Ultimately, the value of a dollar is that there is a large nation of people willing to exchange goods and services of value for it _ about $10 trillion of GDP. There is also a centralized authority that enforces transactions in dollars with the force of law, and when necessary, physical force through police, courts, and jails, and defends its people and the dollar economy with military force. There is a central bank with a mandate to keep the value of the dollar as stable as practical (in theory).

Bitcoin doesn’t have any of those attributes. In some ways it seems to embody the worst of all worlds: not backed by anything with tangible value, nor by a central authority to keep it stable. It’s traceable, exposed to potential security issues, and prone to speculation and volatility.

If you want to replace the current highly imperfect monetary arrangements, whether you’re a gold bug, hard money advocate, crypto-anarchist, or libertarian, you should use caution not to replace them with something worse.

Bitcoin seems like a novelty virtual good and object of speculation with limited convertibility. If you take the predetermined maximum 21m Bitcoin and multiply it by <a style="text-decoration: underline;" href="http://bitcoincharts.com/charts/mtgoxUSD">a recent high price of $30</a>, and apply an interest rate and some velocity, market participants are pricing in a rather significant Bitcoin economy in a few years.

[TL; DR] If your digital ‘pet rock’ is not a transaction medium, a stable store of value, a unit of account, it’s not a currency. Maybe it’s an aspiring currency, but if it’s not integrated with a system of laws and commercial standards, armed adjudication and enforcement of them, and a viable economy, it’s going to be hard to get there. There are strong incentives are to take the technology, apply it to benefit the status quo, and destroy those who use it for disruption.

Fascinating, potentially influential experiment, possibly a cautionary tale in the making, and definitely caveat emptor.
