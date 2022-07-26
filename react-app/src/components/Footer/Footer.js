import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css'


function Footer() {
    return (
        <div className='footer-container'>
            <div className='link-container'>
                    <NavLink className="footer-link" to="/technology">TECH</NavLink>
                    <img className='footerImage' src='./yelp_favicon.png' alt='yelp'></img>
                    <NavLink className="footer-link" to="/about">ABOUT</NavLink>
            </div>
                <hr></hr>
            <div className='team-container'>
                <a href='https://github.com/vallas01' target="_blank" rel="noopener noreferrer" className='developer-link'>Andy Vallas</a>
                <a href='https://github.com/Palillo10' target="_blank" rel="noopener noreferrer" className='developer-link'>Isaac Diaz</a>
                <a href='https://github.com/whatsup-world' target="_blank" rel="noopener noreferrer" className='developer-link'>Edward Wang</a>
                <a href='https://github.com/joquack' target="_blank" rel="noopener noreferrer" className='developer-link'>Joel Cruz</a>
            </div>
        </div>
    );
}

export default Footer;
