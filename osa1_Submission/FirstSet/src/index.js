import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Parts = (props) => {
  return (
    <div>
      <p>{props.parts.name} {props.parts.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Parts parts = {props.parts[0]}/>
      <Parts parts = {props.parts[1]}/>
      <Parts parts = {props.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  let sum = props.parts.reduce((tot,el) => tot + el.exercises, 0)

  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
} 


ReactDOM.render(<App />, document.getElementById('root')
);

