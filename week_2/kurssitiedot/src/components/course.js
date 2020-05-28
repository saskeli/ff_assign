import React from "react";

const Header = ({content}) => <h2>{content}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => (
    <>
        {parts.map(c => <Part key={c.id} part={c}/>)}
    </>
)

const Total = ({exercises}) => (
    <p><b>{"yhteensä " + (exercises.reduce((a, b) => a + b)) + " tehtävää"}</b></p>
)

const Course = ({course}) => (
    <>
        <Header content={course.name} />
        <Content parts={course.parts} />
        <Total exercises={course.parts.map(c => c.exercises)} />
    </>
)

export default Course