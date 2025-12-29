import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

app.listen(2000, () => {
  console.log("API RUNNING AT PORT 2000");
});
