import React from "react";
import { usePostQuery, PostQuery } from "../../generated/graphql";

export const Post =()=>{

    const {data , loading , error} = usePostQuery({})
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
               <h1>{data.post.createdAt}</h1>
               <h1>all post{data.post}</h1>
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