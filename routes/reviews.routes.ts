import { Router } from "express";
import { check } from "express-validator";
import { getReviews, postReview } from "../controllers/review.controller";
import { existePostId, validarCampos } from "../middlewares";
import { validarJWT } from '../middlewares/validar-jwt';
import { esRolPermitido } from '../middlewares/validar-roles';

const router = Router();

// subir un nuevo Review
router.post('/:id',[
    check('id', 'Debe ingresar el Id del Post').isNumeric(),
    check('id').custom(existePostId),
    validarCampos
],postReview);

router.get('/:id',[
    validarJWT,
    esRolPermitido(1,2),
    check('id', 'Debe ingresar el Id del Post').isNumeric(),
    check('id').custom(existePostId),
    validarCampos
],getReviews);

export default router;
