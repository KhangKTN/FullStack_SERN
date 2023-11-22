'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class History extends Model{
        static associate(models){

        }
    };
    History.init({
        patientId: Datatypes.INTEGER,
        doctorId: Datatypes.INTEGER,
        description: Datatypes.TEXT,
        files: Datatypes.TEXT
    },{
        sequelize,
        modelName: 'History',
    });
    return History;
}