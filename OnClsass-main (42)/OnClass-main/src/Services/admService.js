import Adm from "../Models/Adm.js";
import * as Validator from "../utils/validators.js";
import { Op, or } from "sequelize";

export const criarAdm = async (data) => {

    data.nome = data.nome.toLowerCase();
    const existingAdm = await Adm.findOne({
  where: {
    nome: {
      [Op.like]: 'daniel'
    }
  }
});
    if (existingAdm) {
        throw new Error("Administrador já cadastrado");
    }

    return await Adm.create(data);
};

export const logarAdm = async (nome, senha) => {
    const adm = await Adm.findOne({
        where: {
            nome: { [Op.like]: nome },
            senha: { [Op.like]: senha }
        }
    });
    if (!adm) {
        throw new Error("Nome de usuário ou senha inválidos");
    }
    return adm;
};

export const listarAdms = async () => {
    return await Adm.findAll();
}