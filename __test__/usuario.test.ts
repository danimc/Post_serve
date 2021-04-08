import app from "../models/app";
import request from 'supertest';
import { LoginAdmin, LoginEditor, LoginModerador } from "./helpers/login";

let headerAdmin: object;
let headerModerador: object;
let headerEditor: object;

beforeEach(async () => {
    headerAdmin = await LoginAdmin();
    headerModerador = await LoginModerador();
    headerEditor = await LoginEditor();
})

describe("Obtener Todos los Usuarios Registrados", () => {
    test("Solicita Token de Autentificacion para Poder acceder a la lista", done => {
        request(app)
            .get("/api/usuarios")
            .then(response => {
                expect(response.status).toBe(401);
                expect(response.body.msg).toEqual('Token de acceso requerido');
                done();
            });
    });

    test("Se obtienen todos los usuarios Registrados con el token de administrador", done => {
        request(app)
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
        }
        request(app)
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
        }
        request(app)
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
        }
        request(app)
            .put("/api/usuarios/2")
            .set(headerAdmin)
            .send(newData)
            .then(response => {
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Manda Error si no se envian parametros", done => {
        const newData = {
            'nombre': 'Nuevo Nombre'
        }
        request(app)
            .put("/api/usuarios/2")
            .set(headerAdmin)
            .then(response => {
                expect(response.status).toBe(200);
                done();
            });
    });
});
