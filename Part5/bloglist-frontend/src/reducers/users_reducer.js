import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    addBlogToUser(state, action) {
      const blog = action.payload
      //console.log('in user_reducer blog:', blog)
      const users = state.map(u => {
        //console.log('user:', u)
        //console.log('blog', blog)
        //console.log('u.id === blog.user.id:', u.id === blog.user.id)
        const user_returned =
          u.id === blog.user.id
            ? {
                ...u,
                blogs: u.blogs.concat({
                  author: blog.author,
                  id: blog.id,
                  title: blog.title,
                  url: blog.url
                })
              }
            : u
        //console.log('user returned', user_returned)
        return user_returned
      })
      //console.log('users:', users)
      return users
    },
    removeBlogFromUser(state, action) {
      const blog = action.payload
      return state.map(u =>
        u.id === blog.user.id
          ? { ...u, blogs: u.blogs.filter(b => b.id !== blog.id) }
          : u
      )
    }
  }
})

export const initialiceUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export const { setUsers, addBlogToUser, removeBlogFromUser } =
  usersSlice.actions
export default usersSlice.reducer
