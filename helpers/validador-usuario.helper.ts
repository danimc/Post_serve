import Rol from "../models/rol.model";

// Verifica que el rol ingresado este dado de alta en la BD
export const rolValido = async (rol: any) => {
    const existeRol = await Rol.findOne({ where: { 'id': rol } });
    if (!existeRol) {
        return { msg: "El Rol seleccionado no existe en la BD" };
    }

    if (+rol === 1) {
        return { msg: "No se puede asignar el rol de Administrador a otro usuario" };
    }
}

export const passValido = (password:string) => {

    if (+password.length <= 6) {
        return { msg: 'La contraseña debe tener una longitud minima de 6 caracteres' };
    }
}

