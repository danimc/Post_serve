import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.controller';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

router.post('/login',[
    check('email', 'Debe ingresar un correo valido').isEmail(),
    check('password', 'Por favor, ingrese su contraseña').notEmpty(),
    validarCampos
], login);

export default router;