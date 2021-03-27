import express, {Application} from 'express';
import cors from 'cors';
import authRoutes from '../routes/auth.routes';
import postRoutes from '../routes/post.routes';
import reviewRoutes from '../routes/reviews.routes';
import userRoutes from '../routes/usuario.routes';
import db from '../database/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios:   '/api/usuarios',
        auth:       '/api/auth',
        posts:      '/api/posts',
        reviews:     '/api/posts/review'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {

        try {
            await db.authenticate();
            console.log("Coneccion a la base de datos correcta");
        } catch (error) {
            throw new Error( error);
        }
    }

    middlewares() {

        this.app.use( cors());

        this.app.use( express.json());

        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use( this.apiPaths.auth, authRoutes);
        this.app.use( this.apiPaths.usuarios, userRoutes);
        this.app.use( this.apiPaths.posts, postRoutes);
        this.app.use( this.apiPaths.reviews, reviewRoutes);
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log( 'servidor corriendo en el puerto '+ this.port);
        })
    }
}

export default Server;