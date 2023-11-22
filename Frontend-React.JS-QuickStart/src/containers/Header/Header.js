import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';

class Header extends Component {
    handleChangeLanguge = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { processLogout, language, userInfo} = this.props;
        console.log(userInfo);
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='languages'>
                    <span className='welcome'><FormattedMessage id='home-header.welcome'/>, {userInfo && userInfo.firstName ? userInfo.firstName : ''} !</span>
                    <span onClick={() => this.handleChangeLanguge(LANGUAGES.VI)} className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>VN</span>
                    <span onClick={() => this.handleChangeLanguge(LANGUAGES.EN)} className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Logout'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
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
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);