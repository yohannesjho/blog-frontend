import React from 'react'

const HeroSection = () => {
    return (
        <div className='flex justify-between'>
            <div className='space-y-10'>
                <h2 className='text-lg md:text-2xl lg:text-3xl font-bold text-center'>Untitled Blog</h2>
                <div className='border-2 rounded-2xl w-72 flex justify-between'>
                    <input type='email' placeholder='Enter your email' className='  px-2 py-1 outline-none' />
                    <button className='bg-black text-white px-2 py-1 border rounded-2xl'>Subscribe</button>
                </div>
            </div>
            <div>
                <p className='text-gray-400'>New product features, the latest in <br /> technology, solutions, and updates</p>
            </div>
        </div>
    )
}

export default HeroSection