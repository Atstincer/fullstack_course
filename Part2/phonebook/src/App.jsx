import { useState, useEffect } from 'react'
import contactService from './services/contacts'

const Contacto = ({ contacto }) => {
  return (
    <div>
      {contacto.name} {contacto.number}
    </div>
  )
}

/*{ name: 'Arto Hellas', number: '040-123456', id: 1 },
{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }*/

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  let personsToShow = []

  useEffect(() => {
    console.log('inside useEffect')
    contactService
      .getAll()
      .then(response => {
        console.log('getting the response, inside then')
        setPersons(response.data)
      })
  }, [])

  const onNewNameAdded = (event) => {
    setNewName(event.target.value)
  }

  const onNewPhoneNumberAdded = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const onChangeFilterValue = (event) => {
    setFilterValue(event.target.value)
  }

  function alreadyExist() {
    const names = persons.map(person => person.name.toLowerCase())
    return names.includes(newName.toLowerCase())
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (alreadyExist()) {
      alert(`${newName} is already in the phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newPhoneNumber
    }
    contactService
      .create(newPerson)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewPhoneNumber('')
      })
  }

  function applyFilter() {
    if (filterValue === '') {
      personsToShow = persons
      return
    }
    const filteredPersonsList = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    personsToShow = filteredPersonsList
  }

  applyFilter()

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} onChange={onChangeFilterValue} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={onSubmit} name={newName} onNameChange={onNewNameAdded}
        phone={newPhoneNumber} onPhoneChange={onNewPhoneNumberAdded} />
      <h3>Numbers</h3>
      <Persons personsList={personsToShow} />
    </div>
  )
}

const Persons = ({ personsList }) => {
  return (
    <div>
      {personsList.map(person => <Contacto key={person.name} contacto={person} />)}
    </div>
  )
}

const PersonForm = ({ onSubmit, name, onNameChange, phone, onPhoneChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>number: <input value={phone} onChange={onPhoneChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  )
}

export default App
