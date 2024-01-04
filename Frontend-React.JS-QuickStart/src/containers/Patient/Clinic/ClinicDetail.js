import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getClinicById } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/Section/HomeFooter'
import './ClinicDetail.scss';
class ClinicDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            clinic: ''
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getClinicById(id);
            if(res && res.errCode === 0){
                this.setState({
                    clinic: res.data
                })
            }
        }
    }

    render() {
        let {clinic} = this.state;
        let imageBase64 = clinic.image ? new Buffer(clinic.image, 'base64').toString('binary') : '';
        return (
            <>
                <HomeHeader />
                <div className='clinic-detail-container'>
                    <div className='clinic-bg'>
                        <div className='clinic-info rounded shadow top-100 start-50 translate-middle'>
                            <div style={{backgroundImage: `url(${imageBase64})`}} className='clinic-logo rounded'></div>
                            <div className='clinic-text'>
                                <h4 className='fs-1'>{clinic.name}</h4>
                                <h5>{clinic.address}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='clinic-content'>
                        <div className='clinic-intro p-3 bg-info my-4 rounded'>
                            BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                        </div>
                        <div className='clinic-content-html' dangerouslySetInnerHTML={{__html: clinic.descriptionHTML}}></div>
                    </div>
                </div>
                <HomeFooter />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicDetail);

