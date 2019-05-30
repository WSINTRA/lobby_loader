import React from "react";
import { Header as Title, Card, Icon, Image } from "semantic-ui-react";

function GameCard(props) {
	const getImage = () => {
		// debugger
		if (props.game.coverimages.length < 1) {
			return "https://www.nocowboys.co.nz/images/v3/no-image-available.png"
			} else {
			 return props.game.coverimages[0].original_url
			}
	}

	const getDescription = () => {
		if (props.game.summary < 35) {
			return props.game.summary
		} else {
			return props.game.summary.slice(0,35)
		}

	}

	const getGenres = () => {
		return "Genre: " + props.game.genres.map(game=> game.name).join(", ")
	}

	return (

		<Card
			image={getImage()}
			header={props.game.name}
			meta={getGenres()}
			description={getDescription()}
			onClick={()=>{props.onGameClick(props.game)}}
		/>

		
	);
}


export default GameCard;






		// </Card>
		// <div className="card" onClick={()=>{props.onGameClick(props.game)}}>
		// 	<div className="image">
		// 		<img className="equal" src={getImage()} />
		// 		</div>
		// 	<a className="header">{props.game.name}</a>
		// 	<div className="description"> 
		// 		<h4>{props.game.summary < 35 ? props.game.summary : props.game.summary.slice(0,35)}...</h4>
		// 		<h5>click for more details</h5></div>
			
		      
		//     </div>
