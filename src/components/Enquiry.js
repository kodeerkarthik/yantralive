import React, { Component } from 'react';
import EnquiryTable from './EnquiryTable'
import api from '../api/index'
import browserHistory from '../config/browserHistory'

class Enquiry extends Component {
	currentUser={};

	state={
		pageNo:'',
		result:'',
		enquiries:[]
	}

	componentDidMount() {
		this.currentUser=JSON.parse(localStorage.getItem("currentUser"))
		this.getEnquiries(1);
		
	}

	getEnquiries=(page_no)=>{
		api.get(`/v1/enquiry/get/customer`, {
			params: {
				customer_id: this.currentUser.uid,
				page_no: page_no,
				size:5
			}}).then(res=>{
			console.log(res.data)
			this.setState({enquiries:res.data.enquiries, result: res.data.result, pageNo: page_no})
		}).catch(err => {
			console.log(err)
		})
	}

	pagination=()=>{
		var page = []
		for (let i = 1; i <= Math.ceil(this.state.result/5); i++) {
			page.push(<li className="paginate_button page-item">
				{this.state.pageNo==i?
					<li className="paginate_button page-item active">
						<button aria-controls="dataTable" className="page-link "onClick={() =>this.getEnquiries(i)} >{i}</button> </li>:
				<button aria-controls="dataTable" className="page-link" onClick={() =>this.getEnquiries(i)}>{i}</button>
				}
		</li>)
		}
		return page;
	}

	viewEnquiry = (id) => {
		browserHistory.push({pathname:'/enquiry/view/'+id, state: {id : id}})
	}

	editEnquiry = (id) => {
		browserHistory.push({pathname:'/enquiry/edit/'+id, state: {id : id}})
	}

	render() {
		return (
			<div className='enquiry_body'>
		
				{/* <div className="ml-4 mr-3">  
					<h2 class="page--title h5">MY ENQUIRIES</h2>
					<ul _ngcontent-pml-c6="" class="breadcrumb">
						<li class="breadcrumb-item"><a  href="/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item "><span style={{color:'#ef6c00'}}>My enquiry</span></li>
					</ul>
				</div>   */}
     
				<div class="panel">
					<h3 > All Enquiries <a href='/enquiry/create-enquiry' class="btn btn-sm btn-outline-info">+ New Enquiry</a></h3>
					<p >Found Total {this.state.result} Enquiries</p>
				</div>

				<div className="p-4 ">
				<div class="table-responsive enquiry_table border">
					<table class="table ">
						<thead className="" style={{color:'#fdc32c', background:"#0d4a61"}}>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Make</th>
								<th scope="col">Model</th>
								<th scope="col">Title</th>
								<th scope="col">Created At</th>
								<th scope="col">Updated At</th>
								<th scope="col">Status</th>
								{/* <th scope="col">Quoted Value</th> */}
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody style={{borderBottom:'1px solid #dee2e6'}}>
							{this.state.enquiries.map((enquiry,index) => {
								return(<tr role="row" className="odd">
									
									<td>{(index + (this.state.pageNo-1)*5)+1}</td>
									<td>{enquiry.equipment_type}</td>
									<td>{enquiry.equipment_model}</td>
									<td>{enquiry.title}</td>
									<td>{enquiry.created_at}</td>
									<td>{enquiry.updated_at}</td>
									<td>{enquiry.status}</td>	
									{/* <td>--</td>		 */}
									<td>
										<button className="btn btn-info btn-sm mr-2" onClick={()=>this.viewEnquiry(enquiry.enquiry_id)}>
											<i class="fas fa-eye"></i>
										</button>
										<button className="btn btn-warning btn-sm" onClick={()=>this.editEnquiry(enquiry.enquiry_id)}>
										<i class="fas fa-edit"></i>
										</button>
									</td>									
								</tr>)
							})}		
						</tbody>
					</table>

					<ul className="pagination" style={{justifyContent: "center"}}>
						{this.state.pageNo<=1?
							<li className="paginate_button page-item previous disabled" id="dataTable_previous">
								<button className="page-link">Previous</button>
							</li>:
							<li className="paginate_button page-item previous" id="dataTable_previous">
								{/* <button className="page-link" onClick={() =>this.getResturants(this.state.pageNo-1)}>Previous</button> */}
								<button className="page-link" onClick={() =>this.getEnquiries(this.state.pageNo-1)} >Previous</button>
							</li>
						}
						
						{this.pagination()} 

						{this.state.pageNo>=this.state.result/2?
							<li className="paginate_button page-item next disabled" id="dataTable_next">
								<button className="page-link" >Next</button>
							</li>:
							<li className="paginate_button page-item next " id="dataTable_next">
								<button className="page-link" onClick={() =>this.getEnquiries(this.state.pageNo+1)}>Next</button>
							</li>
						}
					</ul>
	
				</div>
				</div>

				{/* <div className="m-4 p-2 border">
				<EnquiryTable/>
				</div> */}

			</div>
		);
	}
}

export default Enquiry;
