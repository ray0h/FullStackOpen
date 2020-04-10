import React from 'react'

const Header = ( {title} ) => <h2>{title}</h2>

const Parts = ({ name, exercises }) => <p>{name}: {exercises}</p>

const Content = ({ parts }) => parts.map(each => <Parts key={each.id} name={each.name} exercises={each.exercises}/>)

const Total = ({ parts }) => <p><strong>Total of {parts.reduce((total, each) => total + each.exercises, 0)} exercises</strong></p>

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>  
  )
}

const Syllabus = ({ courses }) => 
  courses.map((each, index) => <Course key={each.id} course={courses[index]}/>)


export default Syllabus