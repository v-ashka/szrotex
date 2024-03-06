import React, {Component} from "react";
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    
    render() {
        console.log(this)
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to={"/"} className="navbar-brand">eZłom.pl</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to={"/register"} className="nav-link">Zarejestruj się</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to={"/login"} className="nav-link">Zaloguj się</Link>
                        </li>
                    </ul>
                </div> 
            </nav>
        );
    }
}