import React, { useState, useEffect } from 'react';
import people from "./services/people"

const deller = (p, setter, plist) => () => {
    if (!window.confirm(`Poistetaanko ${p.name}?`)) {
        return
    }
    people.removePerson(p.id)
    setter(plist.filter(o => o.id !== p.id))
}

const Persons = ({plist, fString, setter}) => (
    <table><tbody>
        {
            plist.filter(p => {
                const name = p.name.toLowerCase()
                const f = fString.toLowerCase()
                return name.includes(f)
            }).map(p => 
                <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.number}</td>
                    <td> <button onClick={deller(p, setter, plist)}>poista</button></td>
                </tr>)
        }
    </tbody></table>
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
        people.getAll()
            .then(plist => setPersons(plist))
            .catch(error => alert("Henkilöiden hakeminen epäonnistui!"))
    }, [])

    const handleNameChange = event => setNewName(event.target.value)
    const handleNumberChange = event => setNewNumber(event.target.value)
    const handleFilterChange = event => setFilter(event.target.value)

    const addPerson = event => {
        event.preventDefault()
        const p = persons.find(p => p.name === newName)
        if (p) {
            if (window.confirm(`${newName} on jo olemassa! Päivitetäänkö numero?`)) {
                const np = {...p, number: newNumber}
                people.updateNumber(p.id, np)
                    .then(updatedPerson => setPersons(persons.map(pm => pm.id === p.id ? updatedPerson : pm)))
                    .catch(error => setPersons(persons.filter(pm => pm.id !== p.id)))
            }            
        }
        else {
            const person = {
                name: newName,
                number: newNumber
            }
            people.postNew(person)
                .then(person => setPersons(persons.concat(person)))
                .catch(error => alert("Lisääminen epäonnistui!"))
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
            <Persons plist={persons} fString={fString} setter={setPersons}/>
        </div>
    )
}

export default App