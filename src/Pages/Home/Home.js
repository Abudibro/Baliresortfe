import React, { Component } from 'react'
import Nav from '../../Components/NavBar/Nav';
import Footer from '../../Components/Footer/Footer';
import Hero from '../../Components/Hero/Hero';
import Card from '../../Components/Card/Card.js';
import vid from '../../resources/background-video.mp4';
import introResort from '../../resources/resort-3.jpg'
import './Home.css';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            resorts: []
        }
    }

    componentDidMount = () => {
        fetch('https://peaceful-tor-05570.herokuapp.com/')
        .then(resp => resp.json())
        .then(data => {
            if (data) this.setState({resorts: data});
        })
    }

    // MAKE CALL FOR ROOM DESCRIPTION FROM BACKEND
    onResortClick = (id) => {
        window.scrollTo(0, 0);
    }

    render() {
        const { resorts } = this.state;

        return(
            <>
                <Nav />
                <Hero header={'BALI AWAITS'} vidSrc={vid} imgSrc={''} isVid={true} headerColor={'black'}/>
                <div className='home-container-intro'>
                    <div className='intro-text'>
                        <h1 className='intro-header'>Where Luxury Meets Nature</h1>
                        <p className='intro-desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel ex sit amet orci iaculis finibus. Curabitur ut lectus et quam dignissim laoreet id eu magna. Quisque vitae consectetur odio. Sed viverra sem sit amet lorem aliquam finibus. Sed auctor lorem id lectus laoreet placerat eget eget felis. </p>
                    </div>
                    <img src={introResort} className='intro-image' alt='intro'></img>
                </div>
                <div className='spikes'>
                    {/* <img src={spikes} className='spikes' alt='spikes'/> */}
                </div>
                <div className='home-container-perks'>
                    <h1 className='perks-header'>Some of our basic perks</h1>
                    <div className='perks-container'>
                        <div className='perk-container'>
                            <i className='fas fa-hot-tub perk-icon'/>
                            <p className='perk-desc'>Hot Tubs</p>
                        </div>
                        <div className='perk-container'>
                            <i className='fas fa-swimmer perk-icon'/>
                            <p className='perk-desc'>Pools</p>
                        </div>
                        <div className='perk-container'>
                            <i className='fas fa-umbrella-beach perk-icon'/>
                            <p className='perk-desc'>Beach</p>
                        </div>
                        <div className='perk-container'>
                            <i className='fas fa-wifi perk-icon'/>
                            <p className='perk-desc'>Free Wifi</p>
                        </div>
                        <div className='perk-container'>
                            <i className='fas fa-parking perk-icon'/>
                            <p className='perk-desc'>Free Parking</p>
                        </div>
                    </div>
                </div>
                <div className='spikes-flipped'>
                    {/* <img src={spikesFlipped} className='spikes' alt='spikes'/> */}
                </div>
                <div className='home-container-featured'>
                    <h1 className='featured-resorts'>FEATURED RESORTS</h1>
                    <div className='card-container'>
                        {
                            resorts.map((card, i) => {
                                return (
                                    <Card 
                                    resortImg={card.img}
                                    title={card.title}
                                    miniDesc={card.minidesc}
                                    price={card.price}
                                    fullDesc={card.fulldesc}
                                    id={i}
                                    key={i}
                                    onResortClick={this.onResortClick}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default Home;