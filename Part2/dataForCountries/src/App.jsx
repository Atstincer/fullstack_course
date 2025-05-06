import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [countryToShow, setCountryToShow] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  function applyFilter(){
    const cts = filter === '' ? [] : countries.filter(c=>c.name.common.toLowerCase().includes(filter.toLowerCase()))
    setCountriesToShow(cts)
  }

  const onChangeFilterValue = event => {
    setCountryToShow('')
    setFilter(event.target.value)
  }

  const onShowCountry = country => {
    setCountryToShow(country)
  }

  useEffect(()=>{applyFilter()},[countries,filter])

  return (
    <div>
      <FIlterDiv value={filter} callback={onChangeFilterValue} />
      <ResultDiv countries={countriesToShow} countryToShow={countryToShow} onShowCountry={onShowCountry}/>
    </div>
  )
}

const ResultDiv = ({countries,countryToShow,onShowCountry}) => {
  if(countries.length === 0) return null
  if(countryToShow !== '') return <CountryDetailInfo country={countries.filter(c=>c.name.common.toLowerCase() === countryToShow.toLowerCase())[0]}/>
  if(countries.length === 1) return <CountryDetailInfo country={countries[0]}/>
  if(countries.length > 10){
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  if(countries.length <= 10){
    return (
      <div>
        {countries.map(c=><LineInfo key={c.name.common} countryName={c.name.common} onShowCountry={onShowCountry}/>)}
      </div>
    )
  }
}

const LineInfo = ({countryName,onShowCountry}) => {
  //console.log('on LineInfo',info)
  return(
    <div>{countryName} <button onClick={()=>{onShowCountry(countryName)}}>Show</button></div>
  )
}

const CountryDetailInfo = ({country}) => {
  //console.log(country)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(entry=><li key={entry[0]}>{entry[1]}</li>)}
      </ul>
      <img src={country.flags.png} alt="Country's flag"/>
    </div>
  )
}

const FIlterDiv = ({ value, callback }) => {
  return (
    <div>
      find countries <input value={value} onChange={callback} />
    </div>
  )
}

export default App
