import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaginaLogin.css'; 

function PaginaLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        senha,
      });

      
      localStorage.setItem('token', response.data.token);
      setMensagem('Login bem-sucedido!');

      
      navigate('/formulario');
    } catch (error) {
      setMensagem(
        error.response?.data?.message || 'Erro ao fazer login. Tente novamente.'
      );
    }
  };

  const handleCadastro = () => {
    navigate('/cadastro');
  };

  return (
    <div className="container-login">
      <div className="caixa-login">
        <h2>Faça Login</h2>
        {mensagem && <p className="mensagem">{mensagem}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit">Entrar</button>
        </form>
        <p>
          Ainda não tem uma conta?{' '}
          <a href="#" onClick={handleCadastro}>
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}

export default PaginaLogin;
