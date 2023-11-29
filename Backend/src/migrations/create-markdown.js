'use strict';

//const { query } = require("express");
const { Sequelize } = require("sequelize");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Markdowns', {
            id:{
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentHTML:{
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            contentMarkdown:{
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            description:{
                allowNull: true,
                type: Sequelize.TEXT('long')
            },
            doctorId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            specialtyId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            clinicId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Markdowns');
    }
}