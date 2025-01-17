import React, { useEffect, useState } from 'react'
import data from '../data'
import { ArrowUpRight, SquareArrowOutUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const cards = () => {
    const [category, setCategory] = useState("")

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchBlogs = async () => {
             
            try {
                const response = await fetch('http://localhost:5000/api/posts/getallposts')

                
                if (!response.ok) {
                    alert("couldnot fetch blogs")
                    return;
                }
                else {
                    const data = await response.json()
                    
                    setBlogs(data.posts)
                }



            } catch (error) {
                console.log("error fetching blogs", error)
            }

        }

        fetchBlogs()
    }, [])
    
    const fiveBlogs = blogs.slice(0,5)
    
    console.log(fiveBlogs)
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
                {fiveBlogs.map((blog) => (
                    <div key={blog.id}>
                        <div className='h-28 w-52 lg:h-44 lg:w-72 border'>
                            <img className='h-full w-full object-cover' src={blog.img_url} alt='image' />
                        </div>

                        <h2 className='font-semibold text-sm md:text-xl'>{blog.title}</h2>
                        <p className='text-gray-500 text-xs md:text-base line-clamp-2'>{blog.content}</p>
                        <Link  to={`/post/${blog.id}`} className='flex cursor-pointer'>

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