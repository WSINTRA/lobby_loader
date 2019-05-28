import React from "react";
import GameCard from "./GameCard";
import StackGrid from "react-stack-grid";
import { Icon, Input, Menu, Grid } from "semantic-ui-react";

class Games extends React.Component {



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

  render() {
  return (
      <React.Fragment>

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
            </div>
 
        <StackGrid columnWidth={150}>
        {/*<div className="ui link cards fluid">*/}
          {this.props.allGames.length < 20
            ? this.props.allGames.map((game, idx) => (
              <div key={idx}>
                <GameCard
                  key={game.id}
                  onGameClick={this.props.onGameClick}
                  game={game}
                />
                </div>
              ))
            : this.props.allGames
                .slice(this.props.pageIndex, this.props.pageIndex + 10)
                .map((game, idx) => (
                  <div key={idx}>
                  <GameCard
                    key={game.id}
                    onGameClick={this.props.onGameClick}
                    game={game}
                  />
                  </div>
                ))}
        {/*</div>*/}
        </StackGrid>

        <div className="add-game">
          <Icon name="save outline" />
          <strong>Game Collection</strong>
          <br /> <br />
          {this.props.selectedGame.name ? (
            <React.Fragment>
              {this.props.selectedGame.name}
              <br />
              <Icon
                size="big"
                name="thumbs up outline"
                onClick={() => this.props.addGameToProfile(this.props.selectedGame)}
              />
              <Icon
                size="big"
                name="thumbs down outline"
                onClick={() => this.props.removeGameFromProfile(this.props.selectedGame)}
              />
              <br />
              <br />
              <Icon name="group" />
              <strong>Current Parties</strong>
              {/**Show current parties here **/}
            </React.Fragment>
          ) : null}{" "}
        </div>
        </React.Fragment>

  );
}
}

export default Games;

// {this.props.allGames.slice(this.props.pageIndex, this.props.pageIndex + 10).map(game => <GameCard
//   key={game.id}
//   onGameClick={this.props.onGameClick}
//   game={game} /> )
//   }
