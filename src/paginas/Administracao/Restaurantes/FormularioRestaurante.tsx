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
    py: { xs: 2, sm: 4 }, // Menos espaçamento vertical no mobile
    px: { xs: 1, sm: 0 }  // Pequeno respiro lateral no mobile
  }}>
    {/* Cabeçalho do Formulário */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
      <StorefrontIcon color="primary" sx={{ fontSize: { xs: 28, sm: 35 } }} />
      <Typography 
        component="h1" 
        variant="h5" 
        sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, fontWeight: '600' }}
      >
        {paramarRestaurante.id ? 'Editar Restaurante' : 'Novo Restaurante'}
      </Typography>
    </Box>

    {/* Formulário */}
    <Box 
  component="form" 
  onSubmit={aoSubmeterForm} 
  sx={{ 
    width: '100%', 
    maxWidth: '450px', // Reduzido para um visual mais focado
    mt: 1 
  }}
>
  <TextField
    value={nomeRestaurante}
    onChange={evento => setNomeRestaurante(evento.target.value)}
    label="Nome do Restaurante"
    variant="outlined"
    fullWidth
    required
    size="small" // Input mais compacto
    sx={{ 
        mb: 3,
        '& .MuiInputBase-input': { fontSize: '0.9rem' } 
    }}
  />

  <Box sx={{ 
    display: 'flex', 
    flexDirection: { xs: 'column-reverse', sm: 'row' }, 
    gap: 1.5, // Espaçamento menor entre botões
    justifyContent: 'flex-end' 
  }}>
    <Button 
      variant="outlined" // Agora com borda para ganhar cor
      color="error"      // Cor vermelha para o cancelamento
      size="small"       // Botão menor
      onClick={() => navigate('/admin/restaurantes')}
      sx={{ 
        px: 3, 
        fontSize: '0.8rem',
        textTransform: 'none', // Remove o Caps Lock automático (opcional)
        borderColor: 'error.light'
      }}
    >
      Cancelar
    </Button>
    
    <Button 
      type="submit" 
      variant="contained" 
      color="primary"
      size="small" // Botão menor para combinar com a tabela
      sx={{ 
        px: 3, 
        py: 1,
        fontWeight: '600',
        fontSize: '0.8rem',
        textTransform: 'none',
        boxShadow: 1
      }}
    >
      {paramarRestaurante.id ? 'Salvar Alterações' : 'Cadastrar'}
    </Button>
  </Box>
</Box>
  </Box>
</Container>
   
  )
}