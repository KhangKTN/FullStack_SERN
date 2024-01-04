import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from "markdown-it"; 
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ReactSelect from 'react-select';
import { Toast, toast } from 'react-toastify';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { createNewClinic, getAllClinic, getClinicById } from '../../../services/userService';
import './ManageClinic.scss'

const mdParser = new MarkdownIt();

class Clinic extends Component {
    constructor(props){
        super(props);
        this.state = {
            previewImgUrl: '',
            isOpen: false,
            contentMarkdown: '',
            nameClinic: '',
            addressClinic: '',
            avatar: '',
            selectedClinic: ''
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if(res && res.errCode === 0){
            let clinics = [];
            res.data.map((item, index) => {
                clinics[index] = {
                    value: item.id,
                    label: item.name
                }
            })
            this.setState({clinics})
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
        let copyState = {...this.state};
        copyState[event.target.name] = event.target.value;
        this.setState(copyState);
    }

    openPreviewImage = () => {
        if(this.state.previewImgUrl === '') return
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleSaveClinic = async() => {
        let res = await createNewClinic({
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            avatar: this.state.avatar
        })
        if(res && res.errCode === 0){
            this.setState({
                previewImgUrl: '',
                isOpen: false,
                contentMarkdown: '',
                nameClinic: '',
                addressClinic: '',
                avatar: '',
                selectedClinic: ''
            })
            toast.success(res.errMessage);
        }
        else toast.error(res.errMessage);
    }

    handleChangeSelect = async(selectedOption) => {
        let res = await getClinicById(selectedOption.value);
        console.log('check res:', res);
        this.setState({
            selectedClinic: selectedOption,
            nameClinic: res.data.name, 
            addressClinic: res.data.address,
            contentMarkdown: res.data.descriptionMarkdown,
            contentHTML: res.data.descriptionHTML,
            previewImgUrl: new Buffer(res.data.image, 'base64').toString('binary'),
            avatar: new Buffer(res.data.image, 'base64').toString('binary')
        });
    }

    render() {
        console.log('check state:', this.state);
        return (
            <div className='manage-specialty-container container'>
                <h4 className='specialty-title my-5'>Quản lý phong kham</h4>
                <div className='specialty-info row mb-4 p-3'>
                    <div className='btn-action mb-5 d-flex justify-content-center'>
                        <button className='btn-save btn' onClick={() => this.handleSaveClinic()}><FormattedMessage id="admin.manage-doctor.save"/></button>
                    </div>
                    <div className='mb-4 mx-auto row'>
                        {/* <label className='form-label' for="inputGroupFile01">Upload Image</label> */}
                        <div className='preview-img-container col'>
                            <div className='col-12'>
                                <label className='form-label'>Ten phong kham:</label>
                                <input className='form-control' name='nameClinic' type="text" value={this.state.nameClinic} onChange={this.handleOnChangeInput} />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>Dia chi:</label>
                                <input className='form-control' name='addressClinic' type="text" value={this.state.addressClinic} onChange={this.handleOnChangeInput} />
                            </div>
                            <input id='previewImg' type='file' hidden onChange={(event) => this.handleOnchangeImage(event)}/>
                            <label className='label-upload col-3' htmlFor='previewImg'>Tải Ảnh <i className='fas fa-upload'></i></label>
                            <div style={{cursor: this.state.previewImgUrl ? 'pointer' : 'default', backgroundImage: `url(${this.state.previewImgUrl})`}} className='col-8 preview-image'
                            onClick={this.openPreviewImage}></div>
                        </div>
                        <div className='col'>
                            <ReactSelect
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeSelect}
                                options={this.state.clinics}
                            />
                        </div>
                    </div>
                    <label className='form-label'>Mô tả phong kham:</label>
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

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);

