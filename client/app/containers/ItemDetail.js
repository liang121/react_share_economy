import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from "react-redux";
import { launchModal } from "../actions/ModalActions"
import { pushMessage } from "../actions/FeedbackMessageActions"
import CommentsForAnswersModal from '../components/CommentsForAnswersModal';
import AddAnswerModal from '../components/AddAnswerModal';
import FeedbackMessage from '../components/FeedbackMessage';
import axios from 'axios';
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  modalId: PropTypes.array
};
class ItemDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemDetail: {},
			questionAndAnswers: {},
			flags: {
				isShowBargainDetail: false,
				showSuccessFeedbackMessage: false
			},
			showAnswers: [],
			selectedComment: {
				question: {},
				answer: {}
			},
			selectedIndex: {
				questionIndex: null
			}
		}
	}
	componentWillMount() {
		axios({
			method: 'get',
			url: 'http://localhost:3000/api/itemDetail/1002431',
		}).then((response) => {
			var {itemDetail} = this.state;
			itemDetail = Object.assign({}, response.data)
			//console.log(itemDetail)
			this.setState({itemDetail: itemDetail});
		},(error) => {
			alert(error);
		});
		axios({
			method: 'get',
			url: 'http://localhost:3000/api/question/1002431',
		}).then((response) => {
			var {questionAndAnswers} = this.state;
			questionAndAnswers = Object.assign({}, response.data)
			console.log(questionAndAnswers);
			this.setState({questionAndAnswers: questionAndAnswers});
		},(error) => {
			alert(error);
		})
	}
	renderBargainDetail() {
		const {flags} = this.state;
		if (flags.isShowBargainDetail) {
			return <div>
                    <table className="table table-info table-hover font-size-13px margin-bottom-0px">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Trade Item</td>
                                <td>Create Date</td>
                                <td>Expire Date</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Link>Yinyu Niu</Link></td>
                                <td>Item Id:<a> 12051 </a>+ $86</td>
                                <td>06/27/2016</td>
                                <td>07/01/2016</td>
                            </tr>
                            <tr>
                                <td><Link>Rui Li</Link></td>
                                <td>Item Id:<a> 11655</a></td>
                                <td>05/27/2016</td>
                                <td>06/01/2016</td>
                            </tr>
                            <tr>
                                <td><Link>David</Link></td>
                                <td>Item Id:<a> 13789</a></td>
                                <td>05/27/2016</td>
                                <td>06/01/2016</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
		} else {
			return null;
		}
	}
	toggleBargainDetail() {
		var {flags} = this.state;
		flags.isShowBargainDetail = !flags.isShowBargainDetail;
		this.setState({flags:flags})
	}
	seeMoreAnswers(questionIndex) {
		const {showAnswers} = this.state;
		const {questionAndAnswers} = this.state;
		showAnswers[questionIndex].num += 3;
		var len = questionAndAnswers.questionContents[questionIndex].answers.length;
		if (showAnswers[questionIndex].num > len) {
			showAnswers[questionIndex].num = len;
		}
		this.setState({showAnswers: showAnswers});
	}
	collapseAllAnswers(questionIndex) {
		const {showAnswers} = this.state;
		showAnswers[questionIndex].start = 0;
		showAnswers[questionIndex].num = 1;
		this.setState({showAnswers: showAnswers});
	}
	openCommentsOrAnswerModal(modalId, question, answer, questionIndex) {
		const {dispatch} = this.props;
		var {selectedComment, selectedIndex} = this.state;
		selectedComment.question = question;
		selectedIndex.questionIndex = questionIndex;
		if (answer !== undefined) {
			selectedComment.answer = answer;
		}
		this.setState({selectedComment: selectedComment, selectedIndex: selectedIndex});
		dispatch(launchModal(modalId));
	}
	passAnswerToParent(answerFromChild) {
		var { questionAndAnswers, selectedIndex } = this.state;
		questionAndAnswers.questionContents[selectedIndex.questionIndex].answers.push(answerFromChild);
		this.setState({questionAndAnswers: questionAndAnswers});
		console.log(this.state.questionAndAnswers);
	}
	upVote(questionIndex) {
		var {questionAndAnswers} = this.state;
		var {flags} = this.state;
		flags.showSuccessFeedbackMessage = true;
		var questionContents = questionAndAnswers.questionContents;
		questionContents[questionIndex].voteNum++;
		this.setState({questionAndAnswers: questionAndAnswers, flags: flags});
	}
	downVote(questionIndex) {
		var {questionAndAnswers} = this.state;
		var questionContents = questionAndAnswers.questionContents;
		questionContents[questionIndex].voteNum--;
		this.setState({questionAndAnswers: questionAndAnswers});
	}
	renderFeedbackMessage() {
		return <FeedbackMessage/>
	}
	renderItemDetailDescriptions() {
		const {itemDetail} = this.state;
		if (itemDetail.descriptions) {
			return itemDetail.descriptions.map((description, index) => {
				return  <li className="text-align-justify" key={index}>
	                    	{description}
	                    </li>
			})
		}
		
	}
	renderQuestionsAndAnswers() {
		const {questionAndAnswers} = this.state;
		var {showAnswers} = this.state;
		var questionContents = questionAndAnswers.questionContents;
		if (questionContents) {
			return questionContents.map((question, questionIndex)=> {
				const answers = question.answers;
				showAnswers.push({start:0, num:1})
				var start = showAnswers[questionIndex].start;
				var end = showAnswers[questionIndex].start + showAnswers[questionIndex].num;
				var answerList = answers.slice(start, end).map((answer, answerIndex) => {
					return  <div className="col-10 animate-show float-right padding-bottom-10px" key={answerIndex}>
			    				<span>{answer.answerContent}</span><br/>
			    				<a className="font-size-13px color-light-red cursor-pointer" onClick={this.openCommentsOrAnswerModal.bind(this, 'commentModal', question, answer, questionIndex)}>See The Comments on This Answer</a>
			    				<div className="float-right; font-size-13px">By <a>{answer.answerBy}</a> on May 26, 2015</div>
			    				<hr className="clear-both margin-top-20px"/>
			    			</div>
				})
				return  <div className="item-detail-Question-Answers col-12 padding-left-15px" key={questionIndex}>
							<hr/> 
					    	<h4>Customer Questions & Answers</h4>
					    	<br/>
					    	<div className="col-12 padding-bottom-20px margin-bottom-10px">
					    		<div className="col-1 vote-area">
						    		<i className="fa fa-lg fa-thumbs-o-up cursor-pointer" onClick={this.upVote.bind(this, questionIndex)}></i>
						    		<span className="display-block padding-top-10px padding-bottom-10px">{question.voteNum}</span>
						    		<i className="fa fa-lg fa-thumbs-o-down cursor-pointer" onClick={this.downVote.bind(this, questionIndex)}></i>
						    	</div>
						    	<div className="col-9 text-align-left padding-left-10px">
						    		<div>
							    		<div>
							    			<div className="col-2 font-weight-bold font-size-13px text-align-right">Question: </div>
							    			<div className="col-10 padding-left-15px"><span>{question.questionTitle}</span></div>
							    		</div>
						    			<br/><br/>
						    			<div>
							    			<div className="col-2 font-weight-bold clear-both font-size-13px text-align-right">Answer: </div>
							    			{answerList}
							    		</div>
							    		<div className="comment-button-area">
								    		<button className="btn btn-info btn-xs" onClick={this.seeMoreAnswers.bind(this, questionIndex)}>
								    			See More Answers <span className="badge">{answers.length-end}</span>
								    		</button>
						                    <button className="btn btn-info btn-xs" 
						                    		onClick={this.openCommentsOrAnswerModal.bind(this, 'addAnswerModal', question, undefined, questionIndex)}>
						                    		Add a Answer
						                    </button>
								    		<button className="btn btn-default btn-xs" onClick={this.collapseAllAnswers.bind(this, questionIndex)}>Collapse All</button>
						    			</div>
						    		</div>
						    	</div>
					    	</div>
						</div>
			})
		}
		
	}
	test() {
		const {dispatch} = this.props;
		dispatch(pushMessage('test message 1'))
	}
	render() {
		const {itemDetail} = this.state;
		return (
			<div className="margin-bottom-100px overflow-hidden">
				<FeedbackMessage/>
				<button onClick={this.test.bind(this)}>test</button>
				{this.state.flags.showSuccessFeedbackMessage ? <FeedbackMessage/> : null}
				<div className="col-12 item-detail-content">
			        <div className="progress col-3">
			            <img src={require('../../../server/public/picture/item_tv.jpg')} className="img-thumbnail width-100" />
			            <div className="progress-bar progress-bar-warning progress-bar-striped width-100">
			                Get Bidded
			            </div>
			        </div>
			        <div className="col-5 description-content">
			        	<div>Item Id: {itemDetail.itemId}</div>
			            <div>{itemDetail.itemTitle}</div>
			            <div className="publish-area">
			                by <Link>{itemDetail.sellerBy}</Link>
			            </div>
			            <div className="display-inline-block padding-left-20px">
			                <label>Answered Questions:</label> <a className="font-size-16px">{itemDetail.questionsNum} </a>
			            </div>
			            <div className="margin-top-10px">
			            	<hr className="margin-top-0px"/>
			            	<label>Collected By:</label> <a className="font-size-16px">{itemDetail.collectedNum} customers </a>
			                <br />
			                <label>Bargain With:</label> <a className="font-size-16px"></a>
			                <div className="display-inline-block" onClick={this.toggleBargainDetail.bind(this)}>
			                	<a>{this.state.flags.isShowBargainDetail ? <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-right"></i>} 
			                	 <span className="padding-left-5px">{itemDetail.bargainNum} customers</span></a>
			                </div>
			                {this.renderBargainDetail()}
			                <br/>
			                <label>Seller EST Price:</label> <span className="number">${itemDetail.sellerEstPrice} </span>
			                <br/>
			                <label>Brand New Item in Market:</label> <span>${itemDetail.newItemPrice} </span><a className="padding-left-10px" href="https://www.amazon.com/dp/B01BGC39JY/ref=s9_acss_bw_hsb_TVBBWK35_s3_n?pf_rd_m=ATVPDKIKX0DER&amp;pf_rd_s=merchandised-search-3&amp;pf_rd_r=YTR1AECWZFHENKVZHY8G&amp;pf_rd_t=101&amp;pf_rd_p=2596992402&amp;pf_rd_i=1266092011" target="_blank"> Check same item in amazon</a>
			                <br/>
			                <label>Items Description:</label>
			                <br/>
			                <panel className="col-12 font-size-13px">
			                    <ul className="padding-left-30px">
			                    	{this.renderItemDetailDescriptions()}
			                    </ul>
			                </panel>
			            </div>
			        </div>
				    <div className="col-3 margin-top-50px padding-left-30px add-button-area">
			            <button className="btn btn-ml btn-warning col-12 text-align-left margin-bottom-30px"><i className="fa fa-shopping-cart margin-right-10px"></i> Add the Item to Shopping Cart</button>
			            <button className="btn btn-ml btn-info col-12 text-align-left"><i className="fa fa-shopping-basket margin-right-10px"></i> Add the Item To Wish List</button>
			        </div>     
			    </div>
			    <hr/>
			    {this.renderQuestionsAndAnswers()}
			    <CommentsForAnswersModal question={this.state.selectedComment.question} answer={this.state.selectedComment.answer}/>
		    	<AddAnswerModal question={this.state.selectedComment.question} passAnswerToParent = {this.passAnswerToParent.bind(this)}/>
		    </div>
		)
	}
} 
ItemDetail.propTypes = propTypes;
function mapStateToProps(state) {
	const {modalId}= state.modals;
	return {
		modalId
	}
}
export default connect(mapStateToProps)(ItemDetail);