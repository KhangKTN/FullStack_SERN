'use strict';
const{
    Model
} = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    class Markdown extends Model{
        static associate(models){
            Markdown.belongsTo(models.User, {foreignKey: 'doctorId'})
        }
    };
    Markdown.init({
        contentHTML: Datatypes.TEXT('long'),
        contentMarkdown: Datatypes.TEXT('long'),
        description: Datatypes.TEXT('long'),
        doctorId: Datatypes.INTEGER,
        specialtyId: Datatypes.INTEGER,
        clinicId: Datatypes.INTEGER
    },{
        sequelize,
        modelName: 'Markdown'
    });
    return Markdown;
}

