"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../models/app"));
const post_model_1 = __importDefault(require("../models/post.model"));
const login_1 = require("./helpers/login");
const post_1 = require("./helpers/post");
let headerAdmin;
let headerModerador;
let headerEditor;
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield post_model_1.default.destroy({
        where: {},
        truncate: true
    });
    for (const post of post_1.postData) {
        const newPost = new post_model_1.default(post);
        yield newPost.save();
    }
    headerAdmin = yield login_1.LoginAdmin();
    headerModerador = yield login_1.LoginModerador();
    headerEditor = yield login_1.LoginEditor();
}));
describe("Obtener Posts", () => {
    test("Se recibe un codigo de respuesta 200 al solicitar los posts", done => {
        supertest_1.default(app_1.default)
            .get("/api/posts")
            .then(response => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("Prueba que se pueda leer las notas de la base de datos", done => {
        supertest_1.default(app_1.default)
            .get("/api/posts")
            .then(response => {
            expect(response.body.Posts).toHaveLength(post_1.postData.length);
            done();
        });
    });
    test("Manda un codigo 404 al no encontrar el id del post", done => {
        supertest_1.default(app_1.default)
            .get("/api/posts/101dasa")
            .then(response => {
            expect(response.status).toBe(404);
            done();
        });
    });
    test("Obtener un post en especifico ", (done) => __awaiter(void 0, void 0, void 0, function* () {
        supertest_1.default(app_1.default)
            .get("/api/posts/1")
            .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.titulo).toContain('Primer Post');
            done();
        });
    }));
});
describe("Nuevo Post", () => {
    test("Solicita Token de acceso para agregar un nuevo Post", done => {
        supertest_1.default(app_1.default)
            .post("/api/posts")
            .send(post_1.nuevoPost)
            .then(response => {
            expect(response.status).toBe(401);
            expect(response.body.msg).toEqual('Token de acceso requerido');
            done();
        });
    });
    test("No se agrega si no lleva datos en el body", done => {
        supertest_1.default(app_1.default)
            .post("/api/posts")
            .then(response => {
            expect(response.status).toBe(401);
            done();
        });
    });
    test("No se añade un post que no tenga titulo", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const fakeNote = {
            mensaje: 'hola a todos este es un nuevo post de prueba'
        };
        supertest_1.default(app_1.default)
            .post("/api/posts")
            .set(headerAdmin)
            .send(fakeNote)
            .then(response => {
            expect(response.status).toBe(400);
            expect(response.body.errors).toHaveLength(1);
            done();
        });
    }));
    test("No se añade una post que no tenga mensaje", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const fakeNote = {
            titulo: 'Titulo numero 4'
        };
        supertest_1.default(app_1.default)
            .post("/api/posts")
            .set(headerAdmin)
            .send(fakeNote)
            .then(response => {
            expect(response.status).toBe(400);
            expect(response.body.errors).toHaveLength(1);
            done();
        });
    }));
    test("Añadiendo nuevo Post a la Base de Datos con valores correctos", () => __awaiter(void 0, void 0, void 0, function* () {
        yield post_1.api.post('/api/posts')
            .set(headerAdmin)
            .send(post_1.nuevoPost);
        expect(201);
        const data = yield post_1.AllPosts();
        expect(data.response.body.Posts).toHaveLength(post_1.postData.length + 1);
    }));
});
//# sourceMappingURL=Posts.test.js.map