import React, {useState} from "react";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { Navbar, Container, Nav} from 'react-bootstrap'
import styles from './styles.module.css';
import logo from '../pages/img/logo.svg'

const Header = styled.header`
    width: 100%;
    height: 700px;
    background-color: #003C3C;
    margin-bottom: 5em;
`

const HeaderContent = styled.section`
    width: 100%;
    height: 90%;
    overflow: hidden;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #dedede;
`

const HeaderContentText = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    justify-content: center;
`

const HeaderContentImage = styled.div`
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
`

const HeaderPattern = styled.svg`
    position: relative;
    mix-blend-mode: color-dodge;
    top: 50px;
    left: 0px;
    z-index: 0;
    height: 700px;
    width:  700px;
    color: white;
    overflow: hidden;
    border-radius: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2323d18d' fill-opacity='0.71' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
`;

const SearchBar = styled.form`
    width: 100%;
    background: rgb(245, 245, 245);
    display: flex;
    justify-content: center;
    padding: 1em;
`

const customParagraph = {
    backgroundColor: 'rgba(35,198,134, 0.3)',
    padding: '0.2em',
}


const GlobalNavbar = ({value, onChange, onClick}) => {
        const location = useLocation();
        const navigate = useNavigate();
        

    let isLogged = false;
    if (localStorage.getItem('token')) {
        isLogged = true;
    }

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            window.location.href = "/";
        } catch (err) {
            console.log(err);
            window.location.href = "/";
        }
    }




    const checkLocalAdress = () => {
        if (location.pathname === '/') {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Społeczność</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Znajdź intersujące Cię produkty w Twojej okolicy</p>
                </>
            )
        } else if (location.pathname === '/login' || location.pathname === '/register') {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Dołącz do nas!</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Stworzenie konta to tylko kilka sekund, a konto pozwala na tak wiele!</p>
                </>
            )
        } else if (location.pathname === '/dashboard') {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Dodawaj produkty i zarabiaj!</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Twórz interesujące opisy, konkuruj ceną a klienci będą twoi!</p>
                </>
            )
        }
         else if (location.pathname === '/list') {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Sprawdź co nowego!</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Nowe produkty są już dostępne!</p>
                </>
            )
        }
        else if (location.pathname.includes('/list/')) {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Sprawdź co nowego!</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Nowe produkty są już dostępne!</p>
                </>
            )
        }
    }



    const AuthButton = () => {
        return <><li><Link to={"/dashboard"} className="nav-link">Panel </Link></li><li><Link to={"/"} onClick={handleLogout} className="nav-link">Wyloguj się</Link></li></>
    }

        return (
            <Header>
            <Navbar collapseOnSelect expand="lg" bg="success" className={styles.primary_bg} variant="dark">
            <Container>
                <Link to={"/"} className="navbar-brand"><img src={logo} className="d-inline-block align-top"width="45" height="35" alt="Logo"/>Szrotex</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                {
                isLogged ? AuthButton() : <><li><Link to={'/register'} className="nav-link">Zarejestruj się</Link></li><li><Link to={'/login'} className="nav-link">Zaloguj się</Link></li></>
                }
                </Nav>
            </Navbar.Collapse>  
            </Container>
                </Navbar>
                <HeaderContent>
                    <HeaderContentText>
                        {checkLocalAdress()}
                    </HeaderContentText>
                    <HeaderContentImage>
                        <HeaderPattern>
                        </HeaderPattern>
                    </HeaderContentImage>
                </HeaderContent>
                <SearchBar onSubmit={(e) => e.preventDefault()}>
                        <input className={styles.customInput} type="text" value={value} onChange={onChange} placeholder="Wprowadź nazwę produktu.."></input>
                        <button className={styles.searchBarButton} onClick={() => onClick && navigate('list')}>Wyszukaj</button>
                </SearchBar>
            </Header>
        );

}    



export default GlobalNavbar

