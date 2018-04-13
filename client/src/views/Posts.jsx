import React from 'react'
import httpClient from '../httpClient'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import _ from 'lodash'


class Posts extends React.Component {
    state = { posts: [] }

    componentDidMount(){
    httpClient.getPosts().then((serverResponse) => {
			this.setState({ posts: serverResponse.data })
		})
    }
    render() {
        const postRows = _.chunk(this.state.posts, 3)
        const { posts } = this.state
        console.log(posts)
        if(!posts)return<h1>Loading...</h1>
       
        return (
            <div>
  <div className="box" style={{float: 'right', backgroundColor: 'white'}}>
           <h1>Hello World</h1>
           </div>


             <h1 style={{color:'rgba(0,0,0,.8)', margin: '10px'}}>Latest Posts</h1>
            <div style={{ height: '450px', overflow: 'scroll'}} className="Posts"> 
         
           

            {postRows.map((row, index) => {
                return(
                    <Row key={index}>
                        {row.map((p) => {
                            return( 
                                <Col md="12" key={p._id}>
                                <Card style={{backgroundColor:'#005959', color: 'white', padding: '10px'}} key={p._id} body outline color="info">
                                        <CardTitle style={{height: '24px', overflow: 'scroll'}}>Topic: {p.title}</CardTitle>
                                        <CardText style={{backgroundColor:'white', padding: '15px', color:'black', height: '80px'}}>{p.body.substring(150,0)}...</CardText>
                                            <Button style={{backgroundColor:'#e5c9aa', border:'none'}}><Link to={`/posts/${p._id}`} style={{color:'black'}} >View post By: {p.user.name}</Link></Button>
                                    </Card> 
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

export default Posts