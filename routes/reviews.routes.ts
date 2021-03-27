import { Router } from "express";
import { check, body } from 'express-validator';
import { getReviews, postReview } from "../controllers/review.controller";
import { existePostId, validarCampos } from "../middlewares";
import { validarJWT } from '../middlewares/validar-jwt';
import { esRolPermitido } from '../middlewares/validar-roles';

const router = Router();

// subir un nuevo Review
router.post('/:id',[
    check('id', 'Debe ingresar el Id del Post').isNumeric(),
    check('id').custom(existePostId),
    check('calificacion', "la calificacion debe ser un valor entre 0 y 5").if(body('calificacion').exists()).isFloat(),
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
