import React from "react";
import { useParams } from "react-router-dom";
import data from "../data";

const Post = () => {
  const { postId } = useParams();

  const post = data.find((item) => item.id == postId); // Find the matching post by ID

  return (
    <div>
      {post ? ( // Check if a matching post is found
        <div className="w-3/4 mx-auto">
          <div className="  h-60 ">
            <img className="w-full h-full object-cover" src={post.img} alt={post.title} />
          </div>
          <h2 className="text-center">{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ) : (
        <p>Post not found</p> // Fallback message if no matching post is found
      )}
    </div>
  );
};

export default Post;
