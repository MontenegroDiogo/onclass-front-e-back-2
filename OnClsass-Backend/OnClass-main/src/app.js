import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { sequelize } from "./Config/configDB.js";
import routes from "./Routes/index.js";
import "./Models/index.js";

dotenv.config();

const app = express();

// Necessário para __dirname funcionar em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// 1. Servir FRONT AQUI
app.use(express.static(path.join(__dirname, "public")));

// 2. Rotas da API
app.use("/api", routes);

// 3. 404 depois de tudo
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com banco estabelecida!");
  } catch (error) {
    console.error("Erro ao conectar com o banco:", error);
    return;
  }

  try {
    await sequelize.sync({ force: true }); 
    console.log("Tabelas sincronizadas!");
  } catch (error) {
    console.error("Erro ao sincronizar tabelas:", error);
    return;
  }

  try {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor rodando em 0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao subir servidor:", error);
  }
}

startServer();
