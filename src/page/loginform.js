import React, { Component } from 'react';
import App from '../App.js'
import '../App.css'
import { Redirect, Route } from "react-router";



class LoginForm extends Component{
    constructor(props) {
      super(props);
      this.state = {
          dataUser: [],       
          DataUserNew: {      
              username:'',
              password:'',
          }
      }
    }

    loged() {
      
      const Newdata = this.state.DataUserNew;
      fetch('/user/login', {
          method: "post",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Newdata
          })
          
      }).then((res) => {
          if(res.ok){
            localStorage.setItem("response", JSON.stringify("true"));
            
          }else{
            localStorage.setItem("response", JSON.stringify("true"));
            
          }
          
      }).catch(error =>
        this.setState({
          error
        })
      );
    }

    HendelOnchange = (event) => {
        const NumberingId = this.state.totalData + 1; 
        let prmInputUser = { ...this.state.DataUserNew }; 
        
        prmInputUser[event.target.name] = event.target.value;
        this.setState({
            DataUserNew: prmInputUser
        })
 
    }

    render(){
        return(
            <div className="card-center">
            <div className="title">Sign In</div>
            <form action='//localhost:4000/user/login' method='post'>
              <div className="input-container">
                <label>Username </label>
                <input type="text" name="username" id="username"  onChange={this.HendelOnchange} value={this.state.DataUserNew.username} required />
              </div>

              <div className="input-container">
                <label>Password </label>
                <input type="password" name="password" id="password"  onChange={this.HendelOnchange} value={this.state.DataUserNew.password} required />
              </div>

                <div className='center'>
                    <button className="my-button btn-yellow" onClick={this.loged}> Login </button> 
                </div>
              
            </form>
          </div>
        )
    }
}

export default LoginForm;