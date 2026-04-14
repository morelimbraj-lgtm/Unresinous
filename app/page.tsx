'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ShoppingBag, User, Heart, ArrowRight, ArrowLeft, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollLottiePlayer from '@/components/ScrollLottiePlayer';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Virtual Scroll Logic: Track progress without physical page height
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Sensitivity factor
      const sensitivity = 1500; 
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
      const next = Math.max(0, Math.min(1, current + delta / 800));
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

  // Background color transitions (Aligned with spatial movement)
  const backgroundColor = useTransform(smoothProgress, [0, 0.4, 0.6, 1], ['#1a0b02', '#021a1a', '#021a1a', '#11021a']);
  const accentColor = useTransform(smoothProgress, [0, 0.4, 0.6, 1], ['#ff6321', '#00f0ff', '#00f0ff', '#b500ff']);
  const textColor = useTransform(smoothProgress, [0, 0.4, 0.6, 1], ['#FFFFFF', '#F5F5F7', '#F5F5F7', '#FFFFFF']);
  const glowColor = useTransform(smoothProgress, [0, 0.4, 1], ['rgba(255,255,255,0.05)', 'rgba(0,240,255,0.03)', 'rgba(181,0,255,0.03)']);

  // UI Element Animations
  const priceOpacity = useTransform(smoothProgress, [0, 0.1, 0.4, 0.5, 0.9, 1], [1, 0, 0, 1, 0, 1]);
  const textOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0.2]);

  // Spatial Jacket Animations (Corner to Center)
  // Jacket 1: Center -> Down
  const j1Y = useTransform(smoothProgress, [0, 0.4], [0, 500]);
  const j1Opacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const j1Scale = useTransform(smoothProgress, [0, 0.4], [1, 0.6]);

  // Jacket 2: Top-Right -> Center -> Down
  const j2X = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [400, 0, 0, 0]);
  const j2Y = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [-400, 0, 0, 500]);
  const j2Opacity = useTransform(smoothProgress, [0, 0.1, 0.4, 0.6, 0.9], [0.3, 1, 1, 1, 0]);
  const j2Scale = useTransform(smoothProgress, [0, 0.4], [0.3, 1]);

  // Jacket 3: Bottom-Left -> Center
  const j3X = useTransform(smoothProgress, [0, 0.6, 1], [-400, -400, 0]);
  const j3Y = useTransform(smoothProgress, [0, 0.6, 1], [400, 400, 0]);
  const j3Opacity = useTransform(smoothProgress, [0, 0.6, 0.7, 1], [0.2, 0.2, 1, 1]);
  const j3Scale = useTransform(smoothProgress, [0, 0.6, 1], [0.3, 0.3, 1]);

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
        style={{ background: useTransform(glowColor, (color) => `radial-gradient(circle at 50% 50%, ${color.replace('0.03', '0.2')} 0%, transparent 60%)`) }}
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
                style={{ color: useTransform(smoothProgress, [0, 0.5], ['#ffffff', '#ff6321']) }}
              >
                Comfort
              </motion.span>
            </h1>
          </motion.div>

          {/* Spatial Models Area */}
          <div className="relative w-full h-[60vh] flex items-center justify-center z-10">
            
            {/* Jacket 1 (Primary -> Out) */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center p-8"
              style={{ y: j1Y, opacity: j1Opacity, scale: j1Scale, rotateX: mousePosition.y * -0.1, rotateY: mousePosition.x * 0.1 }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/jacket-1.png" alt="J1" width={800} height={800} className="h-full w-auto object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.5)]" priority />
            </motion.div>

            {/* Jacket 2 (Top Right -> Center -> Out) */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center p-8"
              style={{ x: j2X, y: j2Y, opacity: j2Opacity, scale: j2Scale, rotateX: mousePosition.y * -0.1, rotateY: mousePosition.x * 0.1 }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Image src="/jacket-2.png" alt="J2" width={800} height={800} className="h-full w-auto object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.5)]" />
            </motion.div>

            {/* Jacket 3 (Bottom Left -> Center) */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center p-8"
              style={{ x: j3X, y: j3Y, opacity: j3Opacity, scale: j3Scale, rotateX: mousePosition.y * -0.1, rotateY: mousePosition.x * 0.1 }}
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Image src="/jacket-3.png" alt="J3" width={800} height={800} className="h-full w-auto object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.5)]" />
            </motion.div>

            {/* Platform Glow */}
            <motion.div 
              className="absolute bottom-0 w-[500px] h-[100px] blur-[80px] opacity-10"
              style={{ background: useTransform(glowColor, (color) => `radial-gradient(ellipse at center, ${color.replace('0.03', '0.6')} 0%, transparent 70%)`), scaleX: 2 }}
            />
          </div>

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
