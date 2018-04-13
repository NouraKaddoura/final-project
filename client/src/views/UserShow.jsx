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
			<div style={{backgroundColor:'white', height:'480px', width:'550px', textAlign: 'center', margin: '0 auto'}} className="UsersShowPage">	
            <h1>{this.state.addedMessage}</h1>
           
            <div  className="UsersShowBox" >
            <h2 style={{textAlign: 'center'}}>User: {user.name}</h2>
              <img style={{width:'200px', marginBottom:'10px'}} className="pic" src={user.picture}/>
        
               
         
             
                
            </div>      
                {user.isMentor
                    ? (
                        <span>
                        {/* {this.props.currentUser.mentors.includes(id)
                          ? <Button style={{marginLeft:'50px'}} onClick={this.onClickDeleteMentor.bind(this)}>Remove Mentor</Button>
                          : <Button style={{marginLeft:'50px'}} onClick={this.onClickAddMentor.bind(this)}>Add Mentor</Button>
                        } */}
                        <Button style={{  marginBottom: '20px'}} onClick={this.onClickAddMentor.bind(this)}>Add Mentor</Button>
                        
                    <h4>Bio:</h4>
                    {/* <div style={{ display: 'flex', marginLeft:'50px', order:'3', overflow: 'scroll'}}className="menteesList">       
                    
                    <h4>Posts:</h4>
                        {user.posts.map((p)=>{
                            return(
                            <ul style={{ listStyleType: 'none'}}>
                            <li><Link to="/">{p.title} </Link></li>
                            </ul>
                            )
                         })}
                
                        </div> */}
                   

                        </span>
                    )
                    : (
                        <span>
                        
                            {/* <Button onClick={this.onClickAddMentor.bind(this)}>Add Mentee</Button> */}
                        <h4 style={{ marginBottom: '20px'}}>Mentee Looking for Mentor</h4> 
                        <h4>Bio:</h4>
                        {/* <div style={{ display: 'flex', marginLeft:'50px', order:'3', overflow: 'scroll'}}className="menteesList">       
                        <h4>Posts:</h4>
                        {user.posts.map((p)=>{
                            return(
                            <ul style={{ listStyleType: 'none'}}>
                            <li><Link to="/">{p.title} </Link></li>
                            </ul>
                            )
                         })}
                
                        </div> */}
                        </span>
                        
                    )
                }
			</div>
        )
    }
}



export default UserShow
