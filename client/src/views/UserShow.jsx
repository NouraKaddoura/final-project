import React from 'react'
import httpClient from '../httpClient'
// import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'



class UserShow extends React.Component {
	state = {
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
            console.log(serverResponse.data)
            this.setState({
                user: serverResponse.data.mentor
            })

            this.props.onAddMentorSuccess()
        })
    }

    onClickDeleteMentor(evt){
        evt.preventDefault()
        const mentorId = this.props.match.params.id
        // console.log('clicked')
        // console.log(mentorId)
        httpClient.deleteMentor(mentorId).then((serverResponse)=>{
            console.log(serverResponse)
        })
    }

	render() {
        const { match: { params: { id } }, currentUser } = this.props
        const { user } = this.state   
        console.log(currentUser)
        if(!user) return <h2>Loading...</h2>
		return (
			<div style={{backgroundColor:'white', height:'540px'}} className="UsersShowPage">	
            <h1>{this.state.addedMessage}</h1>
            <div style={{marginLeft: '50px'}} className="UsersShowBox" >
              <img style={{width:'150px', marginTop:'50px'}} className="pic" src={user.picture}/>
                <h2>User: {user.name}</h2>
            </div>      
                {user.isMentor
                    ? (
                        <span>
                        {/* {this.props.currentUser.mentors.includes(id)
                          ? <Button style={{marginLeft:'50px'}} onClick={this.onClickDeleteMentor.bind(this)}>Remove Mentor</Button>
                          : <Button style={{marginLeft:'50px'}} onClick={this.onClickAddMentor.bind(this)}>Add Mentor</Button>
                        } */}
                        <Button style={{marginLeft:'50px'}} onClick={this.onClickAddMentor.bind(this)}>Add Mentor</Button>
                        
                        
                        </span>
                    )
                    : (
                        <span>
                        
                            {/* <Button onClick={this.onClickAddMentor.bind(this)}>Add Mentee</Button> */}
                        <h4 style={{marginLeft:'50px'}}>Mentee Looking for Mentor</h4> 
                        
                        </span>
                        
                    )
                }
			</div>
        )
    }
}



export default UserShow
