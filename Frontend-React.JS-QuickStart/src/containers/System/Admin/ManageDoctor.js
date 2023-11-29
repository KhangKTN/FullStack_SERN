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

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
    constructor(props){
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            doctors: []
        }
    }

    componentDidMount(){
        this.props.getAllDoctorRedux();
    }

    buildDataInputSelect = (data) => {
        let dataSelect = [];
        if(data && data.length > 0){
            data.map((item, index) => {
                dataSelect.push({
                    value: item.id,
                    label: LANGUAGES.VI === this.props.language ? item.lastName + ' ' + item.firstName :  item.firstName + ' ' + item.lastName
                })
            })
        }
        return dataSelect;
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.doctors != this.props.doctors){
            let doctors = this.buildDataInputSelect(this.props.doctors);
            this.setState({doctors});
        }
        if(prevProps.language !== this.props.language){
            let doctors = this.buildDataInputSelect(this.props.doctors);
            this.setState({doctors});
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        });
    }

    handleSaveContentMarkdown = async() => {
        console.log('...check state:', this.state);
        let res = await this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            doctorId: this.state.selectedOption.value,
            description: this.state.description,
        })
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
        })
    }

    handleChange = async selectedOption => {
        let res = await getDetailInfoDoctor(selectedOption.value);
        console.log('check res:', res);
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            this.setState({
                selectedOption: selectedOption,
                contentHTML: res.data.Markdown.contentHTML,
                contentMarkdown: res.data.Markdown.contentMarkdown,
                description: res.data.Markdown.description
            });
        }else{
            this.setState({
                selectedOption: selectedOption,
                contentHTML: '',
                contentMarkdown: '',
                description: ''
            });
        }
    }

    handleOnChangeDes = (event) => {
        console.log('...check event Description:', event.target.value);
        this.setState({description: event.target.value})
    }


    render() {
        console.log('...check state:', this.state);
        return (
            <div className='manage-doctor-container'>
                <div id='' className='manage-doctor-title text-center'>
                    Tạo thông tin bác sĩ
                </div>
                <div className='more-info-doctor'>
                    <div className='info-left form-group'>
                        <label>Chọn bác sĩ:</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.doctors}
                            className='form-control'
                        />
                    </div>
                    <div className='info-right form-group'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea onChange={(event) => this.handleOnChangeDes(event)} value={this.state.description} className='form-control'></textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button className='save-content-doctor' onClick={() => this.handleSaveContentMarkdown()}>Save infomation</button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        doctors: state.admin.doctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(action.fetchAllDoctorStart()),
        saveDetailDoctor: (data) => dispatch(action.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
