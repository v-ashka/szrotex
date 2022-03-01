import React, { useEffect, useState } from "react";
import {handleImageError} from '../components/ImgError'
import {customCardBody, customCardProducts, customLink, imgFit} from './Styles'
import {SearchList} from '../components/SearchList'
import { Link } from 'react-router-dom'
import style from '../components/styles.module.css'



const Lists = ({ lists }) => {
    //  console.log(lists)
   // console.log('after', lists)
    const arr = []
    lists.map((user) => {
        user.products.map(products => {
            // console.log(products, user)
            products['creatorName'] = user.name
            products['createdBy'] = user.email
            arr.push(products)

        })
    })
    
   
    console.log(arr)
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

    console.log('lists: ', item.reservation)
    return (
  
        <div className={"col-md-10 mb-4 "} key={item._id}>
            <Link to={item._id} className={style.customLink} state={item}>
        <div className={"card " + style.customLink } style={customCardProducts}>
            <div className="row g-0 p-5">
                <div className="col-md-3">
                    <img src={item.img} onError={handleImageError} className={"img-fluid rounded-start " + style.userListImg} alt="Product image" />
                <h6 className="col-md-12 mt-2  justify-content-center">{item.reservation ? ('ZAREZERWOWANY'):('')} </h6>
                </div>
                <div className="col-md-9">
                <div className="card-body" style={customCardBody}>
                        <div className="card-title d-flex justify-content-between"><h4 className="card-title">{item.name}</h4> <h4>{item.price} PLN</h4></div>
                        <div className="card-text">
                            <h6 className="card-text">{item.desc}</h6>
                            <h6 className="card-text">Wystawił: {item.creatorName}</h6>
                            <h6 className="card-text">E-mail: <p style={customLink}>{item.createdBy}</p></h6>
                        </div>
                </div>
                </div>
            </div>
        </div>
        </Link>
    </div>
    


            // <>
            // {list.products.length > 0 ? (
            //     list.products.map((item) => {
            //         return (
            //             // <tr className="products" key={item._id}>
            //             //     <td>{list.name}</td>
            //             //     <td>{list.email}</td>
            //             //     <td>{item.name}</td>
            //             //     <td>{item.desc}</td>
            //             //     <td><img onError={handleImageError} height="50px" width="50px" src={item.img.length > 0 ? (item.img) : ("/img/no-img.png")} /></td>
            //             //     <td>{item.price} zł</td>
            //             // </tr>
                
            //             <div className="col-md-12 mb-4" key={item._id}>
            //                 <div className="card" style={customCardProducts}>
            //                     <div className="row g-0 p-5">
            //                         <div className="col-md-4 d-flex justify-content-center align-items-center">
            //                         <img src={item.img} onError={handleImageError} className="img-fluid rounded-start" width="350px" alt="Product image" />
            //                         </div>
            //                         <div className="col-md-8">
            //                         <div className="card-body" style={customCardBody}>
            //                                 <div className="card-title d-flex justify-content-between"><h4 className="card-title">{item.name}</h4> <h4>{item.price} PLN</h4></div>
            //                                 <div className="card-text">
            //                                     <h6 className="card-text">{item.desc}</h6>
            //                                     <h6 className="card-text">Wystawił: {list.name} {item.date}</h6>
            //                                     <h6 className="card-text">E-mail: <a href={`mailto:${list.email}`} style={customLink}>{list.email}</a></h6>
            //                                 </div>
            //                         </div>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
                
            //         );
            //     })
            // ) : (<div></div>)}
            // </>
    )
}

const App = ({value, onClick}) => {

    const [list, setList] = useState([]);
    let isValue = false;
    if(value.length > 0 || onClick){
        isValue = true;
    }
    console.log(value.length, isValue)

    useEffect(() => {
        const getList = async () => {
            const listFromServer = await fetchList()
            // console.log(listFromServer)
            setList(listFromServer)
        }

        getList() 
    }, [])

    // console.log(list)
    //Fetch List
    const fetchList = async () => {
        const res = await fetch('http://localhost:3500/list')
        const data = await res.json()
         console.log(data);
        const productList= [];
        data.filter((product) => {
            if(product.products.length > 0){
                productList.unshift(product)
            }
        })
        console.log(data, productList);
        return productList;
    }
    return (
        // <table className={`table ${styles.tableColor}`}>
        //     <thead>
        //         <tr>
        //             <th scope="col">Sprzedający</th>
        //             <th scope="col">Email</th>
        //             <th scope="col">Nazwa produktu</th>
        //             <th scope="col">Opis produktu</th>
        //             <th scope="col">Zdjęcie</th>
        //             <th scope="col">Cena</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <Lists lists={ list }/>
        //     </tbody>
        // </table>

            <div className="row d-flex justify-content-center">
                { value.length > 0 ? (
                <>
                    <div className="row justify-content-center">
                        <div className="col-md-8 p-3">
                            <h6 className={"p-3 card d-flex flex-row " + style.searchResult} style={customCardProducts}>Wyszukiwana fraza:<span className="fw-bold"> {value}</span></h6>
                        </div>
                    </div>
                    <SearchList lists={list} query={value}/>
                </>
                ) : (<>
                <Lists lists={list} />
                </>)}
            </div>
    );
}

export default App;