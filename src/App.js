import React from 'react';
import { Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Login from './component/Login'
import Register from './component/Register'
import Home from './component/Home'
import Navbar from './component/Navbar'


class App extends React.Component {

  state = {
    username: "",
    password: "",
    email: "",
    confirmPass: "",
    loggedIn: false,
    userData: [],
  }


  formControl = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onRegisterFormSubmit = (props) => {

    if(props.password === props.confirmPassword){
    fetch('http://localhost:3050/users', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
    },
   body: JSON.stringify({
    
user: {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }

  })
})
  .then((res) => {
  if(!res.ok) {
     const error = new Error(res)
     error.message = res.statusText
     error.name = res.status
     throw error
   }
return res.json()
.then(userData => {
  localStorage.setItem('myJWT', userData.jwt); 
  this.setState({
       loggedIn: true,
       userDate: userData
     } )
     } ) })
     .catch((err) => {
         alert("Incorrect username or password")
       });
     }
    }


  render () {
    const { username, password, confirmPass } = this.state
  return (

     <div>
     <Navbar/>
     <Switch>
     <Route path="/register" render={()=> <Register 
      submit={this.onRegisterFormSubmit}
      registerFormControl={this.formControl}
      username={username} 
      confirmPassword={confirmPass}
      password={password} />}/>
      <Route path="/login" render={()=> <Login 
      loginFormControl={this.formControl}
      username={username}  
      password={password} />} />
      <Route path="/" component={Home} />
      </Switch>
   
    </div>

    )}
  
   
    
}

export default App;
