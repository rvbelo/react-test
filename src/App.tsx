import { useEffect, useState } from 'react'
import { Axios } from 'axios'
import './App.css'

const axiosClient = new Axios({
  baseURL: 'https://viacep.com.br/ws/',
  headers: {
    "Accept": 'application/json',
    "Content-Type": 'application/json'
  }
})

function App() {
  const [ address, setAddress ] = useState('')

  const handleSearch = (cep: string) => {
    if(cep){
      axiosClient.get(`${cep}/json/`)
        .then(response => {
          setAddress(response.data)
        })
    }
  }

  useEffect(()=>{
    console.log(address)
  }, [address])

  return (
    <>
      <form>
        <fieldset className='field-cep'>
          <label htmlFor='cep'>Cep</label>
          <input className='input-cep' type='text' id='cep' name='cep' onBlur={(e) => {handleSearch(e.target.value)}}/>
        </fieldset>
        <span>Resultado: {address}</span>
      </form>
    </>
  )
}

export default App
