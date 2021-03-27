import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator"
import Usuario from "../models/usuario.model";
import Post from '../models/post.model';

export const validarCampos = (req:Request, res:Response, next:NextFunction) => {

    const errors = validationResult(req);
    if(!errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}

export const emailExiste = async(email = '') =>{

    const existeEmail = await Usuario.findOne({ where: { email } });
    if (existeEmail) {
       throw new Error(`El Correo ${email} ya esta registrado`);
    }
}

export const existeUsuarioId = async(id:number) =>{

    const existeUsrId = await Usuario.findByPk( id );
    if (!existeUsrId) {
       throw new Error(`El Usuario ${id} No Existe`);
    }
}

export const existePostId = async(id:number) =>{

    const existePost = await Post.findByPk( id );
    if (!existePost) {
       throw new Error(`El Post con id: ${id} No Existe`);
    }
}


