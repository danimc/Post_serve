import Usuario from '../models/usuario.model';



export const esCalificacionValida = (calificacion: number) => {
    if (isNaN(calificacion)) {
        return { msg: 'La calificiacion Debe ser un valor NUMERICO entre 0 y 5' };
    }
    if (calificacion < 0 || calificacion > 5) {
        return { msg: 'La calificiacion no es valida. Debe ser un valor entre 0 y 5' };
    }
}

export const esUsuarioRegistrado = async (usuario: number) => {
    const existeUsrId = await Usuario.findByPk(usuario);
    if (!existeUsrId) {
        return {
            msg: `El Usuario ${usuario} No Existe, revise el id o elimine el campo de usuario para pasar por anonimo`
        }
    }
}

export const tagPosts = (posts: any[]) => {
    const Hoy: Date = new Date();

    posts.forEach(post => {
        const fecha: Date = post.fecha_creado;
        const dif = +Hoy - +fecha;
        const dias = Math.floor(dif / (1000 * 60 * 60 * 24));

        if (dias > 7) {
            post.dataValues.tag = 'Post antiguio';
        }
    });

    return posts;

}