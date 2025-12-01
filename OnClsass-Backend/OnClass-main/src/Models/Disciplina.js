import { DataTypes } from "sequelize";
import { sequelize } from "../Config/configDB.js";

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
    allowNull: false
  },
  horarioInicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  horarioFim: {
    type: DataTypes.TIME,
    allowNull: false
  },
  diaSemana: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: "Ex: segunda, terca, quarta, quinta, sexta"
  }
}, {
  tableName: "Disciplinas"
});

export default Disciplina;
