import React, { useState, useEffect } from "react"
import {useNavigate, useParams } from "react-router-dom";
import styles from '../pages/styles.module.css'
import icon from '../pages/img/repair.svg';
import { customCardProducts, customCardBody, customWidth } from "./Styles";

function Edit() {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');
    
    const newDate = new Date();

    const [errorFeed, setError] = useState('');


    const { id } = useParams()

    const editProduct = async () => {
        const res = await fetch('http://localhost:3500/dashboard/edit/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await res.json();
        //console.log(data);
        return data.product;
    }


    const updateProduct = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3500/dashboard/edit/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                productId: id,
                name,
                price,
                newDate,
                desc,
                img,
            })
        })
        
        const data = await res.json();
        if (data.status == 200) {
            
            setError('');
            window.location = '/dashboard';
        } else {
            //console.log(data.errors[0].msg);
            setError(data.errors[0].msg)
        }
        
        //console.log(data);
        //window.location = '/dashboard';
    }
    
    useEffect(() => {
        const getProduct = async () => {
            const productsFromDb = await editProduct()
            setProduct(productsFromDb)
        }
        getProduct()
    }, [])

    
    return (
               <div className="row">
                  <div className="col-sm-6 mb-4" style={customWidth}>
                    <div className="card mb-3" style={customCardProducts}>
                        <div className="row g-0 p-5 flex-column">
                        <div className={`col-md-4 d-flex align-items-center ${styles.columnGap} `} style={customWidth}>
                                <img src={icon} className="img-fluid rounded-start" width="40px" alt="Edit icon" />
                                <h5 className={`card-title ${styles.primaryColor}`}>Edycja rekordu</h5>
                            </div>
                            <div className="col-md-12">
                            <div className="card-body" style={customCardBody}>
                <form className={styles.addProductForm} onSubmit={updateProduct}>
                    <div className="form-group">
                        <label>Nazwa produktu</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="productName"
                            defaultValue={product.name  == undefined ? (''):(product.name)}
                            onChange={ (e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Opis produktu</label>
                        <textarea
                            required
                            className="form-control"
                            defaultValue={product.desc  == undefined ? (''):(product.desc)}
                            onChange={ (e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Cena</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            defaultValue={product.price  == undefined ? (''):(product.price)}
                            onChange={ (e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Zdjęcie produktu (URL)</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            defaultValue={product.img  == undefined ? (''):(product.img)}
                            onChange={ (e) => setImg(e.target.value)}
                        />
                    </div>
                        <div className="card-body" style={customCardBody}>
                        <h6 className={styles.errorFeedback}>{errorFeed}</h6>    
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Zaktualizuj rekord" className={styles.formButton} />
                                        <button className={`${styles.formButton} p-2`} onClick={e => navigate('/dashboard') }>Wstecz</button>                
                    </div>
                </form>
                  </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Edit;