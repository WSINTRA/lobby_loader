import React from "react";
import { Icon, Button, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <Menu icon="labeled">
      <Menu.Item name="home">
        <Link to="/home">
        <Icon name="home" size="big" />
        Home</Link>
      </Menu.Item>
      <Menu.Item name="gamepad">
        <Link to="/games">
        <Icon name="gamepad" size="big" />
        Games</Link>
      </Menu.Item>

      <Menu.Item name="Parties">
        <Link to="/parties">
        <Icon name="group" size="big" />
        Parties</Link>
      </Menu.Item>
      
      {props.loggedIn ? (
        <Menu.Item name="profile">
        <Link to="/profile">
          <Icon name="user" size="big" />
          Profile</Link>
        </Menu.Item>
      ) : null}

      <Menu.Item position="right">

        {props.loggedIn ? null : (
          <Link to="/register">
            <Button primary>Sign up</Button>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {props.loggedIn ? (
          <Button onClick={props.logout}>Logout</Button>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
