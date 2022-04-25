import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import {BrowserRouter, Router, Switch, Route} from 'react-router-dom'

import AllData from './datatables/datatable'
import LoginForm from './page/loginform';

function App() {
  localStorage.setItem("response", JSON.stringify("false"));
  const dataList = () => {
      
    fetch('/makanan').then(res => {
      if (res.status === 200)
          return res.json()
      else
          return <p>No data Found</p>
    }).then(resdata => {
        console.log(resdata)
        this.setState({
            dataUser: resdata,
            totalData: resdata.length
        })
    }).catch(err => {
        console.log(err);
    })
    
  }


  
  
     return (
      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginForm} />
        <Route path="/dashboard" exact component={AllData} />
      </Switch>
    </BrowserRouter>
    );               
  

  
}

export default App;