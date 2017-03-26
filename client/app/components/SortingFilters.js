import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from "react-redux";
import SearchCriteria from '../components/SearchCriteria'
import SideBarSearch from '../components/SideSearchBar'
import {initialSortingFiltersArray} from '../actions/SortingFiltersActions'
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  sortingFiltersArray: PropTypes.array
};
class SortingFilters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flags: {
				activeSortingFlags: {
					pricing: {
						isSelected: false,
						asc: undefined
					},
					distance: {
						isSelected: false,
						asc: undefined
					},
					newest: {
						isSelected: false,
						asc: undefined
					},
					enddate: {
						isSelected: false,
						asc: undefined
					}
				}
			}
		}
	}
	componentWillMount() {
		const {dispatch} = this.props;
		dispatch(initialSortingFiltersArray(['pricing', 'distance', 'newest', 'end date']));
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps.criteriaArray);
	}
	activeSortingFilter(item, e) {
		e.stopPropagation();
		var {flags} = this.state;
		var prop = item.split(' ').join('')
		for (var propName in flags.activeSortingFlags) {
			flags.activeSortingFlags[propName].isSelected = false;
			if(propName !== prop) {
				flags.activeSortingFlags[propName].asc = undefined;
			}
		}
		
		flags.activeSortingFlags[prop].isSelected = true;
		flags.activeSortingFlags[prop].asc = !flags.activeSortingFlags[prop].asc
		this.setState({flags: flags})
	}
	renderSortingSign(item) {
		if (typeof(this.state.flags.activeSortingFlags[item.split(' ').join('')].asc) === 'undefined') {
			return null
		} else if (this.state.flags.activeSortingFlags[item.split(' ').join('')].asc) {
			return <i className="fa fa-sort-asc fa-fw vertical-align-middle"></i>
		} else {
			return <i className="fa fa-sort-desc fa-fw vertical-align-top"></i>
		}
	}
	renderSortingFiltersList() {
		const {sortingFiltersArray} = this.props;
		return sortingFiltersArray.map((item, index) => {
			return  <li key={index} 
						className={this.state.flags.activeSortingFlags[item.split(' ').join('')].isSelected ? 'active' : ''} 
						onClick={this.activeSortingFilter.bind(this, item)}>
						<span className="no_selection">{item}</span>
						{this.renderSortingSign(item)}
					</li>
		})
	}
	render() {
		return (
				<div className="sort-panel">
					<ul>
						{this.renderSortingFiltersList()}
					</ul>
				</div>
		)
	}
} 
SortingFilters.propTypes = propTypes;
function mapStateToProps(state) {
	const {sortingFiltersArray} = state.sortingFilters;
	return {
		sortingFiltersArray
	}
}
export default connect(mapStateToProps)(SortingFilters);


