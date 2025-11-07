// models/Disciplina.js
import { DataTypes } from "sequelize";
import { sequelize } from "../Config/configDB.js";
import Professor from "./Professor.js"; 

const Disciplina = sequelize.define("Disciplina", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  codigo: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cargaHoraria: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  semestre: {
    type: DataTypes.STRING(20),
    allowNull: true 
  },
  ativa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: "Disciplinas"
});


Disciplina.belongsTo(Professor, {
  foreignKey: "matricula",
  as: "professor"
});


Professor.hasMany(Disciplina, {
  foreignKey: "matricula",
  as: "disciplinas"
});

export default Disciplina;
