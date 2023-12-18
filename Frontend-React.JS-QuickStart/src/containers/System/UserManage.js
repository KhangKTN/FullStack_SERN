import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUser, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import './UserManage.scss'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
// import { forEach } from 'lodash';
class UserManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            userEdit: {},
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            message: '',
        }
    }

    async componentDidMount() {
        /* let response = await getAllUser('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        } */
        await this.getAllUsersFromReact();
    }

    handleAddNewUser = () => {
        this.setState({isOpenModalUser: true})
    }

    toggleUserModal = () => {
        this.setState({isOpenModalUser:  !this.state.isOpenModalUser});
    }

    toggleUserEditModal = () => {
        this.setState({isOpenModalEditUser: !this.state.isOpenModalEditUser});
    }

    getAllUsersFromReact = async() => {
        let response = await getAllUser('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        }
    }

    createNewUser = async(data) => {
        try {
            let response = await createNewUserService(data);
            console.log(response);
            if(response.errCode === 0){
                this.toggleUserModal();
                this.getAllUsersFromReact();
                this.setState({message: ''})
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
                //return true;
            }else{
                this.setState({message: response.message});
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async(user) => {
        try {
            let res = await deleteUserService(user.id);
            if(res && res.errCode === 0){
                this.getAllUsersFromReact();
            }else{
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        });
    }

    doEditUser = async(user) => {
        console.log('Click save user: ', user);
        try {
            let res = await editUserService(user);
            console.log('message', res.message);
            if(res && res.errCode === 0){
                this.getAllUsersFromReact();
                this.toggleUserEditModal();
            }else {
                alert('Edit fail: ' + res.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div id='user-manager' className='users-container container-fluid'>
                <div className="title text-center">Manage Users</div>
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                    message = {this.state.message}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen = {this.state.isOpenModalEditUser}
                        toggleFromParent = {this.toggleUserEditModal}
                        currentUser = {this.state.userEdit}
                        editUser = {this.doEditUser}
                    />
                }
                <table className='styled-table'>
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUsers && arrUsers.map((item, index) => {
                            return(
                                <tr className='active-row' key={index}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.gender === 1 ? 'Male' : 'Female'}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>
                                        <button onClick={() => this.handleEditUser(item)} className='button'><i className="fas fa-edit"></i> Edit</button>
                                        <button onClick={() => this.handleDeleteUser(item)} className='button del'><i className="fas fa-trash-alt"></i> Delete </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='add'>
                    <button onClick={() => this.handleAddNewUser()} className='button-add'><i className="fas fa-plus"></i> Add new user</button>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
