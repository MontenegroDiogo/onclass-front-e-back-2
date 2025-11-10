import { DataTypes } from "sequelize";
import { sequelize } from "../Config/configDB.js";

const Adm = sequelize.define("Adm", {
    idAdm: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Adm;
