import Disciplina from './Disciplina.js';
import Professor from './Professor.js';

export function setupAssociations() {
    Disciplina.belongsTo(Professor, {
        foreignKey: "matricula",
        as: "professor"
    });

    Professor.hasMany(Disciplina, {
        foreignKey: "matricula",
        as: "disciplinas"
    });
}