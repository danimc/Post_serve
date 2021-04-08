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
const app_1 = __importDefault(require("../models/app"));
const supertest_1 = __importDefault(require("supertest"));
const login_1 = require("./helpers/login");
let headerAdmin;
let headerModerador;
let headerEditor;
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    headerAdmin = yield login_1.LoginAdmin();
    headerModerador = yield login_1.LoginModerador();
    headerEditor = yield login_1.LoginEditor();
}));
describe("Obtener Todos los Usuarios Registrados", () => {
    test("Solicita Token de Autentificacion para Poder acceder a la lista", done => {
        supertest_1.default(app_1.default)
            .get("/api/usuarios")
            .then(response => {
            expect(response.status).toBe(401);
            expect(response.body.msg).toEqual('Token de acceso requerido');
            done();
        });
    });
    test("Se obtienen todos los usuarios Registrados con el token de administrador", done => {
        supertest_1.default(app_1.default)
            .get("/api/usuarios")
            .set(headerAdmin)
            .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.usuarios.length).toBeGreaterThan(0);
            done();
        });
    });
});
describe("Editar Usuarios", () => {
    test("Evita que un usuario Moderador Actualice información de usuarios", done => {
        const newData = {
            'nombre': 'Nuevo Nombre'
        };
        supertest_1.default(app_1.default)
            .put("/api/usuarios/2")
            .set(headerModerador)
            .send(newData)
            .then(response => {
            expect(response.status).toBe(401);
            expect(response.body.msg).toContain('no tiene privilegios de administrador');
            done();
        });
    });
    test("Evita que un usuario Editor Actualice información de usuarios", done => {
        const newData = {
            'nombre': 'Nuevo Nombre'
        };
        supertest_1.default(app_1.default)
            .put("/api/usuarios/2")
            .set(headerEditor)
            .send(newData)
            .then(response => {
            expect(response.status).toBe(401);
            expect(response.body.msg).toContain('no tiene privilegios de administrador');
            done();
        });
    });
    test("Edita datos enviados si es usuario es un adminstrador con JWT", done => {
        const newData = {
            'nombre': 'Nuevo Nombre'
        };
        supertest_1.default(app_1.default)
            .put("/api/usuarios/2")
            .set(headerAdmin)
            .send(newData)
            .then(response => {
            expect(response.status).toBe(200);
            done();
        });
    });
    test("Envia error si la contraseña no cumple con la longitud minima permitida (6 caracteres)", done => {
        const data = {
            password: "hola"
        };
        supertest_1.default(app_1.default)
            .put("/api/usuarios/2")
            .set(headerAdmin)
            .send(data)
            .then(response => {
            expect(response.body.errors).toHaveLength(1);
            expect(response.status).toBe(400);
            done();
        });
    });
});
//# sourceMappingURL=usuario.test.js.map