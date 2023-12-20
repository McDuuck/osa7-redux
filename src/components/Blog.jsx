import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Togglable from "./toggle";
import "../index.css";
import { updateBlogLikes, delete_Blog } from "../redux/blogsAsyncActions";
import { setNotification, clearNotification } from "../redux/notificationSlice";


const Blog = ({ blog, updateBlog }) => {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(
    window.localStorage.getItem("loggedBlogappUser"),
  );

  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser.id);
    }
  }
  , [currentUser]);
  
  

  const deleteBlog = async (blog, updateBlog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(setNotification(`you deleted ${blog.title}`));
        dispatch(delete_Blog(blog.id));
        updateBlog(blog.id);
        setTimeout(() => {
          dispatch(clearNotification());
        }, 5000)
      } catch (error) {
        console.log(error);
      }
    }
  };

  const likeBlog = async (blog) => {
    try {
      dispatch(setNotification(`you liked ${blog.title}`));
      dispatch(updateBlogLikes(blog));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="blogStyle">
      {blog.title} by {blog.author}
      <Togglable buttonLabel="view" id="view_button">
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button
            onClick={() => likeBlog(blog, updateBlog)}
            id="like_button"
            className="like_class"
          >
            like
          </button>
        </p>
        <p>{blog.author}</p>
        {userId && blog.user && userId === blog.user.id && (
          <button onClick={() => deleteBlog(blog, updateBlog)}>remove</button>
        )}
      </Togglable>
    </div>
  );
};

export default Blog;
