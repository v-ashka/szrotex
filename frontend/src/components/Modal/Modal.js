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
    const [region, setRegion] = useState({voivodeship: '', street: '', zip: '', city: ''})
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
            return input.disabled = !input.disabled
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

    const handleRegionChange = e => {
        const {name ,value} = e.target
        console.log(region)
        setRegion(state => ({
            ...state,
            [name]: value
        }))
    }
    // console.log(region)
    const addUserInfo = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3500/dashboard_panel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                desc,
                workSchedule,
                region
            })
        })
        const data = await res.json()
        console.log('test', data);
        if (data.status === '200') {
            setError('');
            window.location.href = '/dashboard';
        } else if (data.errors) {
            console.log(data.errors[0].msg);
            setError(data.errors[0].msg)
        }
    }

    // console.log(workSchedule)

    return (
        <>
            <ModalContent showModal={showModal} setShowModal={setShowModal} desc={desc} setDesc={setDesc} region={region} workSchedule={workSchedule} errorFeed={errorFeed} addUserInfo={addUserInfo} handleRegionChange={handleRegionChange} handleScheduleEndChange={handleScheduleEndChange} handleScheduleStartChange={handleScheduleStartChange} handleOnCheck={handleOnCheck} />
        </>
    );
}



export const ModalEdit = ({ showModal, setShowModal, user}) => {
    
    const [desc, setDesc] = useState(user.description);
    const [region, setRegion] = useState({voivodeship: user.region.voivodeship, street: user.region.street, zip: user.region.zip, city: user.region.city})
    const [workSchedule, setWorkSchedule] = useState({Monday: {Start: user.workSchedule.Monday.Start, End: user.workSchedule.Monday.End, FreeDay: user.workSchedule.Monday.FreeDay}, Tuesday: {Start: user.workSchedule.Tuesday.Start, End: user.workSchedule.Tuesday.End, FreeDay: user.workSchedule.Tuesday.FreeDay}, Wednesday: {Start: user.workSchedule.Wednesday.Start, End: user.workSchedule.Wednesday.End, FreeDay: user.workSchedule.Wednesday.FreeDay}, Thursday: {Start: user.workSchedule.Thursday.Start, End: user.workSchedule.Thursday.End, FreeDay: user.workSchedule.Thursday.FreeDay}, Friday: {Start: user.workSchedule.Friday.Start, End: user.workSchedule.Friday.End, FreeDay: user.workSchedule.Friday.FreeDay}, Saturday: {Start: user.workSchedule.Saturday.Start, End: user.workSchedule.Saturday.End, FreeDay: user.workSchedule.Saturday.FreeDay }, Sunday: {Start: user.workSchedule.Sunday.Start, End: user.workSchedule.Sunday.End, FreeDay: user.workSchedule.Sunday.FreeDay}});
    const [errorFeed, setError] = useState('');

    console.log(workSchedule)
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
            return input.disabled = !input.disabled
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

    const handleRegionChange = e => {
        const {name ,value} = e.target
        console.log(region)
        setRegion(state => ({
            ...state,
            [name]: value
        }))
    }
    // console.log(region)
    const addUserInfo = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3500/dashboard_panel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                desc,
                workSchedule,
                region
            })
        })
        const data = await res.json()
        console.log('test', data);
        if (data.status === '200') {
            setError('');
            window.location.href = '/dashboard';
        } else if (data.errors) {
            console.log(data.errors[0].msg);
            setError(data.errors[0].msg)
        }
    }

    // console.log(workSchedule)

    return (
        <>
          <ModalContent showModal={showModal} setShowModal={setShowModal} desc={desc} setDesc={setDesc} region={region} workSchedule={workSchedule} errorFeed={errorFeed} addUserInfo={addUserInfo} handleRegionChange={handleRegionChange} handleScheduleEndChange={handleScheduleEndChange} handleScheduleStartChange={handleScheduleStartChange} handleOnCheck={handleOnCheck} />
        </>
    );
}

