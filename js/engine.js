/* =========================================================
   请君入瓮 · 引擎
   ========================================================= */
(function(){
  "use strict";

  const $ = id => document.getElementById(id);
  const SAVE_KEY = "qjrw_save_v2";
  const SLOT_COUNT = 6;
  const CHAPTER_TITLES = {
    "intro_modern": "序章 · 加班猝死",
    "awaken": "序章 · 穿越",
    "meet_qingye": "第一幕 · 初遇",
    "banquet_intro": "第一幕 · 宫宴风云",
    "puzzle_banquet": "第一幕 · 查案",
    "act1_end": "第一幕 · 终",
    "act2_intro": "第二幕 · 赐婚",
    "wedding_night": "第二幕 · 花烛夜",
    "cohabit_days": "第二幕 · 假面夫妻",
    "letter_from_palace": "第二幕 · 父皇密令",
    "night_visit": "第二幕 · 夜雨同行",
    "rooftop_scene": "第二幕 · 屋顶剖白",
    "act2_end": "第二幕 · 终"
  };
  function chapterOf(nodeId){
    return CHAPTER_TITLES[nodeId] || (nodeId && nodeId.startsWith("qingye_pov") ? "视角 · 雍门清夜" : "剧情进行中");
  }
  function getSaves(){
    const raw=loadJSON(SAVE_KEY,null);
    if(!raw||!Array.isArray(raw.slots)){
      return {slots:new Array(SLOT_COUNT).fill(null),lastSlot:-1};
    }
    // 兼容旧单槽存档
    if(raw.node && !raw.slots){
      return {slots:[{node:raw.node,lineIdx:raw.lineIdx||0,aff:raw.aff||0,pov:raw.pov||"heroine",history:raw.history||[],ts:raw.ts||Date.now(),new:true},...new Array(SLOT_COUNT-1).fill(null)],lastSlot:0};
    }
    return raw;
  }
  function setSaves(data){ saveJSON(SAVE_KEY,data); }
  let saveMode="save"; // save | load
  const READ_KEY = "qjrw_read_lines_v1";
  const CHOICE_KEY = "qjrw_read_choices_v1";
  const SETTINGS_KEY = "qjrw_settings_v1";

  const escapeHTML = str => String(str ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));

  const loadJSON = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  };
  const saveJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const settings = Object.assign({
    textSpeed: 30,
    autoDelay: 1100
  }, loadJSON(SETTINGS_KEY, {}));

  const state = {
    node:null,
    lineIdx:0,
    aff:0,
    pov:"heroine",
    speed:settings.textSpeed,
    typing:false,
    fullText:"",
    armedChoice:null,
    history:[],
    autoMode:false,
    skipMode:false,
    readLineKeys:new Set(loadJSON(READ_KEY, [])),
    readChoiceKeys:new Set(loadJSON(CHOICE_KEY, [])),
    currentLineKey:null,
    chapterDone:null,
    chapterTimers:[]
  };

  const dlgBox=$("dialogue-box"), dlgText=$("dialogue-text"),
        spkTag=$("speaker-tag"), spkName=$("speaker-name"),
        contHint=$("continue-hint"),
        choiceLayer=$("choice-layer"),
        puzzleLayer=$("puzzle-layer"),
        bgA=$("bg-a"), bgB=$("bg-b"),
        slots={left:$("slot-left"),center:$("slot-center"),right:$("slot-right")},
        chapterCard=$("chapter-card"),
        affVal=$("aff-qingye-val"),
        hudPov=$("hud-pov"),
        toast=$("toast"),
        backlogScreen=$("backlog-screen"),
        settingsScreen=$("settings-screen"),
        backlogList=$("backlog-list");
  let bgActive={el:bgA,other:bgB};

  const IS_TOUCH = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  function showToast(msg){
    toast.textContent=msg;toast.classList.remove("hidden");
    requestAnimationFrame(()=>toast.classList.add("show"));
    clearTimeout(showToast._t);
    showToast._t=setTimeout(()=>{
      toast.classList.remove("show");
      setTimeout(()=>toast.classList.add("hidden"),400);
    },1900);
  }

  function persistRead(){
    saveJSON(READ_KEY, [...state.readLineKeys]);
    saveJSON(CHOICE_KEY, [...state.readChoiceKeys]);
  }

  function persistSettings(){
    settings.textSpeed=state.speed;
    settings.autoDelay=Number($("setting-auto-speed").value || settings.autoDelay);
    saveJSON(SETTINGS_KEY, settings);
  }

  function setBg(key){
    const url=ASSETS.bg[key];
    if(!url) return;
    const next=bgActive.other;
    next.style.backgroundImage=`url("${url}")`;
    next.classList.add("show");
    bgActive.el.classList.remove("show");
    bgActive={el:next,other:bgActive.el};
  }

  function clearSprites(){
    Object.values(slots).forEach(s=>{
      s.classList.remove("show","active","dim");
      s.style.backgroundImage="";
    });
  }

  function setSprite(spec){
    if(!spec) return;
    for(const slotKey in spec){
      const key=spec[slotKey], slot=slots[slotKey];
      if(!slot) continue;
      if(key===null){slot.classList.remove("show","active","dim");continue;}
      const url=ASSETS.sprite[key];
      if(url){slot.style.backgroundImage=`url("${url}")`;slot.classList.add("show");}
    }
  }

  function focusSprites(who){
    const visible=Object.values(slots).filter(s=>s.classList.contains("show"));
    visible.forEach(s=>s.classList.remove("active","dim"));
    if(!visible.length) return;
    if(who==="qingye"){
      visible.forEach(s=>s.classList.add("active"));
    }else if(who==="heroine"){
      visible.forEach(s=>s.classList.add("dim"));
    }
  }

  function setPov(pov){
    state.pov=pov;
    if(pov==="qingye"){
      hudPov.textContent="雍门清夜 · 视角";hudPov.classList.add("qingye");
    }else{
      hudPov.textContent="皇甫赤华 · 视角";hudPov.classList.remove("qingye");
    }
  }

  function setAff(delta){
    state.aff+=delta;
    affVal.textContent=state.aff;
    affVal.classList.remove("bump");void affVal.offsetWidth;affVal.classList.add("bump");
  }

  function appendHistory(line, key){
    if(!line || !line.text) return;
    const last=state.history[state.history.length-1];
    if(last && last.key===key) return;
    state.history.push({
      key,
      who:line.who || "narr",
      name:line.name || (line.who==="narr" ? "旁白" : ""),
      text:line.text,
      cls:line.cls || ""
    });
    if(state.history.length>260) state.history.shift();
  }

  function renderBacklog(){
    if(!state.history.length){
      backlogList.innerHTML='<div class="backlog-empty">暂无可回看的文字</div>';
      return;
    }
    backlogList.innerHTML=state.history.map(item=>{
      const speaker = item.name || (item.who==="sys" ? "系统" : "旁白");
      return `<div class="backlog-item">
        <div class="backlog-speaker ${escapeHTML(item.who)}">${escapeHTML(speaker)}</div>
        <div class="backlog-text">${escapeHTML(item.text)}</div>
      </div>`;
    }).join("");
    backlogList.scrollTop=backlogList.scrollHeight;
  }

  function openBacklog(){
    stopAutoSkip();
    renderBacklog();
    backlogScreen.classList.remove("hidden");
  }
  function closeBacklog(){backlogScreen.classList.add("hidden");}

  function openSettings(){
    stopAutoSkip();
    $("setting-text-speed").value=80-state.speed;
    $("setting-auto-speed").value=settings.autoDelay;
    settingsScreen.classList.remove("hidden");
  }
  function closeSettings(){settingsScreen.classList.add("hidden");}

  function applySpeaker(line){
    spkTag.classList.remove("qingye","heroine");
    if(line.who==="narr"||line.who==="sys"){
      spkTag.classList.add("hidden");
      dlgText.classList.toggle("narration", line.who==="narr");
      focusSprites(line.who);
      return;
    }
    dlgText.classList.remove("narration");
    spkTag.classList.remove("hidden");
    spkName.textContent=line.name||"";
    if(line.who==="qingye")spkTag.classList.add("qingye");
    else if(line.who==="heroine")spkTag.classList.add("heroine");
    focusSprites(line.who);
  }

  function lineHTML(line, text){
    const safe=escapeHTML(text);
    return line.cls ? `<span class="${escapeHTML(line.cls)}">${safe}</span>` : safe;
  }

  function typeLine(line, key, opts={}){
    clearTimeout(state._t);
    clearTimeout(state._autoT);
    applySpeaker(line);
    if(line.sprite)setSprite(line.sprite);
    state.currentLineKey=key;
    appendHistory(line, key);
    state.readLineKeys.add(key);
    persistRead();

    const raw=line.text||"";
    state.fullText=lineHTML(line, raw);
    dlgText.innerHTML="";
    contHint.style.opacity="0";

    if(opts.instant || state.skipMode){
      state.typing=false;
      dlgText.innerHTML=state.fullText;
      contHint.style.opacity="0.8";
      if(state.skipMode) scheduleSkip();
      else scheduleAuto(raw);
      return;
    }

    state.typing=true;
    let i=0;
    function step(){
      if(!state.typing)return;
      i++;
      dlgText.innerHTML=lineHTML(line, raw.slice(0,i));
      if(i<raw.length){
        state._t=setTimeout(step, punctuationDelay(raw[i-1]));
      }else{
        state.typing=false;
        contHint.style.opacity="0.8";
        scheduleAuto(raw);
      }
    }
    step();
  }

  function punctuationDelay(ch){
    const base=state.speed;
    if("。？！；".includes(ch)) return base + 180;
    if("，、：".includes(ch)) return base + 80;
    return base;
  }

  function finishType(){
    if(!state.typing)return;
    state.typing=false;
    clearTimeout(state._t);
    dlgText.innerHTML=state.fullText;
    contHint.style.opacity="0.8";
    scheduleAuto(dlgText.textContent || "");
  }

  function scheduleAuto(text){
    if(!state.autoMode || state.typing || !canAdvanceDialogue()) return;
    clearTimeout(state._autoT);
    const delay=settings.autoDelay + Math.min(1700, (text || "").length * 34);
    state._autoT=setTimeout(()=>advanceLine(), delay);
  }

  function scheduleSkip(){
    if(!state.skipMode || !canAdvanceDialogue()) return;
    clearTimeout(state._skipT);
    state._skipT=setTimeout(()=>advanceLine(), 70);
  }

  function stopAutoSkip(){
    state.autoMode=false;
    state.skipMode=false;
    clearTimeout(state._autoT);
    clearTimeout(state._skipT);
    $("q-auto").classList.remove("active");
    $("q-skip").classList.remove("active");
  }

  function toggleAuto(){
    state.autoMode=!state.autoMode;
    state.skipMode=false;
    $("q-auto").classList.toggle("active",state.autoMode);
    $("q-skip").classList.remove("active");
    showToast(state.autoMode ? "自动播放开启" : "自动播放关闭");
    if(state.autoMode && !state.typing) scheduleAuto(dlgText.textContent || "");
  }

  function toggleSkip(){
    state.skipMode=!state.skipMode;
    state.autoMode=false;
    $("q-skip").classList.toggle("active",state.skipMode);
    $("q-auto").classList.remove("active");
    showToast(state.skipMode ? "跳过已读开启" : "跳过已读关闭");
    if(state.skipMode) advanceLine();
  }

  function canAdvanceDialogue(){
    return !dlgBox.classList.contains("hidden")
      && choiceLayer.classList.contains("hidden")
      && puzzleLayer.classList.contains("hidden")
      && chapterCard.classList.contains("show")===false
      && backlogScreen.classList.contains("hidden")
      && settingsScreen.classList.contains("hidden");
  }

  function playChapter(ch, cb){
    $("chapter-sub").textContent=ch.sub||"";
    $("chapter-title").textContent=ch.title||"";
    $("chapter-pov").textContent=ch.pov||"";
    chapterCard.classList.add("show");
    state.chapterDone=()=>{
      state.chapterTimers.forEach(clearTimeout);
      state.chapterTimers=[];
      chapterCard.classList.remove("show");
      state.chapterDone=null;
      state.chapterTimers.push(setTimeout(cb,120));
    };
    state.chapterTimers.push(setTimeout(state.chapterDone,2000));
  }

  function skipChapter(){
    if(state.chapterDone) state.chapterDone();
  }

  function gotoNode(key, startLine=0){
    stopAutoSkip();
    state.node=key;
    state.lineIdx=startLine || 0;
    const node=STORY[key];
    if(!node){console.warn("missing node",key);return;}

    const enter=()=>{
      if(node.pov)setPov(node.pov);
      if(node.isChoice){clearSprites();if(node.sprite)setSprite(node.sprite);renderChoices(node);return;}
      if(node.puzzle){clearSprites();renderPuzzle(node.puzzle);return;}
      clearSprites();
      dlgBox.classList.remove("hidden");
      dlgBox.style.animation="none";
      void dlgBox.offsetWidth;
      dlgBox.style.animation="";
      advanceLine();
    };

    if(node.bg)setBg(node.bg);

    if(node.chapter && !startLine){
      dlgBox.classList.add("hidden");
      playChapter(node.chapter, enter);
    }else{
      enter();
    }
  }

  function advanceLine(){
    const node=STORY[state.node];
    if(!node) return;
    if(state.typing){finishType();return;}

    if(state.lineIdx>=node.lines.length){
      if(node.choices){renderChoices(node);return;}
      if(node.goto==="__end__"){endGame();return;}
      if(node.goto){gotoNode(node.goto);return;}
      return;
    }

    const key=`${state.node}:${state.lineIdx}`;
    const line=node.lines[state.lineIdx];
    const wasRead=state.readLineKeys.has(key);
    if(state.skipMode && !wasRead){
      state.skipMode=false;
      $("q-skip").classList.remove("active");
      showToast("遇到未读内容，已停止跳过");
    }
    state.lineIdx++;
    typeLine(line,key,{instant:state.skipMode && wasRead});
  }

  function onAdvanceClick(){
    if(state.autoMode || state.skipMode) stopAutoSkip();
    if(state.typing){finishType();return;}
    advanceLine();
  }

  function choiceKey(idx){ return `${state.node}:choice:${idx}`; }

  function renderChoices(node){
    stopAutoSkip();
    dlgBox.classList.add("hidden");
    choiceLayer.innerHTML="";
    state.armedChoice=null;
    const prompt=document.createElement("div");
    prompt.className="choice-prompt";
    prompt.textContent=node.prompt||"如何抉择？";
    choiceLayer.appendChild(prompt);

    node.choices.forEach((c,idx)=>{
      const btn=document.createElement("div");
      btn.className="choice-btn";
      if(state.readChoiceKeys.has(choiceKey(idx))) btn.classList.add("read");
      btn.style.animationDelay=(idx*0.08)+"s";
      btn.innerHTML=`${escapeHTML(c.text)}<div class="choice-hint">${escapeHTML(c.hint||"")}</div>`;
      btn.addEventListener("click",(e)=>{
        e.stopPropagation();
        if(IS_TOUCH){
          state.readChoiceKeys.add(choiceKey(idx));
          persistRead();
          commitChoice(c);
          return;
        }
        if(state.armedChoice===btn){
          state.readChoiceKeys.add(choiceKey(idx));
          persistRead();
          commitChoice(c);
        }else{
          choiceLayer.querySelectorAll(".choice-btn").forEach(b=>b.classList.remove("armed"));
          btn.classList.add("armed");
          state.armedChoice=btn;
        }
      });
      choiceLayer.appendChild(btn);
    });

    const hint=document.createElement("div");
    hint.className="choice-hint";
    hint.style.marginTop="18px";
    hint.textContent=IS_TOUCH ? "点击选项即可落子" : "点击选项浮起 · 再次点击落子";
    choiceLayer.appendChild(hint);
    choiceLayer.classList.remove("hidden");
  }

  function commitChoice(c){
    choiceLayer.classList.add("hidden");
    choiceLayer.innerHTML="";
    state.armedChoice=null;
    if(c.set&&typeof c.set.aff==="number")setAff(c.set.aff);
    if(c.toast)showToast(c.toast);
    setTimeout(()=>gotoNode(c.goto),260);
  }

  let puzzleState={picked:[],conf:null};
  function renderPuzzle(conf){
    stopAutoSkip();
    dlgBox.classList.add("hidden");
    puzzleState={picked:[],conf:conf};
    const submitBtn=$("puzzle-submit");
    submitBtn.disabled=true;
    $("puzzle-title").textContent=conf.title||"局中之眼";
    $("puzzle-desc").textContent=conf.desc||"";
    const board=$("clue-board");
    board.innerHTML="";
    conf.clues.forEach((clue)=>{
      const card=document.createElement("div");
      card.className="clue-card";
      card.dataset.id=clue.id;
      const iconHTML=clue.img
        ? `<img class="clue-icon-img" src="assets/clue_${escapeHTML(clue.id)}.png" alt="">`
        : `<span class="clue-icon">${escapeHTML(clue.icon||"❖")}</span>`;
      card.innerHTML=`<div class="clue-card-img-wrap">${iconHTML}</div>
        <div class="clue-card-meta">
          <div class="clue-name">${escapeHTML(clue.name)}</div>
          <div class="clue-text">${escapeHTML(clue.text)}</div>
        </div>`;
      card.addEventListener("click",()=>{
        if(puzzleState.locked)return;
        const idx=puzzleState.picked.indexOf(clue.id);
        if(idx>=0){
          puzzleState.picked.splice(idx,1);
          card.classList.remove("picked");
        }else{
          if(puzzleState.picked.length>=conf.need){
            showToast(`最多只能选 ${conf.need} 处`);return;
          }
          puzzleState.picked.push(clue.id);
          card.classList.add("picked");
        }
        fillSlots();
        updateSubmitState();
      });
      board.appendChild(card);
    });
    fillSlots();
    updateSubmitState();
    $("puzzle-fail").classList.add("hidden");
    $("puzzle-success").classList.add("hidden");
    document.querySelectorAll(".clue-card").forEach(c=>{c.style.pointerEvents="";c.classList.remove("picked");});
    puzzleState.locked=false;
    puzzleLayer.classList.remove("hidden");
    puzzleLayer.scrollTop=0;
    board.scrollTop=0;
  }

  function fillSlots(){
    const slots=document.querySelectorAll("#puzzle-slots .slot");
    const conf=puzzleState.conf;
    slots.forEach((slot,i)=>{
      slot.classList.remove("filled","wrong");
      const old=slot.querySelector(".slot-icon");
      if(old)old.remove();
      const id=puzzleState.picked[i];
      if(id){
        slot.classList.add("filled");
        const clue=conf.clues.find(c=>c.id===id);
        if(clue){
          const wrap=document.createElement("div");
          wrap.className="slot-icon";
          if(clue.img){
            wrap.innerHTML=`<img src="assets/clue_${escapeHTML(clue.id)}.png" alt="">`;
          }else{
            wrap.textContent=clue.icon||"❖";
            wrap.style.fontSize="22px";
          }
          slot.appendChild(wrap);
        }
      }
    });
  }

  function updateSubmitState(){
    const btn=$("puzzle-submit");
    btn.disabled=puzzleState.picked.length!==puzzleState.conf.need;
  }

  function onSlotClick(e){
    if(puzzleState.locked)return;
    const slot=e.target.closest(".slot");
    if(!slot)return;
    const idx=Number(slot.dataset.idx);
    if(idx>=0 && idx<puzzleState.picked.length){
      const removedId=puzzleState.picked[idx];
      puzzleState.picked.splice(idx,1);
      const card=document.querySelector(`.clue-card[data-id="${removedId}"]`);
      if(card)card.classList.remove("picked");
      fillSlots();
      updateSubmitState();
    }
  }

  function showPuzzleFail(text){
    const fail=$("puzzle-fail");
    fail.textContent=text;
    fail.classList.remove("hidden");
    clearTimeout(puzzleState._failT);
    puzzleState._failT=setTimeout(()=>{
      fail.classList.add("hidden");
    },2800);
  }

  function submitPuzzle(){
    const conf=puzzleState.conf;
    if(puzzleState.picked.length!==conf.need)return;
    const correctIds=conf.clues.filter(c=>c.correct).map(c=>c.id);
    const allRight=puzzleState.picked.every(id=>correctIds.includes(id));
    if(allRight){
      puzzleState.locked=true;
      const submitBtn=$("puzzle-submit");
      submitBtn.disabled=true;
      document.querySelectorAll(".clue-card").forEach(c=>c.style.pointerEvents="none");
      const list=$("puzzle-success-list");
      list.innerHTML=puzzleState.picked.map(id=>{
        const c=conf.clues.find(cl=>cl.id===id);
        return c ? `<div class="success-reveal-item">${escapeHTML(c.reveal)}</div>`:"";
      }).join("");
      setTimeout(()=>{
        $("puzzle-success").classList.remove("hidden");
      },350);
    }else{
      const slots=document.querySelectorAll("#puzzle-slots .slot");
      slots.forEach(s=>s.classList.add("wrong"));
      const wrong=puzzleState.picked.find(id=>!correctIds.includes(id));
      const wc=conf.clues.find(c=>c.id===wrong);
      showPuzzleFail("其中混入了寻常之物——"+(wc?wc.name+"："+wc.reveal:"再想想，哪一处带着人为的痕迹。"));
      setTimeout(()=>{
        puzzleState.picked=[];
        document.querySelectorAll(".clue-card").forEach(c=>c.classList.remove("picked"));
        slots.forEach(s=>s.classList.remove("wrong"));
        fillSlots();
        updateSubmitState();
      },1600);
    }
  }

  function continueAfterPuzzle(){
    const conf=puzzleState.conf;
    $("puzzle-success").classList.add("hidden");
    puzzleLayer.classList.add("hidden");
    document.querySelectorAll("#puzzle-slots .slot").forEach(s=>{
      s.classList.remove("filled","wrong");
      const old=s.querySelector(".slot-icon");
      if(old)old.remove();
    });
    gotoNode(conf.onWin);
  }

  function endGame(){
    stopAutoSkip();
    dlgBox.classList.add("hidden");
    const ov=document.createElement("div");
    ov.className="overlay";
    ov.innerHTML=`<div class="overlay-card" style="text-align:center">
      <h2>第二幕 · 终</h2>
      <p>你与雍门清夜的「心意」停在 <b style="color:var(--rose)">${state.aff}</b>。</p>
      <p class="dim">上元灯节、烟花宴、太子与景澄的棋局、以及清夜藏了十年的那笔血债——都将在第三幕「烟花为聘」中落下帷幕。</p>
      <button class="soft-btn" id="end-back">回到标题</button>
    </div>`;
    document.body.appendChild(ov);
    $("end-back").addEventListener("click",()=>{ov.remove();backToTitle();});
  }

  function fmtTime(ts){
    const d=new Date(ts);
    const pad=n=>String(n).padStart(2,"0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  function openSavePanel(mode){
    saveMode=mode;
    $("save-kicker").textContent=mode==="save"?"SAVE":"LOAD";
    $("save-title").textContent=mode==="save"?"存 局":"读 局";
    document.querySelectorAll(".save-tab").forEach(t=>{
      t.classList.toggle("active", t.dataset.tab===mode);
    });
    renderSaveSlots();
    $("save-screen").classList.remove("hidden");
  }
  function closeSavePanel(){ $("save-screen").classList.add("hidden"); }
  function renderSaveSlots(){
    const container=$("save-slots");
    container.innerHTML="";
    const data=getSaves();
    for(let i=0;i<SLOT_COUNT;i++){
      const slot=data.slots[i];
      const el=document.createElement("div");
      el.className="save-slot"+(slot?"":" empty");
      el.dataset.idx=i;
      if(!slot){
        el.innerHTML=`<span>空 槽 ${i+1}</span>`;
        el.addEventListener("click",()=>onSlotClickAction(i));
        container.appendChild(el);
        continue;
      }
      const ch=chapterOf(slot.node);
      const isNew=slot.new;
      el.innerHTML=`
        ${isNew?'<div class="save-slot-new">NEW</div>':""}
        <button class="save-slot-del" data-del="${i}" title="删除">×</button>
        <div class="save-slot-head">
          <div class="save-slot-chapter">${ch}</div>
          <div class="save-slot-aff">❤ ${slot.aff||0}</div>
        </div>
        <div class="save-slot-meta">槽 ${i+1} · ${fmtTime(slot.ts)}</div>`;
      el.addEventListener("click",(ev)=>{
        if(ev.target.closest(".save-slot-del")) return;
        onSlotClickAction(i);
      });
      el.querySelector(".save-slot-del").addEventListener("click",(ev)=>{
        ev.stopPropagation();
        onSlotDelete(i);
      });
      container.appendChild(el);
    }
    // 去掉上一次的new标记（只显示一次）
    if(data.slots.some(s=>s&&s.new)){
      data.slots.forEach(s=>{ if(s) s.new=false; });
      setSaves(data);
    }
  }
  function onSlotClickAction(i){
    const data=getSaves();
    const slot=data.slots[i];
    if(saveMode==="save"){
      // 保存
      const newSlot={
        node:state.node,lineIdx:state.lineIdx,aff:state.aff,pov:state.pov,
        history:state.history,ts:Date.now(),new:true
      };
      if(slot && !confirm(`槽 ${i+1} 已有存档，确定覆盖吗？`)) return;
      data.slots[i]=newSlot;
      data.lastSlot=i;
      setSaves(data);
      showToast(`已存至槽 ${i+1}`);
      renderSaveSlots();
    }else{
      // 读取
      if(!slot){ showToast("此槽为空"); return; }
      closeSavePanel();
      $("title-screen").classList.add("hidden");
      $("bottom-bar").classList.remove("hidden");
      state.aff=slot.aff||0;affVal.textContent=state.aff;
      state.history=Array.isArray(slot.history)?slot.history:[];
      setPov(slot.pov||"heroine");
      showToast(`读取槽 ${i+1}`);
      gotoNode(slot.node||"intro_modern", slot.lineIdx||0);
    }
  }
  function onSlotDelete(i){
    const data=getSaves();
    if(!data.slots[i]) return;
    if(!confirm(`确定删除槽 ${i+1} 的存档吗？`)) return;
    data.slots[i]=null;
    if(data.lastSlot===i) data.lastSlot=data.slots.findIndex(s=>!!s);
    setSaves(data);
    renderSaveSlots();
  }
  function save(){ openSavePanel("save"); }
  function hasSave(){
    const data=getSaves();
    return data.slots.some(s=>!!s);
  }
  function load(){
    if(!hasSave()){ showToast("尚无存档，请先入局"); return; }
    openSavePanel("load");
  }
  function quickContinue(){
    const data=getSaves();
    const idx=data.lastSlot>=0?data.lastSlot:data.slots.findIndex(s=>!!s);
    if(idx<0){ showToast("尚无存档，请先入局"); return; }
    const slot=data.slots[idx];
    $("title-screen").classList.add("hidden");
    $("bottom-bar").classList.remove("hidden");
    state.aff=slot.aff||0;affVal.textContent=state.aff;
    state.history=Array.isArray(slot.history)?slot.history:[];
    setPov(slot.pov||"heroine");
    showToast(`续局 · 槽 ${idx+1}`);
    gotoNode(slot.node||"intro_modern", slot.lineIdx||0);
  }

  function startGame(){
    $("title-screen").classList.add("hidden");
    $("bottom-bar").classList.remove("hidden");
    state.aff=0;affVal.textContent="0";
    state.history=[];
    gotoNode("intro_modern");
  }
  function backToTitle(){
    stopAutoSkip();
    dlgBox.classList.add("hidden");choiceLayer.classList.add("hidden");
    puzzleLayer.classList.add("hidden");closeBacklog();closeSettings();closeSavePanel();clearSprites();
    bgA.classList.remove("show");bgB.classList.remove("show");
    $("title-screen").classList.remove("hidden");
    $("bottom-bar").classList.add("hidden");
  }

  function bind(){
    dlgBox.addEventListener("click",onAdvanceClick);
    chapterCard.addEventListener("click",skipChapter);
    $("bg-layer").addEventListener("click",onAdvanceClick);
    $("sprite-layer").addEventListener("click",onAdvanceClick);

    $("btn-start").addEventListener("click",startGame);
    $("btn-continue").addEventListener("click",quickContinue);
    $("btn-about").addEventListener("click",()=>$("about-screen").classList.remove("hidden"));
    $("btn-about-close").addEventListener("click",()=>$("about-screen").classList.add("hidden"));

    // 存档面板
    $("btn-save-close").addEventListener("click",closeSavePanel);
    $("save-screen").addEventListener("click",(ev)=>{
      if(ev.target.id==="save-screen") closeSavePanel();
    });
    document.querySelectorAll(".save-tab").forEach(t=>{
      t.addEventListener("click",()=>{
        saveMode=t.dataset.tab;
        document.querySelectorAll(".save-tab").forEach(x=>x.classList.toggle("active",x===t));
        $("save-kicker").textContent=saveMode==="save"?"SAVE":"LOAD";
        $("save-title").textContent=saveMode==="save"?"存 局":"读 局";
        renderSaveSlots();
      });
    });

    $("puzzle-submit").addEventListener("click",submitPuzzle);
    $("puzzle-next").addEventListener("click",continueAfterPuzzle);
    $("puzzle-slots").addEventListener("click",onSlotClick);

    $("q-save").addEventListener("click",save);
    $("q-load").addEventListener("click",load);
    $("q-home").addEventListener("click",backToTitle);
    $("q-backlog").addEventListener("click",openBacklog);
    $("q-auto").addEventListener("click",toggleAuto);
    $("q-skip").addEventListener("click",toggleSkip);
    $("q-settings").addEventListener("click",openSettings);

    $("btn-backlog-close").addEventListener("click",closeBacklog);
    $("btn-settings-close").addEventListener("click",closeSettings);
    $("btn-settings-reset").addEventListener("click",()=>{
      state.speed=30;settings.autoDelay=1100;
      $("setting-text-speed").value=50;
      $("setting-auto-speed").value=1100;
      persistSettings();
      showToast("设置已恢复");
    });
    $("btn-fullscreen").addEventListener("click",()=>{
      if(document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen?.();
    });
    $("setting-text-speed").addEventListener("input",(e)=>{
      state.speed=80-Number(e.target.value);
      persistSettings();
    });
    $("setting-auto-speed").addEventListener("input",(e)=>{
      settings.autoDelay=Number(e.target.value);
      persistSettings();
    });

    document.addEventListener("wheel",(e)=>{
      if(e.deltaY<0 && canAdvanceDialogue()) openBacklog();
    },{passive:true});

    document.addEventListener("keydown",(e)=>{
      if(e.code==="Escape"){closeBacklog();closeSettings();closeSavePanel();return;}
      if(e.code==="PageUp" || e.key.toLowerCase()==="b"){openBacklog();return;}
      if(e.key.toLowerCase()==="a"){toggleAuto();return;}
      if(e.key.toLowerCase()==="s"){toggleSkip();return;}
      if(e.code==="Space"||e.code==="Enter"){
        if(canAdvanceDialogue()){
          e.preventDefault();onAdvanceClick();
        }
      }
    });
  }

  window.addEventListener("DOMContentLoaded",()=>{
    bind();
    $("setting-text-speed").value=80-state.speed;
    $("setting-auto-speed").value=settings.autoDelay;
    if(hasSave())$("btn-continue").style.opacity="1";
  });

})();
