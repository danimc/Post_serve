import {Sequelize} from 'sequelize';
import config from '../config/config';
import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, ...conf} =
process.env

const coneccion = NODE_ENV === 'test'
? {
    dabtabase : conf.MYSQL_DB_TEST,
    user : conf.MYSQL_DB_USER_TEST,
    pass : conf.MYSQL_DB_PASS_TEST,
    host : conf.MYSQL_DB_HOST_TEST}
: {
    dabtabase : conf.MYSQL_DB,
    user : conf.MYSQL_DB_USER,
    pass : conf.MYSQL_DB_PASS,
    host : conf.MYSQL_DB_HOST
}

const db = new Sequelize(
    coneccion.dabtabase,
    coneccion.user,
    coneccion.pass,{
    host: coneccion.host,
    dialect: config.dialect,
    //logging: false,
    define: {
        freezeTableName: true
    }
});

export default db;