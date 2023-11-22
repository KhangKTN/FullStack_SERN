'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class Doctor_Clinic_Specialty extends Model{
        static associate(models){

        }
    };
    Doctor_Clinic_Specialty.init({
        //id: Datatypes.STRING,
        doctorId: Datatypes.INTEGER,
        clinicId: Datatypes.INTEGER,
        specialtyId: Datatypes.INTEGER,
    },{
        sequelize,
        modelName: 'Doctor_Clinic_Specialty',
    });
    return Doctor_Clinic_Specialty;
}