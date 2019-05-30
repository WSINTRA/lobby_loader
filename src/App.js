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
        partySize: "",
        partyDescription: "",
        allParties: [],
        sideBarVisible: false,
        userParties: [],
        allMessages: [],
        relevantParties: []
    }

    resetUserData = () => {
        this.setState({
            username: "",
            password: "",
            email: "",
            confirmPass: "",
            userData: null,
            filter: "",
            selectedGame: "",
            pageIndex: 0,
            createParty: "",
            partyName: "",
            partySize: 0,
            partyDescription: "",
            userParties: [],
            relevantParties: []
        })
    }

    leaveGroup = (party, userId) => {
        fetch("http://localhost:3050/removeUser", {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.myJWT}`
            },
            body: JSON.stringify({
                party_id: party.id,
                user_id: userId,
            })
        }).then(res => res.json())
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


    joinGroup = (party, userId) => {
        console.log("Join userID",userId, "to party",party)
        fetch(`http://localhost:3050/addUser`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.myJWT}`
            },
            body: JSON.stringify({
                party_id: party.id,
                user_id: userId,
            })
        }).then(res => res.json())
            .then(response => {
                let newRelevantParties = [...this.state.relevantParties].filter(partay=>{
                    return partay.id !== response.party.id
                })
                this.setState(prevState=>{ 
                return {
                    userParties: [...prevState.userParties, response.party],
                    relevantParties: newRelevantParties
                }
            })
        })
    }

    handleSidebarHide = () => this.setState({ sideBarVisible: false })
    handleHideClick = () => this.setState({ sideBarVisible: false })
    handleShowClick = () => this.setState({ sideBarVisible: true })
    handleModalOpen = () => this.setState({ modalOpen: true })

    handleModalClose = (user, game) => {
        this.setState({ modalOpen: false })
        console.log("Form will be submitted with this game", game)
        console.log("new user party", user, game)

        fetch(`http://localhost:3050/parties`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
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
        }).then(res => res.json())
            .then(party => this.setState(prevState=>{
                return {
                    allParties: [...prevState.allParties, party],
                    userData: {
                        ...prevState.userData,
                        owned_parties: [...prevState.userData.owned_parties, party]
                    }
                }
            }))
    }



  //////////////
    pageIndexRight = () => {
        if (this.state.pageIndex < (this.state.allGames.length - 10 )){
            this.setState(prevState => {
          return { 
            pageIndex: prevState.pageIndex + 10 
            };
        });
        }
        else 
            return alert("End of games list");
        
    }
  /////////////

    pageIndexLeft = () => {
        if (this.state.pageIndex === 0) 
            return null
        else
            this.setState(prevState => {
                return { 
                    pageIndex: prevState.pageIndex - 10 
                };
            });
    }


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
        }).then(res => res.json())
            .then(user => this.setState({userData: user}))
        } else {
            console.log("game not in collection");
        }
    }

  ///////////////////////
    addGameToProfile = game => {
        let user = this.state.userData;
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
        }).then(res => res.json())
        .then(user => {
            this.setState({
                userData: user
            })
        }).then(()=>this.setRelevantUserParties())
        alert("Game added to profile page")
    }
  ///////////////////////
    onGameClick = props => { this.setState({selectedGame: props}) }
  ///////////////////////
    filterChange = e => { this.setState({filter: e.target.value}) }

    filterByGame = filter => {
        let allGames = [...this.state.allGames];
        const games = allGames.filter(game =>
            game.name.toLowerCase().includes(filter.toLowerCase())
        )
        return games
    }
  //////////////////////////
  // Fetches all parties and games
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
                return res.json()
            }).then(res => {
                // debugger
                    this.setState({
                    userData: res.user,
                    userParties: res.user.parties
                })
            })  
        }

        fetch("http://localhost:3050/parties")
            .then(res => res.json())
                .then(partiesFromDb=> {
                    this.setState( {allParties:partiesFromDb} )
                })

        this.getMessages()

        fetch("http://localhost:3050/games")
            .then(res => res.json())
                .then(gamesFromDb => {
                    this.setState({
                        allGames: gamesFromDb,
                        loading: false
                })
            })
    }
  //////////////////////////
    logOut = () => {
        localStorage.removeItem("myJWT")
            // this.setState({
            //     userData: null,
            //     userParties: [],
            // })
        this.resetUserData()
        this.props.history.push("/login")
    }

  /////////////////////////
    registerFormControl = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
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
        }).then(res => res.json())
            .then(() => this.props.history.push("/profile"))
    }

    getMessages = () => {
        fetch("http://localhost:3050/messages")
            .then(res => res.json())
                .then(messages=> {
                    this.setState( {allMessages:messages} )
         })
    }

    formControl = event => {
        let attribute = event.target.name
        let value = event.target.value
        let newUserData = { ...this.state.userData }
        newUserData[attribute] = value
        this.setState( {userData: newUserData} )
    }

    setRelevantUserParties = () => {
        let releParties = this.getRelevantUserParties()
        // debugger
        this.setState({
            relevantParties: releParties
        })        
    }


    getRelevantUserParties = () => {
        let ownedParties = [...this.state.userData.owned_parties].map(party => {
            return party.id
        })
        let joinedParties = [...this.state.userData.parties].map(party => {
            return party.id
        })
        let ownedGames = [...this.state.userData.games].map(game => {
            return game.id
        })
        let allParties = [...this.state.allParties].filter(party=> {
            if(!ownedParties.includes(party.id) || !joinedParties.includes(party.id)) {
                if(ownedGames.includes(party.game.id)) {
                    return party
                }
            }
        })
        return allParties
    }

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
            }).then(res => {
                // debugger
                if (!res.ok) {
                    const error = new Error(res);
                    error.message = res.statusText;
                    error.name = res.status;
                    throw error;
                }
                return res.json()
                }).then(userData => {
                    localStorage.setItem("myJWT", userData.jwt)
                    this.setState( {userData: userData.auth} )
                }).then(() => this.props.history.push("/login"))
                    .catch(err => {
                        alert("password does not match or server Error");
                    })
        } else {
            alert("Your passwords do not match")
        }
    }

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
        }).then(res => {
            if (!res.ok) {
                const error = new Error(res)
                error.message = res.statusText
                error.name = res.status
                throw error
            }
            return res.json()
        }).then(userData => {
            localStorage.setItem("myJWT", userData.jwt)
            console.log("Auth here",userData.auth.parties)
            this.setState({
                userData: userData.auth,
                userParties: userData.auth.parties
            })
            this.setRelevantUserParties()
        }).then(()=> this.setRelevantUserParties())
            .catch(err => {
            console.log("Error here",err)
            alert("Incorrect username or password");
        }).then(() => this.props.history.push("/login"));
    }

    addMessage = content => {
        content.user_id = this.state.userData.id
        fetch("http://localhost:3050/addMessage", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.myJWT}`
            },
            body: JSON.stringify({content})
        }).then(res => res.json())
            .then(e => {
                this.getMessages()
            })
    }

    renderRegisterPage = () => {
        return !this.state.userData ?
                    <Register 
                        submit={this.onRegisterFormSubmit}
                        registerFormControl={this.registerFormControl}
                        username={this.state.username} 
                        confirmPassword={this.state.confirmPass}
                        password={this.state.password} /> 
                    : 
                    <Redirect from="/register" to="/" />
    }
    renderLoginPage = () => {
        return <Login 
                    loggedIn={this.state.userData}
                    submit={this.loginSubmit}
                    loginFormControl={this.registerFormControl}
                    username={this.state.username}  
                    password={this.state.password} 
                />
    }
    renderGamesPage = () => {
        return this.state.userData ? 
                <GamesContainer
                    filterChange={this.filterChange}
                    filterValue={this.state.filter}
                    allGames={this.filterByGame(this.state.filter)} 
                    onGameClick={this.onGameClick}
                    selectedGame={this.state.selectedGame}
                    addGameToProfile={this.addGameToProfile}
                    removeGameFromProfile={this.removeGameFromProfile}
                    pageIndex={this.state.pageIndex}
                    pageIndexLeft={this.pageIndexLeft}
                    pageIndexRight={this.pageIndexRight}/> 
                :
                    <Redirect from="/games" to="/login"/>     
    }
    renderPartiesPage = () => {
        return this.state.userData ? <Parties 
                    leaveGroup={this.leaveGroup}
                    joinGroup={this.joinGroup}
                    sideBarVisible={this.state.sideBarVisible}
                    handleShowClick={this.handleShowClick}
                    handleSidebarHide={this.handleSidebarHide}
                    handleHideClick={this.handleHideClick}
                    allParties={this.state.allParties}
                    relevantParties={this.state.relevantParties}
                    currentUserId={this.state.userData.id} 
                    currentUserParties={this.state.userParties}
                    currentUserOwnedParties={this.state.userData.owned_parties}
                    addMessage={this.addMessage} 
                    allMessages={this.state.allMessages}/> 
                : 
                    <Redirect from="/parties" to="/login" />
    }
    renderEditPage = () => {
        return this.state.userData ? 
                    <Edit formControl={this.formControl}
                    userData={this.state.userData} 
                    loggedIn={this.state.userData}
                    handleEdit={this.editSubmit} /> 
                : 
                    <Redirect from="/edit" to="/login" />
    }
    renderProfilePage = () => {
        return this.state.userData ? <Profile 
                    currentUserOwnedParties={this.state.userData.owned_parties} 
                    currentUserParties={this.state.userParties}
                    registerFormControl={this.registerFormControl}
                    partyName={this.state.partyName}
                    partySize={this.state.partySize}
                    partyDescription={this.state.partyDescription}
                    createNewUserParty={this.createNewUserParty}
                    handleModalOpen={this.handleModalOpen}
                    handleModalClose={this.handleModalClose}
                    modalOpen={this.state.modalOpen}
                    createPartyName={this.state.createParty}
                    removeGameFromProfile={this.removeGameFromProfile}
                    userData={this.state.userData} /> 
                : <Redirect from="/parties" to="/login" />
    }
    pageIsLoading = () => {
        return <Dimmer active><Loader size='massive'>Loading</Loader></Dimmer>
    }
    pageIsLoaded = () => {
        return <Switch>
                    <Route path="/register" render={this.renderRegisterPage} />
                    <Route path="/login" render={this.renderLoginPage}/>
                    <Route path="/games" render={this.renderGamesPage} />
                    <Route path="/parties" render={this.renderPartiesPage} />
                    <Route path="/edit" render={this.renderEditPage} />
                    <Route path="/profile" render={this.renderProfilePage}/>
                    <Route path="/" component={Home} />
                </Switch>
    }

    render() {
        return (
            <div>
                <Navbar logout={this.logOut}loggedIn={this.state.userData}/>
                {this.state.loading ? this.pageIsLoading() : this.pageIsLoaded()}
            </div>

    )}
  
}

export default withRouter(App);
