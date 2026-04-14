'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Studio() {
  return (
    <motion.div 
      className="min-h-screen bg-[#0a0a0a] text-white font-sans p-10 flex flex-col relative overflow-hidden"
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-0" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      <header className="flex justify-between items-center w-full z-30">
        <Link href="/" className="font-black text-[14px] tracking-[0.3em] uppercase hover:text-[#FF6321] transition-colors">
          Unresinous®
        </Link>
        <Link href="/" className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] opacity-60 hover:text-[#FF6321] transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center z-10">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#FF6321] font-semibold mb-4">Process</span>
        <h1 className="text-[60px] md:text-[80px] leading-[0.85] font-extrabold tracking-[-0.04em] mb-6">
          THE STUDIO
        </h1>
        <p className="text-[14px] leading-[1.6] opacity-50 max-w-[400px]">
          Inside our research and development facility. Where materials meet imagination.
        </p>
      </div>
    </motion.div>
  );
}
