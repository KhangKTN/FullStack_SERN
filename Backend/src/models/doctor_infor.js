'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class Doctor_Infor extends Model{
        static associate(models){
            Doctor_Infor.belongsTo(models.User, {foreignKey: 'doctorId'});
            Doctor_Infor.belongsTo(models.Allcode, {foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData'});
            Doctor_Infor.belongsTo(models.Allcode, {foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentData'});
            Doctor_Infor.belongsTo(models.Allcode, {foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceData'});
            Doctor_Infor.belongsTo(models.Specialty, {foreignKey: 'specialtyId'});
            Doctor_Infor.belongsTo(models.Clinic, {foreignKey: 'clinicId'});
        }
    };
    Doctor_Infor.init({
        //id: Datatypes.STRING,
        doctorId: Datatypes.INTEGER,
        specialtyId: Datatypes.INTEGER,
        clinicId: Datatypes.INTEGER,
        priceId: Datatypes.STRING,
        provinceId: Datatypes.STRING,
        paymentId: Datatypes.STRING,
        note: Datatypes.STRING,
        count: Datatypes.INTEGER
    },{
        sequelize,
        modelName: 'Doctor_Infor',
        freezeTableName: true
    });
    return Doctor_Infor;
}