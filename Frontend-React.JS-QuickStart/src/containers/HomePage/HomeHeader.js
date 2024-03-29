import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';

import './HomeHeader.scss';


class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        // console.log('...check props:', this.props);
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container h-auto'>
                <div className='home-header-content d-flex flex-column flex-sm-column flex-md-row '>
                    <div className='left-content'>
                        <i className="fas fa-bars"></i>
                        <div className='header-logo' onClick={() => this.props.history.push('/home')}></div>
                    </div>
                    <div className='center-content d-flex flex-column align-items-center flex-sm-column flex-md-row'>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.speciality"/></b></div>
                            <div className='subs-title'><FormattedMessage id="home-header.search-doctor"/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.health-facility"/></b></div>
                            <div className='subs-title'><FormattedMessage id="home-header.select-room"/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.doctor"/></b></div>
                            <div className='subs-title'><FormattedMessage id="home-header.select-doctor"/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.fee"/></b></div>
                            <div className='subs-title'><FormattedMessage id="home-header.check-health"/></div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'>
                            <div>
                            <i className="fas fa-question-circle"></i>
                            <b>  <FormattedMessage id="home-header.support"/></b>
                            </div>
                            <span>024-7301-2468</span>
                        </div>
                        
                        <div className='flag'>
                            <div onClick={() => this.changeLanguage(LANGUAGES.VI)} className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <div className='icon-vn'></div>
                                <span>VI</span>
                            </div>
                            <div onClick={() => this.changeLanguage(LANGUAGES.EN)} className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <div className='icon-en'></div>
                                <span>EN</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                </div>
                {this.props.isShowBanner && 
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="banner.title1"/> <br/><FormattedMessage id="banner.title2"/></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input className='search-input' type='text' placeholder="Tìm bác sĩ"/>
                        </div>
                        <div className='title2'>
                            <a href=''><div className='app app-ggplay'></div></a>
                            <a href=''><div className='app apple-store'/></a>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child icon-child-one'></div>
                                <div className='text-child'><FormattedMessage id="banner.child1"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child icon-child-two'></div>
                                <div className='text-child'><FormattedMessage id="banner.child2"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child icon-child-three'></div>
                                <div className='text-child'><FormattedMessage id="banner.child3"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child icon-child-four'></div>
                                <div className='text-child'><FormattedMessage id="banner.child4"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child icon-child-five'></div>
                                <div className='text-child'><FormattedMessage id="banner.child5"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child icon-child-six'></div>
                                <div className='text-child'><FormattedMessage id="banner.child6"/></div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
