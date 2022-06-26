import React from "react";
import { Link} from 'react-router-dom'
import bugico from '../pages/img/bug.svg'
import editico from '../pages/img/edit.svg'
import moneyico from '../pages/img/money.svg'
import faceico from '../pages/img/face.svg'
import helpico from '../pages/img/public_img/help.svg';
import arrow from '../pages/img/public_img/north-east-arr.svg';
const customCard = {
    minHeight: '330px',
    maxWidth: '540px',
    backgroundColor: '#E5F0F1',
};


const customImg = {
    width: '100px',
    height: '100px',
}

const customCardBody = {
    color: 'rgba(0,68,68,0.9)',
}

const customLink = {
    color: 'rgb(0 68 68)',
    fontWeight: 'bold',
    fontDecoration: 'none',
}

function App() {
    let isLogged = false;
    if (localStorage.getItem('token')) {
        isLogged = true;
    }

    return (
        <>
        {
                isLogged ? (
                    <div className="row">
                        <div className="col-sm-6 mb-4">
                            <div className="card mb-3" style={customCard}>
                                <div className="row g-0 p-5">
                                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                                    <img src={helpico} className="img-fluid rounded-start" style={customImg} alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                    <div className="card-body" style={customCardBody}>
                                        <h5 className="card-title">Brakująca część?</h5>
                                        <p className="card-text">Znajdź swój i porównaj go z innymi centrami demontażu pojazdów.</p>
                                        <p className="card-text d-flex"><Link to={"/list"} style={customLink}>Zobacz listę produktów </Link><img src={arrow} className="img-fluid rounded-start" alt="link arrow" width="20" /></p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-6 mb-4">
                            <div className="card mb-3" style={customCard}>
                                <div className="row g-0 p-5">
                                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                                    <img src={moneyico} className="img-fluid rounded-start" style={customImg} alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                    <div className="card-body" style={customCardBody}>
                                        <h5 className="card-title">Zdobądź więcej klientów!</h5>
                                        <p className="card-text">Dodaj jak najwięcej informacji w celu przyciągnięcia większej ilości klientów.</p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                        </div>
                        <div className="col-sm-6 mb-4">
                            <div className="card mb-3" style={customCard}>
                                <div className="row g-0 p-5">
                                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                                    <img src={bugico} className="img-fluid rounded-start" style={customImg} alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                    <div className="card-body" style={customCardBody}>
                                        <h5 className="card-title">Zauważyłeś błąd?</h5>
                                            <p className="card-text">Zgłoś go naszemu administratorowi pod adresem <ins>admin@it.eszrot.com</ins></p>
                                            <p className="card-text">Oprócz opisu błędu, możesz dodatkowo wysłać zrzut ekranu, który pomoże administracji szybciej rozwiązać usterkę.</p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-6 mb-4">
                            <div className="card mb-3" style={customCard}>
                                <div className="row g-0 p-5">
                                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                                    <img src={editico} className="img-fluid rounded-start" style={customImg} alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                    <div className="card-body" style={customCardBody}>
                                        <h5 className="card-title">Pomyłka w dodawaniu produktu?</h5>
                                        <p className="card-text">Pamiętaj że każdy produkt możesz zmodyfikować w dowolnej chwili!</p>
                                        <p className="card-text d-flex"><Link to={"/dashboard"} style={customLink}>Przejdź do panelu </Link><img src={arrow} className="img-fluid rounded-start" alt="link arrow" width="20" /></p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                        </div>
                    </div>
                ) : (
                        <div className="row">
        <div className="col-sm-6 mb-4">
             <div className="card mb-3" style={customCard}>
                <div className="row g-0 p-5">
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <img src={helpico} className="img-fluid rounded-start" style={customImg} alt="..." />
                    </div>
                    <div className="col-md-8">
                    <div className="card-body" style={customCardBody}>
                        <h5 className="card-title">Brakująca część?</h5>
                        <p className="card-text">Znajdź swój i porównaj go z innymi centrami demontażu pojazdów</p>
                        <p className="card-text d-flex"><Link to={"/list"} style={customLink}>Zobacz listę produktów </Link><img src={arrow} className="img-fluid rounded-start" alt="link arrow" width="20" /></p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
               <div className="col-sm-6 mb-4">
             <div className="card mb-3" style={customCard}>
                <div className="row g-0 p-5">
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <img src={faceico} className="img-fluid rounded-start" style={customImg} alt="..." />
                    </div>
                    <div className="col-md-8">
                    <div className="card-body" style={customCardBody}>
                        <h5 className="card-title">Pierwszy raz na stronie?</h5>
                        <p className="card-text">Załóż konto, w celu uzyskania większych możliwości</p>
                        <p className="card-text d-flex"><Link to={"/register"} style={customLink}>Załóż konto</Link><img src={arrow} className="img-fluid rounded-start" alt="link arrow" width="20" /></p>
                    </div>
                    </div>
                </div>
                </div>
        </div>
           <div className="col-sm-6 mb-4">
             <div className="card mb-3" style={customCard}>
                <div className="row g-0 p-5">
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <img src={bugico} className="img-fluid rounded-start" style={customImg} alt="..." />
                    </div>
                    <div className="col-md-8">
                    <div className="card-body" style={customCardBody}>
                        <h5 className="card-title">Zauważyłeś błąd?</h5>
                        <p className="card-text">Zgłoś go naszemu administratorowi pod adresem <ins>admin@it.eszrot.com</ins></p>
                        <p className="card-text">Oprócz opisu błędu, możesz dodatkowo wysłać zrzut ekranu, który pomoże administracji szybciej rozwiązać usterkę.</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
               <div className="col-sm-6 mb-4">
             <div className="card mb-3" style={customCard}>
                <div className="row g-0 p-5">
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <img src={editico} className="img-fluid rounded-start" style={customImg} alt="..." />
                    </div>
                    <div className="col-md-8">
                    <div className="card-body" style={customCardBody}>
                        <h5 className="card-title">Autor strony</h5>
                        <p className="card-text">Stronę wykonał Marcin Wijaszka</p>
                        <p className="card-text">Projekt składa się z prostej strony typu CRUD, umożliwiająca założenie konta i sprzedaży towarów (głównie częsci używanych do samochodów)</p>
                    </div>
                    </div>
                </div>
                </div>
        </div>
        </div>
            )
        }
        </>
        );
}

export default App;