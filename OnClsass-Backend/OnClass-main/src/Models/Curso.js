// models/Disciplina.js
import { DataTypes } from "sequelize";
import { sequelize } from "../Config/configDB.js";

const Curso = sequelize.define("Curso", {
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
    type: DataTypes.DOUBLE,
    allowNull: true 
  },
  disciplinas: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "Cursos"
});

export default Curso;