import React, { useState, useEffect } from 'react';
import people from "./services/people"
import './index.css'

const deller = (p, setter, plist, noteSetter, errorSetter) => () => {
    if (!window.confirm(`Poistetaanko ${p.name}?`)) {
        return
    }
    people.removePerson(p.id)
        .then(() => {
            errorSetter(false)
            noteSetter(`${p.name} poistettiin!`)
            setTimeout(() => {
                noteSetter(null)
            }, 5000)
        })
        .catch(error => {
            errorSetter(true)
            noteSetter(`${p.name} poisto epäonnistui!`)
            setTimeout(() => {
                noteSetter(null)
            }, 5000)
        })
    setter(plist.filter(o => o.id !== p.id))
}

const Persons = ({plist, fString, setter, noteSetter, errorSetter}) => (
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
                    <td> <button onClick={deller(p, setter, plist, noteSetter, errorSetter)}>poista</button></td>
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

const Notification = ({ message, nClass }) => {
    if (message === null) {
        return null
    }
  
    return (
        <div className={nClass}>
            {message}
        </div>
    )
}

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState("")
    const [ fString, setFilter ] = useState("")
    const [ notificationString, setNotification ] = useState(null)
    const [ isError, setError ] = useState(false)

    useEffect(() => {
        people.getAll()
            .then(plist => setPersons(plist))
            .catch(error => {
                setError(true)
                setNotification("Henkilöiden hakeminen epäonnistui!")
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
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
                    .then(updatedPerson => {
                        setError(false)
                        setNotification(`${newName} numero päivitetty!`)
                        setTimeout(() => {
                            setNotification(null)
                        })
                        setPersons(persons.map(pm => pm.id === p.id ? updatedPerson : pm))
                    })
                    .catch(error => {
                        setError(true)
                        setNotification(`${newName} numero päivitetty!`)
                        setPersons(persons.filter(pm => pm.id !== p.id))
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    })
            }            
        }
        else {
            const person = {
                name: newName,
                number: newNumber
            }
            people.postNew(person)
                .then(person => {
                    setPersons(persons.concat(person))
                    setError(false)
                    setNotification(`${person.name} lisätty!`)
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
                .catch(error => {
                    setError(true)
                    setNotification(`Lisäys epäonnistui!`)
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
            })
        }
    }

    return (
        <div>
            {isError ? <Notification message={notificationString} nClass="error" /> : null}
            <h2>Puhelinluettelo</h2>
            {!isError ? <Notification message={notificationString} nClass="notification"/> : null}
            <PFilter value={fString} onChange={handleFilterChange}/>
            <h3>Lisää uusi</h3>
            <PForm 
                name={newName} naChange={handleNameChange}
                number={newNumber} nuChange={handleNumberChange}
                onSubmit={addPerson}
            />
            <h3>Numerot</h3>
            <Persons plist={persons} fString={fString} setter={setPersons} 
                     noteSetter={setNotification} errorSetter={setError} />
        </div>
    )
}

export default App