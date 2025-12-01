import express from "express";
import * as alunoController from "../Controllers/alunoController.js";

const alunoRoutes = express.Router();

alunoRoutes.post("/", alunoController.criarAluno);
alunoRoutes.get("/", alunoController.listar);
alunoRoutes.patch("/:matricula", alunoController.editar);
alunoRoutes.get("/buscar", alunoController.buscar);

export default alunoRoutes;
