
import { createConnection } from "typeorm";

export const testConn = (drop:boolean = false)=>{

    return createConnection({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "@@as##9999980",
      database: "full_stack",
      synchronize: true,
      logging: false,
      entities: ["src/entity/*.js"],
    });
}