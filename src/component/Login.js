import React from 'react';
import {Redirect } from 'react-router-dom'
import { Container, Button, Input, Icon, Grid, Segment,} from 'semantic-ui-react'

function Login(props) {

return (
    <div> 
    {props.loggedIn ? <Redirect from="/login" to="/profile"/> : 
    <Container>

    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    
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
    
    </Grid.Column>
    </Grid>
    </Container>}
    
    </div>
	);
}

export default Login;
