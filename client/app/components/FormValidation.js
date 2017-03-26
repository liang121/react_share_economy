import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
const propTypes = {
	errorsArray: PropTypes.array,
	isShowFormErrors: PropTypes.bool
}
class FormValidation extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			flags: {
				isShowFormErrors: false
			}
		}
	}
	focusOnErrorInput(propName) {
		document.getElementsByName(propName)[0].focus();
	}
	componentWillReceiveProps(nextProps) {
		var {flags} = this.state;
		if (nextProps.isShowFormErrors === true) {
			flags.isShowFormErrors = true;
		} else {
			flags.isShowFormErrors = false;
		}
		this.setState({flags: flags});
	}
	render() {
		if(this.state.flags.isShowFormErrors) {
			const {errorsArray} = this.props;
			var lists= errorsArray.map((item, index) => {
				var prop = Object.getOwnPropertyNames(item)[0];
				var value = item[prop];
				return <li key={index}><a onClick={this.focusOnErrorInput.bind(this, prop)}>{prop}</a>: {value}</li>
			})
			return  <div className='form-error-info'>
						<h5>Form Validation Errors</h5>
						<ul>
							{lists}
						</ul>
					</div>
		} else {
			return null
		}
		
	}
}
FormValidation.propTypes = propTypes;
function mapStateToProps(state) {
	const {errorsArray, isShowFormErrors} = state.formError;
	return {
		errorsArray,
		isShowFormErrors
	}
}
export default connect(mapStateToProps)(FormValidation);