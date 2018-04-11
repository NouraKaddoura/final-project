import React from 'react'
import httpClient from '../httpClient'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class LogIn extends React.Component {
	state = {
		fields: { email: '', password: ''}
	}

	onInputChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}

	onFormSubmit(evt) {
		evt.preventDefault()
		httpClient.logIn(this.state.fields).then(user => {
			this.setState({ fields: { email: '', password: '' } })
			if(user) {
				this.props.onLoginSuccess(user)
				// this.props.history.push('/')
			}
		})
	}
	
	render() {
		const { email, password } = this.state.fields
		return (
			<div className='LogIn'>
				<div  className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>Log In</h1>
						<Form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
						<FormGroup>
						<Label for="email">Email</Label>
							<Input type="text" placeholder="Email" name="email" value={email} />
						</FormGroup>
						<FormGroup>
						<Label for="password">Password</Label>
							<Input type="password" placeholder="Password" name="password" value={password} />
						</FormGroup>
							<Button>Log In</Button>
						</Form>
					</div>
				</div>
			</div>
		)
	}
}

export default LogIn