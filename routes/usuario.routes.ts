import { Router} from 'express';
import { check, body } from 'express-validator';
import { getUsuario, getUsuarios, postUsuario, puttUsuario, deletetUsuario } from '../controllers/usuario.controller';
import { esRolValido } from '../helpers/validador-db.helper';
import { emailExiste, esAdminRol, existeUsuarioId, validarCampos, validarJWT } from '../middlewares';


const router = Router();

router.get('/',[
    validarJWT,
    esAdminRol,
    validarCampos
],getUsuarios);

router.get('/:id',[
    validarJWT,
    esAdminRol,
    validarCampos
],getUsuario);

router.post('/', [
    validarJWT,
    esAdminRol,
    check('email', 'No es un correo Valido').isEmail(),
    check('email').custom(emailExiste),
    check('nombre', "El Nombre de usuario es obligatorio").not().isEmpty(),
    check('password', 'El password debe de tener mas de 6 caracteres').isLength({min: 6}),
    check('rol').custom(esRolValido),
    validarCampos
] , postUsuario);

router.put('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un formato Valido de Id de usuario').isNumeric(),
    check('id').custom(existeUsuarioId),
    check('email', 'no es un correo valido').if(body('email').exists()).isEmail(),
    check('email').custom(emailExiste),
    validarCampos
],puttUsuario);

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un formato Valido de Id de usuario').isNumeric(),
    check('id').custom(existeUsuarioId),
    validarCampos
],   deletetUsuario);


export default router;