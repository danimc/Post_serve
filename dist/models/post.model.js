"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Post = connection_1.default.define('tb-posts', {
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    mensaje: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    creador: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    fecha_creado: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    estatus: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    }
});
Post.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.createdAt;
    delete values.updatedAt;
    return values;
};
exports.default = Post;
//# sourceMappingURL=post.model.js.map