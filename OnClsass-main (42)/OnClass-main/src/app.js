import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from "./Config/configDB.js";
import routes from "./Routes/index.js";

dotenv.config();

const app = express();


//middlewares
app.use(cors());
app.use(express.json());


//rotas
app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});


async function startServer() {
  try {
    // 1. Testa conexão
    await sequelize.authenticate();
    console.log("Conexão com banco estabelecida!");
  } catch (error) {
    console.error("Erro ao conectar com o banco:", error);
    return; // se falhar aqui, nem adianta seguir
  }

  try {
    // 2. Cria/sincroniza tabelas
    await sequelize.sync( {force: true}); // ou { alter: true }
    console.log("Tabelas sincronizadas!");
  } catch (error) {
    console.error("Erro ao sincronizar tabelas:", error);
    return;
  }

  try {
    // 3. Sobe o servidor
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  } catch (error) {
    console.error("Erro ao subir servidor:", error);
  }
}

startServer();