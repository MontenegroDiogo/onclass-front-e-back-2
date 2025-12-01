import Aluno from "./Aluno.js";
import Aula from "./Aula.js";
import QRCode from "./QRCode.js";
import Curso from "./Curso.js";
import Disciplina from "./Disciplina.js";
import Professor from "./Professor.js";
import ProfessorCurso from "./ProfessorCurso.js";
import CursoDisciplina from "./CursoDisciplina.js";

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

/*
    RELAÇÃO PROFESSOR -> CURSO (many-to-many)
    1 Professor TEM MUITOS Cursos
    1 Curso TEM MUITOS Professores
*/
Professor.belongsToMany(Curso, {
    through: ProfessorCurso,
    foreignKey: "professorId",
    otherKey: "cursoId",
    as: "cursos"
});

Curso.belongsToMany(Professor, {
    through: ProfessorCurso,
    foreignKey: "cursoId",
    otherKey: "professorId",
    as: "professores"
});

/*
    RELAÇÃO CURSO -> DISCIPLINA (many-to-many)
    1 Curso TEM MUITAS Disciplinas
    1 Disciplina TEM MUITOS Cursos
*/
Curso.belongsToMany(Disciplina, {
    through: CursoDisciplina,
    foreignKey: "cursoId",
    otherKey: "disciplinaId",
    as: "disciplinas"
});

Disciplina.belongsToMany(Curso, {
    through: CursoDisciplina,
    foreignKey: "disciplinaId",
    otherKey: "cursoId",
    as: "cursos"
});

export { Aluno, Aula, QRCode, Curso, Disciplina, Professor, ProfessorCurso, CursoDisciplina };