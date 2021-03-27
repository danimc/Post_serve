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
exports.postReview = void 0;
const validador_post_helper_1 = require("../helpers/validador-post.helper");
const review_model_1 = __importDefault(require("../models/review-model"));
const postReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fecha = new Date().toLocaleString();
    const { calificacion, mensaje, usuario } = req.body;
    const data = {
        post: id,
        fecha,
        calificacion: null,
        mensaje,
        usuario: 0
    };
    if (calificacion) {
        const validaCalificacion = validador_post_helper_1.esCalificacionValida(calificacion);
        if (validaCalificacion) {
            return res.status(400).json(validaCalificacion);
        }
        data.calificacion = calificacion;
    }
    if (usuario) {
        const validaUsuario = yield validador_post_helper_1.esUsuarioRegistrado(usuario);
        if (validaUsuario) {
            return res.status(400).json(validaUsuario);
        }
        data.usuario = usuario;
    }
    try {
        const post = new review_model_1.default(data);
        yield post.save();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al intentar capturar nuevo Post en la base de datos'
        });
    }
    res.status(201).json({
        msg: 'Nuevo Review Agregado',
        data
    });
});
exports.postReview = postReview;
//# sourceMappingURL=review.controller.js.map