import React, { Component, PropTypes } from 'react';
import { connect } from "react-redux";
import { clearMessage } from "../actions/FeedbackMessageActions"
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  messageContents: PropTypes.array
};
class FeedbackMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			flags: {
				showFeedbackMessageFlag: false
			},
			messageContents: []
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.messageContents.length !== 0) {
			var {messageContents, flags} = this.state;
			const {dispatch} = this.props;
			messageContents = nextProps.messageContents.slice(0, nextProps.messageContents.length);
			flags.showFeedbackMessageFlag = true;
			this.setState({messageContents, messageContents, flags: flags});
			setInterval(()=>{
				messageContents.pop();
				this.setState({messageContents: messageContents, flags: flags});
				if (messageContents.length === 0) {
					dispatch(clearMessage());
				}
			}, 1000);
		}
	}
	closeMessage() {
		var {flags} = this.state;
		const {dispatch} = this.props;
		flags.showFeedbackMessageFlag = false;
		dispatch(clearMessage());
		this.setState({flags: flags});
	}
	renderMessageContent() {
		const {messageContents} = this.props;
		return messageContents.map((message, index) => {
			return  <div key={index}>
					  <hr className="margin-top-20px margin-bottom-5px"/>
				      <div className="padding-left-5px">{message}</div>
					</div>
		})
	}
	render() {
		const {showFeedbackMessageFlag} = this.state.flags;
		return (
			<div className={showFeedbackMessageFlag ? 'message-container active' : 'message-container'}>
				<div id="SuccessDIV" className="success-message">
				     <span className="message-icon"><i className="fa fa-check-circle-o fa-lg" aria-hidden="true"></i></span>
				     <strong className="margin-left-10px">Success</strong>
				     <a className="color-white float-right" onClick={this.closeMessage.bind(this)}><i className="fa fa-times" aria-hidden="true"></i></a>
				     {this.renderMessageContent()}
				</div>
	   		</div>
		)
	}
}
FeedbackMessage.propTypes = propTypes;
function mapStateToProps(state) {
	const {messageContents} = state.feedbackMessage;
	return {
		messageContents
	}
}
export default connect(mapStateToProps)(FeedbackMessage);


