import { useState } from 'react'


const Contacto = ({contacto}) => {
  return (
    <div>
      {contacto.name} {contacto.number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  let personsToShow = []

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
    if(alreadyExist()) {
      alert(`${newName} is already in the phonebook`)
      return
    }
    setPersons(persons.concat({
      name: newName,
      number: newPhoneNumber
    }))
    setNewName('')
    setNewPhoneNumber('')
  }

  function applyFilter() {
    if(filterValue === ''){
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
      <div>
        filter shown with <input value={filterValue} onChange={onChangeFilterValue}/>
      </div>
      <form onSubmit={onSubmit}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={onNewNameAdded} />
        </div>
        <div>number: <input value={newPhoneNumber} onChange={onNewPhoneNumberAdded}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <Contacto key={person.name} contacto={person}/>)}      
    </div>
  )
}

export default App
