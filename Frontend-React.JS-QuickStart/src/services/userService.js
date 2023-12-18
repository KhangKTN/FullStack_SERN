import axios from "../axios"

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', {email, password})
}

const getAllUser = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
    // return axios.get(`/api/get-all-users`, {data: {id}});
}

const createNewUserService = (data) => {
    // console.log('check data from service: ', data);
    return axios.post(`/api/create-new-user`, data);
}

const deleteUserService = (id) => {
    // return axios.delete('/api/delete-user', {{id}});
    return axios.delete(`/api/delete-user?id=${id}`);
}

const editUserService = (user) => {
    return axios.put('/api/edit-user', user);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctor`);
}

const saveInfoDoctor = (data) => {
    return axios.post('/api/save-info-doctor', data);
}

const getDetailInfoDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}

const saveBulkScheduleDoctor = data => {
    return axios.post("/api/bulk-create-schedule", data);
}

const getScheduleDoctor = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getDoctorClinic = (doctorId) => {
    return axios.get(`/api/get-doctor-clinic?doctorId=${doctorId}`);
}

export {
    handleLoginApi, getAllUser, createNewUserService, deleteUserService, 
    editUserService, getAllCodeService, getTopDoctorService, getAllDoctorsService, saveInfoDoctor,
    getDetailInfoDoctor, saveBulkScheduleDoctor, getScheduleDoctor, getDoctorClinic
};