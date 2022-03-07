import React, { useState } from "react"
import reservationIco from '../pages/img/remove_reservation.svg'
import styles from '../pages/styles.module.css'
import { handleImageError } from '../components/ImgError'

    
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




const ReservationList = ({ products }) => {
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

const Reservation = ({ products, loading }) => {
    if (products === undefined) {
        return <>Still loading...</>
    }
    console.log('prod:',products.reservation == undefined)
    return (
         <div className="col-md-12 mb-4">
                    <div className="card" style={customCardProducts}>
                        <h5 className="card-header" style={customCardHeader}>
                            Lista zarezerwowanych produktów
                        </h5>
                        <div className="card-body">
                             <table className={`table ${styles.tableColor}`}>
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
                            </table>
                        </div>
                    </div>
                </div>
    )
}

export default Reservation;
