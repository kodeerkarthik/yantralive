import React, { Component } from 'react';
import './App.css';
import Enquiry from './components/Enquiry'
import Login from './components/Login';
import fire from './config/fire';
import Layout from './components/Layout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : {}
    }
  }
  componentDidMount(){
    this.authListner();   
  }
  authListner(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user})
        localStorage.setItem('currentUser',JSON.stringify(user))
      } else {
        this.setState({user:null})
        localStorage.removeItem('currentUser')
      }
    })
  }
  render() {
    return (
      <div className="App">
        {/* {this.state.user ? <Enquiry/> : <Login/>} */}
        {this.state.user ? <Layout/> : <Login/>}
      </div>
    );
  }
}

export default App;

