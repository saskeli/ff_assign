import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({content}) => (
    <h1>{content}</h1>
)

const Part = ({part}) => (
    <p>{part.name} {part.exercises}</p>
)

const Content = ({parts}) => (
    <>
        {parts.map(c => <Part key={c.id} part={c}/>)}
    </>
)

const Total = ({parts}) => (
    <p>{"yhteensä " + (parts.map(c => c.exercises).reduce((a, b) => a + b)) + " tehtävää"}</p>
)

const Course = ({course}) => (
    <>
        <Header content={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
)

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10,
                id: 1
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7,
                id: 2
            },
            {
                name: 'Komponenttien tila',
                exercises: 14,
                id: 3
            },
            {
                name: "Redux",
                exercises: 7,
                id: 4
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
