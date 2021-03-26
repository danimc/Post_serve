import Rol from "../models/rol.model";

// Verifica que el rol ingresado este dado de alta en la BD
export const esRolValido = async (rol:any) => {
    const existeRol = await Rol.findOne({ where: { 'id': rol } });
    if (!existeRol) {
        throw new Error('El Rol Seleccionado no existe');
    }

    if(+rol === 1){
        throw new Error('No se puede asignar el rol de Administrador a otro usuario');
    }
}