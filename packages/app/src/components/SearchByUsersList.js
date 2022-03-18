import React,{useState,useEffect} from "react";
import { RoundShape,TextBlock } from "react-placeholder/lib/placeholders";
import ReactPlaceholder from 'react-placeholder/lib';
import {Info} from '../data/D'

//** when a user search for another user  this component display its info {data fetching} */

export default function SearchByUserList({}) {

    const [usersList, setUserList] = useState('')

 
     
    const {loading,datauser } = usersList

   const showResultsNotFound = datauser?.length === 0;

    return(
    /*<div>
        <ReactPlaceholder 
        customPlaceholder={<SearchByUserListPlaceHolder />} 
         showLoadingAnimation
        ready={!loading || datauser.length >0 }
        >
         {showResultsNotFound &&(
             <div><h1>user Not Found</h1></div>
         )}   

           {!showResultsNotFound &&(
             <div><h1>user info</h1>
             
             </div>
         )} 
           
        </ReactPlaceholder>
       
    </div>*/
    <>
    </>
  
    )
}


const SearchByUserListPlaceHolder = (props)=>{
   const num = 5

    return new Array(num).fill(0).map((value ,idx)=>(
        <div key={idx}>
          <div className="searchitem">
          <RoundShape color="#c5c5c5" style={{ width: 70, height: 70 }} />
          <div className="searchitem__info">
            <TextBlock rows={2} color="#c5c5c5" style={{ width: 200 }} />
          </div>
        </div>
        <TextBlock rows={2} color="#c5c5c5" style={{ width: '100%' }} />
      </div>
    )) 
}
