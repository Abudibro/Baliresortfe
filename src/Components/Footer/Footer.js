import React, { Component } from 'react'
import './Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <div className='footer-body'>
                <div className='sign-up-section'>
                    <h1 className='sign-up-header'>JOIN OUR BALI NEWSLETTER.</h1>
                    <div className='sign-up'>
                        <input type='text' className='sign-up-email' placeholder='Enter Your Email'/>
                        <button className='sign-up-btn'>Sign Me Up</button>
                    </div>
                </div>
                <div className='links-section'>
                    <div className='links-icons'>
                        <i className='links-icon fab fa-instagram'/>
                        <i className='links-icon fab fa-twitter'/>
                        <i className='links-icon fab fa-facebook'/>
                    </div>
                    <ul className='links-pages'>
                       <li className='links-page'>Home</li>
                       <p className='border'> | </p>
                       <li className='links-page'>Services</li>
                       <p className='border'> | </p>
                       <li className='links-page'>Products</li>
                       <p className='border'> | </p>
                       <li className='links-page'>Register</li>
                    </ul>
                </div>
            </div>
        )
    }
}