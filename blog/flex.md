<p>到目前为止，Flexbox布局应该是目前最流行的布局方式之一了。而Flexbox布局的最大特性就是让Flex项目可伸缩，也就是让Flex项目的宽度和高度可以自动填充Flex容器剩余的空间或者缩小Flex项目适配Flex容器不足的宽度。而这一切都是依赖于Flexbox属性中的<code>flex</code>属性来完成。一个Flex容器会等比的按照各Flex项目的扩展比率分配Flex容器剩余空间，也会按照收缩比率来缩小各Flex项目，以免Flex项目溢出Flex容器。但其中Flex项目又是如何计算呢？他和扩展比率或收缩比率之间又存在什么关系呢？在这篇文章中我们将一起来探来。</p>
<blockquote>在Flexbox布局中，容器中显示式使用<code>display</code>设置为<code>flex</code>或<code>inline-flex</code>，那么该容器就是Flex容器，而该容器的所有子元素就是Flex项目。</blockquote>
<h2 id="articleHeader0">简介</h2>
<p>在这篇文章中，我们将要聊的是有关于<code>flex</code>属性的事情，特别是如何使用该属性来计算Flex项目？在开始之前，先来简单的了解一下<code>flex</code>属性。</p>
<p>在Flexbox中，<code>flex</code>属性是<code>flex-grow</code>（扩展比率）、<code>flex-shrink</code>（收缩比率）和<code>flex-basis</code>（伸缩基准）三个属性的简称。这三个属性可以控制一个Flex项目（也有人称为Flex元素），主要表现在以下几个方面：</p>
<ul>
<li>
<strong><code>flex-grow</code></strong>：Flex项目的扩展比率，让Flex项目得到（伸张）多少Flex容器多余的空间（Positive free space）</li>
<li>
<strong><code>flex-shrink</code></strong>：Flex项目收缩比率，让Flex项目减去Flex容器不足的空间（Negative free space）</li>
<li>
<strong><code>flex-basis</code></strong>：Flex项目未扩展或收缩之前，它的大小是多少</li>
</ul>
<p>在Flexbox布局中，只有充分理解了这三个属性才能彻底的掌握Flex项目是如何扩展和收缩的，也才能更彻底的掌握Flexbox布局。因此掌握这三个属性，以及他们之间的计算关系才是掌握Flexbox布局的关键所在。</p>
<h2 id="articleHeader1">相关概念</h2>
<p>在具体介绍<code>flex</code>相关的技术之前，先对几个概念进行描述，因为理解了这几个概念更有易于大家对后面知识的理解。</p>
<h3 id="articleHeader2">主轴长度和主轴长度属性</h3>
<p>Flex项目在主轴方向的宽度或高度就是Flex项目的主轴长度，Flex项目的主轴长度属性是<code>width</code>或<code>height</code>属性，具体是哪一个属性，将会由主轴方向决定。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115805" src="/img/remote/1460000017115805" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">剩余空间和不足空间</h3>
<p>在Flexbox布局中，Flex容器中包含一个或多个Flex项目（该容器的子元素或子节点）。Flex容器和Flex项目都有其自身的尺寸大小，那么就会有：<strong>Flex项目尺寸大小之和大于或小于Flex容器</strong>&nbsp;情景：</p>
<ul>
<li>当所有Flex项目尺寸大小之和小于Flex容器时，Flex容器就会有多余的空间没有被填充，那么这个空间就被称为<strong>Flex容器的剩余空间（Positive Free Space）</strong>
</li>
<li>当所有Flex项目尺寸大小之和大于Flex容器时，Flex容器就没有足够的空间容纳所有Flex项目，那么多出来的这个空间就被称为<strong>负空间（Negative Free Space）</strong>
</li>
</ul>
<p>举个例子向大家阐述这两个情形：“假设我们有一个容器（Flex容器），显式的给其设置了<code>width</code>为<code>800px</code>，<code>padding</code>为<code>10px</code>，并且<code>box-sizing</code>设置为<code>border-box</code>”。根据CSS的盒模型原理，我们可以知道Flex容器的内宽度（Content盒子的宽度）为<code>800px - 10px * 2 = 780px</code>：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115806" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>假设Flex容器中包含了四个Flex项目，而且每个Flex项目的<code>width</code>都为<code>100px</code>，那么所有Flex项目的宽度总和则是<code>100px * 4 = 400px</code>（Flex项目没有设置其他任何有关于盒模型的尺寸），那么Flex容器将会有剩余的空间出来，即<code>780px - 400px = 380px</code>。这个<strong><code>380px</code></strong>就是我们所说的Flex容器的剩余空间：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115807" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>假设把Flex项目的<code>width</code>从<code>100px</code>调到<code>300px</code>，那么所有Flex项目的宽度总和就变成了<code>300px * 4 = 1200px</code>。这个时候Flex项目就溢出了Flex容器，这个溢出的宽度，即<code>1200px - 780px = 420px</code>。这个<strong><code>420px</code></strong>就是我们所说的Flex容器的不足空间：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115808" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>上面演示的是主轴在<code>x</code>轴方向，如果主轴变成<code>y</code>轴的方向，同样存在上述两种情形，只不过把<code>width</code>变成了<code>height</code>。<strong>接下来的内容中，如果没有特殊说明，那么所看到的示例都仅演示主轴在<code>x</code>轴的方向，即<code>flex-direction</code>为<code>row</code>！</strong>
</blockquote>
<h3 id="articleHeader4">min-content 和 max-content</h3>
<p><code>min-content</code>和<code>max-content</code>是CSS中的一个新概念，隶属于<a href="https://drafts.csswg.org/css-sizing-3/#width-height-keywords" rel="nofollow noreferrer" target="_blank">CSS Intrinsic and Extrinsic Sizing Specification</a>模块。简单的可以这么理解。</p>
<p>CSS可以给任何一个元素显式的通过<code>width</code>属性指定元素内容区域的宽度，内容区域在元素<code>padding</code>、<code>border</code>和<code>margin</code>里面。该属性也是CSS盒模型众多属性之一。</p>
<blockquote>记住，CSS的<code>box-sizing</code>可以决定<code>width</code>的计算方式。</blockquote>
<p>如果我们显式设置<code>width</code>为关键词<code>auto</code>时，元素的<code>width</code>将会根据元素自身的内容来决定宽度。而其中的<code>min-content</code>和<code>max-content</code>也会根据元素的内容来决定宽度，只不过和<code>auto</code>有较大的差异</p>
<ul>
<li>
<strong><code>min-content</code></strong>： 元素固有的最小宽度</li>
<li>
<strong><code>max-content</code></strong>： 元素固有的首选宽度</li>
</ul>
<p>比如下面这个示例：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115809" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果内容是英文的话，<code>min-content</code>的宽度将取决于内容中最长的单词宽度，中文就有点怪异（其中之因目前并未深究），而<code>max-content</code>则会计算内容排整行的宽度，有点类似于加上了<code>white-space:nowrap</code>一样。</p>
<blockquote>上例仅展示了<code>min-content</code>和<code>max-content</code>最基本的渲染效果（Chrome浏览器渲染行为）。这里不做深入的探讨论，毕竟不是本文的重点，如果感兴趣，欢迎关注后续的相关更新，或者先阅读@张鑫旭 老师写的一篇文章《<a href="https://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/" rel="nofollow noreferrer" target="_blank">理解CSS3&nbsp;<code>max/min-content</code>及<code>fit-content</code>等<code>width</code>值</a>》</blockquote>
<p>回到我们自己的主题上来。</p>
<p>前面在介绍Flex剩余空间和不足空间的时候，我们可以得知，出现这两种现象取决于Flex容器和Flex项目的尺寸大小。而<code>flex</code>属性可以根据Flex容器的剩余空间（或不足空间）对Flex项目进行扩展（或收缩）。那么为了计算出有多少Flex容器的剩余空间能用于Flex项目上，客户端（浏览器）就必须知道Flex项目的尺寸大小。要是没有显式的设置元素的<code>width</code>属性，那么问题就来了，浏览器它是如何解决没有应用于绝对单位的宽度（或高度）的Flex项目，即如何计算？</p>
<p>这里所说的<code>min-content</code>和<code>max-content</code>两个属性值对于我们深入的探讨<code>flex</code>属性中的<code>flex-grow</code>和&nbsp;<code>flex-grow</code>属性有一定的影响。所以提前向大家简单的阐述一正是这两个属性值在浏览器中的渲染行为。</p>
<blockquote>简单的总结一下：<strong><code>min-content</code>的大小，从本质上讲，是由字符串中最长的单词决定了大小；<code>max-content</code>则和<code>min-content</code>想反. 它会变得尽可能大, 没有自动换行的机会。如果Flex容器太窄， 它就会溢出其自身的盒子!</strong>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115810" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">Flex项目的计算</h2>
<p>在Flexbox布局当中，其中&nbsp;<code>flex-grow</code>、<code>flex-shrink</code>和<code>flex-basis</code>都将会影响Flex项目的计算。接下来我们通过一些简单的示例来阐述这方面的知识。</p>
<h3 id="articleHeader6">flex-basis</h3>
<p><code>flex-basis</code>属性在任何空间分配发生之前初始化Flex项目的尺寸。其默认值为<code>auto</code>。如果<code>flex-basis</code>的值设置为<code>auto</code>，浏览器将先检查Flex项目的主尺寸是否设置了绝对值再计算出Flex项目的初始值。比如说，你给Flex项目设置的<code>width</code>为<code>200px</code>，那么<code>200px</code>就是Flex项目的<code>flex-basis</code>值。</p>
<p>如果你的Flex项目可以自动调整大小，则<code>auto</code>会解析为其内容的大小，这个时候，<code>min-content</code>和<code>max-content</code>变会起作用。此时将会把Flex项目的<code>max-content</code>作为&nbsp;<code>flex-basise</code>的值。比如，下面这样的一个简单示例：</p>
<p><code>flex-grow</code>和<code>flex-shrink</code>的值都为<code>0</code>，第一个Flex项目的<code>width</code>为<code>150px</code>，相当于<code>flex-basis</code>的值为<code>150px</code>，而另外两个Flex项目在没有设置宽度的情况之下，其宽度由内容的宽度来设置。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115811" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>如果<code>flex-basis</code>的值设置为关键词<code>content</code>，会导致Flex项目根据其内容大小来设置Flex项目，叧怕是Flex项目显式的设置了<code>width</code>的值。到目前为止，<code>content</code>还未得到浏览器很好的支持。</p>
<p><code>flex-basis</code>除了可以设置<code>auto</code>、<code>content</code>、<code>fill</code>、<code>max-content</code>、<code>min-content</code>和<code>fit-content</code>关键词之外，还可以设置<code>&lt;length&gt;</code>值。如果<code>&lt;length&gt;</code>值是一个<strong>百分比值</strong>，那么Flex项目的大小将会根据Flex容器的<code>width</code>进行计算。比如下面这个示例：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115812" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>Flex容器显式设置了<code>width</code>（和<code>box-sizing</code>取值有关系，上图为<code>border-box</code>的示例结果），那么<code>flex-basis</code>会根据Flex容器的<code>width</code>计算出来，如果Flex容器未显示设置<code>width</code>值，则计算出来的结果将是未定义的（会自动根据Flex容器的宽度进行计算）。</p>
<p>在Flexbox布局中，如果你想完全忽略Flex项目的尺寸，则可以将<code>flex-basis</code>设置为<code>0</code>。这样的设置，基本上是告诉了浏览器，Flex容器所有空间都可以按照相关的比例进行分配。</p>
<p>来看一个简单的示例，Flex项目未显式设置<code>width</code>情况之下，<code>flex-basis</code>不同取值的渲染效果。</p>
<blockquote>到写这篇文章为止，使用Firefox浏览器查看效果更佳。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115813" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>当Flex项目显式的设置了<code>min-width</code>或<code>max-width</code>的值时，就算Flex项目显式的设置了<code>flex-basis</code>的值，也会按<code>min-width</code>和<code>max-width</code>设置Flex项目宽度。当计算的值大于<code>max-width</code>时，则按<code>max-width</code>设置Flex项目宽度；当计算的值小于<code>min-width</code>时，则按<code>min-width</code>设置Flex项目宽度：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115814" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>有关于<code>flex-basis</code>属性相关的运用简单的小结一下：</p>
<ul>
<li>
<code>flex-basis</code>默认值为<code>auto</code>
</li>
<li>如果Flex项目显式的设置了<code>width</code>值，同时<code>flex-basis</code>为<code>auto</code>时，则Flex项目的宽度为按<code>width</code>来计算，如果未显式设置<code>width</code>，则按Flex项目的内容宽度来计算</li>
<li>如果Flex项目显式的设置了<code>width</code>值，同时显式设置了<code>flex-basis</code>的具体值，则Flex项目会忽略<code>width</code>值，会按<code>flex-basis</code>来计算Flex项目</li>
<li>当Flex容器剩余空间不足时，Flex项目的实际宽度并不会按<code>flex-basis</code>来计算，会根据<code>flex-grow</code>和<code>flex-shrink</code>设置的值给Flex项目分配相应的空间</li>
<li>对于Flexbox布局中，不建议显式的设置Flex项目的<code>width</code>值，而是通过<code>flex-basis</code>来控制Flex项目的宽度，这样更具弹性</li>
<li>如果Flex项目显式的设置了<code>min-width</code>或<code>max-width</code>值时，当<code>flex-basis</code>计算出来的值小于<code>min-width</code>则按<code>min-width</code>值设置Flex项目宽度，反之，计算出来的值大于<code>max-width</code>值时，则按<code>max-width</code>的值设置Flex项目宽度</li>
</ul>
<h3 id="articleHeader7">flex-grow</h3>
<p>前面提到过，<code>flex-grow</code>是一个扩展因子（扩展比例）。其意思是，当Flex容器有一定的剩余空间时，<code>flex-grow</code>可以让Flex项目分配Flex容器剩余的空间，每个Flex项目将根据<code>flex-grow</code>因子扩展，从而让Flex项目布满整个Flex容器（有效利用Flex容器的剩余空间）。</p>
<p><code>flex-grow</code>的默认值是<code>0</code>，其接受的值是一个数值，也可以是一个小数值，但不支持负值。一旦<code>flex-grow</code>的值是一个大于<code>0</code>的值时，Flex项目就会占用Flex容器的剩余空间。在使用<code>flex-grow</code>时可以按下面的方式使用：</p>
<ul>
<li>所有Flex项目设置相同的<code>flex-grow</code>值</li>
<li>每个Flex项目设置不同的<code>flex-grow</code>值</li>
</ul>
<p>不同的设置得到的效果将会不一样，但<code>flex-grow</code>的值始终总量为<code>1</code>，即<strong>Flex项目占有的量之和（分子）和分母相同</strong>。我们来具体看看<code>flex-grow</code>对Flex项目的影响。</p>
<p>当所有的Flex项目具有一个相同的<code>flex-grow</code>值时，那么<strong>Flex项目将会平均分配Flex容器剩余的空间</strong>。在这种情况之下将<code>flex-grow</code>的值设置为<code>1</code>。比如下面这个示例，Flex容器（<code>width: 800px</code>，<code>padding: 10px</code>）中有四个子元素（Flex项目），显式的设置了<code>flex-basis</code>为<code>150px</code>，根据前面介绍的内容，我们可以知道每个Flex项目的宽度是<code>150px</code>，这样一来，所有Flex项目宽度总和为<code>150px * 4 = 600px</code>。容器的剩余空间为<code>780px - 600px = 180px</code>。当显式的给所有Flex项目设置了<code>flex-grow</code>为<code>1</code>（具有相同的值）。这样一来，其告诉浏览器，把Flex容器剩余的宽度（<code>180px</code>）平均分成了四份，即：<strong><code>180px / 4 = 45px</code></strong>。而<code>flex-grow</code>的特性就是按比例把Flex容器剩余空间分配给Flex项目（当然要设置了该值的Flex项目），就该例而言，就是给每个Flex项目添加了<code>45px</code>，也就是说，此时Flex项目的宽度从<code>150px</code>扩展到了<code>195px</code>（<code>150px + 45px = 195px</code>）。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115815" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>特别声明，如果Flex项目均分Flex容器剩余的空间，只要给Flex项目设置相同的<code>flex-grow</code>值，大于<code>1</code>即可。比如把<code>flex-grow</code>设置为<code>10</code>，就上例而言，把剩余空间分成了<code>40</code>份，每个Flex项目占<code>10</code>份。其最终的效果和设置为<code>1</code>是等效的。</blockquote>
<p>上面我们看到的均分Flex容器剩余空间，事实上我们也可以给不同的Flex项目设置不同的<code>flex-grow</code>值，这样一来就会让每个Flex项目根据自己所占的比例来占用Flex容器剩余的空间。比如上面的示例，把Flex项目的<code>flex-grow</code>分别设置为<code>1:2:3:4</code>。也就是说把Flex容器的剩余空间分成了<code>10</code>份（<code>1 + 2 + 3 + 4 = 10</code>），而每个Flex项目分别占用Flex容器剩余空间的<code>1/10</code>、<code>2/10</code>、<code>3/10</code>和<code>4/10</code>。就上例而言，Flex容器剩余空间是<code>180px</code>，按这样的计算可以得知，每一份的长度是<code>180px / 10 = 18px</code>，如此一来，每个Flex项目的宽度则变成：</p>
<ul>
<li>Flex1:&nbsp;<code>150px + 18px * 1 = 168px</code>
</li>
<li>Flex2:&nbsp;<code>150px + 18px * 2 = 186px</code>
</li>
<li>Flex3:&nbsp;<code>150px + 18px * 3 = 204px</code>
</li>
<li>Flex4:&nbsp;<code>150px + 18px * 4 = 222px</code>
</li>
</ul>
<p>最终效果如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115816" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>前面两个示例向大家演示了，Flex项目均分和非均分Flex容器剩余的空间。从示例中可以看出来，<code>flex-grow</code>的值都是大于或等于<code>1</code>的数值。事实上，<code>flex-grow</code>还可以设置小数。比如，给所有Flex项目设置<code>flex-grow</code>的值为<code>0.2</code>。由于Flex项目的<code>flex-grow</code>的值都相等，所以扩展的值也是一样的，唯一不同的是，所有的Flex项目并没有把Flex容器剩余空间全部分完。就我们这个示例而言，四个Flex项目的<code>flex-grow</code>加起来的值是<code>0.8</code>，小于<code>1</code>。换句话说，四个Flex项目只分配了Flex容器剩余空度的<code>80%</code>，按上例的数据来计算，即是<code>180px * .8 = 144px</code>（只分去了<code>144px</code>），而且每个Flex项目分得都是<code>36px</code>（<code>144px / 4 = 36px</code>&nbsp;或者&nbsp;<code>144px * 0.2 / 0.8 = 36px</code>）。最终效果如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115817" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>上面的示例中，<code>flex-basis</code>都显式的设置了值。事实上，<code>flex-grow</code>和<code>flex-basis</code>会相互影响的。这也令我们的Flex项目计算变得复杂化了。比如说，<code>flex-basis</code>的值为<code>auto</code>，而且没有给Flex项目显式的设置<code>width</code>。根据前面的内容我们可以得知，此时Flex项目的大小都取决于其内容的<code>max-content</code>大小。此时Flex容器的剩余的空间将由浏览器根据Flex项目的内容宽度来计算。比如接下来的这个示例，四个Flex项目都是由其内容<code>max-content</code>大小决定。同时将<code>flex-grow</code>都设置为<code>1</code>（均匀分配Flex容器剩余空间）。具体的数据由下图所示（Chrome浏览器计算得出的值）：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115818" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>特别注意，不同浏览器对小数位的计算略有差异，上图是在Chrome浏览器下得出的值。所以最终加起来的值略大于Flex容器的宽度<code>708px</code>。</blockquote>
<p>针对这样的使用场景，如果你想让所有Flex项目具有相同的尺寸，那么可以显式的设置Flex项目的<code>flex-basis</code>值为<code>0</code>（<code>flex: 1 1 0</code>）。从<code>flex-basis</code>一节中可以得知，当<code>flex-basis</code>值为<code>0</code>时，表示所有空间都可以用来分配，而且<code>flex-grow</code>具有相同的值，因此Flex项目可以获取均匀的空间。如此一来Flex项目宽度将会相同。</p>
<blockquote>
<code>flex-basis</code>还可以由其他值为设置Flex项目的宽度，这里不再一一演示。感兴趣的同学可以自己根据<code>flex-basis</code>的取值写测试用例。换句话说，如果你理解了前面介绍的<code>flex-basis</code>内容，就能更好的理解<code>flex-grow</code>和<code>flex-basis</code>相结合对Flex项目分配Flex容器剩余空间的计算。也将不会再感到困惑。</blockquote>
<h3 id="articleHeader8">flex-shrink</h3>
<p><code>flex-shrink</code>和<code>flex-grow</code>类似，只不过<code>flex-shrink</code>是用来控制Flex项目缩放因子。当所有Flex项目宽度之和大于Flex容器时，将会溢出容器（<code>flex-wrap</code>为<code>nowrap</code>时），<code>flex-shrink</code>就可以根据Flex项目设置的数值比例来分配Flex容器的不足空间，也就是按比例因子缩小自身的宽度，以免溢出Flex容器。</p>
<p><code>flex-shrink</code>接收一个<code>&lt;number&gt;</code>值，其默认值为<code>1</code>。也就是说，只要容器宽度不足够容纳所有Flex项目时，所有Flex项目默认都会收缩。如果你不想让Flex项目进行收缩时，可以设置其值为<code>0</code>，此时Flex项目始终会保持原始的<code>fit-content</code>宽度。同样的，<code>flex-shrink</code>也不接受一个负值做为属性值。</p>
<p>基于上面的示例，简单的调整一下参数，所有Flex项目都设置了<code>flex: 0 0 300px</code>，可以看到Flex项目溢出了Flex容器：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115819" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>在这个示例中，由于<code>flex-shrink</code>显式的设置了值为<code>0</code>，Flex项目不会进行收缩。如果你想让Flex项目进行收缩，那么可以把<code>flex-shrink</code>设置为<code>1</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115820" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>从上图的结果我们可以看出，当所有Flex项目的<code>flex-shrink</code>都设置为相同的值，比如<code>1</code>，将会均分Flex容器不足空间。比如此例，所有Flex项目的宽度总和是<code>1200px</code>（<code>flex-basis: 300px</code>），而Flex容器宽度是<code>780px</code>（<code>width: 800px</code>，<code>padding: 10px</code>，盒模型是<code>border-box</code>），可以算出Flex容器不足空间为<code>420px</code>（<code>1200 - 780 = 420px</code>），因为所有Flex项目的<code>flex-shrink</code>为<code>1</code>，其告诉浏览器，将Flex容器不足空间均分成四份，那么每份则是<code>105px</code>（<code>420 / 4 = 105px</code>），这个时候Flex项目就会自动缩放<code>105px</code>，其宽度就由当初的<code>300px</code>变成了<code>195px</code>（<code>300 - 105 = 195px</code>）。</p>
<p>这个示例演示的是Flex项目设置的值都是相同的值，其最终结果是将会均分Flex容器不足空间。其实<code>flex-shrink</code>也可以像<code>flex-grow</code>一样，为不同的Flex项目设置不同的比例因子。比如<code>1:2:3:4</code>，这个时候Flex项目就不会均分了，而是按自己的比例进行收缩，比例因子越大，收缩的将越多。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115821" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>就上图而言，所有Flex项目的<code>flex-shrink</code>之和为<code>10</code>（<code>1 + 2 + 3 + 4 = 10</code>），此时把Flex容器不足空间<code>420px</code>分成了十份，每一份<code>42px</code>（<code>420 / 10 = 42px</code>），每个Flex项目按照自己的收缩因子相应的去收缩对应的宽度，此时每个Flex项目的宽度就变成：</p>
<ul>
<li>Flex1:&nbsp;<code>300 - 42 * 1 = 258px</code>
</li>
<li>Flex2:&nbsp;<code>300 - 42 * 2 = 216px</code>
</li>
<li>Flex3:&nbsp;<code>300 - 42 * 3 = 174px</code>
</li>
<li>Flex4:&nbsp;<code>300 - 42 * 4 = 132px</code>
</li>
</ul>
<p>按照该原理来计算的话，当某个Flex项目的收缩因子设置较大时，就有可能会出现小于<code>0</code>的现象。基于上例，如果把第四个Flex项目的<code>flex-shrink</code>设置为<code>15</code>。这样一来，四个Flex项目的收缩因子就变成：<code>1:2:3:15</code>。也就是说把Flex容器不足空间分成了<code>21</code>份，每份占据的宽度是<code>20px</code>（<code>420 / 21 = 20px</code>）。那么Flex项目的宽度就会出现<code>0</code>的现象（<code>300 - 15 * 20 = 0</code>）。这个时候会不会出现无空间容纳Flex项目的内容呢？事实上并不会这样：</p>
<blockquote><strong>在Flexbox布局当中，会阻止Flex项目元素宽度缩小至<code>0</code>。此时Flex项目会以<code>min-content</code>的大小进行计算，这个大小是它们利用任何可以利用的自动断行机会后所变成的</strong></blockquote>
<p>如果某个Flex项目按照收缩因子计算得出宽度趋近于<code>0</code>时，Flex项目将会按照该元素的<code>min-content</code>的大小来设置宽度，同时这个宽度将会转嫁到其他的Flex项目，再按相应的收缩因子进行收缩。比如上例，Flex项目四，其<code>flex-shrink</code>为<code>15</code>，但其宽度最终是以<code>min-content</code>来计算（在该例中，Chrome浏览器渲染的宽度大约是<code>22.09px</code>）。而这个<code>22.09px</code>最终按照<code>1:2:3</code>的比例分配给了Flex项目一至三（Flex1,Flex2和Flex3）。对应的Flex项目宽度就变成：</p>
<ul>
<li>Flex1:&nbsp;<code>300 - 20 * 1 - 22.09 / 6 * 1 = 276.334px</code>
</li>
<li>Flex2:&nbsp;<code>300 - 20 * 2 - 22.09 / 6 * 2 = 252.636px</code>
</li>
<li>Flex3:&nbsp;<code>300 - 20 * 3 - 22.09 / 6 * 3 = 228.955px</code>
</li>
<li>Flex4:&nbsp;<code>min-content</code>，在该例中大约是<code>22.09px</code>
</li>
</ul>
<p>对于该情形，计算相对而言就更为复杂一些了。但浏览器会很聪明的帮你处理这些场景，会倾向于给你合理的结果。<strong>只不过大家需要知道这样的一个细节，碰到类似的场景才不会一脸蒙逼（^_^）</strong>。</p>
<p><code>flex-grow</code>可以设置一个小于<code>0</code>的值，同样的，<code>flex-shrink</code>也可以设置一个小于<code>0</code>的值，比如我们给所有的Flex项目设置<code>flex-shrink</code>的值为<code>0.2</code>，你将看到的结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115822" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>从结果的示例图中我们可以看出来，<strong>当所有Flex项目的收缩因子（<code>flex-shrink</code>）总和小于<code>1</code>时，Flex容器不足空间不会完全分配完，依旧会溢出Flex容器</strong>。好比该例，<code>flex-shrink</code>的总和是<code>.8</code>，分配了Flex容器剩余空间<code>420px</code>的<code>80%</code>，即<code>336px</code>（还有<code>84px</code>剩余空间未完全分配完），由于每个Flex项目的收缩因子是相同的，好比前面的示例，都设置了<code>1</code>类似，把分配的空间<code>336px</code>均分为四份，也就是<code>84px</code>，因此每个Flex项目的宽度由当初的<code>300px</code>变成了<code>216px</code>（<code>300 - 84 = 216px</code>）。这个其实和<code>flex-grow</code>类似，只不过<code>flex-shrink</code>只是收缩而以。</p>
<h3 id="articleHeader9">Flex项目计算公式</h3>
<p>Flex项目伸缩计算是一个较为复杂的过程，但它们之间还是有据可查。<a href="https://ithelp.ithome.com.tw/users/20107637/ironman" rel="nofollow noreferrer" target="_blank">@Chris</a>和<a href="https://ithelp.ithome.com.tw/users/20107334/profile" rel="nofollow noreferrer" target="_blank">@Otree</a>对该方面就有<a href="https://ithelp.ithome.com.tw/articles/10194694" rel="nofollow noreferrer" target="_blank">深入的研究</a>。他们给Flex项目的计算总结出了一套计算公式，具体公式如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115823" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p><a href="https://codepen.io/airen/full/YREoPq/" rel="nofollow noreferrer" target="_blank">@Chris还依据这套公式写了一个JavaScript的案例</a><button class="btn btn-xs btn-default ml10 preview" data-url="airen/full/YREoPq/" data-typeid="3">点击预览</button>，来模拟Flex项目计算。</p>
<h2 id="articleHeader10">flex常见的值</h2>
<p>大部分情形之下，我们都是使用<code>flex</code>属性来设置Flex项目的伸缩的值。其常见值的效果有：</p>
<ul>
<li>
<code>flex: 0 auto</code>和<code>flex:initial</code>，这两个值与<code>flex: 0 1 auto</code>相同，也是初始值。会根据<code>width</code>属性决定Flex项目的尺寸。当Flex容器有剩余空间时，Flex项目无法扩展；当Flex容器有不足空间时，Flex项目收缩到其最小值<code>min-content</code>。</li>
<li>
<code>flex: auto</code>与<code>flex: 1 1 auto</code>相同。Flex项目会根据<code>width</code>来决定大小，但是完全可以扩展Flex容器剩余的空间。如果所有Flex项目均为<code>flex: auto</code>、<code>flex:initial</code>或<code>flex: none</code>，则Flex项目尺寸决定后，Flex容器剩余空间会被平均分给是<code>flex:a uto</code>的Flex项目。</li>
<li>
<code>flex: none</code>与<code>flex: 0 0 auto</code>相同。Flex项目根据<code>width</code>决定大小，但是完全不可伸缩，其效果和<code>initial</code>类似，这种情况下，即使在Flex容器空间不够而溢出的情况之下，Flex项目也不会收缩。</li>
<li>
<code>flex: &lt;positive-number&gt;</code>（正数）与<code>flex: 1 0px</code>相同。该值使Flex项目可伸缩，并将<code>flex-basis</code>值设置为<code>0</code>，导致Flex项目会根据设置的比例因子来计算Flex容器的剩余空间。如果所有Flex项目都使用该模式，则它们的尺寸会正比于指定的伸缩比。</li>
</ul>
<blockquote>默认状态下，伸缩项目不会收缩至比其最小内容尺寸（最长的英文词或是固定尺寸元素的长度）更小。可以靠设置<code>min-width</code>属性来改变这个默认状态。</blockquote>
<h2 id="articleHeader11">如何掌握Flex项目的大小</h2>
<p>通过前面的内容介绍，应该可以了解到Flex项目的大小计算是非常的复杂。如果要真正的理解Flex项目是如何工作的话，最为关键的是<strong>理解有多少东西参与影响Flex项目</strong>。我们可以按下面这样的方式来进行思考。</p>
<h3 id="articleHeader12">怎么设置Flex项目的基本大小</h3>
<p>在CSS中设置一个元素的基本大小可以通过<code>width</code>来设置，或者通过<code>min-width</code>或<code>max-width</code>来设置元素的最小或最大宽度，在未来我们还可以通过<code>content</code>、<code>min-content</code>、<code>max-content</code>或<code>fit-content</code>等关键词来设置元素的大小。对于Flex项目，我们还可以通过<code>flex-basis</code>设置Flex项目大小。对于如何设置Flex项目的基本大小，我们可以围绕以下几点来进行思考：</p>
<ul>
<li>
<code>flex-basis</code>的值是<code>auto</code>？Flex项目显式的设置了宽度吗？如果设置了，Flex项目的大小将会基于设置的宽度</li>
<li>
<code>flex-basis</code>的值是<code>auto</code>还是<code>content</code>？如果是<code>auto</code>，Flex项目的大小为原始大小</li>
<li>
<code>flex-basis</code>的值是<code>0</code>的长度单位吗？如果是这样那这就是Flex项目的大小</li>
<li>
<code>flex-basis</code>的值是<code>0</code>呢? 如果是这样，则Flex项目的大小不在Flex容器空间分配计算的考虑之内</li>
</ul>
<p>更为具体的可以参阅<code>flex-basis</code>相关的介绍。</p>
<h3 id="articleHeader13">我们有可用空间吗？</h3>
<p>如果Flex容器没有剩余空间，Flex项目就不会扩展；如果Flex容器没有不足空间，Flex项目就不会收缩：</p>
<ul>
<li>所有的Flex项目的宽度总和是否小于Flex容器的总宽度？ 如果是这样，那么Flex容器有剩余空间，<code>flex-grow</code>会发挥作用， 具体如何发挥作用，可以参阅<code>flex-grow</code>相关的介绍</li>
<li>所有的Flex项目的宽度总和是否大于Flex容器的总宽度？ 如果是这样，那么Flex容器有不足空间，<code>flex-shrink</code>会发挥作用，具体如何发挥作用，可以参阅<code>flex-shrink</code>相关的介绍</li>
</ul>
<h3 id="articleHeader14">分配空间的其他方式</h3>
<p>如果我们不想把Flex容器的剩余空间扩展到Flex项目中，我们可以使用Flexbox中其他属性，比如<code>justify-content</code>属性来分配剩余空间。当然也可以给Flex项目设置<code>margin</code>值为处理Flex容器剩余空间。不过这一部分没有在这里阐述，如果感兴趣的话，不仿阅读一下Flexbox相关的介绍。</p>
<h2 id="articleHeader15">总结</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000017115824" src="https://static.segmentfault.com/v-5bf7c7fd/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p>很久以为，一直以为Flexbox布局中，Flex项目都会根据Flex容器自动计算。而事实上呢？正如文章中介绍的一样，Flex项目的计算是相当的复杂。设置Flex项目大小的值以及<code>flex-basis</code>、<code>flex-grow</code>和<code>flex-shrink</code>的设置都会对其有较大的影响，而且它们的组合场景也是非常的多，并且不同的场景会造成不一样的结果。</p>
<p>当然，文章中所介绍的内容或许没有覆盖到所有的场景，但这些基本的演示或许能帮助大家更好的理解Flex项目是如何计算的。最后希望该文对大家有所帮助，如果你有更深的了解欢迎在下面的评论中与我一起分享。如果文章中有不对之处，还望各路大婶拍正。<br></p>
<hr>
<br>本文作者：大漠_w3cplus<p><a href="http://click.aliyun.com/m/1000026002/" rel="nofollow noreferrer" target="_blank">阅读原文</a></p>
<p>本文为云栖社区原创内容，未经允许不得转载。</p>