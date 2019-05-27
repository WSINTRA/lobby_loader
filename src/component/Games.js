import React from 'react'
import GameCard from './GameCard'
import { Icon, Input, Menu, Grid } from 'semantic-ui-react'

function Games(props) {

return (
    <Grid columns={3} relaxed='very'divided>
    <Grid.Column width={3}>
    <Menu vertical>
    <Menu.Item>
      <Input onChange={props.filterChange}value={props.filterValue}className='icon' icon='search' placeholder='Filter by name...' />
    </Menu.Item>
  </Menu>
  </Grid.Column>
    
    <Grid.Column width={10}>
    
    <h1>GAMES </h1>
    <h4 style={{cursor:"pointer", float: "left"}} 
    onClick={()=>props.pageIndexLeft(props.pageIndex)}>prev page
    <Icon name="arrow alternate circle left outline"/>
    </h4>
    
    <h4 style={{cursor:"pointer", float: "right"}} 
    onClick={()=>props.pageIndexRight(props.pageIndex)}>next page
    <Icon name="arrow alternate circle right outline"/>
    </h4>
    <div className="fluid-column">
    {props.allGames.slice(props.pageIndex, props.pageIndex + 10).map(game => <GameCard 
      key={game.id}
      onGameClick={props.onGameClick}
      game={game} /> ) 
      }
    </div>
    <h4 style={{cursor:"pointer", float: "left"}} 
    onClick={()=>props.pageIndexLeft(props.pageIndex)}>prev page
    <Icon name="arrow alternate circle left outline"/>
    </h4>
    
    <h4 style={{cursor:"pointer", float: "right"}} 
    onClick={()=>props.pageIndexRight(props.pageIndex)}>next page
    <Icon name="arrow alternate circle right outline"/>
    </h4>
    </Grid.Column>
    <Grid.Column width={1}>
    <div className="add-game"><Icon name="save outline"/><strong>Game Collection</strong><br/> <br/>
    {props.selectedGame.name ? 
      <React.Fragment>{props.selectedGame.name}<br/> 
      <Icon size="big"
      name="thumbs up outline"
      onClick={()=>props.addGameToProfile(props.selectedGame)}/>   
        <Icon size="big"
      name="thumbs down outline"
      onClick={()=>props.removeGameFromProfile(props.selectedGame)}/><br/><br/>
      <Icon name="group"/><strong>Current Parties</strong>
    {/**Show current parties here **/}
      </React.Fragment> : null} </div>
    </Grid.Column>
    </Grid>
	);
}

export default Games;