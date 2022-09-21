import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import Champions from './src/controller/Champions.js';

dotenv.config()

const port = process.env.PORT || 3002;

const app = express();

app.listen(port, () => {
  console.log(`Servidor rodando no endereço http://localhost:${port}`)
})

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "GET", "PUT", "POS", "DELETE");
  app.use(cors());
  next();
})

Champions.routes(app)



