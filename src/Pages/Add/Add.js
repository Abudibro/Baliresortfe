import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../resources/logo.png'

export default class Add extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            displayImg: false,
            resort: { 
                title: null,
                price: null,
                fulldesc: null,
                minidesc: null,
                img: null,
                smoking: null,
                guests: null,
                featured: null
            }
        }
    }

    componentDidMount = () => {
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
                this.setState({loggedIn: true})
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

    onChangeImage = e => {
        const xhr = new XMLHttpRequest();

        try {
            xhr.open('HEAD', e.target.value, false);
            xhr.send();
        }
        catch {console.log('lol')}
        // xhr.open('HEAD', e.target.value, false);
        // xhr.send();
        if (xhr.status === 404) {
            this.setState({displayImg: false})
        } else if (xhr.status === 200 ) {
            this.setState({
                displayImg: true,
                resort: {
                    ...this.state.resort,
                    img: e.target.value
                }
            })
        }
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
        const { title, price, fulldesc, minidesc, smoking, guests, featured } = this.state.resort;

        if (!this.state.displayImg || title === null || price === null || fulldesc === null || minidesc === null || smoking === null ||guests === null || featured === null) {
            return alert('You need to fill all the entries before saving')
        }

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
            else if (data ==='added') {
                alert(`Successfully added ${this.state.resort.title}`)
                this.props.history.push('/dashboard');
            }
            else alert(`Error adding ${this.state.resort.title}`)
        })
    }

    render() {

        const { featured, img } = this.state.resort;
        const { displayImg } = this.state;

        return (
            this.state.loggedIn ?
            <div className='edit-body'>
                <nav className='db-nav'>
                    <img src={logo} className='navbar-logo' style={{marginLeft: '35px'}} alt='logo'/>
                    <Link style={{textDecoration: 'none', color: 'white', marginRight: '35px'}} to='/admin'><p>Sign Out</p></Link>
                </nav>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} id='edit'>
                    <div className='edit-container'>
                        {
                            displayImg ? <img src={img} id='edit-img' alt='resort' onerror="this.style.display='none'"/>
                            : <p style={{height: '300px', width: '450px'}}>Enter an Image URL to view</p>
                        }
                        <div id='edit-details'>
                            <input type='text' id='edit-title' placeholder='Title' onChange={this.onChangeTitle}/>
                            <input style={{marginTop: '10px'}} type='text' id='edit-title' placeholder='Image URL' onChange={this.onChangeImage}/>
                            <div className='toggles'>
                                <input type='number' id='edit-price' placeholder='Price' onChange={this.onChangePrice}/>
                                <div className='details'>
                                    <label className='label-switch'>Featured</label>
                                    <input type='checkbox' className='toggle' onClick={this.onToggleFeatured}/>
                                </div>
                                <div className='details'>
                                    <label className='label-switch'>Smoking Allowed</label>
                                    <input type='checkbox' className='toggle' onClick={this.onToggleSmoking}/>
                                </div>
                                <div className='details'>
                                    <label className='label-switch'>Guests Allowed</label>
                                    <input type='checkbox' className='toggle' onClick={this.onToggleGuests}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        featured &&
                        <textarea type='text' id='edit-mini-desc' placeholder='Featured Description' onChange={this.onChangeMiniDesc}/>
                    }
                    <textarea type='text' id='edit-full-desc' placeholder='Room Description' onChange={this.onChangeFullDesc}/>
                    <button className='db-btn-save' onClick={this.onClickSave}>Save</button>
                </div>
            </div>
            : null
        )
    }
}
