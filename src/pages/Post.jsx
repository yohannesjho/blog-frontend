import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { postId } = useParams();
  const [blog, setBlog] = useState({});
  const [commentToggle, setCommentToggle] = useState(false);
  const [comment, setComment] = useState({ content: "", id: postId });

  useEffect(() => {
    const fetchBlog = async () => {
      const token = localStorage.getItem("user");
      try {
        const response = await fetch(
          `http://localhost:5000/api/posts/getpost/${postId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching the blog!");
        }

        const data = await response.json();
        console.log(data.post[0]);
        setBlog(data.post[0]);
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    };

    fetchBlog();
  }, [postId]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("user");

    try {
      const response = await fetch(
        "http://localhost:5000/api/comments/createcomment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`, // Token for authentication
          },
          body: JSON.stringify(comment),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Comment submitted:", data);
      alert("Comment added successfully!");
    } catch (error) {
      console.error("Failed to submit comment:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-full md:w-3/4 lg:w-1/2 mx-auto space-y-8">
        <h2 className="md:text-xl lg:text-2xl font-bold text-center">
          {blog.title}
        </h2>
        <div>
          <img
            src={blog.img_url}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
        <p>{blog.content}</p>
        <div>
          <button
            className="bg-yellow-500 hover:bg-yellow-400 px-2 py-1 rounded-md"
            onClick={() => setCommentToggle(!commentToggle)}
          >
            Add comment
          </button>
          <textarea
            name="content"
            value={comment.content}
            onChange={handleOnChange}
            className={`${
              commentToggle
                ? "block w-full border-2 outline-none px-2 py-1 my-4"
                : "hidden"
            }`}
            aria-label="Add your comment"
            placeholder="Write your comment here..."
          ></textarea>
          <button
            onClick={handleCommentSubmit}
            className={`${
              commentToggle
                ? "block bg-green-500 hover:bg-green-400 px-2 py-1 rounded-md"
                : "hidden"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
