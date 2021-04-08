import request from 'supertest';
import app from '../models/app';
import Historial from '../models/historial-post.model';
import Post from '../models/post.model';
import { LoginAdmin, LoginEditor, LoginModerador } from './helpers/login';
import { AllPosts, api, nuevoPost, postData } from './helpers/post';

let headerAdmin: object;
let headerModerador: object;
let headerEditor: object;

beforeEach(async () => {
  await Post.destroy({
    where: {},
    truncate: true
  });

  await Historial.destroy({
    where: {},
    truncate: true
  });

  for (const post of postData) {
    const newPost = new Post(post);
    await newPost.save();
  }

  headerAdmin = await LoginAdmin();
  headerModerador = await LoginModerador();
  headerEditor = await LoginEditor();
})

describe("Obtener Posts", () => {
  test("Se recibe un codigo de respuesta 200 al solicitar los posts", done => {
    request(app)
      .get("/api/posts")
      .then(response => {
        expect(response.status).toBe(200);
        done();
      });
  });

  test("Prueba que se pueda leer las notas de la base de datos", done => {
    request(app)
      .get("/api/posts")
      .then(response => {
        expect(response.body.Posts).toHaveLength(postData.length);
        done();
      });
  });

  test("Manda un codigo 404 al no encontrar el id del post", done => {
    request(app)
      .get("/api/posts/101dasa")
      .then(response => {
        expect(response.status).toBe(404);
        done();
      });
  });

  test("Obtener un post en especifico ", async done => {
    request(app)
      .get("/api/posts/1")
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.titulo).toContain('Primer Post')
        done();
      });
  });
});


describe("Nuevo Post", () => {

  test("Solicita Token de acceso para agregar un nuevo Post", done => {

    request(app)
      .post("/api/posts")
      .send(nuevoPost)
      .then(response => {
        expect(response.status).toBe(401);
        expect(response.body.msg).toEqual('Token de acceso requerido');
        done();
      });
  });

  test("No se agrega si no lleva datos en el body", done => {
    request(app)
      .post("/api/posts")
      .then(response => {
        expect(response.status).toBe(401);
        done();
      });
  });

  test("No se añade un post que no tenga titulo", async done => {
    const fakeNote = {
      mensaje: 'hola a todos este es un nuevo post de prueba'
    };
    request(app)
      .post("/api/posts")
      .set(headerAdmin)
      .send(fakeNote)
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body.errors).toHaveLength(1);
        done();
      });
  });

  test("No se añade una post que no tenga mensaje", async done => {
    const fakeNote = {
      titulo: 'Titulo numero 4'
    };
    request(app)
      .post("/api/posts")
      .set(headerAdmin)
      .send(fakeNote)
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body.errors).toHaveLength(1);
        done();
      });
  });

  test("Añadiendo nuevo Post a la Base de Datos con valores correctos", async () => {

    await api.post('/api/posts')
    .set(headerAdmin)
    .send(nuevoPost);
    expect(201);

    const data = await AllPosts();
    expect(data.response.body.Posts).toHaveLength(postData.length + 1);
  });

  test("Valida que editor no pueda crear un nuevo Post", async () => {

    await api.post('/api/posts')
    .set(headerEditor)
    .send(nuevoPost);
    expect(401);

    const data = await AllPosts();
    expect(data.response.body.Posts).toHaveLength(postData.length);
  });

});




