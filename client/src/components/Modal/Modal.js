import React, { useState } from 'react';
import styled from 'styled-components';
import { MdClose} from 'react-icons/md'
import styles from './styles.module.css';

const CloseModalButton = styled(MdClose)`
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 20px;
        width: 32px;
        height: 32px;
        padding: 0;
        z-index: 10;
    `;


export const Modal = ({ showModal, setShowModal}) => {
    
    const [desc, setDesc] = useState('');
    const [startWorkHour, setWorkHour] = useState('');
    const [endWorkHour, setEndWorkHour] = useState('');
    const [errorFeed, setError] = useState('');


    const addUserInfo = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3500/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                desc,
                startWorkHour,
                endWorkHour,
            })
        })
        const data = await res.json()
        console.log('test', data);
        if (data.status == 200) {
            setError('');
            window.location.href = '/dashboard';
        } else if (data.errors) {
            console.log(data.errors[0].msg);
            setError(data.errors[0].msg)
        }
    }


    return (
        <>
            {showModal ? (<div className={styles.background_Modal}>
                <div className={styles.modalWrapper}>
                    <div className={styles.modalContent}>
                        <div className={styles.content}>
                                <h2>Dodaj dodatkowe informacje</h2>
                                <CloseModalButton onClick={() => setShowModal(prev => !prev)} />
                            <form onSubmit={addUserInfo} className={styles.addProductForm}>
                                <div className={styles.form_group}>
                                    <label>Opis firmy</label>
                                    <textarea
                                        value={desc}
                                        placeholder='Tutaj wpisz opis swojej firmy'
                                        onChange={e => setDesc(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className={styles.form_group}>
                                    <label>Godziny rozpoczęcia</label>
                                    <input
                                        type="number"
                                        value={startWorkHour}
                                        required
                                        placeholder='Godzina rozpoczęcia pracy'
                                        onChange={e => setWorkHour(e.target.value)}
                                    />
                                </div>
                                <div className={styles.form_group}>
                                    <label>Godziny zakończenia pracy</label>
                                    <input
                                        type="number"
                                        value={endWorkHour}
                                        required
                                        placeholder='Godzina zakończenia pracy'
                                        onChange={e => setEndWorkHour(e.target.value)}
                                    />
                                </div>
                                <div className={styles.form_group}>
                                    <input type="submit" className={styles.formButton} value="Zapisz"/>
                                </div>
                            </form>
                            <div>{ errorFeed }</div>
                        </div>
                        </div>
                </div>
            </div>) : null}
        </>
    );
}