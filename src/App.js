import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import "./App.css";
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import Profile from "./component/Profile";
import GamesContainer from "./component/GamesContainer";
import Parties from "./component/Parties";
import Edit from "./component/Edit";
import { Dimmer, Loader } from "semantic-ui-react";

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
    pageIndex: 0,
    createParty: "",
    modalOpen: false,
    partyName: "",
    partySize: 0,
    partyDescription: "",
    allParties: [],
    sideBarVisible: false,
    userParties: [],
  }

  leaveGroup = (party, userId) => {
    fetch("http://localhost:3050/removeUser", {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.myJWT}`
  },
  body: JSON.stringify({
     party_id: party.id,
    user_id: userId,
  })
    }).then(res => res.json() )
    .then(response => {
  

     console.log("Remove", response.party)
     let newUserParties = [...this.state.userParties]
     let array = []
     for (var i = 0; i < newUserParties.length; i++) {
       if (newUserParties[i].id !== response.party.id)
        array.push(newUserParties[i])
     }
//Messy looking for loop but works without bugs.. for now..
      this.setState(prevState=>{
        return{
          userParties: array
        }
      })
  })
  }
  ///////////////
  joinGroup = (party, userId) => {
    console.log("Join userID",userId, "to party",party)
    fetch(`http://localhost:3050/addUser`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.myJWT}`
  },
  body: JSON.stringify({
    party_id: party.id,
    user_id: userId,
  })
 }).then(res => res.json() )
 .then(response => this.setState(prevState=>{ 
  return {
        userParties: [...prevState.userParties, response.party]
         }
        }
       )
 )

  }
  handleSidebarHide = () => this.setState({ sideBarVisible: false })
  handleHideClick = () => this.setState({ sideBarVisible: false })
  handleShowClick = () => this.setState({ sideBarVisible: true })
  ///////////////
  handleModalOpen = () => this.setState({ modalOpen: true })

  handleModalClose = (user, game) => {
   this.setState({ modalOpen: false })
   console.log("Form will be submitted with this game", game)
   console.log("new user party", user, game)
   //Now creates a new party
 fetch(`http://localhost:3050/parties`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.myJWT}`
  },
  body: JSON.stringify({
    gameId: game.id,
    userId: user.id,
    partySize: this.state.partySize,
    partyName: this.state.partyName,
    partyDescription: this.state.partyDescription,
  })
 }).then(res => res.json() )
 .then(party => this.setState(prevState=>{return{
  
  allParties: [...prevState.allParties, party],
  userData: {
    ...prevState.userData,
    owned_parties: [...prevState.userData.owned_parties, party]}

 }
  
 }))
}



  //////////////
  pageIndexRight = () => {
    this.setState(prevState => {
      return { pageIndex: prevState.pageIndex + 10 };
    });
  };
  /////////////

  pageIndexLeft = () => {
    if (this.state.pageIndex === 0) return null;
    else
      this.setState(prevState => {
        return { pageIndex: prevState.pageIndex - 10 };
      });
  };


 ////////////////////////

  removeGameFromProfile = game => {
    let user = this.state.userData;
    let testForGame = user.games.map(g => g.id === game.id);
    if (testForGame.includes(true)) {
      fetch(`http://localhost:3050/removeGame`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.myJWT}`
        },
        body: JSON.stringify({
          game: game,
          user: user
        })
      })
        .then(res => res.json())
        .then(user =>
          this.setState({
            userData: user
          })
        );
    } else {
      console.log("game not in collection");
    }
  };

  ///////////////////////
  addGameToProfile = game => {
    let user = this.state.userData;
    console.log(game);
    fetch(`http://localhost:3050/addGame`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.myJWT}`
      },
      body: JSON.stringify({
        game: game,
        user: user
      })
    })
      .then(res => res.json())
      .then(user =>
        this.setState({
          userData: user,

        })
      );
  };
  ///////////////////////
  onGameClick = props => {
    this.setState({
      selectedGame: props
    });
  };
  ///////////////////////
  filterChange = e => {
    this.setState({
      filter: e.target.value
    });
  };

  filterByGame = filter => {
    let allGames = [...this.state.allGames];
    const games = allGames.filter(game =>
      game.name.toLowerCase().includes(filter.toLowerCase())
    );
    return games;
  };
  //////////////////////////
  componentDidMount() {
   

    if (localStorage.myJWT) {
      fetch("http://localhost:3050/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.myJWT}`
        }
      }).then(res => {
        if (!res.ok) {
          console.log("not logged in", res);
        }

        return res.json().then(res =>
          this.setState({
            userData: res.user,
            userParties: res.user.parties
          })
        );
      });
    }

    fetch("http://localhost:3050/parties")
    .then(res => res.json())
    .then(response=> {
      this.setState({
        allParties:response
      })
    })

     fetch("http://localhost:3050/games")
      .then(res => res.json())
      .then(response => {
        this.setState({
          allGames: response,
          loading: false
        });
      });
  }
  //////////////////////////
  logOut = () => {
    localStorage.removeItem("myJWT");
    this.setState(
      {
        userData: null,
        userParties: [],
      }
    )
    this.props.history.push("/login");

  };

  /////////////////////////
  registerFormControl = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  /////////////////////////
  editSubmit = user => {
    fetch(`http://localhost:3050/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.myJWT}`
      },
      body: JSON.stringify({
        user: user
      })
    })
      .then(res => res.json())
      .then(() => this.props.history.push("/profile"));
  };

  formControl = event => {
    let attribute = event.target.name;
    let value = event.target.value;
    let newUserData = { ...this.state.userData };
    newUserData[attribute] = value;

    this.setState({
      userData: newUserData
    });
  };
  /////////////////////////
  onRegisterFormSubmit = props => {
    if (props.password === props.confirmPassword) {
      fetch("http://localhost:3050/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          user: {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
          }
        })
      })
        .then(res => {
          if (!res.ok) {
            const error = new Error(res);
            error.message = res.statusText;
            error.name = res.status;
            throw error;
          }
          return res
            .json()
            .then(userData => {
              localStorage.setItem("myJWT", userData.jwt);
              this.setState({
                userData: userData.auth
              });
            })
            .then(() => this.props.history.push("/login"));
        })
        .catch(err => {
          alert("password does not match or server Error");
        });
    }
  };

  /////////////////////////////

  loginSubmit = props => {
    fetch("http://localhost:3050/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username: props.username,
        password: props.password
      })
    })
      .then(res => {
        if (!res.ok) {
          const error = new Error(res);
          error.message = res.statusText;
          error.name = res.status;
          throw error;
        }
        return res.json().then(userData => {
          localStorage.setItem("myJWT", userData.jwt);
          console.log("Auth here",userData.auth.parties)
          this.setState({
            userData: userData.auth,
            userParties: userData.auth.parties
          });
        });
      })
      .catch(err => {
        console.log("Error here",err)
        alert("Incorrect username or password");

      }).then(() => this.props.history.push("/login"));
  };

  render() {
    const {
      selectedGame,
      loading,
      filter,
      userData,
      username,
      password,
      pageIndex,
      modalOpen,
      createParty,
      partyDescription,
      partyName,
      partySize,
      allParties,
      userParties,
      sideBarVisible,
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
      <Route path="/games" render={()=>{return userData ? <GamesContainer
        filterChange={this.filterChange}
        filterValue={filter}
        allGames={this.filterByGame(filter)} 
        onGameClick={this.onGameClick}
        selectedGame={selectedGame}
        addGameToProfile={this.addGameToProfile}
        removeGameFromProfile={this.removeGameFromProfile}
        pageIndex={pageIndex}
        pageIndexLeft={this.pageIndexLeft}
        pageIndexRight={this.pageIndexRight}/> :
        <Redirect from="/games" to="/login" />
        }} />
      <Route path="/parties" render={()=> {return userData ? <Parties 
        leaveGroup={this.leaveGroup}
        joinGroup={this.joinGroup}
        sideBarVisible={sideBarVisible}
        handleShowClick={this.handleShowClick}
        handleSidebarHide={this.handleSidebarHide}
        handleHideClick={this.handleHideClick}
        allParties={allParties}
        currentUserId={userData.id} 
        currentUserParties={userParties}
        currentUserOwnedParties={userData.owned_parties} 
         /> : <Redirect from="/parties" to="/login" />}} />
        
         
      <Route path="/edit" render={()=>{return userData ? 
        <Edit formControl={this.formControl}
        userData={userData} 
        loggedIn={userData}
        handleEdit={this.editSubmit}/> : <Redirect from="/edit" to="/login" />} } />
      <Route path="/profile" render={()=>{return userData ? <Profile 
        currentUserOwnedParties={userData.owned_parties} 
        currentUserParties={userParties}
        registerFormControl={this.registerFormControl}
        partyName={partyName}
        partySize={partySize}
        partyDescription={partyDescription}
        createNewUserParty={this.createNewUserParty}
        handleModalOpen={this.handleModalOpen}
        handleModalClose={this.handleModalClose}
        modalOpen={modalOpen}
        createPartyName={createParty}
        removeGameFromProfile={this.removeGameFromProfile}
        userData={userData}/> : <Redirect from="/parties" to="/login" />} }/>
       
      <Route path="/" component={Home} />
       

      </Switch>}
   
    </div>

    )}
  
}

export default withRouter(App);
