import React, { Component, useReducer } from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import { LANGUAGES, dateFormat } from '../../../utils';
import Select from 'react-select'
import moment from 'moment';
import {getScheduleDoctor} from '../../../services/userService'
import {FormattedMessage} from 'react-intl';
import BookingModal from './Modal/BookingModal';
import './DoctorSchedule.scss'

class DoctorSchedule extends Component {

    constructor(props){
        super(props);
        this.state = {
            allDays: [],
            listTime: [],
            doctorId: '',
            selectedScheduleData: '',
            isOpenBookingModal: false
        }
    }

    async componentDidMount(){
        let allDays = this.getAllDays();
        if(allDays && allDays.length > 0){
            this.setState({allDays});
        }
    }

    async componentDidUpdate(prevProps, prevState){
        if(prevProps.language !== this.props.language){
            let allDays = this.getAllDays();
            this.setState({allDays});
        }
        if(this.props.doctorId !== prevProps.doctorId){
            let doctorId = this.props.doctorId;
            let res = await getScheduleDoctor(doctorId, this.state.allDays[0].value);
            this.setState({doctorId, listTime: res.data})
        }
    }

    getAllDays = () => {
        let {language} = this.props;
        let allDays = [];
        for(let i = 0; i < 5; i++){
            let obj = {};
            obj.label = language === LANGUAGES.VI ? moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                : moment(new Date()).locale('en').add(i, 'days').format('ddd - MM/DD');
            obj.label = obj.label[0].toUpperCase() + obj.label.slice(1);
            if(i == 0){
                obj.label = (language === LANGUAGES.VI ? 'Hôm nay ' : 'Today ') + obj.label.slice(obj.label.indexOf('-'));;
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(obj);
        }
        return allDays;
    }

    handleOnChange = async(event) => {
        if(this.props.doctorId){
            let date = event.target.value;
            let res = await getScheduleDoctor(this.props.doctorId, date);
            this.setState({listTime: res.data})
        }
    }

    toggleUserModal = (time) => {
        this.setState({
            isOpenBookingModal: !this.state.isOpenBookingModal,
            selectedScheduleData: time ? time : '',
        });
    }

    render() {
        let options = this.state.allDays;
        let {listTime, doctorId} = this.state;
        let language = this.props.language;
        console.log('check doctorId from DoctorSchedule:', doctorId);
        // console.clear();
        // console.log('check state:', this.state);
        return(
            <div className='doctor-schedule-container'>
                <div className='schedule-date col-sm-12 col-md-10 col-lg-4'>
                    <select className='form-select text-secondary fw-bold' onChange={(event) => this.handleOnChange(event)}>
                        {options && options.length > 0 && options.map((item, index) => {
                            return <option value={item.value} key={item.value}>{item.label}</option>
                        })}
                    </select>
                </div>
                <BookingModal
                    isOpen = {this.state.isOpenBookingModal}
                    toggleFromParent = {this.toggleUserModal}
                    selectedScheduleData = {this.state.selectedScheduleData}
                    doctorId = {doctorId}
                />
                <div className='schedule-time'>
                    <h5 className='title-calendar my-4'><i class="far fa-calendar-alt"></i> <FormattedMessage id="patient.detail-doctor.schedule"/></h5>
                    {listTime && listTime.length == 0 && <h4><span className='badge rounded-pill bg-secondary'><FormattedMessage id="patient.detail-doctor.no-schedule"/></span></h4>}
                    <div className='time-choose'>
                        {listTime && listTime.length > 0 && listTime.map((item, index) => {
                            return(
                                <button onClick={() => this.toggleUserModal(item)} key={index} className='time-slot btn btn-secondary'>{language === LANGUAGES.VI ? item.timeData.valueVi : item.timeData.valueEn}</button>) 
                            })
                        }
                    </div>
                    {listTime && listTime.length > 0 && <h5 className='text-sm-center text-md-start'><FormattedMessage id="patient.detail-doctor.choose"/> <i className='far fa-hand-point-up text-warning'></i> <FormattedMessage id="patient.detail-doctor.book-free"/></h5>}
                </div>
            </div>
        ) 
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
