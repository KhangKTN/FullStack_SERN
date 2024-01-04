import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/Section/HomeFooter'
import DoctorSchedule from '../Doctor/DoctorSchedule';
import { getAllSpecialty } from '../../../services/userService';
import './SpecialtyDetail.scss';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorClinicInfo from '../Doctor/DoctorClinicInfo';
import { getSpecialtyById, getAllCodeService } from '../../../services/userService';
import ReactSelect from 'react-select';
import { LANGUAGES } from '../../../utils';
class SpecialtyDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            specialty: '',
            provinces: [],
            provinceSelected: 'ALL',
            arrDoctors: [],
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getSpecialtyById(id, 'ALL');
            if(res && res.errCode === 0){
                this.setState({
                    specialty: res.data,
                    arrDoctors: res.doctors
                })
            }
        }
        let provinces = await getAllCodeService('PROVINCE');
        if(provinces && provinces.errCode === 0){
            this.setState({provinces: provinces.data});
        }
        
    }

    async componentDidUpdate(prevProps, prevState){

    }

    handleOnchange = async(event) => {
        // this.setState({provinceSelected: event.target.value})
        let id = this.props.match.params.id;
        let res = await getSpecialtyById(id, event.target.value);
        if(res && res.errCode === 0){
            this.setState({
                arrDoctors: res.doctors
            })
        }
    }

    render() {
        let {arrDoctors, specialty, provinces} = this.state;
        let {language} = this.props;
        console.log('check state:', this.state);
        return (
            <>
                <HomeHeader />
                <div className='specialty-detail-container'>
                    <h3 className='specialty-name text-uppercase text-info bg-light pt-3'>KHOA: {specialty.name}</h3>
                    <div className='specialty-detail-desc bg-light mx-auto py-4' dangerouslySetInnerHTML={{__html: specialty.descriptionHTML}}></div>
                    <div className='list-doctor bg-white'>
                        <div className='col-md-3 col-sm-6 col-12 my-4'>
                            <select className='form-select' onChange={this.handleOnchange}>
                                <option value="ALL">Toàn quốc</option>
                                {provinces && provinces.length > 0 && provinces.map((item, index) => {
                                    return <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                })}
                            </select>
                        </div>
                        {arrDoctors && arrDoctors.length === 0 && 
                            <div style={{minHeight: '250px'}} className=''>
                                <h4 className='text-center'>Không tìm thấy bác sĩ nào phù hợp!</h4>
                            </div>
                        }
                        {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                            return(
                                <div key={index} className='doctor-container shadow'>
                                    <div className='doctor-info'>
                                        <ProfileDoctor doctorId={item.doctorId}/>
                                    </div>
                                    <div className='schedule-info'>
                                        <DoctorSchedule doctorId={item}/>
                                        <DoctorClinicInfo doctorId={item}/>
                                    </div>
                                </div>
                            )})
                        }
                    </div>
                </div>
                <HomeFooter />
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);

