import { PostQuery,useCommentsUnderPostQuery, usePostQuery } from "../../generated/graphql";
import { Stack,Skeleton, Text, Flex } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { route } from "next/dist/server/router";
import { Alert } from "@chakra-ui/core";


type CommentsBodyType = {

  writeAComment?: string | null;
  createdAt?: string | null;
  email?: string | null;
  userName?: string | null;
  //comments?:()=> void | null
};

export const CommentsUser =(
  {writeAComment,createdAt}
    :CommentsBodyType )=>{
    const router = useRouter();
    const postId = router.query.id;
    
    const  {data:comment, loading,error} = useCommentsUnderPostQuery({
     variables:{postId:String(postId)} 
    })
    
    //const postId =router.query.id
  
    if(comment?.post?.comments ){
      const {comments} = comment.post

      return (
        <>
          {comments.map((data) => (
            <Flex flexDir={"column"} alignContent={"center"}>
              <Text>{data.id}</Text>
              <Text fontSize={"2xl"}>{data.writeAComment}</Text>
              <Text fontSize={"md"}>{data.createdAt}</Text>
              <Text fontSize={"md"}>{data.authorId}</Text>
            </Flex>
          ))}
          <>
            user:
            {comment.post.author.userName}
          </>
        </>
      );
    }
    return (
      <div>
       <Text>no comments here!</Text>
      </div>
    );
} 