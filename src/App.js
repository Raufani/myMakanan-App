import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

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

  if(localStorage.getItem("response")){
     return (
    <div className="App">
      <header className="App-header">

        <Router >
            <Switch>
              <div className="app-content">
                
                <LoginForm />
                {
                  <Route path="/dashboard" exact component={AllData} />
                }
                
              </div>
            </Switch>
          </Router >
      </header>
    </div>
    );               
  } 

  
}

export default App;
