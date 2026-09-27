# Projeto Agenda

Aplicação web de agenda/gerenciamento de tarefas, com autenticação de usuários e proteção contra abuso de requisições.

## Funcionalidades

- Cadastro e login de usuários
- Autenticação de sessão
- Rate limiting para proteção contra requisições excessivas
- Persistência de dados em banco NoSQL (MongoDB)
- Renderização de páginas dinâmicas no servidor

## Tecnologias utilizadas

- Node.js — ambiente de execução back-end
- Express — framework para rotas e servidor HTTP
- EJS — motor de templates para renderização das views
- MongoDB — banco de dados NoSQL
- Webpack — empacotamento dos assets do front-end

## Estrutura do projeto

```
projeto-agenda/
├── frontend/           # Arquivos de front-end (views/estilos)
├── public/assets/js/   # Scripts públicos servidos ao cliente
├── routes/             # Definição das rotas da aplicação
├── src/                # Código-fonte principal (lógica de negócio)
├── server.js           # Ponto de entrada do servidor
├── webpack.config.js   # Configuração do bundler
└── package.json
```

## Como rodar localmente

1. Clone o repositório
   ```bash
   git clone https://github.com/WalneyLinhares/projeto-agenda.git
   cd projeto-agenda
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente

   Crie um arquivo `.env` na raiz do projeto com:
   ```
   MONGODB_URI=sua_string_de_conexao_mongodb
   PORT=3000
   SESSION_SECRET=sua_chave_secreta
   ```
   Ajuste os nomes das variáveis conforme o que estiver configurado em `server.js`.

4. Inicie o servidor
   ```bash
   npm start
   ```

5. Acesse `http://localhost:3000` no navegador
