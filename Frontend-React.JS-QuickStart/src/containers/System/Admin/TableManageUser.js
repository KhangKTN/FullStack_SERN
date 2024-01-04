import React, { Component, Fragment } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as action from "../../../store/actions";
import MarkdownIt from "markdown-it"; 
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}
class TableManageUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount(){
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.users !== this.props.users){
            this.setState({
                userRedux: this.props.users
            })
        }
    }

    handleDeleteUser(id){
        this.props.deleteUser(id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
        //this.props.setState({action : 'EDIT'})
    }

    

    render() {
        // console.log('check all user:', this.props.users);
        // console.log('check state:', this.state.userRedux);
        let arrUsers = this.state.userRedux;
        return (
            <Fragment>
            <div id='' className='users-container container-fluid'>
                <table className='styled-table'>
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Gender</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index} className='active-row'>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.roleId === 'R1' ? 'Admin' : item.roleId === 'R2' ? 'Doctor' : 'Patient' }</td>
                                    <td>{item.gender === 'M' ? 'Male' : 'Female'}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>
                                        <button onClick={() => this.handleEditUser(item)} className='button'><i className="fas fa-edit"></i></button>
                                        <button className='button del ms-2' onClick={() => this.handleDeleteUser(item.id)}><i className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
            {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(action.fetchAllUserStart()),
        deleteUser: (id) => dispatch(action.fetchDeleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
