import actionTypes from '../actions/actionTypes';
import { getAllCodeService } from '../../services/userService';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    position: [],
    users: [],
    doctors: [],
    dataTime: [],
    allRequiredData: ''
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: 
            let copyState = {...state};
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED: 
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS: 
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED: 
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS: 
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED: 
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return{
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAILED: 
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.doctors = action.dataDoctors;
            console.log('Check state doctor:', state.doctors);
            return{
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED: 
            state.doctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.doctors = action.dataDoctors;
            return{
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED: 
            state.doctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_TIME_SUCCESS:
            state.dataTime = action.dataTime;
            return{
                ...state
            }
        case actionTypes.FETCH_ALLCODE_TIME_FAILED: 
            state.doctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS:
            state.requiredData = action.requiredData;
            return{
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_FAILED: 
            state.allRequiredData = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;