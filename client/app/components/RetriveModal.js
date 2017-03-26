import React, { Component, PropTypes } from 'react';
import { closeModal } from "../actions/ModalActions"
import { connect } from "react-redux";
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  modalId: PropTypes.array,
};
class RetriveModal extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			isLaunchRetriveModal: false,
			modal: {
				launchModal: false
			},
			formErrors: [],
			retrive: {
				countDown: 5,
				email: '',
				phone: '',
				option: 'EMAIL'
			},
			flags: {
				enableSubmit: true,
				enableResend: false,
				showFormErrors: false,
				showResendInfo: false
			},
			timeInterval: null
		}
	}
	componentWillReceiveProps(nextProps) {
		var modalId = nextProps.modalId;
		if (modalId.indexOf('retrivePasswordModal') === -1) {
			this.setState({isLaunchRetriveModal:false});
		} else {
			this.setState({isLaunchRetriveModal: true});
		}
	}
	quitModal(modalId) {
		const {dispatch} = this.props;
		dispatch(closeModal(modalId));
	}
	handleInputChange(propName, e) {
		var {retrive} = this.state;
		retrive[propName] = e.target.value;
		this.setState({retrive: retrive});
	}
	selectRetriveOption(option) {
		var {retrive} = this.state;
		retrive.option = option;
		if (option === 'EMAIL') {
			retrive.phone = '';
		} else {
			retrive.email = '';
		}
		this.setState({retrive: retrive});
	}
	startCountDown() {
		var {retrive} = this.state;
		var {timeInterval} = this.state;
		var {flags} = this.state;
		flags.enableResend = false;
		flags.enableSubmit = false;
		this.setState({flags:flags});

		clearInterval(timeInterval);
		retrive.countDown = 5;
		this.setState({retrive: retrive});
		timeInterval = setInterval(() => {
			this.setState({timeInterval: timeInterval});
			retrive.countDown--;
			this.setState({retrive: retrive});
			if (retrive.countDown === 0) {
				clearInterval(timeInterval);
				flags.enableResend = true;
				flags.enableSubmit = true;
				this.setState({flags: flags});
			}
		},1000)
	}
	submit() {
		var {flags} = this.state;
		if(flags.enableSubmit === false) {
			return;
		}
		if (this.formValidate()) {
			flags.enableSubmit = false;
			flags.enableResend = false;
			this.setState({flags:flags});
		}
	}
	formValidate() {
		var {retrive} = this.state;
		var {flags} = this.state;
		var {formErrors} = this.state;
		formErrors = [];
		var isValidate = true;
		if (retrive.email === '' && retrive.phone === '') {
			flags.showFormErrors = true;
			flags.showResendInfo = false;
			isValidate = false;
			formErrors.push('You must give a validate email address.')
		} else if (retrive.email !== '') {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    		if (!re.test(retrive.email)) {
    			flags.showFormErrors = true;
				flags.showResendInfo = false;
				isValidate = false;
				formErrors.push('email format is invalid');
    		} else {
			flags.showResendInfo = true;
			this.startCountDown();
		}
		} else if (retrive.phone !== '') {
			var re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
			if (!re.test(retrive.phone)) {
				flags.showFormErrors = true;
				flags.showResendInfo = false;
				isValidate = false;
				formErrors.push('number is an invalid US phone number');
			} else {
			flags.showResendInfo = true;
			isValidate = true;
			this.startCountDown();
		}
		} 
		this.setState({flags: flags});
		this.setState({formErrors: formErrors});
		return isValidate;
	}
	resendRetriveInfo() {
		var {flags} = this.state;
		if (flags.enableResend === false) {
			return;
		}
		this.startCountDown();
	}
	renderFormErrors() {
		var {flags} = this.state;
		var {formErrors} = this.state;
		if (flags.showFormErrors) {
			return formErrors.map((error, index) => {
				return  <div className="margin-top-30px alert alert-danger" key={index}>
							{error}
						</div>
			})
		} else {
			return null;
		}
	}
	renderRetriveInputField() {
		return (
			this.state.retrive.option === 'EMAIL' ? 
				<input type="text" name="email" placeholder="Email..." 
                className="form-control" value={this.state.retrive.email} 
                onChange={this.handleInputChange.bind(this, 'email')}/> :
                <input type="text" name="phone" placeholder="Phone..." 
                className="form-control" value={this.state.retrive.phone} 
                onChange={this.handleInputChange.bind(this, 'phone')}/>
		)
	}
	renderResendInfo() {
		var {flags} = this.state;
		if (flags.showResendInfo) {
			return  <div className="margin-top-30px alert alert-success">Reset email has already sent to 
						<span className="color-link-blue margin-left-5px">{this.state.retrive.email}</span>, 
						if you didn't receive it in <span className="color-link-blue">{this.state.retrive.countDown}</span> seconds, you can click 
						<button className={this.state.flags.enableResend ? "btn btn-info btn-xs margin-left-5px" : "btn btn-info btn-xs margin-left-5px disabled"} 
						onClick={this.resendRetriveInfo.bind(this)}>
							Resend
						</button>
					</div>
		} else {
			return null;
		}
	}
	render() {
		return (
			<div className={this.state.isLaunchRetriveModal ? 'lightbox-container launch-lightbox' : 'lightbox-container'}>
	   			<div className={this.state.isLaunchRetriveModal ? 'col-lg-4 right-lightbox launch-lightbox' : 'col-lg-4 right-lightbox'}>
	   				<div className="modal-header">
	   					<span className="modal-title"> Retrieve Username/Password </span>
	   					<span onClick={this.quitModal.bind(this, 'retrivePasswordModal')}><i className="fa fa-times fa-lg close-lightbox"></i></span>
	   				</div>
	   				<div className="modal-body">
	   					<span>Enter the email address or mobile phone number associated with your Amazon account.</span>
	   					<div id="retrive-option" className="margin-top-30px">
	   						<span onClick={this.selectRetriveOption.bind(this, 'EMAIL')} className={this.state.retrive.option === 'EMAIL' ? 'active option' : 'option'}>EMAIL</span>
	   						{/*<span onClick={this.selectRetriveOption.bind(this, 'PHONE')} className={this.state.retrive.option === 'PHONE' ? 'active margin-left-10px option' : 'margin-left-10px option'}>PHONE</span>*/}
	   						<div className="margin-top-10px overflow-hidden">
	   							 {this.renderRetriveInputField()}
		                    	<button className={this.state.flags.enableSubmit ? 'button btn btn-info col-12 margin-top-5px' : 'button btn btn-info col-12 margin-top-5px disabled'} onClick={this.submit.bind(this)}>Submit</button>
	   						</div>
	   						{this.renderFormErrors()}
	   						{this.renderResendInfo()}
	   					</div>
	   				</div>
	   			</div>
	   		</div>
		)
	}
}
RetriveModal.propTypes = propTypes;
function mapStateToProps(state) {
	const {modalId} = state.modals;
	return {
		modalId
	}
}
export default connect(mapStateToProps)(RetriveModal);