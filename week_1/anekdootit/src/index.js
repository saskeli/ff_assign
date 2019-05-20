import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const choise = arr => Math.floor(Math.random() * arr.length)

const vote = ({selected, setter, votes}) => () => {
    anecdotes[selected].votes = anecdotes[selected].votes + 1
    setter(votes + 1)
}

const Most = () => {
    const most = anecdotes.reduce((a, b) => a.votes > b.votes ? a : b)
    return(
    <>
        <h1>Anecdote with most votes</h1>
        <p>{most.text}</p>
        <p>has {most.votes} votes</p>
    </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(choise(anecdotes))
    const [votes, setVotes] = useState(0)

    return (
        <div>
            <p>{props.anecdotes[selected].text} </p>
            <p>has {anecdotes[selected].votes} votes.</p>
            <button onClick={vote({selected:selected, setter:setVotes, votes:votes})}>Vote</button>
            <button onClick={() => setSelected(choise(anecdotes))}>Reroll</button>
            <Most />
        </div>
    )
}

const anecdotes = [
  {votes: 0, text:'If it hurts, do it more often'},
  {votes: 0, text:'Adding manpower to a late software project makes it later!'},
  {votes: 0, text:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'},
  {votes: 0, text:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'},
  {votes: 0, text:'Premature optimization is the root of all evil.'},
  {votes: 0, text:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'}
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
