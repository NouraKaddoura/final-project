import React from 'react'
import httpClient from '../httpClient'
// import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'



class UserShow extends React.Component {
	state = {
        currentUser: httpClient.getCurrentUser(),
        user: null
    }

	componentDidMount() {
        httpClient.getUser(this.props.match.params.id).then((serverResponse)=> {
            console.log(this.state)
            this.setState({
                user: serverResponse.data
                
            })
            
        })
    }

    onClickAddMentor(evt){
        evt.preventDefault()
        const mentorId = this.props.match.params.id
        httpClient.addMentor(mentorId).then((serverResponse)=>{
            this.setState({
                currentUser: serverResponse.data.user
            })
        })
    }

	render() {
        const { user } = this.state
   
        console.log(user)
        if(!user) return <h2>Loading...</h2>
		return (
			<div className="UsersShowPage">	
                <h2>User: {user.name}</h2>
                    
                {user.isMentor
                    ? (
                        <span>
                        <Button onClick={this.onClickAddMentor.bind(this)}>Add Mentor</Button>
                        
                        </span>
                    )
                    : (
                        <span>
                        
                            {/* <Button onClick={this.onClickAddMentor.bind(this)}>Add Mentee</Button> */}
                        <h1>Mentee Looking for Mentor</h1> 
                        
                        </span>
                        
                    )
                }
			</div>
        )
    }
}



export default UserShow
