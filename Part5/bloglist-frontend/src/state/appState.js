import { useQuery } from '@tanstack/react-query'
import { useMatch } from 'react-router-dom'
import blogService from '../services/blogs'
import userService from '../services/users'

export const useAppState = () => {
  const blogQuery = useQuery({
    queryFn: blogService.getAll,
    queryKey: ['blogs']
  })

  const usersQuery = useQuery({
    queryFn: userService.getAll,
    queryKey: ['users']
  })

  return { blogQuery, usersQuery }
}

export const useMatchUserDetail = () => {
  const appState = useAppState()
  const matchUserId = useMatch('/users/:id')

  const userToShowDetails =
    matchUserId && !appState.usersQuery.isLoading
      ? appState.usersQuery.data.find(u => u.id === matchUserId.params.id)
      : null

  return userToShowDetails
}

export const useMatchBlogDetail = () => {
  const appState = useAppState()
  const matchBlogId = useMatch('blogs/:id')
  const blogToShowDetails =
    matchBlogId && !appState.blogQuery.isLoading
      ? appState.blogQuery.data.find(b => b.id === matchBlogId.params.id)
      : null
  return blogToShowDetails
}
