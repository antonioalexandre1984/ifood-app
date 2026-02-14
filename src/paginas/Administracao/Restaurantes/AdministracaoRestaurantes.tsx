import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { http } from '../../../http'
import IRestaurante from '../../../interfaces/IRestaurante'

export const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  const carregarRestaurantes = () => {
    http
      .get<IRestaurante[]>(`/restaurantes/`)
      .then((res) => setRestaurantes(res.data))
      .catch((err) => toast.error('Erro ao carregar restaurantes'))
  }

  useEffect(() => {
    carregarRestaurantes()
  }, [])

  const excluir = (restauranteParaExcluir: IRestaurante) => {
    http
      .delete(`/restaurantes/${restauranteParaExcluir.id}/`)
      .then(() => {
        setRestaurantes(
          restaurantes.filter((r) => r.id !== restauranteParaExcluir.id),
        )
        toast.success('Restaurante removido com sucesso!')
      })
      .catch((err) => {
        toast.error('Não foi possível excluir o restaurante.')
        console.error(err)
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        px: {xs:0,sm:2},
        py: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { sm: '600px', md: '800px' },
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{display: 'flex', alignItems: 'center', mb: 2,  fontWeight: 'bold', color: 'primary.main' }}
        >
          Gerenciar Restaurantes
        </Typography>

        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ borderRadius: 2, overflow: 'hidden' }}
        >
          <Table size="medium">
            <TableHead sx={{ bgcolor: 'primary.main' }}>
              <TableRow>
                {/* Célula do Nome: Ajuste de padding e fonte responsiva */}
                <TableCell
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    px: { xs: 2, sm: 3 }, // Um pouco mais de espaço inicial por não ter imagem
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {/* Exibe "Nome" em telas minúsculas e o texto completo em maiores */}
                  <Box
                    component="span"
                    sx={{ display: { xs: 'none', sm: 'inline' } }}
                  >
                    Nome do Restaurante
                  </Box>
                  <Box
                    component="span"
                    sx={{ display: { xs: 'inline', sm: 'none' } }}
                  >
                    Restaurante
                  </Box>
                </TableCell>

                {/* Célula de Ações: Compactada para mobile */}
                <TableCell
                  align="center"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    px: { xs: 2, sm: 3 },
                    width: { xs: 100, sm: 'auto' }, // Define uma largura mínima no mobile para não espremer os ícones
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantes.map((restaurante) => (
                <TableRow
                  key={restaurante.id}
                  sx={{
                    '&:hover': { bgcolor: '#f9f9f9' },
                    '& td, & th': {
                      borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    },
                  }}
                >
                  {/* Nome do Restaurante - Compacto */}
                  <TableCell
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.8rem', // Fonte reduzida para 13px aprox.
                      color: 'text.secondary',
                      px: 3,
                      py: 1, // Linhas mais finas
                    }}
                  >
                    {restaurante.nome}
                  </TableCell>

                  {/* Ações - Ícones Circulares Pequenos */}
                  <TableCell align="center" sx={{ py: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1.5,
                        ml: 2,
                      }}
                    >
                      <Tooltip title="Editar" arrow>
                        <IconButton
                          component={RouterLink}
                          to={`/admin/restaurantes/${restaurante.id}`}
                          size="small"
                          sx={{
                            padding: '4px', // Botão circular justo
                            color: 'primary.main',
                            border: '1px solid rgba(25, 118, 210, 0.2)',
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: 'white',
                            },
                          }}
                        >
                          <EditIcon sx={{ fontSize: 16 }} />{' '}
                          {/* Ícone minificado */}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Excluir" arrow>
                        <IconButton
                          onClick={() => excluir(restaurante)}
                          size="small"
                          color="error"
                          sx={{
                            padding: '4px',
                            border: '1px solid rgba(211, 47, 47, 0.2)',
                            '&:hover': {
                              bgcolor: 'error.main',
                              color: 'white',
                            },
                          }}
                        >
                          <DeleteOutlineIcon sx={{ fontSize: 16 }} />{' '}
                          {/* Ícone minificado */}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
