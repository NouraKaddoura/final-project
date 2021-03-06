import React from 'react'
import { Button, Form, Input } from 'reactstrap';
import httpClient from '../httpClient.js'


class Comment extends React.Component{

deleteComment(){
console.log("clicked")
    }  

    render(){
        console.log(this.props)
        return(
            <div className="comment">
            {this.props.comments.map((c)=>{
                return <div key={c._id}><h5>{c.body}</h5>
                <small>by:{c.user}</small>
                <div style={{borderBottom: '1px solid #e5e5e5', padding: '4px'}}></div>
                </div>
                
            })}
            
            </div>
        )
    }
}
class CommentList extends React.Component{
   
    render(){
       
        return(
            <div style={{maxHeight: '90px', overflow:'scroll'}} className="commentList">
          
            <Comment comments={this.props.comments} />
            </div>
        )
    }
}
class CommentForm extends React.Component{

state = {
    body: ''
}

onFormSubmit(evt){
    evt.preventDefault()
    console.log('clicked')
    const data = {
        // body: evt.target[0].value
        body: this.refs.commentBody.refs.commentBody.value
    }
    
    httpClient.addComment(this.props.postId, data).then((serverResponse)=>{
        console.log(serverResponse)
        this.props.updateComments(serverResponse.data)
        this.refs.commentBody.refs.commentBody.value = ''
    })
    
 
}


    render(){
        return(
            <div className="commentForm">
                        <Form onSubmit={this.onFormSubmit.bind(this)}>
							<Input type="text" ref="commentBody" innerRef="commentBody" placeholder="write a comment..." name="body" />
							<Button style={{margin: '10px' }} type="submit">Comment</Button>
						</Form>
        
            </div>
        )
    }
}


class CommentBox extends React.Component {
 
    render(){
        console.log(this.props)
        return(
            <div className="commentBox">
           <h4>Comments:</h4>
           <CommentList comments={this.props.comments}/>
           <CommentForm updateComments={this.props.updateComments} postId={this.props.postId} comments={this.props.comments}/>
            </div>

        )
    }
}


export default CommentBox