
import { DataTypes } from "sequelize";
import db from "../database/connection";


const Historial = db.define('tb-historial', {
    post: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    usuario: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    movimiento: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Escribio'
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    }

});

Historial.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.createdAt;
    delete values.updatedAt;
    return values;
}

export default Historial;