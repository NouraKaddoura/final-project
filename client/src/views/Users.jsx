import React from 'react'
import httpClient from '../httpClient'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Row, Col } from 'reactstrap';


class Users extends React.Component {
	state = { currentUser: httpClient.getCurrentUser(),
	users:[],
	meetups: null }

	componentDidMount() {
        httpClient.getAllUsers().then((serverResponse)=> {
            this.setState({
                users: serverResponse.data
            })
		})
		httpClient.getMeetup().then((serverResponse)=>{
		console.log(serverResponse.data)
			this.setState({
				meetups: serverResponse.data
			})
		})
    }

	render() {
		
		const userRows = _.chunk(this.state.users, 3)
		const { users, meetups } = this.state
		return (
			
			<div style={{height: '500px', overflow: 'scroll'}} className="usersProfile">

			<div style={{float: 'right', backgroundColor:'white', width:'500px', textAlign:'center', paddingRight:'20px'}}className="localMeetups">
				{!meetups
					? <h3>Loading...</h3>
					: 	(
							<div>
								<h2>Local MeetUps:</h2>
								{meetups.map((m)=>{
									return <ul style={{listStyle: 'none'}}>
											<li><Link style={{color:'teal'}} to={m.link}>{m.name}</Link></li> <img style={{width:'250px', height: '150px'}} src={m.key_photo.photo_link}/>
												<ul style={{listStyle:'none'}}>
													<li>Organized by: {m.organizer.name}</li>
													
												</ul> 	
											</ul>
											
								})}
							</div>
						)
					}
			</div>

			<div className="UsersIndexPage">	
			<h2>MentorHub Users:</h2>
			{userRows.map((row, index)=>{
                return(
                    <Row key={index}>
						{row.map((u)=>{
                    		return (
								<Col xs="3" key={u._id}>
									<Link key={u._id} to={`/users/${u._id}`}>
										{u.name}</Link>
										</Col> 
                					)
           				 })}
					</Row>   
      			)                                                  
        })}
			
				</div>
				</div>
			
			)
		}
	}



export default Users

// const VIP = (props) => {
// 	return (
// 		<div className='VIP'>
// 			<h1>Welcome to the Users Page!</h1>
			
// 		</div>
// 	)
// }

// export default VIP