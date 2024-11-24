# Atividade Oficial

## Enunciado
Implementação de um sistema CRUD (Create, Read, Update, Delete) para um Gerenciador de Tarefas com TypeScript e MongoDB.

## Objetivo
Desenvolver uma aplicação completa em TypeScript que permita a criação, leitura, atualização e exclusão de registros de um Gerenciador de Tarefas (como se fosse uma agenda) em um banco de dados MongoDB, garantindo a persistência e integridade dos dados.

## Estrutura do Projeto

### Funcionalidades Essenciais

#### Criação de listas
- **Tipos de listas:** Tarefas, projetos, compras, etc.
- **Personalização:** Nomes de listas, cores, ícones.

#### Tarefas
- **Atributos:** Título, descrição, data de vencimento, prioridade, status (pendente, concluída, atrasada).
- **Subtarefas:** Divisão de tarefas maiores em partes menores.
- **Anexos:** Possibilidade de adicionar arquivos (documentos, imagens) às tarefas.

#### Prioridades
- **Níveis de prioridade:** Alta, média, baixa.
- **Personalização:** Possibilidade de criar níveis de prioridade personalizados.

#### Prazos
- **Data e hora:** Definição precisa do prazo.
- **Alertas:** Notificações antes do prazo.

#### Busca e filtragem
- **Busca por palavras-chave:** Título, descrição, listas.
- **Filtros:** Por data, prioridade, status, lista.

#### Compartilhamento
- **Compartilhamento de listas:** Possibilidade de compartilhar listas com outros usuários.

## Modelo de Dados no MongoDB
- **Usuários:** Nome, e-mail, senha, listas.
- **Listas:** Nome, usuário, tarefas.
- **Tarefas:** Título, descrição, data de criação, data de vencimento, prioridade, status, lista, subtarefas, anexos.

## Estrutura de um Projeto de Gerenciador de Tarefas com TypeScript e MongoDB
A estrutura de um projeto de gerenciador de tarefas pode variar dependendo das tecnologias escolhidas e das preferências do desenvolvedor, mas geralmente segue um padrão similar. A seguir, apresentamos uma possível estrutura básica e detalhada, considerando as tecnologias mencionadas (TypeScript, MongoDB, Node.js, Express.js):

### Estrutura de Diretórios

- **src:** Contém o código fonte principal da aplicação.
  - **controllers:** Contém os controladores que recebem as requisições HTTP e delegam o processamento para os serviços.
  - **models:** Define os modelos de dados que representam as coleções do MongoDB (tarefas, listas, usuários).
  - **services:** Contém a lógica de negócio da aplicação, como criar, atualizar e deletar tarefas.
  - **routes:** Define as rotas da API REST, mapeando as URLs às funções dos controladores.
  - **config:** Contém arquivos de configuração, como as configurações do banco de dados.
- **index.ts:** É o ponto de entrada da aplicação, iniciando o servidor.
- **package.json:** Contém as dependências do projeto.

### Explicação dos Arquivos

- **task.controller.ts:** Controla as requisições relacionadas a tarefas (criar, listar, atualizar, deletar).
- **task.model.ts:** Define o esquema da tarefa no MongoDB.
- **task.service.ts:** Contém a lógica para criar, atualizar e deletar tarefas no banco de dados.
- **tasks.routes.ts:** Define as rotas para as operações relacionadas a tarefas.
- **database.config.ts:** Contém as configurações para se conectar ao banco de dados MongoDB.

### Estrutura do projeto:
task-manager/
├── index.js         (backend)
├── index.html       (frontend HTML)
├── styles.css       (estilos CSS)
├── script.js        (frontend JavaScript)
└── package.json     (dependências)