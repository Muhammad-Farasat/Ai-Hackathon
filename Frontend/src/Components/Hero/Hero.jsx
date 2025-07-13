import React from 'react';
import main_video from '../../../public/hero.mp4'




function Hero() {
  return (
    <>
      <section className='w-full h-[100vh] relative overflow-hidden'>
       
        {/* Video background */}
        <div className='w-full h-full -z-50 absolute top-0 left-0'>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className='w-full h-full object-cover'
          >
            <source src={main_video} type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <img src="/winter-sale-fallback.jpg" alt="Winter Sale Background" />
          </video>
        </div>
        

        <div className='bg-[#0e0e0e] opacity-65 w-full h-full flex flex-col justify-center items-center font-Rajdhani' />



        {/* Overlay and content */}
        {/* <div className='bg-[#0e0e0e86] w-full h-full flex flex-col justify-center items-center font-Rajdhani'>
          <h1 className='text-5xl text-[#f4f4f4] max-sm:text-3xl'>
            Winter
            <span className='text-[#00d4ff] text-7xl max-sm:text-4xl'> Sale</span> upto 
            <span className='text-[#00d4ff] text-7xl max-sm:text-4xl'> 50%</span>
          </h1>
          <h2 className='text-6xl text-[#f4f4f4] font-Rajdhani tracking-wider max-sm:text-2xl'>
            All Collection Available
          </h2>
        </div>
     */}
      </section>
    </>
  )
}

export default Hero;