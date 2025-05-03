import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const onNewNameAdded = (event) => {
    setNewName(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setPersons(persons.concat({
      name: newName
    }))
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNewNameAdded} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Contacto key={person.name} contacto={person}/>)}      
    </div>
  )
}

const Contacto = ({contacto}) => {
  return (
    <div>
      {contacto.name}
    </div>
  )
}

export default App
