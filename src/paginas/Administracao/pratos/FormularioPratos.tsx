import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Box, Button, Container, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { http } from '../../../http';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import Itag from '../../../interfaces/ITag';

export const FormularioPratos = () => {
  const paramarPrato = useParams()
  const navigate = useNavigate()
  const [nomePrato, setNomePrato] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tag, setTag] = useState('')
  const [restaurante,setRestaurante] = useState<number| string>('')
  
  const [tags, setTags] = useState<Itag[]>([])
  const [restaurantes,setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    // Busca as tags e os restaurantes para preencher os selects
    http.get<{tags: Itag[]}>('/tags/')
    .then(res => setTags(res.data.tags))
    .catch(()=> http.get<{tags: Itag[]}>('/tags/')
    .then(res=> setTags(res.data.tags)))
  
    http.get<IRestaurante[]>('/restaurantes/').then(res => setRestaurantes(res.data))
    
     if (paramarPrato.id) {
      http
        .get<IPrato>(`/pratos/${paramarPrato.id}/`)
        .then((res) => {
          setNomePrato(res.data.nome)
          setDescricao(res.data.descricao)
          setTag(res.data.tag)
          setRestaurante(res.data.restaurante)
        })
    }
  }, [paramarPrato])



  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const dadosPrato = {
      nome: nomePrato,
      descricao: descricao,
      tag: tag,
      restaurante: restaurante
    }

    const promise = paramarPrato.id
      ? http.put(`/pratos/${paramarPrato.id}/`, dadosPrato)
      : http.post(`/pratos/`, dadosPrato)         

 /*     const promise = paramarPrato.id
      ? http.put(`/pratos/${paramarPrato.id}/`, {
          nome: nomePrato,
        })
      : http.post(`/pratos/`, {
          nome: nomePrato,
        })
  */
    const msgSucesso = paramarPrato.id
      ? 'Prato atualizado com sucesso! 🚀'
      : 'Prato cadastrado com sucesso! ✨'

    promise
      .then(() => {
        toast.success(msgSucesso)
        navigate('/admin/pratos')
      })
      .catch((err) => {
        console.error(err)
        toast.error('Ops! Algo deu errado ao salvar o prato.')
      })
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", py: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <RestaurantMenuIcon color="primary" fontSize="large" />
          <Typography component="h1" variant="h5" fontWeight="600">
            {paramarPrato.id ? 'Editar Prato' : 'Novo Prato'}
          </Typography>
        </Box>

        <Box component="form" onSubmit={aoSubmeterForm} sx={{ width: '100%' }}>
          <TextField
            value={nomePrato}
            onChange={e => setNomePrato(e.target.value)}
            label="Nome do Prato"
            fullWidth required sx={{ mb: 2 }}
          />

          <TextField
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            label="Descrição"
            fullWidth required multiline rows={3} sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              select
              value={tag}
              onChange={e => setTag(e.target.value)}
              label="Tag"
              fullWidth required
            >
              {tags.map(item => (
                <MenuItem key={item.id} value={item.value}>{item.value}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              value={restaurante}
              onChange={e => setRestaurante(e.target.value)}
              label="Restaurante"
              fullWidth required
            >
              {restaurantes.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button color="inherit" onClick={() => navigate('/admin/pratos')}>Cancelar</Button>
            <Button type="submit" variant="contained" size="large">Salvar Prato</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}