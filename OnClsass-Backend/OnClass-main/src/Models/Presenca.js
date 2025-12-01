import { DataTypes } from "sequelize";
import { sequelize } from "../Config/configDB.js";
import Aluno from "./Aluno.js";
import Aula from "./Aula.js";

const Presenca = sequelize.define("Presenca", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    horario_marcado: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    deviceId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    validado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// Relações
Aluno.hasMany(Presenca, {
    foreignKey: {
        name: "alunoId",
        allowNull: false
    }
});
Presenca.belongsTo(Aluno, {
    foreignKey: "alunoId"
});

Aula.hasMany(Presenca, {
    foreignKey: {
        name: "aulaId",
        allowNull: false
    }
});
Presenca.belongsTo(Aula, {
    foreignKey: "aulaId"
});

export default Presenca;
