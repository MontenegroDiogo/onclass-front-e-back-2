import { DataTypes } from "sequelize";
import { sequelize } from "../Config/configDB.js";
import Aula from "./Aula.js";

const QRCode = sequelize.define("QRCode", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

// Relacionamento: Aula 1 -> 1 QRCode
Aula.hasOne(QRCode, {
    foreignKey: {
        name: "aulaId",
        allowNull: false
    }
});
QRCode.belongsTo(Aula, {
    foreignKey: "aulaId"
});

export default QRCode;
