import Input from "../src/common/input"
import Btn from "../src/common/Btn"
import {LoginHelper} from './LoginHelper'
import { useReducer,useRef,useEffect } from "react"


const Reducer = (prevState,action)=>{
    switch(action.type){
        case 'username':
            return{
                ...prevState,
                username:action.payload
            }
        case 'password':    
           return{
                ...prevState,
                password:action.payload
            }
        case 'LOGGED_IN':
          return{
              ...prevState,
            isLoggedIn:true    
        }
        case 'LOGGED_OUT':
            return{
                ...prevState,
                isLoggedIn:false,
                username:'',
                password:'',
                
            }
        case 'IS_LOADING':
            return{
                ...prevState,
                isLoading:true
            }
        case 'IS_NOT_LOADING':
            return{
                ...prevState,
                isLoading:false
            }
        case 'ERROR':
            return{
                ...prevState,
                isLoading:false,
                isError:true,
                
            }
             case 'VALID':
            return{
                ...prevState,
                isLoading:false,
                isError:true,
                valid:'inapropriate value'
                
            }
/*case 'LOGGED_TIMES':
            return{
                ...prevState,
                isLoggedIn:true,
                timesLogged:state.timesLogged +1

            }   */ 
        default:
         break;       


    }

}

const initialValue ={
    username:'',
    password:'',
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    valid:''
   // timesLogged:0


}
export  function Login() {
    
    const times = useRef(0) // times looged

    const [state,dispatcher] = useReducer(Reducer, initialValue)

    const userNameHandler =  e =>{
        const value =  e.target.value
        dispatcher({type:'username', payload:value})

    }

    const passwordHandler =  e =>{
        const value =  e.target.value
          dispatcher({type:'password', payload:value})
    }

        const logoutHandler = e => {
        dispatcher({ type: 'LOGGED_OUT' });
    };
   

    const submitForm = async e =>{
        e.preventDefault()


        try{
            dispatcher({type:'IS_LOADING'})
            await LoginHelper({username:state.username, password:state.password})
            dispatcher({type:'IS_NOT_LOADING'})
            dispatcher({type:'LOGGED_IN'})

            times.current++;

             console.log(`Clicked ${times.current} times`);
        }catch{
             dispatcher({type:'ERROR'})
             alert('🚨 Incorrect username or password');
             //dispatcher({type:'VALID'})
            
            }

    }

    return(<div>
        <h1>Login Page</h1>
        {state.isLoggedIn
        ?<><p>Welcome!</p><Btn type={'submit'} onClick={logoutHandler}value={'log out'}/></> :
        <form onSubmit={submitForm}>
            <p>{state.valid}</p>
        <Input
        label={'Username or Email'}
        htmlFor={'username'}
        id={'username'}
        type='text'
        onChange={userNameHandler} 
        value={state.username}
        name={'user'}
         />
        <Input
        label={'Password'}
          htmlFor={'password'}
        id={'password'}
         type='text'
         onChange={passwordHandler}
         value={state.password}
         name={'password'} 
         />
         
        <Btn  
        type='submit'
        value={state.isLoading ? 'Login...':'login in'}
        disabled={state.isLoading}
        />

        </form>}
        
    </div>)
  }
  