import { Box } from "@chakra-ui/core";
import router from "next/router";
import { PostQuery, usePostQuery } from "../../generated/graphql";




export const  NumOfLikes = () =>{
    
    const postId = router.query.id

    const { data } = usePostQuery({variables:{postId:postId as string}})
    if (data?.post?.id){
        return(
            <Box>
                {data.post.likeCount}
            </Box>
        )
    }
    return <Box>{0}</Box>

}