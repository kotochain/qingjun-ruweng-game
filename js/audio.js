(function(){
  "use strict";
  const $=id=>document.getElementById(id);

  const AudioSys={
    ctx:null,
    masterGain:null,
    bgmGain:null,
    sfxGain:null,
    bgmSource:null,
    bgmNodes:[],
    currentBGM:null,
    started:false,
    bgmVol:0.35,
    sfxVol:0.5,
    _bgmTimer:null,

    init(){
      if(this.ctx)return;
      try{
        const AC=window.AudioContext||window.webkitAudioContext;
        this.ctx=new AC();
      }catch(e){console.warn("Web Audio not supported");return;}
      this.masterGain=this.ctx.createGain();
      this.masterGain.gain.value=1;
      this.masterGain.connect(this.ctx.destination);
      this.bgmGain=this.ctx.createGain();
      this.bgmGain.gain.value=this.bgmVol;
      this.bgmGain.connect(this.masterGain);
      this.sfxGain=this.ctx.createGain();
      this.sfxGain.gain.value=this.sfxVol;
      this.sfxGain.connect(this.masterGain);
    },

    resume(){
      this.init();
      if(this.ctx&&this.ctx.state==="suspended")this.ctx.resume();
      this.started=true;
    },

    setBgmVol(v){
      this.bgmVol=v;
      if(this.bgmGain)this.bgmGain.gain.setTargetAtTime(v,this.ctx?.currentTime||0,.2);
      try{localStorage.setItem("qjr_bgm",String(v));}catch(e){}
    },
    setSfxVol(v){
      this.sfxVol=v;
      if(this.sfxGain)this.sfxGain.gain.setTargetAtTime(v,this.ctx?.currentTime||0,.2);
      try{localStorage.setItem("qjr_sfx",String(v));}catch(e){}
    },
    loadSettings(){
      try{
        const b=localStorage.getItem("qjr_bgm");if(b!==null)this.bgmVol=Number(b);
        const s=localStorage.getItem("qjr_sfx");if(s!==null)this.sfxVol=Number(s);
      }catch(e){}
    },

    stopBGM(fadeTime=.8){
      if(!this.ctx)return;
      const t=this.ctx.currentTime;
      if(this.bgmSource){
        try{
          this.bgmSource.gain.setTargetAtTime(0,t,.2);
          const a=this.bgmSource.source;
          setTimeout(()=>{try{a.pause();a.src="";}catch(e){}},fadeTime*1000);
        }catch(e){}
        this.bgmSource=null;
      }
      this.bgmNodes.forEach(n=>{
        try{
          if(n.gain)n.gain.setTargetAtTime(0,t,.2);
          setTimeout(()=>{try{n.stop&&n.stop();n.disconnect();}catch(e){}},fadeTime*1000);
        }catch(e){}
      });
      this.bgmNodes=[];
      if(this._bgmTimer){clearInterval(this._bgmTimer);clearTimeout(this._bgmTimer);this._bgmTimer=null;}
      this.currentBGM=null;
    },

    playBGM(kind){
      if(!this.started)return;
      this.init();
      if(this.currentBGM===kind)return;
      this.stopBGM(.6);
      this.currentBGM=kind;
      const url=`assets/bgm_${kind}.mp3`;
      this._tryPlayFile(url,true);
    },

    _tryPlayFile(url,loop){
      if(!this.ctx)return;
      const a=new Audio(url);
      a.loop=!!loop;
      a.crossOrigin="anonymous";
      const t=this.ctx.currentTime;
      const g=this.ctx.createGain();
      g.gain.setValueAtTime(0,t);
      try{
        const src=this.ctx.createMediaElementSource(a);
        src.connect(g);
      }catch(e){}
      g.connect(this.bgmGain);
      const onErr=()=>{try{a.removeEventListener("canplaythrough",onOk);}catch(e){}};
      const onOk=()=>{
        try{a.removeEventListener("error",onErr);}catch(e){}
        g.gain.linearRampToValueAtTime(1,t+.8);
        a.play().catch(()=>{});
      };
      a.addEventListener("canplaythrough",onOk,{once:true});
      a.addEventListener("error",onErr,{once:true});
      try{a.load();}catch(e){}
      this.bgmSource={source:a,gain:g};
      return a;
    },

    _playSfx(name){
      if(!this.started||this.sfxVol<=0)return;
      this.resume();
      const url=`assets/sfx_${name}.mp3`;
      const a=new Audio(url);
      a.volume=this.sfxVol;
      a.addEventListener("error",()=>{},{once:true});
      a.play().catch(()=>{});
    },

    sfxClick(){this._playSfx("click");},
    sfxSelect(){this._playSfx("select");},
    sfxError(){this._playSfx("error");},
    sfxSuccess(){this._playSfx("success");},
    sfxChapter(){this._playSfx("chapter");},
  };

  window.AudioSys=AudioSys;
})();
