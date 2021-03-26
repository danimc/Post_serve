"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Rol = connection_1.default.define('tb-roles', {
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
});
exports.default = Rol;
//# sourceMappingURL=rol.model.js.map