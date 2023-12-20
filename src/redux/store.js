import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import notificationReducer from './notificationSlice' 
import blogReducer from '../services/blogSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    blogs: blogReducer 
  },
})

export default store