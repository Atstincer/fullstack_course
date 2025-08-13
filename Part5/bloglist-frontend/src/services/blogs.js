import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  //console.log('token en setToken:', token)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

const deleteBlog = async blog => {
  //console.log('token en deleteBlog function:', token)
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data.sort((a, b) => {
    return b.likes - a.likes
  })
}

const addComment = async ({ blogId, comment }) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, {
    comment
  })
  return response.data
}

export default { getAll, create, setToken, update, deleteBlog, addComment }
