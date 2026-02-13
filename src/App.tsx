import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import {FormularioRestaurantes} from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import { AdministracaoRestaurantes } from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurantes />} />
      <Route path="/admin/restaurantes/:id" element={<AdministracaoRestaurantes />} />
    </Routes>
  );
}

export default App;
