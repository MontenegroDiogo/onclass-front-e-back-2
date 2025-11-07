import Aluno from "../Models/Aluno.js";
import * as Validator from "../utils/validators.js";
import { Op } from "sequelize";

export const criarAluno = async (data) => {

    data.email = data.email.toLowerCase();

  await Validator.obrigatoriosAluno(data);

  await Validator.emailValido(data.email);

  await Validator.existe(data);


  const aluno = await Aluno.create(data);
  return aluno.nome;
};

export const listarAlunos = async () => {
  const alunos = await Aluno.findAll();
  return alunos;
};

export const buscarAluno = async (filtro) => {
  const where = {};

  if (filtro.matricula) {
    where.matricula = filtro.matricula;
  }

  if (filtro.email) {
    where.email = filtro.email;
  }

  if (filtro.nome) {
    where.nome = { [Op.like]: `%${filtro.nome}%` };
  }

  if (filtro.curso) {
    where.curso = { [Op.like]: `%${filtro.curso}%` };
  }

  const aluno = await Aluno.findAll({ where });
  return aluno;
};

export const editarAluno = async (matricula, data) => {
  if (data.email) {
    await Validator.emailValido(data.email);
  }
  
  const aluno = await Aluno.findByPk(matricula);
  if (!aluno) throw new Error("Aluno não encontrado");

  await aluno.update(data);
  return aluno;
};
