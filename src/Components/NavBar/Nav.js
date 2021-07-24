import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import MenuItems from './MenuItems'
import './Nav.css';
import logo from '../../resources/logo.png';

class Nav extends Component {
    constructor () {
        super();
        this.state = { click: false }
    }

    componentDidMount = () => {
        if (window.innerWidth <= 960) {
            this.setState({button: true});
        }
        else this.setState({button: false});
    }

    switchClick = () => {
        this.setState({
            click: !this.state.click
        })
    }

    showButton = () => {
        if (window.innerWidth <= 960) {
            this.setState({button: true});
        }
        else this.setState({button: false});
    }

    render()  {
        const { click } = this.state;
        
        window.addEventListener('resize', this.showButton);

        return(
            <nav className="nav-bar">
                <Link to='/'><img src={logo} className="navbar-logo" alt="Bali Resorts"/></Link>
                <div className="menu-icon" onClick={this.switchClick}>
                    <i className={click ? 'icon fas fa-times' : 'icon fas fa-bars'}></i>
                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    {MenuItems.map((item, i) => {
                        return (
                            <li key={i}>
                                <Link to={item.url} style={{textDecoration: 'none', color: 'white'}}>
                                    <p className={item.className} 
                                    onClick={() => {
                                        window.innerWidth <= 960 && this.switchClick()  
                                    }}
                                    >
                                        {item.title}
                                    </p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

export default Nav;