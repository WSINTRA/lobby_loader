import React from 'react'
import {  Header as Title , Card, } from 'semantic-ui-react'

function GameCard(props) {
console.log(props)
var firstColStyle = { textAlign: 'center' }
return (
	   <div class="column" style={firstColStyle}>
	  <Card link>
    <Card.Content>
    <img className="equal" src={props.game.coverimages.length < 1 ? 
    	"https://www.nocowboys.co.nz/images/v3/no-image-available.png" : props.game.coverimages[0].original_url  } /> :
    
    
    <Title>{props.game.name}</Title>
    </Card.Content>
     </Card>
     </div>

	);
}

export default GameCard;

/**
game:
coverimages: Array(1)
0: {id: 19, original_url: "https://images.igdb.com/igdb/image/upload/t_original/fihdg4v9kg7unaoq0s9f.jpg", large_url: "https://images.igdb.com/igdb/image/upload/t_720p/fihdg4v9kg7unaoq0s9f.jpg", image_id: "fihdg4v9kg7unaoq0s9f"}
length: 1
__proto__: Array(0)
id: 19
name: "The Wolf Among Us"
slug_name: "the-wolf-among-us"
summary: "The Wolf Among Us is a five episode series from the creators of the 2012 Game of the Year: The Walking Dead. Based on Fables (DC Comics/Vertigo), an award-winning comic book series, it is an often violent, mature and hard-boiled thriller where the characters and creatures of myth, lore and legend are real and exist in our world. As Bigby Wolf - The Big Bad Wolf in human form - you will discover that the brutal, bloody murder of a Fable is just a taste of things to come, in a game series where your every decision can have enormous consequences."
__proto__: Object
**/
