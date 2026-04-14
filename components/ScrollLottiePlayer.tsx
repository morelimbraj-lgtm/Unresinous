'use client';

import { motion as m, MotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ScrollLottiePlayerProps {
  scrollYProgress: MotionValue<number>;
}

export default function ScrollLottiePlayer({ scrollYProgress }: ScrollLottiePlayerProps) {
  // Map scroll progress to different jacket angles
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.5, 0.7, 1], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <m.div 
      className="w-full h-full flex items-center justify-center relative translate-y-[-2%]"
      animate={{ 
        y: [0, -10, 0],
        rotateX: [0, 2, 0],
        rotateY: [0, -2, 0]
      }}
      transition={{ 
        duration: 12, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Layered images for a smooth cross-fade scroll effect */}
        <m.div className="absolute inset-0 flex items-center justify-center p-2 md:p-4" style={{ opacity: opacity1 }}>
          <Image
            src="/jacket-1.png"
            alt="Jacket Front"
            width={1000}
            height={1000}
            className="h-full w-auto object-contain drop-shadow-[0_60px_120px_rgba(0,0,0,0.7)]"
            priority
          />
        </m.div>

        <m.div className="absolute inset-0 flex items-center justify-center p-2 md:p-4" style={{ opacity: opacity2 }}>
          <Image
            src="/jacket-2.png"
            alt="Jacket Side"
            width={1000}
            height={1000}
            className="h-full w-auto object-contain drop-shadow-[0_60px_120px_rgba(0,0,0,0.7)]"
          />
        </m.div>

        <m.div className="absolute inset-0 flex items-center justify-center p-2 md:p-4" style={{ opacity: opacity3 }}>
          <Image
            src="/jacket-3.png"
            alt="Jacket Back"
            width={1000}
            height={1000}
            className="h-full w-auto object-contain drop-shadow-[0_60px_120px_rgba(0,0,0,0.7)]"
          />
        </m.div>
      </div>

      {/* Visual background glow mask to blend edges */}
      <div className="absolute inset-x-0 bottom-[-10%] h-1/4 bg-gradient-to-t from-[var(--bg-color)] to-transparent pointer-events-none z-10" />
    </m.div>
  );
}
