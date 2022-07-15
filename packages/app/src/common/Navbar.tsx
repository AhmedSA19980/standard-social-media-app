/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import  NextLink  from "next/link";
import classNames from "classnames";
import { MeComponent, MeDocument, 
   
  LoginDocument, 
  LogoutComponent, LogoutDocument,
   useMeQuery,MeQuery} from "../generated/graphql";

import { useLogoutMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import styles from "./style/Navbar.module.css";
import { ApolloClient } from "apollo-boost";
import { logOutGraph } from "../graphql/mutation/logout";
import { Button } from "../common/Btn";
import { useRouter } from "next/router";
import App from "next/app";
import { setAccessToken } from "../utils/accessToken";
import { update } from "react-spring";


// eslint-disable-next-line react/display-name
/*export default function ({ navigationData, currentRoute, setCurrentRoute }) { 

    return(
        <nav className={styles.navbar}>
            <span className={styles.logo}>
                <CgMonday />
            </span>
            <ul className={styles.navItems}>
                {navigationData.map((item: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined,index: React.Key | null | undefined)=>(
                    <li className={classNames([styles.navItem, 
                    currentRoute=== item && styles.selectedNavItem])}
                    key={index}
                    onClick={()=>setCurrentRoute(item)}
                    >{item}</li>
                ))}
            </ul>
             <button className={styles.actions}>Logout</button>
        </nav>
    )
 }*/

interface NavBarProps {}
export const Navbar =()=>{
  const route  =useRouter()
  const { data, error } = useMeQuery()
  const [logout, { client, loading }] = 
  useLogoutMutation({
       fetchPolicy: "network-only",
       
        
       
     });
 // const apolloClient = useApolloClient();
    let body = null
     
    if(loading){
        return (
          <div>
            <h3 style={{ cursor: "pointer" }}>
             ....Loadding    
            </h3>
          </div>
        );
    }
    
     if (data?.me?.id) {
      body = (
        <div>
          <li>
            <NextLink href={"/post/CreatePost"}>
              <h3 style={{ cursor: "pointer" }}>createPost</h3>
            </NextLink>
          </li>
          <h3 style={{ textAlign: "center" }}>user:{data.me.userName}</h3>
          <h3 style={{ textAlign: "center" }}>
            user:
            {data.me.email}
          </h3>
          <Button
            onClick={async () => {
              logout() 
              client.resetStore()
               localStorage.clear()
               

              /* await logout()
              await client.resetStore();
              await route.push("/loginPage");
              */
              // await apolloClient.resetStore();
              //window.location.reload()
            }}
            //loading={data}
            value={"logout"}
          ></Button>
          {logout}
        </div>
      );
    }else if(!data?.me) {
      body = (
        <div>
          <NextLink href={"/registerPage"}>
            <h3 style={{ cursor: "pointer" }}>register</h3>
          </NextLink>
          <NextLink href={"/loginPage"}>
            <h3 style={{ cursor: "pointer" }}>login</h3>
          </NextLink>
        </div>
      );

    }
    
    return (
      <div>
        navbar
        {body }
      </div>
    );
}
