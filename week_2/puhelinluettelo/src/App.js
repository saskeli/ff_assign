import React, { useState, useEffect } from 'react'
import './index.css'
import peopleService from './services/people'

const changeHandlerFactory = (fn) => (event) => fn(event.target.value)

const Person = ({name, number, deller}) => <tr><td>{name}</td><td>{number}</td><td><button onClick={deller}>delete</button></td></tr>

const Numbers = ({people, filterString}) => {
    const toShow = people.filter(p => 
        `${p.name.toLowerCase()} ${p.number.toLowerCase()}`.includes(filterString.toLowerCase()))
    return (<>
        <h2>Numbers</h2>
        <table><tbody>
            {toShow.map(p => <Person key={p.id} name={p.name} number={p.number} deller={p.deller}/>)}
        </tbody></table>
    </>)
}

const Adder = props => <>
    <h2>Add new</h2>
    <form onSubmit={props.onSubmit}>
        name: <input value={props.name} onChange={props.nameChanged} /><br />
        number: <input value={props.number} onChange={props.numberChanged} /><br />
        <button type="submit">add</button>
    </form>
</>

const defaultMessage = {
    message: "Phonebook",
    nClass: ""
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const [notification, setMessage] = useState(defaultMessage)

    const notify = (message, nClass) => {
        setMessage({message, nClass})
        setTimeout(() => setMessage(defaultMessage), 3000)
    }

    const addPerson = (event) => {
        event.preventDefault()
        let nper = persons.find(p => p.name === newName)
        if (nper && window.confirm(`Update number for ${nper.name}?`)) {
            nper.number = newNum
            peopleService.updatePerson(nper)
                .then(per => {
                    notify(`Updated number for ${nper.name}!`, "success")
                    setPersons(persons.map(p => p.id === per.id ? per : p))
                })
                .catch(err => notify(`Error updating number for ${nper.name}!`, "error"))
        } else {
            nper = { name: newName, id: persons.length + 1, number: newNum }
            peopleService.addPerson(nper)
                .then(per => {
                    notify(`Added ${nper.name}!`, "success")
                    setPersons(persons.concat(per))
                })
                .catch(err => notify(`Error adding ${nper.name}!`, "error"))
        }
        setNewName('')
        setNewNum('')
    }

    useEffect(() => {
        peopleService.getAll()
            .then(people => setPersons(people))
            .catch(err => notify("Error retrieving names from server", "error"))
    }, [])

    const dellers = persons.map(p => {
        return {
            ...p,
            deller: (e) => {
                e.preventDefault()
                if (window.confirm(`Really remove ${p.name}?`)) {
                    peopleService.delPerson(p.id)
                        .then(resp => {
                            notify(`Deleted ${p.name}`, "success")
                            setPersons(persons.filter(pp => pp.id !== p.id))
                        })
                        .catch(err => notify(`Error removing ${p.name}!`, "error"))
                }
            }
        }
    })

    return (
        <div>
            <h1 class={notification.nClass}>{notification.message}</h1>
            Filter <input value={filterValue} onChange={changeHandlerFactory(setFilterValue)} />
            <Adder 
                onSubmit={addPerson} 
                name={newName} 
                number={newNum} 
                nameChanged={changeHandlerFactory(setNewName)} 
                numberChanged={changeHandlerFactory(setNewNum)} />
            <Numbers people={dellers} filterString={filterValue} />
        </div>
    )

}

export default App