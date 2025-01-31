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
  const [editComment, setEditComment] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
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
        toast.error("something went, please try again!")
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [postId]);

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
        toast.error("something went, please try again!")
      }
    };

    fetchComments();
  }, [postId, deleteComment, editComment, comments]);

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
        toast.error(data.message);
      } else {
        toast.success("Comment added successfully!");
        setComments((prevComments) => [...prevComments, data.comment]);
      }
    } catch (error) {
      toast.error("Failed to submit comment:");
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
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success("Comment deleted successfully!");
        setDeleteComment((prev) => !prev);
      }
    } catch (error) {
      toast.error("something went, please try again!")
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
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
      } else {
        setEditComment((prev) => !prev);
        toast.success("Comment updated successfully!");
        setEditCommentId(null);
      }
    } catch (error) {
      toast.error("something went, please try again!")
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 w-full   lg:w-3/4 xl:w-2/3">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-center">{blog.title}</h2>
            <div className="relative w-full overflow-hidden h-96">
              <img
                src={blog.img_url}
                alt={blog.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <p className="mt-4 text-base text-gray-800">{blog.content}</p>
          </div>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="w-full">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 text-gray-600">
                    <span className="font-semibold">
                      {users[comment.user_id]?.username || "Loading..."}
                    </span>
                    <span className="text-sm text-gray-500">
                      {users[comment.user_id]?.role || "Loading..."}
                    </span>
                  </div>
                  <p className="text-gray-800 text-lg font-medium mt-2">{comment.content}</p>
                  <p className="text-gray-500 text-sm mt-4">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                  <div className="flex space-x-2 mt-2">
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
                    <div className="mt-4">
                      <textarea
                        name="content"
                        value={editedContent.content || comment.content}
                        onChange={handleCommentChange}
                        className="block outline-none rounded-md mt-2 w-full p-2 border border-gray-300"
                      ></textarea>
                      <button
                        onClick={() => handleSendEditedComment(comment.id)}
                        className="bg-green-500 hover:bg-green-300 duration-300 px-2 py-1 mt-2 text-white rounded-md"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-md"
              onClick={() => setCommentToggle(!commentToggle)}
            >
              Add Comment
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
                  ? "block bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md"
                  : "hidden"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
