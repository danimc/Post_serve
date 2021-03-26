import { Request, Response, NextFunction } from 'express';


export const esAdminRol = (req: Request, res: Response, next: NextFunction) => {

    // Verificar que el token se valide primero
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'No se puede verificar el rol sin validar el token access primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 1) {
        return res.status(401).json({
            msg: `El usuario ${nombre} no tiene privilegios de administrador`
        });
    }

    next();
}

export const esModerador = (req: Request, res: Response, next: NextFunction) => {

    // Verificar que el token se valide primero
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'No se puede verificar el rol sin validar el token access primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 1) {
        return res.status(401).json({
            msg: `El usuario ${nombre} no tiene privilegios de administrador`
        });
    }

    next();
}

export const esRolPermitido = (...roles: number[]) => {

    return (req: Request, res: Response, next: NextFunction) => {
        // Verificar que el token se valide primero
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'No se puede verificar el rol sin validar el token access primero'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            res.status(401).json({
                msg: ' Para hacer esta funcion, necesitas tener los permisos correspondientes'
            });
        }

        next();
    }
}