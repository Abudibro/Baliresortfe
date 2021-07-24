import React, { Component } from 'react'
import './ResortPage.css'
import Nav from '../../Components/NavBar/Nav';
import Footer from '../../Components/Footer/Footer';

export default class ResortPage extends Component {

    render() {
        const { title, price, imgSrc, fullDesc } = this.props.location.state;
        window.scrollTo(0, 0);
        
        return (
            <>
                <Nav />
                <div className='resort-container'>
                    <h1 className='resort-title'>{title} - ${price} Per Night</h1>
                    <img src={imgSrc} className='resort-img' alt='resort'/>
                    <p className='resort-desc main'>About this resort:</p>
                    {
                        fullDesc.split('\n').map(str => <p className='resort-desc'>{str}</p>)
                    }
                </div>
                <Footer />
            </>
        )
    }
}
