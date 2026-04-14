'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <>
      {/* Layer 1: Dark overlay */}
      <motion.div
        className="fixed inset-0 z-[100] bg-[#0a0a0a] pointer-events-none origin-top flex items-center justify-center"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      >
        <motion.div 
          className="text-[#FF6321] font-black tracking-[0.3em] uppercase text-sm"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {pathname === '/' ? 'Unresinous®' : pathname.replace('/', '').toUpperCase()}
        </motion.div>
      </motion.div>
      
      {/* Layer 2: Accent color overlay */}
      <motion.div
        className="fixed inset-0 z-[99] bg-[#FF6321] pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
      />

      {children}
    </>
  );
}
