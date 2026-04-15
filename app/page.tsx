'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ShoppingBag, User, Heart, ArrowRight, ArrowLeft, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Virtual Scroll Logic: Track progress without physical page height
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 24,
    damping: 26,
    mass: 1.8,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Make each wheel gesture advance the sequence more decisively while
      // still letting the spring provide the premium glide.
      const sensitivity = 700; 
      const current = scrollProgress.get();
      const next = Math.max(0, Math.min(1, current + e.deltaY / sensitivity));
      scrollProgress.set(next);
    };
    
    // Support touch for mobile
    let touchStart = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStart = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      const delta = touchStart - e.touches[0].clientY;
      const current = scrollProgress.get();
      const next = Math.max(0, Math.min(1, current + delta / 650));
      scrollProgress.set(next);
      touchStart = e.touches[0].clientY;
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrollProgress]);

  // Fixed dark navy palette.
  const backgroundColor = '#030814';
  const accentColor = '#84abff';
  const textColor = '#eef3ff';
  const glowColor = 'rgba(132,171,255,0.12)';

  // UI Element Animations
  const priceOpacity = useTransform(smoothProgress, [0, 0.1, 0.4, 0.5, 0.9, 1], [1, 0, 0, 1, 0, 1]);
  const textOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0.2]);

  // Spatial Jacket Animations: launch with the hero jacket locked in the center,
  // then hand off each following jacket from right -> center -> left.
  const sideLaneY = 18;

  const j1X = useTransform(smoothProgress, [0, 0.14, 0.26, 0.38, 0.48, 1], [0, 0, 0, -220, -720, -720]);
  const j1Y = useTransform(smoothProgress, [0, 0.14, 0.26, 0.38, 0.48, 1], [0, -4, -8, 2, sideLaneY, sideLaneY]);
  const j1Opacity = useTransform(smoothProgress, [0, 0.24, 0.40, 0.50, 1], [1, 1, 0.86, 0, 0]);
  const j1Scale = useTransform(smoothProgress, [0, 0.10, 0.22, 0.38, 0.48, 1], [1.02, 1.05, 1.02, 0.94, 0.76, 0.76]);

  const j2X = useTransform(smoothProgress, [0, 0.18, 0.24, 0.32, 0.50, 0.62, 0.72, 1], [840, 840, 620, 0, 0, -80, -720, -720]);
  const j2Y = useTransform(smoothProgress, [0, 0.18, 0.24, 0.32, 0.50, 0.62, 0.72, 1], [sideLaneY, sideLaneY, 10, 0, -4, 0, sideLaneY, sideLaneY]);
  const j2Opacity = useTransform(smoothProgress, [0, 0.18, 0.22, 0.24, 0.32, 0.58, 0.70, 0.76, 1], [0, 0, 0.08, 0.28, 1, 1, 0.82, 0, 0]);
  const j2Scale = useTransform(smoothProgress, [0, 0.18, 0.24, 0.32, 0.42, 0.58, 0.72, 1], [0.56, 0.56, 0.64, 1, 1.04, 1.01, 0.76, 0.76]);

  const j3X = useTransform(smoothProgress, [0, 0.44, 0.50, 0.60, 0.74, 1], [840, 840, 620, 0, 0, 0]);
  const j3Y = useTransform(smoothProgress, [0, 0.44, 0.50, 0.60, 0.74, 1], [sideLaneY, sideLaneY, 10, 0, -6, -4]);
  const j3Opacity = useTransform(smoothProgress, [0, 0.44, 0.48, 0.50, 0.60, 1], [0, 0, 0.08, 0.28, 1, 1]);
  const j3Scale = useTransform(smoothProgress, [0, 0.44, 0.50, 0.60, 0.68, 0.84, 1], [0.56, 0.56, 0.64, 1, 1.04, 1, 1.02]);

  const stageX = useTransform(smoothProgress, [0, 1], [12, -28]);
  const stageY = useTransform(smoothProgress, [0, 0.5, 1], [8, 0, -12]);
  const stageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.02, 1, 0.98]);

  // Cursor light reflection
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 w-full h-screen font-sans transition-colors duration-300 overflow-hidden select-none"
      style={{ 
        backgroundColor, 
        color: textColor,
        '--accent': accentColor,
        '--glow': glowColor,
        '--bg-color': backgroundColor,
      } as any}
    >
      {/* Background Branding Logo */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-hidden">
        <motion.div 
          className="text-[20vw] font-black uppercase tracking-[-0.05em] whitespace-nowrap opacity-[0.03] select-none"
          style={{ x: useTransform(smoothProgress, [0, 1], [0, -200]), rotate: -15 }}
        >
          Unresinous Unresinous Unresinous
        </motion.div>
      </div>

      {/* Primary Ambient Glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] z-0 pointer-events-none opacity-40"
        style={{ background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 60%)` }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] noise z-[1]" />

      {/* Main Single-Screen UI Layer */}
      <div className="relative h-screen w-full flex flex-col p-6 md:p-12 z-10 overflow-hidden">
        
        {/* Header */}
        <header className="flex justify-between items-center w-full z-30 mb-auto relative">
          <div className="font-black text-[18px] tracking-[0.2em] uppercase">
            <span className="text-[var(--accent)]">U</span>NR
          </div>
          
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-6 text-[9px] font-bold uppercase tracking-[0.2em] border border-white/10 rounded-full px-6 py-2 bg-black/20 backdrop-blur-3xl shadow-2xl">
            <Link href="#" className="text-white">Products</Link>
            <Link href="#" className="opacity-40 hover:opacity-100 transition-opacity">About</Link>
            <Link href="#" className="opacity-40 hover:opacity-100 transition-opacity">Category</Link>
            <Link href="#" className="opacity-40 hover:opacity-100 transition-opacity">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.1] transition-all">
              <User size={16} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
              <ShoppingBag size={16} />
            </button>
          </div>
        </header>

        {/* Viewport for Central Animation */}
        <div className="relative flex-1 w-full flex items-center justify-center">
          
          {/* Top-Left Headline */}
          <motion.div className="absolute top-0 left-0 flex flex-col pt-4" style={{ opacity: textOpacity }}>
             <h1 className="text-[32px] md:text-[42px] lg:text-[52px] leading-[0.9] tracking-tighter font-medium text-white">
              Wear your<br/>
              <span className="text-white/40">Style with</span><br/>
              <motion.span 
                className="font-black"
                style={{ color: accentColor }}
              >
                Comfort
              </motion.span>
            </h1>
          </motion.div>

          {/* Spatial Models Area */}
          <motion.div
            className="relative z-10 flex h-[62vh] w-full items-center justify-center"
            style={{ x: stageX, y: stageY, scale: stageScale }}
          >
            <div className="pointer-events-none absolute inset-x-[8%] bottom-[7%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="pointer-events-none absolute inset-x-[16%] bottom-[11%] h-[22vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_36%,transparent_72%)] blur-3xl" />
            
            {/* Jacket 1 (Primary -> Out) */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center px-8 pb-6 pt-2 md:px-10"
              style={{ x: j1X, y: j1Y, opacity: j1Opacity, scale: j1Scale, rotateX: mousePosition.y * -0.1, rotateY: mousePosition.x * 0.1 }}
            >
              <div className="relative flex h-full w-full max-w-[780px] items-center justify-center">
                <Image src="/jacket-1.png" alt="J1" width={800} height={800} className="h-full w-auto object-contain drop-shadow-[0_80px_120px_rgba(0,0,0,0.45)]" priority />
              </div>
            </motion.div>

            {/* Jacket 2 (Right -> Center -> Left) */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center px-8 pb-6 pt-2 md:px-10"
              style={{ x: j2X, y: j2Y, opacity: j2Opacity, scale: j2Scale, rotateX: mousePosition.y * -0.1, rotateY: mousePosition.x * 0.1 }}
            >
              <div className="relative flex h-full w-full max-w-[780px] items-center justify-center">
                <Image src="/jacket-2.png" alt="J2" width={800} height={800} className="h-full w-auto object-contain drop-shadow-[0_80px_120px_rgba(0,0,0,0.45)]" />
              </div>
            </motion.div>

            {/* Jacket 3 (Right -> Center -> Left) */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center px-8 pb-6 pt-2 md:px-10"
              style={{ x: j3X, y: j3Y, opacity: j3Opacity, scale: j3Scale, rotateX: mousePosition.y * -0.1, rotateY: mousePosition.x * 0.1 }}
            >
              <div className="relative flex h-full w-full max-w-[780px] items-center justify-center">
                <Image src="/jacket-3.png" alt="J3" width={800} height={800} className="h-full w-auto object-contain drop-shadow-[0_80px_120px_rgba(0,0,0,0.45)]" />
              </div>
            </motion.div>

            {/* Platform Glow */}
            <motion.div 
              className="absolute bottom-[3%] h-[124px] w-[560px] opacity-20 blur-[88px]"
              style={{ background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 72%)`, scaleX: 1.8 }}
            />
          </motion.div>

          {/* Size Selector */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex flex-col gap-3 z-30">
            {['39', '40', '41'].map((size) => (
              <button key={size} className={`w-9 h-9 rounded-full border flex items-center justify-center text-[10px] font-black transition-all ${size === '40' ? 'bg-white text-black border-white' : 'border-white/20 text-white/40 bg-black/20'}`}>{size}</button>
            ))}
          </div>

          {/* Price & Bottom Nav */}
          <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-4 flex flex-col items-center gap-1" style={{ opacity: priceOpacity }}>
            <span className="text-[18px] md:text-[24px] font-black tracking-tighter text-white drop-shadow-2xl">$100.00</span>
            <div className="px-5 py-0.5 glass rounded-full text-[8px] uppercase tracking-[0.4em] font-black text-[var(--accent)] bg-black/20">Tax Incl.</div>
          </motion.div>

          {/* Right Bottom Commerce & Heart */}
          <div className="absolute bottom-0 right-0 flex items-center gap-4 pointer-events-auto">
             <div className="flex flex-col items-end gap-2 mb-6">
                <div className="flex items-center gap-4 glass rounded-full px-3 py-1.5 bg-black/20">
                   <button className="opacity-40 hover:opacity-100"><ArrowLeft size={12}/></button>
                   <div className="w-[1px] h-3 bg-white/10" />
                   <button className="opacity-40 hover:opacity-100"><ArrowRight size={12}/></button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-4 glass rounded-full px-4 py-2 text-[10px] font-bold bg-black/20">
                    <Minus size={12} className="opacity-40"/><span className="select-none">2</span><Plus size={12} className="opacity-40"/>
                  </div>
                  <button className="bg-white text-black px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl">Buy Now</button>
                </div>
             </div>
             <button className="w-12 h-12 md:w-14 md:h-14 glass rounded-2xl flex items-center justify-center mb-6 bg-black/20 lg:mr-4">
                <Heart size={20} className="text-white/20 hover:text-red-500 transition-colors" />
             </button>
          </div>

          <div className="absolute bottom-0 left-0 max-w-[280px] pb-6">
             <p className="text-[11px] leading-relaxed font-medium text-white/30">
               Meticulously crafted through bio-based insulation and structural textiles engineered for the next generation of pioneers.
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
