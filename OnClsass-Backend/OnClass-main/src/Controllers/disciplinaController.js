import e from "express";
import * as service from "../Services/disciplinaService.js";

export const criarDisciplina = async (req, res) => {
  try {
    const disciplina = await service.criarDisciplina(req.body);
    res.status(201).json(disciplina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listarDisciplinas = async (req, res) => {
  try {
    const disciplinas = await service.listarDisciplinas();
    res.status(200).json(disciplinas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const buscarDisciplina = async (req, res) => {
  try {
    const filtros = req.query;
    const disciplina = await service.buscarDisciplina(filtros);
    res.status(200).json(disciplina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const editarDisciplina = async (req, res) => {
  try {
    const { codigo } = req.params;
    const disciplina = await service.editarDisciplina(codigo, req.body);
    res.status(200).json(disciplina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};