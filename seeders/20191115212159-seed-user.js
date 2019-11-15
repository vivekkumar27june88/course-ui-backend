'use strict';
const uuid = require('uuid');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                id2: uuid.v4(),
                firstName: 'Vivek',
                lastName: 'Kumar',
                email: 'vivekkumar27june88@gmail.com',
                avatar: '',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                id2: uuid.v4(),
                firstName: 'Krishna',
                lastName: 'Kumar',
                email: 'krishnakumar@gmail.com',
                avatar: '',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                id2: uuid.v4(),
                firstName: 'Amit',
                lastName: 'Gupta',
                email: 'amitgupta@gmail.com',
                avatar: '',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                id2: uuid.v4(),
                firstName: 'Mohit',
                lastName: 'Verma',
                email: 'mohitverma@gmail.com',
                avatar: '',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            },
            {
                id2: uuid.v4(),
                firstName: 'Brian',
                lastName: 'Lee',
                email: 'brianlee@gmail.com',
                avatar: '',
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString()
            }
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
