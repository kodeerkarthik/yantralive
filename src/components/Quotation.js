import React, { Component } from 'react';
import api from '../api/index'
import browserHistory from '../config/browserHistory'

class Quotation extends Component {
	currentUser={};

	state={
		quotations:[]
	}

	componentDidMount() {
		this.currentUser=JSON.parse(localStorage.getItem("currentUser"))
		this.getQuotations();
		
	}

	getQuotations=()=>{
		api.get(`/v1/quotation/get/withenquiry`, {
			params: {
				customer_id: this.currentUser.uid,
			}}).then(res=>{
			console.log(res.data)
			this.setState({quotations:res.data})
		}).catch(err => {
			console.log(err)
		})
	}

	downloadQuatation=(url)=>{
		window.window.open(url,'_blank');
	}

	render() {
		return (
			<div className='enquiry_body'>
		
			<div className="ml-4 mr-3">  
				<h2 class="page--title h5">MY QUOTATIONS</h2>
				<ul _ngcontent-pml-c6="" class="breadcrumb">
					<li class="breadcrumb-item"><a  href="/dashboard">Dashboard</a></li>
					<li class="breadcrumb-item "><span style={{color:'#ef6c00'}}>My Quotations</span></li>
				</ul>
			</div>  
	 
			<div className="p-4 ">
				<div class="table-responsive enquiry_table border">
					<table class="table ">
						<thead className="" style={{color:'#fdc32c', background:"#0d4a61"}}>
							<tr>
								<th scope="col">Enquiry Id</th>
								<th scope="col">Title</th>
								<th scope="col">Created At</th>
								<th scope="col">Status</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{this.state.quotations.map(quotation => {
								return(<tr role="row" className="odd">
									<td>{quotation.enquiry_id}</td>
									<td>{quotation.title}</td>
									<td>{quotation.created_at}</td>
									<td>{quotation.status}</td>
									<td>
										<button className="btn btn-info btn-sm mr-2" onClick={()=>this.downloadQuatation(quotation.pdf_url)}>
											<i class="fas fa-download"></i> Download
										</button>
									</td>										
								</tr>)
								})}		
						</tbody>
					</table>

				</div>
			</div>
		</div>
		);
	}
}

export default Quotation;
