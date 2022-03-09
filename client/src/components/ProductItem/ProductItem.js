import React, {useState, useEffect } from 'react'
import {useLocation } from "react-router-dom";
import {handleImageError, handleUserImageError} from '../ImgError/ImgError.js'
import { customCardBody, customCardProducts, imgFit, customLink, customCardBodyHeight } from '../../pages/Styles';
import { Link } from 'react-router-dom'
// import style from './styles.module.css'
import { Collapse} from 'react-bootstrap'
import expandList from '../../pages/img/expand_arr.svg'
import "./ProductItem.css"
// import styles from "../pages/styles.module.css"
import styles from '../../styles/styles.module.css';
import sellerIco from '../../pages/img/face.svg'

export const normalizeWeek = (date) => {
        switch (date) {
            case 'Monday':
                return date = 'Poniedziałek'
            case 'Tuesday':
                return date = 'Wtorek'
            case 'Wednesday':
                return date = 'Środa'
            case 'Thursday':
                return date = 'Czwartek'
            case 'Friday':
                return date = 'Piątek'
            case 'Saturday':
                return date = 'Sobota'
            case 'Sunday':
                return date = 'Niedziela'
        }
}

export const Hours = ({ schedule, today, open }) => {

    return (
        <>
            <Collapse in={open}>
                <div>
                    {
                        Object.keys(schedule).map((day, id) => {
                            return (<div key={id}>{day == today ? (<span className='fw-bold'>{normalizeWeek(day)}</span>) : (<span>{normalizeWeek(day)}</span>)} {schedule[day].FreeDay ? (<span className='fw-bold'>Zamknięte</span>) : (
                              (day == today) ? (
                                 <span className="fw-bold">{schedule[day].Start} - {schedule[day].End}</span>  
                              ): (
                                <span>{schedule[day].Start} - {schedule[day].End}</span>
                              ) 
                          )}</div>)
                    })   
                    }
                </div>
            </Collapse>
        </>
    )
}

const SellerProducts = ({ list, mainProduct }) => {
    const otherProducts = []
        list.products.filter(product => {
            if (product._id != mainProduct) {
                     product['creatorName'] = list.name
                     product['createdBy'] = list.email
                otherProducts.push(product)
            }
        })
    return(
        <>
        {otherProducts.length > 1 ? (<h3 className={'p-3 '+ styles.customHeader}>Zobacz inne produkty sprzedającego: </h3>) : (<div></div>) }
        {otherProducts.length > 0 ? (
            otherProducts.map(product => {
                return (
                    <div className={"col-lg-4 col-md-6 col-sm-12 mb-4 "} key={product._id}>
                        <Link to={'/list/' + product._id} className={styles.customLinkItem} state={product}>
                        <div className={"card " + styles.customLinkItem} style={customCardProducts}>
                        <div className="row g-0 p-5">
                            <div className="col-lg-10 col-md-10" style={customCardBody}>
                                <h5 className="card-title">{product.name}</h5>
                            </div>
                            <div className="col-lg-2 col-md-2" style={customCardBody}>
                                <h5 className="card-title d-flex justify-content-end">{product.price} PLN</h5>
                            </div>
                            <div className="col-lg-12 col-md-12">
                            <img src={product.img} onError={handleImageError} className={"img-fluid rounded-start " + styles.otherUserProductsImg} alt="Product image" />
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>
                )
            })
        ) : (
            <div></div>
        )}
        
        </>
    );
}

export const getActualDate = () => {
        const date = new Date()
        let week = [];
        week[0] = "Sunday"
        week[1] = "Monday"
        week[2] = "Tuesday"
        week[3] = "Wednesday"
        week[4] = "Thursday"
        week[5] = "Friday"
        week[6] = "Saturday"
        let result = week[date.getDay()]
        return result
}

