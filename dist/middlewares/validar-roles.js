"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esRolPermitido = exports.esModerador = exports.esAdminRol = void 0;
const esAdminRol = (req, res, next) => {
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
};
exports.esAdminRol = esAdminRol;
const esModerador = (req, res, next) => {
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
};
exports.esModerador = esModerador;
const esRolPermitido = (...roles) => {
    return (req, res, next) => {
        // Verificar que el token se valide primero
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'No se puede verificar el rol sin validar el token access primero'
            });
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: ' Para hacer esta funcion, necesitas tener los permisos correspondientes'
            });
        }
        next();
    };
};
exports.esRolPermitido = esRolPermitido;
//# sourceMappingURL=validar-roles.js.map