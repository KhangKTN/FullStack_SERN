import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userService';
// import './Specialty.scss';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

class Specialty extends Component {
    constructor(props){
        super(props);
        this.state = {
            allSpecialty: []
        }
    }

    changeLanguage = (language) => {
    }

    async componentDidMount(){
        let res = await getAllSpecialty();
        console.log('check res:', res);
        if(res && res.errCode === 0){
            this.setState({allSpecialty: res.data})
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`);
    }

    render() {
        let {allSpecialty} = this.state;
        let {language} = this.props;
        return (
            <div className='section'>
                <div className='section-content'>
                    <div className='section-header'>
                        <h2><b><FormattedMessage id='homepage.specialty-popular' /></b></h2>
                        <button><FormattedMessage id='homepage.more-infor' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.setting}>
                            {allSpecialty && allSpecialty.length > 0 && allSpecialty.map((item, index) => {
                                let imageBase64 = '';
                                if(item.image){
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                return(
                                    <div className='section-body-ele rounded-3' onClick={() => this.handleViewDetailSpecialty(item)}>
                                        <div style={{backgroundImage: `url(${imageBase64})`}} className='img img-specialty'/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
