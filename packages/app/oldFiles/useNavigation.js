import {useState,useCallback} from 'react';


export default function(){
    const [route,setRoute] = useState('Home')

    const selectRoute =useCallback(
        (option) => {
            if(route=== option){
                setRoute(option)
            }
        },
        [route],
    )

    return { currentRoute: route, setCurrentRoute: selectRoute };
}