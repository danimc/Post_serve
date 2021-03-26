import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator"
import Usuario from "../models/usuario.model";

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


