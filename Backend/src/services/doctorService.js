import { where } from "sequelize";
import db from "../models/index";

let getTopDoctorHome = (limitInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                limit: +limitInput,
                order: [
                    ['createdAt', 'DESC']
                ],
                attributes: {exclude: ['password']}, 
                include: [
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']}
                ],
                where: {roleId: 'R2'},
                nest: true,
                raw: true
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getAllDoctors = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                attributes: {exclude: ['password', 'image']},
                // include: [
                //     {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                //     {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']}
                // ],
                where: {roleId: 'R2'},
                nest: true,
                raw: true
            })
            resolve(doctors)
        }catch(error){
            reject(error);
        }
    })
}

let saveInfoDoctor = (inputData) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }else{
                let doctor = await db.Markdown.findOne({
                    where: {doctorId: inputData.doctorId},
                    raw: false
                })
                if(!doctor){
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    });
                }else{
                    console.log(doctor);
                    // doctor.contentHTML = inputData.contentHTML;
                    // doctor.contentMarkdown = inputData.contentMarkdown;
                    // doctor.description = inputData.description;
                    // doctor.set({
                    //     contentHTML: inputData.contentHTML,
                    //     contentMarkdown: inputData.contentMarkdown,
                    //     description: inputData.description
                    // })
                    await doctor.update({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description
                    })
                    // await doctor.save();
                }
                console.log('...check dataInput:', inputData);
                resolve({
                    errCode: 0,
                    errMessage: 'Save infomation doctor successfully!'
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailDoctorById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!id) resolve({
                errCode: 1,
                errMessage: 'Missing required parameter!'
            })
            let data = await db.User.findOne({
                attributes: {exclude: ['password']},
                where: {id: id},
                include: [
                    {model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown']},
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']}
                ],
                nest: true,
                raw: false
            })

            if(data && data.image){
                data.image = new Buffer(data.image, 'base64').toString('binary');
            }
            if(!data) data = {}
            resolve({
                errCode: 0,
                data
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getTopDoctorHome, getAllDoctors, saveInfoDoctor, getDetailDoctorById
}