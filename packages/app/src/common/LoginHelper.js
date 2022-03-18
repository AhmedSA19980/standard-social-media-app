
export async function LoginHelper({username, password}) { 
 return new Promise((resolve,reject)=>{
     setTimeout(()=>{
         if(username =='user' && password == 'password'){
             resolve()
             alert('correct info')
         }else{
             reject()
         }
     },1000)
 })
}