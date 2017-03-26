import React, { Component, PropTypes } from 'react';
import { closeModal } from "../actions/ModalActions"
import { connect } from "react-redux";
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  modalId: PropTypes.array,
};
class CommentsForAnswersModal extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			modal: {
				launchModal: false
			},
			flags: {
				replyOrAddComment: ''
			},
			answerComments: [],
			input: {
				newComment: ''
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		var modalId = nextProps.modalId;
		if (modalId.indexOf('commentModal') === -1) {
			this.setState({isLaunchRetriveModal:false});
		} else {
			this.setState({isLaunchRetriveModal: true});
		}
		if (nextProps.answer.comments) {
			var {answerComments} = this.state;
			answerComments = nextProps.answer.comments.slice(0, nextProps.answer.comments.length);
			this.setState({answerComments: answerComments})
		}
		console.log(nextProps);
	}
	quitModal(modalId) {
		const {dispatch} = this.props;
		dispatch(closeModal(modalId));
	}
	handleInputChange(propName, e) {
		var {input} = this.state;
		input[propName] = e.target.value;
		this.setState({input: input});
	}
	replyComment(comment) {
		const {flags} = this.state;
		flags.replyOrAddComment = 'reply';
		document.getElementById('commentInputField').scrollIntoView();
		this.setState({flags: flags});
	}
	addComment() {
		const {flags} = this.state;
		flags.replyOrAddComment = 'add';
		// var dom = document.getElementById('commentField');
		document.getElementById('commentInputField').scrollIntoView();
		this.setState({flags: flags});
	}
	submitComment() {
		var {answerComments ,input, flags} = this.state;
		flags.replyOrAddComment = '';
		answerComments.push({commentContent: input.newComment});
		input.newComment = '';
		this.setState({answerComments: answerComments, input: input, flags:flags});
	}
	cancelComment() {
		const {flags} = this.state;
		flags.replyOrAddComment = '';
		this.setState({flags: flags});
	}
	renderReplyOrAddComment() {
		const {flags} = this.state;
		if (flags.replyOrAddComment !== '') {
			return  <div id='commentField' className="float-left col-12">
						<input type="text" className="col-10 form-control float-left margin-bottom-20px" onChange={this.handleInputChange.bind(this, 'newComment')} placeholder={flags.replyOrAddComment + ' comment ...'}/>
						<div className="float-right">
							<button className=" button btn btn-xm btn-info" onClick={this.submitComment.bind(this)}>Submit</button>
							<button className="btn btn-xm btn-warning margin-left-10px" onClick={this.cancelComment.bind(this)}>Cancel</button>
						</div>
					</div>
		} else {
			return null;
		}
		
	}
	renderComments() {
		const {answer} = this.props;
		var {answerComments} = this.state
		if (answer.comments) {
			var commentList = answerComments;
			return commentList.map((comment, index) => {
				return <div className="clear-both" key={index}>
							<div className="padding-left-15px margin-top-20px">{comment.commentContent}
								<a>
									<i className="fa fa-pencil padding-left-10px cursor-pointer" onClick={this.replyComment.bind(this, comment)}></i>
								</a>
							</div>
							<div className="float-right padding-right-15px text-align-right">
								- <a>{comment.commentBy}</a><br/>
								<div className="margin-bottom-10px">{comment.date}</div>
							</div>
							<hr className="clear-both"/>
						</div>
			})
		}
		
	}
	render() {
		return (
			<div className={this.state.isLaunchRetriveModal ? 'lightbox-container launch-lightbox' : 'lightbox-container'}>
	   			<div className={this.state.isLaunchRetriveModal ? 'col-5 right-lightbox launch-lightbox' : 'col-5 right-lightbox'}>
	   				<div className="modal-header">
	   					<span onClick={this.quitModal.bind(this, 'commentModal')}><i className="fa fa-times fa-lg close-lightbox"></i></span>
	   					<h4>Title: </h4>
	   					<span>{this.props.question.questionTitle}</span>
	   				</div>
	   				<div className="modal-header">
	   					<h4>Answer: </h4>
	   					<span>{this.props.answer.answerContent}</span>
	   				</div>
	   				<div className="modal-body">
	   					<div className="clear-both margin-bottom-30px">
						<div className=" col-1 font-weight-bold font-size-14px">Comment:</div>
						<div className="col-11 float-right font-size-12px color-gray margin-top-15px">
								{this.renderComments()}
								<button className="btn btn-xs btn-info float-right" onClick={this.addComment.bind(this)}>Add a Comment</button>
							</div>
						</div>
						{this.renderReplyOrAddComment()}
						<hr id="commentInputField" className="col-12 margin-top-30px"/>
	   				</div>
	   			</div>
	   		</div>
		)
	}
}
CommentsForAnswersModal.propTypes = propTypes;
function mapStateToProps(state) {
	const {modalId} = state.modals;
	return {
		modalId
	}
}
export default connect(mapStateToProps)(CommentsForAnswersModal);