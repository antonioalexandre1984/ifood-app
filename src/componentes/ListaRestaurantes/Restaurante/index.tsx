import axios from 'axios';
import { useEffect, useState } from 'react';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import { Prato } from '../Prato';
import estilos from './Restaurante.module.scss';

interface RestauranteProps {
  restaurante: IRestaurante
}
const BASE_URL = 'http://localhost:8000';
export const Restaurante = ({ restaurante }: RestauranteProps) => {
    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
    axios.get<IPrato[]>(BASE_URL + `/api/v1/restaurantes/${restaurante.id}/pratos/`).then(res => {
      setPratos(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])


  return (<section className={estilos.Restaurante}>
    <div className={estilos.Titulo}>
      <h2>{restaurante.nome}</h2>
    </div>
    <div>
      {pratos?.map(item => <Prato prato={item} key={item.id} />)}
    </div>
  </section>)
}
