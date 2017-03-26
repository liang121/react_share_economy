import React, { Component, PropTypes } from 'react';
import { connect } from "react-redux";
import { fetchAuthUser } from '../actions/AuthedActions';
import NavContainer from './NavContainer';
import Footer from '../components/Footer'
import Departments from '../components/Departments';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string,
  user: PropTypes.string
};
class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
	}
	login(e) {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch(fetchAuthUser());
	}
	render() {
		return (
			<div className="height-100">
				<NavContainer/>
				{this.props.children}
				<Footer/>
			</div>
		)
	}
} 
Layout.propTypes = propTypes;
function mapStateToProps(state) {
	const { name } = state.authed;
	const { user } = state.authed;
	return {
		name,
		user
	}
}
export default connect(mapStateToProps)(Layout);