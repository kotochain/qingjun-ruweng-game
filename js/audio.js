(function(){
  "use strict";
  const $=id=>document.getElementById(id);

  const AudioSys={
    ctx:null,
    masterGain:null,
    bgmGain:null,
    sfxGain:null,
    bgmNodes:[],
    currentBGM:null,
    started:false,
    bgmVol:0.35,
    sfxVol:0.5,
    _timer:null,
    _step:0,

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
      if(this.bgmGain)this.bgmGain.gain.setTargetAtTime(v,this.ctx?.currentTime||0,.1);
      try{localStorage.setItem("qjr_bgm",String(v));}catch(e){}
    },
    setSfxVol(v){
      this.sfxVol=v;
      if(this.sfxGain)this.sfxGain.gain.setTargetAtTime(v,this.ctx?.currentTime||0,.1);
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
      this.bgmNodes.forEach(n=>{
        try{
          if(n.gain)n.gain.setTargetAtTime(0,t,.15);
          setTimeout(()=>{try{n.stop&&n.stop();n.disconnect();}catch(e){}},fadeTime*1000);
        }catch(e){}
      });
      this.bgmNodes=[];
      if(this._timer){clearInterval(this._timer);this._timer=null;}
      this.currentBGM=null;
    },

    playBGM(kind){
      if(!this.started)return;
      this.init();
      if(this.currentBGM===kind)return;
      this.stopBGM(.5);
      this.currentBGM=kind;
      if(kind==="title")this._bgmTitle();
      else if(kind==="calm")this._bgmCalm();
      else if(kind==="tense")this._bgmTense();
    },

    _makeTone(freq,type,dur,attack,release,gain,dest){
      if(!this.ctx)return null;
      const t=this.ctx.currentTime;
      const o=this.ctx.createOscillator();
      const g=this.ctx.createGain();
      o.type=type||"sine";
      o.frequency.value=freq;
      g.gain.setValueAtTime(0,t);
      g.gain.linearRampToValueAtTime(gain||.2,t+(attack||.05));
      g.gain.exponentialRampToValueAtTime(.001,t+dur);
      o.connect(g);g.connect(dest||this.bgmGain);
      o.start(t);o.stop(t+dur+(release||.1));
      return o;
    },

    _mtof(m){return 440*Math.pow(2,(m-69)/12);},

    /* 标题BGM：空灵五声音阶，笛+古琴 */
    _bgmTitle(){
      if(!this.ctx)return;
      const notes=[60,62,64,67,69,72,74,76];
      const bassNotes=[48,50,53,55];
      const scale=[0,2,4,7,9,12,14,16];
      const baseFreq=m=>this._mtof(55+m);
      const that=this;
      this._step=0;

      function drone(){
        if(that.currentBGM!=="title")return;
        const t=that.ctx.currentTime;
        const root=baseFreq(bassNotes[Math.floor(Math.random()*bassNotes.length)%bassNotes.length]);
        const o=that.ctx.createOscillator();
        const g=that.ctx.createGain();
        o.type="sine";o.frequency.value=root;
        g.gain.setValueAtTime(0,t);
        g.gain.linearRampToValueAtTime(.08,t+2);
        g.gain.setTargetAtTime(.001,t+6,.8);
        o.connect(g);g.connect(that.bgmGain);
        o.start(t);o.stop(t+8);
        const o2=that.ctx.createOscillator();
        const g2=that.ctx.createGain();
        o2.type="triangle";o2.frequency.value=root*1.5;
        g2.gain.setValueAtTime(0,t);
        g2.gain.linearRampToValueAtTime(.03,t+2.5);
        g2.gain.setTargetAtTime(.001,t+7,.8);
        o2.connect(g2);g2.connect(that.bgmGain);
        o2.start(t+.1);o2.stop(t+8);
      }
      drone();
      setTimeout(()=>{if(that.currentBGM==="title")drone();},4000);

      function melody(){
        if(that.currentBGM!=="title")return;
        const t=that.ctx.currentTime;
        const deg=scale[Math.floor(Math.random()*scale.length)];
        const f=that._mtof(72+deg);
        const dur=1.2+Math.random()*1.8;
        that._pluck(f,dur,.07);
        that._bambooFlute(f*1.002,dur*1.2,.04);
        if(Math.random()<.35){
          setTimeout(()=>{
            if(that.currentBGM!=="title")return;
            const d2=scale[Math.floor(Math.random()*scale.length)];
            const f2=that._mtof(72+d2);
            that._pluck(f2,.8,.05);
          },500+Math.random()*800);
        }
      }
      function scheduleLoop(){
        if(that.currentBGM!=="title"){return;}
        melody();
        that._timer=setTimeout(scheduleLoop,1600+Math.random()*1800);
      }
      scheduleLoop();
    },

    _pluck(freq,dur,amp){
      if(!this.ctx)return;
      const t=this.ctx.currentTime;
      const o=this.ctx.createOscillator();
      const g=this.ctx.createGain();
      const f=this.ctx.createBiquadFilter();
      o.type="triangle";o.frequency.value=freq;
      f.type="lowpass";f.frequency.value=2400;f.Q.value=1;
      g.gain.setValueAtTime(0,t);
      g.gain.linearRampToValueAtTime(amp||.1,t+.015);
      g.gain.exponentialRampToValueAtTime(.001,t+(dur||1));
      o.connect(f);f.connect(g);g.connect(this.bgmGain);
      o.start(t);o.stop(t+dur+.1);
      this.bgmNodes.push(o);
    },
    _bambooFlute(freq,dur,amp){
      if(!this.ctx)return;
      const t=this.ctx.currentTime;
      const o=this.ctx.createOscillator();
      const o2=this.ctx.createOscillator();
      const g=this.ctx.createGain();
      const f=this.ctx.createBiquadFilter();
      o.type="sine";o.frequency.value=freq;
      o2.type="sine";o2.frequency.value=freq*2.003;
      f.type="bandpass";f.frequency.value=1800;f.Q.value=4;
      g.gain.setValueAtTime(0,t);
      g.gain.linearRampToValueAtTime(amp||.05,t+.12);
      g.gain.setTargetAtTime(.001,t+dur*.6,dur*.2);
      o.connect(g);o2.connect(g);g.connect(f);f.connect(this.bgmGain);
      o.start(t);o2.start(t);o.stop(t+dur+.1);o2.stop(t+dur+.1);
      this.bgmNodes.push(o);
    },

    /* 平静对话BGM：低音古琴+偶发泛音 */
    _bgmCalm(){
      if(!this.ctx)return;
      const scale=[0,2,4,7,9];
      const that=this;
      function droneCalm(){
        if(that.currentBGM!=="calm")return;
        const t=that.ctx.currentTime;
        const root=that._mtof(43+scale[Math.floor(Math.random()*scale.length)]);
        const o=that.ctx.createOscillator();
        const g=that.ctx.createGain();
        o.type="sine";o.frequency.value=root;
        g.gain.setValueAtTime(0,t);
        g.gain.linearRampToValueAtTime(.06,t+3);
        g.gain.setTargetAtTime(.001,t+8,1);
        o.connect(g);g.connect(that.bgmGain);
        o.start(t);o.stop(t+10);
      }
      droneCalm();
      setInterval(()=>{if(that.currentBGM==="calm")droneCalm();},7000);

      function pluck(){
        if(that.currentBGM!=="calm")return;
        const oct=Math.random()<.5?60:72;
        const f=that._mtof(oct+scale[Math.floor(Math.random()*scale.length)]);
        that._pluck(f,1.8,.06);
        if(Math.random()<.25){
          setTimeout(()=>{
            if(that.currentBGM!=="calm")return;
            const f2=that._mtof(oct+scale[Math.floor(Math.random()*scale.length)]+7);
            that._pluck(f2,1.4,.04);
          },400+Math.random()*600);
        }
      }
      function loop(){
        if(that.currentBGM!=="calm")return;
        pluck();
        that._timer=setTimeout(loop,2000+Math.random()*2800);
      }
      loop();
    },

    /* 紧张推理BGM：低频脉冲+不和谐音 */
    _bgmTense(){
      if(!this.ctx)return;
      const that=this;
      let beat=0;
      function pulse(){
        if(that.currentBGM!=="tense")return;
        const t=that.ctx.currentTime;
        const o=that.ctx.createOscillator();
        const g=that.ctx.createGain();
        o.type="sine";
        o.frequency.value=beat%4===0?55:82;
        g.gain.setValueAtTime(0,t);
        g.gain.linearRampToValueAtTime(.12,t+.02);
        g.gain.exponentialRampToValueAtTime(.001,t+.5);
        o.connect(g);g.connect(that.bgmGain);
        o.start(t);o.stop(t+.6);
        beat++;
      }
      function pulseLoop(){
        if(that.currentBGM!=="tense")return;
        pulse();
        that._timer=setTimeout(pulseLoop,580);
      }
      pulseLoop();

      function pad(){
        if(that.currentBGM!=="tense")return;
        const t=that.ctx.currentTime;
        const o=that.ctx.createOscillator();
        const o2=that.ctx.createOscillator();
        const g=that.ctx.createGain();
        o.type="sawtooth";o.frequency.value=110;
        o2.type="sawtooth";o2.frequency.value=112.5;
        const f=that.ctx.createBiquadFilter();
        f.type="lowpass";f.frequency.value=500;f.Q.value=3;
        g.gain.setValueAtTime(0,t);
        g.gain.linearRampToValueAtTime(.025,t+2);
        g.gain.setTargetAtTime(.001,t+5,1);
        o.connect(f);o2.connect(f);f.connect(g);g.connect(that.bgmGain);
        o.start(t);o2.start(t);o.stop(t+7);o2.stop(t+7);
        setTimeout(()=>{if(that.currentBGM==="tense")pad();},5500);
      }
      pad();

      function accent(){
        if(that.currentBGM!=="tense")return;
        const notes=[0,1,3,6];
        const f=that._mtof(60+notes[Math.floor(Math.random()*notes.length)]);
        that._pluck(f*2,.5,.05);
      }
      setInterval(()=>{if(that.currentBGM==="tense"&&Math.random()<.5)accent();},1200);
    },

    /* ============ 音效 ============ */
    sfxClick(){
      if(!this.started||!this.ctx||this.sfxVol<=0)return;
      this.resume();
      const t=this.ctx.currentTime;
      const o=this.ctx.createOscillator();
      const g=this.ctx.createGain();
      o.type="sine";o.frequency.setValueAtTime(880,t);
      o.frequency.exponentialRampToValueAtTime(440,t+.08);
      g.gain.setValueAtTime(.0001,t);
      g.gain.exponentialRampToValueAtTime(.15,t+.005);
      g.gain.exponentialRampToValueAtTime(.001,t+.1);
      o.connect(g);g.connect(this.sfxGain);
      o.start(t);o.stop(t+.12);
    },
    sfxSelect(){
      if(!this.started||!this.ctx||this.sfxVol<=0)return;
      const t=this.ctx.currentTime;
      [880,1320].forEach((f,i)=>{
        const o=this.ctx.createOscillator();
        const g=this.ctx.createGain();
        o.type="triangle";o.frequency.value=f;
        g.gain.setValueAtTime(.0001,t+i*.04);
        g.gain.exponentialRampToValueAtTime(.1,t+i*.04+.005);
        g.gain.exponentialRampToValueAtTime(.001,t+i*.04+.2);
        o.connect(g);g.connect(this.sfxGain);
        o.start(t+i*.04);o.stop(t+i*.04+.22);
      });
    },
    sfxError(){
      if(!this.started||!this.ctx||this.sfxVol<=0)return;
      const t=this.ctx.currentTime;
      const o=this.ctx.createOscillator();
      const g=this.ctx.createGain();
      o.type="square";o.frequency.setValueAtTime(180,t);
      o.frequency.exponentialRampToValueAtTime(120,t,.25);
      g.gain.setValueAtTime(.0001,t);
      g.gain.linearRampToValueAtTime(.12,t+.02);
      g.gain.exponentialRampToValueAtTime(.001,t,.35);
      o.connect(g);g.connect(this.sfxGain);
      o.start(t);o.stop(t,.4);
    },
    sfxSuccess(){
      if(!this.started||!this.ctx||this.sfxVol<=0)return;
      const t=this.ctx.currentTime;
      const seq=[523,659,784,1047];
      seq.forEach((f,i)=>{
        const o=this.ctx.createOscillator();
        const g=this.ctx.createGain();
        o.type="triangle";o.frequency.value=f;
        const st=t+i*.1;
        g.gain.setValueAtTime(.0001,st);
        g.gain.exponentialRampToValueAtTime(.15,st+.01);
        g.gain.exponentialRampToValueAtTime(.001,st+.4);
        o.connect(g);g.connect(this.sfxGain);
        o.start(st);o.stop(st+.45);
      });
    },
    sfxChapter(){
      if(!this.started||!this.ctx||this.sfxVol<=0)return;
      const t=this.ctx.currentTime;
      const o=this.ctx.createOscillator();
      const g=this.ctx.createGain();
      o.type="sine";o.frequency.setValueAtTime(220,t);
      o.frequency.exponentialRampToValueAtTime(880,t+1.2);
      g.gain.setValueAtTime(0,t);
      g.gain.linearRampToValueAtTime(.1,t+.3);
      g.gain.setTargetAtTime(.001,t+1,.2);
      o.connect(g);g.connect(this.sfxGain);
      o.start(t);o.stop(t+1.3);
    },
  };

  window.AudioSys=AudioSys;
})();
