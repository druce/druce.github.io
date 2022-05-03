---
id: 7118
title: 'Crypto systems, iron laws, and levels of resilience'
date: 2022-04-16T01:01:01+00:00
author: Druce Vertes
layout: post
guid: /?p=7118
permalink: /2022/03/distributed-architecture
categories: tech
tags: blockchain tech

---
> *Noodling on practical open distributed computing, how to build un-take-down-able apps like Web3 but without permissionless blockchains.*
<!--more-->

>*Yes, you're gonna have to trust somebody (trust somebody)<br />
Well, it may be the devil or it may be the Lord<br />
But you're gonna have to trust somebody<br />
Ah, yeah (Trust somebody) - mangling Bob Dylan*<br />

>*If it is man's privilege to be independent, it is equally his duty to be inter-dependent. - Mohandas K. Gandhi*

This post is motivated by this tweet from [Fred Wilson](https://twitter.com/fredwilson/status/1514564762142752768). And these two posts about limitations of blockchain from [David Rosenthal](https://blog.dshr.org/2022/0/ee380-talk.html) and [Moxie Marlinspike](https://moxie.org/2022/01/07/web3-first-impressions.html). And the recent [Insteon debacle](https://arstechnica.com/gadgets/2022/04/insteon-finally-comes-clean-about-its-sudden-smart-home-shutdown/), where a large IoT service suddenly went offline.

I appreciate the appeal of writing code for a Web3 ecosystem that runs on all the computing devices in the world, paying for services to run while getting paid for your own compute contribution, which is sort of the goal of Web3 and the Ethereum ecosystem. It's cool. But practically, it's never going to be the most performant way to deliver most services. Some of the proposed benefits, like de-politicizing everything and running society with perfect algorithms, are Quixotic pipe dreams. The risks and drawbacks are considerable. For instance that operating your own bank and cybersecurity is not for everyone, immutability and irreversibility are double-edge swords. 

And you can usually achieve the goal of an shenanigans-resistant resilient computing ecosystem in simpler ways.

We all want services which offer the design objectives of Web3. We want services immune from any single point of failure, or any single individual who can pull a switcheroo and take a service offline because it no longer aligns with their interests, or change the terms in their favor at the expense of the rest of the ecosystem. We don't want to be hostages to capricious developers, managers, governments, etc.

This is a challenge, as the 14-year history of blockchain has shown.
- No crypto app has really disrupted any major industry or crossed the chasm to mass adoption, as opposed to early adopters.
- Blockchain apps are being taken down in increasing frequency and size by [insider rug pulls and hacks](https://blog.chainalysis.com/reports/2022-defi-hacks/). So it seems like there are concentrated points of failure.

One iron law of distributed systems, Brewer's [CAP theorem](https://mwhittaker.github.io/blog/an_illustrated_proof_of_the_cap_theorem/), basically says, you can't have both perfect consistency and perfect high availability. 

Another (related) iron law is Murphy's law, failure finds a way. I'd go further than Murphy and Brewer, there ain't no such thing as no single point of failure. 

Another iron law that David Rosenthal alludes to is that anything you can accomplish with a permissionless blockchain app, you can do more performantly with a permissioned system with a trusted layer. If the trusted layer is small and highly redundant and managed by pretty smart people who check on each other, the service can be made as resilient as desired, although never perfectly resilient. [Pirate Bay](https://thepiratebay.org) has proven pretty hard to take offline without crypto, because things like the Internet and DNS make it pretty hard.

Another iron law is that technology changes over time. A lot. Even blockchain systems need to migrate to new versions. Quantum computing breaks current encryption algorithms in linear time. On a long enough timeline, major changes will be needed to crypto protocols. 

Therefore, without some governance layer for inevitable major and minor patches, without some way to adapt, any crypto project will eventually cease to be fit for purpose. If you have a good 'market' protocol, you can make the 'political' governance problem smaller, but thinking you can eliminate it is quixotic. Really, the iron law is that you can reduce the trust surfaces, but you cannot eliminate them completely. Even an initially perfect system will eventual needs governance. As Charles Darwin said, "it's not the strongest of the species that survive, nor the most intelligent, but those that are the most responsive to change." Adaptability is a bit of an Achilles heel of decentralized protocols.

Let's noodle a bit how what you could build a service like Insteon, or [Google Reader](https://lifehacker.com/google-reader-is-shutting-down-here-are-the-best-alter-5990456), or Twitter, in a way that is highly resistant to any single entity taking it offline or generally messing with it. The Internet was architected to build a reliable system on unreliable components. There's a continuum between fully closed, proprietary, and centralized, to (almost) fully distributed and trust-free (modulo major governance caveats). What off-the-shelf tools and governance could we cobble together to build a distributed cloud service that no one entity could mess with?

As an example, let's consider a cloud service ticketing platform (like Ticketmaster), which is 100% closed source and look at some steps to open it up, so it becomes a protocol that no one owns and no one can take down. No particular reason for a ticketing platform, other than that it's a ledger system, and needs to interface with real-world theaters who have to sell tickets etc. 

Let's consider levels of openness / resilience to a single party extracting rents or messing with it.

**Step 1: Data export.**
- Let users export their tickets in digitally signed formats that can be digitally verified.
- Let theaters back up configurations, seating plans, available/sold tickets, in an open JSON format. 
- Now, if theaters don't love the service, someone can build a new system, and users and theaters can transition without losing all the existing tickets and theater configurations in the system.

**Step 2: Open APIs and Interoperability.**
- Build APIs so that third party mobile/web apps can buy tickets on the platform.
- Build APIs so that third party backend services can let venues manage events, seating plans.
- Now, if people don't love the implementation, they can roll their own. Of course the service still controls the APIs, how they function, and is the only golden copy of the data.

**Step 3: Open Source**
- Distribute all versions of the source code under a license, such that, worst case, if a user doesn't love a change to the service, they can set up their own instance of it.
- As people typically do for open source, the entire version history is available in cloud repos like GitHub.
- As people should do, the infrastructure-as-code is available so you could spin up your own instance on AWS or some cloud platform the way the developer does. Ideally, everything is containerized, you can pull containers to any service that supports them and run everything from there.

**Step 4: Open Governance.**

- Apache-like organization controls the intellectual property and provides a legal framework which governs decision-making, funding, etc.

I think this covers the key points of the current open source paradigm. Modulo Apache governance, it's how e.g. Wordpress works. At this point, if Wordpress.com or Google Reader or Insteon shut down and you had regularly exported your data, it would be feasible to spin up a new service without running into IP issues. But it's still a major service interruption if the developer walks away. The blockchain people will say, it's not distributed, the government could seize servers, etc.

**Step 5: Open Multi-cloud Backend-as-a-Service.** 

Companies like [Docker](https://www.docker.com/) and [HashiCorp](https://www.hashicorp.com/) are pretty amazing for devops. But we don't have a comprehensive open standard for devops. Hypothetically, there could be an open version of [CloudFormation](https://aws.amazon.com/cloudformation/) that supports defining a cloud service across multiple clouds in multiple jurisdictions, making it resilient to any single jurisdiction or service provider taking it down. Basically, make the back end an open API and data service. Think, Kubernetes for everything, to orchestrate and scale not just Docker containers, but storage, server-based and serverless services of all kinds. For a service to be un-take-down-able, we would want to write it with:

- A standard devops toolchain that works across AWS, Azure, Google Cloud services, anyone who supports a standard API for launching services. 
- Database and compute services that run across multiple clouds via quorum and consensus protocols, so you don't depend on any one cloud platform.
- Trusted agent Backend-as-a-Service organizations that say, I will run the services specified in this toolchain on this cloud platform as long someone, anyone, pays for it, according to the terms specified in the devops document. Including for instance immutable logs, or logs that are immutable for 5 years or something, auto-scaling. 

A key to Pirate Bay's success at staying online is the fact that domain registry and DNS are globally distributed services. So what we want to do is stand up services for all the other elements in the toolchain that are similarly globally distributed and can't be taken down in one jurisdiction. And additionally, we want a layer between the devs and the devops dedicated to keeping the backend up at all costs, so that even if the devs want to take it down, the users can fork it and keep it running.

The objective is that if you create a devops standard, either the cloud platforms will support it, or you can stand up independent platforms than run on top of the cloud platforms and expose the APIs and provide the SLA guarantees. The giant global cloud platforms might not be strategically inclined toward standards, they may feel they want differentiation and lock-in, the Linode/DigitalOcean/OVH/DataPacket type platforms might have more incentive to adopt open standards. But if a large market develops, a standard really should develop for the basics. Basic devops is too hard, I should be able to just 'vagrant up' a container or instance on any cloud without going through complex proprietary steps.

So now running a back end instance can take on characteristics of open source in that nobody can hijack source code and extract rents from IP, and also, nobody can extract rent from owning the data and controlling access to it. 

So now, our ticketing service can run something like this:
- Devs write the front and backend software and the devops service definitions. Put it all under an open source license and governance framework.
- Devs set up the backend running on multiple trusted BEaaS agents on say, AWS, GCS, Azure, with an 'immutable' SLA such that it cannot be taken offline as long as someone pays for it. 
- Devs grant irrevocable permission to the trusted BEaaS agents to run the service. (Via something like, putting keys in initial configs or DNS or some other distributed database, plus some contracts and governance docs. Anybody can run the software, but they are configuring and permissioning a group of cloud-platform and geographically dispersed backends to act as a single service. Futher details left as an exercise)
- So, a backend instance launches, it looks for the all the other permissioned backends per the configuration and connects to them. When a quorum is online, the backend is open for client connections. All individual transactions are commited once a quorum accepts them. 
- A theater wants to sign up, they go to the devs, buy a license, which generates a keypair and a certificate from the devs saying, this theater has this license. The theater downloads the management client, which presents the certificate and sets up their seating plans and upcoming shows and goes live on the system. they own all their data and set policies for sharing it, like, public, any authenticated user, or only users who are authorized by the theater using encryption at rest. 
- A ticket buyer wants to buy a ticket, they go to their mobile app store and download the app, they browse and pay for tickets via in-app-services.
- I think an Apache-type umbrella organization independent of the devs would need to own the publishing of the app into app stores, handle in-app purchases, IAM user authentication as an OAuth identity provider to backends. And then, per a pre-agreed structure, funnel proceeds to the theater, the devs, and pay for the back-end.

So, this should work like a proprietary service. But when the devs want to release a new version, anybody can opt out and keep running on the old version and the old data, and it is guaranteed to be available, as long as anyone is paying for it. Once it's set up, it's un-take-down-able.

If the devs go AWOL or do something unpalatable, the old system remains up and running. Anyone can fork the service. Theaters and users can migrate to the new system by connecting to the new system and uploading their data. 

You have to trust some people to do their individual jobs, disciplined by the marketplace and the legal mumbo-jumbo:
- Apache-type umbrella orgs for governance, payments, user IAM login/privacy stuff, manage a source code repoa
- Cloud services
  - Compute
  - Storage
  - IAM
  - App stores
  - Payments
  - DNS / discovery

I'd argue that you could stand up orgs to provide all of the components of cloud apps in open, standard, distributed, sufficiently resilient ways, and finally the end-user apps themselves.

DNS and domain registry is already implemented as a highly distributed database under mostly non-profit standards. You could make DNS a blockchain app, but it seems like overkill. The same logic applies all the more to the rest of the chain, which isn't in the blockchain's sweetspot of small data, eventually consistent.

App stores, payments, and the central IAM to permission backends are weak links, whoever controls those can create some hassles. But no one can hijack the full value of the app to the community and hike prices massively and sell the IP, operations, data. 

Ideally, the Apache umbrella org is eventually a first-class citizen app store for allT mobile devices.

You might ask, if you have to trust a governance org, what's the point of multicloud etc. The point is just, if you have a standard platform, it becomes frictionless to move services to a different jurisidiction, move it under a different governance structure, with no or minimal downtime. If there's a threat that services will get turned off in one locale, add a few servers in other jurisdictions to the cluster, and if one locale gets shut down, the service continues without interruption.

Twitter is advertising-supported. Nothing really prevents us from connecting an app to an ad network, where the proceeds get distributed to devs and trusted services via some split, instead of processing payments. Of course, this means integrating into a proprietary database of everything everyone does online and who they do it with, and where they go and with whom in the real world, via location-tracking. So maybe instead we should think about what a user-centric advertising network would look like and build that first. We seem to have fallen into the worst of 1984 and Brave New World, we have telescreens in our pockets monitoring our every move, and the devices themselves are the addictive soma.

Similarly, over time perhaps we should move to central bank digital currency and loosen the sway and taxation of banks and credit card companies and other extractive interests. If crypto shows anything, it's that instant, free payments don't need much government capacity, just the political will to overcome extractive vested interests.

The point of the digital revolution should be to deliver that people love, with good governance, without super oligarchs, without benevolent (or not) dictators for life, bubble dynamics, or weird utopian agendas. If crypto helps build performant services, then use it. If not, make building blocks, platforms and institutions that work.

It would be super interesting to see full-blown Web3 apps for online ticketing, or restaurant reservations, or ride-sharing or Airbnb. It would be nice to get away from the privacy data-rape nightmare of the current mobile ecosystem. (See [John Oliver](https://www.youtube.com/watch?v=wqn3gR1WTcA) and multiple [spyware fiascos](https://theintercept.com/2022/04/22/anomaly-six-phone-tracking-zignal-surveillance-cia-nsa/)). I'm just not sure Web3 can perform at scale as well as the most efficient centrally-governed solutions.

The Internet, DNS, packet routing, are distributed systems that are hard to take down and didn't need crypto. Pirate Bay, couldn't take that sucker down despite copyright holders spending millions. On the other hand, a long list of blockchain suckers have gotten exit-scammed, rug-pulled, hacked, drained due to bugs. IMHO you can get a lot of the benefits of blockchain and a lot of mileage by creating a distributed system using standard cloud services and governance.

Crypto systems can and will get taken down by central authorities. China controls their Internet, however hard that is. A public crypto system has to be available to users, anyone has to be able to log in. If that someone is a cop with sufficient authority they can find the IPs that run the system and block them.

Sure, it would be nice to have a global operating system distributed over all the computers in the world where you could upload code and have it guaranteed to run. Maybe that's where we are headed. But it's not going to be outside of governance and government controls. If we've learned nothing from the last 20 years of social media, bad actors can drive out good, the whole space can become unusable and disreputable, without a minimum of norms. (Courts and parliaments have procedure for a reason, so it isn't, whoever is loudest wins. Lots of things that aren't allowed are essentially just speech: IP infringement, conspiracy, libel, tortious interference, the list goes on.)

At one extreme there is software where the code is proprietary and closed-source, and the data lives in a proprietary data store. Twitter mostly falls into this bucket, modulo some open APIs and related code and examples. AWS has characteristics of a platform monopoly like Windows. Once you standardize on AWS for devops, it's not easy to move to Azure or GCP or go multi-cloud.

At the other extreme is a [fully distributed app](https://docs.deso.org/about-deso-chain/readme), where data is stored on a shared blockchain. To date, this approach hasn't been adopted by the mass market at scale.

Between those 2 extremes, there are many ways to create apps that may offer some of the benefits of blockchain apps without having the compute and storage be fully distributed among all clients. It should be possible using some combination of cloud services and governance, to mirror the success of open source paradigms, and create something like Twitter, or Reader, with a high degree of resilience, such that no individual entity can decide to discontinue it or evolve it against the community's wishes. 

Eventually you have to trust somebody in the real world, and you should localize a minimum of trust in structures with appropriate governance and checks and balance. 

The crypto bubble is driven by bubble dynamics and ideologies that are anti-government, anti-establishment, pro-disruption, regardless of consequences.

You can't eliminate politics with math. But you can improve it.





