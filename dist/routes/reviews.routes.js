"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const review_controller_1 = require("../controllers/review.controller");
const middlewares_1 = require("../middlewares");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_roles_1 = require("../middlewares/validar-roles");
const router = express_1.Router();
// subir un nuevo Review
router.post('/:id', [
    express_validator_1.check('id', 'Debe ingresar el Id del Post').isNumeric(),
    express_validator_1.check('id').custom(middlewares_1.existePostId),
    middlewares_1.validarCampos
], review_controller_1.postReview);
router.get('/:id', [
    validar_jwt_1.validarJWT,
    validar_roles_1.esRolPermitido(1, 2),
    express_validator_1.check('id', 'Debe ingresar el Id del Post').isNumeric(),
    express_validator_1.check('id').custom(middlewares_1.existePostId),
    middlewares_1.validarCampos
], review_controller_1.getReviews);
exports.default = router;
//# sourceMappingURL=reviews.routes.js.map