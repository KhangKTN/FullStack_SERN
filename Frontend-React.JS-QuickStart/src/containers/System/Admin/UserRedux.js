import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS,CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserRedux.scss'
import TableManageUser from './TableManageUser';
import { values } from 'lodash';

class UserRedux extends Component {
    constructor(props){
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,
            
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: ''
        }
    }

    async componentDidMount() {
        /* try {
            let res = await getAllCodeService('gender')
            console.log(res);
            let position = await getAllCodeService('position')
            let role = await getAllCodeService('role')
            if(res && res.errCode === 0 && position && position.errCode === 0 && role && role.errCode === 0){
                this.setState({
                    genderArr: res.data,
                    positionArr: position.data,
                    roleArr: role.data
                })
            }
        } catch (error) {
            console.log(error);
        } */
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
    }  

    componentDidUpdate(prevProps, prevState, snapshot){
        //Kiểm tra hiện tại và quá khứ
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap  : ''
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap  : ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap  : ''
            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            console.log(1);
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap  : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap  : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap  : '',
                avatar: '',
                previewImgUrl: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnchangeImage = async event => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            console.log('Check base64 image:', base64);
            const objectUrl = URL.createObjectURL(file);
            console.log('Check URL image:', objectUrl);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
            // console.log('Check file:', objectUrl);
        }
    }

    openPreviewImage = () => {
        if(this.state.previewImgUrl === '') return
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleSaveUser = () => {
        // console.log('submit check state: ', this.state);
        let {action} = this.state;
        let check = this.checkValidateInput();
        if(check && action === CRUD_ACTIONS.CREATE){
            this.props.createdNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                avatar: this.state.avatar,
                roleId: this.state.role,
                positionId: this.state.position
            })
            this.setState({
                ...this.state,
                // isUserCreated: false
            })
            setTimeout(() => {
                this.props.fetchUserRedux()
            }, 1000)
        }else if(check && action === CRUD_ACTIONS.EDIT){
            this.props.fetchEditUserRedux({
                // email: user.email,
                //password: '<<<<<<',
                id: this.state.password,
                firstName: this.state.firstName,
                lastName:  this.state.lastName,
                phoneNumber:  this.state.phoneNumber,
                address:  this.state.address,
                gender: this.state.gender,
                position: this.state.position,
                role: this.state.role,
                avatar: this.state.avatar,
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for(let i = 0; i < arrCheck.length; i++){
            if(this.state[arrCheck[i]] === ''){
                alert(`${arrCheck[i].toLocaleUpperCase()} is required!`);
                isValid = false;
                break;
            }
        }
        return isValid
    }

    onChangeInput = (event, id) => {
        console.log('check event:', event.target.value);
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
            console.log('Check imageBase64:', imageBase64);
        }
        this.setState({
            email: user.email,
            password: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId ? user.positionId : this.props.positionRedux[0].keyMap,
            role: user.roleId ? user.roleId : this.props.roleRedux[0].keyMap,
            avatar: imageBase64,
            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT
        }, () => {console.log('Check handle edit user from state:', this.state);})
        // console.log('Check data image blob:', user.image.data);
    }

    render() {
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let language = this.props.language
        let isLoadingGender = this.props.isLoadingGender
        let {email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar} = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    <div className="text-center" >User Redux</div>
                </div>
                <div>{isLoadingGender === true ? 'Loading Gender' : ''}</div>
                <div className='user-redux-body'>
                    <div className='mx-5 px-5 mt-5'>
                        <div className='row g-4 col-9 mx-auto'>
                            <div className='col-12 my-4 display-5 text-center'><FormattedMessage id='manage-user.add'/></div>
                            <div className='col-6 col-md-3 form-group'>
                                <label className="form-label"><FormattedMessage id='manage-user.email'/></label>
                                <input disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} className='form-control' type='email' value={email} onChange={(event) => this.onChangeInput(event, 'email')}/>
                            </div>
                            <div className='col-6 col-md-3'>
                                <label className="form-label"><FormattedMessage id='manage-user.password'/></label>
                                <input disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} className='form-control' type='password' value={password} onChange={(event) => this.onChangeInput(event, 'password')}/>
                            </div>
                            <div className='col-6 col-md-3'>
                                <label className="form-label"><FormattedMessage id='manage-user.first-name'/></label>
                                <input className='form-control' type='text' value={firstName} onChange={(event) => this.onChangeInput(event, 'firstName')}/>
                            </div>
                            <div className='col-6 col-md-3'>
                                <label className="form-label"><FormattedMessage id='manage-user.last-name'/></label>
                                <input className='form-control' type='text' value={lastName} onChange={(event) => this.onChangeInput(event, 'lastName')}/>
                            </div>
                            <div className='col-6 col-md-3 mt-2'>
                                <label className="form-label"><FormattedMessage id='manage-user.phone-number'/></label>
                                <input className='form-control' type='text' value={phoneNumber} onChange={(event) => this.onChangeInput(event, 'phoneNumber')}/>
                            </div>
                            <div className='col-6 col-md-6 mt-2'>
                                <label className="form-label"><FormattedMessage id='manage-user.address'/></label>
                                <input className='form-control' type='text' value={address} onChange={(event) => this.onChangeInput(event, 'address')}/>
                            </div>
                            <div className='col-4 col-md-3 mt-2'>
                                <label className="form-label"><FormattedMessage id='manage-user.gender'/></label>
                                <select value={gender} className='form-select' onChange={(event) => this.onChangeInput(event, 'gender')}>
                                    {genders && genders.length > 0 && 
                                        genders.map((item, index) => {
                                            return(
                                                <Fragment>
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-4 col-md-3 mt-2'>
                                <label className="form-label"><FormattedMessage id='manage-user.position'/></label>
                                <select value={position} className='form-select' onChange={(event) => this.onChangeInput(event, 'position')}>
                                    {positions && positions.length > 0 && 
                                        positions.map((item, index) => {
                                            return(
                                                <Fragment>
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-4 col-md-3 mt-2'>
                                <label className="form-label"><FormattedMessage id='manage-user.role'/></label>
                                <select value={role} className='form-select' onChange={(event) => this.onChangeInput(event, 'role')}>
                                    {roles && roles.length > 0 && 
                                        roles.map((item, index) => {
                                            return(
                                                <Fragment>
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-10 col-md-6 mt-2 mx-auto'>
                                <label className="form-label"><FormattedMessage id='manage-user.image'/></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden onChange={(event) => this.handleOnchangeImage(event)}/>
                                    <label className='label-upload col-3' htmlFor='previewImg'>Tải Ảnh <i className='fas fa-upload'></i></label>
                                    <div style={{backgroundImage: `url(${this.state.previewImgUrl})`}} className='col-8 preview-image'
                                    onClick={() => this.openPreviewImage()}></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-2 mx-auto mt-3'>
                            <button onClick={() => this.handleSaveUser()} className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn col-12 btn-warning btn-lg' : 'btn col-12 btn-primary btn-lg'} type="submit">
                                {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id='manage-user.edit'/> : <FormattedMessage id='manage-user.save'/>}
                            </button>
                        </div>
                        <div className='header-sub d-flex align-items-center justify-content-center'>
                            <div className='line col-3'></div>
                            <div className='text-primary'>USER LIST</div>
                            <div className='line col-3'></div>
                        </div>
                        <div className='col-md-12 table-user'>
                            <TableManageUser 
                                handleEditUserFromParent = {this.handleEditUserFromParent} 
                                action = {this.state.action}
                            />
                        </div>
                        {this.state.isOpen && 
                            <LightBox
                                mainSrc={this.state.previewImgUrl}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createdNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        fetchEditUserRedux: (data) => dispatch(actions.fetchEditUserStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
