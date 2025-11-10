import Disciplina from './Disciplina.js';
import Professor from './Professor.js';

// Define as associações
Disciplina.belongsTo(Professor, {
  foreignKey: "matricula",
  as: "professor"
});

Professor.hasMany(Disciplina, {
  foreignKey: "matricula",
  as: "disciplinas"
});

export {
  Disciplina,
  Professor
};