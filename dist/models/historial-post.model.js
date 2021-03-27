"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Historial = connection_1.default.define('tb-historial-posts', {
    post: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    usuario: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    movimiento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Escribio'
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
});
Historial.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.createdAt;
    delete values.updatedAt;
    return values;
};
exports.default = Historial;
//# sourceMappingURL=historial-post.model.js.map