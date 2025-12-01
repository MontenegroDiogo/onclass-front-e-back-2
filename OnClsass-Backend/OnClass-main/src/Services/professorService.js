import Professor from "../Models/Professor.js";
import * as Validator from "../utils/validators.js";
import { Op } from "sequelize";

export const criarProfessor = async (data) => {
    const errors = Validator.obrigatoriosProfessor(data);
    if (errors.length > 0) {
        throw new Error(`Validation errors: ${errors.join(", ")}`);
    }
    const professor = await Professor.create(data);
    return professor;
};

export const listarProfessores = async () => {
    const professores = await Professor.findAll();
    return professores;
};

export const buscarProfessor = async (filtros) => {
    const where = {};
    if (filtros.matricula) {
        where.matricula = filtros.matricula;
    }
    if (filtros.nome) {
        where.nome = { [Op.like]: `%${filtros.nome}%` };
    }

    if (filtros.departamento) {
        where.departamento = { [Op.like]: `%${filtros.departamento}%` };
    }
    const professor = await Professor.findAll({ where });
    return professor;
};

export const editarProfessor = async (matricula, data) => {
    if (data.email) {
        await Validator.emailValido(data.email);
    }
    const professor = await Professor.findByPk(matricula);
    if (!professor) throw new Error("Professor não encontrado");

    await professor.update(data);
    return professor;
};

export const logarProfessor = async (data) => {
        const professor = await Professor.findOne({
            where: {
                matricula: { [Op.like]: data.matricula },
                senhaHASH: { [Op.like]: data.senhaHASH }
            }
        });
        if (!professor) {
            throw new Error("Matricula ou senha inválidos");
        }
        return professor;
    };