import doctorService from '../services/doctorService'
// import {getDetailDoctorById} from '../services/doctorService'

let getTopDoctorHome = async(req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try {
        let doctor = await doctorService.getTopDoctorHome(limit);
        return res.status(200).json(doctor);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getAllDoctors = async(req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json({
            doctors: doctors,
            errCode: 0,
            errMessage: 'Get All Doctor Successfully'
        })
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let saveInfoDoctor = async(req, res) => {
    try {
        let response = await doctorService.saveInfoDoctor(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailDoctorById = async(req, res) => {
    try {
        let info = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let createSchedule = async(req, res) => {
    try {
        let info = await doctorService.createSchedule(req.body);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getScheduleDoctor = async(req, res) => {
    try {
        let info = await doctorService.getScheduleDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        });
    }
}

let getDoctorClinic = async(req, res) => {
    try {
        let doctorClinic = await doctorService.getDoctorClinic(req.query.doctorId);
        return res.status(200).json(doctorClinic)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    getTopDoctorHome, getAllDoctors, saveInfoDoctor, getDetailDoctorById, createSchedule,
    getScheduleDoctor, getDoctorClinic
}