import request from 'supertest';
import app from '../models/app';
import Post from '../models/post.model';
import { postData } from './helpers';



beforeEach(async () => {
    await Post.destroy({
      where: {},
      truncate: true
    });

    const post = new Post(postData);
    await post.save();
})




describe("Pruebas para el endpoint de GET /API/POSTS", () => {
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
            expect(response.body.posts[0].titulo).toBe('Primer Post');
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

      test("Obtener un post en especifico ", done => {
        const estr = Post;
        request(app)
          .get("/api/posts/1")
          .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.titulo).toEqual(postData.titulo);
            done();
          });
      });
  });

  

