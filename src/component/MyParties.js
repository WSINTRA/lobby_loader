import React from 'react'
import { Grid, Menu, Image, Sidebar, Segment, Container, Header, Card, Icon, Button } from 'semantic-ui-react'
import StackGrid from "react-stack-grid";

function MyParties(props) {

	return (
	<div> 
		<Container>
			<Segment>
				<Button.Group>
					<Button disabled={props.sideBarVisible} onClick={props.handleShowClick}>
						Show Options
					</Button>
					<Button disabled={!props.sideBarVisible} onClick={props.handleHideClick}>
						Hide Options
					</Button>
				</Button.Group>
				<Grid centered>
					<Grid.Row centered columns={2}>
						<Grid.Column textAlign='center'>
							<Header>Parties I own</Header>
							<Container textAlign='center'>
								{props.currentUserOwnedParties.map(party => 
							<React.Fragment key={party.id}>
							<Sidebar.Pushable as={Card}>
								<Sidebar
										as={Menu}
										animation='overlay'
										icon='labeled'
										inverted
										onHide={props.handleSidebarHide}
										vertical
										visible={props.sideBarVisible}
										width='thin' >
									<Menu.Item as='a'>
										<Header inverted color='olive'>{party.name}</Header>
										<Icon name='warning sign' /> Delete Party
									</Menu.Item>
								</Sidebar>
								<Sidebar.Pusher>        
									<Card>
										<Card.Content header={party.name}/>
										<Card.Content> 
											{party.description} <br/>
										</Card.Content>
										<Card.Content extra>
											<Icon name='user' />
											Max Size {party.partysize}
										</Card.Content>
										<Card.Content extra>
											<Button onClick={() => props.viewParty(party.id)}basic color="green">
												View Party
											</Button>
										</Card.Content>
									</Card>
								</Sidebar.Pusher>
							</Sidebar.Pushable>
							</React.Fragment>)}
							</Container>

						</Grid.Column>
					<Grid.Column textAlign='center'>

						<Header>Parties I'm in</Header>
						<Container>
						{
						props.currentUserParties.map(party => 
						<React.Fragment key={party.id}>
						<Sidebar.Pushable as={Card}>
						<Sidebar
						as={Menu}
						animation='overlay'
						icon='labeled'
						inverted
						onHide={props.handleSidebarHide}
						vertical
						visible={props.sideBarVisible}
						width='thin'
						>
						<Menu.Item as='a' onClick={()=>props.leaveGroup(party, props.currentUserId)}>
						<Header inverted color='olive'>{party.name}</Header>
						<Icon name='frown outline' />
						Leave Party
						</Menu.Item>

						</Sidebar>
						<Sidebar.Pusher>        
						<Card>
						<Card.Content header={party.name} />
						<Card.Content> {party.description}
						<br/></Card.Content>
						<Card.Content extra>
						<Icon name='user' />
						Max Size {party.partysize}
						</Card.Content>
						<Card.Content extra>
						<Button onClick={() => props.viewParty(party.id)}basic color="green">
						View Party
						</Button>
						</Card.Content>
						</Card>
						</Sidebar.Pusher>
						</Sidebar.Pushable>
						</React.Fragment>
						) }
						</Container>

					</Grid.Column>
				</Grid.Row>
						<Grid.Row columns={1}>


					<Grid.Column centered={"true"}>
						<Header>Available Parties</Header>

						<StackGrid columnWidth={250}>
						{props.relevantParties.map(party => 
						<React.Fragment key={party.id}>

						<Sidebar.Pushable as={Card}>
						<Sidebar
						as={Menu}
						animation='overlay'
						icon='labeled'
						inverted
						onHide={props.handleSidebarHide}
						vertical
						visible={props.sideBarVisible}
						width='thin'
						>
						<Menu.Item as='a' onClick={()=>props.joinGroup(party, props.currentUserId)}>
						<Header inverted color='olive'>{party.name}</Header>
						<Icon name='smile outline'  />
						Join Party
						</Menu.Item>

						</Sidebar>
						<Sidebar.Pusher>  
						<Card>

						<Card.Content header={party.name} />
						<Card.Content><h4>Owner : {party.user.username}</h4> {party.description}
						<br/></Card.Content>
						<Card.Content extra>
						<Icon name='user' />
						Current Size {party.space.taken}
						</Card.Content>
						<Card.Content extra>
						<Icon name='user' />
						Spaces Left {party.space.available}
						</Card.Content>
						<Card.Content extra>
						<Button onClick={() => props.viewParty(party.id)}basic color="green">
						View Party
						</Button>
						</Card.Content>
						</Card>
						</Sidebar.Pusher>
						</Sidebar.Pushable>
						</React.Fragment>
						)}</StackGrid>

					</Grid.Column>

					</Grid.Row>
				</Grid>
			</Segment>
		</Container>
	</div>
	)
}

export default MyParties