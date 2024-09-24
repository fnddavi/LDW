# Atividade 01 - Configuração de Projeto Fullstack (React + Express)

## Passos para criar o Frontend e Backend

### 1. Criar o Frontend com React e TypeScript
```bash
npx create-react-app atv01 --template typescript

### Criar o front em Branco
npx create-react-app atv01 --template typescript

### Criar o back
mkdir backend
cd backend
npm init -y

### bibliotecas principais:
npm install express mongoose cors dotenv
npm install --save-dev typescript @types/node @types/express @types/cors ts-node

### arquivo de configuração do TypeScript:
npx tsc --init

### em tsconfig.json, ajuste as configurações para incluir:
"outDir": "./dist",
"rootDir": "./src",

### Estrutura do back:
backend/
├── src/
│   ├── controllers/
│   │   └── customerController.ts
│   ├── models/
│   │   └── customer.ts
│   ├── routes/
│   │   └── customerRoutes.ts
│   ├── app.ts
│   ├── server.ts
├── .env
├── package.json
├── tsconfig.json


### Rodar o servidor em modo de desenvolvimento:
> npm run dev


#### Se necessário:
#### Instalar ts-node-dev:

npm install ts-node-dev --save-dev

#### Instalar ts-node:

npm install ts-node --save-dev

#### Scripts no package.json:

"scripts": {
  "start": "ts-node ./src/server.ts",
  "dev": "ts-node-dev ./src/server.ts"
}
