import React, { Component } from 'react';
import '../styling/TitleCard.css'

export default class TitleCard extends Component {
    render() {
        return (
            <div id='TitleCard'>
                <h1>Keegan's Blog</h1>
                <div>
                    <div id='TitleDecoration'>
                        <div id='LeftDecoration'></div>
                        <h2>Recent Posts</h2>
                        <div id='RightDecoration'></div>
                    </div>
                </div>
            </div>    
        )
    }
}