import React from "react";
import GenericNotification from "./GenericNotification";
import Btn from "../src/common/Btn";

//* notificate new post to users



export default function PostNotification(props){

    const {userAvaSrc,userName,shortedPost,time, userPostedLink }  = props


    const notificationMsg =()=>(
        <>
        <a
        {...(userPostedLink?{href:userPostedLink}:null)}
        >

        </a>
        </>
    )

    return(<GenericNotification 
     notificationMsg={notificationMsg}
     time={time}

    />)

} 