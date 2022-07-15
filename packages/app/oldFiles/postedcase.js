import React,{useState} from "react";
//import InputCase from "../modules/posts/inputCase";
import Moment from 'react-moment'
import Btn from "../common/Btn";
import Comments from "./Comments";
import styles from '../styles/Home.module.css'
import CreateComment from "../modules/Comments/CreateComment";

//* posts 

//* descrition include the following
//* when the case happend , how many people invloved in that case
//* relative can leave social contact(number, email,etc...)
//* number of people who take the case
//* last location provided  
//* like , share , commnet BTN 
//* add comment to post , edit, delete
//* display comment belong posts 
//* dated comments



export default function  PostedCase({id, post,page}) { 
   const [open, setOpen] =  useState(false)

    const openComment =()=>{
        
        
        if(!open){
            setOpen(true)
        }else{
            setOpen(false)
        }
    }
  
    

    return(<div className={styles.main1}>
               <img src='../public/favicon.png' />
               <p>username</p>
               <div>
                   <small><Moment fromNow>{post?.timestamp?.toDate()}</Moment></small>
                  <p>post adress{post?.address}</p>
                  <p>post Text{post?.text}</p>
                  <button>contact{post?.relatives}</button>
                  <button>display{post?.contributers}:jim</button>
                  
                  <Btn value={'like'}>Like</Btn>
                  {open?(<><CreateComment /> 
                 </>)
                  :open}
                  <Btn   onClick={openComment }value={'comment'}>comment</Btn>
                 
        
                  <Btn>share</Btn>
                  <Comments />
               </div>
    </div>
    )

 }