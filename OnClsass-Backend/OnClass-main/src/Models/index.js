import Aluno from "./Aluno.js";
import Aula from "./Aula.js";
import QRCode from "./QRCode.js";

/*
    RELAÇÃO AULA -> ALUNO
    1 Aula TEM MUITOS Alunos
    1 Aluno PERTENCE a 1 Aula
*/
Aula.hasMany(Aluno, {
    foreignKey: "aulaId",
    as: "alunos"
});

Aluno.belongsTo(Aula, {
    foreignKey: "aulaId",
    as: "aula"
});

/*
    RELAÇÃO AULA -> QRCode
    1 Aula TEM 1 QRCode
    1 QRCode PERTENCE a 1 Aula
*/
Aula.hasOne(QRCode, {
    foreignKey: "aulaId",
    as: "qrcode"
});

QRCode.belongsTo(Aula, {
    foreignKey: "aulaId",
    as: "aula"
});

export { Aluno, Aula, QRCode };