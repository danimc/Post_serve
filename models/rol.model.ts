import { DataTypes } from "sequelize";
import db from "../database/connection";


const Rol = db.define('tb-roles', {
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

export default Rol;
