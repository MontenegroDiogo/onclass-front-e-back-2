import { DataTypes } from "sequelize";
import { sequelize } from "../Config/configDB.js";

const ProfessorCurso = sequelize.define("ProfessorCurso", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  tableName: "ProfessorCursos"
});

export default ProfessorCurso;
