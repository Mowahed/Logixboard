let mongooseDB = require("mongoose");

mongooseDB.connect(
   process.env.DATABASE_URL,
   { useNewUrlParser: true },
   (error: any) => {
      if (error) {
         throw error;
      } else {
         console.log("Connected to DB");
      }
   }
);

export default mongooseDB;
