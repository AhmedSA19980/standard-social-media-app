import React from "react";
import { useAddCommentMutation,AddCommentDocument  } from "../../generated/graphql";

import { Field, Form, ErrorMessage, Formik } from "formik";
import { number } from "prop-types";
import { Button } from "../../common/Btn";



export const AddCommentToPost = ()=>{
    const [addcomment , {data, error, loading}] = useAddCommentMutation()

     return (
       <div>
         <Formik
           initialValues={{ addCooment: "", postId: number }}
           onSubmit={async (values: any) => {
             const response = await addcomment({
               variables: {
                 writeAComment: values.addcomment,
                 postId: values.postId,
               },
             });
           }}
         >
         {({ isSubmitting }) => (
           <Form>
             <label htmlFor="addCooment">addCooment</label>
             <Field
               id={"addCooment"}
               name={"addCooment"}
               // type={"text"}

               ///component={InputField}
             />
             <p style={{ color: "red" }}>
               <ErrorMessage name="addCooment" />
             </p>

             <label htmlFor="postId">postId</label>
             <Field
               id={"postId"}
               name={"postId"}
                type={"number"}

               ///component={InputField}
             />
             <p style={{ color: "red" }}>
               <ErrorMessage name="postId" />
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