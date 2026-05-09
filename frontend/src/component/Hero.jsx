import React, { useEffect, useState } from 'react'
import {assets , } from '../assets/assets.js'

const Hero = () => {

  const headingText = " Simplify Workflows and Maximize Team Productivity";
  const paragraphText =   `Efficiently assign tasks, track real-time progress, 
                           and ensure timely completion. Empower your team with a streamlined system designed for clarity, 
                           accountability, and performance.
                          `
                          
  const [hText , setHText] = useState("");
  const [pText , setPText] = useState("");
  const [hIndex , setHIndex] = useState(0);
  const [pIndex , setPIndex] = useState(0);

  useEffect(()=>{
     if(hIndex < headingText.length){
       const timeout = setTimeout(()=>{
           setHText((prev) => (prev + headingText[hIndex]));
           setHIndex((prev) => prev + 1);
       },80);

       return () => clearInterval(timeout);
    }
  },[hText , hIndex]);

  
  useEffect(() => {
    if(pIndex < paragraphText.length){
       const timeout = setTimeout(() => {
           setPText((prev) => (prev + paragraphText[pIndex]));
           setPIndex((prev) => (prev + 1));
       },80);

       return () => clearInterval(timeout);
    }
  } , [pText , pIndex]);


  useEffect(() => {
     if(hIndex === headingText.length && pIndex === paragraphText.length){
        const restart  = setTimeout(()=>{
           setHText("");
           setPText("");
           setHIndex(0);
           setPIndex(0);
        },2500);

        return () => clearInterval(restart);
     }
  },[hIndex , pIndex , headingText.length , paragraphText.length]);

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

     <h1 className='text-[##FFFFFF] text-3xl md:text-4xl font-bold mb-4
                    whitespace-normal text-center px-4 border-r-4 border-white pr-2 animate-pulse
                     mt-5
                    '
                    style={{
                        textShadow: "0px 2px 10px rgba(0,0,0,0.8)"
                    }}
         >
         {hText}
    </h1>

     <p className='text-[##D1D5DB] text-base md:text-lg
                    max-w-xl
                    text-center
                    px-4 sm:px-6
                    border-r-2 border-white pr-1
                    animate-pulse
                    '
                    style={{
                       textShadow: "0px 2px 10px rgba(0,0,0,0.8)"
                    }}
        >
        {pText}
     </p>

     
    </div>
  )
}

export default Hero
