import React from "react"

export default function  textField ({id, type,label,htmlFor,value,onChange, ErrMsg}) { 

    return(<div id={id}>
        <label htmlFor={htmlFor}>{label}</label>
        <textarea  id={id} type={type} placeholder={label} value={value} onChange={onChange}/>
        <p><small>{ErrMsg}</small></p>
    </div>
    )
 }

 // for giant paragraph