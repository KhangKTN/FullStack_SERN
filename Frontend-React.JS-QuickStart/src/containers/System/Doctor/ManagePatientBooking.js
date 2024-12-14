import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {getPatientBooking, sendPrescription} from '../../../services/userService';
import './ManagePatientBooking.scss';
import { CommonUtils, LANGUAGES } from '../../../utils';
import { toast } from 'react-toastify';
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    color: "#36d7b7"
  };
class ManagePatientBooking extends Component {
    constructor(props){
        super(props);
        this.state = {
            dateSelected: new Date(),
            listPatient: [],
            patientEmail: '',
            image: '', 
            isOpen: false,
            loading: false
        }
    }

    async componentDidMount() {
        this.setListPatient(this.state.dateSelected);
        // console.log(new Date(new Date().getTime() + 3600000*7).toISOString());
    }

    onChangeDate = async(event) => {
        this.setListPatient(event.target.value);
        // console.log(new Date(event.target.value).toUTCString());
    }

    setListPatient = async(date) => {
        let day = new Date(date).toDateString();
        let res = await getPatientBooking(this.props.user.id, new Date(day).getTime());
        if(res && res.listPatient){
            this.setState({
                dateSelected: date,
                listPatient: res.listPatient,
                image: ''
            });
        }
    }

    handleConfirm = (item) => {
        this.toggle();
        let {language} = this.props;
        this.setState({
            id: item.id,
            time: language === LANGUAGES.VI ? item.Allcode.valueVi : item.Allcode.valueEn,
            patientEmail: item.User.email,
            patientName: language === LANGUAGES.VI ? `${item.User.lastName} ${item.User.firstName}` : `${item.User.firstName} ${item.User.lastName}`
        })
        console.log('Click confirm:', item);
    }

    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState(copyState);
    }

    handleOnChangeImage = async(event) => {
        let files = event.target.files;
        console.log(files[0].name);
        if(files[0]){
            let base64 = await CommonUtils.getBase64(files[0]);
            this.setState({
                image: base64,
                imageName: files[0].name
            });
        }
    }

    toggle = () => {
        if(!this.state.loading) this.setState({isOpen: !this.state.isOpen});
    }

    handelSend = async() => {
        this.setState({loading: !this.state.loading})
        let res = await sendPrescription({
            email: this.state.patientEmail,
            patientName: this.state.patientName,
            doctorName: `${this.props.user.lastName} ${this.props.user.firstName}`,
            date: new Date(this.state.dateSelected).toLocaleDateString(),
            time: this.state.time,
            id: this.state.id,
            image: this.state.image,
            imageName: this.state.imageName
        })
        if(res && res.errCode === 0){
            this.setListPatient(this.state.dateSelected);
            toast.success(res.errMessage);
        }
        this.setState({loading: !this.state.loading})
        this.toggle();
    }

    render() {
        let {listPatient, loading} = this.state;
        let {language} = this.props;
        return (
            <div className='manage-booking-container container'>
                <div className='patient-booking-title my-5'>
                    <FormattedMessage id='manage-patient.title'/>
                </div>
                <div className='manage-patient-body'>
                    <div className='col-md-4 col-12'>
                        <label className='form-label'><FormattedMessage id='manage-patient.date'/>:</label>
                        <input type='date' defaultValue={new Date().toISOString().slice(0, 10)} className='form-control' onChange={this.onChangeDate}></input>
                    </div>
                    <div className='table-responsive'>
                        <table class="table table-striped table-hover caption-top fs-5">
                            <caption className='fs-3'><FormattedMessage id='manage-patient.list-patient'/></caption>
                            <thead className='table-primary'>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"><FormattedMessage id='manage-patient.firstname'/></th>
                                    <th scope="col"><FormattedMessage id='manage-patient.lastname'/></th>
                                    <th scope="col">Email</th>
                                    <th scope="col"><FormattedMessage id='manage-patient.phone'/></th>
                                    <th scope="col"><FormattedMessage id='manage-patient.time'/></th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listPatient && listPatient.length > 0 ?
                                    listPatient.map((item, index) => {
                                        return(
                                            <tr>
                                                <td scope="row">{index + 1}</td>
                                                <td>{item.User.lastName}</td>
                                                <td>{item.User.firstName}</td>
                                                <td>{item.User.email}</td>
                                                <td>{item.User.phoneNumber}</td>
                                                <td>{language === LANGUAGES.VI ? item.Allcode.valueVi : item.Allcode.valueEn}</td>
                                                <td>
                                                    <button className='btn btn-info' onClick={() => this.handleConfirm(item)}><FormattedMessage id='manage-patient.confirm'/></button>
                                                    {/* <button className='btn btn-warning ms-3' onClick={this.handleSendBill}><FormattedMessage id='manage-patient.send-bill'/></button> */}
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    (
                                        <tr>
                                            <td colSpan={7}><FormattedMessage id='manage-patient.no-data'/></td>
                                        </tr>
                                    )
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal size='lg' centered className='modal-user-container' isOpen={this.state.isOpen} toggle={this.toggle} >
                    {/* <ModalHeader  toggle={() => this.toggle()}>Create a new user
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </ModalHeader> */}
                    <div toggle={() => this.toggle()} class="modal-header">
                        <h5 class="modal-title fs-4 tw-bolder"><FormattedMessage id='manage-patient.modal-title'/></h5>
                        <button disabled={loading} onClick={() => this.toggle()} type="button" class="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <ModalBody>
                        <div className=''>
                            <div className='row'>
                                <div className='form-group col'>
                                    <label className='form-label'><FormattedMessage id='patient.booking-modal.fullname'/>:</label>
                                    <input onChange={(event) => this.handleOnChangeInput(event, 'fullName')} value={this.state.patientName} className="form-control form-control-lg" placeholder='Enter name'/>
                                </div>
                                <div className='form-group col'>
                                    <label className='form-label'><FormattedMessage id='patient.booking-modal.phone'/>:</label>
                                    <input onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} value={this.state.phoneNumber} className="form-control form-control-lg" placeholder="Enter phone number"/>
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className='form-group col'>
                                    <label className='form-label'>Email:</label>
                                    <input onChange={(event) => this.handleOnChangeInput(event, 'email')} value={this.state.patientEmail} className="form-control form-control-lg" placeholder="Enter email"/>
                                </div>
                                <div className='col'>
                                    <label className='form-label'><FormattedMessage id='manage-patient.modal-file'/>:</label>
                                    <input type='file' onChange={(event) => this.handleOnChangeImage(event)} className="form-control form-control-lg"/>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className='py-3 d-flex justify-content-end'>
                        {/* <div className='ml-0'><h5 className='text-danger'>{this.props.message}</h5></div> */}
                        <div>
                            <button disabled={loading} className="mx-3 btn btn-danger btn-lg" onClick={() => this.toggle()}>
                                <FormattedMessage id='patient.booking-modal.cancel'/>
                            </button>
                            <button disabled={loading} type="button" onClick={() => this.handelSend()} color="primary" className='btn btn-info btn-lg'>
                                <span hidden={!loading} class="spinner-border text-danger spinner-border-sm me-3" aria-hidden="true"></span>
                                <span className='m-auto' role="status">
                                    {loading ? <FormattedMessage id='manage-patient.sending-bill'/>
                                    :
                                    <FormattedMessage id='manage-patient.send-bill'/>
                                    }
                                </span>
                            </button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatientBooking);

