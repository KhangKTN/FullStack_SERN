import { where } from "sequelize";
import db from "../models/index";
import _ from 'lodash'
import emailService from "./emailService";
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
            || !inputData.specialtyId || !inputData.clinicId){
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
                    await db.Doctor_Infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.priceId,
                        paymentId: inputData.paymentId,
                        provinceId: inputData.provinceId,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId,
                        note: inputData.note
                    });
                }else{
                    await doctorInfo.update({
                        doctorId: inputData.doctorId,
                        priceId: inputData.priceId,
                        paymentId: inputData.paymentId,
                        provinceId: inputData.provinceId,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId,
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
                        attributes: ['priceId', 'paymentId', 'provinceId', 'specialtyId', 'clinicId', 'note'],
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
                        {model: db.Allcode, as: 'timeData', attributes: ['valueEn', 'valueVi']},
                        {model: db.User,  attributes: ['firstName', 'lastName']}
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
                attributes: ['id'],
                include: [
                    {model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Clinic, attributes: ['name', 'address']},
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

let getDoctorProfile = (doctorId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!doctorId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }else{
                let doctorProfile = await db.User.findOne({
                    attributes: ['id', 'firstName', 'lastName', 'image'],
                    where: {id: doctorId},
                    include: [
                        {model: db.Markdown, attributes: ['description']},
                        {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                        {   model: db.Doctor_Infor, 
                            include: [
                                {model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi']},
                                {model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi']},
                                {model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi']},
                                {model: db.Clinic, attributes: ['name', 'address']},
                            ]
                        },
                    ],
                    raw: false
                })
                if(doctorProfile && doctorProfile.image){
                    doctorProfile.image = new Buffer(doctorProfile.image, 'base64').toString('binary');
                }
                resolve({
                    errCode: 0,
                    data: doctorProfile 
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getPatientBooking = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data || !data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter required!'
                })
            }
            else{
                let listPatient = await db.Booking.findAll({
                    where: {doctorId: data.doctorId, date: data.date, statusId: 'S2'},
                    attributes: {exclude: ['token', 'createdAt', 'updatedAt']},
                    include: [
                        {model: db.User, attributes: ['firstName', 'lastName', 'phoneNumber', 'email']},
                        {model: db.Allcode, attributes: ['valueVi', 'valueEn']}
                    ],
                    raw: false
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Get information success!',
                    listPatient
                })
            }
            
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

let sendPrescription = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data || !data.id){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }else{
                //Update status
                let booking = await db.Booking.findOne({
                    where: {id: data.id},
                    raw: false
                })
                if(booking) await booking.update({statusId: 'S3'})

                //Send email with attachment
                console.log(data);
                let res = await emailService.sendAttackment(data);
                resolve({
                    errCode: 0,
                    errMessage: "Send prescription successfully!"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getTopDoctorHome, getAllDoctors, saveInfoDoctor, getDetailDoctorById, 
    createSchedule, getScheduleDoctor, getDoctorClinic, getDoctorProfile, 
    getPatientBooking, sendPrescription
}