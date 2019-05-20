import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => (
    <h1>{props.content}</h1>
)

const Part = props => (
    <p>{props.thing.name} {props.thing.exercises}</p>
)

const Content = props => (
    <>
        {props.stuff.map((c, i) => <Part key={i} thing={c}/>)}
    </>
)

const Total = props => (
    <p>{"yhteensä " + (props.parts.map(c => c.exercises).reduce((a, b) => a + b)) + " tehtävää"}</p>
)

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const parts = [
        {
            name: 'Reactin perusteet',
            exercises: 10
        },
        {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
        },
        {
            name: 'Komponenttien tila',
            exercises: 14
        }
    ]
    
    return (
        <>
            <Header content={course} />
            <Content stuff={parts} />
            <Total parts={parts} />
        </>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));
