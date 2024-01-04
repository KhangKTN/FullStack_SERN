'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class Specialty extends Model{
        static associate(models){
            Specialty.hasMany(models.Doctor_Infor, {foreignKey: 'specialtyId'});
        }
    };
    Specialty.init({
        name: Datatypes.STRING,
        descriptionMarkdown: Datatypes.TEXT,
        descriptionHTML: Datatypes.TEXT,
        image: Datatypes.STRING,
    },{
        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
}