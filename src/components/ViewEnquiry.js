import React, { Component } from 'react';
import api from '../api/index'

class ViewEnquiry extends Component {
	state={
		enquiry:'',
		images:[]
	}

	componentDidMount(){
		this.getEnquiry(this.props.location.state.id);
	}

	getEnquiry = (id) => {
		api.get(`v1/enquiry/getbyid`, {
			params: {
				enquiry_id: id
			}}).then(res=>{
			this.setState({enquiry:res.data, images: res.data.images})
			console.log(this.state.images)
		}).catch(err => {
			console.log(err)
		})
	}

	render() {
		return (
			<div className='enquiry_body'>
		
				<div className="ml-4 mr-3">  
					<h2 class="page--title h5">MY ENQUIRIES</h2>
					<ul _ngcontent-pml-c6="" class="breadcrumb">
						<li class="breadcrumb-item"><a  href="/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a  href="/enquiry">My enquiry</a></li>
						<li class="breadcrumb-item "><span style={{color:'#ef6c00'}}>Enquiry Details</span></li>
					</ul>
				</div>  
				<div style={{border:'solid 1px #dee2e6'}} className='ml-4 mt-5 mr-3 p-4'>
					<div className="row">
						<div class="col-md-6 col-sm-12">
							<table class="table borderless">
								<tbody>
									<tr>
										<td>Enquiry Id:</td>
										<th>{this.state.enquiry.enquiry_id}</th>
									</tr>
									<tr>
										<td>Customer Name:</td>
										<th>{this.state.enquiry.customer}</th>
									</tr>
									<tr>
										<td>Status:</td>
										<th>{this.state.enquiry.status}</th>
									</tr>
									<tr>
										<td>Date:</td>
										<th>{this.state.enquiry.created_at}</th>
									</tr>
									<tr>
										<td>Assembly:</td>
										<th>{this.state.enquiry.assembly}</th>
									</tr>
									<tr>
										<td>Yla Id:</td>
										<th>{this.state.enquiry.yla_id}</th>
									</tr>
									<tr>
										<td>Ylx Id:</td>
										<th>{this.state.enquiry.ylx_id}</th>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="col-md-6 col-sm-12">
							<table  class="table borderless">
								<tbody>
									<tr>
										<td>Title:</td>
										<th>{this.state.enquiry.title}</th>
									</tr>
									<tr>
										<td>Mobile:</td>
										<th>{this.state.enquiry.phone}</th>
									</tr>
									<tr>
										<td>Channel:</td>
										<th>{this.state.enquiry.status}</th></tr>
									<tr>
										<td>Equipment Type:</td>
										<th>{this.state.enquiry.equipment_type}</th>
									</tr>
									<tr>
										<td>Enquiry Text:</td>
										<th>{this.state.enquiry.enquiry_text}</th>
									</tr>
									<tr>
										<td>Yla name:</td>
										<th>{this.state.enquiry.yla_name}</th>
									</tr>
									<tr>
										<td>Ylx name:</td>
										<th>{this.state.enquiry.ylx_name}</th>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				
				<div style={{border:'solid 1px #dee2e6'}} className='ml-4 mt-5 mr-3 p-4'>
					{this.state.images.map(image=>{
						return(<img src={image} width='250px' className='mr-2'/>)
					})}	
				</div>
			</div>
		);
	}
}

export default ViewEnquiry;
