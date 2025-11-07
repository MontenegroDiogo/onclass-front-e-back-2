import Aluno from "../Models/Aluno.js";

export async function emailValido(email) {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      throw new Error("E-mail inválido");
    }
    return true;
}

export async function obrigatoriosAluno(data) {
    const camposObrigatorios = ["matricula", "nome", "email", "senhaHASH", "DeviceId"];
    for (const campo of camposObrigatorios) {
        if (!data[campo]) {
            throw new Error(`O campo ${campo} é obrigatório`);
        }
    }
    return true;
}

export async function existe(data) {
    const camposUnicos = ["matricula", "email"];
    for (const campo of camposUnicos) {
        const existe = await Aluno.findOne({ where: { [campo]: data[campo] } });
        if (existe) {
            throw new Error(`${campo} já está cadastrado!`);
        }
    }
    return true;
}

export async function obrigatoriosProfessor(data) {
    const obrigatorios = ["matricula", "nome", "email", "senhaHASH"];
    for (const campo of obrigatorios) {
        if (!data[campo]) {
            throw new Error(`O campo ${campo} é obrigatório`);
        }
    }
    await emailValido(data.email);
    await existe(data);
    return true;
}

export async function obrigatoriosDisciplina(data) {
    const obrigatorios = ["codigo", "nome", "descricao", "matricula"];
    for (const campo of obrigatorios) {
        if (!data[campo]) {
            throw new Error(`O campo ${campo} é obrigatório`);
        }
    }
    await existeProfessor(data.matricula);
    return true;
}

export async function existeProfessor(matricula) {
    const professor = await Professor.findOne({ where: { matricula } });
    if (!professor) {
        throw new Error("Professor não encontrado");
    }
    return true;
}

export async function existeDisciplina(codigo) {
    const disciplina = await Disciplina.findOne({ where: { codigo } });
    if (!disciplina) {
        return true;
    }
    throw new Error("Disciplina já cadastrada");
}
