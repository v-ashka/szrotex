import React, {useRef} from "react";
import { Link, useLocation, useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import { Navbar, Container, Nav} from 'react-bootstrap'
// import styles from './styles.module.css';
import styles from '../styles/styles.module.css';
import logo from '../pages/img/logo.svg'

const Header = styled.header`
    width: 100%;
    background-color: #003C3C;
    margin-bottom: 2em;
`

const HeaderContent = styled.section`
    width: 100%;
    overflow: hidden;
    display: flex;
    color: #dedede;
    position: 'relative';
    height: 700px;
`

const HeaderContentText = styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    justify-content: center;
    position: absolute;
    top: 25%;
    left: 15%;
`

const HeaderContentImage = styled.div`
    width: 10%;
    display: flex;
    flex-direction: column;
    position: relative;
    top: 100px;
    left: 70%;
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
    column-gap: 15px;
    height: 150px;
    width: 100%;
    background: rgb(249 249 249);
    display: flex;
    justify-content: center;
    padding: 1em;
    align-items: center;
`

const customParagraph = {
    backgroundColor: 'rgba(35,198,134, 0.3)',
    padding: '0.2em',
}

const optionForm = {
    backgroundColor: 'rgb(207, 231, 233)',
    border: 'none',
    borderRadius: '5px',
    color: 'rgb(32, 32, 32)',
    height: '2.5em',
    width: '10%'
}


const GlobalNavbar = ({value, onChange, onClick, onChangeVoivode, handleProductCategory, handleClickBtn}) => {
        const location = useLocation();
        const navigate = useNavigate();
        const myRef = useRef(null);
    
    const executeScroll = () => myRef.current.scrollIntoView()

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
                    <p className="fs-1 fw-light" style={customParagraph}>Stworzenie konta to tylko kilka sekund, a przynosi wiele korzyści!</p>
                </>
            )
        } else if (location.pathname === '/dashboard') {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Dodawaj produkty i zarabiaj!</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Twórz interesujące opisy, konkuruj ceną, a klienci będą twoi!</p>
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
         else if (location.pathname.includes('/dashboard/edit/')) {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Popełniłeś błąd?</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>W łatwy sposób możesz to poprawić!</p>
                </>
            )
        }
         else if (location.pathname.includes('/user/')) {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Brak konkretów?</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Poproś sprzedawcę aby dodał dodatkowe informacje!</p>
                </>
            )
        }
    }



    const AuthButton = () => {
        return <><li><Link to={"/dashboard"} className="nav-link">Panel </Link></li><li><Link to={"/"} onClick={handleLogout} className="nav-link">Wyloguj się</Link></li></>
    }

        return (
            <Header>
                <Navbar collapseOnSelect expand="lg" bg="success" className={styles.primary_bg} variant="dark" style={{position: 'relative'}}>
            <Container>
                        <Link to={"/"} onClick={executeScroll} className="navbar-brand"><img src={logo} className="d-inline-block align-top"width="45" height="35" alt="Logo"/>Szrotex</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                {
                isLogged ? AuthButton() : <><li><Link to={'/register'} className="nav-link" onClick={executeScroll}>Zarejestruj się</Link></li><li><Link to={'/login'} className="nav-link" onClick={executeScroll}>Zaloguj się</Link></li></>
                }
                </Nav>
            </Navbar.Collapse>  
            </Container>
                </Navbar>
                <HeaderContent>
                    <HeaderContentImage style={{top:'-200px',left: '20px', zIndex: '0'}}>
                        <HeaderPattern style={{ left: '100%', top: '50px', transform: 'translateX(-100%)' }} />                        
                    </HeaderContentImage>
                    <HeaderContentText className="animate__animated animate__bounceInDown">
                        {checkLocalAdress()}
                    </HeaderContentText>
                    <HeaderContentImage>
                        <HeaderPattern/>                        
                    </HeaderContentImage>
                </HeaderContent>
                <SearchBar onSubmit={(e) => e.preventDefault()}>
                    <input className={styles.customInput} type="text" value={value} onChange={onChange} onClick={() => { onClick(); navigate('list') }} placeholder="Wprowadź nazwę produktu.."></input>
                     <select name='category' style={optionForm} onChange={handleProductCategory}>
                        <option value="">Wybierz kategorię</option>
                        <option value="Karoseria">Karoseria</option>
                        <option value="Filtry">Filtry</option>
                        <option value="Oleje">Oleje i smary</option>
                        <option value="Oświetlenie">Oświetlenie</option>
                        <option value="Silniki i osprzęt">Silnik i osprzęt</option>
                        <option value="Układ chłodzenia silnika">Układ chłodzenia silnika</option>
                        <option value="Układ elektryczny,zapłon">Układ elektryczny, zapłon</option>
                        <option value="Układ hamulcowy">Układ hamulcowy</option>
                        <option value="Układ kierowniczy">Układ kierowniczy</option>
                        <option value="Układ klimatyzacji">Układ klimatyzacji</option>
                        <option value="Układ napędowy">Układ napędowy</option>
                        <option value="Układ paliwowy">Układ paliwowy</option>
                        <option value="Układ pneumatyczny">Układ pneumatyczny</option>
                        <option value="Układ wentylacji">Układ wentylacji</option>
                        <option value="Układ wydechowy">Układ wydechowy</option>
                        <option value="Układ zawieszenia">Układ zawieszenia</option>
                        <option value="wycieraczki spryskiwacze">Wycieraczki i spryskiwacze</option>
                        <option value="wyposażenie wnętrza">Wyposażenie wnętrza</option>
                        <option value="Ogrzewanie postojowe i chłodnictwo samochodowe">Ogrzewanie postjowe i chłodnictwo samochodowe</option>
                        <option value="Tuning mechaniczny">Tuning mechaniczny</option>
                        <option value="Pozostałe">Pozostałe</option>
                        <option value="Akcesoria samochodowe">Akcesoria samochodowe</option>
                    </select>
                    <select name='voivodeship' style={optionForm} onChange={onChangeVoivode}>
                                    <option value="">Cała Polska</option>
                                    <option value="dolnośląskie">woj. dolnośląskie</option>
                                    <option value="kujawsko-pomorskie">woj. kujawsko-pomorskie</option>
                                    <option value="lubelskie">woj. lubelskie</option>
                                    <option value="lubuskie">woj. lubuskie</option>
                                    <option value="łódzkie">woj. łódzkie</option>
                                    <option value="małopolskie">woj. małopolskie</option>
                                    <option value="mazowieckie">woj. mazowieckie</option>
                                    <option value="opolskie">woj. opolskie</option>
                                    <option value="podlaskie">woj. podlaskie</option>
                                    <option value="pomorskie">woj. pomorskie</option>
                                    <option value="śląskie">woj. śląskie</option>
                                    <option value="świętokrzyskie">woj. świętokrzyskie</option>
                                    <option value="warmińsko-mazurskie">woj. warmińsko-mazurskie</option>
                                    <option value="wielkopolskie">woj. wielkopolskie</option>
                                    <option value="zachodniopomorskie">woj. zachodniopomorskie</option>
                                </select>
                    <button ref={myRef} className={styles.searchBarButton} onClick={() => { onClick(); navigate('list');}}>Wyszukaj</button>
                </SearchBar>
            </Header>
        );

}    



export default GlobalNavbar

