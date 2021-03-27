# Post_serve
Servidor en Node Express para sistema de post's

## Tablas base de datos
  se añadio en el directorio **database** el script .sql para crear las tablas necesarias del sistema, de esta manera, se podra ingresar las tablas a una DB ya creada.

### Despliegue del sistema

  lo primero que debemos hacer es ejecutar npm-install para recuperar todas las dependencias de noder
  
 ```
npm install
```

 el proyecto fue desarrollado con typescript, por lo cual, el deslegable del sistema se encuentra en la carpeta **dist/**
  
 para ejecutar el sistema hay que realizarlo desde la carpeta dist/
 ```
npm node dist/app
```

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



