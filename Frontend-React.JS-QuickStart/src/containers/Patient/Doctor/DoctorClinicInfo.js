import React, { Component, useReducer } from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import { LANGUAGES } from '../../../utils';
import {getDoctorClinic} from '../../../services/userService'
import {FormattedMessage} from 'react-intl';
import './DoctorClinicInfo.scss'

class DoctorClinicInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            doctorId: '',
            isShow: false,
            doctorClinic: ''
        }
    }

    async componentDidMount(){
        this.loadDoctorClinic();
    }

    async componentDidUpdate(prevProps, prevState){
        if(prevProps.language !== this.props.language){
        }
        if(this.props.doctorId !== prevProps.doctorId){
            this.loadDoctorClinic();
        }
    }

    loadDoctorClinic = async() => {
        let doctorClinic = await getDoctorClinic(this.props.doctorId);
        if(doctorClinic && doctorClinic.errCode === 0){
            this.setState({doctorClinic: doctorClinic.data})
        }
    }


    handleOnChange = async(event) => {
    }

    handelShowHide = () => {
        this.setState({isShow: !this.state.isShow})
    }

    render() {
        let {doctorClinic} = this.state;
        let {language} = this.props;
        // console.clear();
        console.log('check state:', this.state);
        let price = '', currency = '';
        if(doctorClinic.priceData){
            price = language === LANGUAGES.VI ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(doctorClinic.priceData.valueVi)
            : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(doctorClinic.priceData.valueEn);
        }
        return(
            <div className='doctor-clinic-infor-container'>
                <div className='clinic-address text-sm-center text-md-start'>
                    <h4 className='text-secondary fw-bold text-uppercase fs-5'><FormattedMessage id='patient.doctor-clinic.address-clinic'/>:</h4>
                    <h5 className='fw-bold'>{doctorClinic ? doctorClinic.Clinic.name : ''}</h5>
                    <h5>{doctorClinic ? doctorClinic.Clinic.address : ''}</h5>
                </div>
                <div className='devide-line mx-sm-auto mx-md-0'></div>
                <div className='clinic-payment'>
                    <h4 className='text-secondary fw-bold text-uppercase fs-5'><FormattedMessage id='patient.doctor-clinic.price'/>: <span className='badge bg-warning text-dark fs-5'>{price}</span></h4>
                    <a className='fs-5' onClick={() => this.handelShowHide()}>{this.state.isShow ? <FormattedMessage id='patient.doctor-clinic.hide-detail'/> : <FormattedMessage id='patient.doctor-clinic.show-detail'/>}</a>
                </div>
                <div className='fst-italic fw-normal fs-6 text-secondary p-3' hidden={this.state.isShow ? false : true}>
                    <div className=''>{doctorClinic.note ? doctorClinic.note : ''}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorClinicInfo);