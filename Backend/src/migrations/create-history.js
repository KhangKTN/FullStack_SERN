'use strict';

//const { query } = require("express");
const { Sequelize } = require("sequelize");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Histories', {
            id:{
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            patientID:{
                type: Sequelize.INTEGER
            },
            doctorId:{
                type: Sequelize.INTEGER
            },
            description:{
                type: Sequelize.TEXT
            },
            files:{
                type: Sequelize.TEXT
            },
            createdAt:{
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Histories');
    }
}