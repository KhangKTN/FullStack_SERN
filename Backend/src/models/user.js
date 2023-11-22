'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class User extends Model{
        static associate(models){
            User.belongsTo(models.Allcode, {foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData'});
            User.belongsTo(models.Allcode, {foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData'});
        }
    };
    User.init({
        //id: Datatypes.STRING,
        email: Datatypes.STRING,
        password: Datatypes.STRING,
        firstName: Datatypes.STRING,
        lastName: Datatypes.STRING,
        address: Datatypes.STRING,
        phoneNumber: Datatypes.STRING,
        gender: Datatypes.STRING,
        image: Datatypes.STRING,
        roleId: Datatypes.STRING,
        positionId: Datatypes.STRING,
    },{
        sequelize,
        modelName: 'User',
    });
    return User;
}