const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('NodeJSBasic', 'root', null,{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async() => {
    try{
        await sequelize.authenticate();
        console.log('Connect successfully');
    } catch(error){
        console.error('Unable to connect to the DB: ', error);
    }

}

module.exports = connectDB;
