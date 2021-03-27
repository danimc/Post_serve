"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const db = new sequelize_1.Sequelize(config_1.default.database, config_1.default.userDb, config_1.default.passwordDb, {
    host: config_1.default.hostDb,
    dialect: config_1.default.dialect,
    //logging: false,
    define: {
        freezeTableName: true
    }
});
exports.default = db;
//# sourceMappingURL=connection.js.map