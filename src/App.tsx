import { useState } from 'react'
import './App.css'

function App() {
  const [ address, setAddress ] = useState('')

  const handleSearch = (cep: string) => {
    // http://viacep.com.br/ws/01001000/json/
  }

  return (
    <>
      <form>
        <fieldset>
          <label htmlFor='cep'>Cep</label>
          <input type='text' id='cep' name='cep' />
        </fieldset>
        <span>Resultado: </span>
      </form>
    </>
  )
}

export default App
