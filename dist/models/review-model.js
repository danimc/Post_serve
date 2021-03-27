"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Review = connection_1.default.define('tb-reviews', {
    post: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true
    },
    calificacion: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    },
    usuario: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    mensaje: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
});
exports.default = Review;
//# sourceMappingURL=review-model.js.map