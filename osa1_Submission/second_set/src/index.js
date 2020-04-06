import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = () => <h1>give feedback</h1>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}: </td>
        <td>{value}</td>  
      </tr>
    </>
  )
}

const Stats = ({good, neutral, bad}) => {
  let all = good + neutral + bad
  let avg = (good - bad) / all
  let pos = good / all

  if(all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given.  Press a button to submit some feedback and generate some stats.
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>

          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={avg.toFixed(2)}/>
          <StatisticLine text="positive" value={`${(pos*100).toFixed(2)}%`}/>
    
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header />
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);

