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
const helpers_1 = require("./helpers");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield post_model_1.default.destroy({
        where: {},
        truncate: true
    });
    const post = new post_model_1.default(helpers_1.postData);
    yield post.save();
}));
describe("Pruebas para el endpoint de GET /API/POSTS", () => {
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
            expect(response.body.posts[0].titulo).toBe('Primer Post');
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
    test("Obtener un post en especifico ", done => {
        const estr = post_model_1.default;
        supertest_1.default(app_1.default)
            .get("/api/posts/1")
            .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.titulo).toEqual(helpers_1.postData.titulo);
            done();
        });
    });
});
//# sourceMappingURL=Posts.test.js.map