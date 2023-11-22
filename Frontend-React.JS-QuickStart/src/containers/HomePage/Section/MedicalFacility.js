import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './MedicalFacility.scss';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {

    changeLanguage = (language) => {
    }

    render() {
        return (
            <div className='section'>
                <div className='section-content'>
                    <div className='section-header'>
                        <h2><b>Cơ sở y tế nổi bật</b></h2>
                        <button>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.setting}>
                            <div className='section-body-ele'>
                                <img className='img img-medical-faccility'/>
                                <h4>Cơ xương khớp</h4>
                            </div>
                            <div className='section-body-ele'>
                                <img className='img img-medical-faccility'/>
                                <h4>Thần kinh</h4>
                            </div>
                            <div className='section-body-ele'>
                                <img className='img img-medical-faccility'/>
                                <h4>Tiêu hoá</h4>
                            </div>
                            <div className='section-body-ele'>
                                <img className='img img-medical-faccility'/>
                                <h4>Tiêm mạch</h4>
                            </div>
                            <div className='section-body-ele'> 
                                <img className='img img-medical-faccility'/>
                                <h4>Tai mũi họng</h4>
                            </div>
                            <div className='section-body-ele'>
                                <img className='img img-medical-faccility'/>
                                <h4>Cột sống</h4>
                            </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