const ModalContent = ({showModal, addUserInfo, handleOnCheck, handleScheduleEndChange, handleScheduleStartChange, handleRegionChange, setShowModal, desc, setDesc, region, workSchedule, errorFeed}) => {
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
                            <div className={styles.form_group} style={{flexDirection: 'column', alignItems: 'start'}}>
                                <label>Adres</label>
                                <select name='voivodeship' onChange={handleRegionChange} value={region.voivodeship}>
                                    <option value="">--- Wybierz województwo ---</option>
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
                                <input type="text" name='city' placeholder='Miasto' onChange={handleRegionChange} value={region.city}></input>
                                <input type="text" name='zip' placeholder='Kod pocztowy' onChange={handleRegionChange} value={region.zip}></input>
                                <input type="text" name='street' placeholder='Ulica i numer Budynku' onChange={handleRegionChange} defaultValue={region.street}></input>
                            </div>
                            <div style={{flexDirection: 'column'}}>
                                <label>Ustaw harmonogram pracy</label>
                                    <div className={styles.form_group}>
                                        <label>Poniedziałek</label>
                                        <input
                                        type="time"
                                        value={workSchedule.Monday.Start}
                                        required
                                        placeholder='Godzina początku pracy'
                                        name='Monday'
                                            onChange={handleScheduleStartChange}
                                        disabled={workSchedule.Monday.FreeDay ? (true) : (false)}
                                            
                                        />    
                                        <input
                                            type="time"
                                            value={workSchedule.Monday.End}
                                            required
                                            placeholder='Godzina końca pracy'
                                            name='Monday'
                                            onChange={handleScheduleEndChange}
                                            disabled={workSchedule.Monday.FreeDay ? (true) : (false)}

                                        />                                                                        
                                        <label>{workSchedule.Monday.FreeDay ? ('Dzień wolny') : ('Dzień pracujący')}</label>
                                        <input type="checkbox" name="Monday" value={workSchedule.Monday.FreeDay} onChange={handleOnCheck} defaultChecked={workSchedule.Monday.FreeDay ? (true):(false)} />
                                    </div>
                                    <div className={styles.form_group}>
                                        <label>Wtorek</label>
                                        <input
                                            type="time"
                                            value={workSchedule.Tuesday.Start}
                                            required
                                            placeholder='Godzina początku pracy'
                                            onChange={handleScheduleStartChange}
                                            name='Tuesday'
                                            disabled={workSchedule.Tuesday.FreeDay ? (true) : (false)}
                                        />    
                                        <input
                                            type="time"
                                            value={workSchedule.Tuesday.End}
                                            required
                                            placeholder='Godzina końca pracy'
                                            onChange={handleScheduleEndChange}
                                            name='Tuesday'
                                            disabled={workSchedule.Tuesday.FreeDay ? (true) : (false)}
                                            
                                        />    
                                    <label>{workSchedule.Tuesday.FreeDay ? ('Dzień wolny') : ('Dzień pracujący')}</label>
                                    <input type="checkbox" name="Tuesday" value={workSchedule.Tuesday.FreeDay} onChange={handleOnCheck} defaultChecked={workSchedule.Tuesday.FreeDay ? (true) : (false)}/>

                                </div>
                                 <div className={styles.form_group}>
                                        <label>Środa</label>
                                        <input
                                            type="time"
                                            value={workSchedule.Wednesday.Start}
                                            required
                                            placeholder='Godzina początku pracy'
                                        onChange={handleScheduleStartChange}
                                            name='Wednesday'
                                            disabled={workSchedule.Wednesday.FreeDay ? (true) : (false)}
                                        />    
                                        <input
                                            type="time"
                                            value={workSchedule.Wednesday.End}
                                            required
                                            placeholder='Godzina końca pracy'
                                        onChange={handleScheduleEndChange}
                                            name='Wednesday'
                                            disabled={workSchedule.Wednesday.FreeDay ? (true) : (false)}
                                        />   
                                <label>{workSchedule.Wednesday.FreeDay ? ('Dzień wolny') : ('Dzień pracujący')}</label>
                                <input type="checkbox" name="Wednesday" value={workSchedule.Wednesday.FreeDay} onChange={handleOnCheck} defaultChecked={workSchedule.Wednesday.FreeDay ? (true) : (false)}/>
                                </div>
                                    <div className={styles.form_group}>
                                        <label>Czwartek</label>
                                        <input
                                            type="time"
                                            value={workSchedule.Thursday.Start}
                                            required
                                            placeholder='Godzina początku pracy'
                                        onChange={handleScheduleStartChange}
                                            name="Thursday"
                                            disabled={workSchedule.Thursday.FreeDay ? (true) : (false)}
                                        />    
                                        <input
                                            type="time"
                                            value={workSchedule.Thursday.End}
                                            required
                                            placeholder='Godzina końca pracy'
                                        onChange={handleScheduleEndChange}
                                            name="Thursday"
                                            disabled={workSchedule.Thursday.FreeDay ? (true) : (false)}

                                        /> 
                                    <label>{workSchedule.Thursday.FreeDay ? ('Dzień wolny') : ('Dzień pracujący')}</label>    
                                    <input type="checkbox" name="Thursday" value={workSchedule.Thursday.FreeDay} onChange={handleOnCheck} defaultChecked={workSchedule.Thursday.FreeDay ? (true) : (false)}/>
                                </div>
                                   <div className={styles.form_group}>
                                        <label>Piątek</label>
                                        <input
                                            type="time"
                                            value={workSchedule.Friday.Start}
                                            required
                                            placeholder='Godzina początku pracy'
                                        onChange={handleScheduleStartChange}
                                            name="Friday"
                                            disabled={workSchedule.Friday.FreeDay ? (true) : (false)}

                                        />    
                                        <input
                                            type="time"
                                            value={workSchedule.Friday.End}
                                            required
                                            placeholder='Godzina końca pracy'
                                        onChange={handleScheduleEndChange}
                                            name="Friday"
                                            disabled={workSchedule.Friday.FreeDay ? (true) : (false)}

                                        /> 
                                        <label>{workSchedule.Friday.FreeDay ? ('Dzień wolny') : ('Dzień pracujący')}</label>
                                    <input type="checkbox" name="Friday" value={workSchedule.Friday.FreeDay} onChange={handleOnCheck} defaultChecked={workSchedule.Friday.FreeDay ? (true) : (false)}/>
                                </div>
                                   <div className={styles.form_group}>
                                        <label>Sobota</label>
                                        <input
                                            type="time"
                                            value={workSchedule.Saturday.Start}
                                            required
                                            placeholder='Godzina początku pracy'
                                        onChange={handleScheduleStartChange}
                                            name="Saturday"
                                            disabled={workSchedule.Saturday.FreeDay ? (true) : (false)}

                                        />    
                                        <input
                                            type="time"
                                            value={workSchedule.Saturday.End}
                                            required
                                            placeholder='Godzina końca pracy'
                                        onChange={handleScheduleEndChange}
                                            name="Saturday"
                                            disabled={workSchedule.Saturday.FreeDay ? (true) : (false)}

                                        />    
                                        <label>{workSchedule.Saturday.FreeDay ? ('Dzień wolny') : ('Dzień pracujący')}</label>
                                    <input type="checkbox" name="Saturday" value={workSchedule.Saturday.FreeDay} onChange={handleOnCheck} defaultChecked={workSchedule.Saturday.FreeDay ? (true) : (false)}/>
                                </div>
                                   <div className={styles.form_group}>
                                        <label>Niedziela</label>
                                        <input
                                            type="time"
                                            value={workSchedule.Sunday.Start}
                                            required
                                            placeholder='Godzina początku pracy'
                                            onChange={handleScheduleStartChange}
                                            name="Sunday"
                                            disabled={workSchedule.Sunday.FreeDay ? (true) : (false)}

                                        />    
                                        <input
                                            type="time"
                                            value={workSchedule.Sunday.End}
                                            required
                                            placeholder='Godzina końca pracy'
                                            onChange={handleScheduleEndChange}
                                            name="Sunday"
                                            disabled={workSchedule.Sunday.FreeDay ? (true) : (false)}
                                        />   
                                        <label>{workSchedule.Sunday.FreeDay ? ('Dzień wolny') : ('Dzień pracujący')}</label>    
                                    <input type="checkbox" name="Sunday" value={workSchedule.Sunday.FreeDay} onChange={handleOnCheck} defaultChecked={workSchedule.Sunday.FreeDay ? (true) : (false)}/>
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
    )
}