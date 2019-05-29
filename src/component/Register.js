import React from "react";
import {
  Container,
  Button,
  Input,
  Icon,
  Grid,
  Segment
} from "semantic-ui-react";

function Register(props) {
  return (
    <div>
      <h1> Register New User </h1>
      <Container>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            
              <Input iconPosition="left" placeholder="Email">
                <Icon name="at" />
                <input
                  name="email"
                  onChange={e => props.registerFormControl(e)}
                  type="text"
                  value={props.email}
                />
              </Input>
              <br />

              <Input iconPosition="left" placeholder="Username">
                <Icon name="user" />
                <input
                  name="username"
                  onChange={e => props.registerFormControl(e)}
                  type="text"
                  value={props.username}
                />
              </Input>
              <br />
              <Input iconPosition="left" placeholder="Password">
                <Icon name="lock" />
                <input
                  name="password"
                  onChange={e => props.registerFormControl(e)}
                  type="password"
                  value={props.password}
                />
              </Input>
              <br />
              <Input iconPosition="left" placeholder="Password">
                <Icon name="lock" />
                <input
                  name="confirmPass"
                  onChange={e => props.registerFormControl(e)}
                  type="password"
                  placeholder="confirm password"
                  value={props.confirmPassword}
                />
              </Input>
              <br />
              <Button onClick={e => props.submit(props)}>Register</Button>
           
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

export default Register;
