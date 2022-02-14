import React, {useState, useEffect, useDebugValue} from 'react'
import {useLocation, useNavigate, useParams } from "react-router-dom";
import {handleImageError, handleUserImageError} from '../components/ImgError'
import { customCardBody, customCardProducts, imgFit, customLink, customCardBodyHeight } from '../pages/Styles';
import { Link, Navigate } from 'react-router-dom'
import style from './styles.module.css'


const SellerProducts = ({ list, mainProduct }) => {
    // const location = useLocation();
    // console.log('location:',location);
    // console.log(mainProduct, list);
    const otherProducts = []
        list.products.filter(product => {
            if (product._id != mainProduct) {
                     product['creatorName'] = list.name
                     product['createdBy'] = list.email
                otherProducts.push(product)
            }
        })


        // console.log(otherProducts)
    return(
        <>
        {otherProducts.length > 1 ? (<h3 className={'p-3 '+ style.customHeader}>Zobacz inne produkty sprzedającego: </h3>) : (<div></div>) }
        {otherProducts.length > 0 ? (
            otherProducts.map(product => {
                return (
                    <div className={"col-lg-4 col-md-6 col-sm-6 mb-4 "} key={product._id}>
                        <Link to={'/list/' + product._id} className={style.customLink} state={product}>
                        <div className={"card " + style.customLink} style={customCardProducts}>
                        <div className="row g-0 p-5">
                            <div className="col-lg-10 col-md-10" style={customCardBody}>
                                <h5 className="card-title">{product.name}</h5>
                            </div>
                            <div className="col-lg-2 col-md-2" style={customCardBody}>
                                <h5 className="card-title d-flex justify-content-end">{product.price} PLN</h5>
                            </div>
                            <div className="col-lg-12 col-md-12">
                            <img src={product.img} onError={handleImageError} className={"img-fluid rounded-start " + style.otherUserProductsImg} alt="Product image" />
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


const ProductItem = () => {
    const location = useLocation();
    const product = location.state;
    // console.log('product', product)
    const [list, setList] = useState({ phoneNumber: '', description: '', startWorkHour: '', endWorkHour: '', products: [] });
    //console.log(list)
    useEffect(() => {
        const getList = async () => {
            const listFromServer = await fetchList()
            // console.log(listFromServer)
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
        if(data.status === 200){
           console.log('get:', data)
            return data.user
        }else{
            return data = 'Nie można załadować informacji o firmie!';
        }
    }
    const today = new Date()
    console.log(today.getMonth())
 
    //console.log(list)
    return (
        <>
        <div className='row'>
            <div className="col-lg-8 mb-4" key={product._id}>
                <div className="card" style={customCardProducts}>
                    <div className="row g-0 p-5">
                        <div className="col-lg-10" style={customCardBody}>
                            <h4 className={"card-title " + style.customHeader }>{product.name}</h4>
                        </div>
                        <div className="col-lg-2" style={customCardBody}>
                            <h5 className={"card-title d-flex justify-content-end " + style.customHeader}>{product.price} PLN</h5>
                        </div>
                        <div className="col-lg-12 mt-4">
                        <img src={product.img} onError={handleImageError} className="img-fluid rounded-start" style={imgFit} alt="Product image" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 mb-4">
                <div className="card" style={customCardBodyHeight}>
                        <div className="row g-0 p-5">
                        <div className="col-lg-12 mb-4">
                             <img src={'.'} onError={handleUserImageError} className={"img-fluid rounded-start " + style.userLogo} alt="User Logo" />
                        </div>
                        <div className="col-lg-12">
                            <h6 className='card-title' style={customCardBody}>Firma <span style={customLink}>{product.creatorName}</span></h6>
                        </div>
                        <div className="col-lg-12">
                        <div className="mt-2" style={customCardBody}>
                                <div className="card-text">
                                    { list.description ? (
                                        <>
                                            <h6 className="card-text">Tel. <span style={customLink}>{list.phoneNumber}</span></h6>
                                            <h6 className="card-text">E-mail: <span style={customLink}>{product.createdBy}</span></h6>
                                            <h6 className='card-text'>O firmie:</h6><p>{list.description}</p>
                                            <h6 className="card-text">Godziny otwarcia: <span style={customLink}>{list.workStartHour}</span></h6>
                                            <h6 className="card-text">Godziny zamknięcia: <span style={customLink}>{list.workEndHour}</span></h6>
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
                        <div className="col-lg-12">
                            <p className='card-title' style={customCardBody}>Wyświetl profil</p>
                        </div>
                    </div>
                </div>
                </div>
            <h2 className={'p-3 ' + style.customHeader}>Opis produktu: </h2>
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