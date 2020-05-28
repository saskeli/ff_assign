import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Filter = ({ content, onChanged }) => <>
    Find countries <input value={content} onChange={event => onChanged(event.target.value)} />
</>


const Details = ({ country }) => <>
    <h1>{country.name}</h1>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h3>Languages</h3>
    <ul>
        {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
    </ul>
    <img src={country.flag} alt={`Flag of ${country.name}`} width="200" />
</>


const filtterer = (countries, fString) => {
    let found = null
    const l = countries.filter(c => {
        if (c.name === fString) {
            found = c
        }
        return c.name.toLowerCase().includes(fString.toLowerCase())
    })
    if (found) {
        return [found]
    }
    return l
}

const selector = (n, setter) => (() => setter(n))

const Weather = ({ country, apiKey }) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`)
            .then(response => response.json())
            .then(data => setWeather(data))
            .catch((error) => setWeather(null))
    }, [apiKey, country.capital])
    if (weather && weather.current) {
        return (
            <>
                <h2>Weather in {country.capital}</h2>
                <p><b>Temperature:</b> {weather.current.temperature} celsius</p>
                <img src={weather.current.weather_icons.filter(p => p)} alt="Weather icon" />
                <p><b>Wind:</b> {weather.current.wind_speed} kph, {weather.current.wind_dir}</p>
            </>
        )
    }
    return (
        <>
            <p>No weather!</p>
        </>
    )
}

const Listing = ({ countries, onSelect }) => {
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
            <div>Apixu API key<input value={apiKey} onChange={event => setApiKey(event.target.value)} /></div>
            <Filter content={fString} onChanged={setFString} />
            <Listing countries={clist} onSelect={setFString} />
            {clist.length === 1 ? <Weather country={clist[0]} apiKey={apiKey} /> : ""}
        </>
    )
}

export default App;
