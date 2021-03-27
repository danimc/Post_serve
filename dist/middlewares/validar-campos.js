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
exports.existePostId = exports.existeUsuarioId = exports.emailExiste = exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const post_model_1 = __importDefault(require("../models/post.model"));
const validarCampos = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validarCampos = validarCampos;
const emailExiste = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield usuario_model_1.default.findOne({ where: { email } });
    if (existeEmail) {
        throw new Error(`El Correo ${email} ya esta registrado`);
    }
});
exports.emailExiste = emailExiste;
const existeUsuarioId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsrId = yield usuario_model_1.default.findByPk(id);
    if (!existeUsrId) {
        throw new Error(`El Usuario ${id} No Existe`);
    }
});
exports.existeUsuarioId = existeUsuarioId;
const existePostId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existePost = yield post_model_1.default.findByPk(id);
    if (!existePost) {
        throw new Error(`El Post con id: ${id} No Existe`);
    }
});
exports.existePostId = existePostId;
//# sourceMappingURL=validar-campos.js.map