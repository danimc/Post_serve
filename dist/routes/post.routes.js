"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const post_controller_1 = require("../controllers/post.controller");
const middlewares_1 = require("../middlewares/");
const validar_roles_1 = require("../middlewares/validar-roles");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
// Todos los posts
router.get('/', [], post_controller_1.getPosts);
// Solo un Post
router.get('/:id', [
    middlewares_1.validarCampos
], post_controller_1.getPost);
// Nuevo Post
router.post('/', [
    middlewares_1.validarJWT,
    validar_roles_1.esRolPermitido(1, 2),
    express_validator_1.check('titulo', 'Campo Titulo obligatorio').notEmpty(),
    express_validator_1.check('mensaje', 'Debe enviar un mensaje').notEmpty(),
    middlewares_1.validarCampos
], post_controller_1.postNuevoPost);
// Actualizar Post
router.put('/:id', [
    middlewares_1.validarJWT,
    validar_roles_1.esRolPermitido(1, 3),
    express_validator_1.check('id', 'No es un formato Valido de Id para un Post').isNumeric(),
    express_validator_1.check('id').custom(validar_campos_1.existePostId),
    middlewares_1.validarCampos
], post_controller_1.putPost);
// Eliminar Post
router.delete('/:id', [
    middlewares_1.validarJWT,
    validar_roles_1.esRolPermitido(1, 2),
    express_validator_1.check('id', 'No es un formato Valido de Id de usuario').isNumeric(),
    express_validator_1.check('id').custom(validar_campos_1.existePostId),
    middlewares_1.validarCampos
], post_controller_1.deletePost);
/*
se terminan los endpoints de post y comienzan los generales
*/
// Mostrar el historial de movimientos del Post
router.get('/seguimiento/:id', [
    middlewares_1.validarJWT,
    validar_roles_1.esRolPermitido(1, 2),
    middlewares_1.validarCampos
], post_controller_1.getHistorialPost);
exports.default = router;
//# sourceMappingURL=post.routes.js.map