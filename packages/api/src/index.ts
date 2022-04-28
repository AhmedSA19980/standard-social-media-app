

//import Post from "@src/entity/post"


//import bodyParser from 'body-parser'

import 'reflect-metadata';
//import {createConnection} from 'typeorm'
//const {createConnection} = pkg
import { startSR } from './server';


//*const __filename = fileURLToPath(import.meta.url);


 startSR("databse connected by typeorm").catch((err) => {
   console.log(err);
 });



// 3
/*const server =  new ApolloServer({
 typeDefs:fs.readFileSync(
   path.join(__filename,'../schema.graphql'),
   'utf-8'
 ),
 resolvers,
 playground: process.env.NODE_ENV !='production'
})*/



/*server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});*/
  //dotenv.config({path: path.resolve(__dirname,'../env')})
//client.connect()




//"build": "nodemon tsc-node ---exec src/dist/index.js",


