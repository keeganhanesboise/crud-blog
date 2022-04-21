import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styling/NavBar.css'

export default class NavBar extends Component {
    render() {
        return (
            <div id='NavBar'>
                <Link to='/' className='Link'>
                    <div className='NavLink'>Home</div>
                </Link>
                <Link to='/new' className='Link'>
                    <div className='NavLink'>New Post</div>
                </Link>
            </div>    
        )
    }
}