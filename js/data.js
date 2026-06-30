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
        {id:"incense", icon:"🕯", name:"主位香炉", text:"父皇案前的安神香，烟是直的——无风的殿内，唯独这一炷香的烟纹丝不乱。", correct:true,
         reveal:"那不是安神香。烟太稳，是掺了麻沸的迷烟，专为让主位之人「看不清、听不清」。"},
        {id:"guard", icon:"🗡", name:"换防的侍卫", text:"景澄皇子席后的侍卫，比别处少了两人，且面孔生得很。", correct:true,
         reveal:"侍卫被人提前调换。刺杀景澄的杀手，此刻就披着甲胄，站在他身后。"},
        {id:"music", icon:"🎶", name:"乐伎的曲子", text:"乐班反复奏着同一支《破阵》，鼓点一次比一次急。", correct:true,
         reveal:"鼓点是信号。鼓声最急的那一刻，就是动手的瞬间——用来盖住惨叫。"},
        {id:"wine", icon:"🍶", name:"温热的酒", text:"中秋夜寒，你面前的酒却是温的，斟得极满。", correct:false,
         reveal:"酒是清夜替你温的、替你满的。这是他的回护，不是杀局的一环。"},
        {id:"moon", icon:"🌕", name:"窗外的圆月", text:"今夜月色极好，清辉满殿。", correct:false,
         reveal:"月亮只是月亮。有时候，风景就只是风景。"},
        {id:"sister", icon:"🪭", name:"司瑶的目光", text:"皇甫司瑶频频望向主位，神色复杂。", correct:false,
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
      {who:"sys", name:"【系统】", text:"第一幕 完成。与雍门清夜的羁绊，已悄然生根。", cls:"emc"},
      {who:"narr", text:"——「赤华篇 · 第一幕」试玩到此。后续：身份反转 · 史密斯夫妇对峙 · 烟花为聘。", cls:"em"}
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
