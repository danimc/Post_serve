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
exports.login = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_jwt_helper_1 = __importDefault(require("../helpers/token-jwt.helper"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield usuario_model_1.default.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseñas incorrectas -'
            });
        }
        // se valida que el usuario este activo en la app
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario o contraseñas incorrectas'
            });
        }
        // validamos Pass
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseñas incorrectas p'
            });
        }
        const token = yield token_jwt_helper_1.default(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hubo un error al intentar iniciar sesion'
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map