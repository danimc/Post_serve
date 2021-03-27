import {Sequelize} from 'sequelize';
import config from '../config/config';

const db = new Sequelize(
    config.database,
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