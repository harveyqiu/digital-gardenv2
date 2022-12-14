---
title: "Personal Search Engine"
description: ""
createdDate: "2022-09-02"
updatedDate: "2022-09-03"
tags: ["Tech"]
draft: false
---

我前一段时间新建了一个 digital-gardenv2 的 repo ，因为我觉得原来那个叫 digital-garden 的 repo ，整个代码框架基本上就是复制的别人的代码，尽管作者并不介意，但我用久了之后还是感觉有些奇怪。所以打算新建一个 repo ，从头开始建立自己的 digital garden 。我用了一个蛮新的框架，叫 astro （我很喜欢使用新玩意）。过去那个 digital garden 的 repo 应该不会再更新了，但里面我写的一句话可以会伴随我下去。

我写的是“Harvey writes posts about failures and mistakes, ups and downs.“。

今天这篇就写点关于我最近的 failures and mistakes。

也许是因为临近考试的原因，我反而更忙于研究一些跟考试没有关系的新鲜东西，最近在研究的是个人搜索引擎和self-host。

这篇文章先说说个人搜索引擎。

我记不清我是先了解的 [yacy](yacy.net) 还是先了解的 [monocle](https://github.com/thesephist/monocle) 。

先说说yacy。其开发目的其实是为了建立一个基于 p2p 的分布式搜索引擎，但你也可以选择 webportal 模式，即不与其他的 yacy 节点进行连接。
因为我只想在我的 yacy 里搜索我自己索引的内容，所以我选择的是 webportal 模式。（如果选择 freeworld 模式，就会与其他的节点相连接，搜索时结果就会加入其他 yacy 节点索引的内容，我试过两次 freeworld 模式下的搜索，搜索结果鱼龙混杂。）
设置后之后你可以选择输入一些你需要爬取的网站的地址，然后 yacy 就会慢慢的爬取，然后建立索引。建立完索引之后就可以进行搜索了。
我爬取了几个我很欣赏的网站，总体的流程还是很方便的。其中还有一个小插曲，我本以为 [Gwern](https://www.gwern.net) 这个网站的体量应该不大，结果刚刚开始爬取，就发现 yacy 索引了2万多的页面，我感觉有些不对劲，就终止了对这个网站的爬取。

我是一个三分钟热度的人，当我花了一天多的时间研究yacy和我已经爬取的内容，我问了自己一个问题，我做的这些事情，难道使用 google 不能完成吗？如果我只是要搜索某个网站的内容，我完全可以在 google 中使用 “ site:www.example.com ” 的高级搜索语法。如果我需要搜索特定的一些网站中的内容，我也可以选择使用 google 的 [cse](https://cse.google.com) 。[^1]

[^1]: 具体方法，见[少数派幕后 | 为了「派早报」不翻车，我们做个了官方新闻搜索引擎](https://sspai.com/prime/story/whitelisted-news-custom-search)。

所以，为了搜索公开的网页的内容，自己完全没有必要自己建一个 yacy 然后爬取这些内容，因为搜索引擎的爬虫爬取公开网站内容的效率只会更快，而且存储的网页内容也是近乎无限的。

让我们回到最初的问题：建立一个个人搜索引擎。既然公开的网页的内容的检索，我们完全可以借助商业搜索引擎来解决，那么非公开的网页的内容呢，往更大范围去想，如果是非公开的内容呢？毕竟并不是什么内容都会有一个URL指向它。

我研究Linus的 [monocle](https://github.com/thesephist/monocle) ，其基本原理就是将他自己个人创造的内容或者阅读的内容放在一起，然后生成一个 inverted index ，然后进行搜索。原理上其实并不困难。

下面我来解释一下什么是 inverted index 。

比如有5条内容，分别来自不同的来源。汇总整理后它们以 json 的格式呈现。

```json
[
	{
		id: 1,
		content: "Hello World"
	},
	{
		id: 2,
		content: "Hello Cat"
	},
	{
		id: 3,
		content: "Cat World"
	},
	{
		id: 4,
		content: "Cat Hello"
	},
	{
		id: 5,
		content: "Hello Cat World"
	}
]
```

转换为 inverted index 是这样的。

```json
[
	"Hello": [1, 2, 4, 5],
	"World": [1, 3, 5],
	"Cat": [2, 3, 4, 5]
]
```

当你要以"Hello"为关键词进行搜索时，就会返回 id 分别为1、2、4、5的内容。

当然，你在构建 inverted index 的时候也可以标识每个索引词在每条内容中的具体位置。那么，就可能是这样。

```json
[
	"Hello": [
		{ id: 1, pos: [ 0 ] }, 
		{ id: 2, pos: [ 0 ] }, 
		{ id: 4, pos: [ 1 ] },
    	{ id: 5, pos: [ 0 ] }
	 ],
	 ...下面的就不列举了
	 ...当一条内容中有多个索引词时，pos数组内增加几个位置即可
]
```

既然并不困难，为什么我没能实现呢？

一个原因是因为 Linus 的 Monocle 所使用的编程语言是他自己开发的一门叫 Ink 的编程语言，我并不熟悉，完全不知道怎么把他公开的代码给运行起来。二是，我并不清楚如何处理包含中文的 inverted index 。

与英文通过空格以及符号来区分每个单词不同，中文，每个词是连在一起的。你看看你刚读的这句话，是不是中文的词语是连在一起的？一句英文“Hello, nice to meet you!"可以轻松的分为“Hello“、”nice“、”to“、“meet“、“you“，你不需要了解英文的文法，就能轻松的分词，但是中文不同。你不能把”每个词是连在一起的“分成”每个“、”词是“、”连在一“、”起的“。

我知道现在有公开的中文分词方案，但我总觉得这不应该是我一个踏入的未知领域。

我放弃了自己写生成 inverted index 的算法，转而试图找寻现有的全文搜索的开源方案。就我了解，现在全文搜索的主要开源方案包括 ElasticSearch、Apache Solr、TypeSense、MeiliSearch 。前面两个都基于 Java 开发，我恐于 Java 对内存的高占用，所以一开始就排除了。 TypeSense 现在还不支持中文， MeiliSearch 在索引增多的时候性能下降且单个字段内容的长度存在一定限制。所以这四个方案都被我排除了。[^2]

[^2]: 事后我看到另外一篇关于个人搜索引擎的文章，作者写道：“Maintenance free because many self-built tools are a huge timesink, and I want this to save me time. Money free because I intend to keep this tool for many years and don't like continuous payments.”，我十分赞同。 详见[A Local Search Engine](https://siboehm.com/articles/21/a-local-search-engine)。

到了这个阶段的时候，其实我已经有点泄气了，我问了问自己是否真的有建立个人搜索引擎的需求。现在的我并不是一个知识工作者，老实说并没有那么强的搜索自己过往创造的内容的需求。

在我回答了我自己这个问题之后，我倒是找到了一个比较适合我的搜索软件，叫做 [Recoll](https://www.lesbonscomptes.com/recoll/) 。它似乎解决了我的问题。将我 Obsidian 笔记的文件夹添加进去之后，我发现我能方便的搜索我在 Obsidian Vault 中存放的内容。

之后，我将过去的一些我从[简阅](http://ksria.com/simpread/)中导出的文件的所在文件夹也添加到了recoll的索引文件夹中。我想，之后如果我有需求，我也将 DayOne 中我记录的日记以 json 格式或者 pdf 格式导出，在 Twitter 中将我发的 Tweets [导出](https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive)。只要能够以文件形式存放在我的电脑中，理论上使用 recoll 都可以搜索。

这好像就是我想要的个人搜索引擎的样子了。

你也许会问，这和在 Finder 中搜索有什么区别？你可以尝试一下在 Finder 搜索某个文件中所包含的某段内容，你会发现搜索速度很慢而且很有可能搜索不到。 Recoll 会在你添加某个文件夹之后建立索引，这使得后续的搜索能够又快又准。