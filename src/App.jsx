import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { setNotification, clearNotification } from "./redux/notificationSlice";
import LoginForm from "./components/login_form";
import CreatingBlog from "./components/creating_blog";
import Blog from "./components/Blog";
import { login, logout } from "./redux/userSlice";
import LogOut from "./components/logout";
import Togglable from "./components/toggle";
import { createBlog } from "./redux/blogsAsyncActions";
import store from "./redux/store";
import "./index.css";

const App = () => {
  const dispatch = useDispatch();
  const notificationMessage = useSelector(state => state.notification);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Blogs, setBlogs] = useState([]);
  

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setIsLoggedIn(true);
    }
  }, []);

  const updateBlog = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
    );
  };

  const Notification = () => {
    const notification = useSelector(state => state.notification);
  
    if (notification === null) {
      return null;
    }
  
    return <div className="notification">{notification}</div>;
  };

  const handleSuccessfulLogin = (user) => {
    dispatch(login(user));
    setIsLoggedIn(true);
  };

  const handleSuccessfulLogOut = () => {
    dispatch(logout());
    dispatch(setNotification("Logged out"));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    setIsLoggedIn(false);
  };

  const handleNewBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`));
    dispatch(createBlog(newBlog))
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    blogFormRef.current.toggleVisibility();
  };

  const blogs = useSelector(state => state.blogs);
  const showAllBlogs = () => {
    if (!blogs) {
      return null;
    }
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    return (
      <div>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
        ))}
      </div>
    );
  };
  return (
    <Provider store={store}>
      <div>
        <Notification />
        <h1>Blogs</h1>
        {isLoggedIn && <LogOut onLogout={handleSuccessfulLogOut} />}
        {!isLoggedIn && (
          <Togglable buttonLabel="Login" id="login_click">
            <LoginForm onLogin={handleSuccessfulLogin} />
          </Togglable>
        )}
        {isLoggedIn && (
          <Togglable buttonLabel="New Blog" id="new_blog" ref={blogFormRef}>
            <CreatingBlog onNewBlog={handleNewBlog} />
          </Togglable>
        )}
        {isLoggedIn && showAllBlogs()}
      </div>
    </Provider>
  );
};

export default App;
