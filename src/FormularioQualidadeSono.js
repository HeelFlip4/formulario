import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './FormularioQualidadeSono.css';

function FormularioQualidadeSono() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null); 
  const [respostas, setRespostas] = useState({
    horaDeitar: '',
    tempoDormir: '',
    horaLevantar: '',
    horasSono: '',
    disturbiosSono: Array(10).fill(0),
    qualidadeSono: 0,
    remedioDormir: 0,
    dificuldadeFicarAcordado: 0,
    entusiasmo: 0,
    parceiro: 0
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRespostas((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOptionChange = (indice, valor) => {
    const novosDisturbios = [...respostas.disturbiosSono];
    novosDisturbios[indice] = parseInt(valor);
    setRespostas((prevState) => ({
      ...prevState,
      disturbiosSono: novosDisturbios
    }));
  };

  const handleSimpleOptionChange = (e) => {
    const { name, value } = e.target;
    setRespostas((prevState) => ({
      ...prevState,
      [name]: parseInt(value)
    }));
  };

  const validateForm = () => {
    const { horaDeitar, tempoDormir, horaLevantar, horasSono } = respostas;
    let isValid = true;
    let errorMsg = '';

    if (!horaDeitar || !tempoDormir || !horaLevantar || !horasSono) {
      isValid = false;
      errorMsg = 'Por favor, responda todas as perguntas obrigatórias.';
    }

    const horaRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    const minutoRegex = /^[0-9]+$/;

    if (horaDeitar && !horaRegex.test(horaDeitar)) {
      isValid = false;
      errorMsg = 'Hora de deitar deve estar no formato HH:MM.';
    }

    if (tempoDormir && (!minutoRegex.test(tempoDormir) || tempoDormir <= 0)) {
      isValid = false;
      errorMsg = 'Tempo para dormir deve ser um número positivo de minutos.';
    }

    if (horaLevantar && !horaRegex.test(horaLevantar)) {
      isValid = false;
      errorMsg = 'Hora de levantar deve estar no formato HH:MM.';
    }

    if (horasSono && (!minutoRegex.test(horasSono) || horasSono <= 0)) {
      isValid = false;
      errorMsg = 'Horas de sono deve ser um número positivo de horas.';
    }

    if (!isValid) {
      alert(errorMsg);
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:5000/api/psqi', respostas, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('Respostas enviadas com sucesso!');
        navigate('/resultado', { state: { respostas } });
      } catch (error) {
        console.error('Erro ao enviar respostas', error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    } else {
      setToken(token);
    }
  }, [navigate]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Formulário de Qualidade do Sono</h2>

        {/* Perguntas Abertas */}
        <div>
          <label>Quando você geralmente vai para a cama à noite?</label>
          <input
            type="text"
            name="horaDeitar"
            value={respostas.horaDeitar}
            onChange={handleInputChange}
            placeholder="HH:MM"
          />
        </div>

        <div>
          <label>Quanto tempo (em minutos) você geralmente leva para dormir à noite?</label>
          <input
            type="number"
            name="tempoDormir"
            value={respostas.tempoDormir}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Quando você geralmente levanta de manhã?</label>
          <input
            type="text"
            name="horaLevantar"
            value={respostas.horaLevantar}
            onChange={handleInputChange}
            placeholder="HH:MM"
          />
        </div>

        <div>
          <label>Quantas horas de sono você teve por noite?</label>
          <input
            type="number"
            name="horasSono"
            value={respostas.horasSono}
            onChange={handleInputChange}
          />
        </div>

        {/* Distúrbios do Sono */}
        <label>Durante o último mês, com que frequência você teve dificuldade para dormir por:</label>
        {[
          "Não conseguiu adormecer em até 30 minutos",
          "Acordou no meio da noite ou de manhã cedo",
          "Precisou levantar para ir ao banheiro",
          "Não conseguiu respirar confortavelmente",
          "Tossiu ou roncou forte",
          "Sentiu muito frio",
          "Sentiu muito calor",
          "Teve sonhos ruins",
          "Teve dor",
          "Outra(s) razão(ões)"
        ].map((pergunta, indice) => (
          <div key={indice}>
            <label>{pergunta}</label>
            <select
              value={respostas.disturbiosSono[indice]}
              onChange={(e) => handleOptionChange(indice, e.target.value)}
            >
              <option value="0">Nenhuma no último mês</option>
              <option value="1">Menos de uma vez por semana</option>
              <option value="2">Uma ou duas vezes por semana</option>
              <option value="3">Três ou mais vezes na semana</option>
            </select>
          </div>
        ))}

        {/* Pergunta 6: Qualidade Geral do Sono */}
        <div>
          <label>Como você classificaria a qualidade do seu sono de uma maneira geral?</label>
          <select
            name="qualidadeSono"
            value={respostas.qualidadeSono}
            onChange={handleSimpleOptionChange}
          >
            <option value="0">Muito boa</option>
            <option value="1">Boa</option>
            <option value="2">Ruim</option>
            <option value="3">Muito ruim</option>
          </select>
        </div>

        {/* Envio */}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default FormularioQualidadeSono;
