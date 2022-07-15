import React from "react";
import { Field, Form, ErrorMessage, Formik } from "formik";
import { number } from "prop-types";
import { Button } from "../../common/Btn";
import {
  PostsListFragment
  ,useAddCommentMutation  
  
} from "../../generated/graphql"


// get post info
interface addCommentSection { 
  post:PostsListFragment
}




export const AddCommentToPost = ({post}:addCommentSection)=>{
    const [addcomment , {data, error, loading}] =
     useAddCommentMutation()

     return (
       <div>
         <Formik
           initialValues={{ addComment: "", }}
           onSubmit={async (values: any) => {
              await addcomment({
               variables: {
                 writeAComment: values.addcomment,
                 postId: post.id,
               },
             });
           }}
           
         >
           {({ isSubmitting }) => (
             <Form>
               <label htmlFor="addComment">addComment</label>
               <Field
                 id={"addComment"}
                 name={"addComment"}
                 // type={"text"}

                 ///component={InputField}
               />
               
               <p style={{ color: "red" }}>
                 <ErrorMessage name="addComment" />
               </p>

            
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
         {post.id}||
         {post.field}||
         {post.createdAt}
         {data?.createComment.getpost.comments?.map((d)=>(
          <>
          {d.writeAComment}
          </>
         ))}
       </div>
     );


}