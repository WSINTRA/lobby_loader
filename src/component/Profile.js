import React from 'react'
import { Grid, Container,  Image, Icon, Divider, Popup } from 'semantic-ui-react'
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
         <Popup content='Remove game from profile' trigger={<Icon size="big"
      name="thumbs down outline"
      onClick={()=>props.removeGameFromProfile({...game})}/>} />
          
             <Popup content='Create a new party for this game' trigger={ 
              <Icon size="big"
              name='group' />} />
     
      <Divider/>
          </React.Fragment> )}
      </Grid.Column>
      <Grid.Column width={3}>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
   </Container> : <Redirect from="/profile" to="/login" />}
	
	</React.Fragment>
	);
}

export default Profile;