
import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar style={{backgroundColor: '#48D1CC', border: 'grey'}} light>
          <NavbarBrand href="/" className="mr-auto">MentorHub</NavbarBrand>
		  Mentoring and advice based on experience 
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
			  <NavItem>
                <NavLink href="/posts">Posts</NavLink>
              </NavItem>
			  {this.state.currentUser
			  ? (
					<span>
						<NavItem> 
 							<NavLink href="/profile">Profile</NavLink>
						</NavItem> 
 						<NavItem> 
 							<NavLink href="/posts/new">Make a New Post</NavLink>
 						</NavItem> 
 						<NavItem> 
 							<NavLink href="/users">Users</NavLink>
 						</NavItem> 
 						<NavItem> 
 							<NavLink href="/logout">Log Out</NavLink>
 						</NavItem> 
 					</span>
 				)
 				: (
 					<span>
 					<NavItem> 
 						<NavLink href="/login">Log In</NavLink>
 					</NavItem> 
 					<NavItem> 
 						<NavLink href="/signup">Sign Up</NavLink>
 					</NavItem> 						
					</span>
					
 				)
 			}
             
            </Nav>
          </Collapse>
		 
        </Navbar>
      </div>
    );
  }
}








// import React from 'react'
// import { Link } from 'react-router-dom'
// import SearchBar from './SearchBar.jsx'
// import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
// import { NavLink as PrettyLink} from 'react-router-dom'

// class NavBar extends React.Component {
// constructor(props){
// 	super(props);

// 	this.toggleNavbar = this.toggleNavbar.bind(this);
// 	this.state = {
// 		collasped: true
// 	};
// }

// toggleNavbar() {
// 	this.setState({
// 		collasped: !this.state.collapsed
// 	});
// }
// 	render(){
		
// 		return (
// 		<div>
// 		<Navbar color="faded" light>
// 		<NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
// 		<NavbarToggler onClick={this.toggleNavbar.bind(this)} className="mr-2" />
// 		<Collapse isOpen={!this.state.collapsed} navbar>
// 		<Nav navbar>
// 		<NavItem>  
// 			<NavLink to="/">Home</NavLink>
// 		</NavItem>
// 		<NavItem>
// 			<NavLink to="/posts">Posts</NavLink>
// 		</NavItem>
// 			{this.state.currentUser
// 				? (
// 					<span>
// 					<NavItem> 
// 						<Link to="/profile">Profile</Link>
// 					</NavItem> 
// 					<NavItem> 
// 						<Link to="/posts/new">Make a New Post</Link>
// 					</NavItem> 
// 					<NavItem> 
// 						<Link to="/users">Users</Link>
// 					</NavItem> 
// 					<NavItem> 
// 						<Link to="/logout">Log Out</Link>
// 					</NavItem> 
// 					</span>
// 				)
// 				: (
// 					<span>
// 					<NavItem> 
// 						<Link to="/login">Log In</Link>
// 					</NavItem> 
// 					<NavItem> 
// 						<Link to="/signup">Sign Up</Link>
// 					</NavItem> 
						
						
// 					</span>
					
// 				)
// 			}
// 			<NavItem> 
// 			<SearchBar />
// 			</NavItem> 
// 		</Nav>	
// 		</Collapse>
//         </Navbar>
//       </div>
		
// 	)}
	
// }

// export default NavBar