"use client";

import { motion } from "motion/react";
import DashboardImage from "@/assets/images/dashboard-preview.webp";
import Image from "next/image";

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0 }}
    >
      <div className='w-[calc(100vw-32px)] md:w-[1160px]'>
        <div className='p-2 rounded-2xl shadow-2xl bg-white/50'>
          <Image
            src={DashboardImage}
            alt='Dashboard Preview'
            width={1160}
            height={700}
            className='object-cover w-full h-full rounded-xl shadow-lg'
          />
        </div>
      </div>
    </motion.div>
  );
}
