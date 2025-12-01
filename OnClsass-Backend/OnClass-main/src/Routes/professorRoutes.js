import express from "express";
import * as professorController from "../Controllers/professorController.js";

const professorRoutes = express.Router();

professorRoutes.post("/", professorController.criarProfessor);
professorRoutes.get("/", professorController.listarProfessores);
professorRoutes.get("/buscar", professorController.buscarProfessor);
professorRoutes.patch("/:matricula", professorController.editarProfessor);
professorRoutes.post("/login", professorController.logarProfessor);

export default professorRoutes;
