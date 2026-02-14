import StorefrontIcon from '@mui/icons-material/Storefront'; // Ícone para o título
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { http } from '../../../http';

export const FormularioRestaurantes = () => {
  const paramarRestaurante = useParams()
  const navigate = useNavigate()
  const [nomeRestaurante, setNomeRestaurante] = useState('')

  useEffect(() => {
    if (paramarRestaurante.id) {
      http
        .get(`/restaurantes/${paramarRestaurante.id}/`)
        .then((res) => setNomeRestaurante(res.data.nome))
    }
  }, [paramarRestaurante])

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const promise = paramarRestaurante.id
      ? http.put(`/restaurantes/${paramarRestaurante.id}/`, {
          nome: nomeRestaurante,
        })
      : http.post(`/restaurantes/`, {
          nome: nomeRestaurante,
        })

    const msgSucesso = paramarRestaurante.id
      ? 'Restaurante atualizado com sucesso! 🚀'
      : 'Restaurante cadastrado com sucesso! ✨'

    promise
      .then(() => {
        toast.success(msgSucesso)
        navigate('/admin/restaurantes')
      })
      .catch((err) => {
        console.error(err)
        toast.error('Ops! Algo deu errado ao salvar o restaurante.')
      })
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: "column", 
        alignItems: "center",
        py: 3 
      }}>
        {/* Cabeçalho do Formulário */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <StorefrontIcon color="primary" fontSize="large" />
          <Typography component="h1" variant="h5" fontWeight="600" color="text.primary">
            {paramarRestaurante.id ? 'Editar Restaurante' : 'Novo Restaurante'}
          </Typography>
        </Box>

        {/* Formulário */}
        <Box 
          component="form" 
          onSubmit={aoSubmeterForm} 
          sx={{ width: '100%', mt: 1 }}
        >
          <TextField
            value={nomeRestaurante}
            onChange={evento => setNomeRestaurante(evento.target.value)}
            label="Nome do Restaurante"
            variant="outlined" // Estilo mais robusto
            fullWidth
            required
            placeholder="Ex: Cantina da Nonna"
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button 
              variant="text" 
              color="inherit" 
              onClick={() => navigate('/admin/restaurantes')}
            >
              Cancelar
            </Button>
            
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              sx={{ 
                px: 4, 
                fontWeight: 'bold',
                boxShadow: 2
              }}
            >
              Salvar Alterações
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}