import React from "react";
import {List} from '../pages/UserList/UserList.js'


export const SearchList = ({ lists, query, checkedVoivode, category}) => {
    
    if (lists.length == 0) {
        console.log('searching...')
        return <>Searching...</>
    }
    console.log('voivode:', checkedVoivode)
    console.log('query:', query)
    console.log('lists:', lists)
    console.log('category:', category)


    console.log(window.location.pathname.includes('/list'))
    if (!window.location.pathname.includes('/list')) {
        window.location = '/list'
    }

  

    const arr = []
    lists.map((user) => {
        user.products.filter(item => {
            item['creatorName'] = user.name;
            item['createdBy'] = user.email;
            if (user.region === undefined) {
                item['regionVoivode'] = ''
                item['regionCity'] = ''
            } else {
                item['regionVoivode'] = user.region.voivodeship
                item['regionCity'] = user.region.city
            }
            if (item.category === undefined) {
                item.category = 'Pozostałe'
            }

            // console.log('filter', item.regionVoivode, checkedVoivode, item.regionVoivode == checkedVoivode)
            // console.log('pass test?', item.regionVoivode == checkedVoivode)
            // console.log(item)
                if(item.regionVoivode.includes(checkedVoivode) && item.name.toLowerCase().includes(query.toLowerCase()) && item.category.toLowerCase().includes(category.toLowerCase()))
                arr.push(item)    
            
            // console.log('arrr', arr)
        })


    })
    
    console.log(arr.length)
    if (arr.length == 0) {
        return <>Nie znaleziono szukanego produktu :(</>
    }


   return(
       <>   {arr.map((item, index) => (
           <List key={index} item={item}/>
    ))} </>
    );
    
}
