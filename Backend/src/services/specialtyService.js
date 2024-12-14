import db from "../models";

let createNewSpecialty = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.nameSpecialty || !data.avatar || !data.contentMarkdown || !data.contentHTML){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter required!'
                })
            }else{
                let specialty = await db.Specialty.findOne({
                    where: {name: data.nameSpecialty},
                    raw: false
                });
                if(!specialty) await db.Specialty.create({
                    descriptionMarkdown: data.contentMarkdown,
                    descriptionHTML: data.contentHTML,
                    name: data.nameSpecialty,
                    image: data.avatar
                })
                else{
                    await specialty.update({
                        descriptionMarkdown: data.contentMarkdown,
                        descriptionHTML: data.contentHTML,
                        name: data.nameSpecialty,
                        image: data.avatar
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Create new a specailty succeed!'
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.Specialty.findAll({
                // attributes: {exclude: ['']}
                // includes: 
            });
            resolve({
                errCode: 0,
                data
            });
        } catch (error) {
            reject(error);
        }
    })
}

let getSpecialtyById = (id, province) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!id || !province) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter required!',
                });
            }
            else{
                let data = await db.Specialty.findOne({
                    attributes: {exclude: ['updatedAt', 'createdAt']},
                    // attributes: ['name', 'id'],
                    where: {id},
                    // include: [
                    //     {model: db.Doctor_Infor, attributes: ['doctorId']}
                    // ],
                    raw: false
                });
                let doctors = [];
                if(province !== 0){
                    if(data){
                        doctors = province === 'ALL' ? await db.Doctor_Infor.findAll({where: {specialtyId: id}, attributes: ['doctorId']})
                        : await db.Doctor_Infor.findAll({where: {specialtyId: id,  provinceId: province}, attributes: ['doctorId']})
                    }
                }
                resolve({
                    errCode: 0,
                    data,
                    doctors
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let createNewClinic = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.nameClinic || !data.avatar || !data.contentMarkdown || !data.contentHTML){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter required!'
                })
            }else{
                let clinic = await db.Clinic.findOne({
                    where: {name: data.nameClinic},
                    raw: false
                });
                if(!clinic) await db.Clinic.create({
                    descriptionMarkdown: data.contentMarkdown,
                    descriptionHTML: data.contentHTML,
                    name: data.nameClinic,
                    address: data.addressClinic,
                    image: data.avatar
                })
                else{
                    await clinic.update({
                        descriptionMarkdown: data.contentMarkdown,
                        descriptionHTML: data.contentHTML,
                        name: data.nameClinic,
                        address: data.addressClinic,
                        image: data.avatar
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Create new a specailty succeed!'
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.Clinic.findAll({
                //
            });
            resolve({
                errCode: 0,
                data
            });
        } catch (error) {
            reject(error);
        }
    })
}

let getClinicById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter required!',
                });
            }
            else{
                let data = await db.Clinic.findOne({
                    attributes: {exclude: ['updatedAt', 'createdAt']},
                    where: {id}
                });
                resolve({
                    errCode: 0,
                    data
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {createNewSpecialty, getAllSpecialty, getSpecialtyById, 
    createNewClinic, getAllClinic, getClinicById
}