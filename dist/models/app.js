"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_routes_1 = __importDefault(require("../routes/post.routes"));
const reviews_routes_1 = __importDefault(require("../routes/reviews.routes"));
const usuario_routes_1 = __importDefault(require("../routes/usuario.routes"));
const app = express_1.default();
const apiPaths = {
    usuarios: '/api/usuarios',
    auth: '/api/auth',
    posts: '/api/posts',
    reviews: '/api/posts/review'
};
app.use(apiPaths.posts, post_routes_1.default);
app.use(apiPaths.usuarios, usuario_routes_1.default);
app.use(apiPaths.posts, post_routes_1.default);
app.use(apiPaths.reviews, reviews_routes_1.default);
/*

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get('/api/posts', [], getPosts);

*/
exports.default = app;
//# sourceMappingURL=app.js.map