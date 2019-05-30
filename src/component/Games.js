import StackGrid from "react-stack-grid";
import GameCard from "./GameCard"
import React from "react";
import { List, Image, Icon, Segment } from "semantic-ui-react";

export default class Games extends React.Component {


	render() {


		return (
			<div className="gameShow" >
			{this.props.gridView ? 
			<StackGrid columnWidth={250}>
				{this.props.allGames.length < 20
					? this.props.allGames.map((game, idx) => (

								<GameCard
									key={game.id}
									onGameClick={this.props.onClick}
									game={game}
								/>

					  ))
					: this.props.allGames
							.slice(
								this.props.pageIndex,
								this.props.pageIndex + 24
							)
							.map((game, idx) => (

									<GameCard
										key={game.id}
										onGameClick={this.props.onClick}
										game={game}
									/>

							))}
			</StackGrid> : 
			<List>
			 {this.props.allGames.length < 20
					? this.props.allGames.map((game, idx) => (
						<Segment key={game.id}>
                                <List.Item onClick={()=>this.props.onClick(game)}>
                                 <Image avatar src={game.coverimages.length < 1 ? 
                                 	"https://www.nocowboys.co.nz/images/v3/no-image-available.png" :
                                      game.coverimages[0].original_url} /><br/>
                                      <List.Content>
                                      <List.Header as='a'>{game.name}</List.Header>
								  </List.Content>
                                </List.Item>
                                </Segment>

					  )) : this.props.allGames
							.slice(
								this.props.pageIndex,
								this.props.pageIndex + 24
							)
							.map((game, idx) => (
                                     <Segment key={game.id}>
									<List.Item  onClick={()=>this.props.onClick(game)}>
                                 <Image avatar src={game.coverimages.length < 1 ? 
                                 	"https://www.nocowboys.co.nz/images/v3/no-image-available.png" :
                                      game.coverimages[0].original_url} /><br/>
                                      <List.Content>
                                      <List.Header as='a'>{game.name}</List.Header>
                                      <List.Description>
                                         {game.summary}
                                      </List.Description>
								  </List.Content>
                                </List.Item>
                                   </Segment>
							))}
    
                 </List>
		}

			 
			</div>
		);
	}
}
//grid layout

//list layout

/**

			<List.Item>
      <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
      <List.Content>
        <List.Header as='a'>Rachel</List.Header>
        <List.Description>
          Last seen watching{' '}
          <a>
            <b>Arrested Development</b>
          </a>{' '}
          just now.
        </List.Description>
      </List.Content>
    </List.Item>
**/