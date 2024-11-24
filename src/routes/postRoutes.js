import express from "express";
import multer from "multer";
import { listarPost, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionSucessStatus: 200
}

// Configuração do armazenamento de arquivos usando Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos carregados
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo (opcional, aqui usamos o nome original)
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ storage: storage });

// Define as rotas para a aplicação Express
const routes = (app) => {
  // Configura o Express para entender requisições JSON
  app.use(express.json());
app.use(cors(corsOptions))
  // Rota para listar todos os posts (GET /posts)
  app.get("/posts", listarPost);

  // Rota para criar um novo post (POST /posts)
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de imagens (POST /upload)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;