import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Stat = ({text, value}) => (
    <tr><td>{text}</td><td>{value}{text === 'Positiivisia' ? " %" : ""}</td></tr>
)


const Stats = ({good, neutral, bad}) => {
    if (good + neutral + bad > 0) {
        return (
            <>
                <h1>Statistiikka</h1>
                <table><tbody>
                <Stat text="Hyvä" value={good}/>
                <Stat text="Neutraali" value={neutral}/>
                <Stat text="Huono" value={bad}/>
                <Stat text="Yhteensä" value={good + neutral + bad}/>
                <Stat text="Keskiarvo" value={(good - bad) / (good + neutral + bad)}/>
                <Stat text="Positiivisia" value={100 * good / (good + neutral + bad)} /> 
                </tbody></table>
            </>
        )
    }
    else {
        return (
            <>
                <h1>Statistiikka</h1>
                <p>Ei yhtään palautetta annettu</p>
            </>
        )
    }
}

const Button = ({fun, name}) => (
    <button onClick={fun}>{name}</button>
)

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    return (
        <div>
            <h1>Anna palautetta</h1>
            <Button name="Hyvä" fun={() => setGood(good + 1)}/>
            <Button name="Neutraali" fun={() => setNeutral(neutral + 1)}/>
            <Button name="Huono" fun={() => setBad(bad + 1)}/>
            <Stats good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)