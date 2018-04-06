import React from 'react'
import httpClient from '../httpClient'

class Bars extends React.Component {
    state = { bars: [] }

    componentDidMount(){
        //make api call to get bars
    httpClient.getBars().then((serverResponse) => {
        // console.log(serverResponse.data)
			this.setState({ bars: serverResponse.data })
		})
    }
    render() {
        const { bars } = this.state
        console.log(bars)
        return (
            <div className="Bars">
            <h1> Bars List</h1>
            <ul>
                {bars.map((b)=> {
                   return <li key={b._id}>{b.name} User: {b.user.name}</li>
                })}
            </ul>
            </div>
        )
    }
}

export default Bars