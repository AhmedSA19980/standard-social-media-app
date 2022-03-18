/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import React,{FormEvent,useReducer, useRef} from "react";
import styles from '../styles/Home.module.css'
import { Input } from "../common/input";
import {Button} from "../common/Btn";
import { any, string } from "prop-types";
import { gql, useMutation } from "urql";

//* register component

type actionType = 
    | {type:"USERNAME";payload:string}
    | {type:"EMAIL";payload:string}
    |{type:"DATE";payload:string} //* =>
     |{type:"PASSWORD";payload:string}
     |{type:"MATCHEDPASSWORD";payload:string}//* =>
     |{type:"VALIDATEDUSERNAME";payload:string}
     |{type:"VALIDATEDEMAIL";payload:string}
     |{type:"VALIDATEDPASSWORD";payload:string}
     |{type:"VALIDATEDDATE";payload:string}
     |{type:"VALIDATEDMATCHEDPASSWORD";payload:string}
     |{type:"VALIDATEDCHECK";payload:string}
     |{type:"CHECKPOLICYANDPRIVACY";payload:boolean}
     |{type:"clearMSG";payload:string}
     |{type:"RIGSTEREDPOST";payload:boolean}
     |{type:"SUBMITTEDFORM";payload:boolean}

const initialValue= {
    userName:'',
    validatedUserName:'',
    email:'',
    validatedEmail:'',
    date:'',
    validatedDate:'',
    password:'',
    validatedPassowrd:'',
    matchedpassword:'',
    validatedMatchedPassowrd:'',
    checkPolicyAndPrivacy:false,
    validatedCheck:'',
    rigisteredPost:false,
    submittedForm:false

}


const formReducer = (state: typeof initialValue, action: actionType) => {
  switch (action.type) {
    case "USERNAME":
      return { ...state, userName: action.payload };

    case "EMAIL":
      return { ...state, email: action.payload };

    case "DATE":
      return { ...state, date: action.payload };

    case "PASSWORD":
      return { ...state, password: action.payload };

    case "MATCHEDPASSWORD":
      return { ...state, matchedpassword: action.payload };

    case "VALIDATEDUSERNAME":
      return { ...state, validatedUserName: "username field required" };
    case "VALIDATEDEMAIL":
      return { ...state, validatedEmail: "email field required" };

    case "VALIDATEDPASSWORD":
      return { ...state, validatedPassowrd: "password field required" };

    case "VALIDATEDDATE":
      return { ...state, validatedDate: "date field required" };

    case "VALIDATEDMATCHEDPASSWORD":
      return { ...state, validatedMatchedPassowrd: "password not matched" };

    case "VALIDATEDCHECK":
      return { ...state, validatedCheck: "you should accept out policy" };

    case "CHECKPOLICYANDPRIVACY":
      return { ...state, checkPolicyAndPrivacy: true };
    case "clearMSG":
      return {
        ...state,
        validatedUserName: "",
        validatedEmail: "",
        validatedDate: "",
        validatedPassowrd: "",
        validatedCheck: "",
        validatedMatchedPassowrd: "",
      };

    case "RIGSTEREDPOST":
      return { ...state, rigisteredPost: true };

    case "SUBMITTEDFORM":
      return { ...state, submitForm: true };
  }
};
/*interface initialValue {
  userName: string;
  validatedUserName: string;
  email: string;
  validatedEmail: string;
  date: string;
  validatedDate: string;
  password: string;
  validatedPassowrd: string;
  matchedpassword: string;
  validatedMatchedPassowrd: string;
  checkPolicyAndPrivacy: boolean;
  validatedCheck: string;
  rigisteredPost: boolean;
  submittedForm: boolean;
}*/


