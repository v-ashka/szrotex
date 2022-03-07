import React, { useEffect, useState } from "react";
import {List} from '../pages/UserList'


export const SearchList = ({ lists, query, checkedVoivode }) => {
    console.log('searchlkist', checkedVoivode)
    console.log('queyr', query)
    const arr = []
    lists.map((user) => {
        // user.products.map(products => {
        //     // console.log(products, user)
        //     products['creatorName'] = user.name
        //     products['createdBy'] = user.email
        //     arr.push(products)

        // })
        
        user.products.filter(item => {
            item['creatorName'] = user.name;
            item['createdBy'] = user.email;
            //console.log(item.name, item.name.toLowerCase().includes(query.toLowerCase()))
            // console.log('sortbyVoivode', checkedVoivode)
            console.log('filter', item.regionVoivode, checkedVoivode, item.regionVoivode == checkedVoivode)
            console.log('pass test?', item.regionVoivode == checkedVoivode)
                // if (item.name.toLowerCase().includes(query.toLowerCase()))
                if(item.regionVoivode.includes(checkedVoivode) && item.name.toLowerCase().includes(query.toLowerCase()))
                arr.push(item)    
            
            console.log('arrr', arr)
        })


    })
    
    // console.log(arr)
   return(
       <>   {arr.map((item, index) => (
        <List key={index} item={item}/>
    ))} </>
   );
}
