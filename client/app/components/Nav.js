import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router";
import FormValidation from "./FormValidation"
import {pushFormError, resetFormErrors, displayOrHideErrors} from '../actions/FormErrorActions'
const propTypes = {
	authRole: PropTypes.string,
}
class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowAuthedNavLists: false,
			searchArea: {
				city: 'Denver',
				state: 'CO',
				itemCondition: 'Brand New',
				miles: '50',
				zip: '08536'
			},
			displaySearchArea: {},
			flags: {
				isDisplayLists: false,
				isShowSearchBox: false
			}
		}
	}
	componentWillMount() {
		var displaySearchArea = Object.assign({}, this.state.searchArea);
		this.setState({displaySearchArea: displaySearchArea});
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.authRole === 'user') {
			this.setState({isShowAuthedNavLists: true});
		}
	}
	toggleList() {
		var {flags} = this.state;
		flags.isDisplayLists = !flags.isDisplayLists;
		this.setState({flags: flags});
	}
	toggleSearchBox() {
		const {dispatch} = this.props;
		var {flags} = this.state;
		var {displaySearchArea, searchArea} = this.state;
		if (flags.isShowSearchBox) {
			dispatch(displayOrHideErrors(false));
		} else {
			searchArea = Object.assign({}, displaySearchArea);
		}
		flags.isShowSearchBox = !flags.isShowSearchBox;
		this.setState({flags:flags, searchArea: searchArea});
	}
	cancelEditSearchArea() {
		var {flags} = this.state;
		const {dispatch} = this.props;
		flags.isShowSearchBox = false;
		dispatch(displayOrHideErrors(false));
		this.setState({flags:flags});
	}
	handleSearchAreaChange(propsName, e) {
		var {searchArea} = this.state;
		searchArea[propsName] = e.target.value;
		this.setState({searchArea: searchArea});
	}
	formValidate() {
		const {dispatch} = this.props;
		const {searchArea} = this.state;
		dispatch(resetFormErrors());
		var isValidate = true;
		for(var prop in this.state.searchArea) {
			switch(prop) {
				case 'city':
					if (searchArea.city === '') {
						dispatch(pushFormError({city: 'filed is required'}));
						this.showFormErrors();
						isValidate = false;
					}
					break;
				case 'state':
					if (searchArea.state === '') {
						dispatch(pushFormError({state: 'filed is required'}));
						this.showFormErrors();
						isValidate = false;
					}
					break;
				case 'zip':
					if (searchArea.zip === '') {
						dispatch(pushFormError({zip: 'filed is required'}));
						this.showFormErrors();
						isValidate = false;
					}
					break;
				case 'miles':
					if (searchArea.miles === '') {
						dispatch(pushFormError({miles: 'filed is required'}));
						this.showFormErrors();
						isValidate = false;
					}
					break;
				case 'itemCondition':
					if (searchArea.itemCondition === '') {
						dispatch(pushFormError({itemCondition: 'filed is required'}));
						this.showFormErrors();
						isValidate = false;
					}
					break;
			}
		}
		return isValidate;

	}
	saveSearchArea() {
		if (this.formValidate()) {
			this.setState({displaySearchArea: Object.assign({}, this.state.searchArea)});
			this.cancelEditSearchArea()
		}
	}
	renderDropDownLists() {
		return this.state.flags.isDisplayLists ? 
				<ul className="dropdown-lists">
                    <li><a>Shopping Cart</a></li>
                    <li><a>Wish List</a></li>
                    <li><a>Waiting List</a></li>
                    <li><a>Dashboard</a></li>
                    <li><hr className="padding-0px margin-0px"/></li>
                    <li><a>Manage Account</a></li>
                </ul> : 
                null
	}
	renderLoginArea() {
		if (!this.state.isShowAuthedNavLists) {
			return  <span>
				    	<Link to={"/login"}><li className="padding-15px"><i className="fa fa-sign-in"></i> Sign In</li></Link>
						<Link to={"/createAccount"}><li className="padding-15px"><i className="fa fa-plus-square"></i> Create Account</li></Link>
					</span>
		} else {
			return  <span>
						<li className={this.state.flags.isDisplayLists ? 'padding-15px active' : 'padding-15px'} onClick={this.toggleList.bind(this)}>
							<span><i className="fa fa-bars fa-fw"></i> liang121</span>
							{this.renderDropDownLists()}
						</li>
						<Link to={'/login'}><li className="padding-15px"><i className="fa fa-sign-out fa-fw"></i> Log Out</li></Link>
					</span>
		}
	}
	renderSearchBox() {
		return  <div className={this.state.flags.isShowSearchBox ? 'search-box show-seach-box' : 'search-box hide-search-box'}>
					<h4>Search Area</h4>
					<FormValidation/>
					<input type="text" name="city" className="form-control width-250px float-left margin-left-30px" placeholder="City ..." 
					value={this.state.searchArea.city}
					onChange={this.handleSearchAreaChange.bind(this, 'city')}/>
					<input type="text" name="state" className="form-control width-250px float-left margin-left-30px" placeholder="State ..."
					value={this.state.searchArea.state}
					onChange={this.handleSearchAreaChange.bind(this, 'state')}/>
					<select name="itemCondition" className="form-control width-250px float-left margin-left-30px" value={this.state.searchArea.itemCondition} 
						onChange={this.handleSearchAreaChange.bind(this, 'itemCondition')}>
                        <option value="">--choose condition--</option>
						<option value="Brand New" className="">Brand New</option>
						<option value="Inbox New" className="">Inbox New</option>
						<option value="Almost New" className="">Almost New</option>
						<option value="Good Condition" className="">Good Condition</option>
						<option value="Any Condition" className="">Any Condition</option>
                    </select>
                    <div className="float-left margin-left-30px">
                     	<span>Within</span>
                    	<select name="miles" title="Within" className="form-control width-120px display-inline-block margin-left-10px"
                    	value={this.state.searchArea.miles}
						onChange={this.handleSearchAreaChange.bind(this, 'miles')}>
	                        <option value="">-Select Miles-</option>
	                        <option value="50"> 50 Miles</option>
	                        <option value="100"> 100 Miles</option>
	                        <option value="200"> 200 Miles</option>
	                        <option value="500"> 500 Miles</option>
	                    </select>
                    </div>
                    <div className="float-left margin-left-30px">
                     	<span>Miles of</span>
                     	<input type="text" name="zip" className="form-control width-120px display-inline-block margin-left-10px" placeholder="ZIP ..."
                     	value={this.state.searchArea.zip}
						onChange={this.handleSearchAreaChange.bind(this, 'zip')}/>
                    </div>
                    <br/>
                    <div className="margin-top-30px float-right padding-right-15px padding-bottom-10px">
                    	<button className="btn button btn-info" onClick={this.saveSearchArea.bind(this)}>Save</button>
                    	<button className="btn button btn-danger margin-left-30px" onClick={this.cancelEditSearchArea.bind(this)}>Cancel</button>
                    </div>
				</div>
		
	}
	renderDisplaySearchAreaResults() {
		if (this.state.isShowAuthedNavLists) {
			return  <div><div className="location-area">
			 			{this.state.displaySearchArea.zip} {this.state.displaySearchArea.city} {this.state.displaySearchArea.state} <br/>
						{this.state.displaySearchArea.miles} miles away <br/>
						Item Condition: {this.state.displaySearchArea.itemCondition}
			 		</div>
			 		<a className="edit" onClick={this.toggleSearchBox.bind(this)}>EDIT</a>
			 		</div>
		} else {
			return null;
		}
		
	}
	showFormErrors() {
		var {flags} = this.state;
		const {dispatch} = this.props;
		dispatch(displayOrHideErrors(true))
		this.setState({flags: flags});
	}
	render() {
		return (
			<div className="nav-container">
				<nav>
					<div className="float-left logo-container">
						<span>X </span> {/*<button onClick={this.test.bind(this)}>test button</button>*/}
						<span>change</span>
						<span> -Dev Version</span>
						<span>Free exchange, save your money</span>
					</div>
					<div className = "float-left login-container">
						<ul className= "float-right padding-right-10px">
							{this.renderLoginArea()}
						</ul>
					</div>
					<div>
						<div className="input-group padding-top-5px padding-left-15px">
						 	<div className="input-group-addon" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></div>
						 	<input type="text" className="form-control width-250px" placeholder="Search Items ..." aria-describedby="basic-addon1" />
						 	{this.renderDisplaySearchAreaResults()}
						</div>
					</div>
				</nav>
				{this.renderSearchBox()}
			</div>
		)
	}
}
Nav.propTypes = propTypes;
function mapStateToProps(state) {
	const {authRole} = state.authed;
	return {
		authRole
	}
}
export default connect(mapStateToProps)(Nav);