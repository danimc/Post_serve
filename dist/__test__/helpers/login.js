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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginEditor = exports.LoginModerador = exports.LoginAdmin = exports.fakeUser = exports.editData = exports.modData = exports.adminData = void 0;
const post_1 = require("./post");
exports.adminData = {
    "email": 'daniel_k310a@hotmail.com',
    "password": "123456"
};
exports.modData = {
    "email": 'test1@test.com',
    "password": "123456"
};
exports.editData = {
    "email": 'test2@test.com',
    "password": "123456"
};
exports.fakeUser = {
    "email": 'falso@hotmail.com',
    "password": "5214"
};
const LoginAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield post_1.api.post('/api/auth/login')
        .send(exports.adminData);
    return {
        'x-token': response.body.token
    };
});
exports.LoginAdmin = LoginAdmin;
const LoginModerador = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield post_1.api.post('/api/auth/login')
        .send(exports.modData);
    return {
        'x-token': response.body.token
    };
});
exports.LoginModerador = LoginModerador;
const LoginEditor = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield post_1.api.post('/api/auth/login')
        .send(exports.editData);
    return {
        'x-token': response.body.token
    };
});
exports.LoginEditor = LoginEditor;
//# sourceMappingURL=login.js.map