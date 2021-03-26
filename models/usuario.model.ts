import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Usuario = db.define('tb-usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    },
    rol: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 2
    },

});

Usuario.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

export default Usuario;