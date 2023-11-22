'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class Clinic extends Model{
        static associate(models){

        }
    };
    Clinic.init({
        name: Datatypes.STRING,
        address: Datatypes.STRING,
        description: Datatypes.TEXT,
        image: Datatypes.STRING,
    },{
        sequelize,
        modelName: 'Clinic',
    });
    return Clinic;
}