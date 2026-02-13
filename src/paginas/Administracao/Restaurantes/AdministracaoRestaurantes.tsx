import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import IRestaurante from "../../../interfaces/IRestaurante";

const BASE_URL = 'http://localhost:8000';
export const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        axios.get<IRestaurante[]>(BASE_URL + '/api/v2/restaurantes/').then(res => {
            setRestaurantes(res.data);
        });
    }, []);

    const excluir = (restauranteParaExcluir: IRestaurante) => {
        axios.delete(BASE_URL + `/api/v2/restaurantes/${restauranteParaExcluir.id}/`).then(() => {
            setRestaurantes(restaurantes.filter(restaurante => restaurante.id !== restauranteParaExcluir.id));
            alert('Restaurante excluído com sucesso!');
        }).catch(err => {
            alert('Erro ao excluir restaurante');
            console.log(err);
        } 

    );
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurantes.map(restaurante => (
                            <TableRow key={restaurante.id}>
                                <TableCell>{restaurante.nome}</TableCell>
                                 <TableCell><Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link></TableCell>
                                <TableCell onClick={() => excluir(restaurante)}>
                                    <Button>Excluir</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> 
            </>
    )
}
