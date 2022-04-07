import React from 'react';
import './AdminLogin.css';
import TopLogo from '../img/TopLogo.png';
import BotCurl from '../img/Curl 3.png';

function AdminLogin() {
    return (
        <div className='Login__BG_Container'>
            <img className='TopCurl'
                src={TopLogo}
                alt="Mikaella's Resort and Events Place Logo"
            />
            <div className='Login__FG_Container'>
                <form className='LoginForm'>
                    <label for="AdminInp">Admin:</label>
                    <input type="text"
                        id="AdminInp"
                        name="AdminInp"
                        className='AdminInp'
                    />
                    <label for="PasswordInp">Password:</label>
                    <input type="password"
                        id="PasswordInp"
                        name="PasswordInp"
                        className='PasswordInp'
                    />
                    <button type="submit" className="LoginButton">
                        LOGIN
                    </button>
                </form>
            </div>
            <img className='BotCurl'
                src={BotCurl}
                alt="Mikaella's Resort and Events Place Logo"
            />
        </div>
    )
}

export default AdminLogin