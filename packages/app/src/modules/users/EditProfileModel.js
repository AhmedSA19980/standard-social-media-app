
//* in this component we'll edit and control user's profile info
//* able to change user name , set new passwpord or email etc....
//* need form



import { Modal } from "../../components/Model";
import Link from 'next/link'
import Btn from "../../common/Btn";

export default function EditProfileModel({isOpen,onRequestClose,onEdit,}){

    return(
      <Modal
      isOpen={isOpen} onRequestClose={onRequestClose}>
          {isOpen ? (<>
              <h3>here form opened with user info already display, u could use(formik , or react hook form) </h3>
              <div>
                  <Btn 
                  type={'submit'} >
                  {'sumbit'} <h3>submit</h3>
                  </Btn>
              </div>
            </>
          ):null}

      </Modal>
    )
}


