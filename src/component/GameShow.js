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
			return <li>{genre.name}</li>
		})
	}
	const getKeywords = () => {
		return props.keywords.map(keyword => {
			return <li>{keyword.name}</li>
		})
	}
	const getPlatforms = () => {
		return props.platforms.map(platform => {
			return <li>{platform.name}</li>
		})
	}	
	const getModes = () => {
		return props.modes.map(mode => {
			return <li>{mode.name}</li>
		})
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
		<div className="mySearch">
            <h1>{props.name}</h1>
            </div>
		<Grid columns='2'>
			<Grid.Row>
				<Grid.Column>
					<Segment>
						<img style={{width: "100%", height: "100%"}}src={props.coverimages[0].original_url}/>
					</Segment>
					<h1>SCREENSHOTS</h1>
					<Segment>
						<Carousel elements = {getScreenShotsForCarousel()} showIndicators = {true} />
					</Segment>
				</Grid.Column>
				<Grid.Column>
					<Segment>
					<Button onClick={props.onAdd}> Add Game </Button>
					</Segment>
					<Segment>
						<b>Genres:</b>
						<ul>
						{getGenres()}
						</ul>
					</Segment>
					<Segment>
						<b>Keywords:</b>
						<ul>
						{getKeywords()}
						</ul>
					</Segment>
					<Segment>
						<b>Platforms:</b>
						<ul>
						{getPlatforms()}
						</ul>
					</Segment>
					<Segment>
						<b>Modes:</b>
						<ul>
						{getModes()}
						</ul>
					</Segment>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Button onClick={props.goBack}> GO BACK </Button>
			</Grid.Row>
		</Grid>
		</React.Fragment>
		)
}

export default GameShow