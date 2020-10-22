import React, { Component } from 'react';
import '../css/login.css';
import fire from '../config/fire';
import firebase from 'firebase';
import browserHistory from '../config/browserHistory'

class Login extends Component {
	state={
		loginCss:'login',
		regCss:'register',
		btnCss:'btn',
		loginEmail:'',
		loginPassword:'',
		regEmail:'',
		regPassword:'',
		regUsername:''
	}
	showLogin = () => {
		this.setState({loginCss:'login', regCss:'register',btnCss:'btn'})
	}

	showRegister = () => {
		this.setState({loginCss:'login1', regCss:'register1',btnCss:'btn1'})
	}

	handleChange = (e) => {
		this.setState({[e.target.name]:e.target.value})
	}

	login = (e) => {
		e.preventDefault();
		fire.auth().signInWithEmailAndPassword(this.state.loginEmail,this.state.loginPassword).then((u)=>{
			console.log(u)
			browserHistory.push('/dashboard')
		}).catch(err=>{
			console.log(err)
		})
	}

	googleLogin = (e) => {
		e.preventDefault();
		var provider = new firebase.auth.GoogleAuthProvider();
		fire.auth().signInWithPopup(provider).then(u => {
			console.log(u)
			browserHistory.push('/dashboard')
		}).catch(err => {
			console.log(err)
		})
	}

	facebookLogin = (e) => {
		e.preventDefault();
		var provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(u => {
			console.log(u)
			browserHistory.push('/dashboard')
		}).catch(err => {
			console.log(err)
		})
	}

	register = (e) => {
		e.preventDefault();
		fire.auth().createUserWithEmailAndPassword(this.state.regEmail, this.state.regPassword).then(u=>{
			console.log(u)
			browserHistory.push('/dashboard')
		}).catch(err=>{
			console.log(err)
		})
	}

	render() {
		return (
			<div className='hero'>
				<div className='form-box'> 
					<div className='button-box'>
						<div id={this.state.btnCss} className='bttn'></div>
						<button type='button' className="toggle_btn" onClick={this.showLogin}>Log In</button>
						<button type='button' className="toggle_btn" onClick={this.showRegister}>Register</button>
					</div>

					<div className='social-icons'>
						<img alt="facebook" src={require('../images/fb.png')} onClick={this.facebookLogin}/>
						<img alt="google" src={require('../images/gp.png')} onClick={this.googleLogin}/>
					</div>

					<form id={this.state.loginCss} className='input-group'>
						<input type='email' className='input-field' name='loginEmail' placeholder='Email' onChange={this.handleChange} required/>
						<input type='password' className='input-field' name='loginPassword' placeholder='Password' onChange={this.handleChange} required/>	
						<button type='submit' className='submit-btn mt-4' onClick={this.login}>Log in</button>				
					</form>

					<form id={this.state.regCss} className='input-group'>
						<input type='text' className='input-field' name='regUsername' onChange={this.handleChange} placeholder='User name' required/>
						<input type='email' className='input-field' name='regEmail' onChange={this.handleChange} placeholder='Email' required/>
						<input type='password' className='input-field' name='regPassword' onChange={this.handleChange} placeholder='Password' required/>	
						<button type='submit' className='submit-btn mt-4' onClick={this.register}>Register</button>				
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
