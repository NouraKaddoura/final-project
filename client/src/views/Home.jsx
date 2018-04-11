import React from 'react'
import { Button } from 'reactstrap'
import { Modal, ModalHeader } from 'reactstrap'
import SignUp  from '../views/SignUp'


class Home extends React.Component {
	state = {
		modalOpen: false
	}

handleSignUpClick(){
	this.setState({
		modalOpen: true
	})
}

handleHideModalClick(){
	this.setState({
		modalOpen: false
	})
}


	render(){
		const { modalOpen } = this.state
		var title ={ 
			textAlign: 'center',	
			color: 'white',
		}
		var homeButtons= {
			margin: '10px', 
			backgroundColor:'#4CAF50',
			border: 'none',
		
		}
			return (
				<div style={title} className='Home'>
			
					<h1 style={{fontSize: '120px'}}>BattleBuddy</h1>
					<p className="headline">Mentoring and advice based on experience</p>
					
					{this.currentUser
						? (
							<span>
								<h1>Welcome Back!</h1>	 
							</span>
						)
						: (
							<span>
								<div>
								{/* <Button style={homeButtons}> <Link style={{color: 'inherit'}} to="/login" >Log In</Link> </Button> */}
								<Button size='lg' onClick={this.handleSignUpClick.bind(this)} style={homeButtons}> Sign Up </Button>
								</div>
								
									<Modal isOpen={modalOpen} >
									<ModalHeader>
									<Button type="button" onClick={this.handleHideModalClick.bind(this)}>X</Button>
									</ModalHeader>
                    					<SignUp onSignUpSuccess={this.props.onLoginSuccess} />
										
                					</Modal>
									
							</span>
							
						)
					}
					<div className="space"></div>	
				</div>
			)
		}

	}


export default Home