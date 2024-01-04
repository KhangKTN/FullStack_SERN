import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import * as actions from '../../../../store/actions';
import './BookingModal.scss'
import { LANGUAGES } from '../../../../utils';
import moment from 'moment';
import {patientBooking} from '../../../../services/userService'
import { toast } from "react-toastify";
// import { emitter } from '../../utils/emitter';

class BookingModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
            genders: '',
            doctorId: ''
        }
        this.listenToEmitter();
    }

    listenToEmitter(){
        // emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
        //     this.setState({
        //     })
        // });
    }

    componentDidMount() {
        this.props.getGenders();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.genders !== this.props.genders){
            let arrGenders = this.props.genders;
            this.setState({
                genders: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if(prevProps.selectedScheduleData !== this.props.selectedScheduleData){
            this.setState({doctorId: this.props.selectedScheduleData.doctorId});
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState(copyState);
    }

    handleAddNewBooking = async() => {
        let {selectedScheduleData, language} = this.props;
        let firstName = selectedScheduleData.User.firstName;
        let lastName = selectedScheduleData.User.lastName;
        let name = language === LANGUAGES.VI ? lastName + ' ' + firstName : firstName + ' ' + lastName;
        let res = await patientBooking({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            birthday: this.state.birthday,
            gender: this.state.gender,
            doctorId: this.state.doctorId,
            date: selectedScheduleData.date,
            timeType: selectedScheduleData.timeType,
            doctorName: name,
            emailTime: language === LANGUAGES.VI ? selectedScheduleData.timeData.valueVi : selectedScheduleData.timeData.valueEn,
            emailDate: language === LANGUAGES.VI ? moment(+selectedScheduleData.date).format('dddd - DD/MM') 
            : moment(+selectedScheduleData.date).locale('en').format('ddd - MM/DD'),
            language
        })
        if(res.errCode === 0){
            toast.success(res.errMessage);
            this.setState({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
                gender: this.state.genders.length > 0 ? this.state.genders[0].keyMap : '',
                // genders: '',
                doctorId: ''
            })
        }else{
            toast.error(res.errMessage);
        }
        this.toggle();
    }


    render() {
        let {language, selectedScheduleData} = this.props;
        let {doctorId} = this.state;
        // console.clear();
        // console.log('check info from BookingModal:', selectedScheduleData);
        // console.log('check state from BookingModal:', this.state);
        return (
            <Modal size='lg' centered className='modal-user-container' isOpen={this.props.isOpen} toggle={() => this.toggle()} >
                {/* <ModalHeader  toggle={() => this.toggle()}>Create a new user
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </ModalHeader> */}
                <div toggle={() => this.toggle()} class="modal-header">
                    <h5 class="modal-title fs-4 tw-bolder"><FormattedMessage id='patient.booking-modal.title'/></h5>
                    <button onClick={() => this.toggle()} type="button" class="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <ModalBody>
                    <ProfileDoctor
                        doctorId = {doctorId}
                        isShowDesc = {true}
                        selectedTime = {selectedScheduleData}
                    />
                    <div className=''>
                        <div className='row'>
                            <div className='form-group col'>
                                <label><FormattedMessage id='patient.booking-modal.fullname'/>:</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'fullName')} value={this.state.firstName} className="form-control" placeholder='Enter name'/>
                            </div>
                            <div className='form-group col'>
                                <label><FormattedMessage id='patient.booking-modal.phone'/>:</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} value={this.state.phoneNumber} className="form-control" placeholder="Enter phone number"/>
                            </div>
                        </div>
                        <div className='row my-3'>
                            <div className='form-group col'>
                                <label>Email:</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'email')} value={this.state.email} className="form-control" placeholder="Enter email"/>
                            </div>
                            <div className='form-group col'>
                                <label><FormattedMessage id='patient.booking-modal.address'/>:</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'address')} value={this.state.address} className="form-control" placeholder="Enter address"/>
                            </div>
                        </div>
                        <div className='row my-3'>
                            <div className='form-group col'>
                                <label><FormattedMessage id='patient.booking-modal.reason'/>:</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'reason')} value={this.state.reason} className="form-control" placeholder="Enter reason examination"/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='form-group col'>
                                <label><FormattedMessage id='patient.booking-modal.bod'/>:</label>
                                <input type='date' onChange={(event) => this.handleOnChangeInput(event, 'birthday')} value={this.state.birthday} className="form-control"/>
                            </div>
                            <div className='form-group col'>
                                <label><FormattedMessage id='patient.booking-modal.sex'/>:</label>
                                <select className='form-select' onChange={(event) => this.handleOnChangeInput(event, 'gender')}>
                                    {this.state.genders && this.state.genders.length > 0 && this.state.genders.map((item, index) => {
                                        return(
                                            <option value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        
                    </div>
                </ModalBody>
                <ModalFooter className='py-3 d-flex justify-content-between'>
                    <div className='ml-0'><h5 className='text-danger'>{this.props.message}</h5></div>
                    <div>
                        <Button onClick={() => this.handleAddNewBooking()} color="primary" className='px-3'>
                            <FormattedMessage id='patient.booking-modal.confirm'/>
                        </Button>
                        <Button color="secondary" className="px-3 mx-3" onClick={() => this.toggle()}>
                            <FormattedMessage id='patient.booking-modal.cancel'/>
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

