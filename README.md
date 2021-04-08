# Post_serve
Servidor en Node Express para sistema de post's

## Tablas base de datos
  se añadio en el directorio **database** el script .sql para crear las tablas necesarias del sistema, de esta manera, se podra ingresar las tablas a una DB ya creada. se deben generar los dos scripts en bd de datos separadas para test y para serve
  
  en el archivo .env en raiz puede definir los accesos a las bd

### Despliegue del sistema

  lo primero que debemos hacer es ejecutar npm-install para recuperar todas las dependencias de node
  
 ```
npm install
```

 el proyecto fue desarrollado con typescript, por lo cual, el deslegable del sistema se encuentra en la carpeta **dist/**
  
 para ejecutar el sistema se puede realizar de la siguiente manera:
 ```
npm start
```
para produccion

y 

 ```
npm test
```
para el entorno de pruebas


## Documentacion de los Endpoints

en la siguiente dirección podrá consultar la documentacion de todos los endpoits del sistema:

https://documenter.getpostman.com/view/4273954/TzCJgAS1

### iniciando el Sistema

  una vez que se haya cargado correctamente el sistema, el unico usuario precargado es el **administrador**, las credenciales que necesitara para ingresar al sistema seran:
  
  ```
   {
    "email": "daniel_k310a@hotmail.com",
    "password": "123456"
   }
```

revise la documentacion de los endpoints para mas información.



