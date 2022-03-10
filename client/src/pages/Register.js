import React, { useState} from "react"
import {useNavigate } from "react-router-dom";
// import styles from '../pages/styles.module.css'
import styles from '../styles/styles.module.css';
import {customCardBody, customCard, customWidth} from './Styles'
function App() {
    let navigation = useNavigate();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [tel, setTel] = useState('');

    const [errorFeed, setError] = useState('');


    async function registerUser(e) {
        e.preventDefault();
        
        const response = await fetch('http://localhost:3500/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                pass,
                tel
            }),
        })

        const data = await response.json()
        console.log(data)

        if (data.status === 200) {
            navigation('/login');
        } else if (data.errors) {
            console.log(data.errors[0].msg);
            setError(data.errors[0].msg)
        }
    }

        return (
            <div className="row">
                <div className="col-sm-12 col-md-6 mb-4">
                    <div className="card mb-3" style={customCard}>
                        <div className="row g-0 p-5 flex-column">
                            <div className={`col-md-4 d-flex align-items-center ${styles.columnGap}`} style={customWidth}>
                                <img src="img/user.svg" className="img-fluid rounded-start" width="60px" alt="User information image" />
                                 <h5 className={`card-title ${styles.primaryColor}`}>Zarejestruj się</h5>
                            </div>
                            <div className="col-md-8">
                            <div className="card-body" style={customCardBody}>
                                <form onSubmit={registerUser} className={styles.registerForm}>
                                    <div className="form-group">
                                    <label>Nazwa firmy:</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        value={name}
                                        onChange={ (e) => setName(e.target.value)}
                                        placeholder="Wpisz nazwę firmy"
                                        name="company"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>E-mail:</label>
                                    <input
                                        type="email"
                                        required
                                        className="form-control"
                                        value={email}
                                        onChange={ (e) => setEmail(e.target.value)}
                                        placeholder="Podaj email"
                                        name="email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hasło:</label>
                                    <input
                                        type="password"
                                        required
                                        className="form-control"
                                        value={pass}
                                        onChange={ (e) => setPass(e.target.value)}
                                        placeholder="Podaj hasło"
                                        name="pass"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Numer telefonu</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        value={tel}
                                        onChange={ (e) => setTel(e.target.value)}
                                        placeholder="Podaj numer telefonu"
                                        name="phone"
                                    />
                                </div>
                                <div className="form-group">
                                            <input type="submit" value="Zarejestruj się" className={`${styles.formButton} p-2 w-20`}></input>
                                </div>
                                    </form>
                                    <br/>
                            <div className={styles.errorFeedback}><p>{ errorFeed }</p></div>                                    
                        </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col-sm-12 col-md-6 mb-4">
                    <div className="card mb-3" style={customCard}>
                        <div className="row g-0 p-5 flex-column">
                            <div className={`col-md-4 d-flex align-items-center ${styles.columnGap}`} style={customWidth}>
                                <img src="img/info.svg" className="img-fluid rounded-start" width="60px" alt="User information image" />
                                 <h5 className={`card-title ${styles.primaryColor}`}>Porada</h5>
                            </div>
                            <div className="col-md-12">
                            <div className="card-body" style={customCardBody}>
                                    <p className="card-text">Pamiętaj o bezpiecznym haśle!</p>
                                    <p className="card-text">Hasło powinno mieć przynajmniej <span className="fw-bold">8 znaków</span> przy czym najbezpieczniejsze hasło musi zawierać wielkie, małe litery, wraz ze znakami specjalnymi oraz liczbami</p>
                                    <p className="card-text fw-bold">Ciekawostka:</p>
                                    <p className="card-text">Najpopularniejsze hasło w internecie to <ins>12345678</ins></p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>          
            </div>
            
        );
}

export default App;