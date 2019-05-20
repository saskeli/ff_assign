import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Stats = ({good, neutral, bad}) => {
    if (good + neutral + bad > 0) {
        return (
            <>
                <h1>Statistiikka</h1>
                <p>Hyvä {good}</p>
                <p>Neutraali {neutral}</p>
                <p>Huono {bad}</p>
                <p>Yhteensä {good + neutral + bad}</p>
                <p>Keskiarvo {(good - bad) / (good + neutral + bad)}</p>
                <p>Positiivisia {100 * good / (good + neutral + bad)}</p>
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

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    return (
        <div>
            <h1>Anna palautetta</h1>
            <button onClick={() => setGood(good + 1)}>Good</button>
            <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
            <button onClick={() => setBad(bad + 1)}>Bad</button>
            <Stats good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)