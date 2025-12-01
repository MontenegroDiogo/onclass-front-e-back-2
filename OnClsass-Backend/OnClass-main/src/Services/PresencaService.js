import Presenca from "../Models/Presenca.js";

class PresencaService {
    static async registrar(matricula, aulaId) {
        return await Presenca.create({ AlunoMatricula: matricula, AulaId: aulaId });
    }

    static async listar() {
        return await Presenca.findAll();
    }

    static async buscarPorAula(aulaId) {
        return await Presenca.findAll({ where: { AulaId: aulaId } });
    }

    static async buscarPorAluno(matricula) {
        return await Presenca.findAll({ where: { AlunoMatricula: matricula } });
    }
}

export default PresencaService;
