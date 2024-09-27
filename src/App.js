import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PaginaLogin from './PaginaLogin';
import PaginaCadastro from './PaginaCadastro';
import FormularioQualidadeSono from './FormularioQualidadeSono';
import ResultadoPSQI from './ResultadoPSQI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaLoginPage />} />
        <Route path="/cadastro" element={<PaginaCadastroPage />} />
        <Route path="/formulario" element={<FormularioQualidadeSono />} />
        <Route path="/resultado" element={<ResultadoPSQI />} />
      </Routes>
    </Router>
  );
}

function PaginaLoginPage() {
  const navigate = useNavigate();

  const aoCadastrar = () => {
    navigate('/cadastro');
  };

  const aoEntrar = () => {
    navigate('/formulario');
  };

  return <PaginaLogin aoCadastrar={aoCadastrar} aoEntrar={aoEntrar} />;
}

function PaginaCadastroPage() {
  const navigate = useNavigate();

  const aoLogar = () => {
    navigate('/');
  };

  return <PaginaCadastro aoLogar={aoLogar} />;
}

export default App;
