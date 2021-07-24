import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Card.css';

class Card extends Component {


    render() {
        const { title, miniDesc, fullDesc, price, id, onResortClick, resortImg } = this.props;
        return(
            <Link to={{
                pathname: `/resorts/${id}`,
                state: {
                    imgSrc: resortImg,
                    title: title,
                    fullDesc: fullDesc,
                    price: price,
                    id: id
                }
            }}
            style={{textDecoration: 'none', color: 'black'}}>
                <div className="card" onClick={() => onResortClick(id)}>
                    <img src={resortImg} alt='resort' className='card-img'/>
                    <div className='card-details'>
                        <h4 className='card-name'>
                            {title} - ${price} p/n
                        </h4>
                        <p className='card-text'>
                            {miniDesc}
                        </p>
                        <button className='card-button'>
                            Find out More
                        </button>
                    </div>

                </div>
            </Link>
        );
    }
}


export default Card;
