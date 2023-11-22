import bcrypt, { hash } from 'bcrypt';
import db, { sequelize } from '../models/index'
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                // image: data.image,
                roleId: data.roleId,
                //positionId: data.positionId
            })
            resolve('create a new user succeed');
        } catch (error) {
            reject(error);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

/* let getAllUser = (search) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = db.User.findAll();
            console.log(search);
            if(search != null){
                user = db.User.findAll({
                    where: {
                        [Op.or]:[
                            {
                                firstName: {
                                    [Op.like]: `%${search}%`
                                }
                            },
                            {
                                lastName: {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ]
                    }
                });
            }
            
            resolve(user);
        } catch (error) {
            reject(error);
        }
    })
} */

let getAllUser = (search) => {
    return new Promise(async(resolve, reject) => {
        try {
            let [user, a] = await sequelize.query("Select * From Users");
            if(search)
            [user] = await sequelize.query("Select * From Users where firstName like $1 or lastName like $1",{
                bind: [`%${search}%`]
            });
            if(user){
                resolve(user);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: {id: userId}
            })
            //let user = db.User.findByPk(userId);
            if(user){
                resolve(user)
            }
            else{
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                await user.save();
                console.log(1);
                resolve();
            } else{
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    })
}

/* let delCRUD = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await sequelize.query("Delete From Users where id = $1",
            {bind : [`${id}`]});
            resolve();
        } catch (error) {
            reject(error);
        }
    })
} */

let delCRUD = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user) await user.destroy();
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewUser, getAllUser, getUserById, updateUserData, delCRUD
}