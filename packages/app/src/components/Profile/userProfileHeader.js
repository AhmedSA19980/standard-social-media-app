
import { useState } from "react";
import { ProfileHeaderWrapper } from "./ProfileheaderWrapper";
import EditProfileModel from "../../modules/users/EditProfileModel";
import Btn from "../../common/Btn";

//* show user porifle header  if user logged
//* if user in his current profile the profile header won't apppear till he movies to next page
//* if  not user can't change user setting



export default function ProfileHeader({user, isCurrentUser}){

  const [showEditProfileModal, setShowEditProfileModal] = useState(false)


  return(
  <ProfileHeaderWrapper
  style={{backgroundColor:'lightgrey' ,border:'3px solid blue'}}
  
  coverUrl={user?.coverImg || '/favicon.png'}>
   <div>
       <h1>{user?.name}</h1>
   </div>
   <span>^</span>
   <EditProfileModel
   isOpen={showEditProfileModal}
   onRequestClose={()=> showEditProfileModal(false)}
   onEdit={"we'll pass func that chagne field && submit changes"}
   >
   {isCurrentUser?(
   <Btn 
    onClick={()=> showEditProfileModal(true)}
   
   />): showEditProfileModal}

   </EditProfileModel>

  </ProfileHeaderWrapper>

  )
}