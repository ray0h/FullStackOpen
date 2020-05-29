import React from 'react';
import ReactDOM from 'react-dom';
import { HeaderProps, SinglePart, Parts, CoursePart } from './types'

const assertNever = (value: never): never => {
  throw new Error (`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Header: React.FC<HeaderProps> = ({ name }) => <h1>{name}</h1>;

const Part: React.FC<SinglePart> = ({ part }) => {
  switch(part.name) {
    case "Fundamentals": 
      return (
        <div>
          <strong>{part.name}</strong>
          <ul>
            <li>Exercise Count: {part.exerciseCount}</li>
            <li>Description: {part.description}</li>
          </ul>
        </div>
      )
    case "Using props to pass data":
      return (
        <div>
          <strong>{part.name}</strong>
          <ul>
            <li>Exercise Count: {part.exerciseCount}</li>
            <li>Group Project Count: {part.groupProjectCount}</li>
          </ul>
        </div>)
    case "Deeper type usage":
      return (
        <div>
          <strong>{part.name}</strong>
          <ul>
            <li>Exercise Count: {part.exerciseCount}</li> 
            <li>Description: {part.description} </li>
            <li>Submission link: {part.exerciseSubmissionLink}</li>
          </ul>
        </div>)
        case "Just in time": 
        return (
          <div>
            <strong>{part.name}</strong>
            <ul>
              <li>Exercise Count: {part.exerciseCount}</li>
              <li>Description: {part.description}</li>
            </ul>
          </div>
        )
    default: 
      return assertNever(part);
  }
};

const Content: React.FC<Parts> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part, ind) => <Part key={ind} part={part}/>)}
    </div>
  );
};

const Total: React.FC<Parts> = ({ courseParts }) => {
  return (
    <p>
      <strong>Total exercises: </strong>
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data", 
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Just in time",
      exerciseCount: 12,
      description: "Last minute addition"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));