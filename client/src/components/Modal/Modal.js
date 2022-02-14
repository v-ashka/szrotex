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
    const [workSchedule, setWorkSchedule] = useState({Monday: {Start: 0.00, End: 0.00, FreeDay: false}, Tuesday: {Start: 0, End: 0, FreeDay: false}, Wednesday: {Start: 0, End: 0, FreeDay: false}, Thursday: {Start: 0, End: 0, FreeDay: false}, Friday: {Start: 0, End: 0, FreeDay: false}, Saturday: {Start: 0, End: 0, FreeDay: false }, Sunday: {Start: 0, End: 0, FreeDay: false}});
    const [errorFeed, setError] = useState('');
    
    const handleOnCheck = (e) => {
        const { name } = e.target
        // console.log(disableInput)
       // console.log(e.target.parentElement.childNodes)
        const inputs = [e.target.parentElement.childNodes[1], e.target.parentElement.childNodes[2]]
        setWorkSchedule(workSchedule => ({
            ...workSchedule,
            [name]: {Start: workSchedule[name].Start, End: workSchedule[name].End, FreeDay: !workSchedule[name].FreeDay}
        }))
        inputs.map(input => {
            input.disabled = !input.disabled
        })
    }

    const handleScheduleStartChange = e => {

        console.log(e.target.value, workSchedule.Monday.Start)
        const {name, value} = e.target
        setWorkSchedule(workSchedule => ({
            ...workSchedule,
            [name]: {Start: value, End: workSchedule[name].End, FreeDay: workSchedule[name].FreeDay},
        }))
    }

    const handleScheduleEndChange = e => {
        const { name, value } = e.target;
        setWorkSchedule(state => ({
            ...state,
            [name]: {Start: workSchedule[name].Start, End: value,  FreeDay: workSchedule[name].FreeDay},
        }));
    }

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
                workSchedule,
            })
        })
        const data = await res.json()
        console.log('test', data);
        if (data.status == 200) {
            setError('');
            // window.location.href = '/dashboard';
        } else if (data.errors) {
            console.log(data.errors[0].msg);
            setError(data.errors[0].msg)
        }
    }

    console.log(workSchedule)

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
                                <div style={{flexDirection: 'column'}}>
                                    <label>Ustaw harmonogram pracy</label>
                                        <div className={styles.form_group}>
                                            <label>Poniedziałek</label>
                                            <input
                                            type="number"
                                            value={workSchedule.Monday.Start}
                                            required
                                            placeholder='Godzina początku pracy'
                                            name='Monday'
                                            onChange={handleScheduleStartChange}
                                            />    
                                            <input
                                                type="number"
                                                value={workSchedule.Monday.End}
                                                required
                                                placeholder='Godzina końca pracy'
                                                name='Monday'
                                                onChange={handleScheduleEndChange}
                                        />
                                        <input type="checkbox" name="Monday" value={workSchedule.Monday.FreeDay} onChange={handleOnCheck}/>
                                        </div>
                                        <div className={styles.form_group}>
                                            <label>Wtorek</label>
                                            <input
                                                type="number"
                                                value={workSchedule.Tuesday.Start}
                                                required
                                                placeholder='Godzina początku pracy'
                                                onChange={handleScheduleStartChange}
                                                name='Tuesday'

                                            />    
                                            <input
                                                type="number"
                                                value={workSchedule.Tuesday.End}
                                                required
                                                placeholder='Godzina końca pracy'
                                                onChange={handleScheduleEndChange}
                                                name='Tuesday'
                                        />    
                                        <input type="checkbox" name="Tuesday" value={workSchedule.Tuesday.FreeDay} onChange={handleOnCheck}/>

                                    </div>
                                     <div className={styles.form_group}>
                                            <label>Środa</label>
                                            <input
                                                type="number"
                                                value={workSchedule.Wednesday.Start}
                                                required
                                                placeholder='Godzina początku pracy'
                                            onChange={handleScheduleStartChange}
                                            name='Wednesday'
                                            />    
                                            <input
                                                type="number"
                                                value={workSchedule.Wednesday.End}
                                                required
                                                placeholder='Godzina końca pracy'
                                            onChange={handleScheduleEndChange}
                                            name='Wednesday'
                                        />   
                                    <input type="checkbox" name="Wednesday" value={workSchedule.Wednesday.FreeDay} onChange={handleOnCheck}/>
                                    </div>
                                        <div className={styles.form_group}>
                                            <label>Czwartek</label>
                                            <input
                                                type="number"
                                                value={workSchedule.Thursday.Start}
                                                required
                                                placeholder='Godzina początku pracy'
                                            onChange={handleScheduleStartChange}
                                            name="Thursday"
                                            />    
                                            <input
                                                type="number"
                                                value={workSchedule.Thursday.End}
                                                required
                                                placeholder='Godzina końca pracy'
                                            onChange={handleScheduleEndChange}
                                            name="Thursday"
                                        />    
                                        <input type="checkbox" name="Thursday" value={workSchedule.Thursday.FreeDay} onChange={handleOnCheck}/>
                                    </div>
                                       <div className={styles.form_group}>
                                            <label>Piątek</label>
                                            <input
                                                type="number"
                                                value={workSchedule.Friday.Start}
                                                required
                                                placeholder='Godzina początku pracy'
                                            onChange={handleScheduleStartChange}
                                            name="Friday"
                                            />    
                                            <input
                                                type="number"
                                                value={workSchedule.Friday.End}
                                                required
                                                placeholder='Godzina końca pracy'
                                            onChange={handleScheduleEndChange}
                                            name="Friday"
                                        />    
                                        <input type="checkbox" name="Friday" value={workSchedule.Friday.FreeDay} onChange={handleOnCheck}/>
                                    </div>
                                       <div className={styles.form_group}>
                                            <label>Sobota</label>
                                            <input
                                                type="number"
                                                value={workSchedule.Saturday.Start}
                                                required
                                                placeholder='Godzina początku pracy'
                                            onChange={handleScheduleStartChange}
                                            name="Saturday"
                                            />    
                                            <input
                                                type="number"
                                                value={workSchedule.Saturday.End}
                                                required
                                                placeholder='Godzina końca pracy'
                                            onChange={handleScheduleEndChange}
                                            name="Saturday"
                                        />    
                                        <input type="checkbox" name="Saturday" value={workSchedule.Saturday.FreeDay} onChange={handleOnCheck}/>
                                    </div>
                                       <div className={styles.form_group}>
                                            <label>Niedziela</label>
                                            <input
                                                type="number"
                                                value={workSchedule.Sunday.Start}
                                                required
                                                placeholder='Godzina początku pracy'
                                                onChange={handleScheduleStartChange}
                                                name="Sunday"
                                            />    
                                            <input
                                                type="number"
                                                value={workSchedule.Sunday.End}
                                                required
                                                placeholder='Godzina końca pracy'
                                            onChange={handleScheduleEndChange}
                                            name="Sunday"
                                        />    
                                        <input type="checkbox" name="Sunday" value={workSchedule.Sunday.FreeDay} onChange={handleOnCheck}/>
                                        </div>
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