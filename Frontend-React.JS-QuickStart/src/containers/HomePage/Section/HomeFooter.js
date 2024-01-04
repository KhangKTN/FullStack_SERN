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
            <div className='footer'>
                <div className='footer-content'>
                    <div className='footer-address'>
                        <h4 className='fw-bold'>Công ty Cổ phần Công nghệ BookingCare</h4>
                        <div className='subline'></div>
                        <h6>Công ty Cổ phần Công nghệ BookingCare</h6>
                        <h6>Công ty Cổ phần Công nghệ BookingCare</h6>
                        <h6>Công ty Cổ phần Công nghệ BookingCare</h6>
                    </div>
                    <div className='footer-about'>
                        {/* <img></img> */}
                        <h4 className='fw-bold'>Bookingcare</h4>
                        <div className='subline'></div>
                        <a href=''><h6>Tuyển dụng</h6></a>
                        <a href=''><h6>Chính sách bảo mật</h6></a>
                        <a href=''><h6>Quy chế hoạt động</h6></a>
                        <a href=''><h6>Liên hệ hợp tác</h6></a>
                        <a href=''><h6>Điều khoản sử dụng</h6></a>
                        <a href=''><h6>Câu hỏi thường gặp</h6></a>
                    </div>
                    <div className='footer-partner'>
                        <h4 className='fw-bold'>Đối tác bảo vệ nội dung</h4>
                        <div className='subline'></div>
                        <div className='partner'>
                            <img src="https://cdn.bookingcare.vn/fo/w128/2023/09/08/093706-hellodoctorlogo.png" alt="" />
                            <div className=''>
                                <h5 className='text-start'>Hello Doctor</h5>
                                <h6>Bảo trợ chuyên mục nội dung sức khoẻ tinh thần</h6>
                            </div>
                        </div>
                        <div className='partner'>
                            <img src="https://cdn.bookingcare.vn/fo/w128/2023/09/08/093706-hellodoctorlogo.png" alt="" />
                            <div className=''>
                                <h5 className='text-start'>Hello Doctor</h5>
                                <h6>Bảo trợ chuyên mục nội dung sức khoẻ tinh thần</h6>
                            </div>
                        </div>
                        <div className='partner'>
                            <img src="https://cdn.bookingcare.vn/fo/w128/2023/09/08/093706-hellodoctorlogo.png" alt="" />
                            <div className=''>
                                <h5 className='text-start'>Hello Doctor</h5>
                                <h6>Bảo trợ chuyên mục nội dung sức khoẻ tinh thần</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer-follow'>
                    <div>
                        <h4 className='text-uppercase fw-bold mb-3'>Theo dõi chúng tôi</h4>
                        <img src='https://pngimg.com/uploads/tiktok/tiktok_PNG1.png'></img>
                        <img className='mx-5' src='https://static-00.iconduck.com/assets.00/facebook-icon-512x512-seb542ju.png'></img>
                        <img className='me-5' src='https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png'></img>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052'></img>
                    </div>
                    <h5>&copy; 2021 Khang KTN Booking Care <br/>
                    More information: please visit my Youtube channel &#8594;<a target='_blank' href='https://www.youtube.com/watch?v=boLfYN7_dMY'> Click here</a>
                    </h5>
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
