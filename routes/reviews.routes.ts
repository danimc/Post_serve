import { check } from "express-validator";
import { postReview } from "../controllers/post.controller";
import { existePostId, validarCampos } from "../middlewares";
import router from "./usuario.routes";



// subir un nuevo Review
router.post('/:id',[
    check('id', 'Debe ingresar el Id del Post').isNumeric(),
    check('id').custom(existePostId),
    validarCampos
],postReview);


export default router;
