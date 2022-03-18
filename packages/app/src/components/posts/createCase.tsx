import React from "react";
import { useCreatePostMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { Field, Form, ErrorMessage, Formik} from "formik";
import { Button } from "../../common/Btn";






export const  CreatePost = () =>{
  
    const router  = useRouter()
    const [createpost, {data,loading, error}] = useCreatePostMutation()
     
      
     return (
       <div>
         <Formik
           initialValues={{ text: "", field: "", likes: "" }}
           onSubmit={async (values:any) => {
             const res = await createpost({
               variables: {
                 text: values.text,
                
               },
               //refetchQueries: [{ query: IsLoggedDocument }],
             });
             if(res){
               alert(data)
             }
             else if(!res){
               alert('erro')
             }
             //alert(JSON.stringify(values, null, 2));
             // console.log(values);
            /* if (res.data?.register.errors) {
               setErrors(ErrorMap(res.data.register.errors));

               // console.log(setErrors(ErrorMap(res.data.register.errors)));
             } else if (res.data?.register.user) {
               route.push("/");
             }*/
           }}
         >
           {({ isSubmitting }) => (
             <Form method="post">
               <label htmlFor="text"> text</label>
               <Field
                 id={"text"}
                 name={"text"}
                 // type={"text"}

                 ///component={InputField}
               />
               <p style={{ color: "red" }}>
                 <ErrorMessage name="text" />
               </p>
               <label htmlFor="field">field</label>
               <Field
                 id={"field"}
                 name={"field"}
                 // type={"field"}
                 //component={InputField}
               />

               <p style={{ color: "red" }}>
                 <ErrorMessage name="field" />
               </p>
               <label htmlFor="likes">likes</label>
               <Field
                 id={"likes"}
                 name={"likes"}
                 // type={"likes"}
                 //component={InputField}
               />
               <p style={{ color: "red" }}>
                 <ErrorMessage name="likes" />
               </p>
               <Button
                 type="submit"
                 value={"submit"}
                 loading={isSubmitting}
               ></Button>
             </Form>
           )}
         </Formik>
       </div>
     );
}