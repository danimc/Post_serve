import { Request, Response } from "express";
import Usuario from '../models/usuario.model';
import crypt from 'bcryptjs';
import generarJWT from "../helpers/token-jwt.helper";



export const login = async(req: Request, res: Response) => {

    const { email, password } = req.body;
    try {

        const usuario = await Usuario.findOne({ where: {email} });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o contraseñas incorrectas -'
            });
        }
        // se valida que el usuario este activo en la app
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario o contraseñas incorrectas'
            });
        }

        // validamos Pass
        const validPassword = crypt.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                msg: 'Usuario o contraseñas incorrectas p'
            });
        }


        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hubo un error al intentar iniciar sesion'
        });
    }

}

