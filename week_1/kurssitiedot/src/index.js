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

const Footer = props => (
    <p>{props.content}</p>
)

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = {
        name: 'Reactin perusteet',
        exercises: 10
    }
    const part2 = {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
    }
    const part3 = {
        name: 'Komponenttien tila',
        exercises: 14
    }
    
    const parts = [part1, part2, part3]

    return (
        <>
            <Header content={course} />
            <Content stuff={parts} />
            <Footer content={"yhteensä " + (parts.map(c => c.exercises).reduce((a, b) => a + b)) + " tehtävää"} />
        </>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));
