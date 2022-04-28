//import React from "react";
import ProfileHeader from "./userProfileHeader";
import styles from'../../styles/Home.module.css'
import EditProfileModel from "../../modules/users/EditProfileModel";

//* user porfile => img , basic info
//* how many follwers  , how many cases sloved , and  following
//* porfile header
//* check user auth
//* is user online
//* if profile usercurrent  , can dm me
//* user can edit profile
const style = {
    default:{
        color:'red',
        fontSize:20,
    border:'1px solid red',
    }
}

import Image from "next/image";
export default function userProfil({user}) {

    return(<div className={'container'} style={{'textAlign':'center'}}>
        <h1 style={{'textAlign':'center'}}>user profile page</h1>
        <div className={styles.main
        } style={{ border:'2px soild red'}}>
 
      <Image
     // loader={myLoader}
      src="/favicon.png"
      alt="Picture of the author"
      width={100}
      height={100}
    />   
     <h1>userNmae{user?.username}</h1>
     <div>
         some details{user?.userdetail}
     </div>
     <h3>following {user?.following ||500}</h3>
     <h3>followers {user?.followwers || 200}</h3>
       <h3>solved cases {user?.solvedcases || 2000}</h3>
    </div>
     </div>)
}