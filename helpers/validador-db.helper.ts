import Rol from "../models/rol.model";


export const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ where: { 'id': rol } });
    if (!existeRol) {
        throw new Error('El Rol Seleccionado no es valido');
    }
}