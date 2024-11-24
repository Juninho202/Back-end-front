import express from 'express';
import routes from './src/routes/postRoutes.js';

const app = express();
app.use(express.static("uploads"))
routes(app)

// 5. Iniciamos o servidor na porta 3000 e exibimos uma mensagem no console.
app.listen(3000, () => {
  console.log('Servidor escutando...');
});