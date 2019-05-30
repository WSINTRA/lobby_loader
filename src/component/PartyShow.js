import React from 'react';
import { Grid, Menu, Image, Sidebar, Segment, Container, Header, Card, Icon, Button, Comment, Form } from 'semantic-ui-react'
import Messages from './Messages'

export default class PartyShow extends React.Component {


	getPartyMembers = () => {
		return this.props.party.users.map(user=> {
			return <Segment textAlign="center">{user.username}</Segment>
		})
	}


	getMessages = () => {
		return this.props.allMessages.filter(message => {
			return message.party.id === this.props.party.id
		})
	}

	render() {
		console.log("Party props",this.props.party)
		return (
			<div>
				<Grid centered columns={1}>
					<Segment compact textAlign="center"><Button onClick={this.props.goBack}> GO BACK TO PARTIES </Button></Segment>
				<Grid.Row stretched centered columns={2}> 
					<Grid.Column>
					<Segment.Group>
						<Segment textAlign="center"><h2>PARTY INFO</h2></Segment>
						<Segment.Group>
							<Segment textAlign="center">Name: {this.props.party.name} <br/></Segment>
							<Segment textAlign="center">Description: {this.props.party.description} <br/></Segment>
							<Segment textAlign="center">Total Partysize: {this.props.party.partysize} <br/></Segment>
							{this.props.party.space.taken || 
								this.props.party.space.taken !== undefined ? <Segment textAlign="center">Current Size: {this.props.party.space.taken} <br/></Segment> : null }
							<Segment textAlign="center">Party Owner: <b>{this.props.party.user.username}</b> </Segment>
						</Segment.Group>
					</Segment.Group>
					</Grid.Column>
					<Grid.Column>
						<Segment.Group>
							<Segment textAlign="center"><h2>PARTY MEMBERS</h2> </Segment>
							<Segment.Group>
								{this.getPartyMembers()}
							</Segment.Group>
						</Segment.Group>
					</Grid.Column>
					
				</Grid.Row>
				<Grid.Row stretched centered columns={3}>
					<Grid.Column>
						<Segment>
						<Comment.Group>
							<Header as='h2' dividing textAlign='center'>
								Messages
							</Header>
							<div style={{height:"15vw", width:"100%", overflow: "auto"}}>
							<Messages messages={this.getMessages()}/>
							</div>
							<Form reply onSubmit={this.props.addMessage}>
								<Form.TextArea/>
							<Segment textAlign="center">
								<Button style={{width:"100%"}} content="Type a message to party" labelposition='center' icon='edit' primary/>
								</Segment>
							</Form>
						</Comment.Group>
						</Segment>
					</Grid.Column>
				</Grid.Row>
				</Grid>
				</div>
		);
	}
}
