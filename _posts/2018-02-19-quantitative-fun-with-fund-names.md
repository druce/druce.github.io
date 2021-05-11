---
id: 6200
title: Quantitative Fun With Fund Names
date: 2018-02-19T07:51:30+00:00
author: Druce Vertes, CFA
layout: post
guid: /?p=6200
permalink: /2018/02/quantitative-fun-with-fund-names/
medium_post:
  - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:68:"https://cdn-images-1.medium.com/fit/c/200/200/0*tLekueVp7unnAXxY.jpg";s:10:"author_url";s:25:"https://medium.com/@druce";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:2:"no";s:2:"id";s:12:"1716cb022515";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:6:"public";s:3:"url";s:71:"https://medium.com/@druce/quantitative-fun-with-fund-names-1716cb022515";}'
post-views:
  - "14200"
dsq_thread_id:
  - "6489993165"
categories: datascience
tags: datascience
  
---

> *[<img src="/assets/wp-content/uploads/2018/02/Screen-Shot-2018-02-18-at-Feb-18-2018-8.49.58-PM.png" alt="Word cloud" width="626" height="402" class="alignright size-full wp-image-6454" srcset="/assets/wp-content/uploads/2018/02/Screen-Shot-2018-02-18-at-Feb-18-2018-8.49.58-PM.png 626w, /assets/wp-content/uploads/2018/02/Screen-Shot-2018-02-18-at-Feb-18-2018-8.49.58-PM-300x193.png 300w" sizes="(max-width: 626px) 100vw, 626px" />](/assets/wp-content/uploads/2018/02/Screen-Shot-2018-02-18-at-Feb-18-2018-8.49.58-PM.png) There are a number of hard problems in investing, for instance: 1) Finding alpha.  2) Finding clients and assets &#8212; especially if you can’t 1) consistently find alpha.  3) Finding an awesome name for your fund. The investing blogosphere is all over the first two. Now, for something completely different, we help you with the last one!*

<!--more-->
											    
