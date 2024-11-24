import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"
// 2. Conectamos ao banco de dados usando a função 'conectarAoBanco' e armazenamos a conexão em 'conexao'.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// 6. Definimos uma função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
    // 7. Selecionamos o banco de dados 'imersao-instabytes' e a coleção 'posts'.
    const db = conexao.db("imersao-instabytes");

    const colecao = db.collection("posts");
    // 8. Realizamos uma consulta para obter todos os documentos da coleção e os retornamos como um array.
    return colecao.find().toArray();
  }

  export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
  }

  export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}