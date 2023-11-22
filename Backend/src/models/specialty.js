'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class Specialty extends Model{
        static associate(models){

        }
    };
    Specialty.init({
        name: Datatypes.STRING,
        description: Datatypes.TEXT,
        image: Datatypes.STRING,
    },{
        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
}