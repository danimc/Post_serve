"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'Token de acceso requerido'
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        req.uid = uid;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
};
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-jwt.js.map