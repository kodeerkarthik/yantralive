import React, { Component } from 'react';
import '../css/createEnquiry.css'
import api from '../api/index';
import browserHistory from '../config/browserHistory'

class CreateEnquiry extends Component {
	fileObj = [];
  fileArray = [];
  imageArray=[];
	imageName=[];
	currentUser={};
	
	constructor(props){
    super(props)
    this.state = {
			file: [],
			make:'',
			model:'',
			title:'',
      message:'',
      imageUrl:''
    }
	}
	
	componentDidMount(){
		this.currentUser=JSON.parse(localStorage.getItem("currentUser"))
	}

	fileChange =(e)=> {
		this.fileObj.push(e.target.files)
		for (let i = 0; i < this.fileObj[0].length; i++) {
			this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
		}
		this.setState({file: this.fileArray})

    const fd = new FormData();
    for (let j = 0; j < e.target.files.length; j++) {
      fd.append('image', e.target.files[j])
    }
		api.post(`/v1/upload/file`, fd).then(res => {
      this.setState({imageUrl:res.data})
		}).catch(err => {
			console.log(err)
		})
	}

	handleChange=(e)=> {
    this.setState({[e.target.name]: e.target.value})
	}
	
	handleSubmit=(e)=>{
		e.preventDefault();
		let data = {
      code:"",
			customer_id: this.currentUser.uid,
			enquiry_id: 123,
			title: this.state.title,
			status: "created",
			images: this.state.imageUrl,
			equipment_type : this.state.make,
			equipment_model: this.state.model,
			message: this.state.message,
		}
		api.post('v1/enquiry/create/customer', data )
			.then(res => {
				console.log(res.data)
				browserHistory.push('/enquiry')
			}). catch(err => {
				console.log(err)
			})
	}
	
	render() {
		return (
			<div className='enquiry_body'>
		
				<div className="ml-4 mr-3">  
					<h2 class="page--title h5">CREATE ENQUIRY</h2>
					<ul _ngcontent-pml-c6="" class="breadcrumb">
						<li class="breadcrumb-item"><a  href="/dashboard">Dashboard</a></li>
						<li class="breadcrumb-item"><a  href="/enquiry">My enquiry</a></li>
						<li class="breadcrumb-item "><span style={{color:'#ef6c00'}}>Create enquiry</span></li>
					</ul>
				</div>  

				<div className='row'>
					<div className='col-lg-3 col-sm-12'></div>
					<div className='col-lg-6 col-sm-12 enquiry_form_body'>
						<h3>Create Enquiry</h3>
						<form >
							<fieldset > 
								<legend>ENQUIRY DETAILS</legend>   
								<div className="form-group row m-2">
									<label htmlFor="make" className="col-sm-4 col-form-label">Equipment Make</label>
									<div className="col-sm-8">
										<input type="text" name='make' onChange={this.handleChange} className="form-control" id="make"/>
									</div>
								</div>
								<div className="form-group row m-2">
									<label htmlFor="model" className="col-sm-4 col-form-label">Equipment Model</label>
									<div className="col-sm-8">
										<input type="text" name='model' onChange={this.handleChange} className="form-control" id="model"/>
									</div>
								</div>
								<div className="form-group row m-2">
									<label htmlFor="model" className="col-sm-4 col-form-label">Title</label>
									<div className="col-sm-8">
										<input type="text" name='title' onChange={this.handleChange} className="form-control" id="title"/>
									</div>
								</div>
        				<div className="form-group row m-2">
									<label htmlFor="message" className="col-sm-4 col-form-label">Message</label>
									<div className="col-sm-8">
          				<textarea class="form-control" name='message' onChange={this.handleChange} id="message" rows="3"></textarea>
										{/* <input type="text" name='message' onChange={this.handleChange} className="form-control" id="message"/> */}
									</div>
								</div>
								<div className="form-group row m-2">
									<label htmlFor="model" className="col-sm-4 col-form-label">Attach Image/Doc</label>
									<div className="col-sm-8">
										<div className="custom-file">
											<input type="file" name='file' onChange={this.fileChange} className="custom-file-input" multiple />
											<label className="custom-file-label"></label>
										</div>
									</div>
								</div>
							</fieldset>

							{this.state.file.length > 0 ?<fieldset className='mt-4' > 
								<legend>Selected File</legend>
								{(this.fileArray || []).map(url => (
                        <img src={url} alt="..." width='100px' className='mr-3' />
                ))}
							</fieldset>:''}

							{/* <fieldset className='mt-4' > 
								<legend>CONTACT INFORMATION</legend>   
								<div className="form-group row m-2">
									<label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
									<div className="col-sm-9">
										<input type="text" className="form-control" id="name"/>
									</div>
								</div>
								<div className="form-group row m-2">
									<label htmlFor="phone" className="col-sm-3 col-form-label">Phone Number</label>
									<div className="col-sm-9">
										<input type="text" className="form-control" id="phone"/>
									</div>
								</div>
								<div className="form-group row m-2">
									<label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
									<div className="col-sm-9">
										<input type="text" className="form-control" id="email"/>
									</div>
								</div>
							</fieldset> */}
							<button className='btn btn-warning sub-btn mt-4 mb-4' onClick={this.handleSubmit}> SUBMIT </button>
						</form>
					</div>
					<div className='col-lg-3 col-sm-12'></div>
				</div>
			</div>
		);
	}
}

export default CreateEnquiry;
