import React from "react";
import { usePostQuery, PostQuery } from "../../generated/graphql";

export const Post =()=>{

    const {data , loading , error} = usePostQuery({variables:{id:"1"}})
       let body = null
      if(loading){
          return (
            <div>
              <h3 style={{ cursor: "pointer" }}>....Loadding</h3>
            </div>
          );
       }else if(data?.post){
           body = (
             <>
               <h1>{data.post.id}</h1>
               <p>{data.post.text}</p>
               <h1>{data.post.likes}</h1>
               <h1>{data.post.postBelongToUser}</h1>
               <h1></h1>
             </>
           );
       }

    return(
        <div >
            {body ? body :loading}
        </div>
    )
}