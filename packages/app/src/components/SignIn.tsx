/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Formik, Form, Field ,ErrorMessage} from "formik";
import { Input } from "../common/input";
import { Button } from "../common/Btn";
import { gql, useMutation } from "@apollo/client";
import { MeQuery, MeDocument, RegisterDocument, useLoginMutation } from "../generated/graphql";
import { LoginGraph } from "../graphql/mutation/LoginG";
import { json } from "stream/consumers";
import { InputField } from "../common/InputF";
import { ErrorMap } from "../../lib/errorMap";
import { useRouter } from "next/router";
import { setAccessToken } from "../utils/accessToken";
import { basedUserInfo } from "../graphql/fragment/BasedUserInfo";

export const SignIn = ({}) => {
  const route= useRouter()
  const [login, { data,loading, error }] = useLoginMutation();
  return (
    <div>
      <Formik
        initialValues={{ userNameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login({
            variables: {
              userNameOrEmail: values.userNameOrEmail,
              password: values.password,
            },
            
            update:(cache, {data})=>{
              const user = cache.readQuery({
                query:MeDocument
              })

              cache.writeQuery({
                query:MeDocument,
                data:{
                  login:[
                    data?.login.user,
                    user
                  ]
                }
              })
            }
        
         
          
         })
          
           if (res.data?.login.errors!) {
            setErrors(ErrorMap(res.data!.login.errors));
           console.log(setErrors(ErrorMap(res.data!.login.errors)));
          }else 
           if(res.data?.login.user && res.data?.login.accessToken){
            
                setAccessToken(res.data.login.accessToken);
                route.push("/")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form method="get">
            <h3>Sign in Form</h3>
            <p>usrname</p>
            <Field
              id={"userNameOrEmail"}
              name={"userNameOrEmail"}
              //component={InputField}
            />
            <p style={{ color: "red" }}>
              <ErrorMessage name={"userNameOrEmail"} />
            </p>

            <p>pass</p>
            <Field
              id={"password"}
              name={"password"} //component={InputField}
            />
            <p style={{ color: "red" }}>
              <ErrorMessage name={"password"} />
            </p>

            <Button
              type="submit"
              value={"submit"}
              loading={isSubmitting}
            >
              
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
