let str = `天意人心 - (无线电视剧《燃烧岁月》主题曲),Love mail,aLIEz - (TV动画《ALDNOAH.ZERO》ED2 / TVアニメ「アルドノア・ゼロ」ED2),残忍,其实我不快乐,星星月亮太阳,心路,偷生,Burn,Stupid,二十四城记,白夜（Cover 尹姝贻）,海觅天,玩玩具,石头雨,滚滚红尘,破相Remix - remix,友情岁月,加减乘除,情书（Cover 原曲 / What are words）,3AM,娱乐 - (Entertainment),想你的旧名字,不来也不去,Last Chance,玻璃之情,Closer To Me,色盲,In Between The Lines,Belle (Du film « Belle et Sébastien ») ,Love The Way You Lie - Part III (Original Demo),横滨别恋,Slippin,自由行,EXEC COSMOFLIPS,有时寂寞,我不是伟人 (粤) - (《独家记忆》粤语版),珍重,Perfect (Acoustic),Angelina,东京铁塔下,邮差,Old Time Rock & Roll,'Til Death,沙龙,前所未见,洁身自爱,让一切随风,钟无艳,Let It Go,深夜港湾,不爱我,未亡人,深深深,自动弃权 (放手版),Valder Fields,验伤,A Little Story,最愛,爱得起 (Solo),漩涡,给自己的情书,完,Run Away,圆,越难越爱 - (Love Is Not Easy / TVB剧集《使徒行者》片尾曲),Nocturne,阁楼,春夏秋冬,相爱很难(电影"男人四十"歌曲),七年滋養,蜚蜚,一人有一个梦想,最爱,Sealed With A Kiss(以吻封缄),雨丝情愁,你未讲过,夜机,雨中的恋人们,言不由衷,The Clouds in Camarillo,于心有愧,On écrit sur les murs,二十世纪少年(Unplugged) - unplug,烟花易冷,房间,厌弃,眉间雪,情人知己,I’ll be Waiting for You,对不起不是你,你有心,还是觉得你最好,执迷不悔 (粤语版) - (新加坡电视剧《情网》插曲),真的爱你,我们都被忘了 - (电视剧 《我爱你爱你爱我》片尾曲),必杀技,明知做戏,一千零一个,如何掉眼泪,答应不爱你 - (电视剧《仙剑奇侠传三》插曲),PLANET,说散就散,ありがとう...,Headlight,Ebb and Flow (5 years after remix) ,Give a Little Bit,world.execute (me) ;,L'oiseau / Sébastien et Esther,Shutterbug,Sunrise,Forgettable,202 (New Mix),Teenage Life,Don't Push Me,螢塚,Nevada,Hall of Fame,稀客,Creep,爱与痛的边缘,Duet,We Don't Talk Anymore,隣人,Au palais royal / les prostituées,Drive,Let The Sun Shine In,Sofía,终电,Paralyse,Numb,Good Morning and Good Night,Refrain,第三人称 (Live),钢琴哭 - (Piano Cry / TVB微电影《爱情来的时候 韩国》主题曲),Dirty Paws,谁愿放手,Dear Prudence,We Sink,Too Far,Melody Lane,東京,那一天还未到 - (电影《哪一天我们会飞》宣传曲),秋桜,Stay Alive,最冷一天,心要野,好きだよ。~100回の後悔~ (English Ver.),深海少女,Eyes On Me,如风,梦中人 - (Dream Person),清风徐来 - (电影《港囧》主题曲),Walk Away - Album Version,Your Bones,I Am You,The Riddle,梦伴,China-X,桜道,Crying in the Rain,Think Again,Secret,All alone in the world,最高の片想い,Letter,Senbonzakura [SS-Extended+Bass],Go Time,Star Sky,Secret of my heart - (TV动画《名侦探柯南》ED9 / TVアニメ「名探偵コナン」ED9),风的季节,More Than I Can Say,Rhythm Of The Rain,Re...Japanesque,我的梦 - (华为消费者业务品牌歌曲),Tonight, I Feel Close To You,Enchanters,Restless Feet - (多动的脚掌),Take me hand,Sound of Silence,越来越不懂,被驯服的象,Auld Lang Syne,再见悲哀,We Don't Talk Anymore（Cover Charlie Puth&Selena Gomez）,失忆蝴蝶,Blah Blah Blah,Gonna Get There Someday,红色高跟鞋,Luv Letter,美しきもの - (美丽之物),いつも何度でも - (「千と千尋の神隠し」 主題歌),Flower Dance,南下,莫失莫忘,春夏秋冬,空谷の音(くうこくのね),The Show,May Rain,走歌人,Es Ist Ein Schnee Gefallen,天空之城(吟唱版),Return To Innocence (Radio Edit),春风十里,Lemon Tree,处处吻,Always With Me,我从崖边跌落,月亮船 - (《快乐星球》片尾曲),Roses and Gold,怀念,ありがとう,Summertrain,相思 - (电视剧《西游记后传》片尾曲),The Sound Of Silence,我执 - (记《悟空传》),Yesterday Once More,Ghost,Yours,Only Time,Scarborough Fair,再见…警察…再见,Mariage d'amour - (梦中的婚礼),无赖,生命树,追梦人 - (台视《雪山飞狐》片尾曲),剑雨浮生 - (电影《剑雨》主题曲 ),穿花蝴蝶,滚滚红尘 (Live) - (电影《滚滚红尘》主题曲),My Days,Fuck You,The sally gardens,Amarantine,岁月神偷,天后,礼物,浮夸,浮夸,约定,喜帖街,年度之歌,苦瓜,夕阳无限好,花樽与花,一丝不挂,无人之境`;
let arr = str.split(',')

function sleep(ms) {
  return new Promise(function(resolve, reject){
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

async function gotS(song) {

  console.log(song)

  document.querySelector('input[placeholder="搜索关键字"]').value = song

  document.querySelector('input[placeholder="搜索关键字"]').parentNode.children[1].click()

  await sleep(1000) //静默一秒

  let item = document.querySelectorAll('.songlist__list .songlist__item')[0]

  item.querySelector("a[title='添加到歌单']").click()

  await sleep(1500) //静默一秒

  document.querySelector("a[title='尝试手动录入歌单']").click()

  await sleep(1500) //静默一秒  

  return
}

async function songsMap(arr) {
  while(arr.length) {
    let song = arr.shift()
    await gotS(song)
  }
}

songsMap(arr)