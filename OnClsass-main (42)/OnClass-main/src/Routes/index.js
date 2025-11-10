import { Router } from "express";
import alunoRoutes from "./alunoRoutes.js";
import professorRoutes from "./professorRoutes.js";
import admRoutes from "./admRoutes.js";
import disciplinaRoutes from "./disciplinaRoutes.js";

const router = Router();

router.get("/teste", (req, res) => {
  res.json({ message: "tudo ok" });
});

router.use("/alunos", alunoRoutes);
router.use("/professores", professorRoutes);
router.use("/disciplinas", disciplinaRoutes);
router.use("/admin", admRoutes);

export default router;
