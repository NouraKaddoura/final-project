import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'


const NavBar = (props) => {


	return (
		<div className='NavBar'>
		<div className='topnav' id='myTopnav'>
		   
			<Link to="/">Home</Link>
			<Link to="/posts">Posts</Link>
			{props.currentUser
				? (
					<span>
						<Link to="/profile">Profile</Link>
						<Link to="/posts/new">Make a New Post</Link>
						<Link to="/users">Users</Link>
						<Link to="/logout">Log Out</Link>
					</span>
				)
				: (
					<span>
						<Link to="/login">Log In</Link>
						<Link to="/signup">Sign Up</Link>
						
						
					</span>
					
				)
			}
			<SearchBar />
			
			</div>
		</div>
	)
}

export default NavBar