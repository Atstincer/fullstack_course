import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const MostVotedInfo = ({votes}) => {
  let index = 0
  let voteMax = 0
  for(let i=0; i < votes.length; i++){
     if(votes[i]>voteMax){
      voteMax = votes[i]
      index = i
    }
  }
  console.log("voto max",voteMax)
  console.log("index maxVote",index)
  if(voteMax > 0){
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        {anecdotes[index]} <br/>
        has {votes[index]} votes
      </div>
    )
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      no votes has been made yet
    </div>
  )
}

const App = () => {

  function getRandomNum() {
    //console.log("anecdotes.length",anecdotes.length)
    return Math.floor(Math.random() * anecdotes.length)
  }
  
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNextAnecClick = () => {
    const randomNum = getRandomNum()
    console.log("random number",randomNum)
    setSelected(randomNum)
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    console.log("newCountOfVotes",newVotes[selected])
    console.log("newVotes",newVotes)
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br/>
      has {votes[selected]} votes <br/>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextAnecClick}>next anecdote</button>
      <MostVotedInfo votes={votes} />
    </div>
  )
}

export default App
