import AulaService from "../Services/AulaService.js";

class AulaController {
    static async criar(req, res) {
        try {
            const aula = await AulaService.criarAula(req.body);
            res.status(201).json(aula);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async listar(req, res) {
        const aulas = await AulaService.listarAulas();
        res.json(aulas);
    }

    static async buscar(req, res) {
        const aula = await AulaService.buscarPorId(req.params.id);
        if (!aula) return res.status(404).json({ error: "Aula não encontrada" });
        res.json(aula);
    }

    static async atualizar(req, res) {
        const aula = await AulaService.atualizarAula(req.params.id, req.body);
        if (!aula) return res.status(404).json({ error: "Aula não encontrada" });
        res.json(aula);
    }

    static async deletar(req, res) {
        const ok = await AulaService.deletarAula(req.params.id);
        if (!ok) return res.status(404).json({ error: "Aula não encontrada" });
        res.json({ message: "Aula removida" });
    }
}

export default AulaController;
