require('dotenv').config();
const nodemailer = require('nodemailer');

let sendEmail = async(receiverData) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ACC,
            pass: process.env.EMAIL_PASS
        }
    })

    let info = await transporter.sendMail({
        from: 'Khang KTN',
        // to: 'lvhoang.96.tcv@gmail.com',
        to: 'pdinhkhang92tcv@gmail.com',
        subject: receiverData.language === 'vi' ? 'Xác nhận đặt lịch khám từ Bookingcare' : 'Confirmation of appointment from Bookingcare',
        text: '',
        html: receiverData.language === 'vi' ?
        `
            <div style="font-size: 16px">
                <h3>Xin chào ${receiverData.name},</h3>
                <h3>Cảm ơn bạn đã đặt lịch khám trên website Bookingcare.vn</h3>
                <h3>Thông tin lịch khám:</h3>
                <ul>
                    <li>Bác sĩ: ${receiverData.doctorName}</li>
                    <li>Ngày khám: ${receiverData.time} (${receiverData.date})</li>
                    <li>Địa chỉ: ${receiverData.addressClinic}</li>
                    <li>Giá khám: ${receiverData.price}</li>
                </ul>
                <p>Vui lòng <a href=${receiverData.redirectUrl} target="_blank">Nhấn vào đây</a> để xác nhận thông tin trên nếu bạn muốn đặt lịch khám.</p>
                <p>Cảm ơn bạn đã đặt lịch. Hẹn gặp lại bạn ở phòng khám.</p>
            </div>
        ` :
        `
        <div style="font-size: 16px">
            <h3>Hello ${receiverData.name},</h3>
            <h3>Thank you for making an appointment on the website Bookingcare.vn</h3>
            <h3>Examination schedule information:</h3>
            <ul>
                <li>Doctor: ${receiverData.doctorName}</li>
                <li>Examination date: ${receiverData.time} (${receiverData.date})</li>
                <li>Address: ${receiverData.addressClinic}</li>
                <li>Examination price: ${receiverData.price}</li>
            </ul>
            <p>Please <a href=${receiverData.redirectUrl} target="_blank">Click here</a> to confirm the above information if you want to make an appointment.</p>
            <p>Thank you for booking. See you at the clinic.</p>
        </div>
        `
    })
}

let sendAttackment = (receiverData) => {
    return new Promise(async(resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_ACC,
                    pass: process.env.EMAIL_PASS
                }
            })
        
            let info = await transporter.sendMail({
                from: 'Khang KTN',
                // to: 'lvhoang.96.tcv@gmail.com',
                to: 'pdinhkhang92tcv@gmail.com',
                subject: 'THÔNG TIN HOÁ ĐƠN KHÁM BỆNH',
                text: '',
                attachments: [{
                    filename: receiverData.imageName,
                    content: receiverData.image.split('base64,')[1],
                    encoding: 'base64'
                }],
                html: 
                `
                <div style="font-size: 16px">
                    <h4>Xin chào ${receiverData.patientName},</h4>
                    <h4>Cảm ơn bạn đã khám bệnh tại website Bookingcare.vn</h4>
                    <h4>Thông tin khám bệnh:</h4>
                    <ul>
                        <li>Bác sĩ: ${receiverData.doctorName}</li>
                        <li>Ngày khám: ${receiverData.time} (${receiverData.date})</li>
                    </ul>
                    <h4>Thông tin đơn thuốc trong ảnh bên dưới:</h4>
                    <p>Chúc bạn ngày mới tốt lành.</p>
                </div>
                `
            })
            resolve({
                errorCode: 0,
                message: 'Send email success!'
            })
        } catch (error) {
            reject(error)
        }
    })
    

}

module.exports = {sendEmail, sendAttackment}