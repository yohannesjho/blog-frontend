import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
  const { postId } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [commentToggle, setCommentToggle] = useState(false);
  const [comment, setComment] = useState({ content: "", postId });
  const [users, setUsers] = useState({});
  const [deleteComment, setDeleteComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState({ content: "" });
  const [editComment, setEditComment] = useState(false)
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch blog details
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true); // Start loading
      const token = localStorage.getItem("user");
      try {
        const response = await fetch(
          `https://blog-app-backend-s93x.onrender.com/api/posts/getpost/${postId}`,
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
        setBlog(data.post[0]);
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBlog();
  }, [postId]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("user");
      try {
        const response = await fetch(
          `https://blog-app-backend-s93x.onrender.com/api/comments/getcomments/${postId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching comments!");
        }

        const data = await response.json();
        setComments(data.comment);
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    };

    fetchComments();
  }, [postId, deleteComment, editComment, comments]);

  // Fetch user data for each comment
  useEffect(() => {
    comments.forEach((comment) => {
      fetchUser(comment.user_id);
    });
  }, [comments]);

  const fetchUser = async (id) => {
    if (!users[id]) {
      const user = await getUser(id);
      setUsers((prevUsers) => ({ ...prevUsers, [id]: user }));
    }
  };

  const getUser = async (id) => {
    const response = await fetch(`https://blog-app-backend-s93x.onrender.com/api/users/user/${id}`);
    const data = await response.json();

    if (response.ok) {
      return data.user[0];
    }
    return null;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("user");

    try {
      const response = await fetch(
        "https://blog-app-backend-s93x.onrender.com/api/comments/createcomment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(comment),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message)
      }
      else {
        toast.success("Comment added successfully!")

        setComments((prevComments) => [...prevComments, data.comment]);
      }
    } catch (error) {
      toast.error("Failed to submit comment:")

    }
  };

  const handleDeleteComment = async (id) => {
    const token = localStorage.getItem("user");
    try {
      const response = await fetch(
        `https://blog-app-backend-s93x.onrender.com/api/comments/deletecomment/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json()
      if (!response.ok) {
        toast.error(data.message); // Show error toast
      } else {
        toast.success("Comment deleted successfully!");
        setDeleteComment((prev) => !prev);
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setEditedContent({ ...editedContent, [name]: value });
  };

  const handleSendEditedComment = async (id) => {
    const token = localStorage.getItem("user");

    try {
      const response = await fetch(
        `https://blog-app-backend-s93x.onrender.com/api/comments/updatecomment/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedContent),
        }
      );
      const data = await response.json()
      if (!response.ok) {
        toast.error(data.message)

      } else {
        setEditComment(prev => !prev)
        toast.success("Comment updated successfully!")

        setEditCommentId(null); // Close the edit input after update
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (<div className="flex justify-center items-center py-12">
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto space-y-8">
          <div>
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
          </div>
          <div className=" ">
            {comments.map((comment) => (

              <div
                key={comment.id}
                className="flex justify-between items-center mt-4"
              >
                <div className="bg-gray-100 w-full p-4 rounded-lg shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2 text-gray-600">
                    <span className="block">
                      <span className="font-semibold">:- </span>
                      {users[comment.user_id]?.username || "Loading..."}
                    </span>
                    <span className="block">
                      <span className="font-semibold">-</span>
                      {users[comment.user_id]?.role || "Loading..."}
                    </span>
                  </div>
                  <p className="text-gray-800 text-lg font-medium">
                    {comment.content}
                  </p>
                  <p className="text-gray-500 text-sm mt-4">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="bg-red-500 text-white rounded-lg text-sm hover:bg-red-300 duration-300 px-2 py-1"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        setEditCommentId((prev) =>
                          prev === comment.id ? null : comment.id
                        )
                      }
                      className="bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-300 duration-300 px-2 py-1"
                    >
                      Edit
                    </button>
                  </div>
                  {editCommentId === comment.id && (
                    <>
                      <textarea
                        name="content"
                        value={editedContent.content || comment.content}
                        onChange={handleCommentChange}
                        className="block outline-none rounded-md mt-2 w-full p-2 border border-gray-300"
                      ></textarea>
                      <button
                        onClick={() => handleSendEditedComment(comment.id)}
                        className="bg-green-500 hover:bg-green-300 duration-300 px-1 rounded-md text-white mt-2"
                      >
                        Send
                      </button>
                    </>
                  )}
                </div>
              </div>

            ))}
          </div>
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
              className={`${commentToggle
                ? "block w-full border-2 outline-none px-2 py-1 my-4"
                : "hidden"
                }`}
              aria-label="Add your comment"
              placeholder="Write your comment here..."
            ></textarea>
            <button
              onClick={handleCommentSubmit}
              className={`${commentToggle
                ? "block bg-green-500 hover:bg-green-400 px-2 py-1 rounded-md"
                : "hidden"
                }`}
            >
              Send
            </button>
          </div>
        </div>
      </div>)}
    </div>

  );
};

export default Post;
