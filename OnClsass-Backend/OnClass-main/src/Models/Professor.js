import { DataTypes } from "sequelize";
import { sequelize } from "../Config/configDB.js";

const Professor = sequelize.define("Professor", { 
    matricula: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senhaHASH: {
        type: DataTypes.STRING,
        allowNull: false
    }
    // departamento: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // }
});

export default Professor;
