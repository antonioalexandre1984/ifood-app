import DeleteIcon from '@mui/icons-material/Delete'
import ImageIcon from '@mui/icons-material/Image'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { http } from '../../../http'
import IPrato from '../../../interfaces/IPrato'
import IRestaurante from '../../../interfaces/IRestaurante'
import Itag from '../../../interfaces/ITag'
export const FormularioPratos = () => {
  const paramarPrato = useParams()
  const navigate = useNavigate()
  const [nomePrato, setNomePrato] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tag, setTag] = useState('')
  const [restaurante, setRestaurante] = useState<number | string>('')
  const [imagem, setImagem] = useState<File | null>(null)
  const [nomeArquivoImagem, setNomeArquivoImagem] = useState('')

  const [tags, setTags] = useState<Itag[]>([])
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  // Função para limpar a imagem
  const limparImagem = () => {
    setImagem(null)
  }

  // Função para detectar a tecla Delete ou Backspace
  const aoPressionarTecla = (event: React.KeyboardEvent) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      limparImagem()
    }
  }

  useEffect(() => {
    // Busca as tags e os restaurantes para preencher os selects
    http
      .get<{ tags: Itag[] }>('/tags/')
      .then((res) => setTags(res.data.tags))
      .catch(() =>
        http
          .get<{ tags: Itag[] }>('/tags/')
          .then((res) => setTags(res.data.tags)),
      )

    http
      .get<IRestaurante[]>('/restaurantes/')
      .then((res) => setRestaurantes(res.data))

    if (paramarPrato.id) {
      http.get<IPrato>(`/pratos/${paramarPrato.id}/`).then((res) => {
        setNomePrato(res.data.nome)
        setDescricao(res.data.descricao)
        setTag(res.data.tag)
        setRestaurante(res.data.restaurante)
        if (res.data.imagem) {
          const partesDoNome = res.data.imagem.split('/')
          const nomeArquivo = partesDoNome[partesDoNome.length - 1]
          setNomeArquivoImagem(nomeArquivo)
        }
      })
    }
  }, [paramarPrato])

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    /*   const dadosPrato = {
      nome: nomePrato,
      descricao: descricao,
      tag: tag,
      restaurante: restaurante,
      imagem: `pratosCardapio/${imagem}`

    } */

    const dadosPrato = new FormData()
    dadosPrato.append('nome', nomePrato)
    dadosPrato.append('descricao', descricao)
    dadosPrato.append('tag', tag)
    dadosPrato.append('restaurante', restaurante.toString())
    if (imagem) {
      dadosPrato.append('imagem', imagem)
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

  //Função para capturar o nome do arquivo quando o usuario seleciona um arquivo
  /*  const selectedFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0){
        setImagem(e.target.files[0].name)
    } 
  }
 */

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: { xs: 2, sm: 4 },
          px: { xs: 1, sm: 0 }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
          <RestaurantMenuIcon color="primary" sx={{fontSize:{xs:28,sm:35}}} />
          <Typography component="h1" variant="h5" fontWeight="600" sx={{fontSize:{xs:'1.25rem',sm:'1.5rem'}}}>
            {paramarPrato.id ? 'Editar Prato' : 'Novo Prato'}
          </Typography>
        </Box>

        <Box component="form" onSubmit={aoSubmeterForm} sx={{ width: '100%', maxWidth: '600px' }}>
          <TextField
            value={nomePrato}
            onChange={(e) => setNomePrato(e.target.value)}
            label="Nome do Prato"
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            label="Descrição"
            fullWidth
            required
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection:{xs:'column',sm:'row'} }}>
            <TextField
              select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              label="Tag"
              fullWidth
              required
            >
              {tags.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              value={restaurante}
              onChange={(e) => setRestaurante(e.target.value)}
              label="Restaurante"
              fullWidth
              required
            >
              {restaurantes.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nome}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {/* Campo de Imagem */}
            <Box
              sx={{
                mb: 4,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 1,
                width: '100%',
              }}
            >
              <TextField
                label="Arquivo da Imagem"
                value={imagem ? imagem.name : nomeArquivoImagem}
                fullWidth
                //sx={{height: { xs: '45px', sm: '40px' }}}
                required={!paramarPrato.id}
                onKeyDown={aoPressionarTecla}
                placeholder="Nenhum arquivo selecionado, clique em 'Selecionar'"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <ImageIcon color="primary" fontSize="small" />
                    </InputAdornment>
                  ),
                  // Ícone de lixeira aparece apenas se houver imagem
                  endAdornment: imagem && (
                    <InputAdornment position="end">
                      <Tooltip title="Remover arquivo (ou pressione Delete)">
                        <IconButton
                          onClick={limparImagem}
                          edge="end"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                //helperText="Clique em 'Selecionar' e lembre-se de copiar o arquivo para public/pratosCardapio/"
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth={window.innerWidth < 600}
                sx={{
                  height: { xs: '100%', sm: '40px' },
                  minWidth: '130px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease-in-out', // Transição suave
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark', // Escurece um pouco no hover
                    transform: 'scale(1.05)', // Aumenta levemente o tamanho
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)', // Sombra mais profunda
                    letterSpacing: '0.5px', // Efeito sutil no texto
                  },
                  '&:active': {
                    transform: 'scale(0.95)', // Efeito de clique (pressionar)
                  },
                }}
              >
                Selecionar
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const arquivo = e.target.files?.[0] || null
                    setImagem(arquivo)
                    if (arquivo) {
                      setNomeArquivoImagem('')
                    }
                  }}
                />
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              sx={{
                height: '56px',
                minWidth: '130px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease-in-out', // Transição suave
                backgroundColor: '#f50057',

                color: 'white',
                '&:hover': {
                  backgroundColor: '#ab003c', // Escurece um pouco no hover
                  transform: 'scale(1.05)', // Aumenta levemente o tamanho
                  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)', // Sombra mais profunda
                  letterSpacing: '0.5px', // Efeito sutil no texto
                },
                '&:active': {
                  transform: 'scale(0.95)', // Efeito de clique (pressionar)
                },
              }}
              color="inherit"
              onClick={() => navigate('/admin/pratos')}
            >
              Cancelar
            </Button>
            <Button
              sx={{
                height: '56px',
                minWidth: '130px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease-in-out', // Transição suave
                backgroundColor: 'primary.main',

                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark', // Escurece um pouco no hover
                  transform: 'scale(1.05)', // Aumenta levemente o tamanho
                  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)', // Sombra mais profunda
                  letterSpacing: '0.5px', // Efeito sutil no texto
                },
                '&:active': {
                  transform: 'scale(0.95)', // Efeito de clique (pressionar)
                },
              }}
              type="submit"
              variant="contained"
              size="large"
            >
              Salvar Prato
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
