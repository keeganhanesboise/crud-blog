import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styling/NavBar.css'

/**
 * Navigation for blog
 */
export default class NavBar extends Component {
    render() {
        /**
         * Refresh page if on new post page
         */
        function newRefresh() {
            if(window.location.pathname === "/new") {
                window.location.reload();
            }
        }

        /**
         * Refresh page if home
         */
        function homeRefresh() {
            if (window.location.pathname === "/") {
                window.location.reload();
            }
        }

        return (
            <div id='NavBar'>
                <Link to='/' className='Link'>
                    <div className='NavLink' onClick={homeRefresh}>Home</div>
                </Link>
                <Link to='/new' className='Link'>
                    <div className='NavLink' onClick={newRefresh}>New Post</div>
                </Link>
            </div>    
        )
    }
}