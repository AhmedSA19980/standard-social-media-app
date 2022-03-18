import { gql, useMutation } from "urql";
import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
//import { Wrapper } from "../components/Wrapper";
import { InputField } from "../common/InputF";
//import { useRegisterMutation, MeQuery, MeDocument } from "../generated/graphql";
//import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
//import { withUrqlClient } from "next-urql";
//import { createUrqlClient } from "../utils/createUrqlClient";
//import { withApollo } from "../utils/withApollo";

const m = `mutation ($userName:String!, $password:String!){
  rigister(options:{userName:$userName, password:$password}){
    error{
      Field,
      Message
    }
  user{
    id,
    userName
  }
}
}`;

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [,register] = useMutation(m);
  return (
    
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          return  register(values)
         
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField name="email" placeholder="email" label="Email" />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
   
  );
};

export default Register
//export default withApollo({ ssr: false })(Register);