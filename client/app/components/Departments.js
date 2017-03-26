import React, { Component, PropTypes } from 'react';
import { connect } from "react-redux";
import { fetchDepartmentsArray } from '../actions/DepartmentsActions';
import { Link } from 'react-router' 
const propTypes = {
	dispatch: PropTypes.func.isRequired,
	departmentsArray: PropTypes.array
}
class Departments extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(fetchDepartmentsArray());
	}
	renderDepartmentLists() {
		const headTitles = ['Electronics & Computers', 'Automotive & Industrial', 'Movies, Music & Games', 'Home Services']
		const departmentsArray = this.props.departmentsArray;
		return departmentsArray.map((department, index) => {
			return (
				<div className="department-item float-left" key={ index }>
					<div className="panel-heading">
						<b>{headTitles[index]}</b>
					</div>
					<div className="panel-body">
						<ul className="list-group">
							<li className={index === 0 ? "list-group-item" : "list-group-item hide"}>
								<Link to="xchange/items/tv" className="cursor-pointer">TV</Link>
								<span className="badge">4 <i>new !</i></span>
							</li>
							{this.renderDepartmentItems(department)}
						</ul>
					</div>
				</div>
			)
		})
	}
	renderDepartmentItems(lists) {
		for(var prop in lists) {
			var list = lists[prop];
		}
		return list.map((item, index) => {
			return (
				<li className="list-group-item " key={index}>
		 			{item}
	            </li>
	        )
		})
	}
	render() {
		return (
			<div className="departments-container panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">Departments Lists</h3>
				</div>
				<div className="panel-body">
					{this.renderDepartmentLists()}
				</div>
				{this.props.children}
			</div>
		)
	}
}
Departments.propTypes = propTypes;
function mapStateToProps(state) {
	const { departmentsArray } = state.departments;
	return {
		departmentsArray
	}
}
export default connect(mapStateToProps)(Departments);