import { Request, Response } from "express";
import Post from '../models/post.model';
import Historial from '../models/historial-post.model';
import { QueryTypes } from "sequelize";


// Lista de todos los Post
export const getPosts = async (req: Request, res: Response) => {

    const Hoy: Date = new Date();

    const [total, posts] = await Promise.all([
        Post.count(),
        Post.findAll()
    ]);

    posts.forEach(post => {
        const fecha: Date = post.fecha_creado;
        const dif = +Hoy - +fecha;
        const dias = Math.floor(dif / (1000 * 60 * 60 * 24));

        if (dias > 7) {
            post.dataValues.tag = 'Post antiguio';
        }
    });

    res.json({
        total,
        posts
    });
}

// Consultar un unico Post
export const getPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({
            msg: `No se encuentra el post ${id}`
        });
    }
}

export const postNuevoPost = async (req: Request, res: Response) => {

    const usuario = req.usuario.id;
    const fechaCreado = new Date().toLocaleString();

    const { titulo, mensaje } = req.body;

    const data = {
        titulo,
        mensaje,
        creador: usuario,
        fecha_creado: fechaCreado
    };


    try {

        const post = new Post(data);
        const save = await post.save();
        const id = save.dataValues.id;

        if (save) {
            const historialData = {
                post: id,
                usuario,
                fecha: fechaCreado
            }

            const historial = new Historial(historialData);
            await historial.save();

            //console.log(historial);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al intentar capturar nuevo Post en la base de datos'
        });
    }

    res.status(201).json({
        msg: 'Nuevo post generado',
        data
    });
}

// Actualizar Posts
export const putPost = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { titulo, mensaje } = req.body;
    try {

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({
                msg: 'El Post No Existe'
            });
        }

        const data = {
            titulo,
            mensaje
        };

        const update = await post.update(data);

        if (update) {
            const usuario = req.usuario.id;
            const fecha = new Date().toLocaleString();
            const historialData = {
                post: id,
                usuario,
                movimiento: `Actualizó`,
                fecha,
            }

            const historial = new Historial(historialData);
            await historial.save();
        }


        res.json({
            msg: `Post ${id} actualizado con exito`,
            post
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'hubo un problema al intentar actualizar el usuario'
        });
    }
}

export const deletePost = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({
                msg: 'El Post ingresado no existe'
            });
        }

        //Eliminando completamente al usuario
        await post.destroy();

        const usuario = req.usuario.id;
        const fecha = new Date().toLocaleString();
        const historialData = {
            post: id,
            usuario,
            movimiento: `Eliminó`,
            fecha,
        }

        const historial = new Historial(historialData);
        await historial.save();


        res.status(204).json({
            msg: `Se elimino el Post ${post.titulo}`,
            data: post,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hubo un problema al intentar Eliminar el usuario'
        });
    }
}

export const getHistorialPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = await Post.findByPk(id);

    if (!post) {
        res.status(404).json({
            msg: `No existe el post ${id}`
        });
    }

    const historial = await Post.sequelize?.query('call `sp-historial` (:param1)',
        { replacements: { param1: id }, type: QueryTypes.SELECT });

    if (historial) {
        const { meta, ...rest } = historial[0];
        res.json(rest);
    }
}



