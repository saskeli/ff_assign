import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const choise = arr => Math.floor(Math.random() * arr.length)

const vote = ({selected, setter, votes}) => () => {
    const nvotes = [...votes];
    nvotes[selected] += 1;
    setter(nvotes)
}

const Most = ({votes}) => {
    const most = votes.reduce((mIdx, v, i, arr) => arr[mIdx] > v ? mIdx : i)
    return(
    <>
        <h1>Anecdote with most votes:</h1>
        <p>{anecdotes[most]}</p>
        <p>has {votes[most]} votes</p>
    </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(choise(anecdotes))
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    return (
        <div>
            <h1>Anecdotes!</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {votes[selected]} votes.</p>
            <button onClick={vote({selected:selected, setter:setVotes, votes:votes})}>Vote</button>
            <button onClick={() => setSelected(choise(anecdotes))}>Reroll</button>
            <Most votes={votes} />
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
