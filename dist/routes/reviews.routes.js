"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const post_controller_1 = require("../controllers/post.controller");
const middlewares_1 = require("../middlewares");
const usuario_routes_1 = __importDefault(require("./usuario.routes"));
// subir un nuevo Review
usuario_routes_1.default.post('/:id', [
    express_validator_1.check('id', 'Debe ingresar el Id del Post').isNumeric(),
    express_validator_1.check('id').custom(middlewares_1.existePostId),
    middlewares_1.validarCampos
], post_controller_1.postReview);
exports.default = usuario_routes_1.default;
//# sourceMappingURL=reviews.routes.js.map