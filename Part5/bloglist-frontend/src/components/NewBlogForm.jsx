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
      <form onSubmit={handleOnSubmit}>
        <div>
          title:{' '}
          <input
            type="text"
            value={title}
            name="Title"
            placeholder="writte yor title hear"
            onChange={(event) => {
              setTitle(event.target.value)
            }}
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            value={author}
            name="Author"
            placeholder="writte the author hear"
            onChange={(event) => {
              setAuthor(event.target.value)
            }}
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            name="Url"
            placeholder="writte the url hear"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value)
            }}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
