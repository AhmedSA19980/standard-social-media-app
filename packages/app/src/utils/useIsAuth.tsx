import { useEffect } from "react";
import { useRouter } from "next/router";
import { useIsLoggedQuery } from "../generated/graphql";


export const useIsAuth=()=>{
    const {data,loading} = useIsLoggedQuery()
    const router = useRouter()

    useEffect(()=>{
        if(!loading && !data?.isLogged){
            router.replace("/loginPage?next=" +router.pathname)
        }
    },[loading ,data, router])
}