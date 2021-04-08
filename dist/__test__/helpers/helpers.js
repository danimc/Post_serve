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
exports.AllPosts = exports.nuevoPost = exports.postData = void 0;
const app_1 = __importDefault(require("../models/app"));
const supertest_1 = __importDefault(require("supertest"));
const api = supertest_1.default(app_1.default);
exports.postData = [
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
    }
];
exports.nuevoPost = {
    titulo: 'Primer Post',
    mensaje: 'Este es el primer Post de pruebas cargado'
};
const AllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get('/api/posts');
    return {
        contents: response.body.Posts.map((post) => post.content),
        response
    };
});
exports.AllPosts = AllPosts;
//# sourceMappingURL=helpers.js.map