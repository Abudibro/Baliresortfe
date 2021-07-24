import React, { Component } from 'react'
import './Resorts.css';
import Hero from '../../Components/Hero/Hero';
import Nav from '../../Components/NavBar/Nav';
import Footer from '../../Components/Footer/Footer';
import resort2 from '../../resources/resort-2.jpg';
import ResortCard from '../../Components/ResortCard/ResortCard';

export class Resorts extends Component {
    constructor() {
        super();
        this.state = {
            resorts: [],
            price: 500,
            order: 'high-to-low',
            smokingAllowed: 'any',
            guestsAllowed: 'any'
        }
    }

    // MAKE CALL FOR ROOMS, THEN SET STATE
    componentDidMount = () => {
        fetch('https://peaceful-tor-05570.herokuapp.com/resorts')
        .then(resp => resp.json())
        .then(data => {
            if (data) this.setState({resorts: data});
        })
    }

    onChangePrice = (e) =>  {
        this.setState({price: e.target.value});
    }

    onChangeOrder = (e) => {
        this.setState({order: e.target.value});
    }

    onChangeSmoking = (e) => {
        if (e.target.value === 'true') this.setState({ smokingAllowed: true})
        else if (e.target.value === 'false') this.setState({ smokingAllowed: false})
        else this.setState({ smokingAllowed: 'any'})
    }

    onChangeGuests = (e) => {
        if (e.target.value === 'true') this.setState({ guestsAllowed: true})
        else if (e.target.value === 'false') this.setState({ guestsAllowed: false})
        else this.setState({ guestsAllowed: 'any'})
    }

    render() {
        const { price, order, smokingAllowed, guestsAllowed, resorts } = this.state;

        const filterResorts = resorts.filter(resort => {
            const allowsSmokingCriteriaMet = () => {
                console.log(smokingAllowed === resort.smoking)
                return smokingAllowed === "any" ? true : (smokingAllowed === resort.smoking);
            }

            const roomWithinRange = () => {
                return price >= resort.price;
            }

            const additionalGuestsCriteriaMet = () => {
                return guestsAllowed === "any" ? true : (guestsAllowed === resort.guests);
            }

            return (roomWithinRange() &&
                    additionalGuestsCriteriaMet() &&
                    allowsSmokingCriteriaMet());
        });

        const compare = ((a, b) => {
            const priceA = a.price;
            const priceB = b.price;
            
            let comparison = 0;
            if (priceA > priceB) {
                comparison = 1;
            } else if (priceA < priceB) {
                comparison = -1;
            }
            return comparison;
        })

        const compareBackwards =((a, b) => {
            const priceA = a.price;
            const priceB = b.price;
            
            let comparison = 0;
            if (priceA > priceB) {
                comparison = 1;
            } else if (priceA < priceB) {
                comparison = -1;
            }
            return comparison * -1;
        })

        const compareAlphabetically =((a, b) => {
            const priceA = a.title;
            const priceB = b.title;
            
            let comparison = 0;
            if (priceA > priceB) {
                comparison = 1;
            } else if (priceA < priceB) {
                comparison = -1;
            }
            return comparison;
        })

        const orderResorts = (direction) => {
            if (direction === 'low-to-high') 
                return filterResorts.sort(compare);
            else if (direction === 'high-to-low')
            return filterResorts.sort(compareBackwards);
            else return filterResorts.sort(compareAlphabetically);
        }

        return (
            <>
                <Nav />
                <Hero header={'RESORTS'} vidSrc={null} imgSrc={resort2} isVid={false} headerColor={'white'}/>
                <div className='resorts-main'>
                    <div className='resorts-filters'>
                        <div className='resorts-filter'>
                            <label style={{margin: '5px'}}>Order By</label>
                            <select className='drop-down'  onChange={this.onChangeOrder} style={{margin: '5px'}}>
                                <option value='high-to-low' defaultValue>Price: Highest to Lowest</option>
                                <option value='low-to-high'>Price: Lowest to Highest</option>
                                <option value='alphabetical'>Alphabetical</option>
                            </select>
                        </div>

                        <div className='resorts-filter'>
                            <label style={{margin: '5px'}}>Max Price</label>
                            <div style={{opacity: '0.7'}}>
                                <label style={{margin: '5px'}}>$0</label>
                                <input type="range" min="1" max="500" defaultValue="500" className="slider"  style={{margin: '5px'}} onChange={this.onChangePrice}/>
                                <label style={{margin: '5px'}}>$500</label>
                            </div>
                        </div>

                        <div className='resorts-filter'>
                            <label style={{margin: '5px'}}>Smoking Allowed</label>
                            <select className='drop-down' onChange={this.onChangeSmoking} style={{margin: '5px'}}>
                                <option value='any' defaultValue>Any</option>
                                <option value='true' >Yes</option>
                                <option value='false'>No</option>
                            </select>
                        </div>

                        <div className='resorts-filter'>
                            <label style={{margin: '5px'}}>Guests Allowed</label>
                            <select className='drop-down' onChange={this.onChangeGuests} style={{margin: '5px'}}>
                                <option value='any' defaultValue>Any</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </div>
                    </div>
                    <div className='resorts-container'>
                        {
                            orderResorts(order).map((resort, i) => {

                                return (
                                    <ResortCard
                                    imgSrc={resort.img}
                                    title={resort.title}
                                    price={resort.price}
                                    fullDesc={resort.fulldesc}
                                    id={i}
                                    key={i}/>
                                );
                            }) 
                        }
                        
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default Resorts;
