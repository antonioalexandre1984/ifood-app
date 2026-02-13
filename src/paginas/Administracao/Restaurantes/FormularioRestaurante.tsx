import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
const BASE_URL = 'http://localhost:8000';
export const FormularioRestaurantes = () => {

const [nomeRestaurante, setNomeRestaurante] = useState<string>('');
const paramarRestaurante = useParams();
if (paramarRestaurante.id) {
  axios.get(BASE_URL + '/api/v2/restaurantes/' + paramarRestaurante.id).then(res => {
    setNomeRestaurante(res.data.nome);
  })
}
const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log('Restaurante: ', nomeRestaurante);
  axios.post(BASE_URL + '/api/v2/restaurantes/', {
    nome: nomeRestaurante
  }).then(
    () => {
      setNomeRestaurante('');
    }
  )
}
  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField value={nomeRestaurante} id="standard-basic" label="Nome" variant="standard" />
      <Button type="submit" variant="outlined">Salvar</Button>
    </form>
  )
}
