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

module.exports = {
    getTopDoctorHome
}