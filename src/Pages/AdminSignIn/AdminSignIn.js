import React, { useState} from 'react';
import logo from '../../resources/logo1.png';
import './AdminSignIn.css';


export const AdminSignIn = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const onChangeUsername = e => {setUsername(e.target.value);}
    const onChangePassword = e => {setPassword(e.target.value);}

    const onSignIn = () => {
        fetch('https://peaceful-tor-05570.herokuapp.com/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if (data === 'sign-in') {
                props.history.push('/dashboard');
            }
            else alert('Wrong Username or Password');
            
        })
        .catch(e => {
            alert('Issue signing in, Error: ' + e)
        })
    }

    return (
        <div className='asi-body'>
            <div className='asi-container'>
                <img className='asi-logo' src={logo} alt='logo'/>
                    <div className='asi-input'>
                        <input type='text' className='asi-input-text' onChange={onChangeUsername} placeholder='Username'/>
                    </div>
                    <div className='asi-input'>
                        <input type='password' className='asi-input-text' onChange={onChangePassword} placeholder='Password'/>
                    </div>
                    <input className='asi-btn' type='button' value='Sign In' onClick={onSignIn}/>
            </div>
        </div>
    )
}
