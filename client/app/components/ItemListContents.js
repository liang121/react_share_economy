import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from "react-redux";
import SearchCriteria from '../components/SearchCriteria'
import SideBarSearch from '../components/SideSearchBar'
import SortingFilters from '../components/SortingFilters'
const propTypes = {
  dispatch: PropTypes.func.isRequired,
};
class ItemListContents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemList:[
					{
						imgUrl: '../../../server/public/picture/item_tv.jpg',
						itemId: '1002431',
						itemTitle: 'TCL 65US5800 65-Inch 4K Ultra HD Roku Smart LED TV (2016 Model)',
						sellerBy: 'liang121',
						sellerEstPrice: 899.99,
						bidNumber: 3,
						endDate: '10/29/2016',
						startDate: '10/23/2016',
						withinMiles: 50
					},
					{
						imgUrl: '../../../server/public/picture/81eUh0mN-qL._SL1500_.jpg',
						itemId: '1002432',
						itemTitle: 'TCL 40FD2700 40-Inch 1080p LED TV (2015 Model)',
						sellerBy: 'liang121',
						sellerEstPrice: 126,
						bidNumber: 5,
						endDate: '11/15/2016',
						startDate: '10/15/2016',
						withinMiles: 500
					},
					{
						imgUrl: '../../../server/public/picture/81lyzx5O+EL._SL1500_.jpg',
						itemId: '1002433',
						itemTitle: 'LG 32LH500B 32-Inch 720p HD LED TV (2016 Model)',
						sellerBy: 'liang121',
						sellerEstPrice: 127.95,
						bidNumber: 11,
						endDate: '9/11/2016',
						startDate: '9/1/2016',
						withinMiles: 100
					},
					{
						imgUrl: '../../../server/public/picture/81EN8hVjtkL._SL1500_.jpg',
						itemId: '1002533',
						itemTitle: 'Hisense 32H3B1 32-Inch 720p LED TV (2016 Model)',
						sellerBy: 'liang121',
						sellerEstPrice: 129.88,
						bidNumber: 13,
						endDate: '10/25/2016',
						startDate: '10/1/2016',
						withinMiles: 150
					}
				]
			}
	}
	componentWillReceiveProps(nextProps) {
		/*console.log(nextProps.criteriaArray);*/

	}
	renderItemList() {
		const {itemList} = this.state;
		return itemList.map((itemDetail, index) => {
			const imgUrl = require('../../../server/public/picture/item_tv.jpg')
			return  <div className="search-result-item" key={index}>
						<div className="col-2">
				            <img src={imgUrl} className="img-thumbnail col-12"/>
				        </div>
				        <div className="item-description col-8">
				            <Link to="xchange/itemDetail/1002431">{itemDetail.itemTitle}</Link>
				            <h5 className="padding-left-5px">
				                by <a>{itemDetail.sellerBy}</a>
				            </h5>
				            <hr/>
				            <ul className="col-3">
				            	<li>Item Id: <a>{itemDetail.itemId}</a></li>
				            	<li>Bid Number: <span>{itemDetail.bidNumber}</span> bids</li>
				            	<li>Est Price: <span>{itemDetail.sellerEstPrice}</span></li>
				            </ul>
				            <ul className='col-5'>
				            	<li>Release Date: {itemDetail.startDate}</li>
				            	<li>End Date: {itemDetail.endDate}</li>
				            	<li>Within: {itemDetail.withinMiles} Miles <a className="padding-left-10px">See in Goolge Map</a></li>
				            </ul>
			        	</div>
			        	<br className="clear-both"/>
			        	<hr className="clear-both margin-top-5px"/>
					</div>
		})
	}
	render() {
		return (
			<div className="margin-left-30px padding-top-15px item-list-content">
				<div className="overflow-hidden">
					<div className="float-left">
						<SearchCriteria/>
					</div>
					<div className="float-right">
						<SortingFilters/>
					</div>
				</div>
				<hr/>
				{this.renderItemList()}
			</div>
		)
	}
} 
ItemListContents.propTypes = propTypes;
function mapStateToProps(state) {
	return {
	}
}
export default connect(mapStateToProps)(ItemListContents);


