import axios from 'axios'
import jwtDecode from 'jwt-decode'

// instantiate axios
const httpClient = axios.create()


httpClient.getToken = function() {
	return localStorage.getItem('token')
}

httpClient.setToken = function(token) {
	localStorage.setItem('token', token)
	return token
}

httpClient.getCurrentUser = function() {
	const token = this.getToken()
	console.log(token)
	if(token) return jwtDecode(token)
	return null
}

httpClient.logIn = function(credentials) {
	return this({ method: 'post', url: '/api/users/authenticate', data: credentials })
		.then((serverResponse) => {
			const token = serverResponse.data.token
			if(token) {
				// sets token as an included header for all subsequent api requests
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

// logIn and signUp functions could be combined into one since the only difference is the url we're sending a request to..
httpClient.signUp = function(userInfo) {
	return this({ method: 'post', url: '/api/users', data: userInfo})
		.then((serverResponse) => {
			const token = serverResponse.data.token
			if(token) {
				// sets token as an included header for all subsequent api requests
				this.defaults.headers.common.token = this.setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

httpClient.logOut = function() {
	localStorage.removeItem('token')
	delete this.defaults.headers.common.token
	return true
}


httpClient.getPosts = function() {
	return this({ method: 'get', url: '/api/posts'})
}

httpClient.createPost = function(postInfo){
	return this({method:'post', url:'/api/posts', data: postInfo})
}

httpClient.getPost = function(id){
	return this({method:'get', url:`/api/posts/${id}`})
}

httpClient.updatePost = function(id, fields){
	return this({ method: 'patch', url:`/api/posts/${id}`, data: fields})
}


httpClient.deletePost = function(id){
	return this({ method: 'delete', url: `/api/posts/${id}`})
}

httpClient.addComment = function(id, fields){
	console.log(id)
	return this({method: 'post', url: `/api/posts/${id}/comments`, data: fields})
}

httpClient.getAllUsers = function(){
    return this({ method: 'get', url: '/api/users'})
}

// get user method, passing in an id
httpClient.getUser = function(id){
	return this({method:'get', url: `/api/users/${id}`, id})
}

httpClient.getMe = function(){
	return this({ method: 'get', url: `/api/users/me`})
}

httpClient.updateUser = function(id, fields){
	return this({ method: 'patch', url:`/api/users/${id}`, data: fields})
}

httpClient.deleteUser = function(id){
    return this({ method: 'delete', url: `/api/users/${id}`})
}


httpClient.addMentor = function(mentorId){
	return this({ method: 'post', url:`/api/users/${mentorId}`}) //To add mentor
}

httpClient.deleteMentor = function(mentorId){
	return this({method:'delete', url:`/api/users/${mentorId}`}) //To delete mentor
}

httpClient.getMeetup = function(){
	return this({ method: 'get', url: `/api/find/groups`})
}
// During initial app load attempt to set a localStorage stored token
// as a default header for all api requests.
httpClient.defaults.headers.common.token = httpClient.getToken()
export default httpClient