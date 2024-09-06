npm init -y
npm i express dotenv mongoose
npm i -D @types/express
npm i -D ts-node ts-node-dev typescript
tsc --init
.gitignore : node_modules
.env: PORT = 3001

"scripts": {
 "start": "ts-node ./src",
 "dev": "ts-node-dev ./src"
},