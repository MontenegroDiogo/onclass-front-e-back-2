import { Router } from "express";
import QRCodeController from "../Controllers/QRCodeController.js";

const router = Router();

router.post("/", QRCodeController.criar);
router.get("/", QRCodeController.listar);
router.get("/:id", QRCodeController.buscar);
router.put("/:id", QRCodeController.atualizar);
router.delete("/:id", QRCodeController.deletar);

export default router;
