import React from "react";

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

export default Course