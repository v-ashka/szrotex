import React, { useEffect, useState, } from "react"
import { Link } from 'react-router-dom'
import { Modal } from '../components/Modal/Modal'
import styles from '../pages/styles.module.css'
import { handleImageError } from '../components/ImgError'

const Table = ({ products, modal }) => {
    if (products.length === 0) {
        return (<></>)
    } else {
        return (
            <table className={`table ${styles.tableColor}`}>
                        <thead>
                            <tr>
                                <th scope="col">Nazwa produktu</th>
                                <th scope="col">Opis produktu</th>
                                <th scope="col">Zdjęcie</th>
                                <th scope="col">Cena</th>
                                <th scope="col">Opcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Lists products={ products } modal={modal} />
                        </tbody>
            </table>
        )
    }
}


const Lists = ({ products, modal}) => {
    products.sort((a,b) => {
            return new Date(b.date) - new Date(a.date);
        })

        return (
            <>
            {products.map((product, index) => (
                <UserProductList key={index} product={product} modal={modal}/>
            ))}
        </>
        )
}

const UserProductList = ({ product, customLink }) => {
    // console.log(product)
    // console.log(show)

    return (
        <tr key={product._id}>
            <td>{ product.name}</td>
            <td>{ product.desc}</td>
            <td><img onError={handleImageError} width="50px" height="50px" src={product.img.length > 0 ? (product.img) : ("/img/no-img.png")} alt={product.name}/></td>
            <td>{ product.price} zł</td>
            <td>
                <Link to={"edit/" + product._id} className={ styles.customLinkEdit} ><img src="img/edit.svg" width="25" alt="Edit"/></Link> |
                <Link to={"delete/" + product._id } className={styles.customLinkDelete}><img src="img/delete.svg" width="25" alt="Delete"/></Link>
            </td>
        </tr>
    )
}

const UserInfo = ({ user, additional, openModal, customLink}) => {
   
 console.log(user)

    return (
        <div className="user">
            <p><span className="fw-bolder">Nazwa firmy:</span> { user.name}</p>
            <p><span className="fw-bolder">Adres email:</span> { user.email}</p>
            <p><span className="fw-bolder">Numer telefonu:</span> {user.phoneNumber}</p>
            {
                additional ? (
                    <>
                      <p><span className="fw-bolder">Opis firmy: </span> {user.description}</p>
                        <p><span className="fw-bolder">Godziny pracy: </span>{ user.workStartHour} - {user.workEndHour}</p></>
                ) : (<>
                        <h6>Dodaj opis i godziny pracy swojej firmy</h6>
                        <p className="d-flex"><button className={`${styles.customLink}`} onClick={openModal}>Dodaj informacje</button>  <img src="img/north-east-arr.svg" className="img-fluid rounded-start" alt="link arrow" width="20" /></p>
                       
                    </>)
            }
            
        </div>
    );
}



const AddProduct = () => {
    
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const addDate = new Date();
    const [productImg, setProductImg] = useState('');

    const [errorFeed, setError] = useState('');


    const addProduct = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3500/dashboard/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                productName,
                productPrice,
                addDate,
                productDesc,
                productImg,
            })
        })

        const data = await res.json();
        console.log(data);
        if (data.status == 200) {
            window.location = '/dashboard';
        } else {
            console.log(data.errors[0].msg);
            setError(data.errors[0].msg)
        }
        

    }

    return (
        <form className={styles.addProductForm} onSubmit={addProduct}>
            <div className="form-group">
                <label>Nazwa produktu</label>
                <input
                    type="text"
                    placeholder="Podaj nazwę produktu"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Cena produktu</label>
                <input
                    type="text"
                    placeholder="Podaj nazwę produktu"
                    value={productPrice}
                    onChange={e => setProductPrice(e.target.value)}
                />
            </div>
             <div className="form-group">
                <label>Opis produktu</label>
                <input
                    type="text"
                    placeholder="Dodaj opis produktu"
                    value={productDesc}
                    onChange={e => setProductDesc(e.target.value)}
                />
            </div>
             <div className="form-group">
                <label>Zdjęcie</label>
                <input
                    type="text"
                    placeholder="Podaj adres URL zdjęcia"
                    value={productImg}
                    onChange={e => setProductImg(e.target.value)}
                />
            </div>
            <br/>
            <div className="form-group">
                <h5 className={styles.errorFeedback}> {errorFeed}</h5>
            </div>
            <div className="form-group">
                 <input type="submit" value="Dodaj produkt" className={styles.formButton}></input>
            </div>
        </form>
    );
}

