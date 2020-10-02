---
id: 6893
title: Why Blockchain Is (Mostly) Useless
date: 2019-09-07T12:31:36+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=6893
permalink: /2019/09/why-blockchain-is-mostly-useless/
medium_post:
  - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:68:"https://cdn-images-1.medium.com/fit/c/200/200/0*tLekueVp7unnAXxY.jpg";s:10:"author_url";s:25:"https://medium.com/@druce";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:2:"no";s:2:"id";s:12:"f3ef02711337";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:6:"public";s:3:"url";s:71:"https://medium.com/@druce/why-blockchain-is-mostly-useless-f3ef02711337";}'
post-views:
  - "4597"
dsq_thread_id:
  - "7623804781"
categories: Uncategorized
tags: bitcoin blockchain

---

> *Cryptocurrencies are useless. They’re only used by speculators looking for quick riches, people who don’t like government-backed currencies, and criminals who want a black-market way to exchange money._ _ [Bruce Schneier](https://www.schneier.com/blog/archives/2019/02/blockchain_and_.html)*

<!--more-->

The [column](https://www.schneier.com/blog/archives/2019/02/blockchain_and_.html) from which this quote is lifted is well worth reading and thinking about. The key feature of cryptocurrencies and blockchain apps is the distributed nature of the ledger, the idea that you can trust the system without having to trust anyone in the real world. 

But eventually, the system has to interact with the real world, where you do have to trust somebody to accomplish anything, and have meta-governance of the system as a whole in the real world. In the real world, there is no such thing as a ‘trustless system.’

And once you have to trust someone, in nearly all cases you might as well build a much simpler and more effective centralized system with an appropriate trust model. 

That statement is a bit abstract, so here is a constructive example of how one can offer the key advantages of blockchain and distributed ledger technology, without blockchain.

(skip this part if you’re not into architecture astronautics)

AWS now offers a [centralized immutable ledger](https://aws.amazon.com/qldb/faqs/), an append-only database similar to the blockchain’s immutable ledger history of all transactions. The difference is, unlike the Bitcoin blockchain, which is distributed among all the Bitcoin miners and uses the consensus algorithm to resolve any conflicts and commit updates permanently, the centralized immutable ledger has one endpoint that processes requests and commits valid updates in the order they are received.

Any sufficiently advanced database system has a language, like SQL stored procedures, to extend it with more complex business logic. Let’s add a language to our centralized database. Suppose the language is Python. And suppose we make the codebase immutable. You can add new code, but you can’t delete any old code.

In other words you can create a Python app, like a restaurant reservation service with a REST API, or a Web UI, and write code that supports all the necessary operations, like _add_restaurant_, _add_diner_, _add_reservation_, _cancel_reservation_, etc. And then once you publish the app, that code can never be changed.

If that sounds weird, imagine you store the code in an append-only structure, the way Git version control keeps every version ever committed. And every time you commit a new version of the code, the immutable ledger, where it stores restaurant data, is forked. So the app is immutable in the sense that you can create new versions which inherit the underlying data, but the old version always remains.

Now Bitcoin runs as long as it has enough miners to keep the ecosystem going. For argument’s sake, suppose our hypothetical AWS service says, the app users split the hosting bill, and users commit to some maximum monthly cost, $1, $10, whatever, and AWS keeps it running as long as the cost of hosting is covered.

There could be more complex models, premium tiers, profits directed to the developers or a foundation, but the key points are: no one can extract rents beyond the hosting cost or what is initially agreed; no one can change the software unless everyone migrates to the new fork; and AWS is the trusted third party that guarantees that.

The way this is _similar_ to a blockchain is that once an app is published, it can’t be changed unless all the users agree to fork it. If the developers write something new, they can publish it, but as long as any users keep using the old system, it’s still around and no one can force anyone to change.

(end architecture astronautics)

This contract offers the benefits of a distributed ledger app that no single individual can own or fork. The essential way it’s _different_ from blockchain is that you have to trust AWS. And pay them instead of paying to run distributed mining rigs. And running one centralized server is far simpler, cheaper, more efficient, you can have instantaneous transactions at a high rate for low cost.

A key benefit of a blockchain app is the elimination of certain agent-principal problems. Back in the day, there was an open-source app called CDDB. You put a CD in your PC, and CDDB would read it, look up a hash in a remote database and give your audio client all the metadata, artist, album titles, song titles. And if your CD wasn’t in the master database you could contribute metadata and everyone else could use it.

Then one day the developer cashed out and sold the database for a few million. All the work that everyone had done maintaining the open-source database was captured, and the people who had created it now had to pay license fees to access it. Classic bait-and-switch: gain lock-in on false promise of a free service, make it painful to switch all the apps that used the CDDB API, then extract maximum rent.

With our immutable application architecture, that debacle could never happen. Everyone could just keep using the old version of the database. No one can ever start charging for access to the data, or change the deal à la Darth Vader, because no one individual has control. And that’s the primary benefit of blockchain for a lot of use cases. It’s an open-source cloud architecture, anyone can improve on it and fork it, but no one person can control it or fence in the commons.

But eventually, you have to trust somebody where the ‘trustless’ part of the system interacts with the real world. The minute you are trading with a broker/exchange, or buying something with Bitcoin, you have to trust that the exchange won’t get hacked or the seller won’t scam your money, or the restaurant where you made a reservation won’t give your table away or shut down.

Logically, if you trust someone like Amazon for e.g. payments/fulfillment at the edge of the system, then you lose nothing extending trust to having them run the blockchain infrastructure, and then you lose nothing if they build a high-performing centralized system with the same functionality but without all the blockchain hassles.

As long as you trust AWS to be an honest broker and charge only reasonable hosting, and never try to extract the value of the underlying app, you don’t really care about distributed ledger vs. centralized ledger, you just want it to work. And centralized will always be simpler and have better throughput than distributed; it just works better. And if you can trust AWS and the real-world legal system, you can write a contract and governance structure that provides the benefits of a distributed ledger. 

Blockchain is _almost_ always useless. The exception is where you can’t trust AWS. More to the point, where you can’t trust the government. If you want to create an app that the government may want to block, collect taxes on, enforce capital controls, protect government monopolies, censor forms of expression, then you can never trust a central nexus. The government can show up and seize servers, shut it down and go after the users.

But effective strong states can maybe block distributed ledger services too. China has shown that they can do a pretty good job of policing the decentralized Internet. Few things are so decentralized that a strong government can’t drive it deep underground. The US banned private gold ownership in 1933 and it was mostly effective. People could still have gold necklaces and maybe trade using gold jewelry, but without coins and bars it was no longer economical to store and exchange value on a large scale. If the motivation exists, governments can crack down on anything. 

In my opinion Bitcoin will never be a legitimate, largely unregulated medium of exchange for the masses in the US. There’s too much at stake for the government not to control it. It’s too important for the US government to maintain control of the payments system for taxation, seignorage (ability to print money), financial stability (FDIC, intermediaries that don’t go bust because someone hacked and made off with the money), and national security (i.e. leveraging the world’s dominant currency for political purposes).

And the US is still a very high-trust society, so there’s not a lot of reason for most people to use a black-market type of payment system, without the benefit of the government to enforce it and backstop intermediaries with e.g. FDIC insurance.

In a nutshell, the US government’s technical means and motive to regulate Bitcoin (or Libra or whatever) exceeds the average consumer’s means and motive to circumvent the US government. 

But this isn’t true everywhere. You can draw a 2&#215;2 matrix:

<div>
  <table style="font-family:arial, helvetica, sans-serif; font-size: 13px; border: 2px solid #FFFFFF; width: 100%; text-align: center; border-collapse: collapse; ">
    <tr>
      <th>
        &nbsp;
      </th>
      
      <th>
        Strong State<br />Able to repress crypto
      </th>
      
      <th>
        Weak State<br />Unable to repress crypto
      </th>
    </tr>
    
    <tr>
      <th>
        High trust society<br />Low demand for crypto
      </th>
      
      <td style="border: solid 2px black; background-color: #c9edff;">
        USA<br /> Europe<br /> Japan
      </td>
      
      <td style="border: solid 2px black; background-color: #c9edff;">
        ??? Island paradises ??? <br />Micronesia? <br />Bhutan?
      </td>
    </tr>
    
    <tr>
      <th>
        Low trust society<br />High demand for crypto
      </th>
      
      <td style="border: solid 2px black; background-color: #c9edff;">
        China <br /> North Korea
      </td>
      
      <td style="border: solid 2px black; background-color: #c9fc9d;">
        Venezuela <br /> Somalia
      </td>
    </tr>
  </table>
  
  <p>
    &nbsp; </div> 
    
    <p>
      I think only the Venezuelas of the world, with low trust in local currencies and financial institutions, which are also weak states hard-pressed to universally enforce their will, will see significant adoption of Bitcoin. And maybe gold and USD may be more practical for black markets.
    </p>
    
    <p>
      Satoshi Nakamoto’s paper and Bitcoin launch happened in 2008…over 10 years ago. The iPhone was launched in 2007. If blockchain really is a platform that will change everything, it’s a real sleeper success story. Typically you see killer apps on a new platform a lot quicker. Web 1.0 launched Amazon and Netflix within the first couple of years. Where are all the blockchain apps?
    </p>
    
    <p>
      The only industries that have really been impacted are ransomware, money laundering, and facilities for exchanging and speculating on tokens.
    </p>
    
    <p>
      There are unloved monopoly ledger companies like OpenTable and Ticketmaster. Where has any centralized application actually been disrupted? If distributed ledger technology can’t disrupt Ticketmaster, what use is it?
    </p>
    
    <p>
      My best guess is that blockchain and Bitcoin adoption will remain a curiosity and a niche phenomenon linked to black markets, illicit activities, weak states with unreliable payments and money.
    </p>
    
    <p>
      And blockchain apps will migrate to more efficient centralized systems that use governance and trust architectures to offer benefits similar to distributed ledgers…for average Joes who have no choice but to trust the government.
    </p>
    
    <p>
      TL; DR Anything you can do with blockchain you can do better without it. Except maybe in low-trust environments, but if the reason for low trust is strong state enemies, they can probably repress blockchain applications they don’t like. Eventually you have to trust somebody. So might as well pick the right parties to trust, and build applications people love.
    </p>
    
    <p>
      <em>Bury it in the desert. Wear gloves. _ <a href="https://xkcd.com/2030/">xkcd</a></em>
    </p>
