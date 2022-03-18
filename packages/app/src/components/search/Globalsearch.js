//* display search reault


import React,{useState} from "react";
import { Info } from "../../data/D";
import SearchBox from "./SearchBox";
import SearchHistory from "./searchistory";
import { SearchOverlay } from "./searchoverlay";
import { UserSearchResult } from "./searchresults/userSearchResult";
//import { Info } from "../../data/D";
//* do forget to learn flow  check statictype checking in react docs



//* two component we have to bulild  1- searchHistory  2-search reasult  , their task getting the data 

//* last comonent is global search => check 2 privous components


function History({history }){

    const  historyDeleteClickHandler = (id)=>{
          return id
    }

    return(<div>
        {history.map((item)=>(
            <SearchHistory
            key={item.id}
            onClickToDeleteSearchHistort={()=>historyDeleteClickHandler(item.id)}
            searchText={h.term}
            >
             </SearchHistory>
        ))}
    </div>)

}


//* search for users or cases
function SearchResult({items}){
 
  return(<div>
      {items.map((userOrCase,i)=>
      "name" in userOrCase ?(
       <UserSearchResult key={i} user={userOrCase} />
      ):<p>not develeped</p>
      )}
  </div>)


}


export function GlobalSearch({history, searchResult}){


    const[focused, setFocused]= useState(false)
    const [term, setTerm]= useState('')


    const searchTermsResult =({currentTarget:{value}})=>{setTerm(value)}

    const focusHandler =()=>setFocused(true);
    const onBlur = ()=>setFocused(false)
    
   
    return(<div>
        <div>
            <SearchBox 
            onFocus={focusHandler}
            onBlur={onBlur}
            onChage={searchTermsResult}
            />      
        </div>

       <div>
      {focused&&(
          <SearchOverlay>
              {!term && history && <History history={history}/>}
               {term && searchResult && <SearchResult items={searchResult}/>}
          </SearchOverlay>
      )}
      </div> 
    </div>)

}





