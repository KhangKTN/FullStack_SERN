import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './Section/HomeFooter';
import './HomePage.scss';

class HomePage extends Component {
    handleAfterChange = (index, dontAnimate) => {
        console.log('channel: ', index);
    }
    render() {
        let settings_1 = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            slickGoTo: this.handleAfterChange
        }
        let settings_2 = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        }
        return (
            <div>
                <HomeHeader />
                <Specialty setting = {settings_1}/>
                <MedicalFacility setting = {settings_1}/>
                <OutStandingDoctor setting = {settings_1}/>
                <HandBook setting = {settings_2}/>
                <About/>
                <HomeFooter/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
