import React, { useState, useEffect } from 'react'
import axios from 'axios'

const changeHandlerFactory = (fn) => (event) => fn(event.target.value)

const Person = ({name, number}) => <tr><td>{name}</td><td>{number}</td></tr>

const Numbers = ({people, filterString}) => {
    const toShow = people.filter(p => 
        `${p.name.toLowerCase()} ${p.number.toLowerCase()}`.includes(filterString.toLowerCase()))
    return (<>
        <h2>Numbers</h2>
        <table><tbody>
            {toShow.map(p => <Person key={p.id} name={p.name} number={p.number} />)}
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

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1231244', id: 1 }
    ])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [filterValue, setFilterValue] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find(p => p.name === newName)) {
            alert(`${newName} has already been added to the phonebook`)
        } else {
            const nper = persons.concat({ name: newName, id: persons.length + 1, number: newNum })
            setNewName('')
            setNewNum('')
            setPersons(nper)
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
            .then(response => setPersons(response.data))
    }, [])

    return (
        <div>
            <h1>Phonebook</h1>
            Filter <input value={filterValue} onChange={changeHandlerFactory(setFilterValue)} />
            <Adder 
                onSubmit={addPerson} 
                name={newName} 
                number={newNum} 
                nameChanged={changeHandlerFactory(setNewName)} 
                numberChanged={changeHandlerFactory(setNewNum)} />
            <Numbers people={persons} filterString={filterValue} />
        </div>
    )

}

export default App