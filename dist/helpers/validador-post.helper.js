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
exports.tagPosts = exports.esUsuarioRegistrado = exports.esCalificacionValida = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const esCalificacionValida = (calificacion) => {
    if (isNaN(calificacion)) {
        return { msg: 'La calificiacion Debe ser un valor NUMERICO entre 0 y 5' };
    }
    if (calificacion < 0 || calificacion > 5) {
        return { msg: 'La calificiacion no es valida. Debe ser un valor entre 0 y 5' };
    }
};
exports.esCalificacionValida = esCalificacionValida;
const esUsuarioRegistrado = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsrId = yield usuario_model_1.default.findByPk(usuario);
    if (!existeUsrId) {
        return {
            msg: `El Usuario ${usuario} No Existe, revise el id o elimine el campo de usuario para pasar por anonimo`
        };
    }
});
exports.esUsuarioRegistrado = esUsuarioRegistrado;
const tagPosts = (posts) => {
    const Hoy = new Date();
    posts.forEach(post => {
        const fecha = post.fecha_creado;
        const dif = +Hoy - +fecha;
        const dias = Math.floor(dif / (1000 * 60 * 60 * 24));
        if (dias > 7) {
            post.dataValues.tag = 'Post antiguio';
        }
    });
    return posts;
};
exports.tagPosts = tagPosts;
//# sourceMappingURL=validador-post.helper.js.map