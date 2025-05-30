import { useState } from 'react'

const NewBlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    await addNewBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ handleOnSubmit }>
        <div>title: <input
          type='text'
          value={title}
          name='Title'
          onChange={(event) => { setTitle(event.target.value) }} />
        </div>
        <div>author: <input
          type='text'
          value={author}
          name='Author'
          onChange={(event) => { setAuthor(event.target.value) }} />
        <div>url: <input type='text' name='Url' value={url} onChange={(event) => { setUrl(event.target.value) }} /></div>
        <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default NewBlogForm