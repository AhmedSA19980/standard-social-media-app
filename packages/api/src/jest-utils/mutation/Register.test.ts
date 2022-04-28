import { Connection } from "typeorm";
import { testConn } from "../testConn";
import {gCall} from "../globalCall"



let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const RegisterMutation = `
  mutation Register($userName: String!, $password: String!, $email: String!) {
    register(
      options: { userName: $userName, password: $password, email: $email }
    )user {
      id
      userName
      email
    }
    
  }
`;


describe("Register", () => {
  it("create user", async () => {
    console.log(
      await gCall({
        source: RegisterMutation,
        variableValues: {
          data: {
            userName: "bob",
            email: "bob@gmail.com",
            password: "asdfasdf",
          },
        },
      })
    );
  });
});