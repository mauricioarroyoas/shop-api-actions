import { app } from "./app";
import { AppDataSource } from "./data-source";


console.log("Starting app with env variables:");
console.log("PGHOST:", process.env.PGHOST);
console.log("PGPORT:", process.env.PGPORT);
console.log("PGUSER:", process.env.PGUSER);
console.log("PGPASSWORD:", process.env.PGPASSWORD ? "****" : undefined);
console.log("PGDATABASE:", process.env.PGDATABASE);


const PORT = 3000;
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error during data source initilization", error);
  });
