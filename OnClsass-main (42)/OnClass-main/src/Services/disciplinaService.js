import Disciplina from "../Models/Disciplina.js";
import * as Validator from "../utils/validators.js";
import Professor from "../Models/Professor.js";
import { Op } from "sequelize";

export const criarDisciplina = async (data) => {
  await Validator.obrigatoriosDisciplina(data);
  await Validator.existeDisciplina(data.codigo);
  return await Disciplina.create(data);
};

export const listarDisciplinas = async () => {
  return await Disciplina.findAll({ include: [{ model: Professor, as: "professor" }] });
};

export const buscarDisciplina = async (filtros) => {
  const where = {};
  if (filtros.codigo) {
    where.codigo = filtros.codigo;
  }
  if (filtros.nome) {
    where.nome = { [Op.like]: `%${filtros.nome}%` };
  }
  if (filtros.descricao) {
    where.descricao = { [Op.like]: `%${filtros.descricao}%` };
  }
  if (filtros.matricula) {
    where.matricula = filtros.matricula;
  }
  return await Disciplina.findAll({ where, include: [{ model: Professor, as: "professor" }] });
};

export const editarDisciplina = async (codigo, data) => {

    const disciplina = await Disciplina.findOne({ where: { codigo } });
    if (!disciplina) throw new Error("Disciplina não encontrada");

    if (data.matricula) {
      const professor = await Professor.findOne({ where: { matricula: data.matricula } });
      if (!professor) throw new Error("Professor não encontrado");
      disciplina.matricula = data.matricula;
    }

    await disciplina.update(data);
    return disciplina;
};
