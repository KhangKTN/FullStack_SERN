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
                <h5>&copy; 2021 Khang KTN Booking Care <br/>
                More information: please visit my Youtube channel &#8594;<a target='_blank' href='https://www.youtube.com/watch?v=boLfYN7_dMY'> Click here</a>
                </h5>
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
