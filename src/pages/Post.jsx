import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data";

const Post = () => {
  const { postId } = useParams();
  const [blog, setBlog] = useState({})

  useEffect(() => {
    const fetchBlog = async () => {
         const token = localStorage.getItem('user')
         const response = await fetch(`http://localhost:5000/api/posts/getpost/${postId}`,
          {
              headers: {
                  'authorization': `Bearer ${token}`
              }
          }
      )

     

        if (!response.ok) {
            alert("error fetching a blog!")

        }
        else {

            const data = await response.json()
            console.log(data.post[0])
            setBlog(data.post[0])
             
        }
    }

    fetchBlog()
}, [postId])
 
  return (
    <div className='flex justify-center items-center py-12'>
            <div className='w-full md:w-3/4 lg:w-1/2 mx-auto space-y-8'>
                <h2 className='md:text-xl lg:text-2xl font-bold text-center'>{blog.title}</h2>
                <div>
                    <img src={blog.img_url} alt={blog.title} className='w-full h-full object-cover' />
                </div>
                <p>{blog.content}</p>
            </div>
        </div>
  );
};

export default Post;
