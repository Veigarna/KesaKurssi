import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const search = async () => {
      try {
        const res = await axios.get(
          'https://studies.cs.helsinki.fi/restcountries/api/name/' + name
        )
        if (res.status == 200) {
          console.log('res', res)
          setCountry({ found: true, data: res.data })
        } else {
          console.log('error')
          setCountry({ found: false, data: null })
        }
      } catch (error) {
        console.log('error: ', error)
        setCountry({ found: false, data: null })
      }
    }
    search()
  }, [name])
  //console.log('return', country)
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.svg}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    console.log('clicked')
    setName(nameInput.value)
    //console.log('search', country)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
