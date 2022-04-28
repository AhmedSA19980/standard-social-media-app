import React from "react";
import {
  useCreatePostMutation,
   PostDocument,
  usePostQuery,
  PostQuery,
  Post,
  CreatePostDocument,
  PostsListDocument
} from "../../generated/graphql";

import { useRouter } from "next/router";
import { Field, Form, ErrorMessage, Formik} from "formik";
import { Button } from "../../common/Btn";
import  NextLink  from "next/link"
import { useIsAuth } from "../../utils/useIsAuth";



export const  CreatePost = () =>{
  
    const router  = useRouter();
   // useIsAuth();
    const [createpost, {data,loading, error}] = useCreatePostMutation()
       let body = null
       console.log(data)
     return (
       <div>
         <Formik
           initialValues={{ text: "", field: "" }}
           onSubmit={async (values: any) => {
             const res = await createpost({
               variables: {
                 text: values.text,
                 field: values.field,
               },
               //refetchQueries: [{ query:CreatePostDocument }],
               update: (cache, { data }) => {
                 cache.modify({
                   fields: {
                     posts(existingPost = [PostsListDocument]) {
                       const newPost = cache.writeQuery({
                         query:CreatePostDocument,
                         data: {
                           __typename:"Query",
                           CreatePostDocument: data?.CreatePost.post,
                         },
                       }); ;

                       return [newPost, ...existingPost];
                     },
                   },
                 });
               },
             });
             if (res.data?.CreatePost.post ) {
               body = (
                 <div>
                   {PostsListDocument}
                   {data?.CreatePost.post?.createdAt}
                   {data?.CreatePost.post?.postBelongToUser}
                   {data?.CreatePost.post?.field}
                   {data?.CreatePost.post?.text}
                 </div>
               );
               router.push("postlist/postListPage");
               return body;
             } else if (!res.data?.CreatePost.post) {
               alert("erro");
             }
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

               <Button
                 type="submit"
                 value={"submit"}
                 loading={isSubmitting}
               ></Button>
             </Form>
           )}
         </Formik>
         :body{body}
         <NextLink href={"postlist/postListPage"}>
           <h3 style={{ cursor: "pointer" }}>post</h3>
         </NextLink>
       </div>
     );
}