Inspired by [Sloane Ortel’s](https://blogs.cfainstitute.org/investor/2017/08/07/what-to-call-your-fund/) post, we’ll run some analytics on a dataset of investment firm names, culminating in our very own algorithmic fund name generator.

Assembling data from various sources, scrubbing and deduplicating, we built a set of about 20,000 names.

As a warmup, here are the most frequent words found in company names:

<div>
  <a href="https://plot.ly/~drucev/175/?share_key=pXBgAYfdURpgXHSDbJUiNe" target="_blank" title="most-popular" style="display: block; text-align: center;"><img src="https://plot.ly/~drucev/175.png?share_key=pXBgAYfdURpgXHSDbJUiNe" alt="most-popular" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a><br />
</div>

The most frequent bigrams or 2-word combinations: 

<div>
  <a href="https://plot.ly/~drucev/177/?share_key=fAXDiIeEu8eZAWN5eoOrJA" target="_blank" title="most-popular-bigrams" style="display: block; text-align: center;"><img src="https://plot.ly/~drucev/177.png?share_key=fAXDiIeEu8eZAWN5eoOrJA" alt="most-popular-bigrams" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a><br />
</div>

&nbsp;

[Word2Vec](https://en.wikipedia.org/wiki/Word2vec) is an algorithm which, given a corpus of text, maps words to vectors of floating-point numbers, magically distilling syntactic and semantic attributes of each word.<small><sup><a href="#1">1</a></sup></small> Vector representations of words are used for machine translation, sentiment analysis, intelligent personal assistants like Siri and Alexa, and other natural language processing applications. Word2Vec word vectors can be [uncannily accurate](http://byterot.blogspot.com/2015/06/five-crazy-abstractions-my-deep-learning-word2doc-model-just-did-NLP-gensim.html) in representing meanings and relationships between words. 

We could train our own vectors, but this is not a large corpus, and [there are many pre-trained vector sets](https://github.com/3Top/word2vec-api#where-to-get-a-pretrained-model) based on the Web, Wikipedia, different languages and corpora. Let’s load the set of vectors trained on [Google News](https://code.google.com/archive/p/word2vec/), map our frequently used words, and cluster them.

<table>
  <tr>
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 0 (522 words)</b><br /> [‘management’, ‘partners’, ‘co’, ‘services’, ‘global’, ‘international’, ‘research’, ‘new’, ‘national’, ‘mutual’]
    </td>
    
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 1 (444 words)</b><br /> [‘inc’, ‘sa’, ‘hong’, ‘kong’, ‘de’, ‘al’, ‘deutsche’, ‘nv’, ‘ma’, ‘adv’]
    </td>
    
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 2 (545 words)</b><br /> [‘life’, ‘fidelity’, ‘golden’, ‘royal’, ‘legacy’, ‘millennium’, ‘beacon’, ‘fortune’, ‘republic’, ‘heritage’]
    </td>
  </tr>
  
  <tr>
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 3 (336 words)</b><br /> [‘capital’, ‘investment’, ‘asset’, ‘wealth’, ‘investments’, ‘holdings’, ‘fund’, ‘financial’, ‘company’, ‘ag’, ‘funds’, ‘trading’, ‘markets’, ‘investors’, ‘managers’]
    </td>
    
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 4 (180 words)</b><br /> [‘pacific’, ‘north’, ‘creek’, ‘river’, ‘west’, ‘sun’, ‘south’, ‘northern’, ‘summit’, ‘ridge’]
    </td>
    
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 5 (150 words)</b><br /> [‘eagle’, ‘tiger’, ‘lion’, ‘falcon’, ‘wolf’, ‘arrow’, ‘peregrine’, ‘owl’, ‘fur’, ‘fox’]
    </td>
  </tr>
  
  <tr>
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 6 (223 words)</b><br /> [‘street’, ‘hill’, ‘estate’, ‘park’, ‘property’, ‘square’, ‘spa’, ‘lane’, ‘bridge’, ‘road’]
    </td>
    
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 7 (656 words)</b><br /> [‘asia’, ‘uk’, ‘singapore’, ‘canada’, ‘pvt’, ‘japan’, ‘india’, ‘morgan’, ‘europe’, ‘australia’]
    </td>
    
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 8 (725 words)</b><br /> [‘limited’, ‘holding’, ‘the’, ‘first’, ‘real’, ‘point’, ‘us’, ‘blue’, ‘one’, ‘old’]
    </td>
  </tr>
  
  <tr>
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 9 (237 words)</b><br /> [‘alpha’, ‘amp’, ‘matrix’, ‘quantum’, ‘meridian’, ‘sigma’, ‘dimensional’, ‘constellation’, ‘symmetry’, ‘parametric’]
    </td>
    
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 10 (106 words)</b><br /> [‘china’, ‘rock’, ‘stone’, ‘silver’, ‘kg’, ’emerald’, ‘steel’, ‘gold’, ‘diamond’, ‘mill’]
    </td>
    
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 11 (207 words)</b><br /> [‘oak’, ‘tree’, ‘brown’, ‘wood’, ‘cypress’, ‘pine’, ‘harvest’, ‘grove’, ‘cedar’, ‘maple’]
    </td>
  </tr>
  
  <tr>
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 12 (1413 words)</b><br /> [‘llc’, ‘ltd’, ‘lp’, ‘pte’, ‘pty’, ‘corp’, ‘gmbh’, ‘shanghai’, ‘hk’, ‘ubs’]
    </td>
    
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 13 (108 words)</b><br /> [‘harbor’, ‘compass’, ‘banca’, ‘marine’, ‘spinnaker’, ‘anchorage’, ‘shipping’, ‘port’, ‘motor’, ‘mariner’]
    </td>
    
    <td valign="top" style="font-size: 9pt; line-height: 9pt;">
      <b>Cluster 14 (276 words)</b><br /> [‘advisors’, ‘group’, ‘advisory’, ‘private’, ‘corporation’, ‘trust’, ‘associates’, ‘counsel’, ‘consulting’, ‘advisers’]
    </td>
  </tr>
</table>

&nbsp;  
We distinguish clusters related to countries, geographical features, animals, trees, minerals and materials, nautical concepts, scientific and financial concepts, positive metaphors like ‘fidelity’ and ‘heritage’.

Plotting popular words from each cluster, and connecting words that are frequently co-located in the same firm names, we get

<div>
  <a href="https://plot.ly/~drucev/173/?share_key=ApEkePEwduzeM2RRlBrGbo" target="_blank" title="circle" style="display: block; text-align: center;"><img src="https://plot.ly/~drucev/173.png?share_key=ApEkePEwduzeM2RRlBrGbo" alt="circle" style="max-width: 100%;width: 400px;"  width="400" onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a><br />
</div>

We can explore related words using [Google’s Embeddings Projector](http://projector.tensorflow.org/?config=http://media.streeteye.com/static/D3/fundnames_config.2.js), which generates 3D images of word relationships that look like this:

[<img src="/assets/wp-content/uploads/2018/02/Screen-Shot-2018-02-19-at-Feb-19-2018-7.04.27-AM-300x245.png" alt="Embeddings projector" width="300" height="245" class="aligncenter size-medium wp-image-6473" srcset="/assets/wp-content/uploads/2018/02/Screen-Shot-2018-02-19-at-Feb-19-2018-7.04.27-AM-300x245.png 300w, /assets/wp-content/uploads/2018/02/Screen-Shot-2018-02-19-at-Feb-19-2018-7.04.27-AM-768x628.png 768w, /assets/wp-content/uploads/2018/02/Screen-Shot-2018-02-19-at-Feb-19-2018-7.04.27-AM.png 922w" sizes="(max-width: 300px) 100vw, 300px" />](/assets/wp-content/uploads/2018/02/Screen-Shot-2018-02-19-at-Feb-19-2018-7.04.27-AM.png)

  * Click on the link for the [embeddings projector](http://projector.tensorflow.org/?config=http://media.streeteye.com/static/D3/fundnames_config.2.js), wait for it to load the data.
  * Start entering a word at top right to search for it
  * Select the word you want in the list that gets populated
  * Click “Isolate data points”
  * Drag the image around with your mouse to see related words
  * When you’re done, hit “Clear selection”

It’s a bit like taking a word and algorithmically free-associating similar words that are used in fund names.

Finally, we can train a machine learning algorithm to automatically generate realistic-sounding new names based on our corpus! Use [this link](http://www.streeteye.com/namegenerator) or the form below to generate names based on a starting string (or leave blank).

<div class="nameframe-container">
    <iframe src="http://www.streeteye.com/namegenframe/">
    </iframe>
</div>


&nbsp;  
Some names may be similar to existing names in the corpus, which are the property of their respective owners. 

Other names are a bit random…use them for inspiration for your next corporate entity…or if you need to generate random realistic-looking text for testing purposes or to fool a spam filter. We make no representation about the regulatory compliance, appropriateness, or marketing value of generated names!

The [code is here](https://github.com/druce/fundnames).

We hope this will free valuable time from the fund naming problem to let managers focus on generating alpha.

<small><sup><a name="1">1</a></sup> How does Word2Vec work? It’s like a Netflix movie recommendation system, but for words. The Netflix recommender maps each user and each movie to a vector. It tries to find</p> 

<p>
  1. A vector to represent each movie and<br /> 2. A vector to represent each user such that<br /> 3. When you multiply those two vectors, you get a number that predicts how the user will rate the movie.
</p>

<p>
  As users rate a lot of movies and the system trains and improves the vectors, different vector components start to represent movie features, like action-adventure, rom-com, scifi, etc.
</p>

<p>
  Now to see how Word2Vec assigns vectors to words, substitute the statement ‘user <em>u</em> likes movie <em>m</em>‘ with ‘the word <em>goldman</em> frequently occurs in same context as the word <em>morgan</em>‘.
</p>

<p>
  By using a large corpus to train vectors which predict what words arise in similar context, we arrive at vectors that represent a sometimes-shockingly complex knowledge about each word, bordering on understanding. For instance, we might find that the word vector closest to ‘Paris’ _ ‘France’ + ‘Germany’ is ‘Berlin.’ In other words, Word2Vec in some sense understands that ‘Paris is to France as Berlin is to Germany.’ <a href="https://blog.acolyer.org/2016/04/21/the-amazing-power-of-word-vectors/">This post is a good intro</a>.<br /> </small><br /> <small><sup><a name="2">2</a></sup> Computer-generated names are generated as follows:</p> 
  
  <ul>
    <li>
      Split each firm name into all its initial substrings.
    </li>
    <li>
      Identify the character following each substring. In other words, for “Wiley E. Coyote Investment Management”, generate pairs like <br /> (‘Wile’, ‘y’)<br /> (‘Wiley E. Coy’, ‘o’)<br /> (‘Wiley E. Coyote Investment Managemen’, ‘t’)
    </li>
    <li>
      Use these pairs as a corpus to train a recurrent neural network to predict the next character following an initial fund name substring.
    </li>
    <li>
      Get like 75% accuracy _ RNNs are <a href="http://karpathy.github.io/2015/05/21/rnn-effectiveness/">unreasonably effective</a>, or language is surprisingly predictable.
    </li>
    <li>
      To predict, seed the algorithm with a chunk or an empty string, predict the following character.
    </li>
    <li>
      Add the predicted character to the end of the string, predict with the resulting chunk.
    </li>
    <li>
      Get a large number of silly names that resemble the training corpus, with some randomness added.
    </li>
  </ul>
  
  <p>
    </small><br /> <br />
  </p>
