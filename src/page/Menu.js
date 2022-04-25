import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../assets/menu.css';
 
class Menu extends Component {
    render() {
        return (
            <div>
                <header className="header">
                    <a href="./" className="logo">MyFavorite</a>
                    <input className="menu-btn" type="checkbox" id="menu-btn" />
                    <label className="menu-icon" for="menu-btn"><span className="navicon"></span></label>
                    <ul className="menu">
                        <li><Link to="/dashboard">Myfood</Link></li>
                        
                        
                    </ul>
                </header>
            </div>
        );
    }
}
 
export default Menu;
