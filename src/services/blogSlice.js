import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [
        {
            id: 1,
            title: 'HTML is easy',
            author: 'Minä',
            url: 'google.com',
            likes: 5,
            user: {
              username: 'ilmo',
              name: 'Ilmoooo',
              id: 1,
            },
          },
            {
                id: 2,
                title: 'Browser can execute only Javascript',
                author: 'Minä toinen',
                url: 'google.com',
                likes: 10,
                user: {
                  username: 'ilmo2',
                  name: 'Ilmo2',
                  id: 2,
                },
            },
    ],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload
        },
        addBlog: (state, action) => {
            return [...state, action.payload]
        },
        updateLikes: (state, action) => {
            const { id, newLikes } = action.payload
            return state.map(blog => (blog.id === id ? { ...blog, likes: newLikes } : blog))
          },
        removeBlog: (state, action) => {
            return state.filter((blog) => blog.id !== action.payload)
        },
    },
})

export const { setBlogs, addBlog, updateLikes, removeBlog } = blogSlice.actions
export default blogSlice.reducer