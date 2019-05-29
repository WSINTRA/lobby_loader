import React from 'react'
import { Grid, Menu, Image, Sidebar, Segment, Container, Header, Card, Icon, Button } from 'semantic-ui-react'
import StackGrid from "react-stack-grid";
function Parties(props) {

return (
    <div> <Container>
    
    <Button.Group>
          <Button disabled={props.sideBarVisible} onClick={props.handleShowClick}>
            Show Options
          </Button>
          <Button disabled={!props.sideBarVisible} onClick={props.handleHideClick}>
            Hide Options
          </Button>
        </Button.Group>
   <Grid >
    <Grid.Row columns={2}>
     <Grid.Column>
        <Segment>
        <Header>Parties I own</Header>
        <Container>
        {props.currentUserOwnedParties.map(party => 
          <React.Fragment key={party.id}>
        <Sidebar.Pushable as={Card}>
        <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={props.handleSidebarHide}
            vertical
            visible={props.sideBarVisible}
            width='thin'
          >
            <Menu.Item as='a'>
            <Header inverted color='olive'>{party.name}</Header>
              <Icon name='warning sign' />
              Delete Party
            </Menu.Item>
           
          </Sidebar>
    <Sidebar.Pusher>        
    <Card>
    <Card.Content header={party.name} />
    <Card.Content> {party.description}
    <br/></Card.Content>
    <Card.Content extra>
      <Icon name='user' />
      Max Size {party.partysize}
    </Card.Content>
    </Card>
    </Sidebar.Pusher>
    </Sidebar.Pushable>
    </React.Fragment>)}
        </Container>
      </Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment>
        <Header>Parties I'm in</Header>
        <Container>
        {
           props.currentUserParties.map(party => 
        	<React.Fragment key={party.id}>
            <Sidebar.Pushable as={Card}>
            <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={props.handleSidebarHide}
            vertical
            visible={props.sideBarVisible}
            width='thin'
                            >
            <Menu.Item as='a' onClick={()=>props.leaveGroup(party, props.currentUserId)}>
            <Header inverted color='olive'>{party.name}</Header>
              <Icon name='frown outline' />
              Leave Party
            </Menu.Item>
    
          </Sidebar>
    <Sidebar.Pusher>        
    <Card>
    <Card.Content header={party.name} />
    <Card.Content> {party.description}
    <br/></Card.Content>
    <Card.Content extra>
      <Icon name='user' />
      Max Size {party.partysize}
             </Card.Content>
           </Card>
            </Sidebar.Pusher>
             </Sidebar.Pushable>
    </React.Fragment>
  ) }
        </Container>
      </Segment>
    </Grid.Column>
    </Grid.Row>
    <Grid.Row columns={4}>
     
      <Segment>
      <Grid.Column>
        <Header>Available Parties</Header>
        <Container>
        <StackGrid >
         {props.allParties.map(party => 
            <React.Fragment key={party.id}>
        
    <Sidebar.Pushable as={Card}>
     <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={props.handleSidebarHide}
            vertical
            visible={props.sideBarVisible}
            width='thin'
          >
            <Menu.Item as='a' onClick={()=>props.joinGroup(party, props.currentUserId)}>
            <Header inverted color='olive'>{party.name}</Header>
              <Icon name='smile outline'  />
              Join Party
            </Menu.Item>
           
          </Sidebar>
    <Sidebar.Pusher>  
            <Card>
            
    <Card.Content header={party.name} />
   <Card.Content><h4>Owner : {party.user.username}</h4> {party.description}
    <br/></Card.Content>
    <Card.Content extra>
      <Icon name='user' />
      Capacity {party.partysize}
    </Card.Content>
    <Card.Content extra>
      <Icon name='user' />
      Current Size {party.users.length}
    </Card.Content>
  </Card>
   </Sidebar.Pusher>
    </Sidebar.Pushable>
    </React.Fragment>
    )}</StackGrid>
        </Container>
        </Grid.Column>
      </Segment>
    </Grid.Row>
  </Grid>
   </Container>
    </div>
	);
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