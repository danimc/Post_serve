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
    yield post_model_1.default.destroy({ where: {},
        truncate: true });
    const post = new post_model_1.default(helpers_1.postData);
    yield post.save();
}));
describe("Respuesta 200 de todos los posts", () => {
    test("Se recibe un codigo de respuesta 200 al solicitar los posts", done => {
        supertest_1.default(app_1.default)
            .get("/api/posts")
            .then(response => {
            expect(response.status).toBe(200);
            done();
        });
    });
});
describe("Lectura de Posts", () => {
    test("Prueba que se pueda leer las notas de la base de datos", done => {
        supertest_1.default(app_1.default)
            .get("/api/posts")
            .then(response => {
            expect(response.body.posts[0].titulo).toBe('Prueba');
            done();
        });
    });
});
//# sourceMappingURL=routes.test.js.map