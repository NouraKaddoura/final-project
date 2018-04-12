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
		// var title ={ 
		// 	textAlign: 'center',	
		// 	color: 'white',
		// }
		var homeButtons= {
			margin: '10px', 
			backgroundColor:'#005959',
			border: 'none',
			color: 'white'
		
		}
			return (
				<div className='Home'>
			
					<h1 className="title" style={{fontSize: '120px'}}>MentorHub</h1>
				
					
					
					{this.currentUser
						? (
							<span>
								<h1>Welcome Back!</h1>	 
							</span>
						)
						: (
							<span>
								<div style={{textAlign: 'center'}}>
								<Button className="btn-xlarge" onClick={this.handleSignUpClick.bind(this)} style={homeButtons}> Sign Up </Button>
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
					
					
					<div style={{maxWidth: '1100px'}} class="Dropdown">
							<Button style={{backgroundColor: 'transparent'}} id="DropDown-Button">About MentorHub</Button>
								<div class="Dropdown-Menu">
									<p>
									Mentoring is a professional activity, a trusted relationship, a meaningful commitment. The origins of mentoring can be traced back to ancient Greece as a technique to impart to young men important social, spiritual, and personal values. Mentoring as we know it today is loosely modeled on the historical craftsman/apprentice relationship, where young people learned a trade by shadowing the master artisan. In the mid-70s, corporate America redefined mentoring as a career development strategy. The concept of mentoring faculty and administrators is relatively new to higher education and rare in information technology circles, where staff professional development often takes the form of technical manuals and certifications. It is precisely this type of support organization, however, that needs a strong foundation of mentoring to build and retain a healthy workforce that can react quickly to change and can develop, adapt, and regenerate itself over time.
									</p>
								</div>

					</div>
					
				</div>
			)
		}

	}


export default Home