const w = `mutation ($userName:String!, $password:String!){
  rigister (options:{userName:$userName, password:$password}){
    errors{
      Field,
      Message
    }
  user{
    id,
    userName
  }
}
}`;
interface rigsterProps {}
export const  Rigster =()=>{

    const [r, rigister] = useMutation(w);
    const [states, dispatch] = useReducer(formReducer, initialValue)
 
    //* use any type is the worst type(makes it up like js)
   const handleChange =(event: { target: { value: any | undefined; }; }, actionName: string)=>{
       const controlledValue =  event.target.value

       console.log(event)

    if(actionName ==='USERNAME'){
      dispatch({type:'USERNAME', payload:controlledValue})
   }
   if(actionName ==='EMAIL'){
      dispatch({type:'EMAIL', payload:controlledValue})
   }
    if(actionName ==='DATE'){
      dispatch({type:'DATE', payload:controlledValue})
   }
    if(actionName ==='PASSWORD'){
      dispatch({type:'PASSWORD', payload:controlledValue})
   }
    if(actionName ==='MATCHEDPASSWORD'){
      dispatch({type:'MATCHEDPASSWORD', payload:controlledValue})
   }
   if(actionName === 'CHECKPOLICYANDPRIVACY'){
       dispatch({type:'CHECKPOLICYANDPRIVACY',payload:controlledValue})
   }

   
 }
     /* const clearMSG = ()=>{
        const timeout=5000
         setTimeout(() => {
                dispatch({type:'clearMSG',payload:""})
            }, timeout);
    }*/
    
   const submitForm = (e:any) => {
     //* worse case to use any
     e.preventDefault();
    // rigister(e)
     console.log(states.userName)
    // console.log(rigister(e))

     /*if (states.userName.trim() === "") {
       dispatch({
         type: "VALIDATEDUSERNAME",
         payload: states.validatedUserName,
       });
     }
     if (states.email.trim() === "") {
       dispatch({ type: "VALIDATEDEMAIL", payload: states.validatedEmail });
     }
     if (states.date.trim() === "") {
       dispatch({ type: "VALIDATEDDATE", payload: states.validatedDate });
     }
     if (states.password.trim() === "") {
       dispatch({
         type: "VALIDATEDPASSWORD",
         payload: states.validatedPassowrd,
       });
     }
     if (states.matchedpassword !== states.password) {
       dispatch({
         type: "VALIDATEDMATCHEDPASSWORD",
         payload: states.matchedpassword,
       });
     }
     if (!states.checkPolicyAndPrivacy) {
       dispatch({ type: "VALIDATEDCHECK", payload: states.validatedCheck });
     } else {
       if (
         states.userName === "a" &&
         states.email === "b" &&
         states.password === "123"
       ) {
         alert("success");
       }
     }*/
     //return clearMSG();
   };
    return (
      <main className={styles.container}>
        {states.submittedForm ? (
          <h3>wellcome</h3>
        ) : (
          <form onSubmit={submitForm}>
            <h1>create Post Case</h1>
            <Input
              id={"userName"}
              label={"userName the Case"}
              htmlFor={"userName"}
              type="text"
              value={states.userName}
              onChange={(e) => handleChange(e, "USERNAME")}
              ErrMsg={states.validatedUserName}
            />
            <Input
              id={"Email"}
              label={"Described Case"}
              htmlFor={"Email"}
              type={"text"}
              value={states.email}
              onChange={(e) => handleChange(e, "EMAIL")}
              ErrMsg={states.validatedEmail}
            />
            {/*  <Input 
        
            id={'date'}
            label={'date of birth'}
            htmlFor={'date'}
            type={'Date'}
            value={states.date}
            onChange={(e)=>handleChange(e,'DATE')}
            ErrMsg={states.validatedDate}  
          />*/}

            <Input
              id={"passowrd"}
              label={"passowrd:"}
              htmlFor={"passowrd"}
              type="passowrd"
              //ref={fileInput}
              name="file"
              value={states.password}
              onChange={(e) => handleChange(e, "PASSWORD")}
              ErrMsg={states.validatedPassowrd}
            />
            {/*  <Input 
            id={'repet password'}
            label={'repet password:'}
            htmlFor={'repet password'}
            type='password'
            //ref={fileInput}
            //name='file'
            value={states.matchedpassword}
            onChange={(e)=>handleChange(e,'MATCHEDPASSWORD')}
            ErrMsg={states.validatedMatchedPassowrd}  
            />
            <Input 
            id={'check'}
            label={'policy&privcey'}
            htmlFor={'rcheck'}
            type={'checkbox'}
            //ref={fileInput}
            name='file'
          //  value={states.checkPolicyAndPrivacy}
            onChange={(e)=>handleChange(e,'CHECKPOLICYANDPRIVACY')}
            ErrMsg={states.validatedCheck}  
           />*/}
            <Button
              type="submit"
              //disabled={states.formPosted}
              value={"submit"}
            />
          </form>
        )}
        <div>{states.userName}</div>
      </main>
    );
}

