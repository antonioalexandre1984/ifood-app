import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginabaseAdmin from './paginas/Administracao/PaginabaseAdmin';
import { AdministracaoPratos } from './paginas/Administracao/pratos/AdministracaoPratos';
import { FormularioPratos } from './paginas/Administracao/pratos/FormularioPratos';
import { AdministracaoRestaurantes } from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import { FormularioRestaurantes } from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

export function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin/" element={<PaginabaseAdmin/>}>    
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurantes />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurantes />} />
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPratos />} />
        <Route path="pratos/:id" element={<FormularioPratos />} />
      </Route>
    </Routes>
    <ToastContainer autoClose={3000} position="bottom-right" />
    </>
  );
}
