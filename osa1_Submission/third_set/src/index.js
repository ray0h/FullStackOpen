import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const MaxVotes = ({ anecdotes, votes }) => {
  let maxInd = votes.indexOf(Math.max(...votes))
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <h4>{anecdotes[maxInd]}</h4>
      <h4>with {votes[maxInd]} votes!</h4>
    </div>
  )
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(Math.floor(Math.random()*anecdotes.length))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleSelect = () => setSelected(Math.floor(Math.random()*anecdotes.length))

  const addVote = () => setVotes(votes.map((el, ind) => (ind === selected) ? el + 1 : el))

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <h4>{anecdotes[selected]}</h4>
      <h4>has {votes[selected]} votes.</h4>
      <Button handleClick={addVote} text="vote"/>
      <Button handleClick={handleSelect} text="next anecdote"/>
      <MaxVotes anecdotes={anecdotes} selected={selected} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.',
  'Programming is like sex. One mistake and you have to support it for the rest of your life.',
  'Walking on water and developing software from a specification are easy if both are frozen.',
  'One bad programmer can easily create two new jobs a year.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root')
);

