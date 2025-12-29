---
id: 4165
title: 'The End of the PC? On Intel’s Apple and ARM problems'
date: 2015-11-16T09:33:11+00:00
author: Druce Vertes
layout: post
guid: /?p=4165
permalink: /2015/11/the-end-of-the-pc-on-intels-apple-and-arm-problems/
post-views:
  - "6436"
categories: tech
tags: tech
---
> *[<img src="/assets/wp-content/uploads/2015/11/apple-iphone-6s-live-_0752.0-300x200.jpg" alt="apple-iphone-6s-live-_0752.0" width="300" height="200" class="alignright size-medium wp-image-4212" srcset="/assets/wp-content/uploads/2015/11/apple-iphone-6s-live-_0752.0-300x200.jpg 300w, /assets/wp-content/uploads/2015/11/apple-iphone-6s-live-_0752.0-1024x683.jpg 1024w, /assets/wp-content/uploads/2015/11/apple-iphone-6s-live-_0752.0.jpg 1320w" sizes="(max-width: 300px) 100vw, 300px" />](/assets/wp-content/uploads/2015/11/apple-iphone-6s-live-_0752.0.jpg)Tim Cook has been running around heralding [the end of the PC](http://www.telegraph.co.uk/technology/apple/11984806/Apples-Tim-Cook-declares-the-end-of-the-PC-and-hints-at-new-medical-product.html). A self-serving assessment, but Intel and the PC ecosystem are going to struggle to maintain their traditional relevance. In this post, I will look at 1) the narrowing Intel/ARM performance gap, and 2) what the ‘end of the PC’ might look like.*
<!--more-->
_1. The narrowing performance gap_

At the introduction of the new iPhone 6s, Phil Schiller made the claim that the phone’s ARM-based SOC (system-on-chip) is [more powerful than chips powering 80% of laptops](http://www.macrumors.com/2015/09/09/hey-siri-event-live-coverage/)…in other words faster than the low-end Intel Atoms, Celerons, i3s, and on a par with the Intel’s bread-and-butter Core i5s which powers pricey MacBook Pros.

[<img class="alignright size-medium wp-image-4210" src="/assets/wp-content/uploads/2015/11/Screen-Shot-2015-11-16-at-Nov-16-2015-4.49.37-PM-300x220.png" alt="iPad Pro benchmarks" width="300" height="220" srcset="/assets/wp-content/uploads/2015/11/Screen-Shot-2015-11-16-at-Nov-16-2015-4.49.37-PM-300x220.png 300w, /assets/wp-content/uploads/2015/11/Screen-Shot-2015-11-16-at-Nov-16-2015-4.49.37-PM-1024x752.png 1024w, /assets/wp-content/uploads/2015/11/Screen-Shot-2015-11-16-at-Nov-16-2015-4.49.37-PM.png 1152w" sizes="(max-width: 300px) 100vw, 300px" />](/assets/wp-content/uploads/2015/11/Screen-Shot-2015-11-16-at-Nov-16-2015-4.49.37-PM.png)

[Benchmarks bear him out](http://arstechnica.com/apple/2015/11/ipad-pro-review-mac-like-speed-with-all-the-virtues-and-limitations-of-ios/4/#h2) (scroll through for Intel comparisons).

Comparing the new iPad Pro to the latest Intel-based Microsoft Surface Pro 4, the new iPad has a [bigger screen, weighs less, and has longer battery life](http://www.gizmag.com/ipad-pro-vs-surface-pro-4-comparison/39935/) than Surface.

The Surface Pro 4 seems to have [similar single-threaded performance and higher multicore performance](http://www.redmondpie.com/ipad-pro-vs-ms-surface-pro-4-benchmarks-comparison/). It seems positioned as a good laptop, which can also function as a tablet.

(Aside: Mystifyingly, no built-in LTE option. For many people having a single mobile plan and tethering other devices via Wifi/Bluetooth seems like the best option, but for many corporate use cases LTE is still a needed option.)

Bottom line: Right now, ARM can’t offer the raw performance of the high-end Core i7 and Xeon processors. But it can hold its own against the bread-and-butter i5, at a superior performance per watt and performance per dollar.

This is a big problem for Intel.

_2. How did this happen?_

Historically Intel has had a number of key advantages over its competitors in CPUs:

  * Above all, the most advanced chip fabrication. In process, Intel typically was a generation ahead of its competitors like Samsung, TSMC etc. That means smaller chips, lower power per transistor, higher performance.
  * CPU R&D _ more advanced architecture design with higher transistor counts, larger caches, out-of-order execution pipelines etc.
  * Scale and network effects _ more investment in compilers, tools for the x86 platform.

That added up to a mega franchise:

Investment in fab and architecture  
-> most advanced and powerful CPUs  
-> market share, volume, industry standards  
-> huge margins  
-> plowed back into massive investment in fab and architecture  
-> rinse and repeat.

Intel had 2 ‘high quality’ problems:

  * Backward compatibility _ Acts as a performance tax, requiring legacy features / more transistors/ more power / hamstrings architecture. Unclear how significant due to Intel’s other advantages but it’s there.
  * High margins / [innovator’s dilemma](https://en.wikipedia.org/wiki/The_Innovator%27s_Dilemma). Intel could no doubt have offered an x86 mobile architecture that was cost/performance competitive with ARM. But they could not do it without having it installed in PCs and servers and cannibalizing their PC/server business.

_The tick slip:_ Intel has operated on an alternating [tick/tock model](https://en.wikipedia.org/wiki/Intel_Tick-Tock). On the tick, they shrink the existing architecture, putting it on a new manufacturing process that runs on smaller chips with closer-packed transistors that draw less power and run at higher clock speeds. On the tock, they introduce a new architecture with more transistors and design optimizations.

These tick/tocks about a year apart have kept them ahead of the competition.

In September 2014, they started shipping Broadwell chips manufactured on a 14nm process.

In August 2015, they started shipping Skylake chips, the new micro-architecture on the same 14nm process. _But they also announced the 10nm successor process would be [delayed until 2017](http://www.anandtech.com/show/9447/intel-10nm-and-kaby-lake)._

In the meantime, Samsung began shipping 14nm SOCs in the Samsung Galaxy S6 smartphone in early 2015, over a year behind Intel. Apple then released its iPhone 6s, also on 14nm Samsung and 20nm TSMC SOCs, in late 2015.

I hasten to add, all 14nm chips are not identical. For instance, the iPhone you get may have either a 14nm Samsung or a 20nm TSMC chip: they are dual-sourcing the SOC. Some testers and pundits [proclaimed](http://www.techtimes.com/articles/96935/20151019/iphone-6s-chipgate-apple-and-consumer-reports-vs-the-internet.htm) the TSMC iPhones on the larger die/older fab process actually used less power and performed better, contrary to what one might expect. Samsung’s 14nm [may not be higher density than Intel’s](http://www.fool.com/investing/general/2015/05/18/heres-how-samsungs-14-nanometer-transistors-compar.aspx), and clearly not even a knockout punch vs. TSMC’s 20nm.

Nevertheless, right now Intel’s competitors are nipping at Intel’s heels. And Moore’s law is running out of room. At this point each transistor is a few dozen atoms. We have maybe 6 50% ‘shrinks’ before we hit a single atom. People have been saying Moore’s law has reached its limit for a long time…but perhaps Intel’s struggles to stay ahead are the real deal this time.

ARM is big in cheap, high performance, PC-incompatible Chromebook laptops. But ARM servers haven’t had an impact yet. Nevertheless, for loads highly distributed across numerous servers like Google and Facebook’s immense Web server farms, they would appear to make a lot of sense. Companies like Calxeda have tried before and failed. But the ‘tick slip’ seems to create a window of opportunity where the Intel fab edge is limited, for the next year or more, and could get closed entirely if ARM fabs improve further. (Both [Samsung](http://www.extremetech.com/computing/207517-is-samsungs-plan-to-ramp-up-10nm-production-by-the-end-of-2016-a-paper-war) and [TSMC](http://www.extremetech.com/extreme/210427-tsmc-confirms-volume-shipments-of-16nm-pushes-euv-back-to-the-5nm-node) say they will match Intel’s roadmap, but talk is cheap.)

The key metric in massive web farms is performance/watt. If ARM OEMs can achieve fab parity with Intel, the case appears to be compelling. Intel would then have to cut margins to compete. It would seem incumbent on the Googles, Facebooks to be testing ARM and developing standards for ARM servers via the [Open Compute Project](http://www.opencompute.org/).

From there you might see ARM start showing up in corporate server farms, cloud infrastructure providers like Amazon AWS. Eventually, ARM CPUs with larger caches, more execution pipelines could be designed to compete with Xeon and make inroads in the largest single-server applications, like databases.

It’s also worth pointing out this rumor that the next iPhone will be on an [Intel-manufactured ARM SOC](http://venturebeat.com/2015/10/16/intel-has-1000-people-working-on-chips-for-the-iphone/). That would be a huge Intel hedge against a decline in its x86 business. Dell’s purchase of EMC and [attempt to sell its PC business](http://recode.net/2015/10/12/silver-lake-explored-sale-of-dells-pc-business-ahead-of-emc-deal/) can also be seen in this light.

_3. The phone as PC_

The other issue is…the phone is the primary computing platform for more and more people.

On many dimensions your phone is more advanced than your PC. It features

  * 20+ radios communicating on any mobile network known to mankind, WiFi, Bluetooth.
  * A phone properly integrated into the OS and messaging, which PCs never really got working right.
  * Voice control and input with Siri, Google, Cortana
  * Touch screen UI with multi-touch and Apple’s pressure-sensitive 3D Touch, biometric fingerprint ID.
  * Integration of watches, fitness trackers, internet of things; sensors galore (2 cameras, multiple mikes with noise canceling, GPS, accelerometer, gyroscope, digital compass, ambient light detector, proximity sensor)

The mobile phone is ludicrous technology, the nexus of a technology singularity. It may not have as much RAM, or a competitive equivalent to an Excel or Powerpoint. But if most of what you do is email and Web browsing, and you can make do with Google apps, you’re in good shape when you just have your phone/tablet.

It’s perfectly fair to say that a lot of office workers could do all their work on their phone/tablet. A lot of sales guys just need a phone and a CRM app on a tablet.

The Mac was a miracle to my generation in college. A generation raised on an iPhone and iPad may well view a Mac as a step backwards.

With the iPad Pro, Apple is aiming at content creators. Give the iPad Pro a decent keyboard, stylus, and mouse and you can use it as your main screen, even if you’re a power user. I’m kind of expecting it to bomb, near term. Not enough apps or a large enough market for those users.

But Apple is just one killer app away.

In offices, as iPhones became popular, most companies went to BYOD _ bring your own mobile device for email. This makes users happy, and to some extent, system administrators.

[A few companies](http://www.goldmansachs.com/what-we-do/engineering/see-our-work/nds-virtual-desktop-in-the-cloud.html) have gone to VDI _ virtual desktop infrastructure. The actual PC runs on a virtual machine in the cloud, users view it on a local thin terminal display. Your Excel and Powerpoint, even Bloomberg and trading systems live in the cloud, you connect over the internet, just like RDP you may be familiar with (Remote Desktop Protocol).

VDI is a far better disaster recovery posture. Sit anywhere with a terminal and a network connection, get all your apps and data, everything backed up to the cloud.

Both BYOD and VDI are a far better security posture. Harder for malware on your phone to spread throughout a company, since it’s basically a foreign device outside on the Internet. Get an infection on your VDI image, restore it immediately from a pristine image.

You can see where I’m going with this…VDI will potentially be a killer app on an iPad Pro.

All your servers and desktops go into the cloud using e.g. Amazon cloud infrastructure as a service and VDI. Then you give your users a tablet with the keyboard and VDI app. Presto, no more PC desktops or servers in your front office. The end of the PC world as we know it.

I could see quite a few knowledge workers being issued hybrid PC/tablets like Surface Pro and using them primarily as tablets. Over time they may find they don’t need the PC functionality. And departments and even companies go 100% BYOD.

Of course there would be many Intel CPUs in that cloud infrastructure. But over time perhaps not as many, unless Intel retains their fab edge even as they lose a chunk of the revenues that support it.

The phone would displace the desktop PC, while the PC platform would complete its displacement of the old centralized mainframes.

Back in the 80s, who would have thought that was in the original IBM PC’s future. Big iron mainframe guys were laughing at the PC as a toy. But then again so did the the first iPhone. The next big thing often [starts out looking like a toy](http://cdixon.org/2010/01/03/the-next-big-thing-will-start-out-looking-like-a-toy/).

Strange times. And possibly risky ones for Intel.

[<img src="/assets/wp-content/uploads/2015/11/whats-the-point-of-being-afraid-of-the-zombie-apocalypse-300x236.jpeg" alt="Zombie army" width="300" height="236" class="aligncenter size-medium wp-image-4222" srcset="/assets/wp-content/uploads/2015/11/whats-the-point-of-being-afraid-of-the-zombie-apocalypse-300x236.jpeg 300w, /assets/wp-content/uploads/2015/11/whats-the-point-of-being-afraid-of-the-zombie-apocalypse.jpeg 550w" sizes="(max-width: 300px) 100vw, 300px" />](/assets/wp-content/uploads/2015/11/whats-the-point-of-being-afraid-of-the-zombie-apocalypse.jpeg)
