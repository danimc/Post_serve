import { Router} from 'express';
import { check } from 'express-validator';
import { getUsuario, getUsuarios, postUsuario, puttUsuario, deletetUsuario } from '../controllers/usuario.controller';
import { esRolValido } from '../helpers/validador-db.helper';
import { emailExiste, esAdminRol, esRolPermitido, existeUsuarioId, validarCampos, validarJWT } from '../middlewares';


const router = Router();

router.get('/',getUsuarios);
router.get('/:id',getUsuario);

router.post('/', [
    check('email', 'No es un correo Valido').isEmail(),
    check('email').custom(emailExiste),
    check('nombre', "El Nombre de usuario es obligatorio").not().isEmpty(),
    check('password', 'El password debe de tener mas de 6 caracteres').isLength({min: 6}),
    check('rol').custom(esRolValido),
    validarCampos
] , postUsuario);

router.put('/:id',[
    check('id', 'No es un formato Valido de Id de usuario').isNumeric(),
    check('id').custom(existeUsuarioId),
    validarCampos
],puttUsuario);

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    esRolPermitido(1),
    check('id', 'No es un formato Valido de Id de usuario').isNumeric(),
    check('id').custom(existeUsuarioId),
    validarCampos
],   deletetUsuario);


export default router;