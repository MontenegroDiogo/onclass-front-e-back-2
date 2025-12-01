import { Router } from "express";
import alunoRoutes from "./alunoRoutes.js";
import professorRoutes from "./professorRoutes.js";
import admRoutes from "./admRoutes.js";
import disciplinaRoutes from "./disciplinaRoutes.js";
import aulaRoutes from "./AulaRoutes.js";
import qrcodeRoutes from "./qrcodeRoutes.js";
import presencaRoutes from "./presencaRoutes.js";

const router = Router();

router.get("/teste", (req, res) => {
  res.json({ message: "tudo ok" });
});

router.use("/alunos", alunoRoutes);
router.use("/professores", professorRoutes);
router.use("/disciplinas", disciplinaRoutes);
router.use("/admin", admRoutes);
router.use("/aulas", aulaRoutes);
router.use("/qrcodes", qrcodeRoutes);
router.use("/presencas", presencaRoutes);

export default router;
