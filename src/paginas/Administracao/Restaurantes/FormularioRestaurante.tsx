import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const BASE_URL = 'http://localhost:8000'
export const FormularioRestaurantes = () => {
  const paramarRestaurante = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (paramarRestaurante.id) {
      axios
        .get(BASE_URL + `/api/v2/restaurantes/${paramarRestaurante.id}/`)
        .then((res) => {
          setNomeRestaurante(res.data.nome)
        })
    }
  }, [paramarRestaurante])

  const [nomeRestaurante, setNomeRestaurante] = useState<string>('')

  //metodo que compacta as funções porém não diferencia a msg de um novo registro de um registro existente.
  /*
const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  
 const method = paramarRestaurante.id ? 'put' : 'post';
  const url = paramarRestaurante.id
  ? BASE_URL + `/api/v2/restaurantes/${paramarRestaurante.id}/`
  : BASE_URL + '/api/v2/restaurantes/';
  axios[method](url, {
    nome: nomeRestaurante
  }).then(() => {
    alert('Restaurante cadastrado com sucesso!');
    navigate('/admin/restaurantes');
  })  
  .catch(err => {
    console.log(err);
    alert('Ops! Algo deu errado ao salvar o restaurante.');
  })  
}*/

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (paramarRestaurante.id) {
      axios
        .put(BASE_URL + `/api/v2/restaurantes/${paramarRestaurante.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          toast.success('Restaurante atualizado com sucesso! 🚀');
          navigate('/admin/restaurantes')
        })
        .catch((err) => {
          console.log(err)
          toast.error('Ops! Algo deu errado ao atualizar o restaurante.')
        })
    } else {
      axios
        .post(BASE_URL + '/api/v2/restaurantes/', {
          nome: nomeRestaurante,
        })
        .then(() => {
          toast.success('Restaurante cadastrado com sucesso! ✨');
          navigate('/admin/restaurantes')
        })
        .catch((err) => {
          console.log(err)
          toast.error('Ops! Algo deu errado ao salvar o restaurante.')
        })
    }
  }
  //console.log('Restaurante: ', nomeRestaurante)

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField
        value={nomeRestaurante}
        label="Nome do Restaurante"
        variant="standard"
        onChange={(e) => setNomeRestaurante(e.target.value)}
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  )
}
