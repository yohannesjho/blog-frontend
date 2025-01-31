import React from 'react'

const HeroSection = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between gap-6 w-full max-w-3xl mx-auto px-4">
  <div className="space-y-6 text-center md:text-left">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Untitled Blog</h2>
    <div className="border-2 rounded-2xl flex items-center w-full max-w-md mx-auto md:mx-0">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-3 py-2 flex-1 outline-none w-full"
      />
      <button className="bg-black text-white px-4 py-2 rounded-2xl whitespace-nowrap">
        Subscribe
      </button>
    </div>
  </div>
  <div className="text-center md:text-left">
    <p className="text-gray-400 text-sm sm:text-base">
      New product features, the latest in <br className="hidden md:block" />
      technology, solutions, and updates.
    </p>
  </div>
</div>

    )
}

export default HeroSection