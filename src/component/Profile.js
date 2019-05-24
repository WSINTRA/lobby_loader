import React from 'react'
import { Grid, Container, Header, Image } from 'semantic-ui-react'
import {Link, NavLink, Redirect } from 'react-router-dom'


function Profile(props) {
console.log(props)
return (
  <fragment>
  {props.userData ? <Container>
   <Grid celled>
    <Grid.Row>
      <Grid.Column width={3}>
        {props.userData.image_url === null ? <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> : 
    <Image circular src={props.userData.image_url} />} 
      </Grid.Column>
      <Grid.Column width={13}>
       <h1>Welcome {props.userData.username}</h1><Link from="/profile" to="/edit"><h4 position="right">Edit profile</h4></Link>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={3}>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column width={10}>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column width={3}>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
   </Container> : <Redirect from="/profile" to="/login" />}
	
	</fragment>
	);
}

export default Profile;