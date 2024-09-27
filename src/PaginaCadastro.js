import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaginaCadastro.css'; 

function PaginaCadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        email,
        senha
      });
      setMensagem(response.data.message);
      navigate('/'); 
    } catch (error) {
      setMensagem(error.response.data.message || 'Erro ao registrar');
    }
  };

  return (
    <div className="container-cadastro">
      <div className="caixa-cadastro">
        <h2>Cadastrar</h2>
        <form onSubmit={handleCadastro}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
        <p>{mensagem}</p>
        <p>
          Já tem uma conta? <a href="/">Faça login</a>
        </p>
      </div>
    </div>
  );
}

export default PaginaCadastro;
