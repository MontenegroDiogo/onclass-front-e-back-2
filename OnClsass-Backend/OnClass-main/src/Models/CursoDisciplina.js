import { DataTypes } from "sequelize";
import { sequelize } from "../Config/configDB.js";

const CursoDisciplina = sequelize.define("CursoDisciplina", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  tableName: "CursoDisciplinas"
});

export default CursoDisciplina;
