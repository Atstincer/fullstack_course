import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import {
  setSuccessMesage,
  setErrorMesage,
  removeNotification
} from './notification_reducer'
import { addBlogToUser, removeBlogFromUser } from './users_reducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
    addLike(state, action) {
      return state.map(b =>
        b.id === action.payload ? { ...b, likes: b.likes + 1 } : b
      )
    },
    addComment(state, action) {
      const blogUpdated = action.payload
      return state.map(b => (b.id === blogUpdated.id ? blogUpdated : b))
    }
  }
})

export const initialiceBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    //console.log('blogs in DB', blogs)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      const created = await blogService.create(blog)
      //console.log('new blog', blog)
      //console.log('in blog_reducer created', created)
      dispatch(addBlog(created))
      dispatch(addBlogToUser(created))
      dispatch(
        setSuccessMesage(`a new blog ${created.title} by ${created.author}`)
      )
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    } catch (error) {
      //console.log('error', error.response.data.error)
      dispatch(setErrorMesage(error.response.data.error))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    }
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    const conf = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (conf) {
      await blogService.deleteBlog(blog)
      dispatch(removeBlog(blog.id))
      dispatch(removeBlogFromUser(blog))
      dispatch(setSuccessMesage('Blog deleted successfully'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    }
  }
}

export const addLikeToBlog = blog => {
  return async dispatch => {
    try {
      const blogToUpdate = { ...blog, likes: blog.likes + 1 }
      const updatedBlog = await blogService.update(blogToUpdate)
      dispatch(addLike(blog.id))
      dispatch(
        setSuccessMesage(
          `${updatedBlog.title} has now ${updatedBlog.likes} likes`
        )
      )
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    } catch (error) {
      console.log(error)
      dispatch(setErrorMesage(error.response.data.error))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    }
  }
}

export const addCommentToBlog = (blogId, comment, callBack) => {
  return async dispatch => {
    try {
      const blogUpdated = await blogService.addComment(blogId, comment)
      dispatch(addComment(blogUpdated))
      dispatch(setSuccessMesage('comment added successfuly'))
      callBack()
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    } catch (error) {
      console.log(error)
      dispatch(setErrorMesage(error.response.data.error))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    }
  }
}

export const { setBlogs, addBlog, removeBlog, addLike, addComment } =
  blogsSlice.actions
export default blogsSlice.reducer
