import { DataTypes } from "sequelize";
import { sequelize } from "../Config/configDB.js";

const Aula = sequelize.define("Aula", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    conteudo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    horario_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horario_fim: {
        type: DataTypes.TIME,
        allowNull: false
    }
});

export default Aula;
    