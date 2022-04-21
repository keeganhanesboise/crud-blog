import React, { Component } from 'react';
import TitleCard from './TitleCard';
import '../styling/Entries.css'

export default class Entries extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            blogPosts: [],
            blogCards: [],
            entryData: []
        };
    }

    retrieveCards(data) {
        let tempPosts = this.state.blogPosts;
        data.forEach(post => {
            if ('entry_title' in post) {
                tempPosts.push(
                    {
                        id: post._id,
                        title: post.entry_title,
                        description: post.entry_description
                    }
                )
            }
        });
        this.setState({blogPosts: tempPosts});
        let tempCards = this.state.blogCards;
        tempCards = this.state.blogPosts.map((card) => {
            return (
                <div className='EntryCard' key={card.id}>
                    <div className='CardInner'>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </div>
                </div>
            )
        });
        this.setState({blogCards: tempCards});
    }

    componentDidMount() {
        fetch('http://localhost:4000/entries')
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                this.retrieveCards(data);
            })
            .catch(error => {
                console.log("There was an error: ", error);
            });
    }
    
    render() {
        return (
            <div>
                <TitleCard/>
                <div id="EntriesContainer">
                    {this.state.blogCards}
                </div>
            </div>
        )
    }
}