import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
// import styles from '../pages/styles.module.css'
import styles from '../styles/styles.module.css';
import icon from '../pages/img/warning.svg';

import env from "react-dotenv";


const customCard = {
        height: '100%',
        width: '100%',
    backgroundColor: '#E5F0F1',
};
    
const customCardProducts = {
    backgroundColor: '#E5F0F1',
};


const customImg = {
    width: '100px',
    height: '100px',
}

// const customButton = {
//     backgroundColor: '#003c3c'
// }

const customCardBody = {
    color: 'rgba(0,68,68,0.9)',
}

const customCardHeader = {
    color: 'rgba(0,68,68,0.9)',
    backgroundColor: 'rgb(19 92 60 / 14%)',
}
    
    
const customLink = {
    color: 'rgb(0 68 68)',
    fontWeight: 'bold',
    fontDecoration: 'none',
}

const customWidth = {
    width: '100%',
}


function Delete() {
    const navigate = useNavigate()
    const [name, setName] = useState();
    const [product, setProduct] = useState();
    const { id } = useParams()

    const getProductName = async () => {
        const res = await fetch(process.env.REACT_APP_FETCH_ADDR+  '/dashboard_panel/edit/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await res.json();
        //console.log(data);
        return data;
    }

      useEffect(() => {
        const getProduct = async () => {
            const editproductsFromDb = await getProductName()
            setName(editproductsFromDb.product.name);
            setProduct(editproductsFromDb.product);
        }
        getProduct()
        
    }, []);

    const deleteProduct = async (e) => {
        e.preventDefault();
        const res = await fetch(process.env.REACT_APP_FETCH_ADDR+  '/dashboard_panel/delete/' + id, {
            method: 'DELETE',
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
        if (data.status == 200) {
            navigate('/dashboard');
        }
    }
    
    const backToDashboard = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    }
        return (
            <div className="row">
                  <div className="col-sm-6 mb-4" style={customWidth}>
                    <div className="card mb-3" style={customCardProducts}>
                        <div className="row g-0 p-5 flex-column">
                        <div className={`col-md-4 d-flex align-items-center ${styles.columnGap} `} style={customWidth}>
                                <img src={icon} className="img-fluid rounded-start" width="40px" alt="Edit icon" />
                                <h5 className={`card-title ${styles.primaryColor}`}>Uwaga!</h5>
                            </div>
                            <div className="col-md-12">
                            <div className="card-body" style={customCardBody}>
                                <p>Czy na pewno chcesz usunąć produkt: <span className="fw-bold">{name}</span>?</p>
                                <button className={`${styles.formButtonDelete} p-2`} onClick={deleteProduct}>Usuń</button>
                                <button className={`${styles.formButton} p-2`} onClick={backToDashboard}>Wstecz</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Delete;