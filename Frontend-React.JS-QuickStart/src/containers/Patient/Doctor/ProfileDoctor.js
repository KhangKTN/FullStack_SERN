import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import {getDoctorProfile} from '../../../services/userService'
import moment from 'moment';
import localization from 'moment/locale/vi';
import './ProfileDoctor.scss'
class ProfileDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            detailDoctor: ''
        }
    }

    async componentDidMount(){
        let doctorId = this.props.doctorId;
        console.log('run did mount:', this.props.doctorId);
        this.setProfileDoctor(doctorId);
    }

    async componentDidUpdate(prevProps, prevState) {
        if(this.props.doctorId !== prevProps.doctorId){
            this.setProfileDoctor(this.props.doctorId);
        }
    }

    setProfileDoctor = async(doctorId) => {
        if(doctorId){
            let detailDoctor = await getDoctorProfile(doctorId);
            this.setState({detailDoctor: detailDoctor.data}); 
        }
    }

    render() {
        let {detailDoctor} = this.state;
        let {language, selectedTime} = this.props;
        let name = ''
        if(detailDoctor && detailDoctor.positionData){
            name = this.props.language === LANGUAGES.VI ? `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}` :
            `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <div className='intro-doctor d-flex align-items-center justify-content-center'>
                <div className='content-left'>
                    <div className='img m-auto' style={{ backgroundImage: detailDoctor ? `url(${detailDoctor.image})` : ''}}></div>
                </div>
                <div className='content-right mx-auto'>
                    <div className='doctor-name'>{name}</div>
                    <div className='info-doctor'>
                        {this.props.isShowDesc && detailDoctor.Doctor_Infor ? 
                            <div className='clinic-address text-sm-center text-md-start'>
                                <h4 className='text-secondary fw-bold text-uppercase fs-5'><FormattedMessage id='patient.doctor-clinic.address-clinic'/>:</h4>
                                <h5 className='fw-bold'>{detailDoctor.Doctor_Infor.Clinic.name}</h5>
                                <h5>{detailDoctor.Doctor_Infor.Clinic.address}</h5>
                            </div>
                            : 
                            <>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                <textarea className='w-100' typeof='text' readOnly>
                                    {detailDoctor.Markdown.description}
                                </textarea>
                                }
                            </>
                        }
                        
                    </div>
                    {selectedTime && selectedTime.timeData ?
                        <span className='badge rounded-pill bg-info fs-6 p-2'>
                            {language === LANGUAGES.VI ? selectedTime.timeData.valueVi + ' '
                            : selectedTime.timeData.valueEn + ' '}
                            ({language === LANGUAGES.VI ? moment(+selectedTime.date).format('dddd - DD/MM') 
                            : moment(+selectedTime.date).locale('en').format('ddd - MM/DD')})
                        </span> : ''
                    }
                    {this.props.isShowDesc && detailDoctor.Doctor_Infor ?
                        <span className='mx-3 rounded-pill badge bg-info fs-6 p-2'>
                            <FormattedMessage id='patient.booking-modal.price'/>: {language === LANGUAGES.VI ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailDoctor.Doctor_Infor.priceData.valueVi) 
                            : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(detailDoctor.Doctor_Infor.priceData.valueEn)}
                        </span> 
                        : ''
                    } 
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);

