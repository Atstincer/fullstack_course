import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../querys'
import Select from 'react-select'

const AuthorEditForm = ({ authors }) => {
  const [optionSelected, setOptionSelected] = useState(null)
  const [year, setYear] = useState('')

  const options = authors.map((a) => ({ value: a, label: a.name }))

  //console.log('options', options)

  const [addBirthYear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error),
  })

  useEffect(() => {
    optionSelected
      ? setYear(optionSelected.value.born ? optionSelected.value.born : '')
      : setYear('')
  }, [optionSelected])

  const handleSubmit = (event) => {
    event.preventDefault()
    //console.log('submitting...')
    if (optionSelected)
      addBirthYear({
        variables: {
          name: optionSelected.value.name,
          setBornTo: year === '' ? null : parseInt(year),
        },
      })
    setOptionSelected(null)
  }

  return (
    <div>
      <h4>Set birthyear</h4>
      <form onSubmit={handleSubmit}>
        <Select
          value={optionSelected}
          styles={{ control: (base) => ({ ...base, marginBottom: 10 }) }}
          options={options}
          onChange={setOptionSelected}
        />
        <div style={{ marginBottom: 10 }}>
          born
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

AuthorEditForm.propTypes = {
  authors: PropTypes.array,
}

export default AuthorEditForm
