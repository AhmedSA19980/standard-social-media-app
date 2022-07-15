import React,{useEffect, useState} from "react";

import { PostsListDocument, usePostsListQuery ,PostsListComponent} from "../../generated/graphql";
import { post } from "../../graphql/query/post";
import { AddCommentToPost } from "../comment/createComment";

export const PostList = ()=>{
    

    const [toggle  , setToggle] = useState(false)
    const{ data, error } = usePostsListQuery({
      notifyOnNetworkStatusChange:true
    });
  
     let body = null
    if(data?.posts){
      
      return (body = (
        <div>
          {data?.posts?.map((d) => !d ? null :(

            <>
              <h1>
                field:{d.field} || text:{d.text}
              </h1>
              <li>{d.userLike}</li>
              <li>{d.likeCount}</li>
              <li>{d.commentCount}</li>
              <h1>createdAt by:{d.author.userName}</h1>
              <div>
                date:{d.createdAt}
                <h1>the owner:{}</h1>
                <span>
                  <div>
                    add Comm
                    <AddCommentToPost post={
                    d}></AddCommentToPost>
                
                  </div>
                  {d.comments?.map((c) => (
                    <div
                      key={c.id}
                      style={{
                        textAlign: "center",
                        textIndent: "5px",
                        padding: "10px",
                      }}
                    >
                      <span>comment:{c.writeAComment}---</span>
                      <span>user:{c.user.userName}</span>
                    </div>
                  ))}
                </span>
                
              </div>
            </>
          ))}
        </div>
      ));
    
    }else if(!data?.posts) {
      console.log(error)
      body = (
        <div>
           posts not found
        </div>
      )
    }
      
    


    return(
      <div>
         {body}
      </div>
     
  )
}