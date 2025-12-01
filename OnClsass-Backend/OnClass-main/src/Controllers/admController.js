import * as Adm from "../Services/admService.js";

export const criarAdm = async (req, res) => {
    try {
        const novoAdm = await Adm.criarAdm(req.body);
        res.status(201).json(novoAdm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const logarAdm = async (req, res) => {
    try {
        const { nome, senha } = req.body;
        const adm = await Adm.logarAdm(nome, senha);
        res.status(200).json(adm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const listarAdms = async (req, res) => {
    try {
        const adms = await Adm.listarAdms();
        res.status(200).json(adms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};