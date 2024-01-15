import React, { useEffect, useState, } from "react"
import { Link } from 'react-router-dom'
import { Modal, ModalEdit } from '../components/Modal/Modal'
// import styles from '../pages/styles.module.css'
import styles from '../styles/styles.module.css';
import { handleImageError } from '../components/ImgError/ImgError.js'
import { getActualDate, normalizeWeek } from "../components/ProductItem/ProductItem.js"
import scheduleImg from './img/schedule.svg'
import Reservation from "../components/ReservationList"

// arrow ico
import arrow from '../pages/img/public_img/north-east-arr.svg';
import user_ico from '../pages/img/public_img/user.svg';
import user_info from '../pages/img/public_img/info.svg';
import user_add from '../pages/img/public_img/add.svg';

import edit_ico from '../pages/img/public_img/edit.svg';
import delete_ico from '../pages/img/public_img/delete.svg';
import no_img from '../pages/img/public_img/no-img.png';

import env from "react-dotenv";


const customCard = {
        height: '100%',
        width: '100%',
    backgroundColor: '#E5F0F1',
};
    
const customCardProducts = {
    backgroundColor: '#E5F0F1',
};

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

const optionForm = {
    backgroundColor: 'rgb(207, 231, 233)',
    border: 'none',
    borderRadius: '5px',
    color: 'rgb(32, 32, 32)',
    height: '2.5em',
    width: '20%'
}


