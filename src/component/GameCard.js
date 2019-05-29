import React from "react";
import { Header as Title } from "semantic-ui-react";

function GameCard(props) {
	const getImage = () => {
		// debugger
		if (props.game.coverimages.length < 1) {
			return "https://www.nocowboys.co.nz/images/v3/no-image-available.png"
			} else {
			 return props.game.coverimages[0].original_url
			}
	}
	return (
		
		<div className="card" onClick={()=>{props.onGameClick(props.game)}}>
			<div className="image">
				<img className="equal" src={getImage()} />
				</div>
			<a className="header">{props.game.name}</a>
			<div className="description"> 
				<h4>{props.game.summary.slice(0,35)}...</h4>
				<h5>click for more details</h5></div>
			
		      
		    </div>
		
	);
}

export default GameCard;
