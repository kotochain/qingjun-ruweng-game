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
    goto:"act3_intro"
  },

  /* ============ 第三幕 · 烟花为聘 ============ */
  "act3_intro": {
    bg:"chihua_room",
    pov:"heroine",
    chapter:{sub:"第三幕", title:"烟花为聘", pov:"皇甫赤华 · 视角"},
    lines:[
      {who:"narr", text:"上元节。满城灯火。"},
      {who:"narr", text:"我坐在铜镜前，阿芜替我插上最后一支赤金凤头钗。镜面里那张艳得逼人的脸，已经和二十五天前醒来时完全不同——那是杜盈华的眼神，和皇甫赤华的骨。"},
      {who:"awu", name:"阿芜", text:"公主……今夜宫里不太平，您带上这个。", sprite:{left:"chihua"}},
      {who:"narr", text:"她塞过来一柄掌心大小的匕首，银鞘上刻着凤纹——是我生母留下的东西。"},
      {who:"heroine", name:"皇甫赤华", text:"（阿芜是我的贴身宫女，也是这宫里唯一没被任何人收买的人。）", cls:"emr"},
      {who:"narr", text:"清夜在门外等我。一身玄色常服，没有佩剑，像个真的来陪妻子看灯的驸马。"},
      {who:"qingye", name:"雍门清夜", text:"怕么？", cls:"emc", sprite:{right:"qingye_soft", left:"chihua"}},
      {who:"heroine", name:"皇甫赤华", text:"你问第三遍了。", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"那我再问一遍——怕么？"},
      {who:"heroine", name:"皇甫赤华", text:"……不怕。有你在。", cls:"emr"},
      {who:"narr", text:"他笑了。那笑里有什么东西，比今夜满城灯火还亮。"},
      {who:"qingye", name:"雍门清夜", text:"好。那今夜——跟紧我。", cls:"emc"}
    ],
    goto:"fireworks_entry"
  },

  "fireworks_entry": {
    bg:"banquet",
    pov:"heroine",
    lines:[
      {who:"narr", text:"烟花宴设在太液池畔。丝竹声里，宫灯如昼。父皇高坐主位，玄色绸带依旧蒙着眼；太子景珩坐于左侧，六皇子景澄坐于右侧。"},
      {who:"narr", text:"我和清夜入席时，太子举起酒盏，朝我遥遥一笑——那笑里淬着毒。"},
      {who:"heroine", name:"皇甫赤华", text:"（景珩知道我识破了宫宴的刺杀。他一定知道。今夜这局，他会把我也算进去。）", cls:"emr"},
      {who:"narr", text:"清夜在案下握住了我的手。他的手心很稳，一点汗都没有。"},
      {who:"qingye", name:"雍门清夜", text:"记住——烟花第三响时，低头。", cls:"emc", sprite:{center:"qingye_cold"}},
      {who:"heroine", name:"皇甫赤华", text:"（他没说为什么。我也没问。十年布局，他不会在这一刻出错。）", cls:"emr"},
      {who:"narr", text:"酒过三巡。司礼太监高声唱喏——"},
      {who:"narr", text:"「放——烟——花——」"}
    ],
    goto:"fireworks_burst"
  },

  "fireworks_burst": {
    bg:"banquet",
    pov:"heroine",
    lines:[
      {who:"narr", text:"第一响。金菊在夜空炸开，照亮了满池碎金。"},
      {who:"narr", text:"第二响。紫玉兰。我看见太子身后的侍卫悄悄把手按上了刀柄。"},
      {who:"heroine", name:"皇甫赤华", text:"（清夜说的是第三响。为什么是第三响？）", cls:"emr"},
      {who:"narr", text:"我扫过整座宴席——父皇、太子、景澄、清夜、乐班、宫娥、侍卫……"},
      {who:"narr", text:"有什么不对。今夜的局，比宫宴那夜复杂得多。有三方人马，三把刀，指向的却不是同一个人。"}
    ],
    goto:"puzzle_fireworks"
  },

  /* ============ 推理节点：烟花夜的三方杀局 ============ */
  "puzzle_fireworks": {
    puzzle:{
      title:"三方杀局",
      desc:"烟花第三响前，你必须看穿今夜的局——三方势力各怀鬼胎。选出两条真正致命的线索，它们会告诉你：谁要杀谁？",
      need:2,
      clues:[
        {id:"taizi_guard", img:true, name:"太子的侍卫", text:"太子身后的侍卫中，有三人腰带上系着只有东宫私兵才戴的赤绳结——他们不是宫中禁军。", correct:true,
         reveal:"太子要在烟花第三响动手——他的目标不是景澄，是父皇。弑父篡位，嫁祸雍门。"},
        {id:"jingcheng_cup", img:true, name:"景澄的酒樽", text:"景澄面前的酒樽比旁人矮半寸——他提前饮过药，今夜不是来宴饮的，是来逼宫的。", correct:false,
         reveal:"景澄确实带了人马，但他的目标是太子，不是父皇——他要等太子先动手，再以「救驾」之名除储君。这是清夜和他交易的真正筹码。"},
        {id:"emperor_silk", img:true, name:"父皇的绸带", text:"父皇蒙眼的玄色绸带，不知何时换了——边角绣着只有雍门嫡系才用的暗纹。", correct:true,
         reveal:"绸带是清夜换的。那上面浸的不是迷药，是解药——解先帝失明之毒。清夜要让那个人，亲眼看着他来索命。"},
        {id:"music_drum", img:true, name:"鼓点", text:"乐班的鼓点不急不缓，没有宫宴那夜作为信号的急促节拍。", correct:false,
         reveal:"今夜的信号不是鼓点——是烟花。三响之后，三方同时动作，大乱之中谁是猎手谁是猎物，全看谁先一步看透局。"},
        {id:"qingye_sword", img:true, name:"清夜无剑", text:"清夜今夜没有佩剑——一个灭门复仇者，在决战之夜不带武器？", correct:false,
         reveal:"他的刀不在身上。他的刀——是整座宴席的布局。从换绸带，到借景澄的兵，到太子的赤绳私兵，全都是他的刀。"}
      ],
      onWin:"puzzle_fw_win",
      onFail:"puzzle_fw_retry"
    }
  },

  "puzzle_fw_retry": {
    bg:"banquet",
    pov:"heroine",
    lines:[
      {who:"heroine", name:"皇甫赤华", text:"（不对，我漏了什么。再看——每一处异常里，只有两个是真正的刀。）", cls:"emr"}
    ],
    goto:"puzzle_fireworks"
  },

  "puzzle_fw_win": {
    bg:"banquet",
    pov:"heroine",
    lines:[
      {who:"narr", text:"太子的赤绳私兵——父皇绸带上的雍门暗纹——两条线绞在一起，我猛地懂了。"},
      {who:"heroine", name:"皇甫赤华", text:"（太子要杀父皇，清夜要让父皇醒来看他索命，景澄要等太子动手后救驾夺位——三方、三条命、一把火。）", cls:"emr"},
      {who:"heroine", name:"皇甫赤华", text:"（第三响。第三响之后，烟花炸开，太液池畔会变成血池。）", cls:"emr"},
      {who:"narr", text:"我转头看向清夜。他没看我，他在看主位那个蒙眼的老人——他的眼里没有恨，没有喜，只有一种十二年压在井底终于看见天的静。"},
      {who:"narr", text:"第三响——"},
      {who:"narr", text:"「砰！」"},
      {who:"narr", text:"漫天烟花炸开的同一瞬，太子的人拔刀了。"}
    ],
    goto:"choice_final"
  },

  /* ============ 最终抉择 ============ */
  "choice_final": {
    bg:"banquet",
    pov:"heroine",
    isChoice:true,
    prompt:"血光溅起的刹那——你怎么做？",
    sprite:{center:"qingye_cold"},
    choices:[
      {
        text:"冲上去挡在清夜身前——我来做他的盾",
        hint:"赌命。他护了你一路，你也要护他一次。",
        set:{aff:6},
        toast:"心意 +6 · 你扑向他的背影",
        goto:"after_final_shield"
      },
      {
        text:"高呼「护驾」，按清夜的安排低下头——信他",
        hint:"信任。他布了十年的局，不该被你打乱。",
        set:{aff:4},
        toast:"心意 +4 · 你低头，让他的棋走完",
        goto:"after_final_trust"
      },
      {
        text:"拔出阿芜给的匕首，自己冲向父皇——我要亲手改写结局",
        hint:"破局。不做任何人的棋子，包括他的。",
        set:{aff:3},
        toast:"心意 +3 · 你提刃而出，乱了三盘棋",
        goto:"after_final_break"
      }
    ]
  },

  "after_final_shield": {
    bg:"palace_night",
    pov:"heroine",
    lines:[
      {who:"narr", text:"我不知道太子的刀是指向谁的——我只看见一名赤绳侍卫越过人群，刀锋朝着清夜的后心直刺过来。"},
      {who:"heroine", name:"皇甫赤华", text:"清夜——！！！", cls:"emr"},
      {who:"narr", text:"我扑过去。银凤匕首从袖中滑出，我甚至来不及拔——身体先于脑子动了。"},
      {who:"narr", text:"刀锋入肉的声音，闷得像烟花落进水里。不是我的血——是清夜在我扑过去的刹那，转身，用自己的肩接了那一刀。"},
      {who:"qingye", name:"雍门清夜", text:"……蠢。", cls:"emc", sprite:{center:"qingye_cold"}},
      {who:"heroine", name:"皇甫赤华", text:"你才蠢！我替你挡——", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"我活了二十八年，等的就是今天。你以为我会让我的妻，死在我的复仇前面？", cls:"emc", sprite:{center:"qingye_soft"}},
      {who:"narr", text:"他肩上火红一片，手却稳得可怕。他从袖中抽出一柄我从未见过的薄刃——那不是兵器，是十二年前雍门灭门那夜，从他父亲胸口拔出来的、属于御前侍卫的刀。"}
    ],
    goto:"qingye_pov_final"
  },

  "after_final_trust": {
    bg:"palace_night",
    pov:"heroine",
    lines:[
      {who:"heroine", name:"皇甫赤华", text:"护——驾——！！！", cls:"emr"},
      {who:"narr", text:"我按他说的低下头，在一片混乱里蜷进案下。赤绳侍卫从我头顶掠过，刀锋的寒气擦碎了我鬓边那支赤金凤钗。"},
      {who:"narr", text:"三息之间，景澄的人动了。他们不是来救驾的——他们是来包围太子的。太子的赤绳兵还没冲到主位，就被景澄的人从背后包了饺子。"},
      {who:"narr", text:"而清夜——他在乱局里像一道青色的影子，掠过倒下的侍卫，径直走向主位。"},
      {who:"heroine", name:"皇甫赤华", text:"（他的局走完了。他要去见那个人了。）", cls:"emr"},
      {who:"narr", text:"我从案下爬起来，顾不上鬓发散乱，朝主位跑去。"}
    ],
    goto:"qingye_pov_final"
  },

  "after_final_break": {
    bg:"palace_night",
    pov:"heroine",
    lines:[
      {who:"narr", text:"没有人等。我拔出银凤匕首，逆着奔逃的人群，冲向主位。"},
      {who:"heroine", name:"皇甫赤华", text:"（太子的人要杀他，景澄要等太子杀他，清夜要亲手杀他——三个人都要他死。那这个人如果死了，三盘棋全赢，唯一输的人是谁？是被卷进来的所有人。）", cls:"emr"},
      {who:"narr", text:"我不是要救父皇。我是要救——所有被这盘棋碾进去的人。包括清夜。"},
      {who:"narr", text:"我冲到主位前，把银凤匕首横在那蒙眼老人的脖颈前——"},
      {who:"heroine", name:"皇甫赤华", text:"都——停——手——！！！", cls:"emr", sprite:{left:"chihua"}},
      {who:"narr", text:"满场死寂。太子的刀停在半空。景澄的弓箭手僵在弦上。清夜立在三步之外，手里的薄刃映着烟花。"},
      {who:"qingye", name:"雍门清夜", text:"……盈华。让开。", cls:"emc", sprite:{right:"qingye_cold", left:"chihua"}},
      {who:"heroine", name:"皇甫赤华", text:"不让。你布了十年的局，今天我替你改一步。", cls:"emr"}
    ],
    goto:"qingye_pov_final"
  },

  /* ============ 清夜视角：血月 ============ */
  "qingye_pov_final": {
    bg:"palace_night",
    pov:"qingye",
    chapter:{sub:"间章", title:"井中月", pov:"雍门清夜 · 视角"},
    lines:[
      {who:"narr", text:"（清夜视角）"},
      {who:"narr", text:"刀锋、血、烟花。他等这一天等了十二年，从十二岁那个井底的夜晚等到现在。"},
      {who:"qingye", name:"雍门清夜", text:"（父皇，你当年杀我全家三十七口，连我那三岁的妹妹都没放过。她的小手里还攥着半块桂花糕。）", cls:"emc", sprite:{center:"qingye_cold"}},
      {who:"qingye", name:"雍门清夜", text:"（我算过一千种今夜的结局。太子死、景澄死、那个人死，我死——无论哪一种，这盘棋都该在今夜收了。）"},
      {who:"narr", text:"可他算漏了一个变量。"},
      {who:"narr", text:"是那个在他身后扑过来的身影，是那个低着头蜷在案下还死死抓着他衣角的手，是那个横刀护在仇人面前喊「让开」的女人。"},
      {who:"qingye", name:"雍门清夜", text:"（杜盈华……你到底是来破我的局，还是来救我的命？）", cls:"emc", sprite:{center:"qingye_soft"}},
      {who:"qingye", name:"雍门清夜", text:"（我从十二岁起，就没打算活着走出这盘棋。可你来了之后……我开始想，也许……也许活着也不错。）"}
    ],
    goto:"reveal_truth"
  },

  /* ============ 真相大白 ============ */
  "reveal_truth": {
    bg:"palace_night",
    pov:"heroine",
    lines:[
      {who:"narr", text:"烟花还在天上一朵一朵地开。我站在主位前，匕首横在那蒙眼老人颈边，手在抖。"},
      {who:"heroine", name:"皇甫赤华", text:"父皇——不，陛下。绸带已经被我扯下来了。您的眼睛，是时候睁开了。", cls:"emr", sprite:{left:"chihua"}},
      {who:"narr", text:"玄色绸带飘落。皇帝缓缓睁眼——那双眼睛里没有失明的浑浊，只有清明的、恐惧的光。"},
      {who:"heroine", name:"皇甫赤华", text:"（清夜的解药起效了。他能看见了。）", cls:"emr"},
      {who:"narr", text:"老人看见了满场血光、持刀的太子、张弓的景澄、立在烟花下的青衣男子——"},
      {who:"narr", text:"——他认出了清夜手里的那柄薄刃。"},
      {who:"emperor", name:"皇帝", text:"……雍门……雍门彻的儿子……", cls:"emc"},
      {who:"qingye", name:"雍门清夜", text:"陛下记性真好。十二年了，您终于肯叫一声我父亲的名字。", cls:"emc", sprite:{right:"qingye_cold", left:"chihua"}},
      {who:"narr", text:"清夜一步步走过来。他肩上的血还在滴，每一步都在金砖上留一个血印。"},
      {who:"qingye", name:"雍门清夜", text:"天命七年秋，您还是东宫太子，为了夺嫡，假传北境急报，将我父亲——您的结义兄长——骗回京中，满门抄斩。", cls:"emc"},
      {who:"qingye", name:"雍门清夜", text:"您毒杀了我父亲、母亲、祖母、幼妹、三十七口人。放火烧了雍门府，对外说通敌叛国。", cls:"emc"},
      {who:"qingye", name:"雍门清夜", text:"——而我母亲临死前，把真相写在血书上，托人送进了宫。收血书的人，是我当时的太子妃，后来的皇后……也就是赤华的生母。", cls:"emc", sprite:{right:"qingye_soft", left:"chihua"}},
      {who:"heroine", name:"皇甫赤华", text:"（……我母亲知道真相？）", cls:"emr"},
      {who:"narr", text:"皇帝浑身发抖，一句话都说不出来。"},
      {who:"qingye", name:"雍门清夜", text:"赤华的母亲知道真相，所以她在赤华三岁那年「病逝」了。陛下，是您亲手毒杀了自己的皇后——因为她知道得太多了。", cls:"emc", sprite:{right:"qingye_cold", left:"chihua"}},
      {who:"heroine", name:"皇甫赤华", text:"（……他告诉了我我的身世。他在告诉我——皇甫赤华也是这场仇里的人。）", cls:"emr"},
      {who:"narr", text:"全场死寂。烟花最后一响，散作满天星雨。"}
    ],
    goto:"choice_after_truth"
  },

  "choice_after_truth": {
    bg:"palace_night",
    pov:"heroine",
    isChoice:true,
    prompt:"真相摊在所有人面前。最后一步——",
    sprite:{right:"qingye_cold", left:"chihua"},
    choices:[
      {
        text:"把匕首递给清夜：「这一刀，你来。但之后——跟我走。」",
        hint:"HE 线。给他复仇，也给他归处。",
        set:{aff:5},
        toast:"心意 +5 · 你把刀交给他",
        goto:"ending_he"
      },
      {
        text:"把匕首扔在地上：「杀他是罪。雍门的血，不能用你的手来还。」",
        hint:"NE/BE 线。拦他。赌他会不会停手。",
        set:{aff:2},
        toast:"心意 +2 · 你弃了刀",
        goto:"ending_ne"
      },
      {
        text:"转向景澄和太子：「你们两个，都跪下。今日不是复仇局——是清算局。」",
        hint:"破局线。把私仇翻成朝局，代价最大。",
        set:{aff:3},
        toast:"心意 +3 · 你要做执棋者",
        goto:"ending_te"
      }
    ]
  },

  /* ============ 结局 ============ */
  "ending_he": {
    bg:"qingye_garden",
    pov:"heroine",
    chapter:{sub:"终章", title:"烟花为聘", pov:"杜盈华 · 尾声"},
    lines:[
      {who:"narr", text:"他接过那柄银凤匕首，看了很久。"},
      {who:"narr", text:"最后，他没有把刀刺向皇帝——他把刀转过来，用刀背，砸在了皇帝瘫痪的右腿上。"},
      {who:"qingye", name:"雍门清夜", text:"一刀还你，太便宜了。", cls:"emc", sprite:{center:"qingye_soft"}},
      {who:"qingye", name:"雍门清夜", text:"我要你活着。活着看你的儿子们自相残杀，活着看你的江山落到别人手里，活着想起我雍门三十七口——夜夜做噩梦。", cls:"emc"},
      {who:"narr", text:"景澄在那夜登基。太子景珩以谋逆罪赐死。太上皇被软禁于永安宫，余生不见天日。"},
      {who:"narr", text:"清夜在朝堂上辞了所有官职，带着我离开了长安。"},
      {who:"narr", text:"我没有回现代。系统在那夜之后再没响过——也许它觉得，杜盈华已经找到了属于自己的结局。"},
      {who:"narr", text:"江南小镇。药庐。院子里种着一棵桂花树。"},
      {who:"awu", name:"阿芜", text:"先生！夫人！吃饭了——今日先生熬的莲藕排骨汤，可鲜了！"},
      {who:"narr", text:"他从药炉边走过来，身上还带着药香，替我拂去肩上落的桂花。"},
      {who:"qingye", name:"雍门清夜", text:"杜盈华。", cls:"emc", sprite:{center:"qingye_soft"}},
      {who:"heroine", name:"杜盈华", text:"嗯？", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"那夜烟花第三响，我本打算杀完人就自杀的。", cls:"emc"},
      {who:"heroine", name:"杜盈华", text:"……我知道。", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"是你扑过来的那一刻，我改了主意。", cls:"emc"},
      {who:"narr", text:"他从怀里掏出一支旧旧的银凤钗——那是上元夜被刀锋劈碎的那支，他花了三个月，亲手一点一点补好的。"},
      {who:"qingye", name:"雍门清夜", text:"我用一场烟花，聘你一辈子。你愿意吗？", cls:"emc", sprite:{center:"qingye_soft"}},
      {who:"heroine", name:"杜盈华", text:"……傻子。我早就愿意了。", cls:"emr"},
      {who:"narr", text:"桂花落下来的时候，他吻了我。远处镇上有人放烟花，一朵一朵的，像那场改变了所有人命运的夜宴。"},
      {who:"sys", name:"【系统】", text:"——恭喜宿主。达成真结局：烟花为聘。", cls:"emc"},
      {who:"sys", name:"【系统】", text:"这一次，没有人死在局里。", cls:"emc"}
    ],
    goto:"__end__"
  },

  "ending_ne": {
    bg:"palace_night",
    pov:"heroine",
    chapter:{sub:"终章", title:"同局中人", pov:"皇甫赤华 · 尾声"},
    lines:[
      {who:"narr", text:"匕首落在金砖上，发出清脆的响。"},
      {who:"heroine", name:"皇甫赤华", text:"清夜。杀他是罪。你父亲在天有灵，不会想要你手上沾了血之后，再陪他一起死。", cls:"emr", sprite:{right:"qingye_cold", left:"chihua"}},
      {who:"narr", text:"他举着薄刃的手，停在半空。很久。久到烟花全部落尽，久到太子的人被景澄的兵按在地上。"},
      {who:"qingye", name:"雍门清夜", text:"……十二年。我等了十二年。", cls:"emc", sprite:{right:"qingye_soft", left:"chihua"}},
      {who:"heroine", name:"皇甫赤华", text:"我陪你等下一个十二年。用他活着的每一天，慢慢还。", cls:"emr"},
      {who:"narr", text:"他终于把刀放下了。当啷一声，像十二年的石头落地。"},
      {who:"narr", text:"那夜之后，太上皇退位，景澄登基，清夜以驸马之身入朝为相。"},
      {who:"narr", text:"他没有辞官，我也没有回现代。我们像无数对貌合神离的朝堂夫妻一样，住在公主府，吃饭、议事、偶尔吵架。"},
      {who:"narr", text:"只是每天睡前他都会来我的院子，坐一会儿。什么也不说，就坐坐。"},
      {who:"narr", text:"某个下雨的夜晚，他坐在廊下，忽然开口——"},
      {who:"qingye", name:"雍门清夜", text:"杜盈华。", cls:"emc", sprite:{center:"qingye_soft"}},
      {who:"heroine", name:"杜盈华", text:"嗯？", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"这盘棋，我下到一半不想下了。你呢？", cls:"emc"},
      {who:"heroine", name:"杜盈华", text:"我本来就不是来下棋的。我是来……找人回家的。", cls:"emr"},
      {who:"narr", text:"他伸手过来，握住了我的手。雨下了一整夜。"},
      {who:"sys", name:"【系统】", text:"达成结局：同局中人。", cls:"emc"},
      {who:"sys", name:"【系统】", text:"他没有杀父，也没有自杀。棋局还在，但你们不再是各自为战。", cls:"emc"}
    ],
    goto:"__end__"
  },

  "ending_te": {
    bg:"palace_hall",
    pov:"heroine",
    chapter:{sub:"终章", title:"执棋者", pov:"皇甫赤华 · 尾声"},
    lines:[
      {who:"narr", text:"我提刀转身，目光扫过太子和景澄。"},
      {who:"heroine", name:"皇甫赤华", text:"皇甫景珩谋逆，证据确凿。皇甫景澄私调兵马，亦非无罪。", cls:"emr", sprite:{left:"chihua"}},
      {who:"heroine", name:"皇甫赤华", text:"你们两个——都给我跪下。"},
      {who:"narr", text:"全场鸦雀无声。我是嫡长公主，是这宫里位份最高的皇室成员——在父皇无法亲政、太子有罪、景澄带刀闯宫的此刻，我是唯一有资格收拾这局的人。"},
      {who:"narr", text:"景澄跪了。太子被按着跪下了。清夜站在原地，看着我，眼里第一次出现了一种我读不懂的神情。"},
      {who:"heroine", name:"皇甫赤华", text:"（我破了他的局。他生气么？……也许吧。但这是我能想到的、唯一不让任何人死的办法。）", cls:"emr"},
      {who:"narr", text:"那夜之后，太子被废，景澄被圈禁。我以长公主身份临朝称制三年，直到太上皇驾崩、扶持幼帝登基。"},
      {who:"narr", text:"清夜辞了官，离开长安。他走的那天，我在城楼上站了一整天。他没回头。"},
      {who:"narr", text:"又过了三年。"},
      {who:"awu", name:"阿芜", text:"长公主！宫门外……宫门外有个青衣的大夫，说要给您献一味能治「思乡病」的药。"},
      {who:"narr", text:"我扔下奏疏，赤着脚跑到宫门。"},
      {who:"narr", text:"他站在那里，风尘仆仆，肩上还是当年那道疤。手里提着一筐桂花糕。"},
      {who:"qingye", name:"雍门清夜", text:"长公主殿下。", cls:"emc", sprite:{center:"qingye_soft"}},
      {who:"heroine", name:"皇甫赤华", text:"……你还知道回来？", cls:"emr"},
      {who:"qingye", name:"雍门清夜", text:"账算完了。我父亲的冤屈已雪，你母亲的名分已复。现在……", cls:"emc"},
      {who:"qingye", name:"雍门清夜", text:"现在来收我的聘礼。你当年破我那局的账——我要你用一辈子来还。", cls:"emc"},
      {who:"narr", text:"我笑了。笑着笑着眼泪就掉下来了。"},
      {who:"sys", name:"【系统】", text:"达成结局：执棋者。", cls:"emc"},
      {who:"sys", name:"【系统】", text:"你没有选「被保护」，也没有选「被复仇」。你选了自己走这条路。他花了六年，才追上你。", cls:"emc"}
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
    banquet:"assets/bg_banquet.jpg",
    qingye_garden:"assets/bg_qingye_garden.jpg"
  },
  sprite:{
    qingye_normal:"assets/qingye_normal_cut.png",
    qingye_soft:"assets/qingye_soft_cut.png",
    qingye_cold:"assets/qingye_cold_cut.png",
    qingye_shock:"assets/qingye_shock_cut.png",
    chihua:"assets/chihua_cut.png"
  }
};
