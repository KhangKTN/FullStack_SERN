import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './MedicalFacility.scss';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {

    changeLanguage = (language) => {
    }

    render() {
        return (
            <div className='section'>
                <div className='section-content'>
                    <div className='section-header'>
                        <h2><b>Cẩm nang</b></h2>
                        <button>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.setting}>
                            <div className='section-body-ele'>
                                <div className='img img-handbook'/>
                                <h4>Điều trị phục hồi chức năng cho bệnh nhân đột quỵ tại bệnh viện Hồng Ngọc</h4>
                            </div>
                            <div className='section-body-ele'>
                                <div className='img img-handbook'/>
                                <h4>Bệnh tiểu đường là gì? Nguyên nhân, dấu hiệu nhận biết và hướng điều trị</h4>
                            </div>
                            <div className='section-body-ele'>
                                <div className='img img-handbook'/>
                                <h4>Tiêu hoá</h4>
                            </div>
                            <div className='section-body-ele'>
                                <div className='img img-handbook'/>
                                <h4>Tiêm mạch</h4>
                            </div>
                            <div className='section-body-ele'> 
                                <div className='img img-handbook'/>
                                <h4>Tai mũi họng</h4>
                            </div>
                            <div className='section-body-ele'>
                                <div className='img img-handbook'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
