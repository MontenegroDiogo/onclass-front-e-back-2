import Aula from "../Models/Aula.js";

class AulaService {
    static async criarAula(data) {
        return await Aula.create(data);
    }

    static async listarAulas() {
        return await Aula.findAll();
    }

    static async buscarPorId(id) {
        return await Aula.findByPk(id);
    }

    static async atualizarAula(id, data) {
        const aula = await Aula.findByPk(id);
        if (!aula) return null;
        return await aula.update(data);
    }

    static async deletarAula(id) {
        const aula = await Aula.findByPk(id);
        if (!aula) return null;
        await aula.destroy();
        return true;
    }
}

export default AulaService;
