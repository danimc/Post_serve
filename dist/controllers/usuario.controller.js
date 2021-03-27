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
exports.deletetUsuario = exports.puttUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const validador_db_helper_1 = require("../helpers/validador-db.helper");
const validador_usuario_helper_1 = require("../helpers/validador-usuario.helper");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // obtenemos solo los usuarios activos (estado true) del sistema
    const query = { estado: true };
    const [total, usuarios] = yield Promise.all([
        usuario_model_1.default.count({ where: query }),
        usuario_model_1.default.findAll({ where: query })
    ]);
    res.json({
        total,
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_model_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No se encuentra el usuario ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, rol } = req.body;
    if (rol) {
        validador_db_helper_1.esRolValido(rol);
    }
    const usuario = new usuario_model_1.default({ nombre, email, password, rol });
    // Encriptando contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
    try {
        yield usuario.save();
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al dar de alta usuario',
            error: error.errors.message
        });
    }
});
exports.postUsuario = postUsuario;
const puttUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { password, rol } = _a, data = __rest(_a, ["password", "rol"]);
    if (password) {
        const passErr = validador_usuario_helper_1.passValido(password);
        if (passErr) {
            return res.status(400).json(passErr);
        }
        // Encriptando contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        data.password = bcryptjs_1.default.hashSync(password, salt);
    }
    if (rol) {
        const rolErr = yield validador_usuario_helper_1.rolValido(rol);
        // si el rol es Invalido
        if (rolErr) {
            return res.status(400).json(rolErr);
        }
        data.rol = rol;
    }
    try {
        const usuario = yield usuario_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'El usuario ingresado no existe'
            });
        }
        yield usuario.update(data);
        res.json({
            msg: `Usuario ${id} actualizado con exito`,
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hubo un problema al intentar actualizar el usuario'
        });
    }
});
exports.puttUsuario = puttUsuario;
const deletetUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'El usuario ingresado no existe'
            });
        }
        //Eliminando completamente al usuario
        yield usuario.destroy();
        res.json({
            msg: `Se elimino completamente el usuario ${usuario.nombre}`,
            data: usuario,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hubo un problema al intentar Eliminar el usuario'
        });
    }
});
exports.deletetUsuario = deletetUsuario;
//# sourceMappingURL=usuario.controller.js.map