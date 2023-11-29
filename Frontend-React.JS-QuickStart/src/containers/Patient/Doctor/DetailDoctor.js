import React, { Component, useReducer } from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import { LANGUAGES } from '../../../utils';
import './DetailDoctor.scss'
import {getDetailInfoDoctor} from '../../../services/userService'

class DetailDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let detailDoctor = await getDetailInfoDoctor(id);
            if(detailDoctor && detailDoctor.errCode === 0){
                this.setState({
                    detailDoctor: detailDoctor.data
                })
            }
        }
    }

    componentDidUpdate(){

    }

    render() {
        let {detailDoctor} = this.state;
        console.log('check doctor:', detailDoctor);
        let name = ''
        if(detailDoctor && detailDoctor.positionData){
            name = this.props.language === LANGUAGES.VI ? `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}` :
            `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false}/>
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <div className='img' style={{backgroundImage: `url(${detailDoctor.image})`}}></div>
                        </div>

                        <div className='content-right'>
                            <div className='doctor-name'>{name}</div>
                            <div className='info-doctor'>
                                {detailDoctor.Markdown && detailDoctor.Markdown.description && 
                                    <textarea typeof='text' readOnly>
                                        {detailDoctor.Markdown.description}
                                    </textarea>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        Lich kham benh
                    </div>
                    <div className='detail-info'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML}}></div>
                        }
                    </div>
                    <div className='comment-doctor'></div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
