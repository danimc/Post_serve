import app from "../models/app";
import request from 'supertest';
import { adminData, fakeUser } from "./helpers/login";
import { api } from "./helpers/post";




describe("Login a la Plataforma", () => {
    test('Error al intentar ingresar sin datos', async () => {
        const response = await api.post('/api/auth/login');
        expect(400);
        expect(response.body.errors).toHaveLength(2);
    });

    test("Se recibe un codigo de respuesta 400 (bad request) al ingresar datos de usuarios no dados de alta", done => {
        request(app)
            .post("/api/auth/login")
            .send(fakeUser)
            .then(response => {
                expect(response.status).toBe(400);
                expect(response.body.token).toBeUndefined()
                done();
            });
    });

    test("Valida inicio de sesion y envia token de acceso", done => {
        request(app)
            .post("/api/auth/login")
            .send(adminData)
            .then(response => {
                expect(response.status).toBe(202);
                expect(response.body.token).not.toBeNull();
                done();
            });
    });

});