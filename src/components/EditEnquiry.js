import React, { Component } from 'react';
import api from '../api/index'

class EditEnquiry extends Component {
	state={
		enquiry:'',
		make:'',
		model:'',
		title:'',
		message:'',
	}

	componentDidMount(){
		this.getEnquiry(this.props.location.state.id);
	}

	getEnquiry = (id) => {
		api.get(`v1/enquiry/getbyid`, {
			params: {
				enquiry_id: id
			}}).then(res=>{
			this.setState({enquiry:res.data,make:res.data.equipment_type,title:res.data.title,message:res.data.message})
		}).catch(err => {
			console.log(err)
		})
	}

	handleChange=(e)=>{
		this.setState({[e.target.name]: e.target.value})
	}

	handleSubmit=(e)=>{
		e.preventDefault();
		let data = {
			title: this.state.title,
			status: "created",
			equipment_type : this.state.make,
			message: this.state.message,
		}

	}

	render() {
		return (
			<div className='enquiry_body'>
				<div className="ml-4 mr-3">  
					<h2 class="page--title h5">UPDATE ENQUIRY</h2>
					<ul _ngcontent-pml-c6="" class="breadcrumb">
						<li class="breadcrumb-item"><a  href="/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a  href="/enquiry">My enquiry</a></li>
						<li class="breadcrumb-item "><span style={{color:'#ef6c00'}}>Update enquiry</span></li>
					</ul>
				</div>  

				<div className='row'>
					<div className='col-lg-3 col-sm-12'></div>
					<div className='col-lg-6 col-sm-12 enquiry_form_body'>
						<h3>Edit Enquiry</h3>
						<form >
							<fieldset > 
								<legend>Edit ENQUIRY DETAILS</legend>   
								<div className="form-group row m-2">
									<label htmlFor="make" className="col-sm-4 col-form-label">Equipment Make</label>
									<div className="col-sm-8">
										<input type="text" name='make' defaultValue={this.state.make} onChange={this.handleChange} className="form-control" id="make"/>
									</div>
								</div>
								<div className="form-group row m-2">
									<label htmlFor="model" className="col-sm-4 col-form-label">Equipment Model</label>
									<div className="col-sm-8">
										<input type="text" name='model' defaultValue={this.state.model} onChange={this.handleChange} className="form-control" id="model"/>
									</div>
								</div>
								<div className="form-group row m-2">
									<label htmlFor="model" className="col-sm-4 col-form-label">Equipment Title</label>
									<div className="col-sm-8">
										<input type="text" name='title' defaultValue={this.state.title} onChange={this.handleChange} className="form-control" id="title"/>
									</div>
								</div>
								<div className="form-group row m-2">
									<label htmlFor="message" className="col-sm-4 col-form-label">Message</label>
									<div className="col-sm-8">
										<input type="text" name='message' defaultValue={this.state.message} onChange={this.handleChange} className="form-control" id="message"/>
									</div>
								</div>
							</fieldset>
							<button className='btn btn-warning sub-btn mt-4 mb-4' onClick={this.handleSubmit}> UPDATE </button> 
						</form>
					</div>
					<div className='col-lg-3 col-sm-12'></div>
				</div>
			</div>
		);
	}
}

export default EditEnquiry;
