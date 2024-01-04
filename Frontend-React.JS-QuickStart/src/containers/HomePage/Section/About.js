import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './MedicalFacility.scss';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class About extends Component {

    changeLanguage = (language) => {
    }

    render() {
        return (
            <div className='section-about'>
                <h3><b>Mạng xã hội nói gì về HueHospital</b></h3>
                <div className='section-content'>
                    <div style={{width: '50%'}} className='section-about-left ratio ratio-16x9'>
                        <iframe className='iframe' width="100%" height="350" src="https://www.youtube.com/embed/FyDQljKtWnI" 
                        title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen='1'>
                        </iframe>
                    </div>
                    <div className='section-about-right'>
                        <a href='https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html'>
                            <div className='test  border border border-info border-1'></div>
                        </a>
                        <a href='https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html'>
                            <div className='test border border border-info border-1'></div>
                        </a>
                        <a href='https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html'>
                            <div className='test border border border-info border-1'></div>
                        </a>
                        <a href='https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html'>
                            <div className='test border border border-info border-1'></div>
                        </a>
                        <a href='https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html'>
                            <div className='test border border border-info border-1'></div>
                        </a>
                        <a href='https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html'>
                            <div className='test border border border-info border-1'></div>
                        </a>
                        <a href='https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html'>
                            <div className='test border border border-info border-1'></div>
                        </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