const ProductItem = () => {
    const location = useLocation();
    const product = location.state;
    const [list, setList] = useState({ id: '', phoneNumber: '', description: '', products: [], workSchedule: {}});
    const [open, setOpen] = useState(false);
    const [booked, setBooked] = useState(false);
    // const [bookingCheck, setBookingCheck] = useState(false);
    useEffect(() => {
        const getList = async () => {
            const listFromServer = await fetchList()
            setList(listFromServer)
        }

        getList() 
      
    }, [])
    //Fetch List
    const fetchList = async () => {
        const res = await fetch('http://localhost:3500/list/' + product._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        const data = await res.json();
        if (data.status === 200) {
            console.log(data)
            return data.user
        }else{
            return data = 'Nie można załadować informacji o firmie!';
        }
    }

 
    
  
    const Today = getActualDate()
    const translatedDay = normalizeWeek(Today)

    const bookProduct = async () => {
        setBooked(true);
        const date = new Date();
        date.setDate(date.getDate() + 7);
        const user = localStorage.getItem('token');
        if (user.length < 1) {
            user = ''
        }
        const res = await fetch('http://localhost:3500/list/' + product._id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user,
            },
            body: JSON.stringify({
                productId: product._id,
                productBasicInfo: {name: product.name, price: product.price, img: product.img},
                reservationDate: new Date(),
                expiryDate: date,
            })
        })

        const data = await res.json();
        console.log(data)
        if (data.status == 200) {
            setBooked(true);
        } else if (data.status == 409) {
            // setBookingCheck(true);
            setBooked(false);
        } else {
            setBooked(false);
        }
    }
    // console.log(!localStorage.getItem('token'))
    return (
        <>
        <div className='row'>
            <div className="col-lg-8 mb-4" key={product._id}>
                <div className="card" style={customCardProducts}>
                    <div className="row g-0 p-5">
                        <div className="col-lg-10" style={customCardBody}>
                            <h4 className={"card-title " + styles.customHeader }>{product.name}</h4>
                        </div>
                        <div className="col-lg-2" style={customCardBody}>
                            <h5 className={"card-title d-flex justify-content-end " + styles.customHeader}>{product.price} PLN</h5>
                        </div>
                        <div className={product.reservation ? ("col-lg-12 mt-4"):("col-lg-12 mt-4")}>
                            <picture className={(product.reservation || booked ) ? ('img-reservation'):('')}>
                                <img src={product.img} onError={handleImageError} className="img-fluid rounded-start" style={imgFit} alt="Product image" />
                            </picture>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 mb-4">
                <div className="card" style={customCardBodyHeight}>
                        <div className="row g-0 p-5">
                            <div className="col-lg-12 mb-4 d-flex align-items-center" style={{columnGap: '10px'}}>
                                <img src={sellerIco} className={"img-fluid rounded-start"} style={{width:'50px'}} />
                            <h5 className=''>Informacje o sprzedającym</h5>
                        </div>
                        <div className="col-lg-12 mb-4">
                             <img src={'.'} onError={handleUserImageError} className={"img-fluid rounded-start " + styles.userLogo} alt="User Logo" />
                        </div>
                        <div className="col-lg-12">
                            <h6 className='card-title' style={customCardBody}>Firma <Link to={"/user/" + list.id} className='card-title fw-bold' style={customCardBody}>{product.creatorName}</Link></h6>
                        </div>
                        <div className="col-lg-12">
                        <div className="mt-2" style={customCardBody}>
                                <div className="card-text">
                                    { list.description ? (
                                        <>
                                            <h6 className="card-text">Tel. <span style={customLink}>{list.phoneNumber}</span></h6>
                                            <h6 className="card-text">E-mail: <span style={customLink}>{product.createdBy}</span></h6>
                                            <h6 className='card-text'>O firmie:</h6><p>{list.description.slice(0, 180)}...</p>
                                                <h6>Godziny otwarcia:</h6> 
                                            <div className='d-flex align-items-center' style={{columnGap: 10}}>    
                                                    <h6 className="card-text" style={{margin: 0}}>{translatedDay} <span style={customLink}>{list.workSchedule[Today].Start} - {list.workSchedule[Today].End}</span></h6>
                                                    <button className='expandListBtn' onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}><img className={`expandListSvg${open ? ("-active") : ('')}`} src={expandList} /></button>
                                            </div>
                                                    <Hours schedule={list.workSchedule} today={Today} open={open} />
                                            
                                        </>
                                    ) : (
                                        <>
                                            <h6 className="card-text">Tel. {list.phoneNumber}</h6>
                                            <h6 className="card-text">E-mail: <p style={customLink}>{product.createdBy}</p></h6>
                                            <p className='card-text'>Ten użytkownik jeszcze nie podał danych dotyczących firmy.</p>
                                        </>
                                    ) }
                                    
                                    
                                </div>
                        </div>
                        </div>
                        <div className="col-lg-12 mb-5">
                                {(product.reservation || booked || !localStorage.getItem('token')) ? ('') : (<><button onClick={bookProduct} className={styles.formButton} style={{padding: '0.5em', width:'100%'}}>Zarezerwuj teraz</button></>)}
                            </div>
                            <div className='col-lg-12 mt-5'></div>
                    </div>
                </div>
                </div>
            <h2 className={'p-3 ' + styles.customHeader}>Opis produktu: </h2>
            <div className="col-lg-12 mb-4">
                <div className="card" style={customCardProducts}>
                    <div className="row g-0 p-2">
                        <div className="col-lg-12">
                        <div className="card-body" style={customCardBody}>
                                <div className="card-text">
                                    <p className="card-text">{product.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='row'>
                <SellerProducts list={list} mainProduct={product._id}></SellerProducts>      
        </div>
    </>
    );
}

export default ProductItem;