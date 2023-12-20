import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";
import "../index.css";
import createBlog from "../redux/blogsAsyncActions";
import { useSelector } from "react-redux";
import { user_loginId } from "../redux/userSlice";

const CreatingBlog = (props) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setStatus] = useState(null);

  const user = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const blogObject = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      author: author,
      url: url,
      likes: 0,
      user: {
        id: user.userId,
        username: user.username,
        name: user.name,
      },
      
    };
    try {
      createBlog(blogObject);
      props.onNewBlog(blogObject);
      setAuthor("");
      setTitle("");
      setUrl("");
    } catch (exception) {
      setTimeout(() => {
        setErrorMessage(null);
        setStatus(null);
      }, 5000);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        author:
        <input
          type="text"
          id="author"
          value={author}
          name="Author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        title:
        <input
          type="text"
          id="title"
          value={title}
          name="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        url:
        <input
          type="text"
          id="url"
          value={url}
          name="Url"
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <button type="submit" id="create">
          create
        </button>
      </form>
    </div>
  );
};

export default CreatingBlog;
