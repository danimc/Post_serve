import Rol from "../models/rol.model";

// Verifica que el rol ingresado este dado de alta en la BD
export const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ where: { 'id': rol } });
    if (!existeRol) {
        throw new Error('El Rol Seleccionado no es valido');
    }
}