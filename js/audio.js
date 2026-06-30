(function(){
  "use strict";

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

    init(){
      if(this.ctx)return;
      try{
        const AC=window.AudioContext||window.webkitAudioContext;
        this.ctx=new AC();
      }catch(e){return;}
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
      if(this.bgmGain)this.bgmGain.gain.setTargetAtTime(v,this.ctx?.currentTime||0,.3);
      try{localStorage.setItem("qjr_bgm",String(v));}catch(e){}
    },
    setSfxVol(v){
      this.sfxVol=v;
      if(this.sfxGain)this.sfxGain.gain.setTargetAtTime(v,this.ctx?.currentTime||0,.3);
      try{localStorage.setItem("qjr_sfx",String(v));}catch(e){}
    },
    loadSettings(){
      try{
        const b=localStorage.getItem("qjr_bgm");if(b!==null)this.bgmVol=Number(b);
        const s=localStorage.getItem("qjr_sfx");if(s!==null)this.sfxVol=Number(s);
      }catch(e){}
    },

    _makeNoiseBuffer(seconds,type){
      const ctx=this.ctx;
      const len=seconds*ctx.sampleRate;
      const buf=ctx.createBuffer(1,len,ctx.sampleRate);
      const d=buf.getChannelData(0);
      if(type==="pink"||type==="brown"){
        let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
        let lastOut=0;
        for(let i=0;i<len;i++){
          const white=Math.random()*2-1;
          if(type==="pink"){
            b0=0.99886*b0+white*0.0555179;
            b1=0.99332*b1+white*0.0750759;
            b2=0.96900*b2+white*0.1538520;
            b3=0.86650*b3+white*0.3104856;
            b4=0.55000*b4+white*0.5329522;
            b5=-0.7616*b5-white*0.0168980;
            d[i]=(b0+b1+b2+b3+b4+b5+b6+white*0.5362)*0.11;
            b6=white*0.115926;
          }else{
            lastOut=(lastOut+0.02*white)/1.02;
            d[i]=lastOut*3.5;
          }
        }
      }else{
        for(let i=0;i<len;i++)d[i]=Math.random()*2-1;
      }
      return buf;
    },

    stopBGM(fadeTime=1.2){
      if(!this.ctx)return;
      const t=this.ctx.currentTime;
      if(this.bgmSource){
        try{
          this.bgmSource.gain.setTargetAtTime(0,t,.25);
          const a=this.bgmSource.source;
          setTimeout(()=>{try{a.pause();a.src="";}catch(e){}},fadeTime*1000);
        }catch(e){}
        this.bgmSource=null;
      }
      this.bgmNodes.forEach(n=>{
        try{
          if(n.gain)n.gain.setTargetAtTime(0,t,.25);
          setTimeout(()=>{try{n.stop&&n.stop();n.disconnect();}catch(e){}},fadeTime*1000);
        }catch(e){}
      });
      this.bgmNodes=[];
      this.currentBGM=null;
    },

    playBGM(kind){
      if(!this.started)return;
      this.init();
      if(this.currentBGM===kind)return;
      this.stopBGM(.8);
      this.currentBGM=kind;

      const fileUrl=`assets/bgm_${kind}.mp3`;
      const a=new Audio(fileUrl);
      a.loop=true;a.crossOrigin="anonymous";
      let fileOk=false;
      const onErr=()=>{
        if(fileOk)return;
        if(this.currentBGM===kind)this._ambient(kind);
      };
      const onOk=()=>{
        fileOk=true;
        try{a.removeEventListener("error",onErr);}catch(e){}
        const t=this.ctx.currentTime;
        const g=this.ctx.createGain();
        g.gain.setValueAtTime(0,t);
        g.gain.linearRampToValueAtTime(1,t+1.2);
        try{
          const src=this.ctx.createMediaElementSource(a);
          src.connect(g);
        }catch(e){}
        g.connect(this.bgmGain);
        a.play().catch(()=>{});
        this.bgmSource={source:a,gain:g};
      };
      a.addEventListener("canplaythrough",onOk,{once:true});
      a.addEventListener("error",onErr,{once:true});
      try{a.load();}catch(e){onErr();}
    },

    _ambient(kind){
      if(!this.ctx)return;
      const ctx=this.ctx;
      const t=ctx.currentTime;

      let noiseColor="pink";
      let noiseLP=280;
      let noiseLevel=0.012;
      let droneLevel=0.025;
      let droneFreq=55;
      let drone2Freq=82.5;
      let swellPeriod=22;
      if(kind==="tense"){
        noiseLP=200;noiseLevel=0.02;droneLevel=0.045;droneFreq=49;drone2Freq=73.5;swellPeriod=9;
      }else if(kind==="title"){
        noiseLP=340;noiseLevel=0.01;droneLevel=0.03;droneFreq=65.4;drone2Freq=98;swellPeriod=28;
      }

      const pinkBuf=this._makeNoiseBuffer(6,noiseColor);
      const noise=ctx.createBufferSource();
      noise.buffer=pinkBuf;noise.loop=true;
      const nf=ctx.createBiquadFilter();
      nf.type="lowpass";nf.frequency.value=noiseLP;nf.Q.value=0.7;
      const ng=ctx.createGain();
      ng.gain.setValueAtTime(0,t);
      ng.gain.linearRampToValueAtTime(noiseLevel,t+4);
      const nmod=ctx.createOscillator();
      nmod.frequency.value=1/swellPeriod;
      const nmodGain=ctx.createGain();
      nmodGain.gain.value=noiseLevel*0.5;
      nmod.connect(nmodGain);nmodGain.connect(ng.gain);
      nmod.start(t);
      noise.connect(nf);nf.connect(ng);ng.connect(this.bgmGain);
      noise.start(t);
      this.bgmNodes.push(noise,nmod);

      [droneFreq,drone2Freq,droneFreq*2].forEach((f,i)=>{
        const o=ctx.createOscillator();
        const g=ctx.createGain();
        const lpf=ctx.createBiquadFilter();
        o.type="sine";o.frequency.value=f;
        lpf.type="lowpass";lpf.frequency.value=120+i*40;
        const lev=droneLevel/(i+1)/(i+1);
        g.gain.setValueAtTime(0,t);
        g.gain.linearRampToValueAtTime(lev,t+3+i*0.8);
        const mod=ctx.createOscillator();
        mod.frequency.value=0.07+Math.random()*0.06;
        const mg=ctx.createGain();
        mg.gain.value=lev*0.25;
        mod.connect(mg);mg.connect(g.gain);
        mod.start(t+i);
        o.connect(lpf);lpf.connect(g);g.connect(this.bgmGain);
        o.start(t+i*0.5);
        this.bgmNodes.push(o,mod);
      });

      if(kind==="tense"){
        const pulse=ctx.createOscillator();
        const pg=ctx.createGain();
        pulse.type="sine";pulse.frequency.value=droneFreq*0.5;
        const pf=ctx.createBiquadFilter();
        pf.type="lowpass";pf.frequency.value=80;
        pg.gain.setValueAtTime(0,t);
        pg.gain.linearRampToValueAtTime(0.01,t+5);
        const pLFO=ctx.createOscillator();
        pLFO.frequency.value=0.9;
        const pLFOg=ctx.createGain();
        pLFOg.gain.value=0.008;
        pLFO.connect(pLFOg);pLFOg.connect(pg.gain);
        pLFO.start(t);
        pulse.connect(pf);pf.connect(pg);pg.connect(this.bgmGain);
        pulse.start(t);
        this.bgmNodes.push(pulse,pLFO);
      }
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
