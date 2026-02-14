import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import {
    Avatar,
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
import IPrato from '../../../interfaces/IPrato'

export const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([])

  const carregarPratos = () => {
    http
      .get<IPrato[]>(`/pratos/`)
      .then((res) => setPratos(res.data))
      .catch((err) => toast.error('Erro ao carregar os pratos'))
  }

  useEffect(() => {
    carregarPratos()
  }, [])

  const excluir = (pratoParaExcluir: IPrato) => {
    http
      .delete(`/pratos/${pratoParaExcluir.id}/`)
      .then(() => {
        setPratos(pratos.filter((r) => r.id !== pratoParaExcluir.id))
        toast.success('Prato removido com sucesso!')
      })
      .catch((err) => {
        toast.error('Não foi possível excluir o prato.')
        console.error(err)
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        py: 4,
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '90%', lg: '80%' },
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}
        >
          Gerenciar Pratos
        </Typography>

        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ borderRadius: 3, overflow: 'hidden' }}
        >
          <Table size="medium">
            <TableHead sx={{ bgcolor: 'primary.main' }}>
              <TableRow>
                <TableCell
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    // Padding reduzido no mobile (xs) e padrão no desktop (sm+)
                    px: { xs: 1, sm: 3 },
                    width: { xs: 60, sm: 80 },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  Imagem
                </TableCell>

                <TableCell
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    px: { xs: 1, sm: 3 },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {/* Texto adaptável: "Nome" em telas minúsculas, completo em maiores */}
                  <Box
                    component="span"
                    sx={{ display: { xs: 'none', sm: 'inline' } }}
                  >
                    Nome do Prato
                  </Box>
                  <Box
                    component="span"
                    sx={{ display: { xs: 'inline', sm: 'none' } }}
                  >
                    Prato
                  </Box>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    px: { xs: 1, sm: 3 },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pratos.map((prato) => (
                <TableRow
                  key={prato.id}
                  sx={{
                    '&:hover': { bgcolor: '#f9f9f9' },
                    '& td, & th': {
                      borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    },
                  }}
                >
                  {/* Imagem menor */}
                  <TableCell sx={{ px: 2, py: 1, width: 60 }}>
                    <Avatar
                      src={prato.imagem}
                      alt={prato.nome}
                      sx={{
                        width: 34, // Tamanho reduzido
                        height: 34,
                        fontSize: '0.9rem', // Letra dentro do avatar menor
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        bgcolor: '#f2745f',
                        border: '1px solid #fff',
                      }}
                    >
                      {prato.nome.charAt(0).toUpperCase()}
                    </Avatar>
                  </TableCell>

                  {/* Nome com fonte menor */}
                  <TableCell
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.8rem', // Fonte reduzida
                      color: 'text.secondary',
                      px: 2,
                    }}
                  >
                    {prato.nome}
                  </TableCell>

                  {/* Ações com ícones menores */}
                  <TableCell align="center" sx={{ px: 2 }}>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
                    >
                      <Tooltip title="Editar" arrow>
                        <IconButton
                          component={RouterLink}
                          to={`/admin/pratos/${prato.id}`}
                          size="small"
                          sx={{
                            padding: '4px', // Botão mais justo ao ícone
                            color: 'primary.main',
                            border: '1px solid rgba(25, 118, 210, 0.2)',
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: 'white',
                            },
                          }}
                        >
                          <EditIcon sx={{ fontSize: 16 }} />{' '}
                          {/* Ícone menor (16px) */}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Excluir" arrow>
                        <IconButton
                          onClick={() => excluir(prato)}
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
                          {/* Ícone menor (16px) */}
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
