import React, { Component, PropTypes } from 'react';
import { connect } from "react-redux";
import { CreateAccountRequest } from "../actions/AuthedActions";
import {Link} from "react-router";
import axios from 'axios';
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  createStatus: PropTypes.string,
};
const imgUrl = require('../../../server/public/picture/background-7.jpg')
const backgroundImg = {
	backgroundImage: 'url(' + imgUrl + ')'
}
var errorLists = [];
class CreateAccount extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flags: {
				isShowFormErrorSuggestion: false,
				isCreateSuccessfull: false,
				isSubmitted: false,
			},
			registerObj: {
				userName: '',
				password: '',
				email: '',
				retypePassword:''
			}
		};
		
	}
	createNewAccount(e) {
		e.preventDefault();
		var flags = this.state.flags;
		flags.isSubmitted = true;
		errorLists = [];
		flags.isShowFormErrorSuggestion = false;
		if(this.state.registerObj.userName === '' || this.state.registerObj.password === '' ||
			this.state.registerObj.email === '' || this.state.registerObj.retypePassword === '') {
			errorLists.push('All fields are required');
			flags.isShowFormErrorSuggestion = true;
		};
		if(this.state.registerObj.password !== this.state.registerObj.retypePassword) {
			errorLists.push('Please retype correct password');
			flags.isShowFormErrorSuggestion = true;
		}
		this.setState({flags:flags});
		if(!this.state.flags.isShowFormErrorSuggestion) {
			axios({
				method: 'POST',
				url: 'http://localhost:3000/api/registerAccount',
				data: {
		    		userName: this.state.registerObj.userName,
		    		password: this.state.registerObj.password,
		    		email: this.state.registerObj.email,
		    		role: 'user'
		        }
			}).then((response) => {
				var flags = this.state.flags;
				response.data === 'register successfully' ? flags.isCreateSuccessfull = true : flags.isCreateSuccessfull = false;
				this.setState({flags: flags});
			},(error) => {
				alert(error);
			})
		}
	}
	renderSuccessInfo() {
		return (
			this.state.flags.isCreateSuccessfull ? <div className="alert alert-success" role="alert">
			Register Successfully, <Link to={"/login"}>direct to sign in page ...</Link></div> : null
		)
	}
	handleInputChange(propName, e) {
		var regObj = this.state.registerObj;
		var flags = this.state.flags;
		regObj[propName] = e.target.value;
		flags.isCreateSuccessfull = false
		this.setState({
			registerObj: regObj,
			flags: flags
		});
	}
	render() {
		const isShow = false;
		return (
			<div className="loginOrSigninPage" style={backgroundImg}>
			    <div className="col-lg-5 div-center panel">
			    	<form>
				        <div className="panel-heading">
				            <span className="title"> Register Account </span>
				        </div>
				        <div className="panel-body">
			                <div className="form-group">
			                    <input type="text" name="regUserName" placeholder="Username..." className="form-control" id="form-username" 
			                    value={this.state.registerObj.userName} onChange={this.handleInputChange.bind(this, 'userName')} required />
			                </div>
			                <div className="form-group margin-top-20px">
			                    <input type="email" name="regEmail" placeholder="Email..." className="form-control" id="form-email" 
			                    value={this.state.registerObj.email} onChange={this.handleInputChange.bind(this, 'email')} required="" />
			                </div>
			                <div className="form-group margin-top-20px">
			                    <input type="password" name="regPassword" placeholder="Password..." className="form-control" id="form-password" 
			                    value={this.state.registerObj.password} onChange={this.handleInputChange.bind(this, 'password')} required="" />
			                </div>
			                <div className="form-group margin-top-20px">
			                    <input type="password" name="regRetypePassword" placeholder="Retype the Password..." className="form-control" id="form-retype-password"
			                     value={this.state.registerObj.retypePassword} onChange={this.handleInputChange.bind(this, 'retypePassword')} required="" />
			                </div>
			                {this.state.flags.isShowFormErrorSuggestion && this.state.flags.isSubmitted ? <FormErrorSuggestion errorLists= {errorLists}/> : null}
				            <button type="submit" className="button btn btn-info" onClick={this.createNewAccount.bind(this)}>Register Your Account</button>
				        </div>
				    </form>
			        <div className="panel-footer direct-to-login-text">
			            <span>Already have one? click to <Link className="color-link-blue" to={"/login"}>sign in...</Link></span>
			        </div>
			   		{this.renderSuccessInfo()}
			    </div>
			</div>
		)
	}
} 
class FormErrorSuggestion extends React.Component {
	renderLists() {
		return this.props.errorLists.map((list, index) => {
			return (<li key={index}>{list}</li>);
		})
	}
	render() {
		console.log(this.props.errorLists)
		return (
			<div className= "form-error-message">
		        <ul>
		            {this.renderLists()}
		        </ul>
		    </div>
		)
	}
}

CreateAccount.propTypes = propTypes;
function mapStateToProps(state) {
	const {createStatus} = state.authed;
	return {
		createStatus
	}
}
export default connect(mapStateToProps)(CreateAccount);


