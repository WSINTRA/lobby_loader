import React from 'react'
import { Grid, Menu, Image, Sidebar, Segment, Container, Header, Card, Icon, Button } from 'semantic-ui-react'
import StackGrid from "react-stack-grid";
import MyParties from './MyParties'
import PartyShow from './PartyShow'

class Parties extends React.Component {

  state = {
    partyInfo: {},
    partyView: false,
    sendMessage: ""
  }

  goBack = () => {
    this.setState(prevState => {
      return {
          partyInfo: {},
          partyView: !prevState.partyView
      }
    })
  }

  selectParty = (partyId) => {
    let party =  this.props.allParties.find(party => {
      return party.id === partyId
    })
    this.setState({
      partyInfo: {...party},
      partyView: true
    })
  }

  addMessage = (event) => {
    let messageBody = {
      party_id: this.state.partyInfo.id,
      content: event.target[0].value
    }
    this.props.addMessage(messageBody)
  }

  render() {
    console.log(this.props)
    return (
        <React.Fragment>
          {this.state.partyView ? <PartyShow goBack={this.goBack} party={this.state.partyInfo} addMessage={this.addMessage} allMessages={this.props.allMessages}/> : <MyParties {...this.props} viewParty={this.selectParty} />}
        </React.Fragment>
    	)
    }
}

export default Parties;

  //       <Card>
  //   <Card.Content header='About Amy' />
  //   <Card.Content description="Some shit" />
  //   <Card.Content extra>
  //     <Icon name='user' />
  //     4 Friends
  //   </Card.Content>
  // </Card>
// 6:
// description: "Grand Theft Auto"
// game: {id: 117, name: "Grand Theft Auto V", summary: "The biggest, most dynamic and most diverse open wo…playing all sides of the game’s interwoven story.", slug_name: "grand-theft-auto-v"}
// id: 7
// name: "GTA PArty"
// partymembers: [{…}]
// partysize: 3
// user: {id: 3, username: "TestUser", email: "sammyshameer62@gmail.com", image_url: null, display_name: null, …}
// users: Array(1)
// 0: {id: 3, username: "TestUser", email: "sammyshameer62@gmail.com", image_url: null, display_name: null, …}
// length: 1
// __proto__: Array(0)
// __proto__: Object

// allParties: Array(8)
// 0: {id: 1, name: "test party", partysize: 4, description: "This is a", user: {…}, …}
// 1: {id: 2, name: "test party", partysize: 4, description: "This is a", user: {…}, …}
// 2: {id: 3, name: "My first Party", partysize: 7, description: "Testing this shit out!", user: {…}, …}
// 3: {id: 4, name: "Walking dead Party", partysize: 7, description: "All those who wanna play", user: {…}, …}
// 4: {id: 5, name: "Apex Party", partysize: 6, description: "Cool shit", user: {…}, …}
// 5: {id: 6, name: "Roots Party", partysize: 3, description: "Come on in", user: {…}, …}
// 6: {id: 7, name: "GTA PArty", partysize: 3, description: "Grand Theft Auto", user: {…}, …}
// 7: {id: 8, name: "Rusty ", partysize: 3, description: "Rusty got high", user: {…}, …}