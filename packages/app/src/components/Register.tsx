/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { Button } from "../common/Btn";
import {IsLoggedDocument, IsLoggedQuery,
   RegisterMutation, useRegisterMutation} from '../generated/graphql'

import { __InputValue } from "graphql";
import React, { useState } from "react";
import {useRouter} from 'next/router'
import {ErrorMap} from '../../lib/errorMap'


interface registerProps {
  userName:String;
  email:String;
  password:String;
}

export const Register = ({}) => {
  const route = useRouter()
  const [CreateUser ] = useRegisterMutation();
  return (
    <div>
      <Formik
        initialValues={{ userName: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await CreateUser({
            variables: {
              userName: values.userName,
              password: values.password,
              email: values.email,
            },
             //refetchQueries:[{query:IsLoggedDocument}]
             update:(cache,{data})=>{
               cache.writeQuery<IsLoggedQuery>({
                 query:IsLoggedDocument,
                 data:{
                   __typename:"Query",
                   isLogged:data?.register.user
                 }
               })
             }
          });


          console.log(res);
          //alert(JSON.stringify(values, null, 2));
          // console.log(values);
          if (res.data?.register.errors) {
            setErrors(ErrorMap(res.data.register.errors));

           // console.log(setErrors(ErrorMap(res.data.register.errors)));
          }else if(res.data?.register.user){
             route.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form method="post">
            <label htmlFor="userName"> Name</label>
            <Field
              id={"userName"}
              name={"userName"}
              // type={"text"}

              ///component={InputField}
            />
            <p style={{ color: "red" }}>
              <ErrorMessage name="userName" />
            </p>
            <label htmlFor="password">password</label>
            <Field
              id={"password"}
              name={"password"}
              // type={"password"}
              //component={InputField}
            />

            <p style={{ color: "red" }}>
              <ErrorMessage name="password" />
            </p>
            <label htmlFor="email">First Name</label>
            <Field
              id={"email"}
              name={"email"}
              // type={"email"}
              //component={InputField}
            />
            <p style={{ color: "red" }}>
              <ErrorMessage name="email" />
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





function toErrorMap(errors: any): import("formik").FormikErrors<{ userName: string; password: string; email: string; }> {
  throw new Error("Function not implemented.");
}

