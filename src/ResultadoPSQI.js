import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Plot from 'react-plotly.js'; 
import './FormularioQualidadeSono.css'; 

function ResultadoPSQI() {
  const navigate = useNavigate();
  const location = useLocation();
  const respostas = location.state?.respostas || {}; 

  const calcularPontuacao = () => {
    let pontuacao = 0;

    pontuacao += respostas.qualidadeSono; 
    pontuacao += respostas.disturbiosSono[0]; 
    pontuacao += respostas.remedioDormir; 

    return pontuacao;
  };

  const pontuacaoFinal = calcularPontuacao();
  const resultado = pontuacaoFinal > 5 ? 'Sono insatisfatório (baixa qualidade do sono).' : 'Sono satisfatório.';
  const handleRefazerFormulario = () => {
    navigate('/formulario'); 
  };

  const data = [
    {
      type: 'bar',
      x: ['Qualidade do Sono', 'Latência', 'Duração', 'Eficiência', 'Distúrbios'],
      y: [respostas.qualidadeSono, respostas.tempoDormir, respostas.horasSono, respostas.disturbiosSono[0], respostas.disturbiosSono.slice(1).reduce((a, b) => a + b, 0), respostas.remedioDormir, respostas.dificuldadeFicarAcordado + respostas.entusiasmo],
      marker: { color: 'rgba(55, 128, 191, 0.6)', width: 1.5 },
    },
  ];

  const layout = {
    title: 'Pontuação dos Componentes PSQI',
    yaxis: { title: 'Pontuação' },
    width: 600,  
    height: 400, 
    autosize: true,
    margin: { t: 50, b: 50, l: 50, r: 50 } 
  };

  return (
    <div className="container">
      <h2>Resultado PSQI</h2>
      <p>Pontuação total: {pontuacaoFinal}</p>
      <p>{resultado}</p>

      {/* Exibir gráfico */}
      <div className="grafico-container">
        <Plot data={data} layout={layout} useResizeHandler={true} style={{ width: "100%", height: "100%" }} />
      </div>

      {/* Botão para refazer o formulário */}
      <button onClick={handleRefazerFormulario}>Refazer Formulário</button>
    </div>
  );
}

export default ResultadoPSQI;
