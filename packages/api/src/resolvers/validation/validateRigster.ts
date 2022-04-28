import { UserInput } from "../types/userInput";

export const validateRegister = (options: UserInput) => {

   if (options.userName.length <= 2) {
     return [
       {
         Field: "userName",
         Message: "length must be greater than 2",
       },
     ];
   }


   if (options.userName.includes("@")) {
     return [
       {
         Field: "userName",
         Message: "cannot include an @",
       },
     ];
   }

   if (options.password.length <= 2) {
     return [
       {
         Field: "password",
         Message: "length must be greater than 2",
       },
     ];
   }
  
  if (!options.email.includes("@")) {
    return [
      {
        Field: "email",
        Message: "invalid email",
      },
    ];
  }

  return null;
};