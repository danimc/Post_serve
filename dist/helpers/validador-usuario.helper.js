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
exports.passValido = exports.rolValido = void 0;
const rol_model_1 = __importDefault(require("../models/rol.model"));
// Verifica que el rol ingresado este dado de alta en la BD
const rolValido = (rol) => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield rol_model_1.default.findOne({ where: { 'id': rol } });
    if (!existeRol) {
        return { msg: "El Rol seleccionado no existe en la BD" };
    }
    if (+rol === 1) {
        return { msg: "No se puede asignar el rol de Administrador a otro usuario" };
    }
});
exports.rolValido = rolValido;
const passValido = (password) => {
    if (+password.length <= 6) {
        return { msg: 'La contraseña debe tener una longitud minima de 6 caracteres' };
    }
};
exports.passValido = passValido;
//# sourceMappingURL=validador-usuario.helper.js.map