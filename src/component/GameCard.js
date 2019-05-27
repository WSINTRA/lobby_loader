import React from 'react'
import {  Header as Title  } from 'semantic-ui-react'

function GameCard(props) {

return (
	   <div className="game-card-info" 
       onClick={()=>props.onGameClick(props.game)}>
    <Title>{props.game.name}</Title>
    <img className="equal" src={props.game.coverimages.length < 1 ? 
    	"https://www.nocowboys.co.nz/images/v3/no-image-available.png" : props.game.coverimages[0].original_url  } /> 
        {props.game.summary}
     </div>
     

	);
}

export default GameCard;

