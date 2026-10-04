import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Sparkles, Send, Check, Hand } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FinalCelebration = ({ partnerName = "Arjun", onRestart }) => {
  const [stage, setStage] = useState('cake');
  const [isCandleOn, setIsCandleOn] = useState(true);
  const [showSmoke, setShowSmoke] = useState(false);
  const [cutX, setCutX] = useState(0);
  const [isCut, setIsCut] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const crackerRef = useRef(null);
  const OWNER_EMAIL = "arjunbday12@gmail.com";

  useEffect(() => {
    crackerRef.current = new Audio('/cracker.mp3');
    crackerRef.current.volume = 0.9;
  }, []);

  const blowCandle = () => {
    setTimeout(() => { setIsCandleOn(false); setShowSmoke(true); }, 500);
    setTimeout(() => setStage('wish'), 1000);
    setTimeout(() => setStage('cut'), 3200);
  };

  const handleDrag = (e, info) => {
    if(isCut) return;
    const newX = Math.max(0, Math.min(200, cutX + info.delta.x));
    setCutX(newX);
    if(newX > 160){
      setIsCut(true);
      if(crackerRef.current){ crackerRef.current.currentTime=0; crackerRef.current.play().catch(()=>{}); }
      if(navigator.vibrate) navigator.vibrate(100);
      confetti({ particleCount: 180, spread: 120, origin:{x:0.5, y:0.6}, colors:['#e11d48','#fb7185','#fbbf24','#fff'], scalar:1.2 });
      setStage('blast');
      setTimeout(()=> setStage('birthday'), 700);
      setTimeout(()=> setStage('done'), 2700);
    }
  };

  const submitWish = async (e) => {
    e.preventDefault();
    if(!name.trim() ||!message.trim()) return;
    setSending(true);
    try{
      const fd = new FormData();
      fd.append('name', name);
      fd.append('message', message);
      fd.append('_subject', `Wish for Arjun from ${name}`);
      fd.append('_captcha', 'false');
      fd.append('_template', 'box');
      await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, { method:'POST', body: fd });
      setSent(true); setName(''); setMessage('');
      confetti({ particleCount: 80, origin:{y:0.7} });
    }catch{}
    finally{ setSending(false); }
  };

  const CakeView = ({ cut = false }) => (
    <div className="relative flex flex-col items-center justify-center mx-auto">
      <div className="absolute -bottom-2 w-[260px] h-[24px] bg-black/60 rounded-[50%] blur-[8px]" />
      <div className="absolute -bottom-1 w-[250px] h-[22px] bg-gradient-to-b from-zinc-200 to-zinc-400 rounded-[50%] border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]" />
      <div className="absolute bottom-0 w-[260px] h-[16px] bg-zinc-300 rounded-[50%]" />
      <div className="relative z-10">
      {!cut && (
        <div className="flex flex-col items-center -mb-2 z-30 relative">
          {isCandleOn && (
            <motion.div
              animate={{scaleY:[1,1.3,1], opacity:[0.9,1,0.9]}}
              transition={{repeat:Infinity, duration:0.2}}
              className="w-[8px] h-[16px] bg-gradient-to-b from-yellow-100 to-orange-400 rounded-full shadow-[0_0_15px_#facc15] -mb-1 blur-[0.3px]"
            />
          )}
          {showSmoke && <motion.div initial={{opacity:0, y:0}} animate={{opacity:[0,0.3,0], y:-40, x:5}} transition={{duration:2}} className="absolute -top-2 w-[2px] h-8 bg-gradient-to-t from-white/30 to-transparent blur-[0.5px] rounded-full" />}
          <div className="w-[10px] h-[36px] bg-gradient-to-b from-white to-rose-100 rounded-full border border-black/10 shadow-sm relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-black/10" />
          </div>
        </div>
      )}
      {!cut? (
        <div className="flex flex-col items-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]">
          <div className="w-[150px] h-[26px] bg-[#FFFBF2] rounded-t-[16px] relative z-30 shadow-[inset_0_1px_0_white] border border-black/5">
            <div className="absolute -bottom-2 left-0 w-full flex justify-around px-1">
              {[...Array(8)].map((_,i)=>(
                <div key={i} className="w-[12px] h-[14px] bg-[#FFFBF2] rounded-b-full border-x border-b border-black/[0.04] shadow-sm" style={{height: 10 + Math.random()*6}} />
              ))}
            </div>
            <div className="absolute top-[8px] left-0 w-full flex justify-center gap-2">
              <div className="w-1 h-1 bg-rose-400 rounded-full" />
              <div className="w-1 h-1 bg-yellow-400 rounded-full" />
              <div className="w-1 h-1 bg-rose-400 rounded-full" />
            </div>
          </div>
          <div className="w-[150px] h-[36px] bg-gradient-to-b from-[#ff6b8a] to-[#e11d48] relative -mt-1 z-20 border-x border-black/10 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
            <div className="w-[80%] h-[6px] bg-white/30 rounded-full blur-[0.5px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-white/15" />
            <span className="relative text-white text-[10px] font-bold tracking-widest drop-shadow">♥ ARJUN ♥</span>
          </div>
          <div className="w-[165px] h-[14px] bg-[#FFFBF2] z-10 border-x border-black/5 shadow-[inset_0_1px_0_white]" />
          <div className="w-[180px] h-[42px] bg-gradient-to-b from-[#be123c] to-[#881337] rounded-b-[14px] relative z-10 border-x border-b border-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_16px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-white/10 rounded-b-[14px]" />
          </div>
          <div className="w-[210px] h-[48px] bg-gradient-to-b from-[#4c0519] to-[#2a0210] -mt-1 rounded-b-[20px] relative border-x border-b border-black/30 shadow-[0_12px_20px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-white/5 rounded-b-[20px]" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-[12px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]">
          <motion.div initial={{x:0}} animate={{x:-12, rotate:-3}} transition={{type:'spring', stiffness:200, damping:15}} className="flex flex-col items-end">
            <div className="w-[75px] h-[26px] bg-[#FFFBF2] rounded-tl-[16px] rounded-tr-[2px] border border-black/5 relative"><div className="absolute -bottom-1 left-2 w-2 h-2 bg-[#FFFBF2] rounded-b-full" /></div>
            <div className="w-[75px] h-[36px] bg-gradient-to-b from-[#ff6b8a] to-[#e11d48] border-l border-black/10" />
            <div className="w-[85px] h-[14px] bg-[#FFFBF2] border-l border-black/5 -ml-[10px]" />
            <div className="w-[90px] h-[42px] bg-gradient-to-b from-[#be123c] to-[#881337] rounded-bl-[14px] -ml-[15px] border-l border-b border-black/20" />
            <div className="w-[105px] h-[48px] bg-gradient-to-b from-[#4c0519] to-[#2a0210] rounded-bl-[20px] -mt-1 -ml-[30px] border-l border-b border-black/30" />
          </motion.div>
          <motion.div initial={{x:0}} animate={{x:12, rotate:3}} transition={{type:'spring', stiffness:200, damping:15}} className="flex flex-col items-start relative">
            <div className="absolute left-0 top-0 w-[14px] h-full bg-[#5a1a2a] z-20 rounded-r-[2px] border-r border-black/20">
              <div className="w-full h-[26px] bg-[#fff8e8]" />
              <div className="w-full h-[36px] bg-[#ffb3c6] mt-0" />
              <div className="w-full h-[14px] bg-[#fff8e8]" />
              <div className="w-full h-[42px] bg-[#8b1a32]" />
              <div className="w-full h-[48px] bg-[#3a0a16] rounded-br-[20px]" />
            </div>
            <div className="w-[75px] h-[26px] bg-[#FFFBF2] rounded-tr-[16px] rounded-tl-[2px] border border-black/5 ml-[14px]" />
            <div className="w-[75px] h-[36px] bg-gradient-to-b from-[#ff6b8a] to-[#e11d48] ml-[14px] flex items-center justify-center"><span className="text-white text-[8px] font-bold">ARJUN</span></div>
            <div className="w-[85px] h-[14px] bg-[#FFFBF2] border-r border-black/5 ml-[14px]" />
            <div className="w-[90px] h-[42px] bg-gradient-to-b from-[#be123c] to-[#881337] rounded-br-[14px] ml-[14px] border-r border-b border-black/20" />
            <div className="w-[105px] h-[48px] bg-gradient-to-b from-[#4c0519] to-[#2a0210] rounded-br-[20px] -mt-1 ml-[14px] border-r border-b border-black/30" />
          </motion.div>
        </div>
      )}
      </div>
    </div>
  );

  return (
    <section className="min-h-screen w-full bg-[#08050a] flex flex-col items-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(225,29,72,0.14),transparent_60%)]" />
      <div className="z-10 w-full max-w-[380px] mt-8 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {stage==='cake' && (
            <motion.div key="cake" exit={{opacity:0}} className="flex flex-col items-center w-full">
              <p className="text-[10px] tracking-[0.5em] text-white/30 mb-1">HAPPY BIRTHDAY</p>
              <h1 className="font-serif text-[46px] font-black text-white mb-10 text-center leading-none">{partnerName}</h1>
              <div className="relative w-full flex justify-center"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-rose-600/10 rounded-full blur-[35px]" /><CakeView cut={false} /></div>
              <motion.button whileTap={{scale:0.97}} onClick={blowCandle} className="mt-14 px-8 py-3 rounded-full bg-white text-black font-bold text-[11px] flex gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"><Wind className="h-4 w-4" /> BLOW CANDLE</motion.button>
            </motion.div>
          )}
          {stage==='wish' && (
            <motion.div key="wish" initial={{opacity:0}} animate={{opacity:1}} className="text-center mt-32">
              <div className="text-5xl">🎂</div><h2 className="font-serif text-2xl text-white mt-3">Make a wish</h2><p className="text-white/30 text-[11px] tracking-widest mt-1">CLOSE YOUR EYES</p>
            </motion.div>
          )}
          {stage==='cut' && (
            <motion.div key="cut" initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} className="mt-6 w-full">
              <div className="rounded-[28px] bg-[#121014]/90 border border-white/10 p-5 backdrop-blur-xl">
                <h3 className="text-white text-center font-serif text-lg">Cut The Cake</h3>
                <div className="mt-2 flex justify-center"><span className="text-[10px] text-amber-200/60 bg-amber-500/10 px-3 py-1 rounded-full flex items-center gap-1"><Hand className="h-3 w-3" /> Slide knife to right →</span></div>
                <div className="relative h-[240px] rounded-[20px] bg-white/[0.03] border border-white/5 mt-4 flex flex-col items-center justify-center overflow-hidden">
                  <div className="scale-90"><CakeView cut={false} /></div>
                  <div className="absolute bottom-4 left-4 right-4 h-1.5 bg-white/10 rounded-full"><div className="h-full bg-rose-400 rounded-full transition-all" style={{width:`${(cutX/200)*100}%`}} /></div>
                  <motion.div drag="x" dragConstraints={{left:0, right:200}} dragElastic={0} dragMomentum={false} onDrag={handleDrag} style={{x:cutX}} className="absolute bottom-[18px] left-0 z-20 cursor-grab active:cursor-grabbing">
                    <div className="w-[56px] h-[32px] bg-gradient-to-b from-zinc-100 to-zinc-300 rounded-r-[14px] flex items-center justify-center text-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/30">🔪</div>
                  </motion.div>
                  <motion.div className="absolute bottom-[52px] w-[2px] h-[100px] bg-white/30 shadow-[0_0_8px_white]" style={{left: `${22 + (cutX/200)*190}px`}} />
                </div>
              </div>
            </motion.div>
          )}
          {stage==='blast' && <motion.div key="blast" initial={{scale:0}} animate={{scale:1}} className="mt-40 text-center text-6xl">💥</motion.div>}
          {stage==='birthday' && (
            <motion.div key="birthday" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mt-10 flex flex-col items-center w-full">
              <motion.h1 initial={{scale:0.8}} animate={{scale:1}} className="font-serif text-[44px] font-black text-center leading-[0.9] text-white">Happy<br/><span className="text-rose-300">Birthday</span><br/>{partnerName}!</motion.h1>
              <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.3}} className="mt-10 flex justify-center w-full"><CakeView cut={true} /></motion.div>
              <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}} className="text-white/40 text-xs mt-8 tracking-widest">CAKE CUT SUCCESSFULLY 🎉</motion.p>
            </motion.div>
          )}
          {stage==='done' && (
            <motion.div key="done" initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} className="mt-4 space-y-3 w-full">
              <div className="rounded-[24px] bg-white/[0.04] border border-white/10 p-5 text-center backdrop-blur">
                <div className="w-12 h-12 mx-auto rounded-full bg-white flex items-center justify-center mb-2"><Sparkles className="w-5 h-5 text-rose-600" /></div>
                <h2 className="font-serif text-xl font-bold text-white">Celebration Completed!</h2>
                <div className="mt-4 flex justify-center scale-[0.75]"><CakeView cut={true} /></div>
              </div>
              <div className="rounded-[24px] bg-[#0f0d10] border border-white/10 p-5">
                <h3 className="text-white font-serif text-[15px]">Send Wish to Arjun</h3>
                <p className="text-white/30 text-[10px] mt-1">Your wish will be sent to Arjun</p>
                {!sent? (
                  <form onSubmit={submitWish} className="mt-4 space-y-3">
                    <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-rose-500/50" />
                    <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Write Your Heartiest Wish For Arjun" required rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none resize-none focus:border-rose-500/50" />
                    <button disabled={sending} type="submit" className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-[12px] flex justify-center gap-2 disabled:opacity-50"><Send className="h-4 w-4" /> {sending? 'SENDING...' : 'SEND WISH TO ARJUN'}</button>
                  </form>
                ) : (
                  <div className="mt-3 text-center py-6 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="w-10 h-10 mx-auto rounded-full bg-green-500 flex items-center justify-center"><Check className="w-5 h-5 text-white" /></div>
                    <p className="text-white font-bold mt-3 text-sm">Wish Sent!</p>
                    <p className="text-white/40 text-xs mt-1">Your wish has been sent to Arjun 💌</p>
                    <button onClick={()=>setSent(false)} className="mt-3 text-[11px] underline text-white/50">Send another</button>
                  </div>
                )}
                <div className="mt-4 flex gap-2"><button onClick={()=>{setStage('cake'); setIsCandleOn(true); setCutX(0); setIsCut(false); setSent(false);}} className="flex-1 py-2.5 rounded-full bg-white/5 text-white/40 text-[11px]">Replay Cake</button><button onClick={onRestart} className="flex-1 py-2.5 rounded-full bg-white text-black font-bold text-[11px]">Replay Journey</button></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
