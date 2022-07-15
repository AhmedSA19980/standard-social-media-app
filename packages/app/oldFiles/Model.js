//* http://reactcommunity.org/react-modal/
/*Accessible modal dialog component for React.JS
*/

import ReactModal from 'react-modal';
import SoildPlus from '../src/icons/solidPlus';


const customStyles = {
  default: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 8,
      padding: "40px 40px 40px 40px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-800)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 530,
    },
  },
  userPreview: {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: 8,
      padding: 0,
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--color-primary-900)",
      border: "none",
      maxHeight: "80vh",
      width: "90%",
      maxWidth: 435,
    },
  },
};

// ...props mean=>whatever property i will sset on future react knows that 

export const  Modal= ({children, variant= 'default', ...props})=>{
   

    const onKeyDown =(event)=>{

        const currentActive = document.activeElement

        if(event.key ==='ArrowLeft'){
            (currentActive?.previousElementSibling )?.focus()
        } else if (event.key === "ArrowRight") {
      (currentActive?.nextElementSibling)?.focus();
    }
    }

    return(<ReactModal
    shouldCloseOnEsc
    shouldFocusAfterRender
    style={customStyles[variant]}
    {...props}
    >
        <div>
            <button
            className={`p-1 text-primary-100`}
            onClick={(e) => props?.onRequestClose?.(e)}
            data-testid="close-modal"
          ><SoildPlus  className={`transform rotate-45`}/></button>
        <div
          tabIndex={-1}
          className={`focus:outline-none`}
          onKeyDown={onKeyDown}
        >
          {children}
        </div>

        </div>

    </ReactModal>)

}