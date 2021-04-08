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
exports.getHistorialPost = exports.deletePost = exports.putPost = exports.postNuevoPost = exports.getPost = exports.getPostsDate = exports.getPosts = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const historial_post_model_1 = __importDefault(require("../models/historial-post.model"));
const sequelize_1 = require("sequelize");
const validador_post_helper_1 = require("../helpers/validador-post.helper");
// Lista de todos los Post
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [total, posts] = yield Promise.all([
        post_model_1.default.count(),
        post_model_1.default.findAll()
    ]);
    const tagPost = validador_post_helper_1.tagPosts(posts);
    res.json({
        total,
        Posts: tagPost
    });
});
exports.getPosts = getPosts;
// Lista filtrada por fecha
const getPostsDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fechaInicio, fechaFin } = req.params;
    const fechaFinal = fechaFin + ' 23:59:59:999';
    const params = {
        fechaInicio: new Date(fechaInicio),
        FechaFin: new Date(fechaFinal)
    };
    const qry = {
        where: {
            fecha_creado: {
                [sequelize_1.Op.between]: [params.fechaInicio, params.FechaFin]
            }
        }
    };
    const [total, posts] = yield Promise.all([
        post_model_1.default.count(qry),
        post_model_1.default.findAll(qry)
    ]);
    const tagPost = validador_post_helper_1.tagPosts(posts);
    res.json({
        total,
        tagPost
    });
});
exports.getPostsDate = getPostsDate;
// Consultar un unico Post
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield post_model_1.default.findByPk(id);
    if (post) {
        res.json(post);
    }
    else {
        res.status(404).json({
            msg: `No se encuentra el post ${id}`
        });
    }
});
exports.getPost = getPost;
const postNuevoPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.usuario.id;
    const fechaCreado = new Date().toLocaleString();
    const { titulo, mensaje } = req.body;
    const data = {
        titulo,
        mensaje,
        creador: usuario,
        fecha_creado: fechaCreado
    };
    try {
        const post = new post_model_1.default(data);
        const save = yield post.save();
        const id = save.dataValues.id;
        if (save) {
            const historialData = {
                post: id,
                usuario,
                fecha: fechaCreado
            };
            const historial = new historial_post_model_1.default(historialData);
            yield historial.save();
            //console.log(historial);
        }
        res.status(201).json({
            msg: 'Nuevo post generado',
            data
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al intentar capturar nuevo Post en la base de datos'
        });
    }
});
exports.postNuevoPost = postNuevoPost;
// Actualizar Posts
const putPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { titulo, mensaje } = req.body;
    try {
        const post = yield post_model_1.default.findByPk(id);
        if (!post) {
            return res.status(404).json({
                msg: 'El Post No Existe'
            });
        }
        const data = {
            titulo,
            mensaje
        };
        const update = yield post.update(data);
        if (update) {
            const usuario = req.usuario.id;
            const fecha = new Date().toLocaleString();
            const historialData = {
                post: id,
                usuario,
                movimiento: `Actualizó`,
                fecha,
            };
            const historial = new historial_post_model_1.default(historialData);
            yield historial.save();
        }
        res.json({
            msg: `Post ${id} actualizado con exito`,
            post
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hubo un problema al intentar actualizar el usuario'
        });
    }
});
exports.putPost = putPost;
// Elimina un Post por Id
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield post_model_1.default.findByPk(id);
        if (!post) {
            return res.status(404).json({
                msg: 'El Post ingresado no existe'
            });
        }
        //Eliminando completamente al usuario
        yield post.destroy();
        const usuario = req.usuario.id;
        const fecha = new Date().toLocaleString();
        const historialData = {
            post: id,
            usuario,
            movimiento: `Eliminó`,
            fecha,
        };
        const historial = new historial_post_model_1.default(historialData);
        yield historial.save();
        res.status(204).json({
            msg: `Se elimino el Post ${post.titulo}`,
            data: post,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hubo un problema al intentar Eliminar el usuario'
        });
    }
});
exports.deletePost = deletePost;
// Muestra todo el Historial de cambios del Post
const getHistorialPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const post = yield post_model_1.default.findByPk(id);
    if (!post) {
        res.status(404).json({
            msg: `No existe el post ${id}`
        });
    }
    const historial = yield ((_a = post_model_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.query('call `sp-historial` (:param1)', { replacements: { param1: id }, type: sequelize_1.QueryTypes.SELECT }));
    if (historial) {
        const _b = historial[0], { meta } = _b, rest = __rest(_b, ["meta"]);
        res.json(rest);
    }
});
exports.getHistorialPost = getHistorialPost;
//# sourceMappingURL=post.controller.js.map