import request from 'supertest';
import app from '../models/app';
import Post from '../models/post.model';
import { postData } from './helpers';



beforeEach(async () => {
    await Post.destroy(  {where: {},
        truncate: true});

    const post = new Post(postData);
    await post.save();
})




describe("Respuesta 200 de todos los posts", () => {
    test("Se recibe un codigo de respuesta 200 al solicitar los posts", done => {
      request(app)
        .get("/api/posts")
        .then(response => {
          expect(response.status).toBe(200);
          done();
        });
    });
  });

  describe("Lectura de Posts", () => {
    test("Prueba que se pueda leer las notas de la base de datos", done => {
      request(app)
        .get("/api/posts")
        .then(response => {
          expect(response.body.posts[0].titulo).toBe('Prueba');
          done();
        });
    });
  });