import React, { useState } from "react"
import reservationIco from '../pages/img/remove_reservation.svg'
// import styles from '../pages/styles.module.css'
import styles from '../styles/styles.module.css';
import { handleImageError } from './ImgError/ImgError.js'

    
const customCardProducts = {
    backgroundColor: '#E5F0F1',
};


const customCardHeader = {
    color: 'rgba(0,68,68,0.9)',
    backgroundColor: 'rgb(19 92 60 / 14%)',
}

const customBtn = {
    border: 'none',
    backgroundColor: 'none'
}




const ReservationList = ({ products, tableWidth }) => {
    // console.log('loading?', loading, products, products == undefined)
    const cancelReservation = async (e, product) => {
        // console.log('cancel reservation, prodId: ', productId, reservationId, product)
        const elem = e.target.parentElement.parentElement.parentElement;
        const res = await fetch('http://localhost:3500/dashboard/remove-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                product
            })
        })

        const data = await res.json();
        console.log(data);
        if (data.status === 200) {
            elem.remove()    
        }
        
    }


    if (products.length === 0) {
        return <></>
    } else {
        if (tableWidth < 800) { 
            return (
            <>
                    {products.reservation.map(product => {
                        return (
                            <tbody key={product._id} style={{ borderTop: '50px solid rgb(229, 240, 241)' }}>
                                <tr>
                                    <th scope="col">Nazwa produktu</th>
                                    <td>{product.productBasicInfo.name}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Cena</th>
                                    <td>{product.productBasicInfo.price} zł</td>
                                </tr>
                                <tr>
                                    <th scope="col">Zdjęcie</th>
                                    <td><img onError={handleImageError} width="50px" height="50px" src={product.productBasicInfo.img.length > 0 ? (product.productBasicInfo.img) : ("/img/no-img.png")} alt={product.productBasicInfo.name} /></td>
                                </tr>
                                <tr>
                                    <th scope="col">Zarezerwowano dnia</th>
                                    <td>{new Date(product.reservationDate).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Data końca rezerwacji</th>
                                    <td>{new Date(product.expiryDate).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <th scope="col">Opcja</th>
                                    <td><button style={customBtn} name={product._id} onClick={(e) => cancelReservation(e, product)}><img src={reservationIco} /></button></td>
                                </tr>
                            </tbody>
                        )
                    })}
            </>
            )
        }


        return (
            <>
                {products.reservation.map(product => {
                    return (
                        <tr key={product._id}>
                            <td>{product.productBasicInfo.name}</td>
                            <td>{product.productBasicInfo.price} zł</td>
                            <td><img onError={handleImageError} width="50px" height="50px" src={product.productBasicInfo.img.length > 0 ? (product.productBasicInfo.img) : ("/img/no-img.png")} alt={product.productBasicInfo.name} /></td>
                            <td style={{textAlign: 'center'}}>{new Date(product.reservationDate).toLocaleDateString()}</td>
                            <td style={{textAlign: 'center'}}>{new Date(product.expiryDate).toLocaleDateString()}</td>
                            <td><button style={customBtn} name={product._id} onClick={(e) => cancelReservation(e, product)}><img src={reservationIco }/></button></td>
                        </tr>
                    )
                })}
            </>    
        )
    }
    
}

const Reservation = ({ products, loading, tableWidth }) => {
    if (products === undefined) {
        return <>Still loading...</>
    }
    // console.log('prod:',products.reservation == undefined)
    return (
         <div className="col-md-12 mb-4">
                    <div className="card" style={customCardProducts}>
                        <h5 className="card-header" style={customCardHeader}>
                            Lista zarezerwowanych produktów
                        </h5>
                        <div className="card-body">
                        <table className={`table ${styles.tableColor}`}>
                        {tableWidth < 800 ? (<ReservationList products={products} loading={loading} tableWidth={tableWidth} />):(<>
                        <thead>
                                  <tr>
                                    <th scope="col">Nazwa produktu</th>
                                    <th scope="col">Cena</th>
                                    <th scope="col">Zdjęcie</th>
                                    <th scope="col" style={{ textAlign: 'center' }}>Zarezerwowano dnia</th>
                                    <th scope="col" style={{ textAlign: 'center' }}>Data końca rezerwacji</th>
                                    <th scope="col">Opcje</th>
                                </tr>
                                </thead>
                                    <tbody>
                                <ReservationList products={products} loading={loading}/>
                                    </tbody>
                                    </>) }
                                
                            </table>
                        </div>
                    </div>
                </div>
    )
}

export default Reservation;
