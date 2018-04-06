import React from 'react'
import httpClient from '../httpClient'


class NewBar extends React.Component {
state = {
    fields: { name:'', adderss: ''}
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
httpClient.createBar(this.state.fields).then((serverResponse)=>{
console.log(serverResponse.data)
this.props.history.push("/bars")
})
}
    render(){
        const { name, address} = this.state.fields
        return(
            <div className="NewBar">
            <h1>Add a Bar</h1>
            <form onChange={this.handleFormChange.bind(this)} onSubmit={this.handleFormSubmit.bind(this)}>
               <input name="name" type="text" placeholder="Name" value={name} />
               <input name="address" type="text" placeholder="Address" value={address} />
               <button>Submit</button>
            </form>
            </div>
        )
    }
}

export default NewBar