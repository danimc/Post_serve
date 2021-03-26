import {Sequelize} from 'sequelize';

const db = new Sequelize('post_serve', 'admin','123' ,{
    host: 'localhost',
    dialect: 'mariadb',
    //logging: false
});

export default db;