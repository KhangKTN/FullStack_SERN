import { where } from "sequelize";
import db from "../models/index";
import _ from 'lodash'
require('dotenv').config();
const MAX_NUMBER_SCHEDULE = 10;

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
            if(!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown 
            || !inputData.priceId || !inputData.paymentId || !inputData.provinceId 
            || !inputData.nameClinic || !inputData.addressClinic){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
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
                    // console.log(doctor);
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
                let doctorInfo = await db.Doctor_Infor.findOne({
                    where: {doctorId: inputData.doctorId},
                    raw: false
                })
                if(!doctorInfo){
                    console.log('...start doctor');
                    await db.Doctor_Infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.priceId,
                        paymentId: inputData.paymentId,
                        provinceId: inputData.provinceId,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note
                    });
                    console.log('...end create');
                }else{
                    await doctorInfo.update({
                        doctorId: inputData.doctorId,
                        priceId: inputData.priceId,
                        paymentId: inputData.paymentId,
                        provinceId: inputData.provinceId,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note
                    })
                }
                
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
                    {   model: db.Doctor_Infor, 
                        attributes: ['priceId', 'paymentId', 'provinceId', 'nameClinic', 'addressClinic', 'note'],
                        include: [
                            {model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi']},
                            {model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi']},
                            {model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi']},
                        ]
                    },
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

let createSchedule = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                });
            }else{
                if(data.length > 0 && data[0].doctorId){
                    data.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                    })
                    let exist = await db.Schedule.findAll({
                        where: {doctorId: data[0].doctorId, date: data[0].date},
                        attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    })
                    console.log('check data from FE:', data);
                    console.log('check database:', exist);
                    let toCreate = _.differenceWith(data, exist, (a, b) => {
                        return a.timeType === b.timeType && a.date == b.date;
                    });
                    console.log('check toCreate:', toCreate);
                    if(toCreate.length > 0) await db.Schedule.bulkCreate(toCreate);
                    resolve({
                        errCode: 0,
                        errMessage: 'Successfully'
                    })
                }
            }
        }catch(error){
            reject(error);
        }
    })
}

let getScheduleDoctor = (doctorId, date) => {
    return new Promise(async(resolve, reject) => {
        try {
            let result = [];
            console.log(`check doctorId: ${doctorId}, date: ${date}`);
            if(doctorId && date){
                result = await db.Schedule.findAll({
                    where: {doctorId: doctorId, date: date},
                    include: [
                        // {model: db., attributes: ['description', 'contentHTML', 'contentMarkdown']},
                        {model: db.Allcode, as: 'timeData', attributes: ['valueEn', 'valueVi']}
                    ],
                    nest: true,
                    raw: false
                })
                resolve({
                    errCode: 0,
                    data: result,
                    message: 'Get Schedule Doctor Successfully!'
                });
            }
            else{
                resolve({
                    errCode: 1,
                    data: result,
                    message: 'Missing required parameter!'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getDoctorClinic = (doctorId) => {
    return new Promise(async(resolve,reject) => {
        try {
            let data = await db.Doctor_Infor.findOne({
                where: {doctorId: doctorId},
                attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
                include: [
                    {model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi']},
                ],
                // nest: true,
                raw: false
            })
            if(data) {
                resolve({
                    errCode: 0,
                    data
                })
            }
            else{
                resolve({
                    errCode: 1,
                    data: ''
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getTopDoctorHome, getAllDoctors, saveInfoDoctor, getDetailDoctorById, 
    createSchedule, getScheduleDoctor, getDoctorClinic
}