Atividade 4 – TypeScript com MongoDB
Laboratório de Desenvolvimento Web

Projeto: Gerenciador de Eventos
Descrição: Crie um sistema para gerenciar eventos. O sistema permite adicionar, editar, excluir e listar 
eventos. Cada evento terá informações como título, descrição, dados e local.
Requisitos necessários:
Modelo de Dados no MongoDB:
• Título: String (obrigatório),
• Descrição: String (opcional),
• Data: Data (obrigatório),
• Local: String (obrigatório).
Funcionalidades do CRUD:
• Criar: Adicionar um novo evento.
• Leia: Listar todos os eventos ou pesquisar por título.
• Atualização: Atualizar informações de um evento.
• Excluir: Remover um evento.
Estrutura do Projeto:
• Backend em TypeScript:
• Rotas usando Express para o CRUD.
• Conexão com MongoDB via Mongoose.
• Validação dos dados no modelo Mongoose.
• Frontend Opcional (ou Postman):
• Para listar eventos e enviar requisições (caso deseje adicionar visualização, use EJS ou React).

Execução:
• O projeto deve rodar em localhost:3000.
• Exibir mensagens de sucesso ou erro nas operações.
Exemplo de Rotas:
• POST /api/events : Adicionado um novo evento.
• OBTER /api/events : Lista de todos os eventos.
• GET /api/events/:id : Obtenha detalhes de um evento específico.
• PUT /api/events/:id : Atualiza um evento.
• DELETE /api/events/:id : Remove um evento.
A criatividade será um dos critérios de avaliação