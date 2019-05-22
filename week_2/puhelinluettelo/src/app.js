import React, { useState } from 'react';

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
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState("")
    const [ fString, setFilter ] = useState("")

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