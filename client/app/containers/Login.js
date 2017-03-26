import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from "react-redux";
import { LoginRequest, ResetAuth} from "../actions/AuthedActions"
import { launchModal } from "../actions/ModalActions"
import RetriveModal from '../components/RetriveModal';
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  authedStatus: PropTypes.string,
  modalId: PropTypes.array,

};
const imgUrl = require('../../../server/public/picture/background-7.jpg')
const backgroundImg = {
	backgroundImage: 'url(' + imgUrl + ')'
}
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.createNewAcount = this.createNewAcount.bind(this);
		this.setUserName = this.setUserName.bind(this);
		this.setUserPassword = this.setUserPassword.bind(this);
		this.state = {
			isShowSuggestion: false,
			isLaunchRetriveModal: false,
			user: {
				userName: '',
				password: ''
			}
		};
		const {dispatch} = this.props;
		dispatch({type: 'USER_LOGOUT'})
		
	}
	componentWillReceiveProps(nextProps) {
		var authedStatus = nextProps.authedStatus;
		var dispatch = nextProps.dispatch;
		if (authedStatus === 'success' || authedStatus === undefined) {
			this.setState({isShowSuggestion: false});
			if (authedStatus === 'success') {
				browserHistory.push('/xchange');
			}
		} else {
			this.setState({isShowSuggestion: true})
		}

	}
	login(e) {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch(LoginRequest(this.state.user));
	}
	setUserName(e) {
		e.preventDefault();
		var user = this.state.user;
		user.userName = e.target.value
		this.setState({user: user});
	}
	setUserPassword(e) {
		e.preventDefault();
		var user = this.state.user;
		user.password = e.target.value
		this.setState({user: user})
	}
	createNewAcount(e) {
		browserHistory.push('/createAccount')
	}
	renderSuggestion() {
		return (
			this.state.isShowSuggestion ? <span className="suggestion">Username or password is not correct</span> : null
		)
	}
	openModal() {
		const {dispatch} = this.props;
		dispatch(launchModal('retrivePasswordModal'));
	}
	render() {
		const isShow = false;
		return (
			<div className="loginOrSigninPage" style={backgroundImg}>
				<div className="col-lg-5 div-center panel margin-bottom-30px">
			        <div className="panel-heading">
			            <span className="title"> Log In </span>
			        </div>
			        <div className="panel-body">
		                <input type="text" name="username" placeholder="Username..." 
		                    className="form-control" id="form-username" value={this.state.user.userName} 
		                    onChange={this.setUserName.bind(this)}/>
		                <div className="form-group margin-top-20px">
		                    <input type="password" name="password" placeholder="Password..." 
		                    className="form-control" id="form-password" value={this.state.user.password}
		                    onChange={this.setUserPassword}/>
		                </div>
		                <div><Link to="/xchange">Travel as a tourist...</Link>
		                </div>
		                <div>
		                	{this.renderSuggestion()}
		                    <br /><span>Forget the username/password? Click to <a onClick={this.openModal.bind(this)}>retrieve</a></span>
		                </div>
		                <button className="button btn btn-info col-lg-12 signin-button" onClick={()=>{this.login(event)}}>Log In </button>
		                <hr className="margin-0px"/>
		                <button className="button btn btn-warning col-lg-12 margin-top-5px" onClick={()=>{this.createNewAcount(event)}}>Create New Account </button>
			        </div>
		   		</div>
		   		
		   		<RetriveModal/>
			</div>
		)
	}
} 
Login.propTypes = propTypes;
function mapStateToProps(state) {
	const {authedStatus} = state.authed;
	const {modalId} = state.modals;
	return {
		authedStatus,
		modalId
	}
}
export default connect(mapStateToProps)(Login);


