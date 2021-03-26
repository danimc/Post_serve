import { Request, Response } from "express";
import crypt from "bcryptjs";
import Usuario from '../models/usuario.model';


export const getUsuarios = async (req: Request, res: Response) => {

    // obtenemos solo los usuarios activos (estado true) del sistema
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.count({ where: query }),
        Usuario.findAll({ where: query })
    ]);

    res.json({
        total,
        usuarios
     });
}

export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No se encuentra el usuario ${id}`
        })
    }
}

export const postUsuario = async (req: Request, res: Response) => {

    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });

    // Encriptando contraseña
    const salt = crypt.genSaltSync();
    usuario.password = crypt.hashSync(password, salt);

    try {

        await usuario.save();
        res.json(usuario);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Error al dar de alta usuario',
            error: error.errors.message
        });

    }
}

export const puttUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password, ...data } = req.body;

    if (password) {
        // Encriptando contraseña
        const salt = crypt.genSaltSync();
        data.password = crypt.hashSync(password, salt);
    }

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'El usuario ingresado no existe'
            });
        }

        await usuario.update(data);

        res.json({
            msg: `Usuario ${id} actualizado con exito`,
            usuario
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'hubo un problema al intentar actualizar el usuario'
        });
    }
}

export const deletetUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    const uid = req.uid;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'El usuario ingresado no existe'
            });
        }

        //dando de baja a un usuario sin eliminarlo de la BD
        await usuario.update({estado: false});
        //Eliminando completamente al usuario
        //await usuario.destroy();

        res.json({
            msg: `Se elimino completamente el usuario ${usuario.nombre}`,
            data: usuario,
            uid
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hubo un problema al intentar Eliminar el usuario'
        });
    }


 
}