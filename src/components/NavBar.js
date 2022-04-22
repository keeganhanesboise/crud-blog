import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styling/NavBar.css'

export default class NavBar extends Component {
    render() {
        function newRefresh() {
            if(window.location.pathname === "/new") {
                window.location.reload();
            }
        }

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