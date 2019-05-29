import React from 'react';
import {Comment, Form } from 'semantic-ui-react'
function Messages(props) {

	const renderMessages = () => {
		// debugger
		return props.messages.map((message, idx) => {
			return<Comment key={idx}>
				<Comment.Content>
					<Comment.Author>
						{message.user.username}
					</Comment.Author>
					<Comment.Text>
						{message.content}
					</Comment.Text>
				</Comment.Content>
			</Comment>
		})
	}

	return (
		<React.Fragment>
			{renderMessages()}
		</React.Fragment>
	)
}


export default Messages