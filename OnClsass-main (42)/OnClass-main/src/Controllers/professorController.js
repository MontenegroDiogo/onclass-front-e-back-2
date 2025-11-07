import * as service from "../Services/professorService.js";

export const criarProfessor = async (req, res) => {
    try {
        const professor = await service.criarProfessor(req.body);
        return res.status(201).json(professor);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
};

export const listarProfessores = async (req, res) => {
    try {
        const professores = await service.listarProfessores();
        return res.status(200).json(professores);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const buscarProfessor = async (req, res) => {
    try {
        const filtros = req.query;
        const professor = await service.buscarProfessor(filtros);
        return res.status(200).json(professor);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const editarProfessor = async (req, res) => {
    try {
        const { matricula } = req.params;
        const professor = await service.editarProfessor(matricula, req.body);
        return res.status(200).json(professor);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
