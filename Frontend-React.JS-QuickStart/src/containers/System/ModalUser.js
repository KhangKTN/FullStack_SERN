import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalUser.scss'
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = {
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

    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleShowHidePassword = () => {
        this.setState({isShowPassword: !this.state.isShowPassword});
    }

    handleOnChangeInput = (event, id) => {
        // console.log(event);
        // console.log(event.target.value);
        //console.log(key);
        // if(event.target.id === 'firstName') console.log(event.target.value);
        // if(key == 'lastName') console.log(event.target.value);
        // this.state.firstName = event.target.value;
        // this.setState({firstName: event.target.value}) ;
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        console.log(copyState);
        console.log(typeof(event.target.value));
        this.setState({...copyState}, () => {
            //console.log(this.state);
        });
        // console.log('Check state:', this.state);
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['firstName', 'lastName', 'email', 'password', 'address'];
        for(let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = async() => {
        if(this.checkValidateInput()){
            //Call api
            console.log('check props', this.props);
            let check = await this.props.createNewUser(this.state);
        }
    }


    render() {
        return (
            <Modal size='lg' className='container' isOpen={this.props.isOpen} toggle={() => this.toggle()} >
                <ModalHeader className='modal-title' toggle={() => this.toggle()}>Create a new user</ModalHeader>
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
                                <input onChange={(event) => this.handleOnChangeInput(event, 'email')} value={this.state.email} className="form-control" placeholder="Enter email"/>
                            </div>
                            <div className='form-group col'>
                                <label>Password</label>
                                <div className='input-password'>
                                    <input type={this.state.isShowPassword ? 'text' : 'password'} onChange={(event) => this.handleOnChangeInput(event, 'password')} value={this.state.password} className="form-control" placeholder="Enter password"/>
                                    <span onClick={() => {this.handleShowHidePassword()}}>
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
                                    <option value={'1'}>Male</option>
                                    <option value={'0'}>Female</option>
                                </select>
                            </div>
                            <div className='form-group col'>
                                <label>Role</label>
                                <select className='form-control'>
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
                        <Button onClick={() => this.handleAddNewUser()} color="primary" className='px-3'>
                            Create user
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

