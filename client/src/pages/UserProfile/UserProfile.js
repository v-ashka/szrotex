import React, { useState, useEffect} from "react"
import {useParams, Link } from "react-router-dom";
// import styles from '../pages/styles.module.css'
import styles from '../../styles/styles.module.css';
import { handleImageError } from "../../components/ImgError/ImgError.js";
import { customCardProducts, customCardBody} from "../Styles";
import "./UserProfile.css"
import { Hours, normalizeWeek, getActualDate } from "../../components/ProductItem/ProductItem.js";
import clockIco from '../../pages/img/schedule.svg'
import contactIco from '../../pages/img/face.svg'

const SellerProducts = ({ user }) => {
    // const location = useLocation();
    // console.log('location:',location);
    // console.log(mainProduct, list);
    const otherProducts = []
        user.products.filter(product => {
                product['creatorName'] = user.name
                product['createdBy'] = user.email
                otherProducts.push(product)
            
        })


        console.log(otherProducts.length)
    return(
        <>
        {otherProducts.length >= 1 ? (<h3 className={'p-3 '+ styles.customHeader}>Produkty sprzedającego: </h3>) : (<div>Sprzedający nie dodał jeszcze żadnego produktu!</div>) }
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


const App = () => {
    const { id } = useParams()
    const [user, setUser] = useState({ id: '', phoneNumber: '', description: '', products: [], workSchedule: {Monday: {Start: 0.00, End: 0.00, FreeDay: false}, Tuesday: {Start: 0, End: 0, FreeDay: false}, Wednesday: {Start: 0, End: 0, FreeDay: false}, Thursday: {Start: 0, End: 0, FreeDay: false}, Friday: {Start: 0, End: 0, FreeDay: false}, Saturday: {Start: 0, End: 0, FreeDay: false }, Sunday: {Start: 0, End: 0, FreeDay: false}}, region: {}});
    const [open, setOpen] = useState(false);
    const Today = getActualDate()
    const translatedDay = normalizeWeek(Today)
    useEffect(() => {
        const getList = async () => {
            const fetchUserFromServer = await fetchUser()
            // console.log(listFromServer)
            setUser(fetchUserFromServer)
        }

        getList() 
      
    }, [])


    const fetchUser = async () => {
        const res = await fetch('http://localhost:3500/user/' + id, {
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

    //console.log(user.workSchedule[Today])
    //console.log(user.description)
    return(
        <>
          <div className='row'>
                <div className="col-lg-8 mb-4">
                    <div className="card user-profile-box" style={customCardProducts}>
                        <div className="row g-0 p-3">
                            <div className="col-lg-12 mb-4 d-flex align-items-center p-2" style={{ columnGap: '10px', color: '#003c3ce6' }} >
                                <img src={contactIco} style={{ width: '60px' }} />
                                <h3 className="card-title">Dane kontaktowe</h3>
                            </div>
                        <div className="col-lg-4 mt-4">
                            <img src={'.'} onError={handleImageError} className="img-fluid rounded-start user-logo" alt="Product image" />
                        </div>
                        <div className="col-lg-8 mt-4">
                            <div className="card-body">
                                <p>Nazwa firmy: {user.name}</p>
                                {user.description ? (<p>Adres: {user.region.street} {user.region.zip} {user.region.city} woj. {user.region.voivodeship}</p>):(<p>Adres: Nie podano</p>)}
                                <p>Telefon: {user.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 mb-4">
                    <div className="card user-profile-box" style={customCardProducts}>
                        <div className="row g-0 p-3">
                            <div className="col-lg-12 d-flex align-items-center p-2" style={{columnGap: '10px', color: '#003c3ce6'}}>
                                    <img src={clockIco} style={{ width: '50px' }} />
                                    <h3 className="card-title">Godziny pracy</h3>
                            </div>
                            <div className="col-lg-12 mt-4">
                                <div className="card-body">
                            {user.description ? (<><div className='d-flex align-items-center' style={{columnGap: 10}}> </div><Hours schedule={user.workSchedule} today={Today} open={!open} /></>):(<><h6>Godziny otwarcia:</h6><p>Użytkownik nie podał godzin pracy</p></>) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            <h3 className="p-3">Opis:</h3>
            <div className="col-lg-12 mb-4">
                <div className="card" style={customCardProducts}>
                    <div className="row g-0 p-3">
                        <div className="col-lg-12 mt-4">
                            <div className="card-body">
                                <p className="card-text">{user.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <SellerProducts  user={user}/>
            <h3 className="p-3">Opinie użytkowników: </h3>
            <div className="col-lg-12 mb-4">
                <div className="card" style={customCardProducts}>
                    <div className="row g-0 p-3">
                        <div className="col-lg-12 mt-4">
                            <div className="card-body">
                                <h5 className="card-title">Opis:</h5>
                                <p className="card-text">Lorem ipsum</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}

export default App;