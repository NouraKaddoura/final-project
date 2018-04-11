import React from 'react'
import httpClient from '../httpClient'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'


//delete profile has a delay where you still have the token and are logged in. (it does delete the user)

class UserProfile extends React.Component {
	state = { 
		user: null,
		modalOpen: false }

componentDidMount(){
	httpClient.getMe().then((serverResponse)=>{
		console.log(serverResponse)
		this.setState({
			user: serverResponse.data,
		})
	})
	// httpClient.getPosts(this.props.match.params.id).then((serverResponse)=>{
	// 	console.log(serverResponse.data) //why do I get the array of posts but the .data.title is undefined? I cannot map through it. Same with mentors.(populate?)
	// 	this.setState({
	// 		posts: serverResponse.data
	// 	})
	// })
}

handleEditClick(){
	this.setState({
		modalOpen: true
	})
}		

handleUpdateClick(evt){
	evt.preventDefault()
	const { name, email, picture } = this.refs
	const userFormFields = {
		name: name.refs.name.value,
		email: email.refs.email.value,
		picture: picture.refs.picture.value
	}
	httpClient.updateUser(this.state.user._id, userFormFields)
	.then((serverResponse) => {
		console.log(serverResponse.data)
		this.setState({
			modalOpen: false,
			user: serverResponse.data
			
		})
	})
}

//fix logout problem

handleDeleteClick(){
	httpClient.deleteUser(this.state.user._id).then((serverResponse)=>{ 
		this.props.onDeleteAccount()
		this.props.history.push('/') 
		
	})
}
	render() {
		const { user, modalOpen } = this.state
		if(!user) return <h1>Loading...</h1>
		return (
			<div className="profilePage">	
			<h1 style={{color:'rgba(0,0,0,.8)', margin: '10px'}}>Welcome Back, {user.name}</h1>
			<div style={{paddingLeft: '104px'}}className="profilepic"><img style={{width: '250px'}}src={user.picture} alt="userpicture"/></div>
			
			

			<div style={{minHeight: '500px', maxWidth: '600px', margin:'0 auto'}} className="userProfileContents">
				<Modal isOpen={modalOpen}>
                    <ModalHeader>Edit Account</ModalHeader>
                    
                    <Form onSubmit={this.handleUpdateClick.bind(this)}>

                    <ModalBody> 

                      
                             <FormGroup>
                                <Label for="name">Name</Label>
                                <Input defaultValue={user.name} ref="name" innerRef="name" type="text" id="name" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input defaultValue={user.email} ref="email" innerRef="email" type="text" id="email" />
                            </FormGroup>  

							<FormGroup>
								<Label for="picture"> Profile Picture</Label>
								<Input defaultValue={user.picture}  ref="picture" innerRef="picture" type="text" id="picture" />
							</FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="info">Update</Button>
                        <Button type="button" color="danger" onClick={this.handleDeleteClick.bind(this)}>Delete Account</Button>
                    </ModalFooter>

                    </Form>
                </Modal>
{user.isMentor
	? (
		<span>
			<Button style={{align:'right', marginLeft: '490px'}} onClick={this.handleEditClick.bind(this)}>Edit Profile</Button>		

			<h4 style={{backgroundColor:'rgb(0,128,128)', color: 'white', padding: '10px', marginTop: '10px'}}> Your Mentees: </h4>
			{user.mentees.map((u)=>{
			return <Link className="profile" to={'/users/' + u._id}>{u.name} | </Link>
		})}

	<h4 style={{backgroundColor:'rgb(0,128,128)', color: 'white', padding: '10px'}}> Your Posts: </h4>
		{this.state.user.posts.map((p)=>{
			return <Link className="profile" to={ '/posts/' + p._id}>{p.title}</Link>
		})}

</span>
	)
	: (
		<span>
			<Button style={{align:'right', marginLeft: '490px'}} onClick={this.handleEditClick.bind(this)}>Edit Profile</Button>		

		<h4 style={{backgroundColor:'rgb(0,128,128)', color: 'white', padding: '10px', marginTop: '10px'}}> Your Mentors: </h4>
		{user.mentors.map((u)=>{
			return <Link key={u._id} className="profile" to={'/users/' + u._id}>{u.name}  | </Link>
		})}
		
		<h4 style={{backgroundColor:'rgb(0,128,128)', color: 'white', padding: '10px'}}> Your Posts: </h4>
		{this.state.user.posts.map((p)=>{
			return <Link key={p._id} className="profile" to={'/posts/' + p._id}>{p.title} | </Link>
		})}

	
		</span>
	
	)
}	
			
			</div>
				
			
			</div>
			)
		}
	}



export default UserProfile


