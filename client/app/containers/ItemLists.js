import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from "react-redux";
import SideBarSearch from '../components/SideSearchBar'
import ItemListContents from '../components/ItemListContents'
const propTypes = {
  dispatch: PropTypes.func.isRequired,

};
class ItemLists extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
	}

	render() {
		return (
			<div className="height-100">
				<SideBarSearch/>
				<ItemListContents/>
			</div>
		)
	}
} 
ItemLists.propTypes = propTypes;
function mapStateToProps(state) {
	return {
	}
}
export default connect(mapStateToProps)(ItemLists);


