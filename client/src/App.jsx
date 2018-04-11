import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import httpClient from './httpClient'
import NavBar from './NavBar'
import Footer from './Footer'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import SignUp from './views/SignUp'
import Users from './views/Users'
import Home from './views/Home'
import Posts from './views/Posts'
import NewPost from './views/NewPost'
import UserProfile from './views/UserProfile'
import UserShow from './views/UserShow'
import PostView from './views/PostView'
import Autosuggest from 'react-autosuggest';


class App extends React.Component {
	state = { currentUser: httpClient.getCurrentUser() }

	onLoginSuccess(user) {
		this.setState({ currentUser: httpClient.getCurrentUser() }, () => {
			this.props.history.push('/profile')
		})
	}

	logOut() {
		httpClient.logOut()
		this.setState({ currentUser: null })
	}
	
	render() {
		const { currentUser } = this.state
		console.log(this.props)
		return (
			<div className='body'>
			<div className='App container'>

				<NavBar currentUser={currentUser} />

				<Switch>

					<Route path="/login" render={(props) => {
						return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/logout" render={(props) => {
						return <LogOut onLogOut={this.logOut.bind(this)} />
					}} />

					{/* the sign up component takes an 'onSignUpSuccess' prop which will perform the same thing as onLoginSuccess: set the state to contain the currentUser */}
					<Route path="/signup" render={(props) => {
						return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/posts/new" render={(routeProps) => {
						return currentUser
							? <NewPost {...routeProps} />
							: <Redirect to="/login" />
					}} />

					<Route path="/posts/:id" render={(routeProps) => {
						return currentUser
							? <PostView {...routeProps} />
							: <Redirect to="/login" />
					}} />


					<Route path="/posts" component={Posts} />
					
					<Route path="/users/:id" render={(routeProps)=>{
						return currentUser
						? <UserShow {...routeProps}/>
						: <Redirect to="/login" />
					}} />

					<Route path="/users" render={() => {
						return currentUser
							? <Users />
							: <Redirect to="/login" />
					}} />

					<Route path="/profile" render={(props) => {
						return currentUser
							? <UserProfile {...props}/>
							: <Redirect to="/login" />
					}} />

					<Route path="/" render={(props)=>{
						return <Home {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
					}}  />

				</Switch>
				<Footer />
			</div>
			
			</div>
		)
	}
}

export default withRouter(App)