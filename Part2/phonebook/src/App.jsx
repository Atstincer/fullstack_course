import { useState } from 'react'


const Contacto = ({contacto}) => {
  return (
    <div>
      {contacto.name} {contacto.phone}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      phone: '6111111111'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const onNewNameAdded = (event) => {
    setNewName(event.target.value)
  }

  const onNewPhoneNumberAdded = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  function alreadyExist() {
    const names = persons.map(person => person.name.toLowerCase())
    //1console.log("names",names)
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
      phone: newPhoneNumber
    }))
    setNewName('')
    setNewPhoneNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNewNameAdded} />
        </div>
        <div>number: <input value={newPhoneNumber} onChange={onNewPhoneNumberAdded}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Contacto key={person.name} contacto={person}/>)}      
    </div>
  )
}

export default App
