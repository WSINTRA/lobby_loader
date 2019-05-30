import React from "react";
import  Carousel  from  'semantic-ui-carousel-react';
import { Image, Button, Card, Grid, Segment } from  'semantic-ui-react';

function GameShow(props) {



	const getScreenShotsForCarousel = () => {
		console.log(props)
		return props.screenshots.map(screenshot => {
			return {render:()=>{
				return <div> <img style={{width: "100%", height: "100%"}} src={screenshot.original_url}/></div>
			}}
		})
	}

	const getGenres = () => {
		return props.genres.map(genre => {
			return <Segment inverted color="red" tertiary textAlign="center">{genre.name}</Segment>
		})
	}
	const getKeywords = () => {
		return props.keywords.map(keyword => {
			return <Segment inverted color="brown" tertiary textAlign="center">{keyword.name}</Segment>
		})
	}
	const getPlatforms = () => {
		return props.platforms.map(platform => {
			return <Segment inverted color="blue" tertiary textAlign="center">{platform.name}</Segment>
		})
	}	
	const getModes = () => {
		return props.modes.map(mode => {
			return <Segment inverted color="green" tertiary textAlign="center">{mode.name}</Segment>
		})
	}
	const getParties = () => {
		if(props.parties.length === 0){
			return null
		} else{
		return props.parties.map(party => {
			return <Segment.Group> 
					<Segment inverted color="green" tertiary textAlign="center">{party.name}</Segment>
					<Segment inverted color="green" tertiary textAlign="center">{party.description}</Segment>
					</Segment.Group>

		})
		}
	}



	// let elemant = [{
	// 	render:()=>{
	// 			return <Button  fluid>1111111</Button>
	// 		}
	// 	},{
	// 		render:()=>{
	// 			return <Button  fluid>2222222</Button>
	// 		}
	//     },
	// ]


	return (
		<React.Fragment>
		<Grid celled>
			<Grid.Row>
				<Grid.Column width={16} centered>
					<Segment vertical size="massive" textAlign="center" tertiary> 
					<Button onClick={props.onAdd}> Add Game </Button>
					{props.name}
					<Button floated='left' onClick={props.goBack}> Go Back </Button>
					</Segment>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column width={6} centered>
					<Segment vertical centered>
						<Image size='huge' src={props.coverimages[0].original_url} centered bordered/>
					</Segment>
					
				</Grid.Column>
				<Grid.Column width={4} compact>
				{getParties() ? <h5>Existing game parties {getParties()}</h5> : null}
					<Segment.Group compact raised>
						<Segment inverted color="black" size="huge" textAlign="center">Game Info</Segment>
							<Segment vertical inverted color="red" textAlign="center">Genres</Segment>
						
							
								{getGenres()}
					
							
					
							<Segment vertical inverted color="green" textAlign="center">Modes</Segment>
						
						
								{getModes()}
							
						
							<Segment vertical inverted color="blue" textAlign="center">Platforms</Segment>
					
							
								{getPlatforms()}
							
				
					</Segment.Group>

					
				</Grid.Column>
				<Grid.Column width={6} compact>
					<Segment.Group compact raised>
					<p>{props.summary}</p>
					</Segment.Group>
					<h1>SCREENSHOTS</h1>
					<Segment vertical>
						<Carousel elements = {getScreenShotsForCarousel()} showIndicators = {true} />
					</Segment>
				</Grid.Column>
				</Grid.Row>
		</Grid>
		</React.Fragment>
		)
}

export default GameShow