import React from "react";
import Moment from 'react-moment' // react date library 


// dispay all commnets belongs to specfic comment



export default function Comments ({comment}){
    
    return (<div>
        <main>
            <img 
            src={comment?.userImg}
             alt=""
            />
            <div>
                {comment?.username} 
            </div>
            <div>
                 <span>{comment?.tag} </span>
            </div>
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
              <div>
                  {comment?.comments}
              </div>
        </main>
    </div>)
}