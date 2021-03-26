"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.post('/login', [
    express_validator_1.check('email', 'Debe ingresar un correo valido').isEmail(),
    express_validator_1.check('password', 'Por favor, ingrese su contraseña').notEmpty(),
    validar_campos_1.validarCampos
], auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map