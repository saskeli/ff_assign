import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
    <h1>{props.content}</h1>
)

const Content = (props) => (
    <>
        {props.names.map((c, i) => {
            return <p key={i}>{c} {props.number[i]}</p>
        })}
    </>
)

const Footer = (props) => (
    <p>{props.content}</p>
)

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14
  
    return (
        <div>
            <Header content={course} />
            <Content names={[part1, part2, part3]} number={[exercises1, exercises2, exercises3]}/>
            <Footer content={"yhteensä " + (exercises1 + exercises2 + exercises3) + " tehtävää"}/>
        </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));
