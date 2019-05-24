import React from 'react'
import { Form, Container } from 'semantic-ui-react'
import {Redirect } from 'react-router-dom'

function Edit(props) {

const { userData } = props

return (
	<Container>
	{props.loggedIn ? <Form onSubmit={()=>props.handleEdit(props.userData)}>
        <Form.Group widths='equal'>
          <Form.Input name="display_name"onChange={props.formControl}fluid label='display name' value={userData.display_name} placeholder={userData.display_name === null ? "Give yourself a display name" : userData.display_name } />
          <Form.Input name="image_url" onChange={props.formControl}fluid label='Avatar Url' placeholder={userData.image_url === null ? "Paste a image URL for your avatar" : userData.image_url } />
        </Form.Group>

        <Form.TextArea name="bio" onChange={props.formControl}label='Bio' placeholder={userData.bio === null ? "Write a short bio" : userData.bio } />
        <Form.TextArea name="tag_line" onChange={props.formControl}label='TagLine' placeholder={userData.tag_line === null ? "Whats your tag line?" : userData.tag_line } />
        <Form.Button>Edit Profile</Form.Button>
      </Form> : <Redirect from="/edit" to="/"/>}
      
      </Container>
	);
}

export default Edit;