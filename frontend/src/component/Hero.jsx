import React from 'react'
import {assets , } from '../assets/assets.js'

const Hero = () => {
  return (
    <div className='flex flex-col  items-start justify-center px-6
       md:px-16 lg:px-24 xl:px-32 text-white
       bg-[url("/src/assets/Hero.jpg")] bg-no-repeat bg-cover bg-center h-screen'
     >
     <p className='inline-block bg-white/20 backdrop-blur-md text-white text-xs md:text-sm 
        px-4 py-1.5 rounded-full mt-16 shadow-md border border-white/20 tracking-wide'
      >
        Smart Task Management
     </p>

     <h1 className='font-playfair text-2xl md:text-4xl lg:text-[48px] 
                 leading-tight md:leading-[52px] font-extrabold max-w-2xl mt-6 
               text-white drop-shadow-lg'
         >
         Simplify Workflows and Maximize Team Productivity
    </h1>

     <p className='max-w-xl mt-4 text-sm md:text-lg 
           text-white/80 leading-relaxed tracking-wide'
        >
       Efficiently assign tasks, track real-time progress, and ensure timely completion. Empower your team with a streamlined system designed for clarity, accountability, and performance.
     </p>

     
    </div>
  )
}

export default Hero
