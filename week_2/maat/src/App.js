import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Filter = ({content, onChanged}) => (
  <div>
    Find countries <input value={content} onChange={event => onChanged(event.target.value)} />
  </div>
)

const Details = ({country}) => (
  <>
  <h1>{country.name}</h1>
  <p>Capital: {country.capital}</p>
  <p>Population: {country.population}</p>
  <h2>Population</h2>
  <ul>
    {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
  </ul>
  <img src={country.flag} alt={`Flag of ${country.name}`} width="200"/>
  </>
)

const filtterer = (countries, fString) => {
  const fs = fString.toLowerCase()
  const l = []
  let fnd = null
  countries.forEach(c => {
    const cl = c.name.toLowerCase()
    if (cl === fs) {
      fnd = c
    }
    else if (cl.includes(fs)) {
      l.push(c)
    }
  });
  return (fnd ? [fnd] : l)
}

const selector = (n, setter) => (() => setter(n))

const Weather = ({country, apiKey}) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${country.capital}`)
      .then(response => setWeather(response.data))
      .catch((error) => setWeather(null))
  }, [apiKey, country.capital])
  if (weather === null) {
    return (
      <>
      <p>No weather!</p>
      </>
    )
  }
  return (
    <>
    <h2>Weather in {country.capital}</h2>
    <p><b>Temperature:</b> {weather.current.temp_c} celsius</p>
    <img src={weather.current.condition.icon} alt="Weather icon"/>
    <p><b>Wind:</b> {weather.current.wind_kph} kph, {weather.current.wind_dir}</p>
    </>
  )
}

const Listing = ({countries, onSelect}) => {
  if (countries.length === 0) {
    return (<p>Nothing here...</p>)
  }
  else if (countries.length === 1) {
    return (<Details country={countries[0]} />)
  }
  else if (countries.length > 10) {
    return (<p>Too many matches. Filter moar!</p>)
  }
  else {
    return (
      <>
        {countries.map(c => <p key={c.name}>{c.name} <button onClick={(selector(c.name, onSelect))}>Select</button></p>)}
      </>
    )
  }
}

function App() {
  const [fString, setFString] = useState("")
  const [countries, setCountries] = useState([])
  const [apiKey, setApiKey] = useState("")

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
  }, [])
  const clist = filtterer(countries, fString)
  return (
    <>
      <div>Apixu API key<input value={apiKey} onChange={event => setApiKey(event.target.value)}/></div>
      <Filter content={fString} onChanged={setFString} />
      <Listing countries={clist} onSelect={setFString} />
      {clist.length === 1 ? <Weather country={clist[0]} apiKey={apiKey}/> : ""}
    </>
  )
}

export default App;
