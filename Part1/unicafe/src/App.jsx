import { useState } from 'react'

const Button = ({ onClick, text}) => <button onClick= {onClick}>{text}</button>

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const TableRow = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const getTotal = () => good + neutral + bad
  const getAverage = () => (good*1+neutral*0+bad*-1)/getTotal()
  const getPositivePercentage = () => good/getTotal()*100
  const positivePercentageMsg = () => getPositivePercentage() + " %"

  if(good === 0 && neutral === 0 && bad === 0){
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    /*<div>
      <h1>statistics</h1>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="total" value={getTotal()} />
      <StatisticLine text="average" value={getAverage()} />
      <StatisticLine text="positive" value={getPositivePercentage()} />      
    </div>*/
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <TableRow text="good" value ={good} />
          <TableRow text="neutral" value={neutral} />
          <TableRow text="bad" value={bad} />
          <TableRow text="total" value={getTotal()} />
          <TableRow text="average" value={getAverage()} />
          <TableRow text="positive" value={positivePercentageMsg()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App