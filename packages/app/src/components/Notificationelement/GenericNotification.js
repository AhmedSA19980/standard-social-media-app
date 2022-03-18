import React from "react";
import SolidRocket from "../../icons/solidRocket";


export default function GenericNotification(props) {
   
    const {notificationMsg,time,actionButton,icon} = props

    return (<>
    <div>
        {icon ? icon : <SolidRocket className="text-primary-300"/>}
        {notificationMsg ? notificationMsg:'you have a new notification'}
        <span>{time? time : 'some time ago'}</span>
    </div>
     <div>{actionButton ?<div className="flex ml-auto">{actionButton}</div> :null}</div>
    </>)
  }