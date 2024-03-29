'use strict';

//const { query } = require("express");
const { Sequelize } = require("sequelize");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Specialties', {
            id:{
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            descriptionMarkdown:{
                type: Sequelize.TEXT
            },
            descriptionHTML:{
                type: Sequelize.TEXT
            },
            image:{
                type: Sequelize.STRING
            },
            name:{
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Specialties');
    }
}