const Dashboard = () => {
    
    // const [products, setProducts] = useState('')
    const [products, setProduct] = useState([]);
    const [user, getUser] = useState([]);

    let basicInfoFilled = false;
    if (user.description) {
        basicInfoFilled = true;
    }
    
    //   console.log(basicInfoFilled)
    //const [tempProduct, setTempProduct] = useState('')

    useEffect(() => {
        const getProduct = async () => {
            const productsFromDb = await fetchProducts()
            setProduct(productsFromDb)
        }

        const getUserInfo = async () => {
            const userInfoFromDb = await fetchUserInfo()
            getUser(userInfoFromDb);
        }

        getProduct()
        getUserInfo()
    }, [])


    const fetchProducts = async () => {
        const res = await fetch('http://localhost:3500/dashboard', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        })

        const data = await res.json()
        console.log(data.products);
        if (data.status === 'verify') {
            return data.products;
        } else if (data.status === 'Error') {
            localStorage.clear();
            window.location.href = '/login';
            return data.error
        }
    }

    const fetchUserInfo = async () => {
        const res = await fetch('http://localhost:3500/dashboard', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        })

        const data = await res.json()
        if (data.status === 'verify') {
            return data.info;
        } else {
            console.log(data.status)
        }
    }

     const [showModal, setShowModal] = useState(false); 

    const openModal = () => { 
        setShowModal(prev => !prev);
    }

const customCard = {
        height: '100%',
        width: '100%',
    backgroundColor: '#E5F0F1',
};
    
const customCardProducts = {
    backgroundColor: '#E5F0F1',
};


// const customImg = {
//     width: '100px',
//     height: '100px',
// }

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

    return (
        <div>
            <Modal showModal={showModal} setShowModal={setShowModal}/>
            <div className="row">
                <div className="col-sm-12 col-md-6 mb-4">
                    <div className="card mb-3" style={customCard}>
                        <div className="row g-0 p-5 flex-column">
                            <div className={`col-md-4 d-flex align-items-center ${styles.columnGap}`} style={customWidth}>
                                <img src="img/user.svg" className="img-fluid rounded-start" width="60px" alt="User information image" />
                                 <h5 className={`card-title ${styles.primaryColor}`}>Twoje podstawowe informacje</h5>
                            </div>
                            <div className="col-md-8">
                            <div className="card-body" style={customCardBody}>
                                        <UserInfo user={user} additional={basicInfoFilled} openModal={openModal} customLink={customLink} />
                                    
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 mb-4">
                    <div className="card mb-3" style={customCard}>
                        <div className="row g-0 p-5 flex-column">
                            <div className={`col-md-4 d-flex align-items-center ${styles.columnGap}`} style={customWidth}>
                                <img src="img/info.svg" className="img-fluid rounded-start" width="60px" alt="Information image" />
                                 <h5 className={`card-title ${styles.primaryColor}`}>Porada</h5>
                            </div>
                            <div className="col-md-12">
                            <div className="card-body" style={customCardBody}>
                                    <p className="card-text">Pamiętaj aby prawidłowo podawać nazwy produktów, w celu wyeliminowania ewentualnych komplikacji z klientem</p>
                                    <p className="card-text">Ceny produktów podawaj tylko w walucie <span className="fw-bold">PLN</span></p>
                                    <p className="card-text">Zdjęcia które <ins>nie załadują się</ins>, wynikają z blokady zarzuconej przez zewnętrzne witryny</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>          
            </div>

            <div className="row">
                  <div className="col-sm-12 col-md-6 mb-4" style={customWidth}>
                    <div className="card mb-3" style={customCardProducts}>
                        <div className="row g-0 p-5 flex-column">
                            <div className="col-md-4 d-flex align-items-center" style={customWidth}>
                                <img src="img/add.svg" className="img-fluid rounded-start" width="60px" alt="Add image" />
                                <h5 className={`card-title ${styles.primaryColor}`}>Dodaj nowy produkt</h5>
                            </div>
                            <div className="col-md-12">
                            <div className="card-body" style={customCardBody}>
                                    <AddProduct/>
                                    
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card" style={customCardProducts}>
                        <h5 className="card-header" style={customCardHeader}>
                            Lista produktów
                        </h5>
                        <div className="card-body">
                            <Table products={products} customLink={ customLink}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;