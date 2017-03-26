import React, { Component, PropTypes } from 'react';
export default class Footer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
		        <nav className="nav-footer">
		            <div className="container-fluid">
		                <div className="navbar-header">
		                    <a className="navbar-brand">
		                        Copyright belong to Moyu Liang
		                    </a>
		                </div>
		            </div>
		        </nav>
			</div>
		)
	}
}