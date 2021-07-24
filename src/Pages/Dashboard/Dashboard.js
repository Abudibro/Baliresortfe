import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../resources/logo.png';
import './Dashboard.css'

// import { Redirect } from 'react-router';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            resorts: []
        }
    }

    // MAKE CALL FOR ROOMS, THEN SET STATE
    componentDidMount = () => {
        fetch('https://peaceful-tor-05570.herokuapp.com/dashboard')
        .then(resp => resp.json())
        .then(data => {
            if (data === 'not logged in') {
                return (this.props.history.push('/admin'));
            }
            else {
                this.setState({loggedIn: true, resorts: data});
                console.log(data);
            }
        })
        .catch(() => {this.props.history.push('/admin')})
    }

    onDeleteResort = (i, id) => {
        fetch(`https://peaceful-tor-05570.herokuapp.com/dashboard/delete/${id}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {
            if (data === 'not logged in') {
                return (this.props.history.push('/admin'));
            }
            else if (data === 'deleted') {
                const updatedResorts = this.state.resorts;
                updatedResorts.splice(i, 1);
                this.setState({resorts: updatedResorts});
            }
            else alert('Error deleting resort');
        })
        // .catch(alert('Error deleting resort'))
    }

    onSignOut = () => {
        fetch('https://peaceful-tor-05570.herokuapp.com/signout', {method: 'GET'})
    }

    render() {


        return (
        this.state.loggedIn ?
        <>
                <div className='db-body'>
                    <nav className='db-nav'>
                        <img src={logo} className='navbar-logo' style={{marginLeft: '35px'}} alt='logo'/>
                        <Link style={{textDecoration: 'none', color: 'white', marginRight: '35px'}} to='/admin'><p onClick={this.onSignOut}>Sign Out</p></Link>
                    </nav>

                <Link to='/dashboard/add'><i className='fas fa-plus db-icon' style={{background: 'rgb(12, 177, 12)', color: '#EFEFEF', float: 'right', margin: '30px'}}></i></Link>
                <div className='db-resorts'>
                    {
                        this.state.resorts.map((resort, i) => {
                            return (
                                <div className='db-resort'>
                                    <img src={resort.img} alt='resort' className='db-img' />
                                    <div style={{margin: '10px'}}>
                                        <h3 className='db-title'>{resort.title} - {resort.price}</h3>
                                        <p className='db-dec'>{resort.minidesc}</p>
                                    </div>
                                    <div className='db-icons'>
                                        <Link to={{
                                            pathname: `/dashboard/edit/${resort.id}`,
                                            state: {resort: resort}
                                        }}
                                        style={{textDecoration: 'none', color: 'black'}}>
                                            <i className="fas fa-edit db-icon" style={{background: 'rgb(12, 177, 12)', color: '#EFEFEF'}}></i>
                                        </Link>
                                        <i className="fas fa-trash-alt db-icon" style={{background: 'rgb(175, 0, 0)', color: '#EFEFEF'}} onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this resort?")) this.onDeleteResort(i, resort.id)
                                        }
                                        }></i>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
            : null
        );
    }
}
