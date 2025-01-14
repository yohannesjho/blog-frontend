import React, { useState } from 'react'
import data from '../data'
import { ArrowUpRight, SquareArrowOutUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const cards = () => {
    const [category, setCategory] = useState("")
    return (
        <div>
            <div className='border-b-2 p-2 md:flex space-x-6 text-gray-600  hidden text-sm lg:text-base'>
                <button className='hover:text-black hover:underline font-semibold duration-300' onClick={() => setCategory("")}>View All</button>
                <button className='hover:text-black hover:underline font-semibold duration-300' onClick={() => setCategory("design")}>Design</button>
                <button className='hover:text-black hover:underline font-semibold duration-300' onClick={() => setCategory("product")}>Product</button>
                <button className='hover:text-black hover:underline font-semibold duration-300' onClick={() => setCategory("development")}>Development</button>
                <button className='hover:text-black hover:underline font-semibold duration-300' onClick={() => setCategory("ai")}>AI</button>
                <button className='hover:text-black hover:underline font-semibold duration-300' onClick={() => setCategory("trends")}>trends</button>
                <button className='hover:text-black hover:underline font-semibold duration-300' onClick={() => setCategory("managment")}>Managment</button>
                <button className='hover:text-black hover:underline font-semibold duration-300' onClick={() => setCategory("interviews")}>Interviews</button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12'>
                {data.map((data) => (
                    <div key={data.id}>
                        <div className='h-28 w-52 lg:h-44 lg:w-72 border'>
                            <img className='h-full w-full object-cover' src={data.img} alt='image' />
                        </div>

                        <h2 className='font-semibold text-sm md:text-xl'>{data.title}</h2>
                        <p className='text-gray-500 text-xs md:text-base'>{data.description}</p>
                        <Link id={data.id} to={`/post/${data.id}`} className='flex cursor-pointer'>

                            <button className='text-black'>Read post</button>
                            <ArrowUpRight />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default cards