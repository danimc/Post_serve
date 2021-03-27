import { DataTypes } from "sequelize";
import db from "../database/connection";


const Post = db.define('tb-posts', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creador: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    fecha_creado: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estatus:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    }
});

Post.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.createdAt;
    delete values.updatedAt;
    return values;
}

export default Post;
