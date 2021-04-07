import {Sequelize} from 'sequelize';
import config from '../config/config';
import dotenv from 'dotenv';

dotenv.config();

const {MYSQL_DB, MYSQL_DB_TEST, NODE_ENV} =
process.env

const dbString = NODE_ENV === 'test'
? MYSQL_DB_TEST
: MYSQL_DB

const db = new Sequelize(
    dbString,
    config.userDb,
    config.passwordDb ,{
    host: config.hostDb,
    dialect: config.dialect,
    //logging: false,
    define: {
        freezeTableName: true
    }
});

export default db;