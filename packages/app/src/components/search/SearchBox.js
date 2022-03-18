import React,{useState,useEffect,useMemo ,useRef}from "react";
import debounce from 'lodash/debounce';   
import { useRouter } from 'next/router'
import { Input } from "../../common/input";
import { route } from "next/dist/server/router";
import Btn from '../../common/Btn'
//* search for users 



export default function SearchBox({isLoading = false,...props}){
  //  const [list, setList] = useState([])
        

    return(<>
     <Input
     autoFocus
      data-testid="searchbar"
     {...props}
     />
        
      
    </>)
}