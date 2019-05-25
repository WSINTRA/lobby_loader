import React from 'react'
import GameCard from './GameCard'
import { Input, Label, Menu, Grid } from 'semantic-ui-react'

function Games(props) {
let random = Math.floor( Math.random() * props.allGames.length - 30 )
return (
    <Grid columns={2} relaxed='very'divided>
    <Grid.Column width={3}>
    <Menu vertical>
    <Menu.Item>
      <Input onChange={props.filterChange}value={props.filterValue}className='icon' icon='search' placeholder='Filter by name...' />
    </Menu.Item>
  </Menu>
  </Grid.Column>
    
    <Grid.Column>
    <h1>GAMES </h1>
    <div className="ui grid three column grid">
    {props.allGames.length < 20 ? 
    props.allGames.map(game => <GameCard game={game} /> )  :
    props.allGames.slice(random, random + 30).map(game => <GameCard game={game} /> ) 
      }
    </div>
    </Grid.Column>
    </Grid>
	);
}

export default Games;