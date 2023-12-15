'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class Allcode extends Model{
        static associate(models){
            Allcode.hasMany(models.User, {foreignKey: 'positionId', as: 'positionData'});
            Allcode.hasMany(models.User, {foreignKey: 'gender', as: 'genderData'})
            Allcode.hasMany(models.Schedule, {foreignKey: 'timeType', as: 'timeData'})
        }
    };
    Allcode.init({
        //id: Datatypes.STRING,
        keyMap: Datatypes.STRING,
        type: Datatypes.STRING,
        valueEn: Datatypes.STRING,
        valueVi: Datatypes.STRING,
    },{
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
}