import React from 'react'
import httpClient from '../httpClient.js'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import CommentBox from './CommentBox'


class PostView extends React.Component {
    state = {
        post: '',
        modalOpen: false,
        currentUser: httpClient.getCurrentUser()
    }


updateComments(comments){
    console.log(comments)
    this.setState({
        post: comments
    })
}

handleEditClick(){
    this.setState({
        modalOpen: true
    })
   
}

handleUpdateClick(evt){
evt.preventDefault()
const { title, body } = this.refs
const postFormFields = {
    title: title.refs.title.value,
    body: body.refs.body.value
}
httpClient.updatePost(this.props.match.params.id, postFormFields)
.then((serverResponse) => {
    console.log(serverResponse.data)
    this.setState({
        modalOpen: false,
        post: serverResponse.data
    })
  })
}

handleDeleteClick(){ 
    httpClient.deletePost(this.props.match.params.id).then((serverResponse)=>{
        this.props.history.push('/posts')
    })
}
componentDidMount(){ 
    httpClient.getPost(this.props.match.params.id).then((serverResponse)=>{
        this.setState({
            post: serverResponse.data
        })
    
    })
}
render(){
    const { post, modalOpen, currentUser } = this.state
    if(!post) return <h2>Loading...</h2>
    // console.log(post)
    // console.log(post.user)
    // console.log(currentUser._id)
    return(
            <div className="PostView">
            <div className="PostDetails">
        {post.user === currentUser._id

                ? (
					<span>
					 <Button style={{ float: 'right'}} onClick={this.handleEditClick.bind(this)}>Edit Post</Button> 
					</span>
				)
				: (
					<span>
						<h1> </h1>
					</span>				
				)
			}    
        <h1>{post.title}</h1>
                <small>By: username</small>
                <div>{post.body}</div>
                <Link to="/posts">Back To Latest Posts</Link>
                <CommentBox updateComments={this.updateComments.bind(this)} postId={this.props.match.params.id} comments={post.comments} />
            </div>
                <Modal isOpen={modalOpen}>

                <ModalHeader>Edit Post</ModalHeader>
                    <Form onSubmit={this.handleUpdateClick.bind(this)}>

                    <ModalBody> 

                      
                             <FormGroup>
                                <Label for="title">Title</Label>
                                <Input defaultValue={post.title} ref="title" innerRef="title" type="text" id="title" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="body">Body</Label>
                                <Input defaultValue={post.body} ref="body" innerRef="body" type="textarea" id="body" />
                            </FormGroup>  

                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="info">Update</Button>
                        <Button type="button" onClick={this.handleDeleteClick.bind(this)}color="danger">Delete Post</Button>
                    </ModalFooter>

                    </Form>

                </Modal>

            </div>
         )
    }

}

export default PostView