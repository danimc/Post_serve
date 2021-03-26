import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';


export const validarJWT = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Token de acceso requerido'
        })
    }

    try {

        const {uid} = jwt.verify(token, config.jwtSecret);

        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });

    }


}