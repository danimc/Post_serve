import express from "express";
import authRoutes from '../routes/auth.routes';
import postRoutes from '../routes/post.routes';
import reviewRoutes from '../routes/reviews.routes';
import userRoutes from '../routes/usuario.routes';
const app = express();

const apiPaths = {
    usuarios:   '/api/usuarios',
    auth:       '/api/auth',
    posts:      '/api/posts',
    reviews:     '/api/posts/review'
}

app.use(apiPaths.posts, postRoutes);
app.use( apiPaths.usuarios, userRoutes);
app.use( apiPaths.posts, postRoutes);
app.use( apiPaths.reviews, reviewRoutes);

/*

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get('/api/posts', [], getPosts);

*/

export default app;