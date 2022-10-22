import React from "react";
import { Field, Form, ErrorMessage, Formik } from "formik";
import { number } from "prop-types";
import { Button } from "../../common/Btn";
import {
  AddCommentDocument,
  CommentsDocument,
  PostQuery,
  PostsListFragment,
  PostDocument,
  PostsListDocument
  ,useAddCommentMutation,  
  AddCommentMutation,
  PostsListQuery
  
} from "../../generated/graphql"
import { makeTokenRefreshLink } from "../../utils/refreshToken";
import { getAccessToken } from "../../utils/accessToken";
import { post } from "../../graphql/query/post";
import { ApolloCache, gql } from "@apollo/client";
import { a } from "react-spring";
import { data } from "autoprefixer";
import { useRouter } from "next/router";
import { Box,ModalOverlay,Modal,ModalFooter,
  ModalContent, ModalHeader,
  ModalBody,ModalCloseButton,useToast,
   Textarea ,Button as Btn, useDisclosure } from "@chakra-ui/react";
import { type } from "os";
import { route } from "next/dist/server/router";

// get post info
interface addCommentSection {
  post:PostsListFragment
}

let p: addCommentSection 

type commentField = {
  writeAcomment?: string | null;
  postId?: String | null | undefined
}

export const AddCommentToPost = ()=>{
  const OverlayNormal = ()=>(
   <ModalOverlay
   bg={"none"}
   backdropFilter={"auto"}
   backdropInvert ={"80%"}
   backdropBlur={"2px"}
   />
  )
  const{isOpen , onOpen ,onClose} = useDisclosure()
  const [overlay ,setOverlay] = React.useState(<OverlayNormal/>)
  const toast = useToast();
  const router = useRouter()
 const id = router.query.id
  const token = getAccessToken()  
  const [addcomment, { loading:mutationLoading, 
    error: mutationError }] =
    useAddCommentMutation();
 
     return (
       <Box>
         <Formik
           initialValues={{
             addComment: "",
             postId: "",
           }}
           onSubmit={async (values: any, action) => {
             action.setSubmitting(false);
             const response = await addcomment({

              variables:{
                writeAComment:values.addComment
                ,postId:""
              },
               
               update: (cache, { data }) => {
                 cache.modify({
                   id: cache.identify({
                     id: `Post:${data?.createComment.getpost.id}`,
                   }),
                   fields: {
                     comments(existingComment = []) {
                       const addComment = cache.writeFragment({
                         data: data?.createComment.writeAComment,
                         fragment: gql`
                           fragment newComment on Comment {
                             id
                             createdAt
                             writeAComment
                             user {
                               id
                               email
                               userName
                             }
                           }
                         `,
                       });
                       return [addComment, ...existingComment];
                     },
                   },
                 });
               },
             });
             if (
               response &&
               response.data &&
               response.data?.createComment &&
               response.data.createComment.writeAComment
             ) {
               toast({
                 id: `${response.data.createComment.writeAComment}-toast`,
                 title: "Your comment was posted successfully.",
                 status: "success",
                 duration: 3000,
                 isClosable: true,
               });
               console.log(values);

               return action.resetForm();
             } else if (response.data?.createComment.getpost.id) {
               //* dont forget to auth and authorized user
             }
             console.log(values);
           }}
         >
           {({ isSubmitting }) => (
             <>
               <Btn
                 onClick={() => {
                   setOverlay(<OverlayNormal />);
                   onOpen();
                 }}
               >
                 comment
               </Btn>
               <Modal isCentered isOpen={isOpen} onClose={onClose}>
                 <ModalContent>
                   <ModalHeader>add your comment</ModalHeader>
                   <ModalCloseButton onClick={onClose} />
                   <ModalBody>
                     <Form>
                      <Field id={"postId"} name ={"postId"}>

                      </Field>
                       <label htmlFor="addComment"></label>
                       <Textarea
                         id={"addComment"}
                         name={"addComment"}

                         // type={"text"}

                         ///component={InputField}
                       />

                       <p style={{ color: "red" }}>
                         <ErrorMessage name="addComment" />
                       </p>
                     </Form>
                   </ModalBody>
                   <ModalFooter>
                     <Button
                       type="submit"
                       value={"submit"}
                       loading={mutationLoading || isSubmitting}
                       disabled={mutationLoading || isSubmitting}
                       //onClick={onClose} //clear input and move
                       // to comment
                     ></Button>
                   </ModalFooter>
                 </ModalContent>
               </Modal>
             </>
           )}
         </Formik>
         {mutationError &&
           toast({
             id: "error",
             title: "An error occurred.",
             description: "There was an error trying to submit your comment",
             status: "error",
             duration: 3000,
             isClosable: true,
             
           })}
       </Box>
     );

}