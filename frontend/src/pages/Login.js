import React, { useState } from "react"
// import styles from '../pages/styles.module.css'
import styles from '../styles/styles.module.css';
import {customCardBody, customCard, customWidth} from './Styles'
import user_ico from '../pages/img/public_img/user.svg';
import user_info from '../pages/img/public_img/info.svg';

function App() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errorFeed, setError] = useState('');
    async function loginUser(e) {
        let location = useLocation();
        e.preventDefault();

        const response = await fetch('http://localhost:3500/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                pass,
            }),
        })

        const data = await response.json();
        console.log(data);

        if (data.user) {
            setError('');
            localStorage.setItem('token', data.user);
            window.location.href = '/';
        } else {
            setError(data.error);
        }
        
    }

    return (
            
        <div className="row">
                <div className="col-sm-12 col-md-6 mb-4">
                    <div className="card mb-3" style={customCard}>
                        <div className="row g-0 p-5 flex-column">
                            <div className={`col-md-4 d-flex align-items-center ${styles.columnGap}`} style={customWidth}>
                                <img src={user_ico} className="img-fluid rounded-start" width="60px" alt="User information image" />
                                 <h5 className={`card-title ${styles.primaryColor}`}>Zaloguj się</h5>
                            </div>
                            <div className="col-md-8">
                            <div className="card-body" style={customCardBody}>
                                <form onSubmit={loginUser} className={styles.registerForm}>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            required
                                            className="form-control"
                                            value={email}
                                            onChange={ (e) => setEmail(e.target.value)}
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
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Zaloguj się" className={`${styles.formButton} p-2 w-50`}/>
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
                                <img src={user_info} className="img-fluid rounded-start" width="60px" alt="User information image" />
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