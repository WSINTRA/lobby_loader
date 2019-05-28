import React from "react";
import { Icon, Button, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <Menu icon="labeled">
      <Menu.Item name="home">
        <Icon name="home" />
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item name="gamepad">
        <Icon name="gamepad" />
        <Link to="/games">Games</Link>
      </Menu.Item>

      {props.loggedIn ? (
        <Menu.Item name="profile">
          <Icon name="user" />
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      ) : null}

      <Menu.Item name="Parties">
        <Icon name="group" />
        <Link to="/parties">Parties</Link>
      </Menu.Item>

      <Menu.Item position="right">
        {props.loggedIn ? null : (
          <Link to="/register">
            <Button primary>Sign up</Button>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {props.loggedIn ? (
          <Button onClick={props.logout}>Log-out</Button>
        ) : (
          <Link to="/login">
            <Button>Log-in</Button>
          </Link>
        )}
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
