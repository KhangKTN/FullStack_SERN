import { where } from "sequelize";
import db from "../models/index";
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                let user = await db.User.findOne({
                    attributes: ['id', 'roleId', 'firstName', 'lastName', 'email', 'password'],
                    where: {email: email},
                    raw: true
                })
                if(user){
                    let check = await bcrypt.compareSync(password, user.password)
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        console.log(user);
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password'
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in system. Please try other email!`
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({where: {email: userEmail}});
            if(user) resolve(true)
            else resolve(false)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = '';
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            if(userId && userId != 'ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(data.email);
            if(checkEmail === true){
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used. Try other other email !'
                })
            }
            else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    image: data.avatar,
                    roleId: data.roleId,
                    positionId: data.positionId
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
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

let deleteUser = async(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId},
                raw: false
            })
            if(!user){
                resolve({
                    errCode: 2,
                    errMessage: `User doesn't exist`
                })
            }
            await user.destroy();
            resolve({
                errCode: 0,
                errMessage: `User '${user.email}' is deleted`
            })
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: data.id}, 
                raw: false
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.role;
                user.positionId = data.position;
                user.image = data.avatar;
                await user.save();
                resolve({
                    errCode: 0,
                    message: `Udpate user succeed!`
                });
            } else{
                resolve({
                    errCode: 1,
                    message: `User's not found`
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!typeInput){
                resolve({errCode: 1, errMessage: 'Missing required parameter'});
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: {type: typeInput}
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleUserLogin, getAllUsers, createNewUser, updateUserData, deleteUser, getAllCodeService
}