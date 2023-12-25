import db from "../models/index";
import sendEmail from './emailService'
import {v4 as uuidv4} from 'uuid'
require('dotenv').config();

let patientBooking = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.email || !data.doctorId || !data.date || !data.timeType){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }else{
                let fullName = data.fullName;
                let lastName = fullName ? fullName.slice(0, fullName.lastIndexOf(' ')) : '';
                let firstName = fullName ? fullName.slice(fullName.lastIndexOf(' ') + 1) : '';
                let [user, createdUser] = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        firstName: firstName,
                        lastName: lastName,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                        roleId: 'R3'
                    }
                });
                if(user){
                    let id = uuidv4();
                    let [booking, createdBooking] = await db.Booking.findOrCreate({
                        where: {patientId: user.id, date: data.date},
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user.id,
                            date: data.date,
                            timeType: data.timeType,
                            token: id
                        }
                    });
                    await sendEmail({
                        email: data.email,
                        name: user.firstName,
                        time: data.emailTime,
                        date: data.emailDate,
                        address: data.address,
                        doctorName: data.doctorName,
                        language: data.language,
                        redirectUrl: `${process.env.URL_REACT}/verify-booking?token=${id}&doctorId=${data.doctorId}`
                    });
                    resolve({
                        errCode: 0,
                        errMessage: createdBooking ? 'Add booking appointment success!' : 'Today you have booking appointment!'
                    });
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let verifyBooking = (token, doctorId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!token || !doctorId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }else{
                let booking = await db.Booking.findOne({
                    where: {token: token, doctorId: doctorId, statusId: 'S1'},
                    raw: false
                });
                if(booking) await booking.update({statusId: 'S2'});
                resolve({
                    errCode: booking ? 0 : 2,
                    errMessage: booking ? 'Success update verify booking!' : 'Appointment has been confirmed!',
                    data: booking ? booking : ''
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {patientBooking, verifyBooking}