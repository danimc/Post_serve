"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'Token de acceso requerido'
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        const usuario = yield usuario_model_1.default.findByPk(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: "El usuario no Existe"
            });
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Usuario no Valido"
            });
        }
        req.usuario = usuario;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-jwt.js.map