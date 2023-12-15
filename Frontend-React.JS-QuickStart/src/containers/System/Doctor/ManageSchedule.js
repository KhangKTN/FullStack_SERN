import React, { Component, useReducer } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import * as actions from '../../../store/actions'
import { LANGUAGES, dateFormat } from '../../../utils';
import Select from 'react-select';
import DataPicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { saveBulkScheduleDoctor } from '../../../services/userService';
import { FormattedDate } from '../../../components/Formating/FormattedDate';
import { toast } from "react-toastify";
import './ManageSchedule.scss';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            dataTime: [],
            selectedDoctor: '',
            currentDate: ''
        }

    }

    componentDidMount(){
        this.props.getAllDoctorRedux();
        this.props.getAllTime();
        console.log();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.doctors != this.props.doctors){
            let doctors = this.buildDataInputSelect(this.props.doctors);
            this.setState({doctors});
        }
        if(prevProps.language !== this.props.language){
            let doctors = this.buildDataInputSelect(this.props.doctors);
            this.setState({doctors});
        }
        if(prevProps.dataTime !== this.props.dataTime){
            let data = this.props.dataTime;
            if(data && data.length > 0){
                data.map(item => item.isSelected = false)
            }
            this.setState({dataTime: this.props.dataTime})
        }
    }

    buildDataInputSelect = (data) => {
        let dataSelect = [];
        if(data && data.length > 0){
            data.map((item, index) => {
                dataSelect.push({
                    value: item.id,
                    label: LANGUAGES.VI === this.props.language ? item.lastName + ' ' + item.firstName :  item.firstName + ' ' + item.lastName
                })
            })
        }
        return dataSelect;
    }

    handleChange = async selectedOption => {
        console.log(selectedOption);
        this.setState({selectedDoctor: selectedOption})
    }

    handleOnChangeDatePicker = (date) => {
        // console.log('check datepicker onchange:', value);
        this.setState({currentDate: date[0]})
    }

    handleClickTime = timeSelected => {
        let data = this.state.dataTime;
        let res = data.map(item => item.id === timeSelected.id ? item.isSelected = !item.isSelected : '');
        this.setState({dataTime: data})
    }

    handleSaveSchedule = async() => {
        let {dataTime, selectedDoctor, currentDate} = this.state;
        if(!currentDate) toast.error("Invalid date !");
        else if(!selectedDoctor) toast.error("Please choose doctor!");
        // else if(new Date(currentDate) < new Date(Date.now()).getTime()) toast.error("Please choose date from today!");
        else{
            // let formattedDate = new Date(currentDate);
            if(dataTime && dataTime.length > 0){
                let selectedTime = dataTime.filter(item => item.isSelected);
                if(selectedTime && selectedTime.length > 0){
                    let result = [];
                    selectedTime.map(item => {
                        let obj = {};
                        obj.doctorId = selectedDoctor.value;
                        obj.date = new Date(currentDate).getTime();
                        obj.timeType = item.keyMap;
                        result.push(obj);
                    })
                    console.log('check result:', result);
                    let res = await saveBulkScheduleDoctor(result);
                    if(res && res.errCode === 0){
                        toast.success("Successfully saved schedule!");
                        let data = this.state.dataTime;
                        data.map(item => item.isSelected = false);
                        this.setState({
                            doctors: [],
                            dataTime: data,
                            selectedDoctor: '',
                            currentDate: ''
                        })
                    }else{
                        toast.error("Error when saving schedule!")
                    }
                }else{
                    toast.error("You must select at least one time!")
                }
            }
        }
    }

    render() {
        console.log('check state render:', this.state);
        let timeArr = this.state.dataTime;
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title'/>
                </div>
                <div className='m-s-content'>
                    <div className='row'>
                        <div className='col-6'>
                            <label className='mb-2'><FormattedMessage id='manage-schedule.choose-doctor'/></label>
                            {/* <input className='form-control'/> */}
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.doctors}
                            />
                        </div>
                        <div className='col-6'>
                            <label className='mb-2'><FormattedMessage id='manage-schedule.choose-date'/></label>
                            {/* <input type='' className='form-control'/> */}
                            <DataPicker className='form-control' minDate={new Date().getTime() - 86400000} value={this.state.currentDate} onChange={this.handleOnChangeDatePicker}/>
                        </div>
                        <div className='col-12 choose-time row'>
                            {timeArr && timeArr.length > 0 && timeArr.map((item, index) => {
                                return(
                                    <button key={index} onClick={() => this.handleClickTime(item)} 
                                        className={item.isSelected ? 'm-s-time-slot btn btn-info' : 'm-s-time-slot btn btn-secondary'} >
                                        {this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })
                            }
                        </div>
                        <button onClick={() => this.handleSaveSchedule()} className='add-schedule btn mx-auto mt-4'><FormattedMessage id='manage-schedule.save'/></button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        doctors: state.admin.doctors,
        dataTime: state.admin.dataTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(actions.fetchAllDoctorStart()),
        getAllTime: () => dispatch(actions.fetchAllcodeTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
