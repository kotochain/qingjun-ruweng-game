/* =========================================================
   请君入瓮 · 剧情数据
   场景节点格式：
   {
     bg: 背景key, pov:'heroine'|'qingye', chapter:{sub,title}（可选，触发章节卡）
     lines:[ {who, name, text, sprite:{slot:key|null}, cls} ... ]
     choices:[ {text, hint, set:{aff:+n}, goto, toast} ]
     puzzle: {...}   // 推理节点
     goto: 下一节点（无 choices 时）
   }
   who: 'qingye'|'heroine'|'narr'|'sys'|其他名
   ========================================================= */

const STORY = {

  /* ============ 序：现代闪回 ============ */
  "intro_modern": {
    bg:"office",
    pov:"heroine",
    chapter:{sub:"楔子", title:"蛋糕与代码", pov:"杜盈华 · 二〇二四年冬"},
    lines:[
      {who:"narr", text:"凌晨两点，写字楼只剩我这一层还亮着灯。第十七版方案，甲方说「再改一版，要有那个味儿」。"},
      {who:"narr", text:"我叫杜盈华。河南小镇出来的，靠命换来的 985，再靠命换来这间能看见 CBD 夜景的格子间。"},
      {who:"narr", text:"手机震了。是姨妈：「盈华，天冷了，回家姨给你煮萝卜汤。」"},
      {who:"heroine", name:"杜盈华", text:"……等这个项目结了，就回。", cls:"emr"},
      {who:"narr", text:"我太累了。胃里泛起小时候那块劣质蛋糕的腻味——他们逼我吃下去的、属于弟弟的甜。"},
      {who:"narr", text:"眼前的代码开始扭曲、发烫，像有人把整片屏幕揉成了一团火光。"},
      {who:"narr", text:"我栽倒在工位上。最后一个念头是：思瑶的新书，我还没看……"}
    ],
    goto:"awaken"
  },

  /* ============ 第一幕 · 穿书觉醒 ============ */
  "awaken": {
    bg:"palace_night",
    pov:"heroine",
    chapter:{sub:"第一幕", title:"瓮中初醒", pov:"皇甫赤华 · 大周 天命十二年"},
    lines:[
      {who:"narr", text:"檀香。鎏金。环佩叮当。"},
      {who:"narr", text:"我睁眼，看见的是雕着九尾凤凰的藻井——这绝不是我那间漏风的出租屋。"},
      {who:"heroine", name:"？", text:"（这身衣服……一层叠一层的丝绸，头上沉得像顶了座小山。）", cls:"emr"},
      {who:"sys", name:"【系统】", text:"叮——「穿书救赎系统」已绑定。宿主杜盈华，欢迎来到《凤鸣大周》。", cls:"emc"},
      {who:"heroine", name:"？", text:"（系统？穿书？……思瑶上个月推给我的那本宫斗文？）"},
      {who:"sys", name:"【系统】", text:"您现已成为大周嫡公主——皇甫赤华。骄纵、貌美、道德感低下，全书第一搅局者。", cls:"emc"},
      {who:"sys", name:"【系统】", text:"原著中，她在三月后的宫宴上身败名裂、惨死冷宫。完成剧情、攒够积分，即可返回现实。", cls:"emc"},
      {who:"heroine", name:"皇甫赤华", text:"（返回现实……姨妈的萝卜汤。好，这局我玩。）", cls:"emr"}
    ],
    goto:"mirror"
  },

  "mirror": {
    bg:"chihua_room",
    pov:"heroine",
    lines:[
      {who:"narr", text:"铜镜里，一张陌生又艳丽的脸。眉眼锋利，是那种一看就「不好惹」的美。"},
      {who:"heroine", name:"皇甫赤华", text:"皇甫赤华……行吧，比杜盈华这名字气派多了。", cls:"emr"},
      {who:"narr", text:"门外忽然喧哗。一个小宫女连滚带爬冲进来，发髻都散了。"},
      {who:"awu", name:"阿芜", text:"公主！不好了！雍门家的人……雍门家家主，亲自上门了！"},
      {who:"heroine", name:"皇甫赤华", text:"（雍门清夜。）", cls:"emr"},
      {who:"narr", text:"这个名字，原著里出现过。三大世家之一雍门家的家主，云隐山庄庄主，表面医者仁心——"},
      {who:"narr", text:"——实则全书最深的一口井。而原著的皇甫赤华，三日后将与他「赐婚」。"},
      {who:"heroine", name:"皇甫赤华", text:"（伪装夫妻，貌合神离，互相算计。我记得这条线。）", cls:"emr"}
    ],
    goto:"meet_qingye"
  },

  "meet_qingye": {
    bg:"palace_hall",
    pov:"heroine",
    lines:[
      {who:"narr", text:"正殿。一袭青衣的男子负手立于窗前，听见脚步也不回头。"},
      {who:"narr", text:"他身上有股很淡的药香，冷的，像雪水浸过的薄荷。"},
      {who:"qingye", name:"雍门清夜", text:"公主来迟了。", sprite:{center:"qingye_normal"}},
      {who:"qingye", name:"雍门清夜", text:"——也是，金枝玉叶，何曾把雍门一介草民放在眼里。", cls:"emc"},
      {who:"narr", text:"他转过身。一双眼睛太静了，静得让人脊背发凉。那不是医者的眼，是猎人的眼。"},
      {who:"heroine", name:"皇甫赤华", text:"（原著里，赤华此刻该拍桌子、摔茶盏，骄纵公主的标准动作。）", cls:"emr"},
      {who:"heroine", name:"皇甫赤华", text:"（但我是杜盈华。和这种人，第一面定调子，最重要。）", cls:"emr"}
    ],
    goto:"choice_first"
  },

  /* ============ 第一个抉择 ============ */
  "choice_first": {
    bg:"palace_hall",
    pov:"heroine",
    isChoice:true,
    prompt:"面对雍门清夜的试探，你——",
    sprite:{center:"qingye_normal"},
    choices:[
      {
        text:"「庄主远道而来，本宫亲自备了茶。」——以礼制人，藏锋",
        hint:"沉稳。让他看不透你。",
        set:{aff:2},
        toast:"心意 +2 · 清夜眼底掠过一丝意外",
        goto:"after_choice_calm"
      },
      {
        text:"「雍门清夜，你我都清楚这桩婚事是谁的局。」——开门见山，亮牌",
        hint:"冒险。直接掀桌，赌他识货。",
        set:{aff:3},
        toast:"心意 +3 · 他第一次正眼看你",
        goto:"after_choice_blunt"
      },
      {
        text:"摔了手边的茶盏，冷笑：「草民也配同本宫说话？」——演骄纵公主",
        hint:"安全。完美复刻原著人设。",
        set:{aff:-1},
        toast:"心意 -1 · 一切如他所料",
        goto:"after_choice_act"
      }
    ]
  },

  "after_choice_calm": {
    bg:"palace_hall",
    pov:"heroine",
    lines:[
      {who:"heroine", name:"皇甫赤华", text:"庄主远道而来，本宫亲自备了茶。坐。", cls:"emr", sprite:{center:"qingye_normal"}},
      {who:"narr", text:"清夜的指尖在袖中微不可察地一顿。他大概设想过公主的一百种反应，唯独没料到「客气」。"},
      {who:"qingye", name:"雍门清夜", text:"……公主今日，与传闻中不大一样。", cls:"emc", sprite:{center:"qingye_soft"}},
      {who:"heroine", name:"皇甫赤华", text:"传闻是给外人听的。庄主想必也不是靠传闻活到今天。", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"（这双眼睛……不是皇甫赤华的眼睛。）"}
    ],
    goto:"qingye_pov_1"
  },

  "after_choice_blunt": {
    bg:"palace_hall",
    pov:"heroine",
    lines:[
      {who:"heroine", name:"皇甫赤华", text:"雍门清夜，你我都清楚——这桩婚事，是别人摆给咱们的局。", cls:"emr", sprite:{center:"qingye_normal"}},
      {who:"narr", text:"满室寂静。连药香都仿佛凝住了。"},
      {who:"qingye", name:"雍门清夜", text:"……呵。", sprite:{center:"qingye_soft"}},
      {who:"qingye", name:"雍门清夜", text:"金枝玉叶，居然也看得见「局」。公主，你比我想的有意思。", cls:"emc"},
      {who:"heroine", name:"皇甫赤华", text:"（赌对了。和聪明人打交道，藏着掖着才是下策。）", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"（她在赌我识货。而她，赢了。）"}
    ],
    goto:"qingye_pov_1"
  },

  "after_choice_act": {
    bg:"palace_hall",
    pov:"heroine",
    lines:[
      {who:"narr", text:"我抄起茶盏摔在地上。碎瓷溅开，宫女们齐刷刷跪了一地。"},
      {who:"heroine", name:"皇甫赤华", text:"草民也配同本宫说话？", cls:"emr", sprite:{center:"qingye_normal"}},
      {who:"qingye", name:"雍门清夜", text:"公主息怒。", cls:"emc", sprite:{center:"qingye_cold"}},
      {who:"narr", text:"他垂下眼，唇角那点弧度却是冷的。一切都和他预想的分毫不差——这才是最危险的。"},
      {who:"qingye", name:"雍门清夜", text:"（蠢得恰到好处。这局棋，公主是颗好用的子。）"},
      {who:"heroine", name:"皇甫赤华", text:"（不对……我好像，正一步步踩进他画的圈里。）", cls:"emr"}
    ],
    goto:"qingye_pov_1"
  },

  /* ============ 视角切换：清夜 ============ */
  "qingye_pov_1": {
    bg:"palace_hall",
    pov:"qingye",
    chapter:{sub:"间章", title:"井中观天", pov:"雍门清夜 · 视角"},
    lines:[
      {who:"narr", text:"（清夜视角）"},
      {who:"qingye", name:"雍门清夜", text:"皇甫赤华。原本只是我棋盘上一枚最好用的弃子。", cls:"emc"},
      {who:"qingye", name:"雍门清夜", text:"她父皇毒杀我满门那年，我十二岁，藏在井里，听着头顶的火烧了三天三夜。", cls:"emc"},
      {who:"qingye", name:"雍门清夜", text:"我用十年熬出一口「瓮」，要请这位皇帝，连同他的儿女，悉数入局。"},
      {who:"narr", text:"可今日这位公主……眼神变了。那里头有种他读不懂的东西——不像算计，倒像是「疲惫」。"},
      {who:"qingye", name:"雍门清夜", text:"（无妨。变数也是数。我会把她，算进这口瓮里。）", cls:"emc"}
    ],
    goto:"banquet_intro"
  },

  /* ============ 夜宴 · 推理铺垫 ============ */
  "banquet_intro": {
    bg:"banquet",
    pov:"heroine",
    chapter:{sub:"第一幕", title:"宫宴藏锋", pov:"皇甫赤华 · 视角"},
    lines:[
      {who:"narr", text:"三日后，中秋宫宴。丝竹靡靡，觥筹交错。父皇高坐主位，双目蒙着一条玄色绸带——书里说，皇帝去岁忽然失明。"},
      {who:"heroine", name:"皇甫赤华", text:"（原著的第一个大事件，就在今夜的宫宴。六皇子皇甫景澄，会在席间「遇刺」。）", cls:"emr"},
      {who:"narr", text:"清夜坐在我身侧，替我斟酒，姿态亲密得像一对真夫妻。他低声开口——"},
      {who:"qingye", name:"雍门清夜", text:"公主，今夜的酒，不要沾唇。", cls:"emc", sprite:{center:"qingye_soft"}},
      {who:"heroine", name:"皇甫赤华", text:"（他在提醒我？还是……在引我注意什么？）", cls:"emr"},
      {who:"narr", text:"我借着举杯的姿态，环视整座大殿。有什么地方……不对劲。"},
      {who:"narr", text:"杜盈华做了十年甲方的乙方，最擅长的就是从一堆「正常」里，挑出那一处刻意的破绽。"}
    ],
    goto:"puzzle_banquet"
  },

  /* ============ 推理节点 ============ */
  "puzzle_banquet": {
    puzzle:{
      title:"局中之眼",
      desc:"夜宴看似祥和，却处处透着算计。从下列细节中，挑出三处「被人刻意安排」的破绽——它们将拼出今夜真正的杀局。",
      need:3,
      clues:[
        {id:"incense", img:true, name:"主位香炉", text:"父皇案前的安神香，烟是直的——无风的殿内，唯独这一炷香的烟纹丝不乱。", correct:true,
         reveal:"那不是安神香。烟太稳，是掺了麻沸的迷烟，专为让主位之人「看不清、听不清」。"},
        {id:"guard", img:true, name:"换防的侍卫", text:"景澄皇子席后的侍卫，比别处少了两人，且面孔生得很。", correct:true,
         reveal:"侍卫被人提前调换。刺杀景澄的杀手，此刻就披着甲胄，站在他身后。"},
        {id:"music", img:true, name:"乐伎的曲子", text:"乐班反复奏着同一支《破阵》，鼓点一次比一次急。", correct:true,
         reveal:"鼓点是信号。鼓声最急的那一刻，就是动手的瞬间——用来盖住惨叫。"},
        {id:"wine", img:true, name:"温热的酒", text:"中秋夜寒，你面前的酒却是温的，斟得极满。", correct:false,
         reveal:"酒是清夜替你温的、替你满的。这是他的回护，不是杀局的一环。"},
        {id:"moon", img:true, name:"窗外的圆月", text:"今夜月色极好，清辉满殿。", correct:false,
         reveal:"月亮只是月亮。有时候，风景就只是风景。"},
        {id:"sister", img:true, name:"司瑶的目光", text:"皇甫司瑶频频望向主位，神色复杂。", correct:false,
         reveal:"她的心思是另一条线上的暗涌，与今夜这场刺杀，暂时无关。"}
      ],
      onWin:"puzzle_win",
      onFail:"puzzle_retry"
    }
  },

  "puzzle_retry": {
    bg:"banquet",
    pov:"heroine",
    lines:[
      {who:"heroine", name:"皇甫赤华", text:"（不对，我把寻常风景也算了进去。再看一遍——真正的破绽，一定带着「人为」的痕迹。）", cls:"emr"}
    ],
    goto:"puzzle_banquet"
  },

  "puzzle_win": {
    bg:"banquet",
    pov:"heroine",
    lines:[
      {who:"narr", text:"香、侍卫、鼓点。三条线在脑中骤然拧成一股——"},
      {who:"heroine", name:"皇甫赤华", text:"（迷烟让父皇成了瞎子里的聋子，换防的杀手藏在景澄背后，只等鼓声最急的那一刻动手！）", cls:"emr"},
      {who:"narr", text:"就在鼓点攀至最急的刹那，我猛地起身，将整壶温酒泼向景澄席后那名「侍卫」——"},
      {who:"heroine", name:"皇甫赤华", text:"刺客！护驾——！", cls:"emr"},
      {who:"narr", text:"满殿哗然。藏在甲胄下的短刃当啷落地，杀局在动手前的一息被生生掀翻。"},
      {who:"qingye", name:"雍门清夜", text:"（她……竟看穿了整张网。）", sprite:{center:"qingye_shock"}},
      {who:"qingye", name:"雍门清夜", text:"（这步棋，本不在我推演之内。皇甫赤华，你到底是谁？）", cls:"emc"}
    ],
    goto:"act1_end"
  },

  "act1_end": {
    bg:"palace_night",
    pov:"heroine",
    lines:[
      {who:"narr", text:"宴散。我扶着廊柱，后背全是冷汗。清夜不知何时立在我身后，递来一方温热的帕子。"},
      {who:"qingye", name:"雍门清夜", text:"今夜之后，你我就是一条船上的人了。", cls:"emc", sprite:{center:"qingye_soft"}},
      {who:"qingye", name:"雍门清夜", text:"公主，这口「瓮」很深。希望到最后……你还笑得出来。"},
      {who:"heroine", name:"皇甫赤华", text:"（他眼里有杀意，也有别的东西。而我，好像也不想这么快就回去了。）", cls:"emr"},
      {who:"narr", text:"檐角的铜铃在夜风里轻响。这局棋，才刚刚落下第一子。"},
      {who:"sys", name:"【系统】", text:"第一幕 完成。与雍门清夜的羁绊，已悄然生根。", cls:"emc"}
    ],
    goto:"act2_intro"
  },

  /* ============ 第二幕 · 假面夫妻 ============ */
  "act2_intro": {
    bg:"palace_hall",
    pov:"heroine",
    chapter:{sub:"第二幕", title:"假面夫妻", pov:"皇甫赤华 · 视角"},
    lines:[
      {who:"narr", text:"三日后，赐婚的圣旨到了。金黄绫帛铺了满桌，宣旨太监尖细的嗓音在殿内回荡——"},
      {who:"narr", text:"「……册嫡公主赤华，下嫁雍门氏清夜。择吉日，行婚仪。钦此。」"},
      {who:"heroine", name:"皇甫赤华", text:"（我，杜盈华，河南小镇做题家，就要在这个异世界嫁人了。对象还是灭门复仇者、全书最深的井。）", cls:"emr"},
      {who:"narr", text:"我下意识看向人群里那道青影。清夜垂着眼接旨，唇角那点笑淡得像一层霜。"},
      {who:"heroine", name:"皇甫赤华", text:"（他在盘算什么？他知道我识破了那场刺杀，他一定……开始怀疑我了。）", cls:"emr"}
    ],
    goto:"wedding_night"
  },

  "wedding_night": {
    bg:"chihua_room",
    pov:"heroine",
    lines:[
      {who:"narr", text:"婚仪繁缛。红盖头被挑开的那一刻，我看见满室龙凤喜烛——和站在烛影里的清夜。"},
      {who:"narr", text:"他一身喜服，红衣衬得眉目愈发清冷。不像新郎，倒像来索命的。"},
      {who:"qingye", name:"雍门清夜", text:"外头人都散了。公主，可以摘面具了。", cls:"emc", sprite:{right:"qingye_cold", left:"chihua"}},
      {who:"heroine", name:"皇甫赤华", text:"（来了。）", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"宫宴那夜，你一眼看穿三条线。皇甫赤华骄纵了十九年，从不会看人的脸色，更不会闻出香里的麻沸散。"},
      {who:"qingye", name:"雍门清夜", text:"——你是谁。"}
    ],
    goto:"choice_identity"
  },

  "choice_identity": {
    bg:"chihua_room",
    pov:"heroine",
    isChoice:true,
    prompt:"花烛夜，他一字一句问「你是谁」——",
    sprite:{right:"qingye_cold", left:"chihua"},
    choices:[
      {
        text:"「我是皇甫赤华。庄主是不是多喝了几杯？」——继续演",
        hint:"嘴硬到底。赌他没有实锤。",
        set:{aff:1},
        toast:"心意 +1 · 他没有再追问，但眸色更深了",
        goto:"after_identity_deny"
      },
      {
        text:"「庄主觉得我是谁？」——不答反问，把球踢回去",
        hint:"高手过招。承认也不承认。",
        set:{aff:3},
        toast:"心意 +3 · 他笑了，那是猎人才有的笑",
        goto:"after_identity_evade"
      },
      {
        text:"「我不是她。我……不知道自己怎么来的。」——半坦白",
        hint:"赌他会对一个「谜」产生兴趣。",
        set:{aff:4},
        toast:"心意 +4 · 烛火跳了一下，他第一次在你面前失神",
        goto:"after_identity_truth"
      }
    ]
  },

  "after_identity_deny": {
    bg:"chihua_room",
    pov:"heroine",
    lines:[
      {who:"heroine", name:"皇甫赤华", text:"庄主喜酒喝多了？我不是皇甫赤华，还能是谁？", sprite:{right:"qingye_cold", left:"chihua"}},
      {who:"narr", text:"他盯着我看了很久。那目光像一把精细的手术刀，一寸一寸剖过来。"},
      {who:"qingye", name:"雍门清夜", text:"……是么。", sprite:{right:"qingye_normal"}} ,
      {who:"qingye", name:"雍门清夜", text:"但愿公主一直记得自己是谁。夜了，安歇吧。", cls:"emc"},
      {who:"narr", text:"他转身走了，喜服下摆扫过满地花生桂圆，像扫过一堆无关紧要的棋子。"},
      {who:"heroine", name:"皇甫赤华", text:"（他信了？还是……他打算慢慢看我演下去？）", cls:"emr"}
    ],
    goto:"qingye_pov_2"
  },

  "after_identity_evade": {
    bg:"chihua_room",
    pov:"heroine",
    lines:[
      {who:"heroine", name:"皇甫赤华", text:"庄主觉得——我应该是谁？", sprite:{right:"qingye_cold", left:"chihua"}},
      {who:"narr", text:"沉默。红烛噼啪爆了个灯花。"},
      {who:"qingye", name:"雍门清夜", text:"……呵。", sprite:{right:"qingye_soft"}},
      {who:"qingye", name:"雍门清夜", text:"有意思。你是第一个，敢用我的口气回我的问题。", cls:"emc"},
      {who:"qingye", name:"雍门清夜", text:"也罢。秘密这种东西，自己挖出来的才值钱。"},
      {who:"heroine", name:"皇甫赤华", text:"（他放了我一马。不，他不是在放我——他是在等我露出更多马脚。）", cls:"emr"}
    ],
    goto:"qingye_pov_2"
  },

  "after_identity_truth": {
    bg:"chihua_room",
    pov:"heroine",
    lines:[
      {who:"narr", text:"我沉默了很久。杜盈华活了二十五年，最大的本事是审时度势——在这个男人面前，撒谎是性价比最低的选项。"},
      {who:"heroine", name:"？", text:"……我不是她。我叫杜盈华。我不知道自己是怎么来的，也不知道怎么回去。", cls:"emr", sprite:{right:"qingye_shock", left:"chihua"}},
      {who:"narr", text:"他的眼神第一次出现了裂痕。不是算计，不是试探——是一种很淡的、几乎看不见的愕然。"},
      {who:"qingye", name:"雍门清夜", text:"杜……盈华。"},
      {who:"heroine", name:"杜盈华", text:"（我把真名说出来了。疯了吗？在一个灭门复仇者面前说真话？）", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"好。", sprite:{right:"qingye_soft"}},
      {who:"qingye", name:"雍门清夜", text:"今夜你说的话，出了这间房，我一个字也没听见。", cls:"emc"},
      {who:"narr", text:"他没有再问。但他离去时，没有像看一颗棋子一样看我——那眼神，像是在看一个……人。"}
    ],
    goto:"qingye_pov_2"
  },

  /* ============ 视角切换：清夜 ============ */
  "qingye_pov_2": {
    bg:"palace_night",
    pov:"qingye",
    chapter:{sub:"间章", title:"灯下观棋", pov:"雍门清夜 · 视角"},
    lines:[
      {who:"narr", text:"（清夜视角）"},
      {who:"qingye", name:"雍门清夜", text:"杜盈华。", cls:"emc", sprite:{center:"qingye_normal"}},
      {who:"narr", text:"他在月下站了很久，反复咀嚼这个名字。他派去查的人回报：公主十九年来的饮食起居、字笔迹、焚香习惯——没有任何破绽。"},
      {who:"qingye", name:"雍门清夜", text:"可她的眼睛不会骗人。那不是一个金枝玉叶该有的眼睛。那是……在泥里滚过、在夜里哭过、还咬着牙爬起来的人才有的眼睛。"},
      {who:"qingye", name:"雍门清夜", text:"她若说的是真话——那这盘棋，就比我想的有意思得多。", cls:"emc"},
      {who:"qingye", name:"雍门清夜", text:"（父皇，你杀我满门那天，一定想不到——你赐给我用来做棋子的公主，会是一颗……你也算不到的子。）", sprite:{center:"qingye_cold"}},
      {who:"narr", text:"他抬眼，望向新房的方向。烛火还亮着。"}
    ],
    goto:"cohabit_days"
  },

  /* ============ 同居日常 · 拉扯 ============ */
  "cohabit_days": {
    bg:"chihua_room",
    pov:"heroine",
    lines:[
      {who:"narr", text:"婚后的日子，像两只刺猬住在一个笼子里。"},
      {who:"narr", text:"他在别院西边的药庐熬药，我在东边的小书房看书。吃饭时一桌之隔，话不多，但每一句都像在下棋。"},
      {who:"narr", text:"他会替我剥螃蟹（据阿芜说，以前的公主吃螃蟹要八个宫女伺候）。我会在他熬药时递上一杯温茶（他没问过我怎么知道他熬夜时胃会疼——我也没说过我观察了他整整十天）。", sprite:{center:"qingye_soft"}},
      {who:"awu", name:"阿芜", text:"公主，外头都说您和庄主是天造地设的一对璧人呢！"},
      {who:"heroine", name:"皇甫赤华", text:"（璧人。两个互相揣着刀的人，装得倒挺像。）", cls:"emr"},
      {who:"narr", text:"这日午后，宫里来人了——是皇帝身边的老太监，捧着一个密匣。"}
    ],
    goto:"letter_from_palace"
  },

  "letter_from_palace": {
    bg:"palace_hall",
    pov:"heroine",
    lines:[
      {who:"narr", text:"密匣里是父皇的手谕。盲眼皇帝的字歪歪扭扭，却字字带刀——"},
      {who:"narr", text:"「闻雍门氏近日常与六皇子景澄私会。赤华，吾命你……就近监察，若有反迹，可先斩后奏。」"},
      {who:"heroine", name:"皇甫赤华", text:"（让我监视自己的丈夫？……不对，父皇这是在试探谁？是清夜？还是我？）", cls:"emr", sprite:{center:"qingye_normal"}},
      {who:"narr", text:"我抬头，才发现清夜不知何时已站在廊下，把那张手谕看得一清二楚。"},
      {who:"qingye", name:"雍门清夜", text:"陛下给公主派了好差事。", cls:"emc", sprite:{center:"qingye_cold"}},
      {who:"heroine", name:"皇甫赤华", text:"（他在等我的选择。是忠于父皇告发他，还是……站到他这边？）", cls:"emr"}
    ],
    goto:"choice_loyalty"
  },

  "choice_loyalty": {
    bg:"palace_hall",
    pov:"heroine",
    isChoice:true,
    prompt:"皇帝命你监视清夜，他正看着你——",
    sprite:{right:"qingye_cold", left:"chihua"},
    choices:[
      {
        text:"当着他的面烧了手谕：「夫妻一体，我不看这些。」",
        hint:"彻底站队。破釜沉舟。",
        set:{aff:5},
        toast:"心意 +5 · 他的瞳孔微微一缩",
        goto:"after_loyalty_burn"
      },
      {
        text:"将手谕收好：「我会自己看。庄主也该自己小心。」",
        hint:"中立。保持距离，但暗示他防范。",
        set:{aff:2},
        toast:"心意 +2 · 他看了你一眼，没说话",
        goto:"after_loyalty_warn"
      },
      {
        text:"假意接旨：「臣妾遵旨。」——向宫里演一场戏",
        hint:"稳妥。先稳住皇帝，再和清夜商量。",
        set:{aff:3},
        toast:"心意 +3 · 当晚他主动来了你的书房",
        goto:"after_loyalty_act"
      }
    ]
  },

  "after_loyalty_burn": {
    bg:"palace_hall",
    pov:"heroine",
    lines:[
      {who:"narr", text:"我拿起案上的烛台，将那明黄绫帛凑了上去。火舌舔上来，三个字三个字地吞噬着父皇的旨意。"},
      {who:"heroine", name:"皇甫赤华", text:"夫妻一体。父皇这道旨意，我没接。", sprite:{right:"qingye_shock", left:"chihua"}},
      {who:"qingye", name:"雍门清夜", text:"……你知道烧了这东西，是什么罪名。", cls:"emc", sprite:{right:"qingye_soft"}},
      {who:"heroine", name:"皇甫赤华", text:"知道。抗旨。大不敬。但我杜盈华——我是说，我皇甫赤华，这辈子最不擅长的事，就是给人当刀。"},
      {who:"narr", text:"灰烬落在青砖上。他看了我很久，忽然伸出手，替我拂去了颊边一点烟灰。"},
      {who:"qingye", name:"雍门清夜", text:"好。那从今日起，我的事，你也有份了。", cls:"emc"}
    ],
    goto:"night_visit"
  },

  "after_loyalty_warn": {
    bg:"palace_hall",
    pov:"heroine",
    lines:[
      {who:"heroine", name:"皇甫赤华", text:"手谕我收了。但庄主——近来和六皇子走得太近了，当心。", sprite:{right:"qingye_cold", left:"chihua"}},
      {who:"qingye", name:"雍门清夜", text:"公主是在关心我，还是在提醒我？", cls:"emc"},
      {who:"heroine", name:"皇甫赤华", text:"两者都是。毕竟你我现在是一条船上的人——翻了船，我也活不成。"},
      {who:"narr", text:"他静了片刻，点了点头。"},
      {who:"qingye", name:"雍门清夜", text:"好。我记下了。", sprite:{right:"qingye_soft"}}
    ],
    goto:"night_visit"
  },

  "after_loyalty_act": {
    bg:"palace_hall",
    pov:"heroine",
    lines:[
      {who:"heroine", name:"皇甫赤华", text:"臣妾遵旨。", sprite:{right:"qingye_normal", left:"chihua"}},
      {who:"narr", text:"我朝传旨太监的方向盈盈一拜，把手谕妥帖收进袖中。人一走，我转头看向清夜——"},
      {who:"heroine", name:"皇甫赤华", text:"演给宫里看的。今晚来我书房，我有话问你。"},
      {who:"narr", text:"他挑眉，嘴角浮起一点真正的笑意。"},
      {who:"qingye", name:"雍门清夜", text:"……好。", cls:"emc", sprite:{right:"qingye_soft"}}
    ],
    goto:"night_visit"
  },

  /* ============ 夜探 · 第一次并肩 ============ */
  "night_visit": {
    bg:"palace_night",
    pov:"heroine",
    chapter:{sub:"第二幕", title:"夜雨同行", pov:"皇甫赤华 · 视角"},
    lines:[
      {who:"narr", text:"是夜，大雨。"},
      {who:"narr", text:"我被窗外一阵极轻的响动惊醒。睁眼时，一道黑影正从院墙翻入——不是清夜，清夜的身手我认得。"},
      {who:"heroine", name:"皇甫赤华", text:"（杀手？……不对，父皇的人？还是景澄的人？）", cls:"emr"},
      {who:"narr", text:"门被无声推开。是清夜。他一身夜行衣，发梢滴着雨，手里攥着一柄薄如柳叶的短刀。"},
      {who:"qingye", name:"雍门清夜", text:"别出声。来的是我旧部，不是冲你。但今夜别院不太平——", cls:"emc", sprite:{center:"qingye_cold"}},
      {who:"qingye", name:"雍门清夜", text:"你信我一次，跟我走。"}
    ],
    goto:"choice_follow"
  },

  "choice_follow": {
    bg:"palace_night",
    pov:"heroine",
    isChoice:true,
    prompt:"夜雨里，他向你伸出手——",
    sprite:{center:"qingye_cold"},
    choices:[
      {
        text:"毫不犹豫握住他的手",
        hint:"不说话，跟上。",
        set:{aff:4},
        toast:"心意 +4 · 他的手是暖的",
        goto:"rooftop_scene"
      },
      {
        text:"「你先说清楚，出什么事了？」",
        hint:"谨慎。先要答案。",
        set:{aff:2},
        toast:"心意 +2 · 他简短说了句「事后解释」",
        goto:"rooftop_scene"
      }
    ]
  },

  "rooftop_scene": {
    bg:"palace_night",
    pov:"heroine",
    lines:[
      {who:"narr", text:"他带我上了屋顶。雨很大，蓑衣下他的肩膀很稳。我看见别院四周的暗哨像被割麦子一样放倒——但下刀的人留了活口。"},
      {who:"heroine", name:"皇甫赤华", text:"是父皇的人？", sprite:{center:"qingye_normal"}},
      {who:"qingye", name:"雍门清夜", text:"是二哥的人。皇甫景珩——当朝太子。", cls:"emc", sprite:{center:"qingye_cold"}},
      {who:"heroine", name:"皇甫赤华", text:"（太子。第一幕里那个从未露面的储君。他比父皇还急——急着在登基前清掉所有能威胁他位子的人。）", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"他以为我今晚和景澄密会，想一锅端了。"},
      {who:"heroine", name:"皇甫赤华", text:"……你和景澄，真的在密会？"},
      {who:"qingye", name:"雍门清夜", text:"是。", sprite:{center:"qingye_soft"}},
      {who:"qingye", name:"雍门清夜", text:"景澄知道他父皇眼睛是怎么瞎的。他想和我做一笔交易——他给我那个人的项上人头，我帮他……坐上那个位子。", cls:"emc"},
      {who:"narr", text:"雨声如鼓。我看着他侧脸的轮廓，第一次清清楚楚地意识到——这个男人身上背着的，不是我在书里看到的「反派」两个字，是满门的血、十年的冷、和一口咬了十年的牙。"},
      {who:"heroine", name:"皇甫赤华", text:"那你打算……一直把我关在安全的地方吗？", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"……你不该卷进来。"},
      {who:"heroine", name:"皇甫赤华", text:"我已经卷进来了。从宫宴那夜我喊出『护驾』那一刻起，我就没有退路了。"},
      {who:"narr", text:"他转头看我。雨顺着他下颌滴下来。"},
      {who:"qingye", name:"雍门清夜", text:"……杜盈华。", cls:"emc", sprite:{center:"qingye_soft"}},
      {who:"qingye", name:"雍门清夜", text:"（不管你到底是谁——这一世，别再死了。）"}
    ],
    goto:"act2_end"
  },

  "act2_end": {
    bg:"palace_night",
    pov:"heroine",
    lines:[
      {who:"narr", text:"雨停的时候，天边泛了一点鱼肚白。暗哨的尸体已经被清理干净，像这场夜袭从没发生过。"},
      {who:"narr", text:"他送我回房。在门口，他忽然开口——"},
      {who:"qingye", name:"雍门清夜", text:"下月初三，上元灯节。宫里会有一场烟花宴。", cls:"emc", sprite:{center:"qingye_soft"}},
      {who:"qingye", name:"雍门清夜", text:"景珩会在那夜动手。景澄会在那夜反戈。我也会在那夜——向那个人，讨一笔旧账。"},
      {who:"heroine", name:"皇甫赤华", text:"（烟花宴。「烟花为聘」——原著里赤华惨死的那一夜，终于要来了。）", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"你怕么？"},
      {who:"heroine", name:"皇甫赤华", text:"怕。但我更怕——亲眼看着这局棋输。", cls:"emr"},
      {who:"narr", text:"他笑了一下。很淡，但是真的。"},
      {who:"qingye", name:"雍门清夜", text:"那便等那日。这一次——我请你看一场烟花。", cls:"emc"},
      {who:"narr", text:"晨光亮起来的时候，我靠在门栏上，看着他青色的背影消失在廊尽头。"},
      {who:"sys", name:"【系统】", text:"第二幕 完成。第三幕「烟花为聘」——生死、抉择、与一场以烟花为聘的告白。", cls:"emc"}
    ],
    goto:"__end__"
  }

};

/* 背景与立绘资源映射（生成后的图片放在 assets/ 下） */
const ASSETS = {
  bg:{
    office:"assets/bg_office.jpg",
    palace_night:"assets/bg_palace_night.jpg",
    chihua_room:"assets/bg_room.jpg",
    palace_hall:"assets/bg_hall.jpg",
    banquet:"assets/bg_banquet.jpg"
  },
  sprite:{
    qingye_normal:"assets/qingye_normal_cut.png",
    qingye_soft:"assets/qingye_soft_cut.png",
    qingye_cold:"assets/qingye_cold_cut.png",
    qingye_shock:"assets/qingye_shock_cut.png",
    chihua:"assets/chihua_cut.png"
  }
};
