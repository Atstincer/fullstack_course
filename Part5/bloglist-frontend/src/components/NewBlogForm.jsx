import { useState } from 'react'

const NewBlogForm = ({ addNewBlog, onCancel }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleOnSubmit = async event => {
    event.preventDefault()
    await addNewBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleOnCancel = event => {
    event.preventDefault()
    setTitle('')
    setAuthor('')
    setUrl('')
    onCancel()
  }

  return (
    <div className="standard-form">
      <h2>Create new</h2>
      <form className="mb-2" onSubmit={handleOnSubmit}>
        <div>
          title:{' '}
          <input
            type="text"
            value={title}
            name="Title"
            placeholder="writte yor title hear"
            onChange={event => {
              setTitle(event.target.value)
            }}
          />
        </div>
        <div className="my-1">
          author:{' '}
          <input
            type="text"
            value={author}
            name="Author"
            placeholder="writte the author hear"
            onChange={event => {
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
            onChange={event => {
              setUrl(event.target.value)
            }}
          />
        </div>
        <div className="my-2">
          <button className="btn btn-outline-primary" type="submit">
            create
          </button>
          <button
            className="btn btn-outline-secondary mx-2"
            onClick={handleOnCancel}>
            calcel
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewBlogForm
