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
const post_1 = require("./helpers/post");
describe("Login a la Plataforma", () => {
    test('Error al intentar ingresar sin datos', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield post_1.api.post('/api/auth/login');
        expect(400);
        expect(response.body.errors).toHaveLength(2);
    }));
    test("Se recibe un codigo de respuesta 400 (bad request) al ingresar datos de usuarios no dados de alta", done => {
        supertest_1.default(app_1.default)
            .post("/api/auth/login")
            .send(login_1.fakeUser)
            .then(response => {
            expect(response.status).toBe(400);
            expect(response.body.token).toBeUndefined();
            done();
        });
    });
    test("Valida inicio de sesion y envia token de acceso", done => {
        supertest_1.default(app_1.default)
            .post("/api/auth/login")
            .send(login_1.adminData)
            .then(response => {
            expect(response.status).toBe(202);
            expect(response.body.token).not.toBeNull();
            done();
        });
    });
});
//# sourceMappingURL=Login.test.js.map