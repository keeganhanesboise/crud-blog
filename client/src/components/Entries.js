import React, { Component } from 'react';
import TitleCard from './TitleCard';
import { Link } from 'react-router-dom';
import '../styling/Entries.css'


/**
 * Acts as home page for blog, displays all posts
 */
export default class Entries extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            blogPosts: [],              // Array of posts
            blogCards: [],              // Array of cards
            displayMessage: 'none',     // Dispaly class value for warning message when fetching cards failed 
            displayCard: 'none',        // Display class value for specific card
            displayCards: 'flex',       // Display class value for all cards
            openedCard: [],             // HMTL object of opened card
        };
    }

    /**
     * Makes DELETE request for card <id>
     * 
     * @param {number} id 
     */
    deleteCard(id) {
        let requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
        let url = "http://localhost:4000/entries/delete/" + id;
        fetch(url, requestOptions)    
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                window.location.reload();
            })
            .catch(error => {
                console.log("There was an error: ", error);
                this.setState({ displayMessage: 'flex'});
            });
    }

    /**
     * Creates and displays a larger card with the same data as <card>
     * 
     * @param {object} card
     */
    openCard(card) {
        let idString = '/edit/' + card.id;
        let openedCard = () => {
            return (
                <div id="CardContainer">
                    <div id="CardNavContainer">
                        <Link to={idString} className='LinkCard'>
                            <div className='NavLink'>Edit</div>
                        </Link>
                        <div className='LinkCard'>
                            <div className='NavLink' onClick={() => this.deleteCard(card.id)}>Delete</div>
                        </div>
                    </div>
                    <p id="CardTitle">{card.title}</p>
                    <div id="DescriptionContainer">
                        <p>{card.description}</p>
                    </div>
                </div>
            )
        }
        let newCard = openedCard();
        this.setState({ displayCards: 'none' });
        this.setState({ disableScroll: 'hidden' });
        this.setState({ openedCard: newCard});
        this.setState({ displayCard: 'flex' });
    }

    /**
     * Adds fetched cards to DOM
     * 
     * @param {object} data 
     */
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
        this.setState({blogPosts: tempPosts.reverse()});
        let tempCards = this.state.blogCards;
        tempCards = this.state.blogPosts.map((card) => {
            return (
                <div className='EntryCard' key={card.id} onClick={() => this.openCard(card)}>
                    <div className='CardInner'>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </div>
                </div>
            )
        });
        this.setState({blogCards: tempCards});
    }

    /**
     * When the component mounts, make a GET request for all posts
     * and call method to update cards, otherwise throw error
     */
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
                this.setState({ displayMessage: 'flex'});
            });
    }
    
    render() {
        return (
            <div>
                <TitleCard/>
                <div id="MessageContainer">
                    <div id="Message" style={{ display: this.state.displayMessage }}>
                        Failed to load posts
                    </div>
                </div>
                <div id="OpenedCard" style={{ display: this.state.displayCard }}>
                    {this.state.openedCard}
                </div>
                <div id="EntriesContainer" style={{ display: this.state.displayCards}}>
                    {this.state.blogCards}
                </div>
            </div>
        )
    }
}