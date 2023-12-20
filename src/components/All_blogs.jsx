import { useState, useEffect } from "react";
import Blog from "./Blog";
import Togglable from "./toggle";
import { setBlogs } from "../services/blogSlice";

const AllBlogs = () => {
  return (
    <div>
      {setBlogs.map((blog) => (
        <Togglable key={blog.id} buttonLabel="view">
          <Blog blog={blog} id="all_blogs" />
        </Togglable>
      ))}
      <p>Hello</p>
    </div>
  );

};
export default AllBlogs;
