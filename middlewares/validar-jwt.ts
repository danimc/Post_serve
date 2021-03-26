import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import Usuario from '../models/usuario.model';


export const validarJWT = async(req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Token de acceso requerido'
        })
    }

    try {

        const {uid} = jwt.verify(token, config.jwtSecret);

        const usuario = await Usuario.findByPk(uid);

        if(!usuario){
            return res.status(401).json({
                msg: "El usuario no Existe"
            });
        }

        if( !usuario.estado) {
            return res.status(401).json({
                msg: "Usuario no Valido"
            });

        }
        req.usuario = usuario;


        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });

    }


}