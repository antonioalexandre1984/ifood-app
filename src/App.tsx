import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurantes />} />
      <Route path="/admin/restaurantes/:id" element={<FormularioRestaurantes />} />
    </Routes>
    <ToastContainer autoClose={3000} position="bottom-right" />
    </>
  );
}
