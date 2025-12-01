import { Router } from "express";
import PresencaController from "../Controllers/PresencaController.js";

const router = Router();

router.post("/", PresencaController.registrar);
router.get("/", PresencaController.listar);
router.get("/aula/:id", PresencaController.porAula);
router.get("/aluno/:matricula", PresencaController.porAluno);

export default router;
