import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from '../controllers/patientController';
import specialtyController from '../controllers/specialtyController';
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAbout);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.delCRUD);
    //API
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);
    
    //doctor
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor', doctorController.getAllDoctors);
    router.post('/api/save-info-doctor', doctorController.saveInfoDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.createSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctor);
    router.get('/api/get-doctor-clinic', doctorController.getDoctorClinic);
    router.get('/api/get-doctor-profile', doctorController.getDoctorProfile);
    router.get('/api/get-patient-booking', doctorController.getPatientBooking);
    router.post('/api/send-prescription', doctorController.sendPrescription);

    //Patient
    router.post('/api/patient-booking-appointment', patientController.patientBooking);
    router.post('/api/verify-booking-appointment', patientController.verifyBooking);

    //Specialty
    router.post('/api/create-new-specialty', specialtyController.createNewSpecialty);
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-specialty-by-id', specialtyController.getSpecialtyById);
    router.post('/api/create-new-clinic', specialtyController.createNewClinic);
    router.get('/api/get-all-clinic', specialtyController.getAllClinic);
    router.get('/api/get-clinic-by-id', specialtyController.getClinicById);
    
    return app.use("/", router);
}

module.exports = initWebRoutes