import StackGrid from "react-stack-grid";
import GameCard from "./GameCard"
import React from "react";

export default class Games extends React.Component {



	testing = () => {
		debugger
	}


	render() {
		return (
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
			</StackGrid>
		);
	}
}
