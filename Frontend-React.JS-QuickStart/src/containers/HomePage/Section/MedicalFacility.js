import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAllClinic } from '../../../services/userService';
import './MedicalFacility.scss';
import Slider from 'react-slick'
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
    constructor(props){
        super(props);
        this.state = {
            allClinics: []
        }
    }

    changeLanguage = (language) => {
    }

    async componentDidMount(){
        let res = await getAllClinic();
        console.log('check res:', res);
        if(res && res.errCode === 0){
            this.setState({allClinics: res.data})
        }
    }

    handleViewDetailClinic = (clinic) => {
        this.props.history.push(`/detail-clinic/${clinic.id}`);
    }

    render() {
        let {allClinics} = this.state;
        return (
            <div className='section'>
                <div className='section-content'>
                    <div className='section-header'>
                        <h2><b>Cơ sở y tế nổi bật</b></h2>
                        <button>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.setting}>
                            {allClinics && allClinics.length > 0 && allClinics.map((item, index) => {
                                return(
                                    <div onClick={() => this.handleViewDetailClinic(item)} className='section-body-ele'>
                                        <img className='img img-medical-faccility'/>
                                        <h4>{item.name}</h4>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
