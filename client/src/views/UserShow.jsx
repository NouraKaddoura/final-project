import React from 'react'
import httpClient from '../httpClient'
// import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'



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
            this.setState({
                user: serverResponse.data.mentor
            })

            this.props.onAddOrRemoveMentorSuccess()
        })
    }

    onClickDeleteMentor(evt){
        evt.preventDefault()
        const mentorId = this.props.match.params.id
        // console.log('clicked')
        // console.log(mentorId)
        httpClient.deleteMentor(mentorId).then((serverResponse)=>{
            this.setState({
                user: serverResponse.data.mentor
            })
            this.props.onAddOrRemoveMentorSuccess()
        })
    }

	render() {
        const { match: { params: { id } }, currentUser } = this.props
        const { user } = this.state   
        if(user && currentUser) {
            console.log("CURRENT USER:")
            console.log(currentUser)
            console.log("MENTOR:")
            console.log(user)
        }
        if(!user) return <h2>Loading...</h2>
		return (
			<div style={{backgroundColor:'white', height:'480px', width:'550px', textAlign: 'center', margin: '0 auto', boxShadow: '0px 8px 8px rgba(0, 0, 0, .6)'}} className="UsersShowPage">	
            <h1>{this.state.addedMessage}</h1>
           
            <div  className="UsersShowBox" >
            <h2 style={{textAlign: 'center', backgroundColor:'rgb(0,128,128)', color: 'white', padding: '5px', boxShadow: '0px 8px 8px rgba(0, 0, 0, .5)'}}>User: {user.name}</h2>
              <img style={{width:'200px', marginBottom:'10px', boxShadow: '0px 8px 8px rgba(0, 0, 0, .5)'}} className="pic" src={user.picture}/>
        
               
         
             
                
            </div>      
                {user.isMentor
                    ? (
                        <span>
                        {user.mentees.includes(currentUser._id)
                          ? <Button onClick={this.onClickDeleteMentor.bind(this)}>Remove Mentor</Button>
                          : <Button onClick={this.onClickAddMentor.bind(this)}>Add Mentor</Button>
                        }
                        {/* <Button style={{  marginBottom: '20px'}} onClick={this.onClickAddMentor.bind(this)}>Add Mentor</Button> */}
                        
                        <h4>Bio:</h4>
                        <p>{user.bio}</p>
                   

                        </span>
                    )
                    : (
                        <span>
                        
                            {/* <Button onClick={this.onClickAddMentor.bind(this)}>Add Mentee</Button> */}
                        <h4 style={{ marginBottom: '20px', backgroundColor:'rgba(0,128,128, .4)'}}>Mentee Looking for Mentor</h4> 
                        
                        <h4>Bio:</h4>
                        <p>{user.bio}</p>

                        </span>
                        
                    )
                }
			</div>
        )
    }
}



export default UserShow
