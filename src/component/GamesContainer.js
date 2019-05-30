import React from "react";
import GameCard from "./GameCard";
import Games from "./Games"
import StackGrid from "react-stack-grid";
import GameShow from "./GameShow"
import { Icon, Input, Menu, Grid } from "semantic-ui-react";

class GamesContainer extends React.Component {


  state = {
    gameInfo: {},
    gameView: false
  }

  previousPage = () => {
    return <h4 style={{ cursor: "pointer", float: "left" }} onClick={() => this.props.pageIndexLeft()} >
          prev page <Icon name="arrow alternate circle left outline" /> </h4>
  }


  nextPage = () => {
    return <h4
          style={{ cursor: "pointer", float: "right" }}
          onClick={() => this.props.pageIndexRight()}
        >
          next page
          <Icon name="arrow alternate circle right outline" />
        </h4>
  }

  viewGame = (game) => {
    // console.log(game)
    this.setState(prevState=>{
      return {
        gameInfo: game,
        gameView: !prevState.gameView
      }
    })
  }

  goBack = () => {
    this.setState(prevState=>{
      return {
        gameInfo: {},
        gameView: !prevState.gameView
      }
    })
  }

  addCurrentGame = () => {
    this.props.addGameToProfile(this.state.gameInfo)
  }

  render() {
  return (
      <React.Fragment>

          {this.state.gameView ? null :
            <div className="mySearch">
            <h1>GAMES</h1>
            {this.previousPage()}
            <Input
              onChange={this.props.filterChange}
              value={this.props.filterValue}
              className="icon"
              icon="search"
              placeholder="Filter by name..."
            />
            {this.nextPage()}
            </div>}
 
          {this.state.gameView ? <GameShow {...this.state.gameInfo} goBack={this.goBack} onAdd={this.addCurrentGame} />: <Games {...this.props} onClick={this.viewGame}/>}

        </React.Fragment>

  );
}
}

export default GamesContainer;

// {this.props.allGames.slice(this.props.pageIndex, this.props.pageIndex + 10).map(game => <GameCard
//   key={game.id}
//   onGameClick={this.props.onGameClick}
//   game={game} /> )
//   }
