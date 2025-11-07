import * as service from "../Services/alunoService.js";

export const criarAluno = async (req, res) => {
  try {
    const aluno = await service.criarAluno(req.body);
    res.status(201).json(aluno); // CREATED
  } catch (error) {
    res.status(400).json(error.message );
  }
};

export const listar = async (req, res) => {
  try {
    const alunos = await service.listarAlunos();
    res.status(200).json(alunos); // OK
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const buscar = async (req, res) => {
  try {
    const filtros = req.query;
    const aluno = await service.buscarAluno(filtros);
    res.status(200).json(aluno); // OK
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const editar = async (req, res) => {
  try {
    const { matricula } = req.params;
    const aluno = await service.editarAluno(matricula, req.body);
    res.status(200).json(aluno); // OK
  } catch (error) {
    res.status(400).json(error.message);
  }
};
