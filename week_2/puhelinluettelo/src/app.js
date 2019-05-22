import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Persons = ({plist, fString}) => (
    <>
    {
        plist.filter(p => {
            const name = p.name.toLowerCase()
            const f = fString.toLowerCase()
            return name.includes(f)
        }).map(p => <p key={p.name}>{p.name} {p.number}</p>)
    }
    </>
)

const PFilter = ({value, onChange}) => (
    <form>
        <div>
            rajaa näytettäviä <input value={value} onChange={onChange}/>
        </div>
    </form>
)

const PForm = ({name, naChange, number, nuChange, onSubmit}) => (
    <form onSubmit={onSubmit}>
        <div>
            nimi: <input value={name} onChange={naChange}/>
        </div>
        <div>
            numero: <input value={number} onChange={nuChange}/>
        </div>
        <div>
            <button type="submit">lisää</button>
        </div>
    </form>
)

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState("")
    const [ fString, setFilter ] = useState("")

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => setPersons(response.data))
    }, [])

    const handleNameChange = event => setNewName(event.target.value)
    const handleNumberChange = event => setNewNumber(event.target.value)
    const handleFilterChange = event => setFilter(event.target.value)

    const addPerson = event => {
        event.preventDefault()
        if (persons.some(p => p.name === newName)) {
            alert(`${newName} on jo olemassa!`)
        }
        else {
            setPersons(persons.concat({name: newName, number: newNumber}))
        }
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <PFilter value={fString} onChange={handleFilterChange}/>
            <h3>Lisää uusi</h3>
            <PForm 
                name={newName} naChange={handleNameChange}
                number={newNumber} nuChange={handleNumberChange}
                onSubmit={addPerson}
            />
            <h3>Numerot</h3>
            <Persons plist={persons} fString={fString} />
        </div>
    )
}

export default App