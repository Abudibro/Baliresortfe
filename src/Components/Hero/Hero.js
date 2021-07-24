import React, { Component } from 'react';
import './Hero.css';

class Hero extends Component {
    render() {
        const { header, vidSrc, imgSrc, isVid, headerColor} = this.props;
        return(
            <div className='hero-container'>
                {
                    isVid ? <video src={vidSrc} autoPlay loop muted/>
                    : <img src={imgSrc} className='bg-img' alt='bg'/>
                }
                
                <h1 className='bali-awaits' style={{color: headerColor}}>{header}</h1>
            </div>
        );
    }
}

export default Hero;