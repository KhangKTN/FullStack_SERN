import patientService from '../services/patientService'

let patientBooking = async(req, res) => {
    try {
        let user = await patientService.patientBooking(req.body);
        return res.status(200).json(user);
    } catch (error) {
        console.clear();
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

let verifyBooking = async(req, res) => {
    try {
        let result = await patientService.verifyBooking(req.query.token, req.query.doctorId);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    patientBooking, verifyBooking
}