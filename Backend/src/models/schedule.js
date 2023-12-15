'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class Schedule extends Model{
        static associate(models){
            Schedule.belongsTo(models.User, {foreignKey: 'doctorId'});
            Schedule.belongsTo(models.Allcode, {foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeData'})
        }
    };
    Schedule.init({
        //id: Datatypes.STRING,
        currentNumber: Datatypes.INTEGER,
        maxNumber: Datatypes.INTEGER,
        date: Datatypes.STRING,
        timeType: Datatypes.STRING,
        doctorId: Datatypes.INTEGER,
    },{
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
}