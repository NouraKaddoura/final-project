import React from 'react'
import httpClient from '../httpClient'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Row, Col } from 'reactstrap';

class Users extends React.Component {
	state = { currentUser: httpClient.getCurrentUser(),
	users:[] }

	componentDidMount() {
        httpClient.getAllUsers().then((serverResponse)=> {
            this.setState({
                users: serverResponse.data
            })
        })
    }

	render() {
		const userRows = _.chunk(this.state.users, 3)
		const { users } = this.state
		return (
			<div className="UsersIndexPage">	
			<h2>Number of Users: {users.length}</h2>
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