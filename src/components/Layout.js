import React, { Component } from 'react';
import '../css/layout.css'
import Enquiry from './Enquiry';
import fire from '../config/fire';
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import Quotation from './Quotation';
import Orders from './Orders';
import CreateEnquiry from './CreateEnquiry';
import ViewEnquiry from './ViewEnquiry';
import EditEnquiry from './EditEnquiry';

class Layout extends Component {

	logout =()=> {
		fire.auth().signOut();
	}

	render() {
		return (
			<div>
				<input type="checkbox" id="check" defaultChecked/>				
				<label htmlFor="check" style={{position:"absolute"}}>
					<i className="fas fa-bars" id='btn'></i>
					{/* <i className="fas fa-times" id='cancel'></i> */}
				</label>
				<div className='sidebar'>
					<header><img alt="logo" width='100px' height='100px' src={require('../images/Logo.png')}/></header>
					<ul>
						<li className='navItems'><a href='/dashboard'><i className="fas fa-qrcode"></i> Dashboard</a></li>
						<li className='navItems'><a href='/enquiry'><i class="fa fa-question-circle" aria-hidden="true"></i> My Enquiries</a></li>
						<li className='navItems'><a href='/quotation'><i class="fas fa-quote-left"></i>My Quotations</a></li>
						<li className='navItems'><a href='/orders'><i class="fa fa-shopping-cart" ></i>My orders</a></li>
						<li className='navItems' onClick={this.logout}><a href='/login'><i className="fas fa-sign-out-alt"></i>Logout</a></li>
					</ul>
				</div>
				<section>
					<div className="layout_header">
						<h3>Customer<span>Journey</span></h3>
					</div>
					<Router >
						<Switch>
							<Route exact path='/' component={Dashboard}></Route>
							<Route exact path='/dashboard' component={Dashboard}></Route>
							<Route exact path='/enquiry' component={Enquiry}></Route>
							<Route exact path='/quotation' component={Quotation}></Route>
							<Route exact path='/orders' component={Orders}></Route>
							<Route exact path='/enquiry/create-enquiry' component={CreateEnquiry}></Route>
							<Route exact path='/enquiry/view/:id' component={ViewEnquiry}></Route>
							<Route exact path='/enquiry/edit/:id' component={EditEnquiry}></Route>
						</Switch>
					</Router>
				</section>
			</div>
		);
	}
}

export default Layout;
