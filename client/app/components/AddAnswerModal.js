import React, { Component, PropTypes } from 'react';
import { closeModal } from "../actions/ModalActions"
import { connect } from "react-redux";
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  modalId: PropTypes.array,
};
class AddAnswerModal extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			modal: {
				launchModal: false
			},
			flags: {
			},
			input: {
				newAnswer: ''
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		var modalId = nextProps.modalId;
		if (modalId.indexOf('addAnswerModal') === -1) {
			this.setState({isLaunchRetriveModal:false});
		} else {
			this.setState({isLaunchRetriveModal: true});
		}
	}
	quitModal(modalId) {
		const {dispatch} = this.props;
		dispatch(closeModal(modalId));
	}
	submitAnswer(answer) {
		var answerObj = {
			answerBy: 'liang121',
			comments: [],
			date: 'Feb 21, 2017',
			answerContent: this.state.input.newAnswer
		};
		this.props.passAnswerToParent(answerObj);
		this.quitModal('addAnswerModal');
	}
	handleInputChange(propName, e) {
		var {input} = this.state;
		input[propName] = e.target.value;
		this.setState({input: input});
		console.log(this.state.input.newAnswer);
	}
	render() {
		return (
			<div className={this.state.isLaunchRetriveModal ? 'lightbox-container launch-lightbox' : 'lightbox-container'}>
	   			<div className={this.state.isLaunchRetriveModal ? 'col-5 right-lightbox launch-lightbox' : 'col-5 right-lightbox'}>
	   				<div className="modal-header">
	   					<span onClick={this.quitModal.bind(this, 'addAnswerModal')}><i className="fa fa-times fa-lg close-lightbox"></i></span>
	   					<h4>Question: </h4>
	   					<span>{this.props.question.questionTitle}</span>
	   				</div>
	   				<div id="submitAnswer" className="modal-body">
	   					<textarea className="form-control" placeholder="add an answer..." onChange={this.handleInputChange.bind(this, 'newAnswer')}></textarea>
						<button className="btn btn-xm btn-info" onClick={this.submitAnswer.bind(this, 1)}>Submit</button>
	   				</div>
	   			</div>
	   		</div>
		)
	}
}
AddAnswerModal.propTypes = propTypes;
function mapStateToProps(state) {
	const {modalId} = state.modals;
	return {
		modalId
	}
}
export default connect(mapStateToProps)(AddAnswerModal);


