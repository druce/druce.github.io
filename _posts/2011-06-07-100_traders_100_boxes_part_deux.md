---
id: 22
title: 100 traders, 100 boxes, part deux
date: 2011-06-07T20:46:08+00:00
author: StreetEYE
layout: post
guid: http://50.19.225.184/blog/?p=22
permalink: /2011/06/100_traders_100_boxes_part_deux/
post-views:
  - "3322"
dsq_thread_id:
  - "360278474"
categories:
  - Uncategorized
---
So, where were we? Ah yes, yesterday we posed a math conundrum:

_A hedge fund manager puts 100 traders in a room and instructs them:_

 _&#8220;On the trading desk, there are 100 boxes. Each box has one of your names. You can go [one at a time] onto the trading desk and open any 50 boxes you choose, to try to find your name. If every one of the 100 traders in this room finds his or her name, you will each get a $1,000,000 bonus. If anyone fails, I will crush all your $100,000 BMWs to create my modern art masterpiece. You can devise a strategy before anyone leaves the room, but once a trader has opened the boxes, you must leave the trading desk exactly as it was before you entered and cannot communicate with anyone else.&#8221;_

_Questions: Should they take the bet? Is there a correct strategy? What is the probability all 100 will each find their name?_

<!--more--> Intuitively, that seems like a terrible bet. They can&#8217;t exchange information during the experiment, and without information on what the previous trader found, if each trader goes out and picks 50 boxes at random, he or she has a 50% chance of finding the right name. The chance of two in a row succeeding is .5 * .5 , or 25%. The chance of all 100 traders succeeding is 0.5

<sup>100</sup>, or about 1 in 10<sup>30</sup>. If you did this experiment every second, it would probably take longer than the age of the universe to win. The chance of success on the first try is basically 0.

But before we give up, let&#8217;s look at a smaller problem. The general problem is 2n traders and 2n boxes and each trader has n trials. What happens for the simplest problem, if n=1 and there are 2 traders and 2 boxes, and each picks one box?

If each picks independently, the probability is .5 * .5 = .25%. But suppose Trader 1 tells Trader 2, &#8220;I&#8217;m going to pick box 1,&#8221; then which box should Trader 2 pick? Clearly if Trader 1 is successful and finds his name in box 1, then if Trader 2 picks box 2, he will find his name there. So if Trader 1 is right, Trader 2 will be right. The odds just went from 25% to 50%.

Now look at n=2, 4 traders and 4 boxes, each picks 2 boxes. They can agree that they will each first pick the box corresponding to their number &#8211; Trader 1 picks box 1 first, Trader 2 picks box 2 first, etc. But what box should be picked second?

Suppose they choose this strategy: If Trader 1 finds the name of Trader 1, he wins and stops. If he finds the name of Trader n, he opens box n. It&#8217;s just a random box, and in 2 tries he still has 50% chance of being right.

The point of doing that is: on the first pick Trader 2 avoids picking a box Trader 1 picked and won with on the first pick. And on the second pick Trader 2 again avoids picking a box Trader 1 picked and won with on the second pick, since they both can&#8217;t find the same answer on the first try and then pick the same box on the second try. So if Trader 1 is successful, Trader 2 successfully excludes some boxes that wouldn&#8217;t have worked.

Let&#8217;s examine in more detail the cases where Trader 1 got lucky and won, and then Trader 2 comes along. Then there are 3 cases:

Case 1 &#8211; (Best case) Trader 2 finds &#8216;Trader 2&#8217; in box 2 and wins!

Case 2 &#8211; He finds &#8216;Trader 1&#8217;. Now if we assume Trader 1 won, that could only happen if he got here by finding Trader 2 in box 1! Trader 2 picks box 1 and wins!

Case 3 &#8211; He finds &#8216;Trader 3&#8217; or &#8216;Trader 4&#8217;. Now, if Trader 1 won on the first try by finding his name in box 1, we have a 50/50 chance of picking right. If Trader 1 won on the second try, we know he didn&#8217;t win in box 1 or 2, and we can&#8217;t be pointing to the same box of 3 or 4 he opened to win with on the second try. That leaves only the box Trader 2 is pointing to, so Trader 2 picks that box and wins!

The beauty of this is, if Trader 2 won and and exposed our box on the first try along the way, we win. If Trader 2 won and did not expose our box, we never pick a box Trader 2 exposed. By excluding the boxes Trader 1 picked, we have much better odds of picking the right box. In fact, if Trader 1 wins, Trader 2 wins 5/6 of the time.

By enumeration, our odds of winning all 4 times are 5/12, or 42% (left as an exercise), not as good as before, but still far better than 0.5<sup>4</sup>, or 1/16.

The key to the exercise is to observe that each trader travels along a cycle. A cycle starting at box i will find Trader i&#8217;s name on the j-th try, where j is the length of the cycle. If there are no cycles longer than n/2, everyone will always find their name. If a previous trader exposed your name, you are both on the same cycle and you will eventually hit your name. If you are on different cycles, you will never overlap with their choices.

If you try this on 100 boxes, 100 traders, 50 trials, you get [approximately 31% success](http://www.statisticsblog.com/2010/07/100-prisoners-100-lines-of-code/). Given that you are risking $100,000 to win $1,000,000, it&#8217;s a good bet, and this is a good strategy (if the hedge manager distributed names randomly &#8211; if he craftily created a big cycle you lose).

A [more mathematical discussion here](http://www.mast.queensu.ca/~peter/inprocess/prisoners.pdf).

How does this relate to financial markets? People make estimates based on their experience. This looks like a random trial. It&#8217;s really not. It would be if you shuffled the deck after each trader. If something is not a random process and you model it as one, you make bad inferences. Your beta model assumes all the correlation in your portfolio captured in the beta, and the uncaptured variation cancels out. If there is hidden correlation in the errors, ie all your stocks are in the buggy-whip-related industries, then all bets are off.

If you ask 200 people in a classroom to guess the number of marbles in a jar and write it down, the answers will be randomly distributed and probably the mean will be a pretty good unbiased estimator. If you ask them to shout out sequentially, the distribution will cluster around the first guesses, and the estimate gets a lot worse. Once people coordinate, they can make very surprising things happen, for better or worse. And small non-obvious correlations in behavior can make a huge difference in outcomes.