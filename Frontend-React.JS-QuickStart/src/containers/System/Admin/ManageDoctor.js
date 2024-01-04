import React, { Component, Fragment } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as action from "../../../store/actions";
import {LANGUAGES} from '../../../utils';
import MarkdownIt from "markdown-it"; 
import MdEditor from 'react-markdown-editor-lite';
import { getDetailInfoDoctor } from '../../../services/userService';
import 'react-markdown-editor-lite/lib/index.css';
import "./ManageDoctor.scss"
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            doctors: [],
            //save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            note: ''
        }
    }

    componentDidMount(){
        this.props.getAllDoctorRedux();
        this.props.getAllRequiredDoctorRedux();
    }

    handleClearInput(){
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            selectedDoctor: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        })
    }

    buildDataAllcode = (data, type) => {
        let dataSelect = [];
        if(data && data.length > 0){
            data.map((item, index) => {
                let labelVi = '', labelEn = '';
                if(type === 'PRICE'){
                    labelVi = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.valueVi);
                    labelEn = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(item.valueEn);
                }else{
                    labelVi = type === 'USERS' ? item.lastName + ' ' + item.firstName : item.valueVi;
                    labelEn = type === 'USERS' ? item.firstName + ' ' + item.lastName : item.valueEn;
                }
                dataSelect.push({
                    value: type === 'USERS' ? item.id : item.keyMap,
                    label: LANGUAGES.VI === this.props.language ? labelVi : labelEn
                })
            })
        }
        return dataSelect;
    }

    buildDataClinicSpecialty = (data) => {
        let dataSelect = [];
        if(data && data.length > 0){
            data.map((item, index) => {
                dataSelect[index] = {label: item.name, value: item.id};
                // dataSelect.push({
                //     value: item.id,
                //     label: item.name
                // })
            })
        }
        return dataSelect;
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.doctors != this.props.doctors){
            let doctors = this.buildDataAllcode(this.props.doctors, 'USERS');
            this.setState({doctors});
        }
        if(prevProps.language !== this.props.language){
            let requiredData = this.props.requiredData;
            if(requiredData){
                this.setState({
                    doctors: this.buildDataAllcode(this.props.doctors, 'USERS'),
                    listPrice: this.buildDataAllcode(requiredData.prices, 'PRICE'),
                    listPayment: this.buildDataAllcode(requiredData.payments),
                    listProvince: this.buildDataAllcode(requiredData.provinces),
                    // selectedPrice: this.selectedPrice
                });
            }
        }
        if(prevProps.requiredData !== this.props.requiredData){
            let requiredData = this.props.requiredData;
            console.log('check requiredData:', requiredData);
            this.setState({
                listPrice: this.buildDataAllcode(requiredData.prices, 'PRICE'),
                listPayment: this.buildDataAllcode(requiredData.payments),
                listProvince: this.buildDataAllcode(requiredData.provinces),
                listSpecialty: this.buildDataClinicSpecialty(requiredData.specialties),
                listClinic: this.buildDataClinicSpecialty(requiredData.clinics),
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        });
    }

    handleSaveContentMarkdown = async() => {
        let res = await this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            doctorId: this.state.selectedDoctor.value,
            description: this.state.description,

            priceId: this.state.selectedPrice.value,
            paymentId: this.state.selectedPayment.value,
            provinceId: this.state.selectedProvince.value,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic.value,
            note: this.state.note
        })
        this.handleClearInput();
    }

    handleChange = async (selectedOption) => {
        let res = await getDetailInfoDoctor(selectedOption.value);
        console.log('check doctor detail:', res.data);
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            this.setState({
                selectedDoctor: selectedOption,
                contentHTML: res.data.Markdown.contentHTML,
                contentMarkdown: res.data.Markdown.contentMarkdown,
                description: res.data.Markdown.description,
            });
            let {language} = this.props;
            if(res.data.Doctor_Infor){
                this.setState({
                    selectedPrice: this.state.listPrice.find(item => {return item.value === res.data.Doctor_Infor.priceId}),
                    selectedPayment: this.state.listPayment.find(item => {return item.value === res.data.Doctor_Infor.paymentId}),
                    selectedProvince: this.state.listProvince.find(item => {return item.value === res.data.Doctor_Infor.provinceId}),
                    selectedSpecialty: this.state.listSpecialty.find(item => {return item.value === res.data.Doctor_Infor.specialtyId}),
                    selectedClinic: this.state.listClinic.find(item => {return item.value === res.data.Doctor_Infor.clinicId}),
                    note: res.data.Doctor_Infor.note
                })
            }
        }else{
            this.setState({
                selectedDoctor: selectedOption,
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',
                nameClinic: '',
                addressClinic: '',
                note: ''
            });
        }
    }

    handleChangeSelectInfo = (selectedOption, name) => {
        let copyState = {...this.state};
        copyState[name.name] = selectedOption;
        this.setState(copyState);
    }

    handleOnChangeDes = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState(copyState);
    }


    render() {
        console.log('...check state:', this.state);
        return (
            <>
            <div id='' className='manage-doctor-title text-center my-4'>
                <FormattedMessage id="admin.manage-doctor.title"/>
            </div>
            <div className='manage-doctor-container'>
                <div className='btn-action mb-3'>
                    <button className='btn-save-info-doctor btn' onClick={() => this.handleSaveContentMarkdown()}><FormattedMessage id="admin.manage-doctor.save"/></button>
                    <button className='btn-clear-info-doctor btn' onClick={() => this.handleClearInput()}><FormattedMessage id="admin.manage-doctor.clear"/></button>
                </div>
                <div className='more-info-doctor row'>
                    <div className='info-left col-md-4 col-sm-12'>
                        <label className='form-label'><FormattedMessage id="admin.manage-doctor.select-doctor"/>:</label>
                        <Select
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor"/>}
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.doctors}
                            className='mb-4'
                        />
                    </div>
                    <div className='info-right col-md-8 col-sm-12'>
                        <label className='form-label'><FormattedMessage id="admin.manage-doctor.intro"/>:</label>
                        <textarea onChange={(event) => this.handleOnChangeDes(event, 'description')} value={this.state.description} className='form-control mb-4'></textarea>
                    </div>
                </div>
                <div className='row mb-4'>
                    <div className='col-6 col-md-4'>
                        <label className='form-label'><FormattedMessage id="admin.manage-doctor.price"/>:</label>
                        <Select
                            placeholder={<FormattedMessage id="admin.manage-doctor.price"/>}
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectInfo}
                            options={this.state.listPrice}
                            name={"selectedPrice"}
                        />
                    </div>
                    <div className='col-6 col-md-4'>
                        <label className='form-label'><FormattedMessage id="admin.manage-doctor.payment"/>:</label>
                        <Select
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment"/>}
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectInfo}
                            options={this.state.listPayment}
                            name={"selectedPayment"}
                        />
                    </div>
                    <div className='col-6 col-md-4 mt-sm-3 mt-md-0'>
                        <label className='form-label'><FormattedMessage id="admin.manage-doctor.province"/>:</label>
                        <Select
                            placeholder={<FormattedMessage id="admin.manage-doctor.province"/>}
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectInfo}
                            options={this.state.listProvince}
                            name={"selectedProvince"}
                        />
                    </div>
                    <div className='col-6 col-md-4 mt-3'>
                        <label className='form-label'><FormattedMessage id='admin.manage-doctor.specialty' />:</label>
                        <Select
                            // placeholder={<FormattedMessage id="admin.manage-doctor.province"/>}
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectInfo}
                            options={this.state.listSpecialty}
                            name={"selectedSpecialty"}
                        />
                    </div>
                    <div className='col-6 col-md-4 mt-3'>
                    <label className='form-label'><FormattedMessage id="admin.manage-doctor.nameClinic"/>:</label>
                        <Select
                            placeholder={<FormattedMessage id="admin.manage-doctor.nameClinic"/>}
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectInfo}
                            options={this.state.listClinic}
                            name={"selectedClinic"}
                        />
                    </div>
                    <div className='col-6 col-md-4 mt-3'>
                        <label className='form-label'><FormattedMessage id="admin.manage-doctor.note"/>:</label>
                        <input type='text' value={this.state.note} className='form-control' onChange={(event) => this.handleOnChangeDes(event, 'note')}/>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.contentMarkdown}
                    />
                </div>
            </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        doctors: state.admin.doctors,
        language: state.app.language,
        requiredData: state.admin.requiredData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(action.fetchAllDoctorStart()),
        getAllRequiredDoctorRedux: () => dispatch(action.fetchAllRequiredDoctorStart()),
        saveDetailDoctor: (data) => dispatch(action.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
