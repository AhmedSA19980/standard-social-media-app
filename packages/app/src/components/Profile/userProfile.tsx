import React from "react";
import { useUserProfileQuery,  } from "../../generated/graphql";


export const UserProfile =()=>{

    const {data,loading} = useUserProfileQuery()
    let ele = null

    if(data?.userProfile){
        return (
          <div key={data.userProfile.id} style={{ textAlign: "center" }}>
            <h1>
              {data.userProfile.id}
              {data.userProfile.bio}
              {data.userProfile.gender}
    
            </h1>
          </div>
        );
    }
    return (
        <div>
            user profile PostPage
            ok ,
            love
            {ele}
        </div>
    )

}