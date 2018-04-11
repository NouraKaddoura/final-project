import React from 'react'
import httpClient from '../httpClient'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'

//delete profile has a delay where you still have the token and are logged in. (it does delete the user)

class UserProfile extends React.Component {
	state = { 
		currentUser: '',
		posts: '',
		modalOpen: false }

componentDidMount(){
	httpClient.getMe().then((serverResponse)=>{
		console.log(serverResponse)
		this.setState({
			currentUser: serverResponse.data,
		})
	})
	httpClient.getPosts(this.props.match.params.id).then((serverResponse)=>{
		console.log(serverResponse.data) //why do I get the array of posts but the .data.title is undefined? I cannot map through it. Same with mentors.(populate?)
		this.setState({
			posts: serverResponse.data
		})
	})
}

handleEditClick(){
	this.setState({
		modalOpen: true
	})
}		

handleUpdateClick(evt){
	evt.preventDefault()
	const { name, email } = this.refs
	const userFormFields = {
		name: name.refs.name.value,
		email: email.refs.email.value
	}
	httpClient.updateUser(this.state.currentUser._id, userFormFields)
	.then((serverResponse) => {
		console.log(serverResponse.data)
		this.setState({
			modalOpen: false,
			currentUser: serverResponse.data.user
		})
	})
}

//fix logout problem

handleDeleteClick(){
	httpClient.deleteUser(this.state.currentUser._id).then((serverResponse)=>{ 
		this.props.history.push('/') 
		
	})
}
	render() {
		const { currentUser, modalOpen } = this.state
		return (
			<div className="profilePage">	
			<h1 style={{color:'rgba(0,0,0,.8)', margin: '10px'}}>Welcome Back, {currentUser.name}</h1>
			<Button onClick={this.handleEditClick.bind(this)}>Edit Profile</Button>
			

			<div style={{minHeight: '500px', maxWidth: '600px', margin:'0 auto'}} className="userProfileContents">
				<Modal isOpen={modalOpen}>
                    <ModalHeader>Edit Account</ModalHeader>
                    
                    <Form onSubmit={this.handleUpdateClick.bind(this)}>

                    <ModalBody> 

                      
                             <FormGroup>
                                <Label for="name">Name</Label>
                                <Input defaultValue={currentUser.name} ref="name" innerRef="name" type="text" id="name" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input defaultValue={currentUser.email} ref="email" innerRef="email" type="text" id="imageUrl" />
                            </FormGroup>  

                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="info">Update</Button>
                        <Button type="button" color="danger" onClick={this.handleDeleteClick.bind(this)}>Delete Account</Button>
                    </ModalFooter>

                    </Form>
                </Modal>

			
			</div>
				{currentUser.isMentor
				? (
					<span>
					
					<h4 style={{backgroundColor:'#4CAF50', color: 'white', padding: '10px'}}> Your Mentees: {currentUser.mentees}</h4>
					</span>
				)
				: (
					<span>
				
					<h4 style={{backgroundColor:'#4CAF50', color: 'white', padding: '10px'}}> Your Mentors: {currentUser.mentors}</h4>
					{/* {this.state.posts.map((p)=>{
						<h1>{p.title}</h1>
					})} */}
					
					</span>
					
				)
			}	
				
			
			</div>
			)
		}
	}



export default UserProfile


