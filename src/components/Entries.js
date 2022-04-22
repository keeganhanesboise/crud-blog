import React, { Component } from 'react';
import TitleCard from './TitleCard';
import { Link } from 'react-router-dom';
import '../styling/Entries.css'

export default class Entries extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            blogPosts: [],
            blogCards: [],
            entryData: [],
            displayMessage: 'none',
            displayCard: 'none',
            displayCards: 'flex',
            openedCard: [],
        };
    }

    openCard(card) {
        console.log("Card: " + card.id + " was opened");
        let idString = '/edit/' + card.id;
        let openedCard = () => {
            return (
                <div id="CardContainer">
                    <div id="CardNavContainer">
                        <Link to={idString} className='LinkCard'>
                            <div className='NavLink'>Edit</div>
                        </Link>
                        <div className='LinkCard'>
                            <div className='NavLink'>Delete</div>
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
        //document.body.style.overflow = this.state.disableScroll;

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