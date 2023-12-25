import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { verifyBooking } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
class VerifyEmail extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            errCode: ''
        }
    }

    async componentDidMount() {
        if(this.props.location && this.props.location.search){
            const urlParams = new URLSearchParams(this.props.location.search);
            // console.log(urlParams.get('token'), urlParams.get('doctorId'));
            let res = await verifyBooking({
                token: urlParams.get('token'), 
                doctorId: urlParams.get('doctorId')
            });
            console.log('check res verifyEmail', res);
            if(res) this.setState({message: res.errMessage, errCode: res.errCode});
        }
    }

    render() {
        return (
            <>
                <HomeHeader />
                <div className='text-center py-4 mt-5 mx-auto shadow p-3 mb-5 bg-light rounded-3 border border-info border-2 w-75 bg-secondary'>
                    <h3>Thank you for making an appointment at <b>Bookingcare</b>!</h3>
                    {this.state.errCode === 0 ? 
                        <h3 className='my-4 badge bg-primary fs-3 text-wrap text-uppercase'>{this.state.message}</h3>
                        : <h3 className='my-4 badge bg-warning fs-3 text-wrap text-uppercase'>{this.state.message}</h3>
                    }
                    <h4 className='fst-italic'>Wishing you a peaceful day!</h4>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

