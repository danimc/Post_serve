import app from "../../models/app";
import supertest from 'supertest';

export const api = supertest(app)


export const postData = [
  {
    titulo: 'Primer Post',
    mensaje: 'Este es el primer Post de pruebas cargado',
    creador: 1,
    fecha_creado: new Date()
  },
  {
    titulo: 'Segundo Post',
    mensaje: 'Este es el Segundo Post de pruebas cargado',
    creador: 1,
    fecha_creado: new Date()
  }];

export const nuevoPost =
{
  titulo: 'Nuevo Post de Pruebas Post',
  mensaje: 'Hola! este es un nuevo Post de Pruebas'
};


export const AllPosts = async () => {
  const response = await api.get('/api/posts')
  return {
    contents: response.body.Posts.map((post: { content: any; }) => post.content),
    response
  }
}