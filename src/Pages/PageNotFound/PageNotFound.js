import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../../Components/NavBar/Nav';
import Footer from '../../Components/Footer/Footer';
import './PageNotFound.css'

export const PageNotFound = () => {
    return (
        <>
            <Nav />
            <div className='pnf-container'>
                <h1 style={{margin: '12px'}}>Oops...   It looks like you tried to access a page that doesn't exist</h1>
                <Link to='/'><button className='pnf-btn'>Take me back</button></Link>
            </div>
            <Footer />
        </>
    )
}
