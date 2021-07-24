import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './ResortCard.css'

export default class ResortCard extends Component {

    constructor() {
        super();
        this.state = {
            img: null
        }
    }

    componentDidMount = () => {
        // fetch(`https://api.unsplash.com/photos/${this.props.imgSrc}?client_id=2u07eBcTam7NR1moWZfoqILi6mTG5zq9Y1E8PK6jMoE`)
        // .then(resp => resp.json())
        // .then(data => {
        //     this.setState({img: data.urls.regular});
        // })
        console.log(this.props);
    }

    render() {
        const { title, price, id, imgSrc, fullDesc } = this.props;
        return (
            <Link to={{
                pathname: `/resorts/${id}`,
                state: {
                    imgSrc: imgSrc,
                    title: title,
                    fullDesc: fullDesc,
                    price: price,
                    id: id
                }
            }}
            style={{textDecoration: 'none', color: 'black'}}>
                <div className='resort-card-container'>
                    <div className='resort-card-image-container'>
                        <img src={imgSrc} className='resort-card-image' alt='Resorts'/>
                        <p className='resort-card-price'>${price} per night</p>
                    </div>
                    <p className='resort-card-title'>{title}</p>
                </div>
            </Link>
        )
    }
}