import { DataTypes } from "sequelize";
import db from "../database/connection";


const Review = db.define('tb-reviews', {
    post: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    calificacion: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    usuario: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export default Review;
