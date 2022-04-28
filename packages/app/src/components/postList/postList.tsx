import React,{useEffect, useState} from "react";

import { PostsListDocument, usePostsListQuery ,PostsListComponent} from "../../generated/graphql";

export const PostList = ()=>{
    
    const{ data, error } = usePostsListQuery({
      notifyOnNetworkStatusChange:true
    });
  
     let body = null
    if(data?.posts){
      
      return (body = (
        <div>
          {data?.posts?.map((d) => (
            <>
              <h1>
                field:{d.field} || text:{d.text}
              </h1>
              <div>
                date:{d.createdAt}
                <h1>teh owner:{d.postBelongToUser}</h1>
                <span>{d.comments?.map((c)=>(
                <div key={c.id} style={{textAlign:"center" , textIndent:"5px" ,padding:"10px"}}>
                  
                <span  >comment:{c.writeAComment}---</span>
                <span  >user:{c.authorId}</span>
                
                </div>
                ))}</span>
                
              </div>
            </>
          ))}
        </div>
      ));
    
    }else {
      console.log(error)
    }


    return(
      <div>
         {body}
      </div>
     
  )
}