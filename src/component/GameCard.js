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
				<h4>THIS WOULD BE A DESCRIPTION</h4></div>
			<div className="extra content">
		      <div className="ui two buttons">
		        <div className="ui basic green button">Create Party</div>
		        <div className="ui basic red button">Join Party</div>
		      </div>
		    </div>
		</div>
	);
}

export default GameCard;
