import { Request, Response } from "express";
import { esCalificacionValida, esUsuarioRegistrado } from "../helpers/validador-post.helper";
import Review from '../models/review-model';



export const postReview = async (req: Request, res: Response) => {

    const { id } = req.params;
    const fecha = new Date().toLocaleString();
    const { calificacion, mensaje, usuario } = req.body;

    const data = {
        post: id,
        fecha,
        calificacion: null,
        mensaje,
        usuario: 0
    }

    if (calificacion) {
        const validaCalificacion = esCalificacionValida(calificacion);
        if (validaCalificacion) {
            return res.status(400).json(validaCalificacion);
        }
        data.calificacion = calificacion;
    }

    if (usuario) {
        const validaUsuario = await esUsuarioRegistrado(usuario);
        if (validaUsuario) {
            return res.status(400).json(validaUsuario);
        }
        data.usuario = usuario
    }

    try {
        const post = new Review(data);
        await post.save();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al intentar capturar nuevo Post en la base de datos'
        });
    }

    res.status(201).json({
        msg: 'Nuevo Review Agregado',
        data
    });
}