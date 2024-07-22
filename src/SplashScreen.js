import React from 'react'

const SplashScreen = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-white min-h-screen '>
        <img alt='' src='/logo.png' className='w-[250px] h-auto ' />
        <h1 className='font-bold text-[18px] '>Smart GPS Tracker</h1>
    </div>
  )
}

export default SplashScreen