"use client";

import { ConvexClientProvider } from "@/providers/ConvexProvider";

export default function Home() {
  return (
    <ConvexClientProvider>
      <div className='min-h-screen bg-neutral-950'>
        
      </div>
    </ConvexClientProvider>
  );
}
