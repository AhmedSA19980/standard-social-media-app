import React from "react";
import GenericNotification from "./GenericNotification";
import Btn from "../../common/Btn";

//* show user data 
//* we need to create user comonent

//* icon props not compeleted

export default function FollowersNotification(props){
   const {userAvaSrc , userName, 
    userProfileLink  ,time,
    following = false ,isOnline
    } = props


   const notificationMsg = ()=>(
       <>
       <a
        {...(userProfileLink? {href:userProfileLink}:{})}
       >
          {userName}
          <span>Followed you</span>
       </a>
       </>
   )
   
   const followButton =()=>(
      <Btn
      size="small"
      color={following ? "secondary" : "primary"}
      style={{ width: "90px" }}
    >
      {following ? "Following" : "Follow back"}
    </Btn>
   )

    return(
    <GenericNotification 
    notificationMsg={notificationMsg}
    time={time}
    actionButton={followButton}
    />
    )
}