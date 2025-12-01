import PresencaService from "../Services/PresencaService.js";

class PresencaController {
    static async registrar(req, res) {
        const { matricula, aulaId } = req.body;

        if (!matricula || !aulaId)
            return res.status(400).json({ error: "Dados incompletos" });

        try {
            const presenca = await PresencaService.registrar(matricula, aulaId);
            res.status(201).json(presenca);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async listar(req, res) {
        res.json(await PresencaService.listar());
    }

    static async porAula(req, res) {
        res.json(await PresencaService.buscarPorAula(req.params.id));
    }

    static async porAluno(req, res) {
        res.json(await PresencaService.buscarPorAluno(req.params.matricula));
    }
}

export default PresencaController;
