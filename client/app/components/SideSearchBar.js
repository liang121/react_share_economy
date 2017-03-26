import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from "react-redux";
import { pushSearchCriteria } from '../actions/SearchCriteriaActions'
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  criteriaArray: PropTypes.array
};
class SideSearchBar extends React.Component {
	constructor(props) {
		super(props);
		var typeArray = []
		this.state = {
			flags: {
				isShowbrands: true,
				isShowdisplayTech: true,
				isShowscreenSize: true,
				isShowmaxResolution: true,
				isShowconditions: true
			},
			searchFilter: {
				brands: '',
				displayTech: '',
				screenSize: '',
				maxResolution: '',
				conditions: ''
			},
			filterLists: [
				[
					{
						value: 'LG',
						isSelected: false,
						type: 'Brands',
						propName: 'brands'
					},
					{
						value: 'RCA',
						isSelected: false,
						type: 'Brands',
						propName: 'brands'

					},
					{
						value: 'Panasonic',
						isSelected: false,
						type: 'Brands',
						propName: 'brands'

					},
					{
						value: 'Samsung',
						isSelected: false,
						type: 'Brands',
						propName: 'brands'

					},
					{
						value: 'SHARP',
						isSelected: false,
						type: 'Brands',
						propName: 'brands'

					},
					{
						value: 'Sony',
						isSelected: false,
						type: 'Brands',
						propName: 'brands'

					},
					{
						value: 'Toshiba',
						isSelected: false,
						type: 'Brands',
						propName: 'brands'

					},
				],
				[
					{
						value: 'CRT',
						isSelected: false,
						type: 'Display Tech',
						propName: 'displayTech'
					},
					{
						value: 'LCD',
						isSelected: false,
						type: 'Display Tech',
						propName: 'displayTech'
					},
					{
						value: 'LED',
						isSelected: false,
						type: 'Display Tech',
						propName: 'displayTech'
					},
					{
						value: 'OLED',
						isSelected: false,
						type: 'Display Tech',
						propName: 'displayTech'
					},
					{
						value: 'Plasma',
						isSelected: false,
						type: 'Display Tech',
						propName: 'displayTech'
					},
					{
						value: 'Rear-Projection',
						isSelected: false,
						type: 'Display Tech',
						propName: 'displayTech'
					},
				],
				[
					{
						value: '4320p',
						isSelected: false,
						type: 'Screen Size',
						propName: 'screenSize'
					},
					{
						value: '2160p',
						isSelected: false,
						type: 'Screen Size',
						propName: 'screenSize'
					},
					{
						value: '1080p',
						isSelected: false,
						type: 'Screen Size',
						propName: 'screenSize'
					},
					{
						value: '1080i',
						isSelected: false,
						type: 'Screen Size',
						propName: 'screenSize'
					},
					{
						value: '720p',
						isSelected: false,
						type: 'Screen Size',
						propName: 'screenSize'
					},
				],
				[
					{
						value: 'Less than 20"',
						isSelected: false,
						type: 'Max Resolution',
						propName: 'maxResolution'
					},
					{
						value: '20" - 29"',
						isSelected: false,
						type: 'Max Resolution',
						propName: 'maxResolution'
					},
					{
						value: '30" - 39"',
						isSelected: false,
						type: 'Max Resolution',
						propName: 'maxResolution'
					},
					{
						value: '40" - 49"',
						isSelected: false,
						type: 'Max Resolution',
						propName: 'maxResolution'
					},
					{
						value: '50" - 60"',
						isSelected: false,
						type: 'Max Resolution',
						propName: 'maxResolution'
					},
					{
						value: 'More than 60"',
						isSelected: false,
						type: 'Max Resolution',
						propName: 'maxResolution'
					},
				],
				[
					{
						value: 'Brand New',
						isSelected: false,
						type: 'Conditions',
						propName: 'conditions'
					},
					{
						value: 'Inbox New',
						isSelected: false,
						type: 'Conditions',
						propName: 'conditions'
					},
					{
						value: 'Almost New',
						isSelected: false,
						type: 'Conditions',
						propName: 'conditions'
					},
					{
						value: 'Good Condition',
						isSelected: false,
						type: 'Conditions',
						propName: 'conditions'
					},
				]
			],
			typeArray: []
		}
		for (var i=0; i<this.state.filterLists.length; i++) {
			typeArray.push(this.state.filterLists[i][0]['propName']);
		}
		this.state.typeArray = typeArray;
	}
	componentWillReceiveProps(nextProps) {
		const {criteriaArray} = nextProps;
		var {filterLists, flags, typeArray} = this.state;
		for (var prop in flags) {
			flags[prop] = true;
		}
		for (var i=0; i<criteriaArray.length; i++) {
			var criteria = criteriaArray[i];
			var index = typeArray.indexOf(criteria.type);
			for (var j=0; j<filterLists[index].length; j++) {
				if (filterLists[index][j].value === criteria.criteriaValue) {
					var temp = 'isShow'+criteria.type
					flags[temp] = false;
					break;
				}
				var temp = 'isShow'+criteria.type
				flags[temp] = true;
			}
		}
		console.log(flags);
		this.setState({flags: flags});
		//console.log(criteriaArray);

	}
	selectFilter(propName, filterValue, e) {
		console.log(propName, filterValue);
		var { flags, searchFilter } = this.state;
		const {dispatch} = this.props;
		flags['isShow'+propName] = false;
		searchFilter[propName] = filterValue;
		this.setState({flags: flags, searchFilter: searchFilter});
		dispatch(pushSearchCriteria({criteriaValue: filterValue, type: propName}));

	}
	renderLists() {
		var {filterLists} = this.state;
		return filterLists.map((list, listIndex) => {
			var listArray = list.map((item, itemIndex) => {
				return  <li key={itemIndex}>
							<input type="checkbox" onChange={this.selectFilter.bind(this, item.propName, item.value)}/><span> {item.value}</span>
						</li>
			})
			return  this.state.flags['isShow'+filterLists[listIndex][0]['propName']] 
				? <div key={listIndex}>
				  	<label>{list[0].type}: </label>
					<ul>
						{listArray}
					</ul>
					<hr/>
		      	  </div> : <div key={listIndex}>
		      				<label>{list[0].type}: </label>
							<ul>
								<li className="replace-search-criteria">{this.state.searchFilter[filterLists[listIndex][0]['propName']]}</li>
							</ul>
							<hr/>
						   </div>
		})
	}
	render() {
		return (
			<div className="col-2 side-search-bar">
				{this.renderLists()}
			</div>
		)
	}
} 
SideSearchBar.propTypes = propTypes;
function mapStateToProps(state) {
	const { criteriaArray } = state.searchCriteria;
	return {
		criteriaArray
	}
}
export default connect(mapStateToProps)(SideSearchBar);