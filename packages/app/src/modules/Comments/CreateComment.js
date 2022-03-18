import React,{useState,useEffect} from "react";
import { Input } from "../../common/input";
import Btn from "../../common/Btn";



//* create comment

export default function CreateComment(){

   const [comment, setComment] = useState('')
   const [valid, setValidation] =useState('')
   const [comments, setComments] = useState([])


    const handleChange =(e)=>{
        const value= e.target.value
        setComment(value)
    }
   
    // set clear MSg
    useEffect(() => {
        setTimeout(()=>{
            setValidation('')
        },5000)
    }, [valid])

   const  submittedComment = (e)=>{
        e.preventDefault()
        if(comment.length <1){
            setValidation("filed can't empty or less 2 char")
        }
        else{
       alert(comment)
       //comments.push()
       setComment('')
        }
    }

    return(
        <div>
            <form onSubmit={submittedComment}>

            <Input
            id={'comment'}
            name={'comment'}
            palceholder={'leave a comment'}
            value={comment}
            onChange={handleChange}
            ErrMsg ={<h3 style={{color:'red'}}>{valid}</h3>}
            />
             <Btn type={'submit'}  value={'submit'}>submit</Btn>
            </form>
        </div>
    )
}




