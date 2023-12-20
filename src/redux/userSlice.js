import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {}, 
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    user_loginId: (state, action) => {
      state.userId = action.payload;
    },
  },
})

export const { login, logout, user_loginId } = userSlice.actions
export default userSlice.reducer