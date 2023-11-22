'use strict';

//const { query } = require("express");
const { Sequelize } = require("sequelize");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            email: 'admin@gmail.com',
            password: '123456',
            firstName: 'Khang',
            lastName: 'KTN',
            address: 'England',
            gender: 1,
            typeRole: 'ROLE',
            keyRole: 'R1',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
}