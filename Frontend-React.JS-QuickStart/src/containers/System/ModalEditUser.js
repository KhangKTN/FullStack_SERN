import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalUser.scss'
import { emitter } from '../../utils/emitter';
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            gender: '1',
            isShowPassword: false,
        }
        this.listenToEmitter();
    }

    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                gender: '1',
                isShowPassword: false,
            })
        });
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: 'do_not_edit_password',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                gender: user.gender
            }, () => {})
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
        // console.log(this.props.currentUser);
    }

    handleShowHidePassword = () => {
        this.setState({isShowPassword: !this.state.isShowPassword});
    }

    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({...copyState}, () => {console.log(typeof(this.state.gender));});
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['firstName', 'lastName', 'email', 'address', 'phoneNumber'];
        for(let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = async() => {
        if(this.checkValidateInput()){
            //Call api
            // console.log('check props', this.props);
            let check = await this.props.editUser(this.state);
            // this.toggle();
        }
    }


    render() {
        return (
            <Modal size='lg' className='container' isOpen={this.props.isOpen} toggle={() => this.toggle()} >
                <ModalHeader className='modal-title' toggle={() => this.toggle()}>Edit user</ModalHeader>
                <ModalBody>
                    <div className=''>
                        <div className='row'>
                            <div className='form-group col'>
                                <label>First name</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'firstName')} value={this.state.firstName} className="form-control" placeholder="Enter first name"/>
                            </div>
                            <div className='form-group col'>
                                <label>Last name</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'lastName')} value={this.state.lastName} className="form-control" placeholder="Enter last name"/>
                            </div>
                        </div>
                        <div className='row my-3'>
                            <div className='form-group col'>
                                <label>Email</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'email')} value={this.state.email} className="form-control" placeholder="Enter email" readOnly/>
                            </div>
                            <div className='form-group col'>
                                <label>Password</label>
                                <div className='input-password'>
                                    <input type={this.state.isShowPassword ? 'text' : 'password'} onChange={(event) => this.handleOnChangeInput(event, 'password')} value={this.state.password} className="form-control" placeholder="Enter password" readOnly/>
                                    <span>
                                        <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='form-group col'>
                                <label>Address</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'address')} value={this.state.address} className="form-control" placeholder="Enter address"/>
                            </div>
                            <div className='form-group col'>
                                <label>Phone number</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} value={this.state.phoneNumber} className="form-control" placeholder="Enter phone number"/>
                            </div>
                            <div className='form-group col'>
                                <label>Gender</label>
                                <select className='form-control' onChange={(event) => this.handleOnChangeInput(event, 'gender')}>
                                    <option selected={this.state.gender === 1} value={1}>Male</option>
                                    <option selected={this.state.gender === 0} value={0}>Female</option>
                                </select>
                            </div>
                            <div className='form-group col'>
                                <label>Role</label>
                                <select className='form-control' disabled>
                                    <option>Admin</option>
                                    <option>Doctor</option>
                                    <option >Patient</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>
                </ModalBody>
                <ModalFooter className='py-3 d-flex justify-content-between'>
                    <div className='ml-0'><h5 className='text-danger'>{this.props.message}</h5></div>
                    <div>
                        <Button color="secondary" className="px-3 mx-3" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleSaveUser()} color="primary" className='px-3'>
                            Save User
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

