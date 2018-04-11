import React from 'react'
import httpClient from '../httpClient'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

// sign up form behaves almost identically to log in form. We could create a flexible Form component to use for both actions, but for now we'll separate the two:
class SignUp extends React.Component {
	state = {
		fields: { name: '', email: '', password: '', isMentor: false}
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
			this.setState({ fields: { name: '', email: '', password: '', isMentor: false } })
			if(user) {
				this.props.onSignUpSuccess(user)
				// this.props.history.push('/')
			}
			
		})
		
	}

	render() {
		const { name, email, password } = this.state.fields
	
		return (
			<div style={{margin: 'auto'}} className='SignUp'>
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