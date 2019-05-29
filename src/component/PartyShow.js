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
		console.log(this.props.party)
		return (
			<div>
				<Grid celled>
				<Grid.Row stretched>
				<Grid.Column width={5} centered>
				<Segment.Group>
					<Segment textAlign="center">PARTY INFO</Segment>
					<Segment.Group>
						<Segment textAlign="center">Name: {this.props.party.name} <br/></Segment>
						<Segment textAlign="center">Description: {this.props.party.description} <br/></Segment>
						<Segment textAlign="center">Partysize: {this.props.party.partysize} <br/></Segment>
						<Segment textAlign="center">Party Owner: {this.props.party.user.username} </Segment>
					</Segment.Group>
				</Segment.Group>
				</Grid.Column>
				<Grid.Column width={5} centered>
				<Segment.Group>
					<Segment textAlign="center"> PARTY MEMBERS </Segment>
					<Segment.Group>
						{this.getPartyMembers()}
					</Segment.Group>
				</Segment.Group>
				</Grid.Column>
				<Grid.Column width={5} centered>
					<Segment compact textAlign="center"><Button onClick={this.props.goBack}> GO BACK TO PARTIES </Button></Segment>
				</Grid.Column>
				</Grid.Row>
				<Grid.Row stretched>
					<Grid.Column width={15} centered>
						<Comment.Group>
							<Header as='h2' dividing textAlign='center'>
								Messages
							</Header>
							<Messages messages={this.getMessages()}/>
							<Form reply onSubmit={this.props.addMessage}>
								<Form.TextArea/>
							<Segment textAlign="center">
								<Button content="Type a message to party" labelposition='center' icon='edit' primary/>
								</Segment>
							</Form>
						</Comment.Group>
						<Segment textAlign="center"><h1>CHAT GOES HERE</h1> </Segment>
					</Grid.Column>
				</Grid.Row>
				</Grid>
				</div>
		);
	}
}
