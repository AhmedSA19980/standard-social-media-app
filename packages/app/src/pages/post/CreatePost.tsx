import dynamic from "next/dynamic";
import React, { FC } from "react";
import { CreatePost } from "../../components/posts/createCase";




export const createPostPage = ()=>{
 return (
   <div>
    <CreatePost />
   </div>
 );
}

export default createPostPage