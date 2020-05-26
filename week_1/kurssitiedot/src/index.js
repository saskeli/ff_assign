import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({name}) => <h1>{name}</h1>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => <>
    {parts.map(c => <Part name={c.name} exercises={c.exercises} />)}
</>

const Total = ({counts}) => <p>
    Number of exercises {counts.reduce((a, b) => a + b, 0)}
</p>

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {name: 'Fundamentals of React', exercises: 10},
            {name: 'Using props to pass data', exercises: 7},
            {name: 'State of a component', exercises: 14}
        ]
    }
    
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total counts={course.parts.map(x => x.exercises)} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
