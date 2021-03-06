//import { getInitialProps } from "react-i18next"; modern package language transliation

import React,{forwardRef} from "react";



export const  SearchOverlay =React.forwardRef(({children,...props},ref)=>{

    return(<div
      ref={ref}
     // className={`absolute flex flex-col py-2 rounded-8 bg-primary-800 border-primary-700 border ${className}`}
      style={{
        minHeight: "198px",
        maxHeight: "50vh",
        top: "-10px",
        left: "-10px",
        right: "0px",
        boxShadow: "-3px 4px 14px rgba(0, 0, 0, 0.7)",
        width: "calc(100% + 20px)",
        zIndex: -1,
      }}
      {...props}
    >
      {children}
    </div>
    )

});



