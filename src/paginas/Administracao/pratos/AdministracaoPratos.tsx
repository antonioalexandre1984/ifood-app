import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar,
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { toast } from 'react-toastify';
import { http } from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const BASE_URL = 'http://localhost:8000/media/';

export const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([]);

    const carregarPratos = () => {
        http.get<IPrato[]>(`/pratos/`)
            .then(res => setPratos(res.data))
            .catch(err => toast.error("Erro ao carregar os pratos"));
    }

    useEffect(() => {
        carregarPratos();
    }, []);

    const excluir = (pratosParaExcluir: IPrato) => {
        http.delete(`/pratos/${pratosParaExcluir.id}/`)
            .then(() => {
                setPratos(pratos.filter(r => r.id !== pratosParaExcluir.id));
                toast.success('Prato removido com sucesso!');
            })
            .catch(err => {
                toast.error('Não foi possível excluir o prato.');
                console.error(err);
            });
    }

    return (

        < Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', // Centraliza horizontalmente
        width: '100%', 
        py: 4 
    }}>
        <Box sx={{width: '80%', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2}}>
            <Typography variant="h5" component="h1" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                Gerenciar Pratos
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
                <Table size="medium" sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: 'primary.main' }}>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', width: 50 }}>Imagem</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold',width: 25 }}>Nome do Restaurante</TableCell>
                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold',width: 25 }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pratos.map(prato => (
                            <TableRow key={prato.id} sx={{ '&:hover': { bgcolor: '#ece7e7' } }}>
                                <TableCell>
                                    <Avatar 
                                        src={prato.imagem} alt={prato.nome} 
                                        sx={{ 
                                            width: 48,
                                             height: 48,
                                              boxShadow: 1,
                                              bgcolor: '#f2745f',
                                              color: 'white',
                                              fontWeight: 'bold',
                                              border: '2px solid #f2745f',
                                             }}
                                      >
                                        <span>{prato.nome.charAt(0).toUpperCase()}</span>
                                    </Avatar>

                                </TableCell>
                                <TableCell sx={{ fontWeight: 500 }}>
                                    {prato.nome}
                                </TableCell>
                                <TableCell align="center">
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                        <Tooltip title="Editar">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<EditIcon />}
                                                component={RouterLink}
                                                to={`/admin/pratos/${prato.id}`}
                                            >
                                                Editar
                                            </Button>
                                        </Tooltip>

                                        <Tooltip title="Excluir">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="error"
                                                startIcon={<DeleteOutlineIcon />}
                                                onClick={() => excluir(prato)}
                                            >
                                                Excluir
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        {pratos.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                    Nenhum prato cadastrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        </Box>
    );
}