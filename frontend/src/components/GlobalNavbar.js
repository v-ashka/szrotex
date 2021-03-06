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
                    <h1 className="display-1 fw-normal mb-4">Spo??eczno????</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Znajd?? intersuj??ce Ci?? produkty w Twojej okolicy</p>
                </>
            )
        } else if (location.pathname === '/login' || location.pathname === '/register') {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Do????cz do nas!</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Stworzenie konta to tylko kilka sekund, a przynosi wiele korzy??ci!</p>
                </>
            )
        } else if (location.pathname === '/dashboard') {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Dodawaj produkty i zarabiaj!</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Tw??rz interesuj??ce opisy, konkuruj cen??, a klienci b??d?? twoi!</p>
                </>
            )
        }
         else if (location.pathname === '/list') {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Sprawd?? co nowego!</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Nowe produkty s?? ju?? dost??pne!</p>
                </>
            )
        }
        else if (location.pathname.includes('/list/')) {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Sprawd?? co nowego!</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Nowe produkty s?? ju?? dost??pne!</p>
                </>
            )
        }
         else if (location.pathname.includes('/dashboard/edit/')) {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Pope??ni??e?? b????d?</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>W ??atwy spos??b mo??esz to poprawi??!</p>
                </>
            )
        }
         else if (location.pathname.includes('/user/')) {
            return (
                <>
                    <h1 className="display-1 fw-normal mb-4">Brak konkret??w?</h1>
                    <p className="fs-1 fw-light" style={customParagraph}>Popro?? sprzedawc?? aby doda?? dodatkowe informacje!</p>
                </>
            )
        }
    }



    const AuthButton = () => {
        return <><li><Link to={"/dashboard"} className="nav-link">Panel </Link></li><li><Link to={"/"} onClick={handleLogout} className="nav-link">Wyloguj si??</Link></li></>
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
                isLogged ? AuthButton() : <><li><Link to={'/register'} className="nav-link" onClick={executeScroll}>Zarejestruj si??</Link></li><li><Link to={'/login'} className="nav-link" onClick={executeScroll}>Zaloguj si??</Link></li></>
                }
                </Nav>
            </Navbar.Collapse>  
            </Container>
                </Navbar>
                <HeaderContent>
                    <HeaderContentImage style={{top:'-200px',left: '20px', zIndex: '0'}}>
                        <HeaderPattern style={{ left: '100%', top: '50px', transform: 'translateX(-100%)' }} />                        
                    </HeaderContentImage>
                    <HeaderContentText className={"animate__animated animate__bounceInDown " + styles.header__title}>
                        {checkLocalAdress()}
                    </HeaderContentText>
                    <HeaderContentImage>
                        <HeaderPattern/>                        
                    </HeaderContentImage>
                </HeaderContent>
                <SearchBar onSubmit={(e) => e.preventDefault()} className={styles.search__form}>
                    <input className={styles.customInput} type="text" value={value} onChange={onChange} onClick={() => { onClick(); navigate('list') }} placeholder="Wprowad?? nazw?? produktu.."></input>
                     <select name='category' style={optionForm} onChange={handleProductCategory}>
                        <option value="">Wybierz kategori??</option>
                        <option value="Karoseria">Karoseria</option>
                        <option value="Filtry">Filtry</option>
                        <option value="Oleje">Oleje i smary</option>
                        <option value="O??wietlenie">O??wietlenie</option>
                        <option value="Silniki i osprz??t">Silnik i osprz??t</option>
                        <option value="Uk??ad ch??odzenia silnika">Uk??ad ch??odzenia silnika</option>
                        <option value="Uk??ad elektryczny,zap??on">Uk??ad elektryczny, zap??on</option>
                        <option value="Uk??ad hamulcowy">Uk??ad hamulcowy</option>
                        <option value="Uk??ad kierowniczy">Uk??ad kierowniczy</option>
                        <option value="Uk??ad klimatyzacji">Uk??ad klimatyzacji</option>
                        <option value="Uk??ad nap??dowy">Uk??ad nap??dowy</option>
                        <option value="Uk??ad paliwowy">Uk??ad paliwowy</option>
                        <option value="Uk??ad pneumatyczny">Uk??ad pneumatyczny</option>
                        <option value="Uk??ad wentylacji">Uk??ad wentylacji</option>
                        <option value="Uk??ad wydechowy">Uk??ad wydechowy</option>
                        <option value="Uk??ad zawieszenia">Uk??ad zawieszenia</option>
                        <option value="wycieraczki spryskiwacze">Wycieraczki i spryskiwacze</option>
                        <option value="wyposa??enie wn??trza">Wyposa??enie wn??trza</option>
                        <option value="Ogrzewanie postojowe i ch??odnictwo samochodowe">Ogrzewanie postjowe i ch??odnictwo samochodowe</option>
                        <option value="Tuning mechaniczny">Tuning mechaniczny</option>
                        <option value="Pozosta??e">Pozosta??e</option>
                        <option value="Akcesoria samochodowe">Akcesoria samochodowe</option>
                    </select>
                    <select name='voivodeship' style={optionForm} onChange={onChangeVoivode}>
                                    <option value="">Ca??a Polska</option>
                                    <option value="dolno??l??skie">woj. dolno??l??skie</option>
                                    <option value="kujawsko-pomorskie">woj. kujawsko-pomorskie</option>
                                    <option value="lubelskie">woj. lubelskie</option>
                                    <option value="lubuskie">woj. lubuskie</option>
                                    <option value="????dzkie">woj. ????dzkie</option>
                                    <option value="ma??opolskie">woj. ma??opolskie</option>
                                    <option value="mazowieckie">woj. mazowieckie</option>
                                    <option value="opolskie">woj. opolskie</option>
                                    <option value="podlaskie">woj. podlaskie</option>
                                    <option value="pomorskie">woj. pomorskie</option>
                                    <option value="??l??skie">woj. ??l??skie</option>
                                    <option value="??wi??tokrzyskie">woj. ??wi??tokrzyskie</option>
                                    <option value="warmi??sko-mazurskie">woj. warmi??sko-mazurskie</option>
                                    <option value="wielkopolskie">woj. wielkopolskie</option>
                                    <option value="zachodniopomorskie">woj. zachodniopomorskie</option>
                                </select>
                    <button ref={myRef} className={styles.searchBarButton} onClick={() => { onClick(); navigate('list');}}>Wyszukaj</button>
                </SearchBar>
            </Header>
        );

}    



export default GlobalNavbar