const Table = ({ products, modal, tableWidth }) => {
    if (products.length === 0) {
        return (<></>)
    } else {
        if (tableWidth < 800) {
            return (
            <table className={`table ${styles.tableColor}`}>
                    <Lists products={products} modal={modal} tableWidth={tableWidth} />
            </table>
            )
        } 
        return (
            <table className={`table ${styles.tableColor}`}>
                        <thead>
                            <tr>
                                <th scope="col">Nazwa produktu</th>
                                <th scope="col">Opis produktu</th>
                                <th scope="col">Zdjęcie</th>
                                <th scope="col">Cena</th>
                                <th scope="col" style={{ justifyContent: 'center', display:'flex' }}>Zarezerwowany</th>
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


const Lists = ({ products, modal, tableWidth}) => {
    products.sort((a,b) => {
            return new Date(b.date) - new Date(a.date);
        })

        return (
            <>
            {products.map((product, index) => (
                <UserProductList key={index} product={product} modal={modal} tableWidth={tableWidth}/>
            ))}
        </>
        )
}

const UserProductList = ({ product, tableWidth }) => {
    // console.log(product)
    // console.log(show)
    if (tableWidth < 800) {
              return (
                  <tbody key={product._id} style={{borderTop: '50px solid rgb(229, 240, 241)'}}>
               <tr>
                    <th scope="col">Nazwa produktu</th>
                   <td><abbr style={{ textDecoration: 'none' }} title={product.name}>{product.name.slice(0, 25)}...</abbr></td>
                </tr>
                <tr>
                    <th scope="col">Opis produktu</th>
                    <td><abbr style={{ textDecoration: 'none' }} title={product.desc}>{product.desc.slice(0, 50)}...</abbr></td>
                </tr>
                <tr>
                    <th scope="col">Zdjęcie</th>
                    <td><img onError={handleImageError} width="50px" height="50px" src={product.img.length > 0 ? (product.img) : ({no_img})} alt={product.name} /></td>
                </tr>
                <tr>
                    <th scope="col">Cena</th>
                    <td>{product.price} zł</td>
                </tr>
                <tr>
                    <th scope="col">Zarezerwowany</th>
                    <td> {product.reservation ? ('TAK') : ('NIE')}</td>
                </tr>
                <tr>
                    <th scope="col">Opcja</th>
                    <td>
                        <Link to={"edit/" + product._id} className={ styles.customLinkEdit} ><img src={edit_ico} width="25" alt="Edit"/></Link> |
                        <Link to={"delete/" + product._id } className={styles.customLinkDelete}><img src={delete_ico} width="25" alt="Delete"/></Link>
                    </td>
               </tr>
           </tbody>
        )
        }

      return (
        <tr key={product._id}>
            <td><abbr style={{ textDecoration: 'none' }} title={product.name}>{ product.name.slice(0,25)}...</abbr></td>
            <td><abbr style={{textDecoration: 'none'}} title={product.desc}>{ product.desc.slice(0,50)}...</abbr></td>
            <td><img onError={handleImageError} width="50px" height="50px" src={product.img.length > 0 ? (product.img) : ({no_img})} alt={product.name}/></td>
            <td>{product.price} zł</td>
            <td style={{ justifyContent: 'center', display:'flex' }}> {product.reservation ? ('TAK'):('NIE') }</td>
            <td>
                <Link to={"edit/" + product._id} className={ styles.customLinkEdit} ><img src={edit_ico} width="25" alt="Edit"/></Link> |
                <Link to={"delete/" + product._id } className={styles.customLinkDelete}><img src={delete_ico} width="25" alt="Delete"/></Link>
            </td>
        </tr>
        )  
    
    
}

const UserInfo = ({ user, additional, openModal}) => {
   
//  console.log('user;;',user.region)

    return (
        <div className="user">
            <p><span className="fw-bolder">Nazwa firmy:</span> { user.name}</p>
            <p><span className="fw-bolder">Adres email:</span> { user.email}</p>
            <p><span className="fw-bolder">Numer telefonu:</span> {user.phoneNumber}</p>
            {
                additional ? (
                    <>
                        <p><span className="fw-bolder">Opis firmy: </span> <abbr title={user.description} style={{ textDecoration: 'none' }}>{user.description.slice(0, 200)}...</abbr></p>
                      <p><span className="fw-bolder">Adres kontaktowy:</span> {user.region.street} {user.region.city} {user.region.zip} woj. {user.region.voivodeship}</p>
                      <p className="d-flex"><button className={`${styles.customLink}`} onClick={openModal}>Edytuj profil</button>  <img src={arrow} className="img-fluid rounded-start" alt="link arrow" width="20" /></p>
                    </>
                ) : (<>
                        <h6>Dodaj opis i godziny pracy swojej firmy</h6>
                        <p className="d-flex"><button className={`${styles.customLink}`} onClick={openModal}>Dodaj informacje</button>  <img src={arrow} className="img-fluid rounded-start" alt="link arrow" width="20" /></p>
                       
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
    const [productTags, setProductTags] = useState([]);
    const [productCategory, setProductCategory] = useState('');

    const [errorFeed, setError] = useState('');
    const reservation = false;

     const handleProductCategory = (e) => {
        setProductCategory(e.target.value)
    }

    const handleTagsChange = (e) => {
        setProductTags(e.target.value.split(','));
        // if (setProductTags.includes(',')) { 
        //     setProductTags(e.target.value.);
        //     console.log(productTags)
        // }
        console.log(productTags)
        if (productTags.length > 1) {
            productTags.map(tag => console.log(tag))
        }
    }

    const addProduct = async (e) => {
        e.preventDefault();
        const res = await fetch('http://' + process.env.REACT_APP_FETCH_ADDR+  '/dashboard_panel/add', {
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
                reservation,
                productTags: 'cat',
                productCategory,
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
                <textarea
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
              <div className="form-group">
                <label>Tagi</label>
                <input
                    type="text"
                    placeholder="Wprowadź tagi do łatwiejszego znalezienia produktu"
                    value={productTags}
                    onChange={handleTagsChange}
                />
                <div className={styles.productTag}>{productTags.length > 1 ? (<>{ productTags.map(item => <span>{item}</span>)}</>):('')}</div>
            </div>
            <div className="form-group">
                <label>Kategoria</label>
                <select name='category' style={optionForm} onChange={handleProductCategory}>
                        <option value="">Wybierz kategorię</option>
                        <option value="Karoseria">Karoseria</option>
                        <option value="Filtry">Filtry</option>
                        <option value="Oleje">Oleje i smary</option>
                        <option value="Oświetlenie">Oświetlenie</option>
                        <option value="Silniki i osprzęt">Silnik i osprzęt</option>
                        <option value="Układ chłodzenia silnika">Układ chłodzenia silnika</option>
                        <option value="Układ elektryczny,zapłon">Układ elektryczny, zapłon</option>
                        <option value="Układ hamulcowy">Układ hamulcowy</option>
                        <option value="Układ kierowniczy">Układ kierowniczy</option>
                        <option value="Układ klimatyzacji">Układ klimatyzacji</option>
                        <option value="Układ napędowy">Układ napędowy</option>
                        <option value="Układ paliwowy">Układ paliwowy</option>
                        <option value="Układ pneumatyczny">Układ pneumatyczny</option>
                        <option value="Układ wentylacji">Układ wentylacji</option>
                        <option value="Układ wydechowy">Układ wydechowy</option>
                        <option value="Układ zawieszenia">Układ zawieszenia</option>
                        <option value="wycieraczki spryskiwacze">Wycieraczki i spryskiwacze</option>
                        <option value="wyposażenie wnętrza">Wyposażenie wnętrza</option>
                        <option value="Ogrzewanie postojowe i chłodnictwo samochodowe">Ogrzewanie postjowe i chłodnictwo samochodowe</option>
                        <option value="Tuning mechaniczny">Tuning mechaniczny</option>
                        <option value="Akcesoria samochodowe">Akcesoria samochodowe</option>
                        <option value="Pozostałe">Pozostałe</option>
                    </select>
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

const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
}

export const useWindowDimensions = () => {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

        useEffect(() => {
            const handleResize = () => {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
        return windowDimensions;    
    }

const Dashboard = () => {
    
    // const [products, setProducts] = useState('')
    const [products, setProduct] = useState([]);
    const [user, getUser] = useState([]);
    const [loading, setLoading] = useState(false);
    let basicInfoFilled = false;
    if (user.description) {
        basicInfoFilled = true;
    }
    

    const { height, width } = useWindowDimensions();



    //   console.log(basicInfoFilled)
    //const [tempProduct, setTempProduct] = useState('')
    // console.log(height, width);
    useEffect(() => {
        const getProduct = async () => {
            const productsFromDb = await fetchProducts()
            setProduct(productsFromDb)
            setLoading(false);

        }

        const getUserInfo = async () => {
            const userInfoFromDb = await fetchUserInfo()
            getUser(userInfoFromDb);
            setLoading(false);
        }
      
        getProduct()
        getUserInfo()

}, [])


    const fetchProducts = async () => {
        setLoading(true);
        const res = await fetch('http://' + process.env.REACT_APP_FETCH_ADDR+  '/dashboard_panel', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        })

        const data = await res.json()
        // console.log(data.products);
        if (data.status === 'verify') {
            return data.products;
        } else if (data.status === 'Error') {
            localStorage.clear();
            window.location.href = '/login';
            return data.error
        }
    }

    const fetchUserInfo = async () => {
        setLoading(true);
        const res = await fetch('http://' + process.env.REACT_APP_FETCH_ADDR+  '/dashboard_panel', {
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


    const today = getActualDate()
    
    if (loading) {
        return (<h1>Loading</h1>)
    } else {
        // console.log(user.reservation)
          return (
        <div>
            {basicInfoFilled ? (<ModalEdit showModal={showModal} setShowModal={setShowModal} user={user}/>): (<Modal showModal={showModal} setShowModal={setShowModal}/>) }
            <div className="row">
                <div className="col-sm-12 col-md-6 mb-4">
                    <div className="card mb-3" style={customCard}>
                        <div className="row g-0 p-5 flex-column">
                            <div className={`col-md-4 d-flex align-items-center ${styles.columnGap}`} style={customWidth}>
                                <img src={user_ico} className="img-fluid rounded-start" width="60px" alt="User information image" />
                                 <h5 className={`card-title ${styles.primaryColor}`}>Twoje podstawowe informacje</h5>
                            </div>
                            <div className="col-md-12">
                            <div className="card-body" style={customCardBody}>
                                        <UserInfo user={user} additional={basicInfoFilled} openModal={openModal} customLink={customLink} />
                                    
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                {basicInfoFilled ? (
                <div className="col-sm-12 col-md-6 mb-4">
                    <div className="card mb-3" style={customCard}>
                        <div className="row g-0 p-5 flex-column">
                            <div className={`col-md-4 d-flex align-items-center ${styles.columnGap}`} style={customWidth}>
                                <img src={scheduleImg} className="img-fluid rounded-start" width="60px" alt="Information image" />
                                 <h5 className={`card-title ${styles.primaryColor}`}>Harmonogram pracy</h5>
                            </div>
                            <div className="col-md-12">
                            <div className="card-body" style={customCardBody}>
                                   {  Object.keys(user.workSchedule).map((day, id) => {
                                        return (<div key={id}>{day == today ? (<span className='fw-bold'>{normalizeWeek(day)}:</span>) : (<span>{normalizeWeek(day)}:</span>)} {user.workSchedule[day].FreeDay ? (<span className='fw-bold'>Zamknięte</span>) : (
                                        (day == today) ? (
                                            <span className="fw-bold">{user.workSchedule[day].Start} - {user.workSchedule[day].End}</span>  
                                        ): (
                                            <span>{user.workSchedule[day].Start} - {user.workSchedule[day].End}</span>
                                        ) 
                                    )}</div>)
                                    })
                                    }
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="col-sm-12 col-md-6 mb-4">
                    <div className="card mb-3" style={customCard}>
                        <div className="row g-0 p-5 flex-column">
                            <div className={`col-md-4 d-flex align-items-center ${styles.columnGap}`} style={customWidth}>
                                <img src={user_info} className="img-fluid rounded-start" width="60px" alt="Information image" />
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
                )}          
            </div>

            <div className="row">
                      {loading ? ('Loading') : (<Reservation products={user} loading={loading} tableWidth={width}/>) }
                  <div className="col-sm-12 col-md-6 mb-4" style={customWidth}>
                    <div className="card mb-3" style={customCardProducts}>
                        <div className="row g-0 p-5 flex-column">
                            <div className="col-md-4 d-flex align-items-center" style={customWidth}>
                                <img src={user_add} className="img-fluid rounded-start" width="60px" alt="Add image" />
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
                            <Table products={products} customLink={ customLink}  tableWidth={width}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }

  
}

export default Dashboard;