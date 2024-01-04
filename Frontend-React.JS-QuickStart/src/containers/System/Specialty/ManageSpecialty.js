import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS,CommonUtils } from '../../../utils';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from "markdown-it"; 
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {createNewSpecialty, getAllSpecialty, getSpecialtyById} from '../../../services/userService'
import { Toast, toast } from 'react-toastify';
import './ManageSpecialty.scss';
import ReactSelect from 'react-select';

const mdParser = new MarkdownIt();
class ManageSpecialty extends Component {
    constructor(props){
        super(props);
        this.state = {
            previewImgUrl: '',
            isOpen: false,
            contentMarkdown: '',
            nameSpecialty: '',
            avatar: '',
            selectedSpecialty: ''
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if(res && res.errCode === 0){
            let specialties = [];
            res.data.map((item, index) => {
                specialties[index] = {
                    value: item.id,
                    label: item.name
                }
            })
            this.setState({specialties})
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        });
    }

    handleOnchangeImage = async event => {
        let data = event.target.files;
        let file = data[0];
        if(file && Math.round((file.size/1024/1024)) >= 3){
            toast.error(`File size currenly too large. Only allow file size < 3MiB`);
            return;
        }
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
        }
    }

    handleOnChangeInput = (event) => {
        this.setState({nameSpecialty: event.target.value})
    }

    openPreviewImage = () => {
        if(this.state.previewImgUrl === '') return
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleSaveSpecialty = async() => {
        console.log(this.state);
        let res = await createNewSpecialty({
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            nameSpecialty: this.state.nameSpecialty,
            avatar: this.state.avatar
        })
        if(res && res.errCode === 0){
            this.setState({
                previewImgUrl: '',
                isOpen: false,
                contentMarkdown: '',
                nameSpecialty: '',
                avatar: '',
                selectedSpecialty: ''
            })
            toast.success(res.errMessage);
        }
        else toast.error(res.errMessage);
    }

    handleChangeSelect = async(selectedOption) => {
        // let copyState = {...this.state};
        // copyState.selectedSpecialty = selectedOption;
        // this.setState(copyState);
        let res = await getSpecialtyById(selectedOption.value, 0);
        console.log('check res:', res);
        this.setState({
            selectedSpecialty: selectedOption,
            nameSpecialty: res.data.name, 
            contentMarkdown: res.data.descriptionMarkdown,
            contentHTML: res.data.descriptionHTML,
            previewImgUrl: new Buffer(res.data.image, 'base64').toString('binary'),
            avatar: new Buffer(res.data.image, 'base64').toString('binary')
        });
    }

    render() {
        console.log('check state: ', this.state);
        return (
            <div className='manage-specialty-container container'>
                <h4 className='specialty-title my-5'>Quản lý chuyên khoa</h4>
                <div className='specialty-info row mb-4 p-3'>
                    <div className='btn-action mb-5 d-flex justify-content-center'>
                        <button className='btn-save btn' onClick={() => this.handleSaveSpecialty()}><FormattedMessage id="admin.manage-doctor.save"/></button>
                    </div>
                    <div className='mb-4 mx-auto row'>
                        {/* <label className='form-label' for="inputGroupFile01">Upload Image</label> */}
                        <div className='preview-img-container col'>
                            <div className='col-12'>
                                <label className='form-label'>Ten chuyen khoa:</label>
                                <input className='form-control' type="text" value={this.state.nameSpecialty} onChange={this.handleOnChangeInput} />
                            </div>
                            <input id='previewImg' type='file' hidden onChange={(event) => this.handleOnchangeImage(event)}/>
                            <label className='label-upload col-3' htmlFor='previewImg'>Tải Ảnh <i className='fas fa-upload'></i></label>
                            <div style={{cursor: this.state.previewImgUrl ? 'pointer' : 'default', backgroundImage: `url(${this.state.previewImgUrl})`}} className='col-8 preview-image'
                            onClick={this.openPreviewImage}></div>
                        </div>
                        <div className='col'>
                            <ReactSelect
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeSelect}
                                options={this.state.specialties}
                            />
                        </div>
                    </div>
                    <label className='form-label'>Mô tả chuyên khoa:</label>
                    <MdEditor 
                        style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.contentMarkdown}
                    />
                </div>
                {this.state.isOpen && 
                    <LightBox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
                <div className='list-specialty'></div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

