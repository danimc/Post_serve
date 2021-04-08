"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _a = process.env, { NODE_ENV } = _a, conf = __rest(_a, ["NODE_ENV"]);
const coneccion = NODE_ENV === 'test'
    ? {
        dabtabase: conf.MYSQL_DB_TEST,
        user: conf.MYSQL_DB_USER_TEST,
        pass: conf.MYSQL_DB_PASS_TEST,
        host: conf.MYSQL_DB_HOST_TEST
    }
    : {
        dabtabase: conf.MYSQL_DB,
        user: conf.MYSQL_DB_USER,
        pass: conf.MYSQL_DB_PASS,
        host: conf.MYSQL_DB_HOST
    };
const db = new sequelize_1.Sequelize(coneccion.dabtabase, coneccion.user, coneccion.pass, {
    host: coneccion.host,
    dialect: config_1.default.dialect,
    //logging: false,
    define: {
        freezeTableName: true
    }
});
exports.default = db;
//# sourceMappingURL=connection.js.map