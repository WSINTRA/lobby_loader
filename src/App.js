import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import './App.css';
import Login from './component/Login'
import Register from './component/Register'
import Home from './component/Home'
import Navbar from './component/Navbar'
import Profile from './component/Profile'
import Games from './component/Games'
import Parties from './component/Parties'
import Edit from './component/Edit'
import { Dimmer, Loader } from 'semantic-ui-react'

class App extends React.Component {

  state = {
    loading: true,
    username: "",
    password: "",
    email: "",
    confirmPass: "",
    userData: null,
    allGames: [],
    filter: "",
    selectedGame: "",
  }

 ///////////////////////
 removeGameFromProfile = (props) => {
  console.log("Remove game from the user profile")
 }
 ///////////////////////
 addGameToProfile = (props) => {
  console.log("Add game to the user profile")
 }
  ///////////////////////
  onGameClick = (props) => {
  this.setState({
    selectedGame: props
  })
  }
  ///////////////////////
   filterChange = (e) => {
      this.setState({
      filter:e.target.value
    })
  }

  filterByGame = (filter) => {
  let allGames = [...this.state.allGames]
  const games = allGames.filter(game=> game.name.toLowerCase().includes(filter.toLowerCase()))
  return games
}
//////////////////////////
componentDidMount(){
fetch('http://localhost:3050/games')
.then(res => res.json()
).then(response=> {
  this.setState({
     allGames: response,
     loading: false
  })
})

if (localStorage.myJWT) {
fetch('http://localhost:3050/profile', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.myJWT}`
  }
})
.then(res => {
  if (!res.ok) {
  console.log("not logged in",res)
     }

return res.json()
.then(res => 

    this.setState({
          
           userData: res.user,
           }) 
    )
  }
 )
}
}
//////////////////////////
logOut = () => {
  localStorage.removeItem('myJWT')
  this.setState({
    userData: null
  }, () => this.props.history.push("/home")
  )
  
}

/////////////////////////
  registerFormControl = (event) =>{
  
    this.setState({
      [event.target.name]: event.target.value
    })
  }
/////////////////////////
editSubmit = (user) => {

fetch(`http://localhost:3050/users/${user.id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.myJWT}`
  },
  body: JSON.stringify({
    user: user
  })
})
.then(res=> res.json())
  .then( () => this.props.history.push("/profile") )
}

formControl = (event) =>{
  let attribute = event.target.name
  let value = event.target.value
  let newUserData = {...this.state.userData}
  newUserData[attribute] = value

    this.setState({
     userData: newUserData
      }
    )
  }
/////////////////////////
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
       
       userData: userData.auth
     } )

     } ).then( () => this.props.history.push("/login") )

      })
     .catch((err) => {
         alert("Incorrect username or password")
       });
     }
    }

/////////////////////////////

loginSubmit=(props)=>{
fetch('http://localhost:3050/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
    },
  body: JSON.stringify( {'username':props.username, 'password':props.password  })
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
       
       userData: userData.auth
     } )
     } )
      })
.catch((err) => {
    alert("Incorrect username or password")
  });
}

  render () {
    const { 
      selectedGame, 
      loading, 
      filter,  
      userData, 
      username, 
      password, 
      confirmPass } = this.state
  return (

     <div>
      <Navbar logout={this.logOut}loggedIn={userData}/>
     {loading ? 

      <Dimmer active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>
     :

    
     <Switch>
     <Route path="/register" render={()=> {return !userData ?
     <Register 
      submit={this.onRegisterFormSubmit}
      registerFormControl={this.registerFormControl}
      username={username} 
      confirmPassword={confirmPass}
      password={password} /> : <Redirect from="/register" to="/" />}}/>
      <Route path="/login" render={()=> <Login 
      loggedIn={userData}
      submit={this.loginSubmit}
      loginFormControl={this.registerFormControl}
      username={username}  
      password={password} />} />
      <Route path="/games" render={()=>{return <Games 
        filterChange={this.filterChange}
        filterValue={filter}
        allGames={this.filterByGame(filter)} 
        onGameClick={this.onGameClick}
        selectedGame={selectedGame}
        addGameToProfile={this.addGameToProfile}
        removeGameFromProfile={this.removeGameFromProfile}/>
        }} />
      <Route path="/parties" component={Parties} />
      <Route path="/edit" render={()=>{return <Edit formControl={this.formControl}userData={userData} loggedIn={userData}handleEdit={this.editSubmit}/>} } />
      <Route path="/profile" render={()=>{return <Profile userData={userData}/>} } />
      <Route path="/" component={Home} />
       

      </Switch>}
   
    </div>

    )}
  
   
    
}

export default withRouter(App);
