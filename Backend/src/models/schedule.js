'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class Schedule extends Model{
        static associate(models){

        }
    };
    Schedule.init({
        //id: Datatypes.STRING,
        currentNumber: Datatypes.INTEGER,
        maxNumber: Datatypes.INTEGER,
        date: Datatypes.DATE,
        timeType: Datatypes.STRING,
        doctorId: Datatypes.INTEGER,
    },{
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
}