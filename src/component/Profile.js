
import React from 'react'
import { Header, Form, Modal,Button, Grid, Container,  Image, Icon, Divider, Popup } from 'semantic-ui-react'
import {Link,  Redirect } from 'react-router-dom'


function Profile(props) {



return (
  <React.Fragment>
  {props.userData ? <Container>
   <Grid celled>
    <Grid.Row>
      <Grid.Column width={3}>
        {props.userData.image_url === null ? <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> : 
    <Image circular src={props.userData.image_url} />} 
      </Grid.Column>
      <Grid.Column width={13}>
       <h1>Welcome {props.userData.username}</h1><Link from="/profile" to="/edit"><h4 position="right">Edit profile</h4></Link>
       <p>{props.userData.bio}</p>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={3}>
        <p>{props.userData.tag_line}</p>
      </Grid.Column>
      <Grid.Column width={10}>
        <h3>Games in your collection</h3>
        {props.userData.games.map(game => <React.Fragment key={game.id}>
          <h4>{game.name}</h4>
          
        <Modal
        trigger={<Button onClick={props.handleModalOpen}>Create New Party</Button>}
        open={props.modalOpen}
        onClose={props.handleModalClose}
        basic
        size='small'
      >
        <Header icon='group' content='New Party Time !' />
        <Modal.Content>
           <Form>
    <Form.Field>
      <label>Name</label>
      <input name="partyName"placeholder='Party Name' onChange={(e)=>props.registerFormControl(e)}value={props.partyName}/>
    </Form.Field>
     <Form.Field>
      <label>Size</label>
      <input name="partySize"placeholder='Party Size' onChange={(e)=>props.registerFormControl(e)} value={props.partySize}/>
    </Form.Field>
     <Form.Field>
      <label>Description</label>
      <input name="partyDescription"placeholder='Party Description' onChange={(e)=>props.registerFormControl(e)} value={props.partyDescription} />
    </Form.Field>
  </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={()=>props.handleModalClose(props.userData,{...game})} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
      
      <Divider/>
          </React.Fragment> )}
      </Grid.Column>
      <Grid.Column width={3}>
         <Icon size="big"
              name='group' /> 
              Parties I own
              {props.currentUserOwnedParties ? 
                props.currentUserOwnedParties.map(party =>  
                <h4>{party.name}</h4>) : <h5>Add some games and create a party</h5>}
               <Divider/>
               <Icon size="big"
              name='group' /> Parties I'm in'
              {props.currentUserParties ? 
                props.currentUserParties.map(party => 
                <h4>{party.name}</h4>) : <h5>Join some parties</h5>}
      </Grid.Column>
    </Grid.Row>
  </Grid>
   </Container> : <Redirect from="/profile" to="/login" />}
	
	</React.Fragment>
	);
}


export default Profile;


 // <Popup content='Remove game from profile' trigger={<Icon size="big"
 //      name="thumbs down outline"
 //      onClick={()=>props.removeGameFromProfile({...game})}/>} />
          
 //             <Popup content='Create a new party for this game' trigger={ 
              
 //              <Icon size="big"
 //              name='group' 
 //              onClick={()=>props.createNewUserParty(props.userData, {...game})}/>} />


