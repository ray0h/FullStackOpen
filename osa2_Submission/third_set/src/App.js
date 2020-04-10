import React, { useState, useEffect } from 'react'
import axios from 'axios'

function SearchForm ({ searchStr, changeHandler }) {
  return (
    <form>
        <div>
          <h4>Search countries: </h4> 
          <input 
            value={searchStr}
            onChange={changeHandler} 
          />
        </div>  
    </form>
  )
}

function DisplayNames ({nameList, clickHandle}) {
  if (!Array.isArray(nameList)) {
    return <div></div>
  } else {
      let list = nameList.map((each, index) => <div key={index}>{each}  <button value={each} onClick={clickHandle}>show</button></div>)
      if (nameList.length === 1) {
        list = nameList.map((each, index) => <div key={index}>{each} </div>)
      }
      return (
          <div>
            country names: 
            {list}
          </div>
      )
    }
}

function FeatureCountry ({ country }) {
  if (Array.isArray(country)) {
    return <div></div>
  } 
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <div>
        languages:
        <ul>
          {country.languages.map((each, index) => <li key={index}>{each.name}</li>)}
        </ul>
      </div>
      <img src={country.flag} alt="{country.name}+flag" width="150px" border="1em solid black"/>
    </div>
  )
}

function CountryWeather ( {capital} ) {
  const api_key = process.env.REACT_APP_API_KEY
  const [ weather, setWeather ] = useState({})
  const params = {
    access_key: api_key,
    query: capital
  }

  console.log(capital)
  useEffect( () => {
    console.log("fetch weather")
    if (capital) {
      axios
        .get("http://api.weatherstack.com/current", {params})
        .then((response) => setWeather(response.data))
      console.log("weather promise fulfilled")
    }
  }, [setWeather, capital, params])
  console.log(weather)
  
  if (!capital) {
    return <div></div>
  } else {
  return (
    <div>
      <h3>Current weather in {weather.request.query}</h3>
      <div>{weather.current.weather_desciptions}, {weather.current.temperature} deg Celsius</div>>
    </div>
  )}
}

const App = () => {
  //state variables
  const [ nationList, setNationList ] = useState([])
  const [ searchStr, setSearchStr ] = useState("")

  useEffect( () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setNationList(response.data)) 
  }, [])

  //event handlers
  const searchChangeHandler = (e) => setSearchStr(e.target.value)
  const showHandler = (e) => setSearchStr(e.target.value)

  //equivalent of render()?

  // dealing with parentheses in string literals
  let newStr = searchStr.replace("(", "\\(").replace(")","\\)") 
  
  let searchRegEx = new RegExp("^" + newStr)
  let filterList = nationList.filter(each => each.name.match(searchRegEx))

  const searchRes = (filterList.length === 1) ? 
                      filterList[0] : 
                    (filterList.length >= 1 && filterList.length <= 10) ? 
                      filterList.map(each => each.name) : 
                      ["Too many countries. Refine search"]

  let capital = (!Array.isArray(searchRes)) ? searchRes.capital : ""

  return (
    <div>
      <SearchForm searchStr={searchStr} changeHandler={searchChangeHandler}/>
      <DisplayNames nameList={searchRes} clickHandle={showHandler}/>
      <FeatureCountry country={searchRes} />
 {/*      <CountryWeather capital={capital} /> */}
    </div>
  )
}

export default App;
