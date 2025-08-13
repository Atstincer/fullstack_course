import blogService from '../services/blogs'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const AddCommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()

  const addCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: blogEdited => {
      //console.log('onSucces blogEdited:', blogEdited)
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map(b => (b.id === blogEdited.id ? blogEdited : b))
      )
      setComment('')
    },
    onError: error => {
      window.alert('an error has occur')
      console.log(error)
    }
  })

  const handleSubmit = async event => {
    event.preventDefault()
    //console.log('in handleSubmit:', blogId, comment)
    comment
      ? addCommentMutation.mutate({ blogId, comment })
      : window.alert('you should writte a comment')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => {
          setComment(target.value)
        }}
      />
      <button type="submit" className="btn btn-outline-primary ms-2 btn-sm">
        add comment
      </button>
    </form>
  )
}

export default AddCommentForm
