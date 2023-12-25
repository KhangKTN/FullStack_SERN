'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class Booking extends Model{
        static associate(models){

        }
    };
    Booking.init({
        statusId: Datatypes.STRING,
        doctorId: Datatypes.INTEGER,
        patientId: Datatypes.INTEGER,
        date: Datatypes.STRING,
        timeType: Datatypes.STRING,
        token: Datatypes.STRING
    },{
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
}