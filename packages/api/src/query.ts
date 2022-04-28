//const Pool = require('pg').Pool
import  {Pool,Client} from 'pg'
import dotenv from 'dotenv'

//dotenv.config()
//import pkg from 'pg';
//const {Pool,Client} = pkg;

const connectionString = 'http://127.0.0.1:55748/browser/'
export const DBConnection = new Pool({
   user:  process.env.USER,
  host: 'localhost',
  database: process.env.DATABASE,
  password:process.env.PASS,
  port: 5433,
})



export const client = new Client({
  user:  process.env.USER,
  host: 'localhost',
  database: process.env.DATABASE,
  password:"@@as##999980",
  port: 5433,

})

console.log(process.env.USER , process.env.DATABASE)









