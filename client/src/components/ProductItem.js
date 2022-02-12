import React, {useState, useEffect, useDebugValue} from 'react'
import {useLocation, useNavigate, useParams } from "react-router-dom";
import {handleImageError} from '../components/ImgError'
import { customCard, customCardBody, customCardProducts, imgFit, customLink, customCardBodyHeight } from '../pages/Styles';

const SellerProducts = ({list, mainProduct}) => {
    console.log(mainProduct);
    const otherProducts = []
        list.products.filter(product => {
            if(product._id != mainProduct){
                otherProducts.push(product)
            }
        })

        // list.map(item => {
        //     item.products.filter(product => {
        //             console.log(product._id, mainProduct)
        //             if(product._id != mainProduct){
        //                 otherProducts.push(product)
        //             }
        //     })
        // })  

        // console.log(otherProducts.length)
    return(
        <>
        {otherProducts.length > 1 ? (<h3 style={customLink}>Zobacz inne produkty sprzedającego: </h3>) : (<div></div>) }
        {otherProducts.length > 0 ? (
            otherProducts.map(product => {
                return (
                    <div className="col-md-4 mb-4" key={product._id}>
                    <div className="card" style={customCardProducts}>
                        <div className="row g-0 p-5">
                            <div className="col-md-10" style={customCardBody}>
                                <h5 className="card-title">{product.name}</h5>
                            </div>
                            <div className="col-md-2" style={customCardBody}>
                                <h5 className="card-title d-flex justify-content-end">{product.price} PLN</h5>
                            </div>
                            <div className="col-md-12">
                            <img src={product.img} onError={handleImageError} className="img-fluid rounded-start" style={imgFit} alt="Product image" />
                            </div>
                        </div>
                    </div>
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
    // console.log(product)
    const [list, setList] = useState({phoneNumber: '', description: '', startWorkHour: '', endWorkHour: '', products: []});

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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: product.createdBy
            })
        })
        
        const data = await res.json();
        if(data.status === 200){
            // console.log(data.user)
            return data.user
        }else{
            return data.user = 'Nie można załadować informacji o firmie!';
        }
    }

    const ValidateData = false;
 
    console.log(list)
    return (
        <>
        <div className='row'>
            <div className="col-md-8 mb-4" key={product._id}>
                <div className="card" style={customCardProducts}>
                    <div className="row g-0 p-5">
                        <div className="col-md-10" style={customCardBody}>
                            <h5 className="card-title">{product.name}</h5>
                        </div>
                        <div className="col-md-2" style={customCardBody}>
                            <h5 className="card-title d-flex justify-content-end">{product.price} PLN</h5>
                        </div>
                        <div className="col-md-12">
                        <img src={product.img} onError={handleImageError} className="img-fluid rounded-start" style={imgFit} alt="Product image" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card" style={customCardBodyHeight}>
                    <div className="row g-0 p-5">
                        <div className="col-md-12">
                            <h6 className='card-title' style={customCardBody}>Firma <span style={customLink}>{product.creatorName}</span></h6>
                        </div>
                        <div className="col-md-12">
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
                    </div>
                </div>
            </div>
            <div className="col-md-12 mb-4">
                <div className="card" style={customCardProducts}>
                    <div className="row g-0 p-5">
                        <div className="col-md-12">
                        <div className="card-body" style={customCardBody}>
                                <div className="card-text">
                                    <h4>Opis:</h4>
                                    <h6 className="card-text">{product.desc}</h6>
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