import { ToggleLikeDocument, useToggleLikeMutation } from "../../generated/graphql"
import { Button } from "../../common/Btn"
import { cache } from "../../../lib/cache"


type likesPost = {
    postId?:string
    num_of_liked?: string
    isLoggedIn?: boolean
}

export const ToggleLike  = ({postId , num_of_liked }:likesPost) => {
    const [toggleLike , {data}] = useToggleLikeMutation()
    async function like(){
        const res = await toggleLike({
            variables:{
                Id: postId  as string
            },
            update:(cache, {data}) =>{
                cache.modify({
                id: cache.identify({
                  id: `Post:${postId}`,
                }),
                fields:{
                    toggleLike(num_of_liked = []){
                        const likes = cache.writeQuery({
                            query:ToggleLikeDocument,
                            data:{
                                __typename:"Query",
                                ToggleLikeDocument:data?.toggleLike
                            }
                        });
                        return [likes, ...num_of_liked]
                    }
                }
            })
                
            }
            
        })
    }
    return(
        <>
        <Button onClick={like}
        value="LIKE"
        / >
        </>
    )
}