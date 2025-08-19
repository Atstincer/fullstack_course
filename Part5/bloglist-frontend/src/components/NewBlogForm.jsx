import { useState } from 'react'

const NewBlogForm = ({ addNewBlog, cancel }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    await addNewBlog({ title, author, url })
    clearFields()
  }

  const handleCancel = event => {
    event.preventDefault()
    clearFields()
    cancel()
  }

  return (
    <div className="my-3">
      <h2>create new</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="row mb-2">
          <label htmlFor="inputTitle" className="col-sm-2 col-form-label">
            title:
          </label>
          <div className="col-sm-8">
            <input
              value={title}
              type="text"
              className="form-control"
              id="inputTitle"
              onChange={event => {
                setTitle(event.target.value)
              }}
            />
          </div>
        </div>
        <div className="row mb-2">
          <label htmlFor="inputAuthor" className="col-sm-2 col-form-label">
            author:
          </label>
          <div className="col-sm-8">
            <input
              value={author}
              type="text"
              className="form-control"
              id="inputAuthor"
              onChange={event => {
                setAuthor(event.target.value)
              }}
            />
          </div>
        </div>
        <div className="row mb-2">
          <label htmlFor="inputUrl" className="col-sm-2 col-form-label">
            url:
          </label>
          <div className="col-sm-8">
            <input
              value={url}
              type="text"
              className="form-control"
              id="inputUrl"
              onChange={event => {
                setUrl(event.target.value)
              }}
            />
          </div>
        </div>
        <div className="row my-2">
          <div className="col-sm-10 d-flex justify-content-end">
            <button className="btn btn-outline-primary btn-sm" type="submit">
              create
            </button>
            <button
              className="btn btn-outline-secondary btn-sm mx-2"
              onClick={handleCancel}>
              cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewBlogForm
