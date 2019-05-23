import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './component/Login'
import Register from './component/Register'

class App extends React.Component {

  state = {
    username: "",
    password: "",
    email: "",
    confirmPass: "",
    loggedIn: false,
    userData: [],
  }


  loginFormControl = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onFormSubmit = (props) => {

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
     <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Register submit={this.onFormSubmit}loginFormControl={this.loginFormControl}username={username} confirmPassword={confirmPass}password={password}/>
      </header>
    </div> 

    )}
  
   
    
}

export default App;
