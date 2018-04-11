import React from 'react'
import httpClient from '../httpClient'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


class NewPost extends React.Component {
state = {
    fields: { title:'', body: ''}
}  

handleFormChange(evt){
    this.setState({
        fields: {
        ...this.state.fields, 
        [evt.target.name]: evt.target.value
       }
    })
}
handleFormSubmit(evt){
evt.preventDefault()
httpClient.createPost(this.state.fields).then((serverResponse)=>{
console.log(serverResponse.data)
this.props.history.push("/posts")
})
}
    render(){
        const { title, body} = this.state.fields
        return(
            <div style={{backgroundColor:'rgb(0,128,128)'}}className="NewPost">
            
            <h1 style={{color: 'white', margin: '10px'}} className="addPost">Add a Post</h1>
            <Form onChange={this.handleFormChange.bind(this)} onSubmit={this.handleFormSubmit.bind(this)}>
            <FormGroup row>
            <Label style={{color: 'white'}}for="title" sm={2}>Title</Label>
            <Col sm={10}>
               <Input style={{maxWidth: '800px'}} name="title" type="text" placeholder="Title" value={title} />
            </Col>
            </FormGroup>

            <FormGroup row>
            <Label style={{color:'white'}} for="body" sm={2}>Body</Label>
            <Col sm={10}>
               <Input style={{maxWidth: '800px', height:'300px'}}name="body" type="textarea" placeholder="Body" value={body} />
            </Col>
            </FormGroup>
            <FormGroup check row>
            <Col sm={{ size: 10, offset: 9 }}>
               <Button style={{margin: '12px', backgroundColor:'#4CAF50'}}>Submit</Button>
            </Col>
            </FormGroup>
           
            </Form>
            </div>
        )
    }
}

export default NewPost