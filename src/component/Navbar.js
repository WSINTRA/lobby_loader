import React from 'react'
import { Input, Icon,Button, Menu } from 'semantic-ui-react'
import {Link, NavLink } from 'react-router-dom'

function Navbar(props) {

return (
     <Menu icon='labeled'>
        <Menu.Item name='gamepad' >
          
          <Icon name='gamepad' />
          Games
        </Menu.Item>

       
          
          
        
        {props.loggedIn ?  
        <Menu.Item name='profile' >
        <Icon name='user' />
          Profile
        </Menu.Item> : null
        }

        <Menu.Item
          name='Parties'
        >
          <Icon name='group' />
          Parties
        </Menu.Item>

       

    <Menu.Item position='right'>
      <Link to="/register">
      <Button primary>Sign up</Button>
      </Link>
      </Menu.Item>
      <Menu.Item>
      <Link to="/login">
      <Button>Log-in</Button>
      </Link>
      </Menu.Item>

 
      </Menu>
	);
}

export default Navbar;

