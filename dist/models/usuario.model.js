"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Usuario = connection_1.default.define('tb-usuarios', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    },
    rol: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 2
    },
});
Usuario.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    delete values.password;
    return values;
};
exports.default = Usuario;
//# sourceMappingURL=usuario.model.js.map