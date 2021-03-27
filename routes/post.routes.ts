import { Router } from 'express';
import { check } from 'express-validator';
import { postNuevoPost, getPosts, getPost, putPost, deletePost, getHistorialPost } from '../controllers/post.controller';
import { validarJWT, validarCampos } from '../middlewares/';
import { esRolPermitido } from '../middlewares/validar-roles';
import { existePostId } from '../middlewares/validar-campos';

const router = Router();

// Todos los posts
router.get('/', [], getPosts);
// Solo un Post
router.get('/:id', [
    validarCampos
], getPost);

// Nuevo Post
router.post('/nuevo', [
    validarJWT,
    esRolPermitido(1, 2),
    check('titulo', 'Campo Titulo obligatorio').notEmpty(),
    check('mensaje', 'Debe enviar un mensaje').notEmpty(),
    validarCampos
], postNuevoPost);

// Actualizar Post
router.put('/actualizar/:id', [
    validarJWT,
    esRolPermitido(1, 3),
    check('id', 'No es un formato Valido de Id para un Post').isNumeric(),
    check('id').custom(existePostId),
    validarCampos
], putPost);
// Eliminar Post
router.delete('/:id', [
    validarJWT,
    esRolPermitido(1, 2),
    check('id', 'No es un formato Valido de Id de usuario').isNumeric(),
    check('id').custom(existePostId),
    validarCampos
], deletePost);

/*
se terminan los endpoints de post y comienzan los generales
*/

// Mostrar el historial de movimientos del Post
router.get('/seguimiento/:id', [
    validarJWT,
    esRolPermitido(1,2),
    validarCampos
], getHistorialPost);




export default router;

