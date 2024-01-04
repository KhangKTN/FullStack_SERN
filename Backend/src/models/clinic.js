'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class Clinic extends Model{
        static associate(models){
            Clinic.hasMany(models.Doctor_Infor, {foreignKey: 'clinicId'});
        }
    };
    Clinic.init({
        name: Datatypes.STRING,
        address: Datatypes.STRING,
        descriptionHTML: Datatypes.TEXT,
        descriptionMarkdown: Datatypes.TEXT,
        image: Datatypes.STRING,
    },{
        sequelize,
        modelName: 'Clinic',
    });
    return Clinic;
}