import React, { Component } from 'react';
import '../styling/NewEntries.css';

/**
 * Form for editing exisiting posts
 */
export default class EditEntries extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            displayForm: 'flex',            // Display class value for form
            message: 'Updating post...',    // Message for adding post
            displayMessage: 'none',         // Display class value for message
            messageColor: '#FFDB58',        // Color of message
        };
    }

    render() {
        
        /**
        * Make POST request with new info box values for post matching id in the current pathname
        * @param {event} e 
         */
        const handleSubmit = (e) => {
            e.preventDefault();

            // If no title is given alert user
            if (e.target.elements.title.value.length < 1) {
                alert("Please add a post title!");
            } else {
                // Make POST request
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var raw = JSON.stringify({
                    "entry_title": e.target.elements.title.value,
                    "entry_description": e.target.elements.description.value
                })
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                let url = 'http://localhost:4000/entries' + window.location.pathname;
                fetch(url, requestOptions)
                    .then(async response => {
                        const isJson = response.headers.get('content-type')?.includes('application/json');
                        const data = isJson && await response.json();
                
                        // check for error response
                        if (!response.ok) {

                            // get error message from body or default to response status
                            const error = (data && data.message) || response.status;
                            return Promise.reject(error);
                        }
                        console.log(response); 
                        this.setState({ message: 'Post has been updated!'})
                        this.setState({ messageColor: '#41B3A3'})         
                    })
                    .catch(error => {
                        console.error('There was an error!', error);  
                        this.setState({ message: 'Failed to update :('})
                        this.setState({ messageColor: '#8b0000'})
                    });
                this.setState({ displayForm: 'none' });
                this.setState({ displayMessage: 'flex' });
            }
        }

        return (
            <div>
                <div id="MessageContainer">
                    <div id="Message" style={{display: this.state.displayMessage, backgroundColor: this.state.messageColor}}>
                        {this.state.message}
                    </div>
                </div>
                <div style={{display: this.state.displayForm, flexDirection: 'column'}}>
                    <div id="TitleContainer">
                        <h1>Edit Blog Post</h1>
                    </div>
                    <div id="FormContainer">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title">Title:</label><br/>
                            <input className="title" type="text" id="title" name="title"/><br/>
                            <label className="descriptionTitle" htmlFor="description">Description:</label><br/>
                            <textarea className="description" type="text" id="description" name="description" cols="40" rows="5"></textarea><br/>
                            <input className="submitButton" type="submit" value="Edit Post"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}