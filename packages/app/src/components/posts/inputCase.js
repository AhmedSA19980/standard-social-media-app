import React,{ useReducer,useRef,useEffect, createRef } from "react";
import {Input} from "../../common/input";
import Btn from "../../common/Btn";
import styles from '../../styles/Home.module.css'
import TextField from "../../common/textArea";
//import { createCase } from "../../lib/createCase";


//* required auth (if a user does not have an account or not logged can't post form  )
//* understand react-quill (not recommended for my porjects)
//* DB connection , call api
//* use Sesstion
//* if form sumbitted it will redicercted to latest form 


const formReducer = (state,action)=>{
    switch(action.type){

      case('NAME'):
      return{...state,  name:action.value ,  formPosted:false} 
      
      case'TEXT':
      return{...state, text:action.value  ,  formPosted:false} 

      case'ISFILEPICKED':
      return{...state,selectedFile:action.value, isFilePicked:true}

      case'TEXTVALIDATION' || 'NAMEVALIDATION':
      return{...state, textValidation:'missing text field', nameValidation:'missing text field'}   

      case'cleartext':
      return{...state, textValidation:'',nameValidation:'',fileValidation:''}
       
      case'validatedCharName':
      return{...state, nameValidation:'char must be more than 7 or empty'}

      case'validatedCharText':
      return{...state, textValidation:'char must be more than 50 or empty'}

      case'FILEVALIDATION':
      return{...state, isFilePicked:false,fileValidation:'file NOT selected'}
       
       case'FORMPOSTED':
      return{...state,
        formPosted:true
        
         }  
        
        case'FORMNOTPOSTED':
        return{...state,
        formPosted:false
        ,submittedForm:false,
         text:'',
         name:''}  
         
 
      case'SUBMITTEDFORM':
      return{...state,
        formPosted:true
        ,submittedForm:true,
         text:'',
         name:''}   


      default:
          break;
    }
}
 


const initialValue ={
    text:'',
    textValidation:'',
    name:'',
    nameValidation:'',
    selectedFile:null,
    isFilePicked:false, // isfilepicked
    fileValidation:'',
    formPosted:false,
    submittedForm:false


}
export  default function InputCase({page}){
    const [states,dispatcher] = useReducer(formReducer, initialValue)
    const fileInput = createRef()// uncontrolled component form 

  // const {submittedForm} = states;
    //const validText = useRef(null)


   
    const submittedTimes = useRef(0)
    

    const handleChange = (event,actionName)=>{
        const controledValue = event.target.value
        const uncontroledInputValue =fileInput.current

        if(actionName ==='TEXT' ){
            dispatcher({type:'TEXT', value:controledValue}) 
            
        }else if(actionName=== 'NAME'){
            dispatcher({type:'NAME', value:controledValue})
        }else if(actionName === 'ISFILEPICKED'){
            dispatcher({type:'ISFILEPICKED',value:uncontroledInputValue})
        }
        
       /* if(controledValue ===''){
            dispatcher({type:'TEXTVALIDATION'}) ||  dispatcher({type:'NAMEVALIDATION'})
        }*/
     
       
    }
     

   

   
    const clearMSG = ()=>{
        const timeout=5000
         setTimeout(() => {
                dispatcher({type:'cleartext'})
            }, timeout);
    }
    
    
  
    const submitForm =(e)=>{
        e.preventDefault()
       
        if( states.name.length <=6){
             dispatcher({type:'validatedCharName'})
              // clearMSG()
        } if(states.text.length <=6 ){
                dispatcher({type:'validatedCharText'})
             
        }
       /* if(!fileInput.current.length){
               dispatcher({type:'FILEVALIDATION'})
               if(fileInput.length){
                   dispatcher({type:'ISFILEPICKED'})
               }
        }*/

        if(states.text ==='ahmedsa' && states.name === 'ahmedsa'){
            dispatcher({type:'SUBMITTEDFORM'})  
            dispatcher({type:'FORMPOSTED'})
            alert(`info: ${states.name}=>text:${states.text}
            /t:messages=> successfully submitted`)
          
            
        }if(!states.text !=='ahmedsa' && states.name !=='ahmedsa'){
                 dispatcher({type:'FORMNOTPOSTED'})
                 alert('form not posted')
            }
        
            submittedTimes.current++;
            console.log(`form submitted${submittedTimes.current}`)
            clearMSG()
           //TimeOut(1000,  dispatcher({type:'ISFILEPICKED'}))

         
        
    }

    return(
    <main className={styles.container}>
        <div><h1>{states.name}</h1></div>
       {states.submittedForm?(<h3>wellcome</h3>):
       
        <form onSubmit={submitForm}>
         <h1>create Post Case</h1>
          <Input 
            id={'name'}
            label={'Name the Case'}
            htmlFor={'name'}
            type='text'
           value={states.name}
            onChange={(e)=>handleChange(e,'NAME')}
            ErrMsg={<p style={{color:'red'}}>{states.nameValidation}</p>}  
            />
            <TextField 
            id={'text'}
            label={'Described Case'}
            htmlFor={'text'}
            type='text'
            value={states.text}
            onChange={(e)=>handleChange(e,'TEXT')}
            ErrMsg={<p style={{color:'red'}}>{states.textValidation}</p> }  
            />
            <Input 
            id={'file'}
            label={'File:'}
            htmlFor={'file'}
            type='file'
            ref={fileInput}
            name='file'
            //value={states.selectedFile}
            onChange={(e)=>handleChange(e,'ISFILEPICKED')}
            ErrMsg={states.fileValidation}  
            />
            <Btn type='submit'
           // disabled={state.formPosted}
            value={'click'}/>
     </form>}
    </main>
    )
}


