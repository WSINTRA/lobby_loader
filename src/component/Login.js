import React from 'react';
import { Container, Button, Input, Divider, Icon, Grid, Segment } from 'semantic-ui-react'

function Login(props) {

return (
    <div> 
    
    <Container>

    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Segment stacked>
    <h1> Login Form </h1>
    <label>Username </label>
     <Input iconPosition='left'placeholder='Username' >
      <Icon name="user" />
    <input name="username"onChange={(e)=>props.loginFormControl(e)}type="text" placeholder="username" value={props.username}/>
    </Input><br/><label>Password </label>
    <Input iconPosition='left'placeholder="Password">
    <Icon name ="lock" />
    <input name="password"onChange={(e)=>props.loginFormControl(e)}type="password" placeholder="password" value={props.password}/>
    </Input><br/>
    <Button  onClick={(e)=>props.submit(props)}>Login</Button>
     </Segment>
    </Grid.Column>
    </Grid>
    </Container>
    </div>
	);
}

export default Login;
