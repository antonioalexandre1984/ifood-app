import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import bgprato from '../../../componentes/images/12-Hotel-Camburi-Site-Rota-gastronomica.png';
const BASE_URL = 'http://localhost:8000'

// URL de uma imagem de doces coloridos (você pode substituir pela sua)
const BACKGROUND_IMAGE = bgprato;

export const FormularioRestaurantes = () => {
  const paramarRestaurante = useParams()
  const navigate = useNavigate()
  const [nomeRestaurante, setNomeRestaurante] = useState<string>('')

  useEffect(() => {
    if (paramarRestaurante.id) {
      axios
        .get(`${BASE_URL}/api/v2/restaurantes/${paramarRestaurante.id}/`)
        .then((res) => setNomeRestaurante(res.data.nome))
    }
  }, [paramarRestaurante])

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const promise = paramarRestaurante.id
      ? axios.put(`${BASE_URL}/api/v2/restaurantes/${paramarRestaurante.id}/`, { nome: nomeRestaurante })
      : axios.post(`${BASE_URL}/api/v2/restaurantes/`, { nome: nomeRestaurante });

    const msgSucesso = paramarRestaurante.id 
      ? 'Restaurante atualizado com sucesso! 🚀' 
      : 'Restaurante cadastrado com sucesso! ✨';

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
    // Box Principal que cobre a tela toda com a imagem
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${BACKGROUND_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.6)', // Camada branca opaca para suavizar
          backdropFilter: 'blur(1px)', // Efeito de desfoque profissional
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            borderRadius: 4, 
            backgroundColor: 'rgba(255, 255, 255, 0.95)' // Papel levemente transparente
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
              <RestaurantIcon fontSize="large" />
            </Avatar>
            
            <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: '800', color: '#333' }}>
              {paramarRestaurante.id ? 'Editar Doceria' : 'Nova Doceria'}
            </Typography>

            <Box component="form" onSubmit={aoSubmeterForm} sx={{ width: '100%' }}>
              <TextField
                value={nomeRestaurante}
                label="Nome do Estabelecimento"
                variant="outlined"
                onChange={(e) => setNomeRestaurante(e.target.value)}
                fullWidth
                required
                sx={{ mb: 3 }}
              />
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                      fullWidth 
                      variant="outlined" 
                      color="inherit"
                      onClick={() => navigate('/admin/restaurantes')}
                  >
                      Cancelar
                  </Button>
                  <Button 
                      type="submit" 
                      fullWidth 
                      variant="contained" 
                      color="secondary"
                      size="large"
                      sx={{ fontWeight: 'bold' }}
                  >
                      Salvar
                  </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}