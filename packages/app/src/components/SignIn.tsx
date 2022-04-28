/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Formik, Form, Field ,ErrorMessage} from "formik";
import { Input } from "../common/input";
import { Button } from "../common/Btn";
import { gql, useMutation } from "@apollo/client";
import { IsLoggedDocument, IsLoggedQuery, RegisterDocument, useLoginMutation } from "../generated/graphql";
import { LoginGraph } from "../graphql/mutation/LoginG";
import { json } from "stream/consumers";
import { InputField } from "../common/InputF";
import { ErrorMap } from "../../lib/errorMap";
import { useRouter } from "next/router";


export const SignIn = ({}) => {
  const route= useRouter()
  const [Login, { data,loading, error }] = useLoginMutation();
  return (
    <div>
      <Formik
        initialValues={{ userNameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await Login({
            variables: {
              userNameOrEmail: values.userNameOrEmail,
              password: values.password,
            },
            //refetchQueries:[{query:IsLoggedDocument}]

            update:(cache ,{data})=>{
              cache.writeQuery<IsLoggedQuery>({
                query:IsLoggedDocument,
                data:{
                  __typename:"Query",
                  isLogged:data?.login.user
                }
              })
            }
          })

          if (res.data?.login.errors) {
            setErrors(ErrorMap(res.data.login.errors));
          }else if(res.data?.login.user){
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
            ></Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
