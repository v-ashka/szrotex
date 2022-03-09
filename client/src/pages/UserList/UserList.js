import React, { useEffect, useState } from "react";
import {handleImageError} from '../../components/ImgError/ImgError.js'
import {customCardBody, customCardProducts} from '../Styles'
import {SearchList} from '../../components/SearchList'
import { Link } from 'react-router-dom'
import style from '../../styles/styles.module.css';
import "./UserList.css"

const Lists = ({ lists }) => {
    const arr = []
    lists.map((user) => {
        user.products.map(products => {
            products['creatorName'] = user.name
            products['createdBy'] = user.email
            if (user.region) {
                products['regionVoivode'] = user.region.voivodeship
                products['regionCity'] = user.region.city
            } else {
                products['regionVoivode'] = ''
                products['regionCity'] = ''
            }
            if (products.category === undefined) {
                products.category = 'Pozostałe'
            }

            arr.push(products)

        })
    })
    
   
    // console.log(arr)
    // console.log('products:', lists)

    arr.sort((a,b) => {
        return new Date(b.date) - new Date(a.date);
    })
    // console.log('date products', arr);
    return (
        <>
            {arr.map((item, index) => (
                <List key={index} item={item}/>
            ))}
        </>
    )
}

export const List = ({ item }) => {

    // console.log('lista export: ', item.regionVoivode, item.regionCity, item.regionVoivode.length)
    // console.log(new Date(item.date).toLocaleDateString('pl-PL', {day: 'numeric', month: 'long', year: 'numeric'} ))
    return (
  
        <div className={item.reservation ? ('col-md-10 mb-4 img-reservation-item') : ('col-md-10 mb-4 ' + style.customLinkList)} key={item._id} style={{position: 'relative'}}>
            <Link to={item._id} className={style.customLinkList} state={item}>
        <div className={"card" + style.customLinkList} style={customCardProducts}>
            <div className="row g-0 p-5">
                <div className="col-md-3">
                    <img src={item.img} onError={handleImageError} className={"img-fluid rounded-start " + style.userListImg} alt="Product image" />
                </div>
                <div className="col-md-9">
                <div className="card-body" style={customCardBody}>
                        <div className="card-title d-flex justify-content-between"><h4 className="card-title">{item.name}</h4> <h4>{item.price} PLN</h4></div>
                        <div className="card-text">
                                    <p className="card-text user-product-p"> {item.category } | {(item.regionVoivode.length > 0 && item.regionCity.length > 0) ? (<>{item.regionCity} | {item.regionVoivode} | </>) : ('')} {new Date(item.date).toLocaleDateString('pl-PL')} </p>
                        </div>
                </div>
                </div>
            </div>
        </div>
        </Link>
    </div>
    )
}

const App = ({value, onClick, checkedVoivode, category}) => {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    let isValue = false;
    if(value.length > 0 || onClick){
        isValue = true;
    }
    // console.log(value.length, isValue, checkedVoivode)

    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            const listFromServer = await fetchList()
            // console.log(listFromServer)
            setList(listFromServer)
            setLoading(false);
        }

        getList() 
    }, [])

    // console.log(list)
    //Fetch List
    const fetchList = async () => {
        const res = await fetch('http://localhost:3500/list')
        const data = await res.json()
        //  console.log(data);
        const productList= [];
        data.filter((product) => {
            if(product.products.length > 0){
                productList.unshift(product)
            }
        })
        // console.log(data, productList);
        return productList;
    }

    if (loading) {
        return <h2>Loading...</h2>
    }
    // console.log('list:', list)
    return (
            <div className="row d-flex justify-content-center">
                { value.length > 0 ? (
                <>
                    <div className="row justify-content-center">
                        <div className="col-md-8 p-3">
                            <h6 className={"p-3 card d-flex flex-row " + style.searchResult} style={customCardProducts}>Wyszukiwana fraza:<span className="fw-bold"> {value}</span></h6>
                        </div>
                    </div>
                    {loading ? ('Loading...') : (<SearchList lists={list} query={value} checkedVoivode={checkedVoivode} category={category} />)}
                </>
            ) : (<>
                    <Lists lists={list} />
            </>)}
            </div>
    );
}

export default App;