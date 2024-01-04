import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import {LANGUAGES} from '../../../utils'
import { Redirect } from 'react-router';
import './Specialty.scss';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            topDoctor: []
        }
    }

    changeLanguage = (language) => {
    }

    componentDidMount() {
        this.props.getTopDoctorRedux(10);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if(prevProps.topDoctorRedux !== this.props.topDoctorRedux){
            this.setState({
                topDoctor: this.props.topDoctorRedux
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        console.log('...check view information doctor:', doctor);
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    }

    render() {
        let topDoctor = this.state.topDoctor;
        console.log('Check doctor from state:', topDoctor);
        return (
            <div className='section'>
                <div className='section-content'>
                    <div className='section-header'>
                        <h2><b><FormattedMessage id="homepage.outstanding-doctor"/></b></h2>
                        <button><FormattedMessage id="homepage.more-infor"/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.setting}>
                            {topDoctor && topDoctor.length > 0 && topDoctor.map((item, index) => {
                                let nameDoctor = this.props.language === LANGUAGES.VI ? 
                                `${item.positionData.valueVi} - ${item.lastName} ${item.firstName}` :
                                `${item.positionData.valueEn} - ${item.firstName} ${item.lastName}`;
                                let imageBase64 = ''
                                if(item.image){
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    // console.log('Check imageBase64:', imageBase64);
                                }
                                return(
                                    <div className='section-body-ele'>
                                        <div className='element-border' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <img style={{backgroundImage: `url(${imageBase64})`}} className='img img-doctor'/>
                                            <h4>{nameDoctor}</h4>
                                            <h5>Sức khoẻ tâm thần - Tư vấn, trị liệu tâm lý</h5>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </Slider>
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
        topDoctorRedux: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctorRedux: () => dispatch(actions.fetchTopDoctorStart(10))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
