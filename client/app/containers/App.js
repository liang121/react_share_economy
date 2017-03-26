import React, { Component, PropTypes } from 'react';
import NavContainer from './NavContainer';
import Departments from '../components/Departments';
import { browserHistory} from 'react-router'

class App extends React.Component {
	constructor(props) {
		super(props);
		
	}
	componentWillMount() {
		browserHistory.push('/xchange');
	}
	render() {
		return (
			<div className= "height-100">
				{this.props.children}
			</div>
		)
	}
} 
export default App;