import express from "express";
import * as disciplinaController from "../Controllers/disciplinaController.js";

const disciplinaRoutes = express.Router();

disciplinaRoutes.post("/", disciplinaController.criarDisciplina);
disciplinaRoutes.get("/", disciplinaController.listarDisciplinas);
disciplinaRoutes.get("/buscar", disciplinaController.buscarDisciplina);
disciplinaRoutes.patch("/:codigo", disciplinaController.editarDisciplina);

export default disciplinaRoutes;
