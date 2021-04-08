
import { api } from "./post";

export const adminData = {
    "email": 'daniel_k310a@hotmail.com',
    "password": "123456"
}

export const modData = {
    "email": 'test1@test.com',
    "password": "123456"
}

export const editData = {
    "email": 'test2@test.com',
    "password": "123456"
}

export const fakeUser = {
    "email": 'falso@hotmail.com',
    "password": "5214"
}


export const LoginAdmin = async () => {
   const response = await api.post('/api/auth/login')
   .send(adminData);
   return {
       'x-token': response.body.token
   };
}

export const LoginModerador = async () => {
    const response = await api.post('/api/auth/login')
    .send(modData);
    return {
        'x-token': response.body.token
    };
 }

 export const LoginEditor = async () => {
    const response = await api.post('/api/auth/login')
    .send(editData);
    return {
        'x-token': response.body.token
    };
 }



