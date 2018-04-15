import React from 'react'
import httpClient from '../httpClient'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

		
class SignUp extends React.Component {
	state = {
		fields: { name: '', email: '', picture: '', password: '', bio:'', isMentor: false},
		errorMessage: null
	}

	onInputChange(evt) {
		console.log(evt.target.nodeName === 'INPUT')
		let value = evt.target.name === 'isMentor' ? evt.target.checked : evt.target.value
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: value
			}
		})
	}

	onFormSubmit(evt) {
		console.log(this.state.fields)
		evt.preventDefault()
		httpClient.signUp(this.state.fields).then(user => {
			this.setState({ fields: { name: '', email: '', picture: '', password: '', bio:'', isMentor: false } })
			if(user) {
				this.props.onSignUpSuccess(user)
				// this.props.history.push('/')
			} else {
				this.setState({
					errorMessage: 'Invalid Credentials: Unable to Create Account. Please Try Again.'
				})
			}
			
		})
		
	}

	render() {
		const { name, email, password, picture, zip, bio } = this.state.fields
	
		return (
			<div style={{margin: 'auto'}} className='SignUp'>
				<h4 style={{ margin: '10px', backgroundColor:'rgba(255, 0, 0, 0.7)', color:'white'}}>{this.state.errorMessage}</h4>

				<div className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>Sign Up</h1>
						<Form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
						<FormGroup>
						<Label for="name">Name</Label>
							<Input type="text" placeholder="Name" name="name" value={name} />
						</FormGroup>
						<FormGroup>
						<Label for="email">Email</Label>
							<Input type="text" placeholder="Email" name="email" value={email} />
						</FormGroup>
						<FormGroup>
						<Label for="picture"> Profile Picture</Label>
							<Input type="text" placeholder="Picture URL" name="picture" value={picture} />
						</FormGroup>
						<FormGroup>
						<Label for="bio">Bio</Label>
							<Input type="text" placeholder="bio" name="bio" value={bio} />
						</FormGroup>
						<FormGroup>
						<Label for="password">Password</Label>
							<Input type="password" placeholder="Password" name="password" value={password} />
						</FormGroup>
							<input name="isMentor" type="checkBox"/>
							<label htmlFor="isMentor">Are You A Mentor? </label>
							<Button style={{margin: '10px',backgroundColor:'#4CAF50', border: 'none'}}>Sign Up</Button>
						</Form>
					</div>
				</div>
			</div>
		)
	}
}

export default SignUp