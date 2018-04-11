import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';


class SearchBar extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
       console.log("Typing...")
    }

    render() {
        return (
        <div className="searchbar">
            <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input
                    type="text"
                    placeholder="Search Posts..."
                    value=""
                    ref="filterTextInput"
                    onChange={this.handleChange}
                    />   
                 </FormGroup>
                 
            </Form>
        </div>
        );
    }
}

export default SearchBar;