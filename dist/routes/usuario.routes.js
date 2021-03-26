"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_controller_1 = require("../controllers/usuario.controller");
const validador_db_helper_1 = require("../helpers/validador-db.helper");
const middlewares_1 = require("../middlewares");
const router = express_1.Router();
router.get('/', [
    middlewares_1.validarJWT,
    middlewares_1.esAdminRol,
    middlewares_1.validarCampos
], usuario_controller_1.getUsuarios);
router.get('/:id', [
    middlewares_1.validarJWT,
    middlewares_1.esAdminRol,
    middlewares_1.validarCampos
], usuario_controller_1.getUsuario);
router.post('/', [
    middlewares_1.validarJWT,
    middlewares_1.esAdminRol,
    express_validator_1.check('email', 'No es un correo Valido').isEmail(),
    express_validator_1.check('email').custom(middlewares_1.emailExiste),
    express_validator_1.check('nombre', "El Nombre de usuario es obligatorio").not().isEmpty(),
    express_validator_1.check('password', 'El password debe de tener mas de 6 caracteres').isLength({ min: 6 }),
    express_validator_1.check('rol').custom(validador_db_helper_1.esRolValido),
    middlewares_1.validarCampos
], usuario_controller_1.postUsuario);
router.put('/:id', [
    middlewares_1.validarJWT,
    middlewares_1.esAdminRol,
    express_validator_1.check('id', 'No es un formato Valido de Id de usuario').isNumeric(),
    express_validator_1.check('id').custom(middlewares_1.existeUsuarioId),
    middlewares_1.validarCampos
], usuario_controller_1.puttUsuario);
router.delete('/:id', [
    middlewares_1.validarJWT,
    middlewares_1.esAdminRol,
    express_validator_1.check('id', 'No es un formato Valido de Id de usuario').isNumeric(),
    express_validator_1.check('id').custom(middlewares_1.existeUsuarioId),
    middlewares_1.validarCampos
], usuario_controller_1.deletetUsuario);
exports.default = router;
//# sourceMappingURL=usuario.routes.js.map