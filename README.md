
# Formulário de Qualidade do Sono

Este projeto é uma aplicação web interativa para coleta e análise de dados relacionados à qualidade do sono. Ele foi desenvolvido usando **React** para o front-end e **SQLite** como banco de dados local no backend.

## Funcionalidades

- **Formulário Interativo**: O formulário possui perguntas abertas e de múltipla escolha para avaliar aspectos do sono, como:
  - Horários de dormir e acordar.
  - Tempo necessário para adormecer.
  - Distúrbios do sono enfrentados durante o último mês.
  - Qualidade geral do sono e uso de medicamentos.
  - Problemas de cansaço e entusiasmo.

- **Validações de Dados**:
  - Todas as perguntas obrigatórias devem ser preenchidas antes do envio.
  - Validações específicas para as perguntas 1 a 4:
    - Perguntas 1, 3 e 4: Aceitam apenas horas no formato **HH:MM**.
    - Pergunta 2: Aceita apenas minutos no formato numérico.

- **Envio de Dados**:
  - Os dados preenchidos pelo usuário são enviados para o backend.
  - O backend utiliza **SQLite** para armazenar as respostas no banco de dados local.

## Tecnologias Utilizadas

### Front-end
- **React**: Responsável por criar a interface do usuário com um código modular e reutilizável.
- **CSS**: Personalização visual com um design limpo e responsivo.

### Backend
- **Python**: Gerencia a lógica do servidor e integra o front-end ao banco de dados.
- **SQLite**: Banco de dados local, ideal para aplicações menores, com instalação simples e alta eficiência.

## Funcionamento

1. **Preenchimento do Formulário**:
   - O usuário interage com os campos e seleciona as opções adequadas para responder às perguntas.

2. **Validações no Front-end**:
   - As respostas são validadas antes do envio para garantir consistência e evitar entradas inválidas.

3. **Envio ao Backend**:
   - Quando o formulário é enviado, as respostas são enviadas via requisição HTTP para o backend.

4. **Armazenamento no SQLite**:
   - O backend processa os dados e os salva em uma tabela no banco de dados SQLite.

5. **Persistência dos Dados**:
   - Os dados ficam armazenados localmente e podem ser acessados posteriormente para análises ou visualização de relatórios.

## Configuração e Execução

### Pré-requisitos
- **Node.js**: Para rodar o front-end.
- **Python**: Para executar o backend.
- **SQLite**: Banco de dados local.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/formulario-qualidade-sono.git
   cd formulario-qualidade-sono
   ```

2. Instale as dependências do front-end:
   ```bash
   cd frontend
   npm install
   ```

3. Configure o backend:
   - Certifique-se de que o arquivo do banco de dados SQLite (`database.db`) está no diretório especificado.
   - Execute o script Python para iniciar o servidor:
     ```bash
     python backend/server.py
     ```

4. Inicie o front-end:
   ```bash
   npm start
   ```

### Estrutura do Banco de Dados

Tabela `respostas`:
| Coluna                    | Tipo      | Descrição                                |
|---------------------------|-----------|------------------------------------------|
| `id`                      | INTEGER   | Identificador único                     |
| `hora_deitar`             | TEXT      | Horário em que o usuário costuma deitar |
| `tempo_dormir`            | INTEGER   | Tempo (em minutos) para adormecer       |
| `hora_levantar`           | TEXT      | Horário em que o usuário costuma acordar|
| `horas_sono`              | INTEGER   | Total de horas de sono                  |
| `disturbios_sono`         | TEXT      | Lista de frequências de distúrbios      |
| `qualidade_sono`          | INTEGER   | Avaliação da qualidade do sono          |
| `remedio_dormir`          | INTEGER   | Frequência de uso de remédios para dormir |
| `dificuldade_acordado`    | INTEGER   | Frequência de dificuldade para ficar acordado |
| `entusiasmo`              | INTEGER   | Problema relacionado ao entusiasmo      |
| `parceiro`                | INTEGER   | Situação com parceiro ou colega de quarto |

### Como Contribuir

1. Faça um fork do repositório.
2. Crie uma nova branch para suas alterações:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça o commit das suas alterações:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie suas alterações:
   ```bash
   git push origin minha-feature
   ```
5. Abra um pull request no GitHub.
