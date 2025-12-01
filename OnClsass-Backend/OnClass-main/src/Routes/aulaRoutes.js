import { Router } from "express";
import AulaController from "../Controllers/AulaController.js";

const router = Router();

router.post("/", AulaController.criar);
router.get("/", AulaController.listar);
router.get("/:id", AulaController.buscar);
router.put("/:id", AulaController.atualizar);
router.delete("/:id", AulaController.deletar);

export default router;
