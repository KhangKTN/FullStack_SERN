import specialtyService from "../services/specialtyService"

let createNewSpecialty = async(req, res) => {
    try {
        let result = await specialtyService.createNewSpecialty(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllSpecialty = async(req, res) => {
    try {
        let result = await specialtyService.getAllSpecialty(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getSpecialtyById = async(req, res) => {
    try {
        let result = await specialtyService.getSpecialtyById(req.query.id, req.query.province);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let createNewClinic = async(req, res) => {
    try {
        let result = await specialtyService.createNewClinic(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllClinic = async(req, res) => {
    try {
        let result = await specialtyService.getAllClinic(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getClinicById = async(req, res) => {
    try {
        let result = await specialtyService.getClinicById(req.query.id, req.query.province);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {createNewSpecialty, getAllSpecialty, getSpecialtyById, 
    createNewClinic, getAllClinic, getClinicById
}