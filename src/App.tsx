import { useState, useEffect } from 'react'
import { Axios } from 'axios'
import './App.css'

const axiosClient = new Axios({
  baseURL: 'http://localhost:3000',
  headers: {
    "Accept": 'application/json',
    "Content-Type": 'application/json'
  }
})

function App() {

  const [ contas, setContas ] = useState([])

  const handleSubmit = () => {
    const idEl = document.getElementById('id') as HTMLInputElement ;
    const nameEl = document.getElementById('name') as HTMLInputElement ;
    const descriptionEl = document.getElementById('description') as HTMLInputElement ;

    const data = {
      "id": idEl.value !== "" ? Number(idEl.value) : null,
      "nome": nameEl.value,
      "descricao": descriptionEl.value
    }

    if(data.descricao == "" || data.nome == ""){
      const nullValues = []
      data.nome ? null : nullValues.push('Nome')
      data.descricao ? null : nullValues.push('Descrição')
      alert(`Por favor preenha os campos: [ ${nullValues.join(', ')} ]`)
      return
    }

    if(data.id){
      axiosClient.put(`/contas/${data.id}`, JSON.stringify(data))
      .then(() => {
        nameEl.value = ""
        descriptionEl.value = ""
        getAccounts()
      })
    } else {
      axiosClient.post('/contas', JSON.stringify(data))
        .then(() => {
          nameEl.value = ""
          descriptionEl.value = ""
          getAccounts()
        })
    }

  }

  useEffect(()=>{
    getAccounts()
  }, [])

  const handleEdit = (account: any) => {
    const idEl = document.getElementById('id') as HTMLInputElement ;
    const nameEl = document.getElementById('name') as HTMLInputElement ;
    const descriptionEl = document.getElementById('description') as HTMLInputElement ;

    idEl.value = account.id
    nameEl.value = account.nome
    descriptionEl.value = account.descricao
  }

  useEffect(()=>{
    getAccounts()
  }, [])

  const handleDelete = (id: number) => {
    axiosClient.delete(`/contas/${id}`)
      .then(getAccounts)
  }

  return (
    <>
      <form>

        <input type='hidden' name="id" id='id' />

        <label htmlFor='name'>Nome:</label>
        <input id='name' name="name" />

        <label htmlFor='description'>Descrição</label>
        <input id='description' name="description" />
        <button type='button' onClick={handleSubmit}>Enviar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            contas.map((c: any) => {
              return (
                <tr>
                  <td>{c.id}</td>
                  <td>{c.nome}</td>
                  <td>{c.descricao}</td>
                  <td>
                    <button onClick={(_) => {handleEdit(c)}}>Editar</button>
                    <button onClick={(_) => { handleDelete(c.id)}}>Excluir</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )

  function getAccounts() {
    axiosClient.get('/contas')
      .then(response => {
        setContas(JSON.parse(response.data))
      })
  }
}

export default App
