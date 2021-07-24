import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../resources/logo.png';
import './Edit.css';

class Edit extends Component {
    constructor() {
        super();
        this.state = { resort: {}, loggedIn: false };      
    }
    
    componentDidMount = () => {
        try {this.setState({resort: this.props.location.state.resort});}
        catch {this.props.history.push('/error');}

        fetch('https://peaceful-tor-05570.herokuapp.com/dashboard/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({resort: this.state.resort})
        })
        .then(resp => resp.json())
        .then(data => {
            if (data === 'not logged in') {
                return (this.props.history.push('/admin'));
            }
            else {
                try {this.setState({
                    resort: this.props.location.state.resort,
                    loggedIn: true
                });}
                catch {this.props.history.push('/error');}
            }
        })
    } 

    onChangeTitle = e => {
        this.setState({
            resort: {
                ...this.state.resort,
                title: e.target.value
            }
        })
    }

    onChangePrice = e => {
        this.setState({
            resort: {
                ...this.state.resort,
                price: e.target.value
            }
        })
    }

    onChangeFullDesc = e => {
        this.setState({
            resort: {
                ...this.state.resort,
                fulldesc: e.target.value
            }
        })
    }
    
    onChangeMiniDesc = e => {
        this.setState({
            resort: {
                ...this.state.resort,
                minidesc: e.target.value
            }
        })
    }

    onToggleFeatured = () => {
        this.setState({ 
            resort: {
                ...this.state.resort,
                featured: !this.state.resort.featured
            }
        });
    }
    
    onToggleSmoking = () => {
        this.setState({ 
            resort: {
                ...this.state.resort,
                smoking: !this.state.resort.smoking
            }
        });
    }

    onToggleGuests = () => {
        this.setState({ 
            resort: {
                ...this.state.resort,
                guests: !this.state.resort.guests
            }
        });
    }

    onClickSave = () => {
        const { resort } = this.state;
        fetch(`https://peaceful-tor-05570.herokuapp.com/dashboard/edit/${resort.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({resort})
        })
        .then(resp => resp.json())
        .then(data => {
            if (data === 'not logged in') {
                return (this.props.history.push('/admin'));
            }
            else if (data === 'updated') {this.props.history.push('/dashboard');}
            else alert('Error updating resort')
        })
    }

    render() {
        const { title, price, fulldesc, minidesc, img, smoking, guests, featured } = this.state.resort;
        return (
            <div className='edit-body'>
                <nav className='db-nav'>
                    <img src={logo} className='navbar-logo' style={{marginLeft: '35px'}} alt='logo'/>
                    <Link style={{textDecoration: 'none', color: 'white', marginRight: '35px'}} to='/admin'><p>Sign Out</p></Link>
                </nav>

                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} id='edit'>
                    <div className='edit-container'>
                        <img src={img} id='edit-img' alt='resort'/>
                        <div id='edit-details'>
                            <div className='details-text'>
                                <label className='detail-label'>Title</label>
                                <input type='text' id='edit-title' defaultValue={title} onChange={this.onChangeTitle}/>
                            </div>
                            <div className='toggles'>
                                <div className='details-text'>
                                    <label className='detail-label'>Price</label>
                                    <input type='number' id='edit-price' defaultValue={price} onChange={this.onChangePrice}/>
                                </div>
                                <div className='details'>
                                    <label className='label-switch'>Featured</label>
                                    <input type='checkbox' defaultChecked={featured} className='toggle' onClick={this.onToggleFeatured}/>
                                </div>
                                <div className='details'>
                                    <label className='label-switch'>Smoking Allowed</label>
                                    <input type='checkbox' defaultChecked={smoking} className='toggle' onClick={this.onToggleSmoking}/>
                                </div>
                                <div className='details'>
                                    <label className='label-switch'>Guests Allowed</label>
                                    <input type='checkbox' defaultChecked={guests} className='toggle' onClick={this.onToggleGuests}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        featured &&
                        <textarea type='text' defaultValue={minidesc} id='edit-mini-desc' onChange={this.onChangeMiniDesc}/>
                    }
                    <textarea type='text' defaultValue={fulldesc} id='edit-full-desc' onChange={this.onChangeFullDesc}/>
                    <button className='db-btn-save' onClick={this.onClickSave}>Save</button>
                </div>
            </div>
        )
    }
}

export default Edit;
