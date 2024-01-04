import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUserService, getAllUser, 
    deleteUserService, editUserService, getTopDoctorService, 
    getAllDoctorsService, saveInfoDoctor, getAllSpecialty, getAllClinic } from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("Gender");
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data))
            }
            else{
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart error:', error);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchPositionStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService("Position");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data))
            }
            else{
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionStart error:', error);
        }
    }
}

export const fetchPositionSuccess = (positonData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positonData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
})

export const fetchRoleStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService("Role");
            console.log('check role start:', res);
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data))
            }
            else{
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed())
            console.log('fetchRoleStart error:', error);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
})

export const createNewUser = (data) => {
    return async(dispatch, getState) => {
        try {
            console.log('check create user redux: ', data);
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                dispatch(saveUserSuccess(res));
                toast.success("Create new user Successfully !");
            }else{
                toast.warn(res.message);
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log(error);
        }
    }
}

export const saveUserSuccess = (res) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const fetchAllUserStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllUser("ALL");
            //console.log('check role start:', res);
            if(res && res.errCode === 0){
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            }
            else{
                dispatch(fetchAllUserFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed())
            //console.log('fetchRoleStart error:', error);
        }
    }
}

export const fetchDeleteUserStart = (id) => {
    return async(dispatch, getState) => {
        console.log('check id delete:', id);
        let res = await deleteUserService(id);
        try {
            //console.log('check role start:', res);
            if(res && res.errCode === 0){
                toast.success(res.errMessage);
                await dispatch(fetchAllUserStart());
            }
            else{
                toast.error(res.errMessage);
                dispatch(fetchDeleteUserFailed())
            }
        } catch (error) {
            toast.error(res.errMessage);
            dispatch(fetchDeleteUserFailed())
            //console.log('fetchRoleStart error:', error);
        }
    }
}

export const fetchDeleteUserSuccess = (data) => ({
    type: actionTypes.FETCH_DELETE_USER_SUCCESS,
    users: data
})

export const fetchDeleteUserFailed = () => ({
    type: actionTypes.FETCH_DELETE_USER_FAILED,
})

export const fetchEditUserStart = (data) => {
    return async(dispatch, getState) => {
        console.log('data fetch edit:', data);
        let res = await editUserService(data);
        try {
            console.log('check role start:', res);
            if(res && res.errCode === 0){
                toast.success(res.message);
                await dispatch(fetchAllUserStart());
            }
            else{
                toast.error(res.errMessage);
                await dispatch(fetchAllUserStart());
            }
        } catch (error) {
            toast.error(res.message);
            await dispatch(fetchAllUserStart());
            //console.log('fetchRoleStart error:', error);
        }
    }
}

export const fetchTopDoctorStart = (limit) => {
    return async(dispatch, getState) => {
        try {
            let res = await getTopDoctorService(limit);
            if(res && res.errCode === 0){
                dispatch(fetchTopDoctorSuccess(res.data.reverse()))
            }
            else{
                dispatch(fetchTopDoctorFailed())
            }
        } catch (error) {
            dispatch(fetchTopDoctorFailed())
        }
    }
}

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    dataDoctors: data
})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
})

export const fetchAllDoctorStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();
            console.log('...check doctor from action:', res);
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDoctors: res.doctors
                })
            }
            else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log('...Fetch all doctor failed:', error);
            dispatch({type: actionTypes.FETCH_ALL_DOCTOR_FAILED});
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async(dispatch, getState) => {
        try {
            console.log('...check save detail doctor from action:', data);
            let res = await saveInfoDoctor(data);
            if(res && res.errCode === 0){
                toast.success(res.errMessage);
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }
            else{
                toast.error('Save detail doctor failed!', res.errMessage);
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (error) {
            toast.error('Save detail doctor failed!');
            dispatch({type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED});
        }
    }
}

export const fetchAllcodeTime = (type) => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            console.log('...check allcode time from action:', res);
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }
            else{
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_TIME_FAILED
                })
            }
        } catch (error) {
            console.log('...Fetch allcode time failed:', error);
            dispatch({type: actionTypes.FETCH_ALL_DOCTOR_FAILED});
        }
    }
}

export const fetchAllRequiredDoctorStart = () => {
    return async(dispatch, getState) => {
        try {
            // dispatch({
            //     type: actionTypes.FETCH_REQUIRED_DOCTOR_START
            // })
            let prices = await getAllCodeService("PRICE");
            let payments = await getAllCodeService("PAYMENT");
            let provinces = await getAllCodeService("PROVINCE");
            let specialties = await getAllSpecialty();
            let clinics = await getAllClinic();
            let data = {
                prices: prices.data, 
                payments: payments.data, 
                provinces: provinces.data,
                specialties: specialties.data,
                clinics: clinics.data
            }
            // console.log('check data:', data);
            if(prices && prices.errCode === 0 && payments && payments.errCode === 0 && provinces && provinces.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS,
                    requiredData: data
                })
            }
            else{
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_TIME_FAILED
                })
            }
        } catch (error) {
            console.log('fetchAllRequiredDoctor error:', error);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_TIME_FAILED
            })
        }
    }
}