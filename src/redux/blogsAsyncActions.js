import { addBlog, updateLikes, removeBlog } from "../services/blogSlice";

export const createBlog = (newObject) => {
    return async (dispatch) => {
      
  
      try {
        dispatch(addBlog(newObject));
      } catch (error) {
        console.error('Error creating blog:', error);
        dispatch(deleteBlog(newObject.id));
      }
    };
  };

  export const updateBlogLikes = (blog) => {
    return async (dispatch) => {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
      try {
        dispatch(updateLikes({ id: blog.id, newLikes: updatedBlog.likes }));
      } catch (error) {
        console.error('Error updating blog:', error);
      }
    };
  };

  export const delete_Blog = (id) => {
    return async (dispatch) => {
      try {
        dispatch(removeBlog(id));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    };
  }


export default createBlog;