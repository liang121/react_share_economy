import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from "react-redux";
import { clearCriterias } from '../actions/SearchCriteriaActions'
import { deleteSearchCriteria } from '../actions/SearchCriteriaActions'
import SideBarSearch from '../components/SideSearchBar'
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  criteriaArray: PropTypes.array
};
class SearchCriteria extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps.criteriaArray);
	}
	renderCriterias() {
		var {criteriaArray} = this.props;
			return criteriaArray.map((criteria, index) => {
				return  <span className="padding-left-5px" key={index}>
							<span> {criteria.criteriaValue} </span>
							<a title="Clear Search Term">
								<i className="fa fa-window-close" onClick={this.deleteCriteria.bind(this, criteria.criteriaValue)}></i>
							</a>
						</span>
			})
	}
	clearAllCriteria() {
		const {dispatch} = this.props;
		dispatch(clearCriterias())
	}
	deleteCriteria(criteria) {
		const {dispatch} = this.props;
		dispatch(deleteSearchCriteria(criteria));
	}
	render() {
		return (
			<div>
				{this.props.criteriaArray.length !== 0 ? <div className="search-criteria">
					<label className="base-label">SEARCH FOR:</label>
					{this.renderCriterias()}
					<a className="padding-left-15px" onClick={this.clearAllCriteria.bind(this)}>Clear All</a>
				</div> : null}
			</div>
		)
	}
} 
SearchCriteria.propTypes = propTypes;
function mapStateToProps(state) {
	const { criteriaArray } = state.searchCriteria;
	return {
		criteriaArray
	}
}
export default connect(mapStateToProps)(SearchCriteria);


